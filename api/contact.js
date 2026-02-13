
import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

export default async function handler(req, res) {
    console.log('--- API CONTACT START ---');
    console.log('Method:', req.method);

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const body = req.body;
        console.log('Body keys:', Object.keys(body || {}));

        const {
            name, email, phone, message, property, features, area,
            techSupply, techSupplyDetails, distributionBoard, electricalInstall,
            fileInfos, aiHistory,
            botCheck
        } = body;

        // 1. Honeypot check
        if (botCheck) {
            console.warn('Bot detected by honeypot');
            return res.status(400).json({ error: 'Invalid submission (Bot)' });
        }

        // 2. Validate essential fields
        if (!name || !email) {
            return res.status(400).json({ error: 'Missing name or email' });
        }

        // 3. Supabase setup
        const supabaseUrl = process.env.VITE_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        console.log('Supabase check:', { url: !!supabaseUrl, key: !!supabaseServiceKey });

        if (supabaseUrl && supabaseServiceKey) {
            console.log('Inserting into inquiries table...');
            const supabase = createClient(supabaseUrl, supabaseServiceKey);
            const { error: dbError } = await supabase.from('inquiries').insert([{
                name, email, phone, message, property, area, features,
                tech_supply: techSupply,
                tech_supply_details: techSupplyDetails,
                distribution_board: distributionBoard,
                electrical_install: electricalInstall,
                file_paths: fileInfos?.map(f => f.path) || [],
                ai_history: aiHistory
            }]);

            if (dbError) {
                console.error('Database insertion failed:', dbError.message);
                // We continue even if DB fails to ensure email is sent
            } else {
                console.log('Database insertion successful');
            }
        }

        // 4. EmailJS setup
        const serviceId = process.env.EMAILJS_SERVICE_ID;
        const templateId = process.env.EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.EMAILJS_PUBLIC_KEY;
        const privateKey = process.env.EMAILJS_PRIVATE_KEY;

        console.log('EmailJS check:', { serviceId: !!serviceId, templateId: !!templateId, publicKey: !!publicKey, privateKey: !!privateKey });

        if (!serviceId || !templateId || !publicKey) {
            throw new Error('EmailJS configuration is incomplete on the server.');
        }

        const emailData = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            accessToken: privateKey, // Required for non-browser calls
            template_params: {
                to_name: 'InTechPro',
                customer_name: name,
                customer_email: email,
                phone: phone || 'Neuvedeno',
                property_type: property || 'Neuvedeno',
                selected_features: features || 'Neuvedeno',
                project_area: area || 'Neuvedeno',
                estimated_budget: body.estimatedBudget || 'Nespecifikováno',
                tech_supply: techSupply ? 'ANO' : 'NE',
                tech_supply_details: techSupplyDetails || 'Žádné',
                distribution_board: distributionBoard ? 'ANO' : 'NE',
                electrical_install: electricalInstall ? 'ANO' : 'NE',
                has_attachments: fileInfos && fileInfos.length > 0 ? `ANO (${fileInfos.length})` : 'NE',
                attachment_links: fileInfos?.map(f => `Soubor: ${f.name} (Cesta: ${f.path})`).join('\n') || 'Žádné soubory',
                message: message || 'Žádná zpráva',
                ai_history: aiHistory || 'Žádný kontext'
            }
        };

        console.log('Sending email...');
        const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData)
        });

        if (!emailRes.ok) {
            const errorText = await emailRes.text();
            console.error('EmailJS Error response:', errorText);
            throw new Error(`EmailJS Error: ${errorText}`);
        }

        console.log('Email sent successfully');
        return res.status(200).json({ success: true });

    } catch (err) {
        console.error('CRITICAL API ERROR:', err);
        return res.status(500).json({
            error: 'Kritická chyba serveru',
            details: err.message || err.toString()
        });
    }
}
