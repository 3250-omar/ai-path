"use client";

import { Rate, Avatar } from "antd";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    content:
      "PathAI helped me transition from marketing to tech in just 6 months. The personalized roadmap was a game-changer!",
    avatar: "S",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Data Scientist",
    content:
      "The AI tutor feels like having a personal mentor available 24/7. Best learning platform I've used.",
    avatar: "M",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Designer",
    content:
      "I love the gamification aspect! Earning badges and tracking my streak keeps me motivated every day.",
    avatar: "E",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-32 px-6 bg-slate-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            What Our Learners Say
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Join thousands of successful learners
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors relative flex flex-col">
                <div className="absolute top-0 right-0 p-8 opacity-10 font-serif text-8xl text-indigo-500 leading-none pointer-events-none">
                  &rdquo;
                </div>

                <Rate
                  disabled
                  defaultValue={testimonial.rating}
                  className="text-yellow-500 mb-6 text-xl"
                />
                <p className="text-slate-300 mb-8 leading-relaxed text-lg grow">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <Avatar
                    size={48}
                    style={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    }}
                  >
                    {testimonial.avatar}
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
