"use client";

import {
  BulbOutlined,
  BookOutlined,
  RobotOutlined,
  LineChartOutlined,
  RocketOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import GlowingCard from "../animations/GlowingCard";

const features = [
  {
    icon: <BulbOutlined />,
    title: "Personalized Roadmaps",
    description:
      "AI-generated learning paths tailored to your goals and skill level",
  },
  {
    icon: <BookOutlined />,
    title: "AI Lessons",
    description: "Smart, adaptive lessons that evolve with your progress",
  },
  {
    icon: <RobotOutlined />,
    title: "Smart Quizzes",
    description: "Interactive assessments to reinforce your knowledge",
  },
  {
    icon: <LineChartOutlined />,
    title: "Progress Tracking",
    description: "Visualize your journey with detailed analytics and insights",
  },
  {
    icon: <RocketOutlined />,
    title: "AI Chat Tutor",
    description: "24/7 AI assistant to answer questions and guide you",
  },
  {
    icon: <TrophyOutlined />,
    title: "Gamification",
    description: "Earn badges, XP, and maintain streaks to stay motivated",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-32 px-6 bg-background relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Powerful{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">
              Features
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to master any skill, powered by advanced AI
            algorithms.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <GlowingCard className="h-full p-8 group">
                <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center text-indigo-400 text-2xl mb-6 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </GlowingCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
