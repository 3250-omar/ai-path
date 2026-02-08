import { getLearningPathById } from "@/lib/db/learning-paths";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/**
 * GET /api/learning-path/[id]
 * Retrieves a complete learning path with all nested data
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> | { id: string } },
) {
  try {
    // In Next.js 14+, params can be a Promise
    const params = await Promise.resolve(context.params);
    const pathId = params?.id;

    console.log("Received path ID:", pathId);

    if (!pathId) {
      return NextResponse.json(
        { success: false, error: "Path ID is required" },
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

    // Fetch learning path
    const learningPath = await getLearningPathById(pathId, user.id);

    if (!learningPath) {
      return NextResponse.json(
        { success: false, error: "Learning path not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      path: learningPath,
    });
  } catch (error) {
    console.error("Error fetching learning path:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
