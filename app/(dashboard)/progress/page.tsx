"use client";

import { Card, Progress } from "antd";
import {
  FireOutlined,
  ClockCircleOutlined,
  BookOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

// Stats
const stats = [
  {
    icon: <FireOutlined />,
    value: "12",
    suffix: "days",
    label: "Current Streak",
    color: "bg-orange-500",
  },
  {
    icon: <ClockCircleOutlined />,
    value: "48",
    suffix: "hrs",
    label: "Total Hours",
    color: "bg-amber-500",
  },
  {
    icon: <BookOutlined />,
    value: "24",
    suffix: "lessons",
    label: "Completed",
    color: "bg-green-500",
  },
  {
    icon: <TrophyOutlined />,
    value: "8",
    suffix: "/12",
    label: "Badges Earned",
    color: "bg-purple-500",
  },
];

// Topics mastered
const topics = [
  { name: "HTML/CSS", progress: 100, color: "#22c55e" },
  { name: "JavaScript", progress: 95, color: "#3b82f6" },
  { name: "React", progress: 60, color: "#ef4444" },
  { name: "State Mgmt", progress: 25, color: "#f59e0b" },
  { name: "Backend", progress: 0, color: "#6b7280" },
];

// Badges
const badges = [
  { name: "First Steps", icon: "🌱", date: "Jan 10, 2026", earned: true },
  { name: "Week Warrior", icon: "⚡", date: "Jan 22, 2026", earned: true },
  { name: "Quick Learner", icon: "🚀", date: "Jan 28, 2026", earned: true },
  { name: "Quiz Master", icon: "🎯", date: "Feb 1, 2026", earned: true },
  { name: "Dedicated", icon: "💪", date: "Feb 4, 2026", earned: true },
  { name: "Explorer", icon: "🗺️", date: "Jan 18, 2026", earned: true },
  { name: "Perfectionist", icon: "⭐", date: "Jan 23, 2026", earned: true },
  { name: "Night Owl", icon: "🦉", date: "Jan 30, 2026", earned: true },
  { name: "Century", icon: "💯", date: "", earned: false },
  { name: "Master", icon: "👑", date: "", earned: false },
  { name: "Speedster", icon: "⚡", date: "", earned: false },
  { name: "Mentor", icon: "🎓", date: "", earned: false },
];

// Recent achievements
const achievements = [
  {
    title: "Completed React Hooks module",
    date: "Feb 4, 2026",
    icon: "🏆",
  },
  {
    title: "Earned 'Dedicated' badge",
    date: "Feb 3, 2026",
    icon: "🏅",
  },
  {
    title: "Perfect score on TypeScript quiz",
    date: "Feb 3, 2026",
    icon: "✨",
  },
  {
    title: "10 lesson streak!",
    date: "Jan 28, 2026",
    icon: "🔥",
  },
];

export default function ProgressPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Your Progress</h1>
        <p className="text-muted-foreground">
          Track your <span className="text-primary">learning journey</span> and{" "}
          <span className="text-primary">achievements</span>
        </p>
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
              <span className="text-muted-foreground text-sm">
                {stat.suffix}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 24 } }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Weekly Activity
          </h2>
          <div className="h-48 flex items-end justify-between gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, index) => {
                const heights = [60, 80, 45, 70, 90, 30, 50];
                return (
                  <div
                    key={day}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full bg-linear-to-t from-primary/20 to-primary/60 rounded-t-lg transition-all hover:from-primary/30 hover:to-primary/80"
                      style={{ height: `${heights[index]}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                );
              },
            )}
          </div>
        </Card>

        {/* Monthly Progress */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 24 } }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Monthly Progress
          </h2>
          <div className="h-48 flex items-end">
            <svg viewBox="0 0 400 150" className="w-full h-full">
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Area under line */}
              <path
                d="M 0 120 L 100 100 L 200 80 L 300 60 L 400 20 L 400 150 L 0 150 Z"
                fill="url(#gradient)"
              />
              {/* Line */}
              <path
                d="M 0 120 L 100 100 L 200 80 L 300 60 L 400 20"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Points */}
              <circle cx="0" cy="120" r="5" fill="#22d3ee" />
              <circle cx="100" cy="100" r="5" fill="#22d3ee" />
              <circle cx="200" cy="80" r="5" fill="#22d3ee" />
              <circle cx="300" cy="60" r="5" fill="#22d3ee" />
              <circle cx="400" cy="20" r="6" fill="#22d3ee" />
            </svg>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
        </Card>
      </div>

      {/* Topics Mastered */}
      <Card
        className="rounded-xl! border-border!"
        styles={{ body: { padding: 24 } }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Topics Mastered
        </h2>
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium text-foreground">
                {topic.name}
              </span>
              <div className="flex-1">
                <Progress
                  percent={topic.progress}
                  showInfo={false}
                  strokeColor={topic.color}
                  railColor="#374151"
                />
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: topic.color }}
              >
                {topic.progress}%
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Badges & Achievements Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Badges Collection */}
        <Card
          className="rounded-xl! border-border! lg:col-span-2"
          styles={{ body: { padding: 24 } }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Badges Collection
            </h2>
            <span className="text-sm text-muted-foreground">8/12</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`text-center p-3 rounded-xl ${
                  badge.earned
                    ? "bg-linear-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30"
                    : "bg-muted opacity-50"
                }`}
              >
                <span className="text-2xl">{badge.icon}</span>
                <p className="text-xs font-medium text-foreground mt-1">
                  {badge.name}
                </p>
                {badge.earned && (
                  <p className="text-[10px] text-muted-foreground">
                    {badge.date}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Achievements */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 24 } }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Recent Achievements
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-sm">
                  {achievement.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {achievement.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Motivation Banner */}
      <Card
        className="rounded-xl! border-0! bg-linear-to-r! from-primary! via-secondary! to-primary!"
        styles={{ body: { padding: 32 } }}
      >
        <div className="text-center text-white">
          <span className="text-4xl">🎉</span>
          <h2 className="text-xl font-bold mt-3 mb-2">
            You&apos;re doing amazing!
          </h2>
          <p className="text-white/80 mb-4">
            You&apos;ve completed 72% of your roadmap and earned 8 badges. Keep
            up the great work and you&apos;ll master Full Stack Development in
            no time!
          </p>
          <div className="flex justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-sm opacity-80">Top 15%</p>
              <p className="font-bold">Among all learners</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-sm opacity-80">+24%</p>
              <p className="font-bold">Faster this week</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
