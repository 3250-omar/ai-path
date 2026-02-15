"use client";

import { useState, Suspense, useMemo } from "react";
import { Button, Card, Radio, Progress, message, Spin, Empty } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import MarkdownRenderer from "@/app/_components/MarkdownRenderer";
import type { Quiz } from "@/types/learning-path";
import { useActiveLearningPath } from "@/app/hooks/useQueries";
import { useSubmitQuiz } from "@/app/hooks/useMutations";

function QuizzesContent() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId");

  const { data: learningPath, isLoading: loading } = useActiveLearningPath();
  const submitQuiz = useSubmitQuiz();

  const { quiz, lessonTitle } = useMemo(() => {
    if (!learningPath || !lessonId) return { quiz: null, lessonTitle: "" };

    for (const mod of learningPath.modules) {
      const lesson = mod.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return { quiz: lesson.quiz || null, lessonTitle: lesson.title };
      }
    }
    return { quiz: null, lessonTitle: "" };
  }, [learningPath, lessonId]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) {
      message.warning("Please select an answer");
      return;
    }

    setAnswered(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      message.success("Correct! 🎉");
    } else {
      message.error("Incorrect. The correct answer is highlighted.");
    }
  };

  const handleNext = () => {
    if (!quiz) return;

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    if (!quiz) return;

    const finalScore = Math.round((score / quiz.questions.length) * 100);
    setShowResult(true);

    // Submit result to API
    try {
      await submitQuiz.mutateAsync({
        quizId: quiz.id,
        answers: { score: finalScore.toString() },
      });
      message.success("Quiz completed!");
    } catch (err) {
      console.error("Error submitting quiz:", err);
      message.warning("Failed to save score");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Empty description="Quiz not found or no lesson selected">
          <Link href="/dashboard">
            <Button type="primary">Back to Dashboard</Button>
          </Link>
        </Empty>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href={lessonId ? `/lessons?lessonId=${lessonId}` : "/dashboard"}
          >
            <Button icon={<ArrowLeftOutlined />} type="text">
              Back to Lesson
            </Button>
          </Link>
        </div>

        <Card
          className="rounded-xl! border-border! text-center"
          styles={{ body: { padding: 48 } }}
        >
          <div className="text-6xl mb-4">
            {percentage >= 70 ? "🎉" : percentage >= 50 ? "👍" : "📚"}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Quiz Complete!
          </h1>
          <p className="text-muted-foreground mb-6">
            You scored {score} out of {quiz.questions.length}
          </p>
          <Progress
            type="circle"
            percent={percentage}
            size={120}
            strokeColor={
              percentage >= 70
                ? "#22c55e" // green-500
                : percentage >= 50
                  ? "#f59e0b" // amber-500
                  : "#ef4444" // red-500
            }
            format={(percent) => (
              <span className="text-2xl font-bold">{percent}%</span>
            )}
          />
          <div className="flex gap-4 justify-center mt-8">
            <Button
              size="large"
              onClick={() => {
                setCurrentQuestionIndex(0);
                setScore(0);
                setSelectedAnswer(null);
                setAnswered(false);
                setShowResult(false);
              }}
              className="rounded-lg!"
            >
              Retry Quiz
            </Button>

            <Link
              href={lessonId ? `/lessons?lessonId=${lessonId}` : "/dashboard"}
            >
              <Button
                type="primary"
                size="large"
                className="rounded-lg! bg-primary!"
              >
                Back to Lesson
              </Button>
            </Link>
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
          <Link
            href={lessonId ? `/lessons?lessonId=${lessonId}` : "/dashboard"}
          >
            <Button
              icon={<ArrowLeftOutlined />}
              type="text"
              className="mb-2 p-0"
            >
              Back to Lesson
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            Quiz: {lessonTitle}
          </h1>
          <p className="text-muted-foreground">Test your knowledge</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-primary font-medium">
            Question {currentQuestionIndex + 1}/{quiz.questions.length}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          <Progress
            percent={Math.round(
              (currentQuestionIndex / quiz.questions.length) * 100,
            )}
            showInfo={false}
            strokeColor="#4f46e5"
            railColor="#e5e7eb"
          />
        </div>
        <span className="ml-4 text-sm text-muted-foreground">
          Score: {score}/{quiz.questions.length}
        </span>
      </div>

      {/* Question Card */}
      <Card
        className="rounded-xl! border-border!"
        styles={{ body: { padding: 32 } }}
      >
        <div className="mb-6">
          <MarkdownRenderer
            content={currentQuestion?.question || ""}
            className="text-lg font-semibold text-foreground!"
          />
        </div>

        <Radio.Group
          value={selectedAnswer}
          onChange={(e) => !answered && setSelectedAnswer(e.target.value)}
          className="w-full"
          disabled={answered}
        >
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => {
              const isCorrect = index === currentQuestion.correctAnswer;
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
                      <div
                        className={
                          answered && isCorrect
                            ? "text-green-700 font-medium"
                            : answered && isSelected && !isCorrect
                              ? "text-red-700 font-medium"
                              : "text-foreground"
                        }
                      >
                        <MarkdownRenderer
                          content={option}
                          className="prose-p:my-0"
                        />
                      </div>
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
          onClick={answered ? handleNext : handleSubmitAnswer}
          disabled={selectedAnswer === null && !answered}
          loading={submitQuiz.isPending}
          className="mt-8! h-12! rounded-xl! bg-linear-to-r! from-primary! to-secondary! border-0!"
        >
          {answered
            ? currentQuestionIndex < quiz.questions.length - 1
              ? "Next Question"
              : "See Results"
            : "Submit Answer"}
        </Button>
      </Card>
    </div>
  );
}

export default function QuizzesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Spin size="large" />
        </div>
      }
    >
      <QuizzesContent />
    </Suspense>
  );
}
