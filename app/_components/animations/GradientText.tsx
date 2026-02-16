"use client";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#ff0080", "#7928ca", "#ff0080"], // Default gradient
  animationSpeed = 3,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(-225deg, ${colors.join(", ")})`,
    backgroundSize: "200% auto",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    animation: `textGradient ${animationSpeed}s linear infinite`,
  };

  return (
    <span className={`inline-block ${className}`} style={gradientStyle}>
      <style jsx>{`
        @keyframes textGradient {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
      {children}
    </span>
  );
}
