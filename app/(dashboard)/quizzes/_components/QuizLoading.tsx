import { Spin } from "antd";

export default function QuizLoading() {
  return (
    <div className="flex items-center justify-center h-96">
      <Spin size="large" />
    </div>
  );
}
