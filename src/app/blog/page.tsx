import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Sparkles,
  ArrowRight,
  Clock,
  BookOpen,
  ChevronRight,
  Flame,
  Dumbbell,
  Tag,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Cravey Blog — High-Protein Swaps, Macro Science & Healthy Food Hacks",
  description:
    "Explore research-backed nutrition guides, chef-crafted craving swaps, macro meal prep tutorials, and health facts to crush late-night sweet tooth urges.",
  keywords: [
    "healthy recipes blog",
    "craving swaps",
    "high protein desserts",
    "macro tracking tips",
    "meal prep guides",
    "nutrition science",
  ],
  openGraph: {
    title: "Cravey Nutrition & Recipe Blog",
    description:
      "Turn late-night junk food cravings into high-protein visual recipes. Evidence-based culinary and metabolic science.",
    url: "https://cravey.app/blog",
    siteName: "Cravey",
    images: [
      {
        url: "/images/snickers-dates-card.jpg",
        width: 1080,
        height: 1920,
        alt: "Cravey Blog",
      },
    ],
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.slice(1);

  return (
    <div className="min-h-screen bg-white text-[#0F1012] selection:bg-[#FFE3D6] selection:text-[#C4380A]">
      {/* 1. Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#EAEAE6]">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-[#EAEAE6] shadow-sm flex items-center justify-center bg-[#F05A28]">
              <Image
                src="/app-icon.png"
                alt="Cravey App Icon"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#0F1012] group-hover:text-[#F05A28] transition-colors">
                Cravey
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#F05A28] -mt-1">
                Health & Recipe Journal
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#52525B]">
            <Link href="/" className="hover:text-[#0F1012] transition-colors">
              App Overview
            </Link>
            <Link href="/#app-tour" className="hover:text-[#0F1012] transition-colors">
              Features
            </Link>
            <Link href="/blog" className="text-[#F05A28] font-bold">
              Blog & Science
            </Link>
            <Link href="/#faq" className="hover:text-[#0F1012] transition-colors">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#waitlist"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#0F1012] text-white hover:bg-[#27272A] transition-colors"
            >
              Get Free Recipes
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Blog Header Hero */}
      <section className="pt-14 pb-12 bg-[#FAFAF8] border-b border-[#EAEAE6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#71717A] mb-4">
            <Link href="/" className="hover:text-[#0F1012]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#F05A28]">Blog & Nutrition Journal</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FFF3EE] text-[#F05A28] border border-[#FDE5D9] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>Evidence-Based Craving Swaps</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1012] tracking-tight leading-[1.12]">
              Macro science, clean swaps, and guilt-free culinary secrets.
            </h1>
            <p className="text-base sm:text-lg text-[#52525B] mt-4 leading-relaxed">
              Explore in-depth articles on beating sugar cravings, meal-prep batching, USDA nutritional facts, and turning viral food reels into high-protein fuel.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Article */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#71717A]">
              Featured Guide
            </h2>
            <span className="text-xs font-semibold text-[#F05A28] bg-[#FFF3EE] px-2.5 py-1 rounded-full">
              ★ Editor’s Pick
            </span>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block bg-[#FAFAF8] rounded-3xl border border-[#EAEAE6] overflow-hidden hover:border-[#F05A28]/40 hover:shadow-xl hover:shadow-black/[0.04] transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-auto min-h-[300px] bg-[#F4F4F0] overflow-hidden">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#0F1012]/80 backdrop-blur-md text-white">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#71717A] mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F05A28]" />
                      {featuredPost.readTime}
                    </span>
                    <span>·</span>
                    <span>{featuredPost.publishedAt}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] group-hover:text-[#F05A28] transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#52525B] leading-relaxed line-clamp-3 mb-6">
                    {featuredPost.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.keywords.slice(0, 3).map((kw, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-lg bg-white border border-[#EAEAE6] text-[#71717A]"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#EAEAE6]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden bg-[#EAEAE6]">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        width={36}
                        height={36}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0F1012]">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-[11px] text-[#71717A]">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F05A28] group-hover:translate-x-1 transition-transform">
                    Read Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 4. Articles Grid */}
        <div>
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#71717A] mb-6">
            All Articles & Recipes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between bg-white rounded-3xl border border-[#EAEAE6] overflow-hidden hover:border-[#F05A28]/40 hover:shadow-lg hover:shadow-black/[0.04] transition-all"
              >
                <div>
                  <div className="relative h-48 w-full bg-[#F4F4F0] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0F1012]/80 backdrop-blur-md text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-[#71717A] mb-2.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#F05A28]" />
                        {post.readTime}
                      </span>
                      <span>·</span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F1012] group-hover:text-[#F05A28] transition-colors leading-snug line-clamp-2 mb-3">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed line-clamp-3 mb-4">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#F0F0EC] flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#71717A]">
                    By {post.author.name}
                  </div>
                  <span className="text-xs font-bold text-[#F05A28] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 5. Bottom Conversion Callout */}
        <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F1012] to-[#27272A] text-white text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F05A28]">
              Never Miss A High-Protein Swap
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get weekly guilt-free recipes sent straight to your inbox.
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Join 1,400+ fitness cravers. We share one tested sweet swap, complete with knolled ingredients and exact macros, every single Sunday.
            </p>
            <div className="pt-2">
              <Link
                href="/#waitlist"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-[#F05A28] text-white hover:bg-[#DE5227] transition-all shadow-md text-sm"
              >
                <span>Join the Cravey Community</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer className="py-12 bg-[#FAFAF8] border-t border-[#EAEAE6] text-xs text-[#71717A] mt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F1012]">Cravey Inc.</span>
            <span>·</span>
            <span>© 2026 Cravey. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#0F1012] transition-colors">
              Home
            </Link>
            <Link href="/blog" className="hover:text-[#0F1012] transition-colors">
              Blog Journal
            </Link>
            <Link href="/sitemap.xml" className="hover:text-[#0F1012] transition-colors">
              Sitemap
            </Link>
            <a
              href="mailto:hello@cravey.app"
              className="hover:text-[#0F1012] transition-colors"
            >
              hello@cravey.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
