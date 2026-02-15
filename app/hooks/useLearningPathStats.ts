import { useMemo } from "react";
import type { LearningPath, Module, Lesson } from "@/types/learning-path";

export type ModuleStatus = "completed" | "in-progress" | "locked";

export interface DashboardStats {
  totalLessons: number;
  completedLessons: number;
  overallProgress: number;
  totalModules: number;
  completedModules: number;
  upcomingLessons: (Lesson & { moduleName: string })[];
}

export function useLearningPathStats(
  learningPath: LearningPath | null | undefined,
) {
  const stats: DashboardStats = useMemo(() => {
    if (!learningPath) {
      return {
        totalLessons: 0,
        completedLessons: 0,
        overallProgress: 0,
        totalModules: 0,
        completedModules: 0,
        upcomingLessons: [],
      };
    }

    const allLessons = learningPath.modules.flatMap((m) => m.lessons);
    const totalLessons = allLessons.length;
    const completedLessons = allLessons.filter((l) => l.isCompleted).length;
    const overallProgress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0;

    const totalModules = learningPath.modules.length;
    const completedModules = learningPath.modules.filter((m) =>
      m.lessons.every((l) => l.isCompleted),
    ).length;

    const upcomingLessons = learningPath.modules
      .flatMap((mod) =>
        mod.lessons
          .filter((lesson) => !lesson.isCompleted)
          .map((lesson) => ({ ...lesson, moduleName: mod.title })),
      )
      .slice(0, 4);

    return {
      totalLessons,
      completedLessons,
      overallProgress,
      totalModules,
      completedModules,
      upcomingLessons,
    };
  }, [learningPath]);

  const getModuleStatus = (
    module: Module,
    moduleIndex: number,
  ): ModuleStatus => {
    if (!learningPath) return "locked";

    const allCompleted = module.lessons.every((l) => l.isCompleted);
    const someCompleted = module.lessons.some((l) => l.isCompleted);

    if (allCompleted) return "completed";
    if (someCompleted) return "in-progress";

    // Check if previous module is complete
    if (moduleIndex === 0) return "in-progress";

    const previousModule = learningPath.modules[moduleIndex - 1];
    const previousComplete = previousModule?.lessons.every(
      (l) => l.isCompleted,
    );

    return previousComplete ? "in-progress" : "locked";
  };

  const getFirstIncompleteLessonId = (module: Module): string | undefined => {
    return module.lessons.find((l) => !l.isCompleted)?.id;
  };

  const calculateModuleProgress = (module: Module): number => {
    const total = module.lessons.length;
    if (total === 0) return 0;
    const completed = module.lessons.filter((l) => l.isCompleted).length;
    return Math.round((completed / total) * 100);
  };

  return {
    ...stats,
    getModuleStatus,
    getFirstIncompleteLessonId,
    calculateModuleProgress,
  };
}
