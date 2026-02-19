
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const generateSEOKeywords = async (title: string, content: string) => {
  if (!API_KEY) return ["Default", "Auto", "Luxury"];
  
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 SEO keywords for an automotive blog post with title: "${title}" and content preview: "${content.substring(0, 100)}". Return as a JSON array of strings.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("SEO Generation Error:", error);
    return ["Automotive", "Garage", "Luxury"];
  }
};

export const getAIAssistance = async (prompt: string) => {
  if (!API_KEY) return "AI assistance is currently unavailable. Please check API Key.";
  
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert marketing consultant for high-end automotive brands. Provide concise, professional advice."
      }
    });
    return response.text;
  } catch (error) {
    return "Error generating response.";
  }
};
