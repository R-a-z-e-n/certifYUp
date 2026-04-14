
import { GoogleGenAI, Type } from "@google/genai";

// Initialize with the API key from environment variables as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCareerAdvice = async (skills: string[], education: string) => {
  const prompt = `Based on my education: ${education} and my skills: ${skills.join(', ')}, suggest 3 specific internship roles and 2 skills I should learn to improve my employability. Provide the response as a clear JSON object.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedRoles: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            skillsToLearn: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            motivationMessage: { type: Type.STRING }
          },
          required: ["suggestedRoles", "skillsToLearn", "motivationMessage"]
        }
      }
    });

    // Directly access the .text property from the response as per guidelines
    const jsonStr = response.text;
    if (!jsonStr) {
      throw new Error("Empty response from AI");
    }
    return JSON.parse(jsonStr.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
