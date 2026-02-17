"use client";

import {
  RocketOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  BulbOutlined,
  AimOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import StarBackground from "../animations/StarBackground";
import GradientText from "../animations/GradientText";
import SpotlightButton from "../animations/SpotlightButton";

const heroFeatures = [
  { icon: <BulbOutlined className="text-2xl" />, label: "AI Brain" },
  { icon: <AimOutlined className="text-2xl" />, label: "Goal Setting" },
  { icon: <LineChartOutlined className="text-2xl" />, label: "Track Progress" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-lvh flex items-center justify-center overflow-hidden bg-slate-950 pt-32 pb-20 px-6">
      <StarBackground />

      {/* Mesh Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <RocketOutlined />
          AI-Powered Learning Platform
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight"
        >
          Build Your Personalized <br className="hidden md:block" />
          <GradientText colors={["#6366f1", "#06b6d4", "#6366f1"]}>
            Learning Path
          </GradientText>{" "}
          with AI
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto mb-12"
        >
          Tell us your goal and get a roadmap, lessons, quizzes, and weekly plan
          instantly. Your journey to mastery starts here.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
        >
          <Link href="/signup">
            <SpotlightButton>
              Generate My Path <ArrowRightOutlined />
            </SpotlightButton>
          </Link>
          <button className="group flex items-center gap-2 text-slate-300 hover:text-white transition-colors px-8 py-3 rounded-full border border-slate-800 hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm">
            <PlayCircleOutlined className="text-xl group-hover:text-indigo-400 transition-colors" />
            Watch Demo
          </button>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-20 border-t border-slate-800/50 pt-10"
        >
          {heroFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/30 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300">
                {feature.icon}
              </div>
              <span className="text-sm text-slate-400 font-medium group-hover:text-slate-200 transition-colors">
                {feature.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
