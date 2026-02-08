"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  Collapse,
  Progress,
  Tag,
  Typography,
  Button,
  Spin,
  Empty,
  message,
} from "antd";
import {
  CheckCircleFilled,
  ClockCircleOutlined,
  BookOutlined,
  TrophyOutlined,
  LinkOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import type { LearningPath } from "@/types/learning-path";
import PathAILogo from "../../_components/PathAILogo";

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

export default function LearningPathPage() {
  const params = useParams();
  const router = useRouter();
  const pathId = params?.id as string;

  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pathId) {
      router.push("/onboarding");
      return;
    }

    // Fetch learning path data
    fetchLearningPath();
  }, [pathId, router]);

  const fetchLearningPath = async () => {
    try {
      const res = await fetch(`/api/learning-path/${pathId}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to load learning path");
      }

      setLearningPath(data.path);
    } catch (err) {
      console.error("Error fetching learning path:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load learning path",
      );
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = () => {
    if (!learningPath) return 0;
    const totalLessons = learningPath.modules.reduce(
      (sum, mod) => sum + mod.lessons.length,
      0,
    );
    const completedLessons = learningPath.modules.reduce(
      (sum, mod) => sum + mod.lessons.filter((l) => l.isCompleted).length,
      0,
    );
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/30 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !learningPath) {
    return (
      <div className="min-h-screen bg-slate-50/30 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <Empty
            description={error || "Learning path not found"}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={() => router.push("/onboarding")}>
              Create New Learning Path
            </Button>
          </Empty>
        </Card>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <PathAILogo size={32} textClassName="text-xl font-bold" />
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push("/onboarding")}
            >
              Back
            </Button>
          </div>

          <Title level={2} className="!mb-2">
            {learningPath.title}
          </Title>
          <Paragraph className="text-muted-foreground !mb-4">
            {learningPath.description}
          </Paragraph>

          <div className="flex flex-wrap gap-2 mb-4">
            <Tag color="blue" className="!m-0">
              {learningPath.difficulty.toUpperCase()}
            </Tag>
            <Tag icon={<ClockCircleOutlined />} color="purple" className="!m-0">
              {learningPath.estimatedDurationHours} hours
            </Tag>
            <Tag icon={<BookOutlined />} color="green" className="!m-0">
              {learningPath.modules.length} modules
            </Tag>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Text strong>Overall Progress</Text>
              <Text type="secondary">{Math.round(progress)}%</Text>
            </div>
            <Progress
              percent={Math.round(progress)}
              status={progress === 100 ? "success" : "active"}
              strokeColor={{
                "0%": "#4f46e5",
                "100%": "#2563eb",
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Collapse
          defaultActiveKey={["0"]}
          className="bg-white"
          bordered={false}
        >
          {learningPath.modules.map((module, moduleIndex) => {
            const completedLessons = module.lessons.filter(
              (l) => l.isCompleted,
            ).length;
            const totalLessons = module.lessons.length;
            const moduleProgress =
              totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

            return (
              <Panel
                key={moduleIndex}
                header={
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex items-center gap-3">
                      {module.isCompleted ? (
                        <CheckCircleFilled className="text-green-500 text-lg" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                          <Text className="text-xs font-bold">
                            {moduleIndex + 1}
                          </Text>
                        </div>
                      )}
                      <div>
                        <Text strong className="text-base">
                          {module.title}
                        </Text>
                        <div className="text-sm text-muted-foreground">
                          {module.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Text type="secondary" className="text-sm">
                        {completedLessons}/{totalLessons} lessons
                      </Text>
                    </div>
                  </div>
                }
              >
                <div className="mb-4">
                  <Progress
                    percent={Math.round(moduleProgress)}
                    size="small"
                    status={moduleProgress === 100 ? "success" : "active"}
                  />
                </div>

                <div className="space-y-4">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <Card
                      key={lesson.id}
                      size="small"
                      className={`${
                        lesson.isCompleted
                          ? "bg-green-50 border-green-200"
                          : "hover:shadow-sm"
                      } transition-all cursor-pointer`}
                      onClick={() =>
                        router.push(
                          `/learning-path/${pathId}/lesson/${lesson.id}`,
                        )
                      }
                    >
                      <div className="flex items-start gap-3">
                        {lesson.isCompleted ? (
                          <CheckCircleFilled className="text-green-500 text-lg mt-1" />
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300 mt-1" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Text
                              strong
                              className={
                                lesson.isCompleted ? "text-green-700" : ""
                              }
                            >
                              Lesson {lessonIndex + 1}: {lesson.title}
                            </Text>
                            {lesson.quiz && (
                              <Tag
                                icon={<TrophyOutlined />}
                                color="orange"
                                className="!m-0"
                              >
                                Quiz
                              </Tag>
                            )}
                          </div>

                          <Paragraph
                            ellipsis={{ rows: 2 }}
                            className="text-sm text-muted-foreground !mb-2"
                          >
                            {lesson.content.substring(0, 150)}...
                          </Paragraph>

                          {lesson.learningObjectives.length > 0 && (
                            <div className="mb-2">
                              <Text className="text-xs text-muted-foreground">
                                Objectives: {lesson.learningObjectives[0]}
                                {lesson.learningObjectives.length > 1 &&
                                  ` +${lesson.learningObjectives.length - 1} more`}
                              </Text>
                            </div>
                          )}

                          {lesson.resources.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              {lesson.resources
                                .slice(0, 3)
                                .map((resource, i) => (
                                  <Tag
                                    key={i}
                                    icon={<LinkOutlined />}
                                    className="!m-0"
                                    color="blue"
                                  >
                                    {resource.type}
                                  </Tag>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Panel>
            );
          })}
        </Collapse>
      </div>
    </div>
  );
}
