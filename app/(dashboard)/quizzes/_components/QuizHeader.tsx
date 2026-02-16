import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

interface QuizHeaderProps {
  lessonTitle: string;
  lessonId: string | null;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export default function QuizHeader({
  lessonTitle,
  lessonId,
  currentQuestionIndex,
  totalQuestions,
}: QuizHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <Link href={lessonId ? `/lessons?lessonId=${lessonId}` : "/dashboard"}>
          <Button icon={<ArrowLeftOutlined />} type="text" className="mb-2 p-0">
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
          Question {currentQuestionIndex + 1}/{totalQuestions}
        </p>
      </div>
    </div>
  );
}
