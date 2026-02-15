import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "./useQueries";

// Mutation Hooks

/**
 * Completes a lesson and invalidates the active learning path cache
 */
export function useCompleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lessonId: string) => {
      const res = await fetch(`/api/lessons/${lessonId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to complete lesson");
      }
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch active learning path
      queryClient.invalidateQueries({
        queryKey: queryKeys.activeLearningPath,
      });
    },
  });
}

/**
 * Submits a quiz and invalidates the active learning path cache
 */
export function useSubmitQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      quizId,
      answers,
    }: {
      quizId: string;
      answers: Record<string, string>;
    }) => {
      const res = await fetch(`/api/quizzes/${quizId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to submit quiz");
      }
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch active learning path
      queryClient.invalidateQueries({
        queryKey: queryKeys.activeLearningPath,
      });
    },
  });
}

/**
 * Generates a new learning path
 */
export function useGeneratePath() {
  return useMutation({
    mutationFn: async (goal: string) => {
      const res = await fetch("/api/generate-path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to generate learning path");
      }
      return data;
    },
  });
}

/**
 * Sends a chat message to the AI
 */
export function useChat() {
  return useMutation({
    mutationFn: async ({
      messages,
      context,
    }: {
      messages: { role: string; content: string }[];
      context?: string;
    }) => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, context }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message");
      }

      return res;
    },
  });
}

/**
 * Sets the active learning path
 */
export function useSetActivePath() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pathId: string) => {
      const res = await fetch("/api/learning-path/active", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathId }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to set active path");
      }
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch active learning path
      queryClient.invalidateQueries({
        queryKey: queryKeys.activeLearningPath,
      });
    },
  });
}

/**
 * Deletes the active learning path (resets progress)
 */
export function useDeleteActivePath() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/learning-path/active", {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to delete learning path");
      }
      return data;
    },
    onSuccess: () => {
      // Clear active learning path cache
      queryClient.setQueryData(queryKeys.activeLearningPath, null);
      queryClient.invalidateQueries({
        queryKey: queryKeys.activeLearningPath,
      });
    },
  });
}
