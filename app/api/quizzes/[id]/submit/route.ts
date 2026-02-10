import { submitQuizScore } from "@/lib/db/learning-paths";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } },
) {
  try {
    const params = await Promise.resolve(context.params);
    const quizId = params?.id;
    const body = await req.json();
    const { score } = body;

    if (!quizId || typeof score !== "number") {
      return NextResponse.json(
        { success: false, error: "Quiz ID and score are required" },
        { status: 400 },
      );
    }

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

    // Submit score
    await submitQuizScore(quizId, score);

    return NextResponse.json({
      success: true,
      message: "Score submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting quiz score:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit score",
      },
      { status: 500 },
    );
  }
}
