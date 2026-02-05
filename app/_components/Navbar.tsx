"use client";

import Link from "next/link";
import { Button } from "antd";
import PathAILogo from "./PathAILogo";

export default function Navbar() {
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <PathAILogo size={36} />
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button type="text" className="font-medium">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              type="primary"
              className="rounded-full! bg-primary! px-5! font-medium!"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
