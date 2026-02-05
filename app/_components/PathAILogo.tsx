"use client";

import { Avatar } from "antd";

interface PathAILogoProps {
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export default function PathAILogo({
  size = 32,
  showText = true,
  textClassName = "text-xl font-bold text-foreground",
}: PathAILogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        size={size}
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Brain icon */}
          <path
            d="M12 2C9.5 2 7.5 3.5 7 5.5C5.5 5.5 4 7 4 9C4 10.5 5 11.5 6 12C5 12.5 4 14 4 15.5C4 17.5 5.5 19 7.5 19C8 20.5 9.5 22 12 22C14.5 22 16 20.5 16.5 19C18.5 19 20 17.5 20 15.5C20 14 19 12.5 18 12C19 11.5 20 10.5 20 9C20 7 18.5 5.5 17 5.5C16.5 3.5 14.5 2 12 2Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 2V22"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 8L8 10M12 8L16 10M12 14L8 12M12 14L16 12"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Avatar>
      {showText && <span className={textClassName}>PathAI</span>}
    </div>
  );
}
