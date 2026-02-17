"use client";

import { Suspense } from "react";
import {
  Button,
  Card,
  Progress,
  Tag,
  Breadcrumb,
  Spin,
  Empty,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  RobotOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  LinkOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { Lesson, Module } from "@/types/learning-path";
import MarkdownRenderer from "../../_components/MarkdownRenderer";
import { useActiveLearningPath } from "@/app/hooks/useQueries";
import { useCompleteLesson } from "@/app/hooks/useMutations";
import { useLearningPathStats } from "@/app/hooks/useLearningPathStats";

function LessonsContent() {
  const { data: learningPath, isLoading: loading } = useActiveLearningPath();
  const completeLesson = useCompleteLesson();
  const { calculateModuleProgress } = useLearningPathStats(learningPath);
  const searchParams = useSearchParams();
  const router = useRouter();

  const lessonId = searchParams.get("lessonId");

  const handleMarkComplete = async (id: string) => {
    try {
      await completeLesson.mutateAsync(id);
      message.success("Lesson marked as complete!");
    } catch (err) {
      console.error("Error marking lesson complete:", err);
      message.error(
        err instanceof Error
          ? err.message
          : "Failed to mark lesson as complete",
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (!learningPath) {
    return (
      <div className="space-y-6">
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 48 } }}
        >
          <Empty description="No active learning path found">
            <Link href="/onboarding">
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                className="rounded-lg! bg-primary!"
              >
                Create Learning Path
              </Button>
            </Link>
          </Empty>
        </Card>
      </div>
    );
  }

  // Find current lesson or default to first incomplete lesson
  let currentLesson: Lesson | undefined;
  let currentModule: Module | undefined;
  let currentModuleIndex = -1;
  let currentLessonIndex = -1;

  if (lessonId) {
    // Find specific lesson
    for (let mIndex = 0; mIndex < learningPath.modules.length; mIndex++) {
      const mod = learningPath.modules[mIndex];
      const lIndex = mod.lessons.findIndex((l) => l.id === lessonId);
      if (lIndex !== -1) {
        currentLesson = mod.lessons[lIndex];
        currentModule = mod;
        currentModuleIndex = mIndex;
        currentLessonIndex = lIndex;
        break;
      }
    }
  } else {
    // efficient find: first incomplete lesson
    for (let mIndex = 0; mIndex < learningPath.modules.length; mIndex++) {
      const mod = learningPath.modules[mIndex];
      const lIndex = mod.lessons.findIndex((l) => !l.isCompleted);
      if (lIndex !== -1) {
        currentLesson = mod.lessons[lIndex];
        currentModule = mod;
        currentModuleIndex = mIndex;
        currentLessonIndex = lIndex;
        break;
      }
    }

    // If all completed, show the very last lesson
    if (!currentLesson && learningPath.modules.length > 0) {
      const lastModule = learningPath.modules[learningPath.modules.length - 1];
      if (lastModule.lessons.length > 0) {
        currentModule = lastModule;
        currentModuleIndex = learningPath.modules.length - 1;
        currentLesson = lastModule.lessons[lastModule.lessons.length - 1];
        currentLessonIndex = lastModule.lessons.length - 1;
      }
    }
  }

  if (!currentLesson || !currentModule) {
    return (
      <div className="space-y-6">
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 48 } }}
        >
          <Empty description="No lessons found in this learning path" />
        </Card>
      </div>
    );
  }

  // Calculate navigations
  let prevLessonId: string | undefined;
  let nextLessonId: string | undefined;

  // Previous
  if (currentLessonIndex > 0) {
    prevLessonId = currentModule.lessons[currentLessonIndex - 1].id;
  } else if (currentModuleIndex > 0) {
    const prevMod = learningPath.modules[currentModuleIndex - 1];
    if (prevMod.lessons.length > 0) {
      prevLessonId = prevMod.lessons[prevMod.lessons.length - 1].id;
    }
  }

  // Next
  if (currentLessonIndex < currentModule.lessons.length - 1) {
    nextLessonId = currentModule.lessons[currentLessonIndex + 1].id;
  } else if (currentModuleIndex < learningPath.modules.length - 1) {
    const nextMod = learningPath.modules[currentModuleIndex + 1];
    if (nextMod.lessons.length > 0) {
      nextLessonId = nextMod.lessons[0].id;
    }
  }

  // Module Stats
  const moduleProgress = calculateModuleProgress(currentModule);

  return (
    <div className="flex gap-6">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb
            items={[
              { title: learningPath.title },
              { title: currentModule.title },
              { title: `Lesson ${currentLessonIndex + 1}` },
            ]}
            className="text-muted-foreground"
          />
          <Tag color="blue" className="rounded-full!">
            ~15 min
          </Tag>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-3xl font-bold text-foreground">
            <MarkdownRenderer
              content={currentLesson.title}
              className="prose-p:my-0"
            />
          </div>
          {currentLesson.isCompleted && (
            <Tag color="success" icon={<CheckCircleFilled />}>
              Completed
            </Tag>
          )}
        </div>

        {/* Lesson Content */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 32 } }}
        >
          {/* Content - rendered using reusable MarkdownRenderer */}
          <MarkdownRenderer
            content={currentLesson.content}
            className="text-lg leading-relaxed mb-8"
          />

          {/* Learning Objectives */}
          {currentLesson.learningObjectives &&
            currentLesson.learningObjectives.length > 0 && (
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <TrophyOutlined /> Learning Objectives
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  {currentLesson.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircleFilled className="text-primary mt-1" />
                      <div className="flex-1">
                        <MarkdownRenderer
                          content={obj}
                          className="prose-p:my-0"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Resources */}
          {currentLesson.resources && currentLesson.resources.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentLesson.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-border rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                        <LinkOutlined />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {res.title}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {res.type}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Completion Action */}
          <div className="flex flex-col items-center gap-4 mt-8">
            {!currentLesson.isCompleted && (
              <Button
                type="primary"
                size="large"
                className="h-12! px-8! rounded-xl!"
                icon={<CheckCircleFilled />}
                loading={completeLesson.isPending}
                onClick={() => handleMarkComplete(currentLesson!.id)}
              >
                Mark as Complete
              </Button>
            )}

            {currentLesson.quiz && (
              <Link href={`/quizzes?lessonId=${currentLesson.id}`}>
                <Button
                  size="large"
                  className="h-12! px-8! rounded-xl!"
                  icon={<TrophyOutlined />}
                >
                  {currentLesson.quiz.userScore !== undefined
                    ? `View Quiz Results (${currentLesson.quiz.userScore}%)`
                    : "Take Lesson Quiz"}
                </Button>
              </Link>
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            icon={<ArrowLeftOutlined />}
            className="rounded-lg! border-border!"
            disabled={!prevLessonId}
            onClick={() =>
              prevLessonId && router.push(`/lessons?lessonId=${prevLessonId}`)
            }
          >
            Previous Lesson
          </Button>
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
            className="rounded-lg! bg-linear-to-r! from-primary! to-secondary! border-0!"
            disabled={!nextLessonId}
            onClick={() =>
              nextLessonId && router.push(`/lessons?lessonId=${nextLessonId}`)
            }
          >
            Next Lesson
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 space-y-4 hidden xl:block">
        {/* Module Progress */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 20 } }}
        >
          <h3 className="font-semibold text-foreground mb-4">
            {currentModule.title}
          </h3>
          <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
            {currentModule.lessons.map((lesson, index) => {
              const isActive = lesson.id === currentLesson?.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => router.push(`/lessons?lessonId=${lesson.id}`)}
                  className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                    isActive ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                >
                  {lesson.isCompleted ? (
                    <CheckCircleFilled className="text-green-500 mt-1 shrink-0" />
                  ) : (
                    <div
                      className={`w-4 h-4 rounded-full border-2 mt-1 shrink-0 ${
                        isActive ? "border-primary" : "border-border"
                      }`}
                    />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-sm leading-tight ${
                        isActive
                          ? "text-primary font-medium"
                          : lesson.isCompleted
                            ? "text-muted-foreground"
                            : "text-foreground"
                      }`}
                    >
                      {lesson.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Lesson {index + 1}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Stats */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 20 } }}
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm text-muted-foreground">Module Progress</p>
                <span className="text-sm font-medium">
                  {Math.round(moduleProgress)}%
                </span>
              </div>
              <Progress
                percent={Math.round(moduleProgress)}
                showInfo={false}
                strokeColor="#4f46e5"
                className="mb-0!"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Time Spent Today
              </p>
              <p className="text-lg font-semibold text-foreground flex items-center gap-2">
                <ClockCircleOutlined className="text-primary" />
                45 minutes
              </p>
            </div>
          </div>
        </Card>

        {/* AI Tutor Button */}
        <Link href="/ai-chat">
          <Button
            type="primary"
            block
            size="large"
            icon={<RobotOutlined />}
            className="rounded-xl! bg-primary! h-12!"
          >
            Ask AI Tutor about this
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function LessonsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-12">
          <Spin size="large" />
        </div>
      }
    >
      <LessonsContent />
    </Suspense>
  );
}
