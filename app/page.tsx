"use client";

import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import HeroSection from "./_components/landing/HeroSection";
import HowItWorksSection from "./_components/landing/AboutSection";
import FeaturesSection from "./_components/landing/FeaturesSection";
import TestimonialsSection from "./_components/landing/TestimonialsSection";
import CTASection from "./_components/landing/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
