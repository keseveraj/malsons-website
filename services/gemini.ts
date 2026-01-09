import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini
// Note: process.env.API_KEY is guaranteed to be available by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface EstimateResult {
  estimatedCostRange: string;
  timelineEstimate: string;
  breakdown: string[];
  considerations: string[];
}

export const getRenovationEstimate = async (userQuery: string): Promise<EstimateResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a senior quantity surveyor and renovation contractor in Malaysia. 
      Analyze the following renovation request: "${userQuery}".
      Provide a realistic, conservative cost estimate in Malaysian Ringgit (MYR).
      Be honest about potential hidden costs. 
      Focus on a premium but value-for-money approach.
      If the query is too vague, give a general range for a typical project of that type in KL/Selangor area.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedCostRange: {
              type: Type.STRING,
              description: "The estimated cost range in MYR (e.g., 'RM 15,000 - RM 22,000').",
            },
            timelineEstimate: {
              type: Type.STRING,
              description: "Estimated duration of the project (e.g., '4 - 6 weeks').",
            },
            breakdown: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-5 major cost drivers (e.g., 'Demolition & Disposal', 'Tiling (2x2 porcelain)', 'Plumbing Works').",
            },
            considerations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 2-3 important advice or warnings (e.g., 'Check condo management rules for hacking hours', 'Ensure water-proofing warranty is included').",
            },
          },
          required: ["estimatedCostRange", "timelineEstimate", "breakdown", "considerations"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as EstimateResult;
    }
    throw new Error("No response from AI");
  } catch (error) {
    console.error("Error getting estimate:", error);
    throw error;
  }
};