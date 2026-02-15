import { createClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false, // Disabling bodyParser to handle multipart/form-data
    },
};

export default async function handler(req, res) {
    console.log('--- API CONTACT START (SECURE MULTIPART) ---');

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = new IncomingForm({
        keepExtensions: true,
        maxFileSize: 4 * 1024 * 1024, // 4MB per request limit
    });

    try {
        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve([fields, files]);
            });
        });

        const body = JSON.parse(fields.data[0]);
        const projectFiles = files.files || []; // This can be an array or a single object depending onidable version/config

        const {
            name, email, phone, message, property, features, area,
            techSupply, techSupplyDetails, distributionBoard, electricalInstall,
            aiHistory, botCheck
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

        // 3. Validate Files Server-side
        const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
        const fileList = Array.isArray(projectFiles) ? projectFiles : [projectFiles].filter(Boolean);

        for (const file of fileList) {
            if (!ALLOWED_TYPES.includes(file.mimetype)) {
                return res.status(400).json({ error: `Nepodporovaný typ souboru: ${file.originalFilename}` });
            }
        }

        // 4. Supabase setup
        const supabaseUrl = process.env.VITE_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        let attachmentLinksStr = 'Žádné soubory';
        let fileInfos = [];

        if (supabaseUrl && supabaseServiceKey) {
            const supabase = createClient(supabaseUrl, supabaseServiceKey);

            // Upload files
            if (fileList.length > 0) {
                console.log(`Uploading ${fileList.length} files to storage...`);
                fileInfos = await Promise.all(fileList.map(async (file) => {
                    const fileExt = path.extname(file.originalFilename);
                    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}${fileExt}`;
                    const filePath = `inquiries/${fileName}`;

                    const fileBuffer = fs.readFileSync(file.filepath);
                    const { error: uploadError } = await supabase.storage
                        .from('project-documents')
                        .upload(filePath, fileBuffer, {
                            contentType: file.mimetype,
                            upsert: false
                        });

                    if (uploadError) {
                        console.error('File upload error:', uploadError);
                        throw new Error(`Chyba při nahrávání souboru: ${file.originalFilename}`);
                    }

                    return { path: filePath, name: file.originalFilename };
                }));
            }

            console.log('Inserting into inquiries table...');
            const { error: dbError } = await supabase.from('inquiries').insert([{
                name, email, phone, message, property, area, features,
                tech_supply: techSupply,
                tech_supply_details: techSupplyDetails,
                distribution_board: distributionBoard,
                electrical_install: electricalInstall,
                file_paths: fileInfos.map(f => f.path),
                ai_history: aiHistory
            }]);

            if (dbError) {
                console.error('Database insertion failed:', dbError.message);
            }

            // Generate signed URLs for attachments (valid for 7 days)
            if (fileInfos.length > 0) {
                const signedLinks = await Promise.all(fileInfos.map(async (f) => {
                    const { data, error } = await supabase.storage
                        .from('project-documents')
                        .createSignedUrl(f.path, 60 * 60 * 24 * 7);

                    if (error) return `<li>Soubor: ${f.name} (Chyba odkazu)</li>`;
                    return `<li><a href="${data.signedUrl}" style="color: #69C350; text-decoration: underline; font-weight: bold;">Stáhnout: ${f.name}</a></li>`;
                }));
                attachmentLinksStr = `<ul style="margin: 0; padding-left: 20px;">${signedLinks.join('')}</ul>`;
            }
        }

        // 5. EmailJS setup
        const serviceId = process.env.EMAILJS_SERVICE_ID;
        const templateId = process.env.EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.EMAILJS_PUBLIC_KEY;
        const privateKey = process.env.EMAILJS_PRIVATE_KEY;

        if (!serviceId || !templateId || !publicKey) {
            throw new Error('EmailJS configuration is incomplete on the server.');
        }

        const emailData = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            accessToken: privateKey,
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
                has_attachments: fileInfos.length > 0 ? `ANO (${fileInfos.length})` : 'NE',
                attachment_links: attachmentLinksStr,
                message: message || 'Žádná zpráva',
                ai_history: aiHistory || 'Žádný kontext'
            }
        };

        const emailRes = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData)
        });

        if (!emailRes.ok) {
            const errorText = await emailRes.text();
            throw new Error(`EmailJS Error: ${errorText}`);
        }

        return res.status(200).json({ success: true });

    } catch (err) {
        console.error('CRITICAL API ERROR:', err);
        return res.status(500).json({
            error: 'Kritická chyba serveru',
            details: err.message || err.toString()
        });
    }
}
