"use client";

import Link from "next/link";
import { CheckCircleFilled } from "@ant-design/icons";
import PathAILogo from "../_components/PathAILogo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const benefits = [
    "Personalized learning roadmaps",
    "AI-powered lessons and quizzes",
    "24/7 AI tutor support",
    "Track your progress in real-time",
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Left Panel - Gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-secondary to-accent p-12 flex-col justify-center items-center text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-overlay" />

        {/* Content */}
        <div className="relative z-10 max-w-md text-center">
          {/* Brain Icon */}
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C9.5 2 7.5 3.5 7 5.5C5.5 5.5 4 7 4 9C4 10.5 5 11.5 6 12C5 12.5 4 14 4 15.5C4 17.5 5.5 19 7.5 19C8 20.5 9.5 22 12 22C14.5 22 16 20.5 16.5 19C18.5 19 20 17.5 20 15.5C20 14 19 12.5 18 12C19 11.5 20 10.5 20 9C20 7 18.5 5.5 17 5.5C16.5 3.5 14.5 2 12 2Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M12 2V22"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 8L8 10M12 8L16 10M12 14L8 12M12 14L16 12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold mb-4">
            Start Your Journey with PathAI
          </h1>
          <p className="text-white/80 mb-10 text-lg">
            Join thousands of learners achieving their goals with AI-powered
            personalized learning
          </p>

          {/* Benefits List */}
          <div className="space-y-4 text-left">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircleFilled className="text-cyan-300 text-lg" />
                <span className="text-white/90">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Card at bottom */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 dark:border-white/5" />
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-background!">
        {/* Mobile Logo */}
        <div className="lg:hidden p-6 border-b border-border bg-background!">
          <Link href="/">
            <PathAILogo size={36} />
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background!">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
