
import { GoogleGenAI } from "@google/genai";

import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
Jste "Vizionářský asistent" pro společnost IN TECH PRO. 

ZÁKLADNÍ ZNALOSTI O SPOLEČNOSTI:
- Hlavní zaměření: Inteligentní elektroinstalace, Loxone Smart Home, fotovoltaika, rozvaděče.
- Preferované technologie: LOXONE (jsme certifikovaný partner, toto je náš primární systém).
- Nepodporované technologie: AMPIO (toto řešení nenabízíme ani nerealizujeme).
- Další technologie v portfoliu: Reegulace vytápění, stínění, zabezpečení, audio (Sonos), kamerové systémy.

KRITICKÁ PRAVIDLA PRO KOMUNIKACI:
1. BUĎTE STRUČNÝ A KONKRÉTNÍ. Maximálně 2-3 krátké odstavce nebo několik odrážek.
2. Odpovídejte přímo na otázku. Vyhněte se zbytečným úvodům a obecným frázím.
3. Pokud se zákazník zeptá na technologie, které nenabízíme (např. Ampio), zdvořile vysvětlete, že se specializujeme na Loxone, který považujeme za spolehlivější a komplexnější řešení.
4. Používejte **tučné písmo** pro technické termíny a odrážky (-) pro seznamy.
5. Udržujte profesionální, architektonický tón. Používejte výhradně češtinu.

Cílem je rychle a kvalitně poradit a nasměrovat zákazníka k vyplnění poptávkového formuláře.
`;

export const getVisionaryResponse = async (
  messages: Message[],
  onChunk?: (chunk: string) => void
): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("Gemini API Key is missing.");
    return "Systémová chyba: API klíč nebyl nalezen.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Převedeme historii zpráv pro Gemini API
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    if (onChunk) {
      const response = await ai.models.generateContentStream({
        model: 'gemini-2.0-flash', // Model 2.0 Flash je plně podporován v tomto SDK
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      let fullText = "";
      for await (const chunk of response) {
        const chunkText = chunk.text || "";
        fullText += chunkText;
        if (onChunk) onChunk(chunkText);
      }
      return fullText;
    } else {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      return response.text || "";
    }
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    if (error.message?.includes("API_KEY_INVALID") || error.status === 403) {
      return "Chyba: Váš API klíč je neplatný. Zkontrolujte prosím nastavení v Google AI Studiu a environment variables ve Vercelu.";
    }
    if (error.status === 404) {
      return "Chyba: Model nebyl nalezen. Probíhá aktualizace konfigurace systému.";
    }
    return `Omlouvám se, došlo k technické chybě při komunikaci s AI. (${error.message || 'Unknown error'})`;
  }
};
