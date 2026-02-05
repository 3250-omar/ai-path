"use client";

import { Button, Card, Avatar, Rate } from "antd";
import {
  RocketOutlined,
  BulbOutlined,
  BookOutlined,
  RobotOutlined,
  LineChartOutlined,
  TrophyOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  AimOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

// Feature data
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

// How it works steps
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

// Testimonials
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

// Quick feature icons for hero
const heroFeatures = [
  { icon: <BulbOutlined className="text-2xl" />, label: "AI Brain" },
  { icon: <AimOutlined className="text-2xl" />, label: "Goal Setting" },
  { icon: <LineChartOutlined className="text-2xl" />, label: "Track Progress" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-indigo-50/50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <RocketOutlined />
            AI-Powered Learning Platform
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Build Your Personalized{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Learning Path
            </span>{" "}
            with AI
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Tell us your goal and get a roadmap, lessons, quizzes, and weekly
            plan instantly. Your journey to mastery starts here.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup">
              <Button
                type="primary"
                size="large"
                className="!h-12 !px-8 !rounded-full !text-base !font-medium !bg-primary hover:!bg-primary/90"
                icon={<ArrowRightOutlined />}
              >
                Generate My Path
              </Button>
            </Link>
            <Button
              size="large"
              className="!h-12 !px-8 !rounded-full !text-base !font-medium !border-border"
              icon={<PlayCircleOutlined />}
            >
              Watch Demo
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {heroFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                <span className="text-sm text-muted-foreground font-medium">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-xl font-bold flex items-center justify-center mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to master any skill
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="!border-border/50 hover:!shadow-lg transition-shadow !rounded-2xl"
                styles={{ body: { padding: 24 } }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary text-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Learners Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of successful learners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="!border-border/50 !rounded-2xl"
                styles={{ body: { padding: 24 } }}
              >
                <Rate
                  disabled
                  defaultValue={testimonial.rating}
                  className="text-yellow-400 mb-4"
                />
                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar
                    size={44}
                    style={{
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
                    }}
                  >
                    {testimonial.avatar}
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl p-10 md:p-16 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of learners who are achieving their goals with
              PathAI
            </p>
            <Link href="/signup">
              <Button
                size="large"
                className="!h-12 !px-8 !rounded-full !text-base !font-medium !bg-white !text-primary hover:!bg-white/90 !border-0"
                icon={<ArrowRightOutlined />}
              >
                Get Started for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
