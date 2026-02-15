"use client";

import { Button, Card, Progress, Tag, Spin, Empty } from "antd";
import {
  ArrowRightOutlined,
  BookOutlined,
  TrophyOutlined,
  FireOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useLearningPathStats } from "@/app/hooks/useLearningPathStats";
import MarkdownRenderer from "@/app/_components/MarkdownRenderer";
import { useUserStore } from "@/app/stores/useUserStore";
import { useActiveLearningPath } from "@/app/hooks/useQueries";

export default function DashboardContent() {
  const user = useUserStore((state) => state.user);
  const { data: learningPath, isLoading: loading } = useActiveLearningPath();
  const {
    totalLessons,
    completedLessons,
    overallProgress,
    completedModules,
    totalModules,
    upcomingLessons,
  } = useLearningPathStats(learningPath);

  const userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Learner";

  // Find next incomplete module
  const nextModule = learningPath?.modules.find((mod) => !mod.isCompleted);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  // Empty state - no learning path
  if (!learningPath) {
    return (
      <div className="space-y-6">
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 48 } }}
        >
          <Empty
            description={
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Welcome, {userName}! 👋
                </h2>
                <p className="text-muted-foreground mb-4">
                  You haven&apos;t created a learning path yet. Let&apos;s get
                  started!
                </p>
              </div>
            }
          >
            <Link href="/onboarding">
              <Button
                type="primary"
                size="large"
                icon={<ArrowRightOutlined />}
                className="rounded-lg! bg-primary!"
              >
                Create Your Learning Path
              </Button>
            </Link>
          </Empty>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      icon: <BookOutlined />,
      value: completedLessons.toString(),
      total: `/${totalLessons}`,
      label: "Lessons Completed",
      color: "bg-primary",
    },
    {
      icon: <TrophyOutlined />,
      value: completedModules.toString(),
      total: `/${totalModules}`,
      label: "Modules Completed",
      color: "bg-amber-500",
    },
    {
      icon: <FireOutlined />,
      value: "0",
      suffix: "days",
      label: "Day Streak",
      color: "bg-orange-500",
    },
    {
      icon: <ClockCircleOutlined />,
      value: learningPath.estimatedDurationHours.toString(),
      suffix: "hrs",
      label: "Total Duration",
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-linear-gradient-to-r from-primary via-secondary to-primary rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {userName}! 👋
        </h1>
        <p className="mb-4">You&apos;re making great progress. Keep it up!</p>
        <div className="flex gap-3">
          <Link href="/lessons">
            <Button
              className="text-primary! border-0! font-medium! rounded-lg!"
              icon={<ArrowRightOutlined />}
            >
              Continue Learning
            </Button>
          </Link>
          <Link href="/roadmap">
            <Button className="bg-white/20! text-white! border-white/30! rounded-lg!">
              View Roadmap
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="rounded-xl! border-border!"
            styles={{ body: { padding: 20 } }}
          >
            <div
              className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center text-white text-lg mb-3`}
            >
              {stat.icon}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
              {stat.total && (
                <span className="text-muted-foreground">{stat.total}</span>
              )}
              {stat.suffix && (
                <span className="text-muted-foreground text-sm">
                  {stat.suffix}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Roadmap */}
          <Card
            className="rounded-xl! border-border!"
            styles={{ body: { padding: 24 } }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Current Learning Path
            </h2>
            <div className="flex items-center gap-6">
              <Progress
                type="circle"
                percent={overallProgress}
                size={100}
                strokeColor={{
                  "0%": "#4f46e5",
                  "100%": "#2563eb",
                }}
                format={(percent) => (
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary">
                      {percent}%
                    </span>
                    <p className="text-xs text-muted-foreground">Complete</p>
                  </div>
                )}
              />
              <div className="flex-1">
                <MarkdownRenderer
                  content={learningPath.title}
                  className="font-semibold text-foreground mb-2 prose-p:my-0"
                />
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <span>📍 Next: </span>
                  <MarkdownRenderer
                    content={nextModule?.title || "All done!"}
                    className="prose-p:my-0 inline-block font-medium"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span>📚 {learningPath.difficulty.toUpperCase()}</span>
                </div>
                <Link href="/roadmap">
                  <Button
                    type="primary"
                    size="small"
                    className="rounded-lg! bg-primary!"
                  >
                    View Roadmap
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Upcoming Lessons */}
          <Card
            className="rounded-xl! border-border!"
            styles={{ body: { padding: 24 } }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Upcoming Lessons
              </h2>
              <Tag color="blue">
                {completedLessons}/{totalLessons} completed
              </Tag>
            </div>
            <div className="space-y-3">
              {upcomingLessons.length === 0 ? (
                <Empty description="All lessons completed! 🎉" />
              ) : (
                upcomingLessons.map((lesson) => (
                  <Link key={lesson.id} href={`/lessons?lessonId=${lesson.id}`}>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                        <div>
                          <p className="font-medium text-foreground">
                            {lesson.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {lesson.moduleName}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="primary"
                        size="small"
                        className="rounded-lg! bg-primary!"
                      >
                        Start
                      </Button>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Module Overview */}
          <Card
            className="rounded-xl! border-border!"
            styles={{ body: { padding: 24 } }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Modules
            </h2>
            <div className="space-y-3">
              {learningPath.modules.slice(0, 5).map((module, index) => (
                <div
                  key={module.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span
                    className={
                      module.isCompleted
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }
                  >
                    {index + 1}. {module.title}
                  </span>
                  {module.isCompleted && (
                    <span className="text-green-500">✓</span>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Progress Card */}
          <Card
            className="rounded-xl! border-0! bg-linear-to-br! from-amber-400! to-orange-500!"
            styles={{ body: { padding: 20 } }}
          >
            <div className="text-white">
              <span className="text-3xl">🎉</span>
              <p className="text-sm opacity-80 mt-2">Your Progress</p>
              <p className="text-xl font-bold">{overallProgress}% Complete</p>
              <p className="text-sm opacity-80 mt-1">
                Keep up the great work! 💪
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
