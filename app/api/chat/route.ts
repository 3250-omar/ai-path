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

    // Gemini history must start with a user message
    // Filter out any leading model messages (like the initial greeting)
    let historyStartIndex = 0;
    while (
      historyStartIndex < messages.length - 1 &&
      messages[historyStartIndex].role !== "user"
    ) {
      historyStartIndex++;
    }

    const history = messages
      .slice(historyStartIndex, -1)
      .map((m: { role: string; content: string }) => ({
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

    const result = await chat.sendMessageStream(prompt);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(encoder.encode(chunkText));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new NextResponse(stream);
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 },
    );
  }
}
