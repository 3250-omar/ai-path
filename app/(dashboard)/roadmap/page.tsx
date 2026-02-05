"use client";

import { Button, Card, Progress, Tag } from "antd";
import {
  CheckCircleFilled,
  PlayCircleOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

// Roadmap modules
const modules = [
  {
    id: 1,
    title: "Fundamentals",
    description: "Master fundamentals concepts and practices",
    weeks: 3,
    topics: 10,
    status: "completed",
    progress: 100,
  },
  {
    id: 2,
    title: "Core Concepts",
    description: "Master core concepts concepts and practices",
    weeks: 5,
    topics: 15,
    status: "completed",
    progress: 100,
  },
  {
    id: 3,
    title: "Intermediate Skills",
    description: "Master intermediate skills concepts and practices",
    weeks: 4,
    topics: 12,
    status: "in-progress",
    progress: 60,
  },
  {
    id: 4,
    title: "Advanced Topics",
    description: "Master advanced topics concepts and practices",
    weeks: 5,
    topics: 14,
    status: "in-progress",
    progress: 20,
  },
  {
    id: 5,
    title: "Real-world Projects",
    description: "Master real-world projects concepts and practices",
    weeks: 3,
    topics: 8,
    status: "locked",
    progress: 0,
  },
];

export default function RoadmapPage() {
  const overallProgress = 45;
  const completedModules = 2;
  const totalModules = 8;
  const estimatedWeeks = 18;

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
        <Button
          type="primary"
          className="!rounded-lg !bg-primary"
          icon={<ArrowRightOutlined />}
        >
          Custom Learning Path
        </Button>
      </div>

      {/* Progress Overview */}
      <Card
        className="!rounded-xl !border-border !bg-gradient-to-r !from-slate-800 !to-slate-900"
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
            <p className="text-white/60 text-sm mb-1">Estimated Time Left</p>
            <p className="text-3xl font-bold">{estimatedWeeks} weeks</p>
          </div>
        </div>
      </Card>

      {/* Modules Timeline */}
      <div className="space-y-4">
        {modules.map((module, index) => (
          <Card
            key={module.id}
            className="!rounded-xl !border-border"
            styles={{ body: { padding: 24 } }}
          >
            <div className="flex items-start gap-4">
              {/* Timeline Dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    module.status === "completed"
                      ? "bg-green-500"
                      : module.status === "in-progress"
                        ? "bg-primary"
                        : "bg-gray-200"
                  }`}
                >
                  {module.status === "completed" ? (
                    <CheckCircleFilled className="text-white text-lg" />
                  ) : module.status === "in-progress" ? (
                    <PlayCircleOutlined className="text-white text-lg" />
                  ) : (
                    <LockOutlined className="text-gray-400 text-lg" />
                  )}
                </div>
                {index < modules.length - 1 && (
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
                    <p className="text-sm text-muted-foreground mb-2">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>⏱ {module.weeks} weeks</span>
                      <span>📚 {module.topics} topics</span>
                      <Tag
                        color={
                          module.status === "completed"
                            ? "green"
                            : module.status === "in-progress"
                              ? "blue"
                              : "default"
                        }
                      >
                        {module.status === "completed"
                          ? "Completed"
                          : module.status === "in-progress"
                            ? "In Progress"
                            : "Locked"}
                      </Tag>
                    </div>
                  </div>

                  {/* Action Button */}
                  {module.status !== "locked" && (
                    <Button
                      type={
                        module.status === "in-progress" ? "primary" : "default"
                      }
                      className={`!rounded-lg ${
                        module.status === "in-progress" ? "!bg-primary" : ""
                      }`}
                      icon={
                        module.status === "in-progress" ? (
                          <PlayCircleOutlined />
                        ) : null
                      }
                    >
                      {module.status === "completed" ? "Review" : "Continue"}
                    </Button>
                  )}
                </div>

                {/* Progress Bar */}
                {module.status !== "locked" && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-primary">
                        {module.progress}%
                      </span>
                    </div>
                    <Progress
                      percent={module.progress}
                      showInfo={false}
                      strokeColor="#4f46e5"
                      trailColor="#e5e7eb"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Banner */}
      <Card
        className="!rounded-xl !border-0 !bg-gradient-to-r !from-slate-800 !to-slate-900"
        styles={{ body: { padding: 32 } }}
      >
        <div className="text-center text-white">
          <h2 className="text-xl font-bold mb-2">
            Ready for the next challenge?
          </h2>
          <p className="text-white/70 mb-4">
            Continue with State Management and level up your skills
          </p>
          <Button
            className="!bg-white !text-slate-900 !border-0 !rounded-lg !font-medium"
            icon={<ArrowRightOutlined />}
          >
            Start Next Lesson
          </Button>
        </div>
      </Card>
    </div>
  );
}
