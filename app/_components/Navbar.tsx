"use client";

import Link from "next/link";
import PathAILogo from "./PathAILogo";

export default function Navbar() {
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/50 backdrop-blur-xl border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <PathAILogo size={40} />
        </Link>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-all font-medium text-sm tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-6">
          <Link href="/login">
            <button className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
              Get Started
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
