"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Input, Button, Card, Spin, message, Badge } from "antd";
import {
  SendOutlined,
  RobotOutlined,
  LoadingOutlined,
  CloseOutlined,
  MinusOutlined,
  AimOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import MarkdownRenderer from "./MarkdownRenderer";
import type { Lesson } from "@/types/learning-path";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
}

function AIChatFloatContent() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("lessonId");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hello! I'm your AI tutor. Ask me anything about your learning journey!",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lessonContext, setLessonContext] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (lessonId) {
      fetchLessonContext();
    } else {
      setLessonContext("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  const fetchLessonContext = async () => {
    try {
      const res = await fetch("/api/learning-path/active");
      const data = await res.json();

      if (data.success && data.path && lessonId) {
        for (const mod of data.path.modules) {
          const lesson = mod.lessons.find((l: Lesson) => l.id === lessonId);
          if (lesson) {
            const context = `Lesson: ${lesson.title}\n\nContent: ${lesson.content}\n\nLearning Objectives: ${lesson.learningObjectives?.join(", ")}`;
            setLessonContext(context);

            // Only add context message if not already added to avoid duplicates on navigation
            const contextMsg = `I see you're working on "${lesson.title}". How can I help?`;
            if (!messages.some((m) => m.content === contextMsg)) {
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  role: "assistant",
                  content: contextMsg,
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ]);
            }
            break;
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch lesson context:", error);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
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

      if (data.error) throw new Error(data.error);

      const aiMessage: Message = {
        id: Date.now() + 1,
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
      message.error("Failed to get response");
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <Card
          className="w-[380px] h-[500px] mb-4 flex flex-col overflow-hidden rounded-2xl! border-border! shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
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
          {/* Header */}
          <div className="p-4 bg-primary text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2 p-2">
              <RobotOutlined className="text-xl" />
              <div>
                <h3 className="text-sm font-bold text-white mb-0 leading-none">
                  AI Tutor
                </h3>
                <span className="text-[10px] opacity-80">
                  {lessonContext ? "Lesson Mode" : "General Mode"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="text"
                size="small"
                icon={<MinusOutlined className="text-white" />}
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20!"
              />
              <Button
                type="text"
                size="small"
                icon={<CloseOutlined className="text-white" />}
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20!"
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl p-3 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-white border border-border rounded-bl-none shadow-xs"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <MarkdownRenderer content={msg.content} />
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  )}
                  <div
                    className={`text-[9px] mt-1 opacity-60 ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-border rounded-2xl rounded-bl-none p-3 shadow-xs">
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 18 }} spin />
                    }
                  />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-white">
            <div className="flex gap-2">
              <Input
                placeholder="Ask your tutor..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={() => sendMessage(input)}
                disabled={isTyping}
                className="rounded-xl! text-sm"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={() => sendMessage(input)}
                loading={isTyping}
                className="rounded-xl! bg-primary!"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Toggle Button */}
      <Badge dot={lessonId ? true : false} offset={[-5, 5]} color="green">
        <Button
          type="primary"
          size="large"
          icon={<StarFilled style={{ fontSize: 24, color: "white" }} />}
          onClick={() => setIsOpen(!isOpen)}
          className={`h-14 w-14 rounded-full! shadow-xl flex items-center justify-center transition-transform hover:scale-105 ${isOpen ? "rotate-180" : ""}`}
          style={{
            background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
            border: "none",
          }}
        />
      </Badge>
    </div>
  );
}

export default function AIChatFloat() {
  return (
    <Suspense fallback={null}>
      <AIChatFloatContent />
    </Suspense>
  );
}
