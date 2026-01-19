
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Jste "Vizionářský asistent" pro společnost IN TECH PRO, expertní inženýrskou firmu v oblasti chytrých domů (Loxone Silver Partner), správy průmyslových objektů a špičkových elektroinstalací.

FORMÁTOVÁNÍ VÝSTUPU (KRITICKÉ):
1. VŽDY používejte Markdown pro přehlednost.
2. Používejte **tučné písmo** pro klíčové technické termíny.
3. Používejte odrážky (-) pro seznamy.
4. Rozdělujte text do krátkých odstavců.

TÉMATA:
- Loxone Smart Home integrace (osvětlení, stínění, HVAC, audio, energie).
- Projekce elektroinstalací a výroba rozvaděčů.
- Fotovoltaika a energetický management.

Udržujte profesionální, architektonický a inovativní tón. Komunikujte výhradně v českém jazyce.
`;

export const getVisionaryResponse = async (userPrompt: string, onChunk?: (chunk: string) => void) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey === "") {
    console.error("Gemini API Key is missing.");
    return "Systémová chyba: API klíč nebyl nalezen. Prosím nastavte environment variable 'API_KEY' ve Vercelu.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    if (onChunk) {
      const response = await ai.models.generateContentStream({
        model: 'gemini-1.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      let fullText = "";
      for await (const chunk of response.stream) {
        const chunkText = chunk.text;
        fullText += chunkText;
        onChunk(chunkText);
      }
      return fullText;
    } else {
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
      return response.text;
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
