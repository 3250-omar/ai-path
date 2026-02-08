import { createClient } from "@/utils/supabase/server";
import {
  AIGeneratedPath,
  LearningPath,
  ModuleDB,
  LessonDB,
  QuizDB,
  Module,
  Lesson,
  CreateLearningPath,
  UpdateLearningPath,
  UpdateLesson,
  UpdateQuiz,
  LearningPathWithProgress,
} from "@/types/learning-path";

/**
 * Database access layer for learning paths
 * Handles all CRUD operations with Supabase
 */

/**
 * Creates a complete learning path from AI-generated data
 * @param userId - User ID from auth
 * @param goal - Original user goal
 * @param aiData - AI-generated learning path structure
 * @returns Created learning path ID
 */
export async function createLearningPath(
  userId: string,
  goal: string,
  aiData: AIGeneratedPath,
): Promise<string> {
  const supabase = await createClient();

  // 1. Insert learning path
  const learningPathData: CreateLearningPath = {
    user_id: userId,
    title: aiData.title,
    description: aiData.description,
    goal: goal,
    difficulty_level: aiData.difficulty,
    estimated_duration_hours: aiData.estimatedHours,
    status: "active",
  };

  const { data: pathData, error: pathError } = await supabase
    .from("learning_paths")
    .insert(learningPathData)
    .select()
    .single();

  if (pathError)
    throw new Error(`Failed to create learning path: ${pathError.message}`);

  const pathId = pathData.id;

  // 2. Insert modules with lessons and quizzes
  for (
    let moduleIndex = 0;
    moduleIndex < aiData.modules.length;
    moduleIndex++
  ) {
    const aiModule = aiData.modules[moduleIndex];

    const moduleData: Omit<ModuleDB, "id" | "created_at"> = {
      learning_path_id: pathId,
      order_index: moduleIndex,
      title: aiModule.title,
      description: aiModule.description,
      estimated_duration_hours: aiModule.estimatedHours,
      is_completed: false,
    };

    const { data: module, error: moduleError } = await supabase
      .from("modules")
      .insert(moduleData)
      .select()
      .single();

    if (moduleError)
      throw new Error(`Failed to create module: ${moduleError.message}`);

    // 3. Insert lessons for this module
    for (
      let lessonIndex = 0;
      lessonIndex < aiModule.lessons.length;
      lessonIndex++
    ) {
      const aiLesson = aiModule.lessons[lessonIndex];

      const lessonData: Omit<LessonDB, "id" | "created_at"> = {
        module_id: module.id,
        order_index: lessonIndex,
        title: aiLesson.title,
        content: aiLesson.content,
        learning_objectives: aiLesson.objectives,
        resources: aiLesson.resources,
        is_completed: false,
        completed_at: null,
      };

      const { data: lesson, error: lessonError } = await supabase
        .from("lessons")
        .insert(lessonData)
        .select()
        .single();

      if (lessonError)
        throw new Error(`Failed to create lesson: ${lessonError.message}`);

      // 4. Insert quiz for this lesson
      const quizData: Omit<QuizDB, "id" | "created_at"> = {
        lesson_id: lesson.id,
        questions: aiLesson.quiz.questions,
        passing_score: aiLesson.quiz.passingScore,
        user_score: null,
        completed_at: null,
      };

      const { error: quizError } = await supabase
        .from("quizzes")
        .insert(quizData);

      if (quizError)
        throw new Error(`Failed to create quiz: ${quizError.message}`);
    }
  }

  return pathId;
}

/**
 * Retrieves a complete learning path with all nested data
 * @param pathId - Learning path ID
 * @param userId - User ID for authorization
 * @returns Complete learning path with modules, lessons, and quizzes
 */
