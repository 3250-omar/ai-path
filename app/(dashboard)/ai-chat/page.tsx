"use client";

import { useState, useRef, useEffect } from "react";
import { Input, Button, Card } from "antd";
import { SendOutlined, RobotOutlined, BulbOutlined } from "@ant-design/icons";

// Quick prompts
const quickPrompts = [
  { icon: "🔥", text: "Explain React hooks", color: "bg-orange-100" },
  {
    icon: "💡",
    text: "Best practices for state management",
    color: "bg-purple-100",
  },
  { icon: "📚", text: "What should I learn next?", color: "bg-blue-100" },
  { icon: "🐛", text: "Help me debug this code", color: "bg-green-100" },
];

// Help topics
const helpTopics = [
  "Explaining concepts",
  "Code review",
  "Learning suggestions",
  "Debugging help",
  "Best practices",
  "Career guidance",
];

// Initial message
const initialMessage = {
  id: 1,
  role: "assistant" as const,
  content:
    "Hello! I'm your AI tutor. I can help you with any questions about your learning journey. Whether you need clarification on a concept, want to discuss best practices, or need guidance on your next steps, I'm here to help! What would you like to learn about today?",
  time: "09:31 AM",
};

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: `Great question about "${text}"! Here's what I can tell you...

This is a simulated response. In the full implementation, this would connect to an AI API like OpenAI or Google AI to provide intelligent, contextual responses based on your learning path and progress.

Would you like me to explain anything else?`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-130px)]">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <RobotOutlined className="text-white text-lg" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">AI Tutor</h2>
            <p className="text-sm text-green-500">● Online and ready to help</p>
          </div>
        </div>

        {/* Messages */}
        <Card
          className="flex-1! rounded-xl! border-border! overflow-hidden!"
          styles={{
            body: {
              padding: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === "assistant"
                      ? "bg-primary"
                      : "bg-linear-to-br from-primary to-secondary"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <RobotOutlined className="text-white text-sm" />
                  ) : (
                    <span className="text-white text-sm font-medium">O</span>
                  )}
                </div>
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    message.role === "assistant"
                      ? "bg-blue-50 rounded-tl-none"
                      : "bg-primary text-white rounded-tr-none"
                  }`}
                >
                  <p
                    className={`text-sm whitespace-pre-wrap ${
                      message.role === "assistant" ? "text-foreground" : ""
                    }`}
                  >
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-2 ${
                      message.role === "assistant"
                        ? "text-muted-foreground"
                        : "text-white/70"
                    }`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <RobotOutlined className="text-white text-sm" />
                </div>
                <div className="bg-blue-50 rounded-2xl rounded-tl-none p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={() => sendMessage(input)}
                placeholder="Ask me anything..."
                className="rounded-xl! bg-slate-50!"
                size="large"
              />
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={() => sendMessage(input)}
                className="rounded-xl! bg-primary! h-10! w-10!"
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="w-72 space-y-4">
        {/* Quick Prompts */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 20 } }}
        >
          <h3 className="font-semibold text-foreground mb-3">Quick Prompts</h3>
          <div className="space-y-2">
            {quickPrompts.map((prompt, index) => (
              <div
                key={index}
                onClick={() => handlePromptClick(prompt.text)}
                className={`${prompt.color} rounded-lg p-3 cursor-pointer hover:opacity-80 transition-opacity`}
              >
                <div className="flex items-center gap-2">
                  <span>{prompt.icon}</span>
                  <span className="text-sm font-medium text-foreground">
                    {prompt.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Help Topics */}
        <Card
          className="rounded-xl! border-border!"
          styles={{ body: { padding: 20 } }}
        >
          <h3 className="font-semibold text-foreground mb-3">
            I can help you with:
          </h3>
          <div className="space-y-2">
            {helpTopics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="text-green-500">+</span>
                <span className="text-primary">{topic}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Pro Tip */}
        <Card
          className="rounded-xl! border-border! bg-amber-50!"
          styles={{ body: { padding: 20 } }}
        >
          <div className="flex items-start gap-2">
            <BulbOutlined className="text-amber-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground text-sm">Pro Tip</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Be specific with your questions. The more context you provide,
                the better I can help you.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
