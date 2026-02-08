import { model } from "@/lib/gemini";
import {
  createLearningPathPrompt,
  validateAIGeneratedPath,
  extractJSONFromResponse,
} from "@/lib/ai-prompt-templates";
import { createLearningPath } from "@/lib/db/learning-paths";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import type { AIGeneratedPath } from "@/types/learning-path";

/**
 * POST /api/generate-path
 * Generates a complete learning path using Gemini AI and stores it in Supabase
 */
export async function POST(req: Request) {
  try {
    // 1. Parse request body
    const { goal } = await req.json();

    if (!goal || typeof goal !== "string" || goal.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Learning goal is required" },
        { status: 400 },
      );
    }

    // 2. Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: "Authentication required" },
        { status: 401 },
      );
    }

    // 3. Generate learning path with AI
    const prompt = createLearningPathPrompt(goal);

    let aiResponse: AIGeneratedPath;
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract and parse JSON
      const cleanedJSON = extractJSONFromResponse(text);
      const parsedData = JSON.parse(cleanedJSON);

      // Validate structure
      if (!validateAIGeneratedPath(parsedData)) {
        throw new Error("AI response does not match expected structure");
      }

      aiResponse = parsedData;
    } catch (error) {
      console.error("AI Generation Error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to generate learning path. Please try again.",
        },
        { status: 500 },
      );
    }

    // 4. Store in database
    let pathId: string;
    try {
      pathId = await createLearningPath(user.id, goal, aiResponse);
    } catch (error) {
      console.error("Database Error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save learning path. Please try again.",
        },
        { status: 500 },
      );
    }

    // 5. Return success with path ID
    return NextResponse.json({
      success: true,
      pathId,
      title: aiResponse.title,
    });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    );
  }
}
