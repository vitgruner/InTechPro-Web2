
# Run and deploy your AI Studio app

Intechpro Web
This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1UJp9OzRdSOlyHUQGCWdZ2SZ4iEPGsdk8

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `API_KEY` in [.env](.env) to your Gemini API key
3. Run the app:
   `npm run dev`

## 📧 Nastavení EmailJS

### 1. Konfigurace SMTP Služby
V administraci EmailJS přidejte novou službu **SMTP server** s následujícími parametry:
- **Service ID**: `service_qrgvofr`
- **Host**: `smtp.websupport.cz`
- **Port**: `465`
- **SSL**: Zapnuto (Checked)
- **User**: `web@intechpro.cz`

### 2. Šablona pro Admina (Inquiry)
Vytvořte šablonu s ID `template_76vc4mm` (nebo dle kódu):
- **Subject**: `Nová poptávka od {{from_name}}`
- **To Email**: `hron@intechpro.cz, stanura@intechpro.cz` (seznam příjemců)
- **From Name**: `{{name}}`
- **Reply To**: `{{from_email}}`
- **Obsah**: Použijte HTML ze souboru [emailjs-admin-template.html](file:///c:/intechpro3/InTechPro-Web2/emailjs-admin-template.html).

### 3. Šablona pro Zákazníka (Auto-Reply)
Vytvořte šablonu s ID `template_customer_confirm`:
- **Subject**: `Potvrzujeme přijetí zprávy z IN•TECHPRO`
- **To Email**: `{{customer_email}}`
- **Reply To**: `web@intechpro.cz`
- **Obsah**: Použijte HTML ze souboru [emailjs-autoreply-template.html](file:///c:/intechpro3/InTechPro-Web2/emailjs-autoreply-template.html).
