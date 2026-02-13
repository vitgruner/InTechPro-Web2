
// Vercel Serverless Function: api/contact.js
// This file handles contact form submissions server-side to protect secrets and prevent abuse.

import { createClient } from '@supabase/supabase-js';

// Note: In Vercel, use environment variables defined in the dashboard.
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const {
        name, email, phone, message, property, features, area,
        techSupply, techSupplyDetails, distributionBoard, electricalInstall,
        fileInfos, aiHistory,
        botCheck // Honeypot field
    } = req.body;

    // 1. Basic Anti-Abuse: Honeypot
    if (botCheck) {
        console.warn('Bot detected via honeypot');
        return res.status(400).json({ error: 'Invalid submission' });
    }

    // 2. Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // 3. Rate Limiting (Simple per-IP check could be added here if using a KV store or memory)
    // For now, we rely on Vercel's edge protection and basic validation.

    try {
        // 4. (Optional) Log to Database using Service Role Key to bypass RLS for logging inquiries
        if (supabaseUrl && supabaseServiceKey) {
            const supabase = createClient(supabaseUrl, supabaseServiceKey);
            await supabase.from('inquiries').insert([{
                name, email, phone, message, property, area, features,
                tech_supply: techSupply,
                tech_supply_details: techSupplyDetails,
                distribution_board: distributionBoard,
                electrical_install: electricalInstall,
                file_paths: fileInfos?.map(f => f.path) || [],
                ai_history: aiHistory
            }]);
        }

        // 5. Send Email via EmailJS (Server-side REST API) or other provider
        // Using EmailJS REST API from server is safer than client-side.
        const emailData = {
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            template_params: {
                to_name: 'InTechPro',
                customer_name: name,
                customer_email: email,
                phone,
                property_type: property,
                selected_features: features,
                project_area: area,
                estimated_budget: req.body.estimatedBudget || 'Nespecifikováno',
                tech_supply: techSupply ? 'ANO' : 'NE',
                tech_supply_details: techSupplyDetails,
                distribution_board: distributionBoard ? 'ANO' : 'NE',
                electrical_install: electricalInstall ? 'ANO' : 'NE',
                has_attachments: fileInfos && fileInfos.length > 0 ? 'ANO (' + fileInfos.length + ')' : 'NE',
                attachment_links: fileInfos?.map(f => `Soubor: ${f.name} (Cesta: ${f.path})`).join('\n') || 'Žádné soubory',
                message,
                ai_history: aiHistory
            }
        };

        const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData)
        });

        if (!emailRes.ok) {
            const errorText = await emailRes.text();
            throw new Error(`Email sending failed: ${errorText}`);
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Inquiry processing error:', error);
        return res.status(500).json({ error: 'Interní chyba při zpracování poptávky.' });
    }
}
