"use client";

import { useState } from "react";
import { Button, Input, Tag, message } from "antd";
import { ArrowRightOutlined, BulbOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import PathAILogo from "../_components/PathAILogo";
import { useUserStore } from "@/app/stores/useUserStore";

const { TextArea } = Input;

// Suggestion chips
const suggestions = [
  "I want to become a Full Stack Web Developer",
  "Learn Data Science and Machine Learning from scratch",
  "Master React and modern frontend development",
  "Become a Mobile App Developer with React Native",
];

export default function OnboardingPage() {
  const [learningGoal, setLearningGoal] = useState("");
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const userName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Learner";

  const handleSubmit = async () => {
    if (!learningGoal.trim()) {
      message.warning("Please tell us what you want to learn!");
      return;
    }

    // Store learning goal only
    sessionStorage.setItem("learningGoal", learningGoal);

    // Navigate to generating page immediately
    router.push("/onboarding/generating");
  };
  const handleSuggestionClick = (suggestion: string) => {
    setLearningGoal(suggestion);
  };

  return (
    <div className="min-h-screen bg-slate-50/30 flex flex-col items-center py-8 px-4">
      {/* Logo */}
      <div className="mb-8">
        <PathAILogo size={40} textClassName="text-2xl font-bold text-primary" />
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-border p-8 md:p-12">
        {/* Welcome Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <BulbOutlined className="text-2xl text-primary" />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Welcome, {userName}! 👋
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Let&apos;s create your personalized learning path. Tell me what you
            want to learn, and I&apos;ll generate a custom roadmap just for you.
          </p>
        </div>

        {/* Learning Goal Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-primary mb-3">
            What do you want to learn?
          </label>
          <TextArea
            value={learningGoal}
            onChange={(e) => setLearningGoal(e.target.value)}
            placeholder="Example: I want to become a Full Stack Web Developer and learn React, Node.js, and databases..."
            className="!rounded-xl !bg-blue-50/50 !border-blue-100 !min-h-[140px] !text-base !p-4"
            autoSize={{ minRows: 5, maxRows: 8 }}
            // disabled={generatePath.isPending} // Removed
          />
        </div>

        {/* Suggestion Chips */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-3">
            Or try one of these:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Tag
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="!cursor-pointer !px-4 !py-2 !rounded-lg !text-sm !border-blue-200 !bg-blue-50 hover:!bg-blue-100 hover:!border-blue-300 transition-colors !text-primary"
              >
                {suggestion}
              </Tag>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          type="primary"
          size="large"
          block
          // loading={generatePath.isPending} // Removed as we redirect immediately
          onClick={handleSubmit}
          className="!h-14 !rounded-xl !text-base !font-medium !bg-gradient-to-r !from-primary !to-secondary !border-0"
          icon={<span className="mr-1">✨</span>}
        >
          Generate My Learning Path <ArrowRightOutlined />
        </Button>
      </div>
    </div>
  );
}
