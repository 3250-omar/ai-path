import { genAI } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 },
      );
    }

    // Use a model suitable for chat
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      systemInstruction:
        "You are an expert AI Tutor. Your goal is to help the user learn effectively. " +
        "You should be encouraging, clear, and concise. " +
        "When context is provided (e.g. lesson content), use it to answer the user's questions specifically about that lesson. " +
        "If the user asks about something else, you can still answer but mention if it's outside the current lesson scope if relevant. " +
        "Format your responses using Markdown.",
    });

    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({
      history: history,
    });

    const lastMessage = messages[messages.length - 1];
    let prompt = lastMessage.content;

    if (context) {
      prompt = `Context (Current Lesson Content):\n${context}\n\nUser Question:\n${prompt}`;
    }

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      role: "assistant",
      content: text,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
