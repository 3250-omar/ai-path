"use client";

import { useState, Suspense, useMemo } from "react";
import { message } from "antd";
import { useSearchParams } from "next/navigation";
import { useActiveLearningPath } from "@/app/hooks/useQueries";
import { useSubmitQuiz } from "@/app/hooks/useMutations";
import QuizLoading from "./_components/QuizLoading";
import QuizNotFound from "./_components/QuizNotFound";
import QuizResult from "./_components/QuizResult";
import QuizHeader from "./_components/QuizHeader";
import QuizProgressBar from "./_components/QuizProgressBar";
import QuizQuestion from "./_components/QuizQuestion";

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

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setShowResult(false);
  };

  if (loading) {
    return <QuizLoading />;
  }

  if (!quiz) {
    return <QuizNotFound />;
  }

  if (showResult) {
    return (
      <QuizResult
        score={score}
        totalQuestions={quiz.questions.length}
        lessonId={lessonId}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <QuizHeader
        lessonTitle={lessonTitle}
        lessonId={lessonId}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quiz.questions.length}
      />

      <QuizProgressBar
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quiz.questions.length}
        score={score}
      />

      <QuizQuestion
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        answered={answered}
        isSubmitting={submitQuiz.isPending}
        isLastQuestion={currentQuestionIndex === quiz.questions.length - 1}
        onSelectAnswer={setSelectedAnswer}
        onSubmitAnswer={handleSubmitAnswer}
        onNext={handleNext}
      />
    </div>
  );
}

export default function QuizzesPage() {
  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizzesContent />
    </Suspense>
  );
}
