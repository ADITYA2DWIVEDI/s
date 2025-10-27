import { GoogleGenAI } from "@google/genai";

// This function starts the video generation process
export const generateVideo = async (ai: GoogleGenAI, prompt: string) => {
    try {
        const operation = await ai.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9'
            }
        });
        return operation;
    } catch (error) {
        console.error("Error initiating video generation:", error);
        throw error;
    }
};

// This function checks the status of an ongoing operation
export const getVideosOperation = async (ai: GoogleGenAI, operation: any) => {
    try {
        const updatedOperation = await ai.operations.getVideosOperation({ operation: operation });
        return updatedOperation;
    } catch (error) {
        console.error("Error polling video operation:", error);
        throw error;
    }
};
