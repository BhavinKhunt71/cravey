"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Zap,
  Smartphone,
  Sparkles,
  BookOpen,
  HelpCircle,
  Flame,
  ArrowRight,
  Download,
} from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "./StoreButtons";

interface NavbarProps {
  currentPath?: string;
}

export default function Navbar({ currentPath = "/" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "The Swaps",
      href: "/#swaps",
      emoji: "⚡",
      icon: Zap,
    },
    {
      name: "The Truth",
      href: "/#controversy",
      emoji: "🔥",
      icon: Flame,
      badge: "Must Read",
    },
    {
      name: "App Tour",
      href: "/#app-tour",
      emoji: "📱",
      icon: Smartphone,
    },
    {
      name: "Visual Recipes",
      href: "/#knolling",
      emoji: "🥑",
      icon: Sparkles,
    },
    {
      name: "Recipes & Science",
      href: "/blog",
      emoji: "📖",
      icon: BookOpen,
      badge: "New",
    },
    {
      name: "FAQ",
      href: "/#faq",
      emoji: "💬",
      icon: HelpCircle,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EAEAE6] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-2xl overflow-hidden border border-[#EAEAE6] shadow-sm flex items-center justify-center bg-[#F05A28] group-hover:scale-105 transition-transform">
            <Image
              src="/app-icon.png"
              alt="Cravey App Icon"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#0F1012] group-hover:text-[#F05A28] transition-colors">
                Cravey
              </span>
              <span className="text-[10px] font-bold text-[#F05A28] bg-[#FFF3EE] px-1.5 py-0.2 rounded-md uppercase">
                App
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-wider font-bold text-[#71717A] -mt-0.5">
              Cravings into Macros
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Emojis & Icons (never wraps) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-[#52525B]">
          {navLinks.map((link) => {
            const isBlogActive = currentPath.startsWith("/blog") && link.href === "/blog";
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 group ${
                  isBlogActive
                    ? "text-[#F05A28] bg-[#FFF3EE] font-bold"
                    : "hover:text-[#0F1012] hover:bg-[#F4F4F0]"
                }`}
              >
                <span className="text-base group-hover:scale-110 transition-transform">
                  {link.emoji}
                </span>
                <span>{link.name}</span>
                {link.badge && (
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                      link.badge === "Must Read"
                        ? "bg-red-100 text-red-600"
                        : "bg-[#FFF3EE] text-[#F05A28]"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Subtle Live Badge (visible on XL) */}
          <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            <span>Live on iOS & Android</span>
          </span>

          {/* Download App CTA */}
          <Link
            href="/#download"
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0F1012] text-white hover:bg-[#27272A] hover:shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#F05A28]" />
            <span>Get Free App</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2.5 rounded-xl border border-[#EAEAE6] text-[#0F1012] hover:bg-[#F4F4F0] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAEAE6] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F0EC]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              Navigation
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0FDF4] text-[#16A34A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse"></span>
              Live in Stores
            </span>
          </div>

          <nav className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-3 rounded-xl text-sm font-bold text-[#0F1012] hover:bg-[#FAFAF8] flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{link.emoji}</span>
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      link.badge === "Must Read"
                        ? "bg-red-100 text-red-600"
                        : "bg-[#FFF3EE] text-[#F05A28]"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-[#F0F0EC] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] block">
              Download Directly:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0F1012] text-white text-xs font-bold hover:bg-[#27272A] transition-colors"
              >
                <span> App Store</span>
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0F1012] text-white text-xs font-bold hover:bg-[#27272A] transition-colors"
              >
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
