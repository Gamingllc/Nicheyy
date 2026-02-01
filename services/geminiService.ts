import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedIdea } from "../types";

const createClient = () => {
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("VITE_GEMINI_API_KEY is missing from environment variables.");
  }
  return new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-ts-check' });
};

export const generateContentIdea = async (
  category: string | null = null,
  userVibe: string = ""
): Promise<GeneratedIdea> => {
  const ai = createClient();

  const systemInstruction = `
    You are Nicheyy. You give simple, direct, high-speed business ideas.
    
    RULES:
    1. Use SIMPLE ENGLISH. No big words. No "innovative", "synergy", or "transformative".
    2. SHORT SENTENCES ONLY. 
    3. BE DIRECT. Tell them exactly what to do.
    
    Categories:
    - Content: Use AI to make videos/posts fast.
    - Social: Viral tricks for TikTok/IG.
    - Code: Fast tools with simple tech stacks.
    - Build: Small apps that make money.
    - Creativity: Selling digital files or simple physical goods.
    
    Response Format:
    - title: Max 5 words. Punchy.
    - description: 2 short sentences on what to do.
    - howItWorks: 1 very short sentence on the main trick.
    - whyPoints: 3 very short reasons why this works (e.g., "Low cost", "Fast build", "Big market").
    
    If the user gives a vibe, use it to make the idea fit them perfectly.
  `;

  let userPrompt = "Give me one high-leverage hustle idea.";

  if (userVibe.trim()) {
    userPrompt += `\n\nUser Context: "${userVibe}"`;
  }

  if (category && category !== 'All') {
    userPrompt += `\n\nFilter: Category must be '${category}'.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 1.0,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            category: { type: Type.STRING },
            howItWorks: { type: Type.STRING },
            whyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "description", "category", "howItWorks", "whyPoints"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response");

    return JSON.parse(text) as GeneratedIdea;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};