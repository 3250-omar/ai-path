"use client";

import { useEffect, useState, useRef } from "react";
import { Progress, Spin } from "antd";
import {
  CheckCircleFilled,
  LoadingOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import PathAILogo from "../../_components/PathAILogo";
import { useGeneratePath } from "@/app/hooks/useMutations";
import { message } from "antd";

// Generation steps
const generationSteps = [
  { label: "Analyzing your goal...", duration: 1500 },
  { label: "Creating personalized roadmap...", duration: 2000 },
  { label: "Generating lessons and quizzes...", duration: 2500 },
  { label: "Building your learning path...", duration: 2000 },
];

export default function GeneratingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const generatePath = useGeneratePath();
  const hasStarted = useRef(false);

  useEffect(() => {
    const learningGoal = sessionStorage.getItem("learningGoal");

    if (!learningGoal) {
      // No goal, redirect back to onboarding
      router.push("/onboarding");
      return;
    }

    if (hasStarted.current) return;
    hasStarted.current = true;

    // Call the mutation
    generatePath.mutate(learningGoal, {
      onSuccess: (data) => {
        // Store path ID and title
        sessionStorage.setItem("pathId", data.pathId);
        sessionStorage.setItem("pathTitle", data.title);

        // Complete progress animation immediately
        setProgress(100);
        setCurrentStep(generationSteps.length);

        setTimeout(() => {
          // Clear session storage mostly
          sessionStorage.removeItem("learningGoal");
          // Keep pathId/Title for dashboard welcome maybe? Or clear them.
          // The original code cleared them.
          sessionStorage.removeItem("pathId");
          sessionStorage.removeItem("pathTitle");

          router.push("/dashboard");
        }, 800);
      },
      onError: (error) => {
        console.error("Generation error:", error);
        message.error("Failed to generate path. Please try again.");
        setTimeout(() => {
          router.push("/onboarding");
        }, 2000);
      },
    });

    // Mock progress animation that slows down as it approaches 90%
    let progressValue = 0;
    const interval = setInterval(() => {
      if (progressValue < 90) {
        // Logarithmic slowdown or just simple increments that get smaller?
        // Let's just do linear for now but cap at 90
        // The original code had steps. Let's try to map progress to steps roughly.
        // Step 1: 0-25%, Step 2: 25-50%, etc.
        progressValue += 0.5; // slow increment
        setProgress(progressValue);

        // Update current step based on progress
        const stepIndex = Math.floor(
          (progressValue / 100) * generationSteps.length,
        );
        if (stepIndex < generationSteps.length) {
          setCurrentStep(stepIndex);
        }
      }
    }, 100);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col items-center justify-center py-8 px-4">
      {/* Logo */}
      <div className="mb-12">
        <PathAILogo size={40} textClassName="text-2xl font-bold text-primary" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-border p-8 md:p-12 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
            <RocketOutlined className="text-3xl text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Creating Your Learning Path
        </h1>
        <p className="text-muted-foreground mb-8">
          Our AI is analyzing your goal and building a personalized roadmap...
        </p>

        {/* Steps */}
        <div className="space-y-4 mb-8 text-left">
          {generationSteps.map((step, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 transition-opacity ${
                  isPending ? "opacity-40" : "opacity-100"
                }`}
              >
                {isComplete && (
                  <CheckCircleFilled className="text-green-500 text-lg" />
                )}
                {isCurrent && (
                  <Spin
                    indicator={
                      <LoadingOutlined className="text-primary text-lg" spin />
                    }
                  />
                )}
                {isPending && (
                  <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300" />
                )}
                <span
                  className={`${
                    isComplete
                      ? "text-green-600"
                      : isCurrent
                        ? "text-primary"
                        : "text-muted-foreground"
                  } ${isCurrent ? "font-medium" : ""}`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <Progress
          percent={Math.round(progress)}
          showInfo={false}
          strokeColor={{
            "0%": "#4f46e5",
            "100%": "#2563eb",
          }}
          railColor="#e5e7eb"
          className="mb-0!"
        />
      </div>
    </div>
  );
}
