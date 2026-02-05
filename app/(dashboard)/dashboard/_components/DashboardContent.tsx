"use client";

import { Button, Card, Progress, Tag } from "antd";
import {
  ArrowRightOutlined,
  BookOutlined,
  TrophyOutlined,
  FireOutlined,
  ClockCircleOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { signOut } from "../../../(auth)/actions";

// Stats data
const stats = [
  {
    icon: <BookOutlined />,
    value: "24",
    total: "/80",
    label: "Lessons Completed",
    color: "bg-primary",
  },
  {
    icon: <TrophyOutlined />,
    value: "8",
    label: "Badges Earned",
    color: "bg-amber-500",
  },
  {
    icon: <FireOutlined />,
    value: "12",
    suffix: "days",
    label: "Day Streak",
    color: "bg-orange-500",
  },
  {
    icon: <ClockCircleOutlined />,
    value: "48",
    suffix: "hrs",
    label: "Hours Studied",
    color: "bg-green-500",
  },
];

// Today's tasks
const todaysTasks = [
  {
    id: 1,
    title: "Complete React Hooks lesson",
    duration: "30 min",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Take TypeScript quiz",
    duration: "15 min",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Practice State Management",
    duration: "45 min",
    status: "pending",
  },
  {
    id: 4,
    title: "Review Components chapter",
    duration: "20 min",
    status: "pending",
  },
];

// Weekly plan
const weeklyPlan = [
  { day: "Mon", tasks: 3, color: "bg-primary" },
  { day: "Tue", tasks: 4, color: "bg-primary" },
  { day: "Wed", tasks: 3, color: "bg-primary" },
  { day: "Thu", tasks: 0, color: "" },
  { day: "Fri", tasks: 0, color: "" },
  { day: "Sat", tasks: 0, color: "" },
  { day: "Sun", tasks: 0, color: "" },
];

// Recent badges
const recentBadges = [
  { name: "Beginner", icon: "🌱", color: "bg-green-100" },
  { name: "Explorer", icon: "🚀", color: "bg-purple-100" },
  { name: "Consistent", icon: "⚡", color: "bg-yellow-100" },
  { name: "Master", icon: "👑", color: "bg-amber-100" },
];

interface DashboardContentProps {
  user: User | null;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Learner";
  const completedTasks = 2;
  const totalTasks = 4;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-linear-gradient-to-r from-primary via-secondary to-primary rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {userName}! 👋
        </h1>
        <p className=" mb-4">You&apos;re making great progress. Keep it up!</p>
        <div className="flex gap-3">
          <Link href="/lessons">
            <Button
              className="text-primary! border-0! font-medium! rounded-lg!"
              icon={<ArrowRightOutlined />}
            >
              Continue Learning
            </Button>
          </Link>
          <Button className="bg-white/20! text-white! border-white/30! rounded-lg!">
            View Stats
          </Button>
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
              Current Roadmap
            </h2>
            <div className="flex items-center gap-6">
              <Progress
                type="circle"
                percent={72}
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
                <h3 className="font-semibold text-foreground mb-2">
                  Custom Learning Path
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <span>📍 Next: Intermediate Skills</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span>📅 45 days remaining</span>
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

          {/* Today's Tasks */}
          <Card
            className="rounded-xl! border-border!"
            styles={{ body: { padding: 24 } }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Today&apos;s Tasks
              </h2>
              <Tag color="blue">
                {completedTasks}/{totalTasks} completed
              </Tag>
            </div>
            <div className="space-y-3">
              {todaysTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {task.status === "in-progress" ? (
                      <PlayCircleFilled className="text-amber-500 text-lg" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                    <div>
                      <p
                        className={`font-medium ${
                          task.status === "in-progress"
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {task.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ⏱ {task.duration}
                      </p>
                    </div>
                  </div>
                  {task.status === "pending" && (
                    <Button
                      type="primary"
                      size="small"
                      className="rounded-lg! bg-primary!"
                    >
                      Start
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Weekly Plan */}
          <Card
            className="rounded-xl! border-border!"
            styles={{ body: { padding: 24 } }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Weekly Plan
            </h2>
            <div className="space-y-3">
              {weeklyPlan.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground w-10">{day.day}</span>
                  <div className="flex-1 mx-3">
                    {day.tasks > 0 && (
                      <div
                        className={`h-2 ${day.color} rounded-full`}
                        style={{ width: `${(day.tasks / 5) * 100}%` }}
                      />
                    )}
                  </div>
                  <span className="text-muted-foreground">
                    {day.tasks > 0 ? `${day.tasks}/${day.tasks}` : "-"}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Badges */}
          <Card
            className="rounded-xl! border-border!"
            styles={{ body: { padding: 24 } }}
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Recent Badges
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {recentBadges.map((badge, index) => (
                <div
                  key={index}
                  className={`${badge.color} rounded-xl p-4 text-center`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <p className="text-xs font-medium text-foreground mt-1">
                    {badge.name}
                  </p>
                </div>
              ))}
            </div>
            <Button block className="mt-4! rounded-lg! border-border!">
              View All Badges
            </Button>
          </Card>

          {/* Progress Card */}
          <Card
            className="rounded-xl! border-0! bg-linear-to-br! from-amber-400! to-orange-500!"
            styles={{ body: { padding: 20 } }}
          >
            <div className="text-white">
              <span className="text-3xl">🎉</span>
              <p className="text-sm opacity-80 mt-2">This Week</p>
              <p className="text-xl font-bold">+24% Progress</p>
              <p className="text-sm opacity-80 mt-1">
                You&apos;re learning faster than 75% of learners! ⚡
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
