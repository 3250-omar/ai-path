"use client";

import { Button, Card, Progress, Tag, Spin, Empty } from "antd";
import {
  CheckCircleFilled,
  PlayCircleOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import type { LearningPath } from "@/types/learning-path";
import Link from "next/link";
import MarkdownRenderer from "@/app/_components/MarkdownRenderer";
import { useActiveLearningPath } from "@/app/hooks/useQueries";
import { useLearningPathStats } from "@/app/hooks/useLearningPathStats";

export default function RoadmapPage() {
  const { data: learningPath, isLoading: loading } = useActiveLearningPath();
  const {
    overallProgress,
    completedModules,
    totalModules,
    getModuleStatus,
    getFirstIncompleteLessonId,
    calculateModuleProgress,
  } = useLearningPathStats(learningPath);

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Learning Roadmap
          </h1>
          <p className="text-muted-foreground">
            Follow your personalized path to mastery
          </p>
        </div>
        <Link href="/onboarding">
          <Button
            type="default"
            className="rounded-lg! border-border!"
            icon={<ArrowRightOutlined />}
          >
            Create New Path
          </Button>
        </Link>
      </div>

      {/* Progress Overview */}
      <Card
        className="rounded-xl! border-border! bg-linear-to-r! from-slate-800! to-slate-900!"
        styles={{ body: { padding: 24 } }}
      >
        <div className="flex items-center justify-between text-white">
          <div>
            <p className="text-white/60 text-sm mb-1">Overall Progress</p>
            <p className="text-3xl font-bold">{overallProgress}%</p>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-1">Completed Modules</p>
            <p className="text-3xl font-bold">
              {completedModules} / {totalModules}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-sm mb-1">Learning Path</p>
            <p className="text-xl font-bold">{learningPath.title}</p>
          </div>
        </div>
      </Card>

      {/* Modules Timeline */}
      <div className=" flex flex-col gap-4">
        {learningPath.modules.map((module, index) => {
          const moduleProgress = calculateModuleProgress(module);
          const status = getModuleStatus(module, index);
          const firstIncompleteLessonId = getFirstIncompleteLessonId(module);

          return (
            <Card
              key={module.id}
              className="rounded-xl! border-border!"
              styles={{ body: { padding: 24 } }}
            >
              <div className="flex items-start gap-4">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      status === "completed"
                        ? "bg-green-500"
                        : status === "in-progress"
                          ? "bg-primary"
                          : "bg-gray-200"
                    }`}
                  >
                    {status === "completed" ? (
                      <CheckCircleFilled className="text-white text-lg" />
                    ) : status === "in-progress" ? (
                      <PlayCircleOutlined className="text-white text-lg" />
                    ) : (
                      <LockOutlined className="text-gray-400 text-lg" />
                    )}
                  </div>
                  {index < learningPath.modules.length - 1 && (
                    <div className="w-0.5 h-8 bg-gray-200 mt-2" />
                  )}
                </div>

                {/* Module Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {module.title}
                      </h3>
                      <MarkdownRenderer
                        content={module.description}
                        className="text-sm text-muted-foreground mb-2"
                      />
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>⏱ {module.estimatedDurationHours} hours</span>
                        <span>📚 {module.lessons.length} lessons</span>
                        <Tag
                          color={
                            status === "completed"
                              ? "green"
                              : status === "in-progress"
                                ? "blue"
                                : "default"
                          }
                        >
                          {status === "completed"
                            ? "Completed"
                            : status === "in-progress"
                              ? "In Progress"
                              : "Locked"}
                        </Tag>
                      </div>
                    </div>

                    {/* Action Button */}
                    {status !== "locked" && firstIncompleteLessonId && (
                      <Link
                        href={`/lessons?lessonId=${firstIncompleteLessonId}`}
                      >
                        <Button
                          type={
                            status === "in-progress" ? "primary" : "default"
                          }
                          className={`rounded-lg! ${
                            status === "in-progress" ? "bg-primary!" : ""
                          }`}
                          icon={
                            status === "in-progress" ? (
                              <PlayCircleOutlined />
                            ) : null
                          }
                        >
                          {status === "completed" ? "Review" : "Continue"}
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {status !== "locked" && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">
                          Progress
                        </span>
                        <span className="text-sm font-medium text-primary">
                          {Math.round(moduleProgress)}%
                        </span>
                      </div>
                      <Progress
                        percent={Math.round(moduleProgress)}
                        showInfo={false}
                        strokeColor="#4f46e5"
                        railColor="#e5e7eb"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* CTA Banner */}
      {overallProgress < 100 && (
        <Card
          className="rounded-xl! border-0! bg-linear-to-r! from-slate-800! to-slate-900!"
          styles={{ body: { padding: 32 } }}
        >
          <div className="text-center text-white">
            <h2 className="text-xl font-bold mb-2">
              Ready for the next challenge?
            </h2>
            <p className="text-white/70 mb-4">
              Continue your learning journey and level up your skills
            </p>
            {learningPath.modules.find((m) => !m.isCompleted) && (
              <Link
                href={`/lessons?lessonId=${getFirstIncompleteLessonId(
                  learningPath.modules.find((m) => !m.isCompleted)!,
                )}`}
              >
                <Button
                  className="bg-white! text-slate-900! border-0! rounded-lg! font-medium!"
                  icon={<ArrowRightOutlined />}
                >
                  Continue Learning
                </Button>
              </Link>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
