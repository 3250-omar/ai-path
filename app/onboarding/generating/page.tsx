"use client";

import { useEffect, useState } from "react";
import { Progress, Spin } from "antd";
import {
  CheckCircleFilled,
  LoadingOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import PathAILogo from "../../_components/PathAILogo";

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

  useEffect(() => {
    let stepIndex = 0;
    let progressValue = 0;

    const runStep = () => {
      if (stepIndex >= generationSteps.length) {
        // All steps complete, redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
        return;
      }

      setCurrentStep(stepIndex);

      // Animate progress during this step
      const stepDuration = generationSteps[stepIndex].duration;
      const progressIncrement = 100 / generationSteps.length;
      const startProgress = progressValue;
      const endProgress = startProgress + progressIncrement;
      const intervalDuration = 50;
      const steps = stepDuration / intervalDuration;
      const incrementPerStep = progressIncrement / steps;

      const progressInterval = setInterval(() => {
        progressValue += incrementPerStep;
        if (progressValue >= endProgress) {
          progressValue = endProgress;
          clearInterval(progressInterval);
          stepIndex++;
          setTimeout(runStep, 300);
        }
        setProgress(Math.min(progressValue, 100));
      }, intervalDuration);
    };

    // Start after a short delay
    setTimeout(runStep, 500);
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
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
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
          trailColor="#e5e7eb"
          className="!mb-0"
        />
      </div>
    </div>
  );
}
