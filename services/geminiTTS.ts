import { GoogleGenAI, Modality } from "@google/genai";

export const generateSpeech = async (prompt: string, voice: string): Promise<string> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: voice },
                    },
                },
            },
        });

        const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

        if (!audioData) {
            throw new Error("No audio data was returned from the API.");
        }
        
        return audioData;

    } catch (error) {
        console.error("Error generating speech:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate speech: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating speech.");
    }
};
