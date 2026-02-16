"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import SpotlightButton from "../animations/SpotlightButton";

export default function CTASection() {
  return (
    <section className="py-32 px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-4xl p-12 md:p-24 text-center overflow-hidden border border-indigo-500/30"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-br from-indigo-900/40 via-purple-900/40 to-slate-900/40 z-0" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0" />

          {/* Glowing Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-indigo-100/70 mb-12 max-w-2xl mx-auto text-xl">
              Join thousands of learners who are achieving their goals with
              PathAI&apos;s personalized learning engine.
            </p>
            <Link href="/signup">
              <SpotlightButton className="bg-white! text-indigo-600! hover:scale-105! border-none! px-10! py-4! text-lg! font-bold!">
                Get Started for Free <ArrowRightOutlined />
              </SpotlightButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
