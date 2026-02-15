import { useQuery } from "@tanstack/react-query";
import type { LearningPath } from "@/types/learning-path";

// Query Keys
export const queryKeys = {
  activeLearningPath: ["learning-path", "active"] as const,
  learningPath: (id: string) => ["learning-path", id] as const,
  user: ["user"] as const,
};

// API Response Types
interface ActivePathResponse {
  success: boolean;
  path: LearningPath | null;
}

interface LearningPathResponse {
  success: boolean;
  path: LearningPath;
}

interface UserResponse {
  user: {
    id: string;
    email: string;
    lastValidation: string;
  } | null;
}

// Query Hooks

/**
 * Fetches the active learning path for the current user
 * Cached for 5 minutes
 */
export function useActiveLearningPath() {
  return useQuery({
    queryKey: queryKeys.activeLearningPath,
    queryFn: async (): Promise<LearningPath | null> => {
      const res = await fetch("/api/learning-path/active");
      const data: ActivePathResponse = await res.json();
      return data.success ? data.path : null;
    },
  });
}

/**
 * Fetches a specific learning path by ID
 * @param id - Learning path ID
 */
export function useLearningPath(id: string) {
  return useQuery({
    queryKey: queryKeys.learningPath(id),
    queryFn: async (): Promise<LearningPath> => {
      const res = await fetch(`/api/learning-path/${id}`);
      const data: LearningPathResponse = await res.json();
      if (!data.success) {
        throw new Error("Failed to fetch learning path");
      }
      return data.path;
    },
    enabled: !!id, // Only run if ID is provided
  });
}

/**
 * Fetches current user data
 */
export function useUser() {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: async () => {
      const res = await fetch("/api/user");
      const data: UserResponse = await res.json();
      return data.user;
    },
  });
}
