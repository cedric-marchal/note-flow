"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";
import { FileText, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Features",
      href: "/#features",
    },
    {
      label: "Sign in",
      href: "/sign-in",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              {env.NEXT_PUBLIC_APP_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-300 group py-2"
              >
                {link.label}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300 ease-out"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30"
            >
              <Link href="/sign-in">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-slate-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <X
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "rotate-0 opacity-100"
                    : "rotate-90 opacity-0"
                }`}
              />
              <Menu
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "-rotate-90 opacity-0"
                    : "rotate-0 opacity-100"
                }`}
              />
            </div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all duration-200 hover:translate-x-1 transform ${
                  isMobileMenuOpen
                    ? `animate-in slide-in-from-left-5 duration-300`
                    : ""
                }`}
                style={{
                  animationDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div
              className={`px-4 pt-2 ${
                isMobileMenuOpen
                  ? `animate-in slide-in-from-left-5 duration-300`
                  : ""
              }`}
              style={{
                animationDelay: isMobileMenuOpen
                  ? `${navLinks.length * 50}ms`
                  : "0ms",
              }}
            >
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 hover:scale-105 transition-all duration-300"
              >
                <Link
                  href="/sign-in"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
