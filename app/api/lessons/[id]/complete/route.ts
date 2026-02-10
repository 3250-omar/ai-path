import { markLessonComplete } from "@/lib/db/learning-paths";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/**
 * POST /api/lessons/[id]/complete
 * Marks a lesson as completed for the authenticated user
 */
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } },
) {
  try {
    // In Next.js 14+, params can be a Promise
    const params = await Promise.resolve(context.params);
    const lessonId = params?.id;

    if (!lessonId) {
      return NextResponse.json(
        { success: false, error: "Lesson ID is required" },
        { status: 400 },
      );
    }

    // Get authenticated user
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

    // Mark lesson as complete
    await markLessonComplete(lessonId, user.id);

    return NextResponse.json({
      success: true,
      message: "Lesson marked as complete",
    });
  } catch (error) {
    console.error("Error marking lesson complete:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
