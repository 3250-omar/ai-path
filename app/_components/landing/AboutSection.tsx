"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Enter Your Goal",
    description: "Tell us what you want to learn or achieve",
  },
  {
    number: "02",
    title: "AI Builds Your Path",
    description: "Get a personalized roadmap with lessons and milestones",
  },
  {
    number: "03",
    title: "Learn & Track Progress",
    description: "Follow your path, complete quizzes, and watch your growth",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-32 px-6 bg-slate-900 border-y border-slate-800"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-linear-to-r from-indigo-500 via-cyan-500 to-indigo-500 opacity-20 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center group relative"
            >
              <div className="w-24 h-24 rounded-full bg-slate-950 border border-slate-800 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(99,102,241,0.1)] group-hover:border-indigo-500/50 group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-300 relative z-10">
                <span className="bg-linear-to-br from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {step.title}
              </h3>
              <p className="text-slate-400 leading-relaxed px-4">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
