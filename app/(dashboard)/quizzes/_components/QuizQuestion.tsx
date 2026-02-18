import { Button, Card, Radio } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import MarkdownRenderer from "@/app/_components/MarkdownRenderer";
import type { Question } from "@/types/learning-path";

interface QuizQuestionProps {
  question?: Question;
  selectedAnswer: number | null;
  answered: boolean;
  isSubmitting: boolean;
  isLastQuestion: boolean;
  onSelectAnswer: (index: number) => void;
  onSubmitAnswer: () => void;
  onNext: () => void;
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  answered,
  isSubmitting,
  isLastQuestion,
  onSelectAnswer,
  onSubmitAnswer,
  onNext,
}: QuizQuestionProps) {
  return (
    <Card
      className="bg-card! rounded-xl! border-border!"
      styles={{ body: { padding: 32 } }}
    >
      <div className="mb-6">
        <MarkdownRenderer
          content={question?.question || ""}
          className="text-lg font-semibold text-foreground!"
        />
      </div>

      <Radio.Group
        value={selectedAnswer}
        onChange={(e) => !answered && onSelectAnswer(e.target.value)}
        className="w-full"
        disabled={answered}
      >
        <div className="space-y-3">
          {question?.options.map((option: string, index: number) => {
            const isCorrect = index === question.correctAnswer;
            const isSelected = selectedAnswer === index;

            return (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                  answered
                    ? isCorrect
                      ? "border-green-500 bg-green-500/10 dark:bg-green-500/20"
                      : isSelected
                        ? "border-red-500 bg-red-500/10 dark:bg-red-500/20"
                        : "border-border"
                    : isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                }`}
                onClick={() => !answered && onSelectAnswer(index)}
              >
                <div className="flex items-center justify-between">
                  <Radio value={index}>
                    <div
                      className={
                        answered && isCorrect
                          ? "text-green-600 dark:text-green-400 font-medium"
                          : answered && isSelected && !isCorrect
                            ? "text-red-600 dark:text-red-400 font-medium"
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
        onClick={answered ? onNext : onSubmitAnswer}
        disabled={selectedAnswer === null && !answered}
        loading={isSubmitting}
        className="mt-8! h-12! rounded-xl! bg-linear-to-r! from-primary! to-secondary! border-0!"
      >
        {answered
          ? isLastQuestion
            ? "See Results"
            : "Next Question"
          : "Submit Answer"}
      </Button>
    </Card>
  );
}
