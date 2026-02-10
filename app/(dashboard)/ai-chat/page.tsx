"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Input, Button, Card, Spin, message, Empty } from "antd";
import {
  SendOutlined,
  RobotOutlined,
  BulbOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
}

function AIChatContent() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm your AI tutor. I can help you with your learning path. Ask me anything!",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lessonContext, setLessonContext] = useState<string>("");
  const [loadingContext, setLoadingContext] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (lessonId) {
      fetchLessonContext();
    }
  }, [lessonId]);

  const fetchLessonContext = async () => {
    try {
      setLoadingContext(true);
      const res = await fetch("/api/learning-path/active");
      const data = await res.json();

      if (data.success && data.path && lessonId) {
        // Find the lesson
        for (const mod of data.path.modules) {
          const lesson = mod.lessons.find((l: any) => l.id === lessonId);
          if (lesson) {
            const context = `Lesson: ${lesson.title}\n\nContent: ${lesson.content}\n\nLearning Objectives: ${lesson.learningObjectives?.join(", ")}`;
            setLessonContext(context);

            // Add initial message about context
            setMessages((prev) => [
              ...prev,
              {
                id: prev.length + 1,
                role: "assistant",
                content: `I see you're working on "${lesson.title}". How can I help you with this lesson?`,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch lesson context:", error);
    } finally {
      setLoadingContext(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          context: lessonContext,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: data.content,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      message.error("Failed to get response form AI");
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Quick prompts specific to context or generic
  const quickPrompts = lessonContext
    ? [
        { icon: "🤔", text: "Summarize this lesson", color: "bg-blue-100" },
        { icon: "❓", text: "Create a quiz question", color: "bg-purple-100" },
        { icon: "💻", text: "Give me a code example", color: "bg-green-100" },
      ]
    : [
        { icon: "🔥", text: "Explain React hooks", color: "bg-orange-100" },
        {
          icon: "💡",
          text: "Best practices for state management",
          color: "bg-purple-100",
        },
        { icon: "📚", text: "What should I learn next?", color: "bg-blue-100" },
      ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <RobotOutlined className="text-primary" /> AI Tutor
        </h1>
        <p className="text-muted-foreground">
          {lessonContext
            ? "Asking about specific lesson context"
            : "General questions"}
        </p>
      </div>

      {/* Chat Area */}
      <Card
        className="flex-1 flex flex-col overflow-hidden rounded-xl! border-border!"
        styles={{
          body: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 0,
            overflow: "hidden",
          },
        }}
      >
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {loadingContext && (
            <div className="flex justify-center py-4">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                tip="Loading lesson context..."
              />
            </div>
          )}

          {messages.length === 1 && !loadingContext && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 mt-4">
              {quickPrompts.map((prompt, index) => (
                <div
                  key={index}
                  className={`${prompt.color} p-4 rounded-xl cursor-pointer hover:opacity-80 transition-opacity`}
                  onClick={() => sendMessage(prompt.text)}
                >
                  <div className="text-2xl mb-2">{prompt.icon}</div>
                  <div className="font-medium text-slate-700">
                    {prompt.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-white border border-border rounded-bl-none shadow-xs"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    msg.role === "user"
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-border rounded-2xl rounded-bl-none p-4 shadow-xs">
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-white">
          <div className="flex gap-2">
            <Input
              size="large"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={() => sendMessage(input)}
              disabled={isTyping}
              className="rounded-xl!"
            />
            <Button
              type="primary"
              size="large"
              icon={<SendOutlined />}
              onClick={() => sendMessage(input)}
              loading={isTyping}
              className="rounded-xl!"
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function AIChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Spin size="large" />
        </div>
      }
    >
      <AIChatContent />
    </Suspense>
  );
}
