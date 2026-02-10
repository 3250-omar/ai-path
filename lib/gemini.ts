import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENAI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);
export { genAI };

export const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
  systemInstruction:
    "You are a professional Senior Full-Stack Developer. " +
    "Your job is to provide clean, efficient, and clearly explained software solutions. " +
    "Prefer using TypeScript and Clean Code principles in your examples.",
});