export async function getLearningPathById(
  pathId: string,
  userId: string,
): Promise<LearningPath | null> {
  const supabase = await createClient();

  // Fetch learning path
  const { data: pathData, error: pathError } = await supabase
    .from("learning_paths")
    .select("*")
    .eq("id", pathId)
    .eq("user_id", userId)
    .single();

  if (pathError || !pathData) return null;

  // Fetch modules
  const { data: modulesData, error: modulesError } = await supabase
    .from("modules")
    .select("*")
    .eq("learning_path_id", pathId)
    .order("order_index", { ascending: true });

  if (modulesError)
    throw new Error(`Failed to fetch modules: ${modulesError.message}`);

  // Fetch lessons and quizzes for each module
  const modules: Module[] = [];

  for (const moduleData of modulesData || []) {
    const { data: lessonsData, error: lessonsError } = await supabase
      .from("lessons")
      .select("*")
      .eq("module_id", moduleData.id)
      .order("order_index", { ascending: true });

    if (lessonsError)
      throw new Error(`Failed to fetch lessons: ${lessonsError.message}`);

    const lessons: Lesson[] = [];

    for (const lessonData of lessonsData || []) {
      const { data: quizData } = await supabase
        .from("quizzes")
        .select("*")
        .eq("lesson_id", lessonData.id)
        .single();

      const lesson: Lesson = {
        id: lessonData.id,
        moduleId: lessonData.module_id,
        orderIndex: lessonData.order_index,
        title: lessonData.title,
        content: lessonData.content,
        learningObjectives: lessonData.learning_objectives,
        resources: lessonData.resources,
        isCompleted: lessonData.is_completed,
        completedAt: lessonData.completed_at || undefined,
        quiz: quizData
          ? {
              id: quizData.id,
              lessonId: quizData.lesson_id,
              questions: quizData.questions,
              passingScore: quizData.passing_score,
              userScore: quizData.user_score || undefined,
              completedAt: quizData.completed_at || undefined,
            }
          : undefined,
      };

      lessons.push(lesson);
    }

    const moduleObj: Module = {
      id: moduleData.id,
      learningPathId: moduleData.learning_path_id,
      orderIndex: moduleData.order_index,
      title: moduleData.title,
      description: moduleData.description,
      estimatedDurationHours: moduleData.estimated_duration_hours,
      isCompleted: moduleData.is_completed,
      lessons,
    };

    modules.push(moduleObj);
  }

  const learningPath: LearningPath = {
    id: pathData.id,
    userId: pathData.user_id,
    title: pathData.title,
    description: pathData.description,
    goal: pathData.goal,
    difficulty: pathData.difficulty_level,
    estimatedDurationHours: pathData.estimated_duration_hours,
    status: pathData.status,
    modules,
    createdAt: pathData.created_at,
    updatedAt: pathData.updated_at,
  };

  return learningPath;
}

/**
 * Gets all learning paths for a user with progress statistics
 * @param userId - User ID
 * @returns List of learning paths with progress data
 */
export async function getUserLearningPaths(
  userId: string,
): Promise<LearningPathWithProgress[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("learning_paths_with_progress")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error)
    throw new Error(`Failed to fetch learning paths: ${error.message}`);

  return (data || []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    description: row.description,
    goal: row.goal,
    difficulty: row.difficulty_level,
    estimatedDurationHours: row.estimated_duration_hours,
    status: row.status,
    modules: [], // Not included in this view
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    totalModules: row.total_modules || 0,
    completedModules: row.completed_modules || 0,
    totalLessons: row.total_lessons || 0,
    completedLessons: row.completed_lessons || 0,
    progressPercentage: row.progress_percentage || 0,
  }));
}

/**
 * Updates learning path metadata
 * @param pathId - Learning path ID
 * @param userId - User ID for authorization
 * @param updates - Fields to update
 */
export async function updateLearningPathMetadata(
  pathId: string,
  userId: string,
  updates: UpdateLearningPath,
): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("learning_paths")
    .update(updates)
    .eq("id", pathId)
    .eq("user_id", userId);

  if (error)
    throw new Error(`Failed to update learning path: ${error.message}`);
}

/**
 * Marks a lesson as completed
 * @param lessonId - Lesson ID
 * @param userId - User ID for authorization
 */
export async function markLessonComplete(
  lessonId: string,
  userId: string,
): Promise<void> {
  const supabase = await createClient();

  const updates: UpdateLesson = {
    is_completed: true,
    completed_at: new Date().toISOString(),
  };

  // Verify ownership through joins
  const { error } = await supabase
    .from("lessons")
    .update(updates)
    .eq("id", lessonId)
    .eq(
      "module_id",
      supabase.rpc("verify_lesson_ownership", {
        lesson_id: lessonId,
        user_id: userId,
      }),
    );

  if (error)
    throw new Error(`Failed to mark lesson complete: ${error.message}`);

  // Check if all lessons in module are complete, then mark module complete
  // This would require additional logic
}

/**
 * Submits a quiz score
 * @param quizId - Quiz ID
 * @param score - User's score (percentage)
 * @param userId - User ID for authorization
 */
export async function submitQuizScore(
  quizId: string,
  score: number,
): Promise<void> {
  const supabase = await createClient();

  const updates: UpdateQuiz = {
    user_score: score,
    completed_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("quizzes")
    .update(updates)
    .eq("id", quizId);

  if (error) throw new Error(`Failed to submit quiz score: ${error.message}`);
}

/**
 * Deletes a learning path and all associated data
 * @param pathId - Learning path ID
 * @param userId - User ID for authorization
 */
export async function deleteLearningPath(
  pathId: string,
  userId: string,
): Promise<void> {
  const supabase = await createClient();

  // Due to CASCADE constraints, this will delete all associated data
  const { error } = await supabase
    .from("learning_paths")
    .delete()
    .eq("id", pathId)
    .eq("user_id", userId);

  if (error)
    throw new Error(`Failed to delete learning path: ${error.message}`);
}
