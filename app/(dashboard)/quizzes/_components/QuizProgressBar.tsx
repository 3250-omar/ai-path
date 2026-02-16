import { Progress } from "antd";

interface QuizProgressBarProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
}

export default function QuizProgressBar({
  currentQuestionIndex,
  totalQuestions,
  score,
}: QuizProgressBarProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex-1">
        <Progress
          percent={Math.round((currentQuestionIndex / totalQuestions) * 100)}
          showInfo={false}
          strokeColor="#4f46e5"
          railColor="#e5e7eb"
        />
      </div>
      <span className="ml-4 text-sm text-muted-foreground">
        Score: {score}/{totalQuestions}
      </span>
    </div>
  );
}
