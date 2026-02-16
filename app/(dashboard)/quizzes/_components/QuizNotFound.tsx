import { Button, Empty } from "antd";
import Link from "next/link";

export default function QuizNotFound() {
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
