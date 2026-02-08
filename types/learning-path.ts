// TypeScript type definitions for the AI Learning Path System

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type PathStatus = "generating" | "active" | "completed" | "failed";
export type ResourceType =
  | "video"
  | "article"
  | "documentation"
  | "course"
  | "tutorial";

// ============================================================================
// DATABASE TYPES (matching Supabase schema)
// ============================================================================

export interface LearningPathDB {
  id: string;
  user_id: string;
  title: string;
  description: string;
  goal: string;
  difficulty_level: DifficultyLevel;
  estimated_duration_hours: number;
  status: PathStatus;
  created_at: string;
  updated_at: string;
}

export interface ModuleDB {
  id: string;
  learning_path_id: string;
  order_index: number;
  title: string;
  description: string;
  estimated_duration_hours: number;
  is_completed: boolean;
  created_at: string;
}

export interface LessonDB {
  id: string;
  module_id: string;
  order_index: number;
  title: string;
  content: string;
  learning_objectives: string[];
  resources: Resource[];
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface QuizDB {
  id: string;
  lesson_id: string;
  questions: Question[];
  passing_score: number;
  user_score: number | null;
  completed_at: string | null;
  created_at: string;
}

// ============================================================================
// DOMAIN TYPES (for application use)
// ============================================================================

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  explanation: string;
}

export interface Resource {
  title: string;
  url: string;
  type: ResourceType;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: Question[];
  passingScore: number;
  userScore?: number;
  completedAt?: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  orderIndex: number;
  title: string;
  content: string;
  learningObjectives: string[];
  resources: Resource[];
  isCompleted: boolean;
  completedAt?: string;
  quiz?: Quiz;
}

export interface Module {
  id: string;
  learningPathId: string;
  orderIndex: number;
  title: string;
  description: string;
  estimatedDurationHours: number;
  isCompleted: boolean;
  lessons: Lesson[];
}

export interface LearningPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  goal: string;
  difficulty: DifficultyLevel;
  estimatedDurationHours: number;
  status: PathStatus;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

// With progress stats (from the view)
export interface LearningPathWithProgress extends LearningPath {
  totalModules: number;
  completedModules: number;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

// ============================================================================
// AI GENERATION TYPES
// ============================================================================

// Structure that AI will return
export interface AIGeneratedPath {
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  estimatedHours: number;
  modules: AIGeneratedModule[];
}

export interface AIGeneratedModule {
  title: string;
  description: string;
  estimatedHours: number;
  lessons: AIGeneratedLesson[];
}

export interface AIGeneratedLesson {
  title: string;
  content: string;
  objectives: string[];
  resources: Resource[];
  quiz: AIGeneratedQuiz;
}

export interface AIGeneratedQuiz {
  questions: Question[];
  passingScore: number;
}

// ============================================================================
// API REQUEST/RESPONSE TYPES
// ============================================================================

export interface GeneratePathRequest {
  goal: string;
  userId?: string; // Optional, can get from session
}

export interface GeneratePathResponse {
  success: boolean;
  pathId?: string;
  error?: string;
}

export interface PathGenerationProgress {
  step: string;
  progress: number; // 0-100
  message: string;
  completed: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

// For creating new records (without generated fields)
export type CreateLearningPath = Omit<
  LearningPathDB,
  "id" | "created_at" | "updated_at"
>;
export type CreateModule = Omit<ModuleDB, "id" | "created_at">;
export type CreateLesson = Omit<LessonDB, "id" | "created_at">;
export type CreateQuiz = Omit<QuizDB, "id" | "created_at">;

// For updates (only fields that can be updated)
export type UpdateLearningPath = Partial<
  Pick<LearningPathDB, "title" | "description" | "status" | "difficulty_level">
>;
export type UpdateLesson = Partial<
  Pick<LessonDB, "is_completed" | "completed_at">
>;
export type UpdateQuiz = Partial<Pick<QuizDB, "user_score" | "completed_at">>;
