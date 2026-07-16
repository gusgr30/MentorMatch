import { GoogleGenAI } from "@google/genai";
import config from "../config.js";

class IaServicio {
  #cliente = null;

  constructor() {
    this.#cliente = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });
  }

  generarDescripcion = async ({ titulo, skills, experiencia }) => {
    const prompt = `Escribí una biografía profesional para el perfil de un mentor en una plataforma de mentorías tecnológicas.
Datos del mentor:
- Título profesional: ${titulo || "no especificado"}
- Tecnologías/skills: ${(skills || []).join(", ") || "no especificado"}
- Experiencia: ${experiencia || "no especificado"} años

Reglas:
- Tono cercano y profesional, en primera persona.
- Entre 3 y 4 oraciones.
- No uses markdown ni comillas, solo texto plano.
- No inventes datos que no te di (nombres de empresas, certificaciones, etc.).`;

    try {
      const respuesta = await this.#cliente.models.generateContent({
        model: "gemini-flash-lite-latest",
        contents: prompt,
      });

      const descripcion = respuesta.text?.trim();
      if (!descripcion) throw new Error("Gemini no devolvió texto");

      return descripcion;
    } catch (err) {
      const error = new Error("No se pudo generar la descripción con IA: " + err.message);
      error.status = 502;
      throw error;
    }
  };
}

export default IaServicio;
