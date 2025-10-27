
import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAI = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const startChat = () => {
  const aiInstance = getAI();
  chat = aiInstance.chats.create({
    model: 'gemini-2.5-flash',
    config: {
        systemInstruction: 'You are SnakeEngine AI, a helpful and friendly assistant integrated into the SnakeEngine.AI platform. Be concise and helpful.',
    },
  });
};

export const sendMessageToAI = async (message: string): Promise<string> => {
  if (!chat) {
    startChat();
  }
  
  if (!chat) {
      throw new Error("Chat session could not be initialized.");
  }

  try {
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    // Reset chat on error
    startChat(); 
    if (error instanceof Error) {
        return `Sorry, I encountered an error: ${error.message}. Please try again.`;
    }
    return "Sorry, an unknown error occurred. Please try again.";
  }
};
