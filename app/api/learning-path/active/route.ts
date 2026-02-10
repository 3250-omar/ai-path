import {
  getUserLearningPaths,
  getLearningPathById,
} from "@/lib/db/learning-paths";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

/**
 * GET /api/learning-path/active
 * Retrieves the user's most recent active learning path with full nested data
 */
export async function GET() {
  try {
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

    // Fetch all learning paths for the user
    const learningPaths = await getUserLearningPaths(user.id);

    if (!learningPaths || learningPaths.length === 0) {
      return NextResponse.json({ success: true, path: null }, { status: 200 });
    }

    // Get the most recent active path (first one from getUserLearningPaths which orders by created_at desc)
    const activePath = learningPaths.find((path) => path.status === "active");

    if (!activePath) {
      return NextResponse.json({ success: true, path: null }, { status: 200 });
    }

    // Fetch full path details with nested data
    const fullPath = await getLearningPathById(activePath.id, user.id);

    if (!fullPath) {
      return NextResponse.json(
        { success: false, error: "Learning path not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      path: fullPath,
    });
  } catch (error) {
    console.error("Error fetching active learning path:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/learning-path/active
 * Deletes the user's active learning path
 */
export async function DELETE() {
  try {
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

    // Get active path
    const learningPaths = await getUserLearningPaths(user.id);
    const activePath = learningPaths?.find((path) => path.status === "active");

    if (!activePath) {
      return NextResponse.json(
        { success: false, error: "No active learning path found" },
        { status: 404 },
      );
    }

    // Delete path
    const { error: deleteError } = await supabase
      .from("learning_paths")
      .delete()
      .eq("id", activePath.id)
      .eq("user_id", user.id);

    if (deleteError) {
      return NextResponse.json(
        { success: false, error: deleteError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Learning path deleted",
    });
  } catch (error) {
    console.error("Error deleting learning path:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete learning path" },
      { status: 500 },
    );
  }
}
