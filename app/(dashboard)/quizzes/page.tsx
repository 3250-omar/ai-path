"use client";

import { useState } from "react";
import { Button, Card, Radio, Progress, message } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";

// Quiz data
const quizData = {
  title: "React Hooks Quiz",
  subtitle: "Test your knowledge of useEffect",
  questions: [
    {
      id: 1,
      question: "What is the primary purpose of the useEffect Hook in React?",
      options: [
        "To manage component state",
        "To perform side effects in function components",
        "To create custom components",
        "To handle user events",
      ],
      correct: 1,
    },
    {
      id: 2,
      question: "When does useEffect run by default?",
      options: [
        "Only on mount",
        "Only on unmount",
        "After every render",
        "Never automatically",
      ],
      correct: 2,
    },
    {
      id: 3,
      question: "What does an empty dependency array ([]) mean in useEffect?",
      options: [
        "Effect runs on every render",
        "Effect never runs",
        "Effect runs only once on mount",
        "Effect runs only on unmount",
      ],
      correct: 2,
    },
  ],
};

export default function QuizzesPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = quizData.questions[currentQuestion];
  const progress = (currentQuestion / quizData.questions.length) * 100;

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      message.warning("Please select an answer");
      return;
    }

    setAnswered(true);

    if (selectedAnswer === question.correct) {
      setScore(score + 1);
      message.success("Correct! 🎉");
    } else {
      message.error("Incorrect. The correct answer is highlighted.");
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const percentage = Math.round((score / quizData.questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <Card
          className="!rounded-xl !border-border text-center"
          styles={{ body: { padding: 48 } }}
        >
          <div className="text-6xl mb-4">
            {percentage >= 70 ? "🎉" : percentage >= 50 ? "👍" : "📚"}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Quiz Complete!
          </h1>
          <p className="text-muted-foreground mb-6">
            You scored {score} out of {quizData.questions.length}
          </p>
          <Progress
            type="circle"
            percent={percentage}
            size={120}
            strokeColor={
              percentage >= 70
                ? "#22c55e"
                : percentage >= 50
                  ? "#f59e0b"
                  : "#ef4444"
            }
            format={(percent) => (
              <span className="text-2xl font-bold">{percent}%</span>
            )}
          />
          <div className="flex gap-4 justify-center mt-8">
            <Button
              size="large"
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setSelectedAnswer(null);
                setAnswered(false);
                setShowResult(false);
              }}
              className="!rounded-lg"
            >
              Retry Quiz
            </Button>
            <Button
              type="primary"
              size="large"
              className="!rounded-lg !bg-primary"
            >
              Continue Learning
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {quizData.title}
          </h1>
          <p className="text-muted-foreground">{quizData.subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-primary font-medium">
            Question {currentQuestion + 1}/{quizData.questions.length}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <Progress
            percent={progress}
            showInfo={false}
            strokeColor="#4f46e5"
            trailColor="#e5e7eb"
          />
        </div>
        <span className="ml-4 text-sm text-muted-foreground">
          Score: {score}/{quizData.questions.length}
        </span>
      </div>

      {/* Question Card */}
      <Card
        className="!rounded-xl !border-border"
        styles={{ body: { padding: 32 } }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">
          {question.question}
        </h2>

        <Radio.Group
          value={selectedAnswer}
          onChange={(e) => !answered && setSelectedAnswer(e.target.value)}
          className="w-full"
          disabled={answered}
        >
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isCorrect = index === question.correct;
              const isSelected = selectedAnswer === index;

              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                    answered
                      ? isCorrect
                        ? "border-green-500 bg-green-50"
                        : isSelected
                          ? "border-red-500 bg-red-50"
                          : "border-border"
                      : isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => !answered && setSelectedAnswer(index)}
                >
                  <div className="flex items-center justify-between">
                    <Radio value={index}>
                      <span
                        className={
                          answered && isCorrect
                            ? "text-green-700"
                            : answered && isSelected && !isCorrect
                              ? "text-red-700"
                              : "text-foreground"
                        }
                      >
                        {option}
                      </span>
                    </Radio>
                    {answered && isCorrect && (
                      <CheckCircleFilled className="text-green-500 text-lg" />
                    )}
                    {answered && isSelected && !isCorrect && (
                      <CloseCircleFilled className="text-red-500 text-lg" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Radio.Group>

        {/* Action Button */}
        <Button
          type="primary"
          size="large"
          block
          onClick={answered ? handleNext : handleSubmit}
          className="!mt-8 !h-12 !rounded-xl !bg-gradient-to-r !from-primary !to-secondary !border-0"
        >
          {answered
            ? currentQuestion < quizData.questions.length - 1
              ? "Next Question"
              : "See Results"
            : "Submit Answer"}
        </Button>
      </Card>
    </div>
  );
}
