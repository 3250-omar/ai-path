import { Button, Card, Progress } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  lessonId: string | null;
  onRetry: () => void;
}

export default function QuizResult({
  score,
  totalQuestions,
  lessonId,
  onRetry,
}: QuizResultProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href={lessonId ? `/lessons?lessonId=${lessonId}` : "/dashboard"}>
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
          You scored {score} out of {totalQuestions}
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
          <Button size="large" onClick={onRetry} className="rounded-lg!">
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
