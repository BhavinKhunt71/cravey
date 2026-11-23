"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Clock,
  ChevronRight,
  Flame,
  Dumbbell,
  Search,
  Filter,
  CheckCircle2,
  Utensils,
  Star,
} from "lucide-react";
import StoreButtons, { APP_STORE_URL } from "@/components/StoreButtons";
import Navbar from "@/components/Navbar";
import { BLOG_POSTS, BlogPost } from "@/data/blogs";

const CATEGORIES = [
  "All",
  "High-Protein Meals",
  "Craving Swaps",
  "Macro Science",
  "Meal Prep",
  "Recipe Tech",
] as const;

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.keywords.some((k) => k.toLowerCase().includes(query)) ||
        (post.recipeCard &&
          post.recipeCard.ingredients.some((i) =>
            i.item.toLowerCase().includes(query)
          ));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = BLOG_POSTS[0]; // High-protein street tacos

  return (
    <div className="min-h-screen bg-white text-[#0F1012] selection:bg-[#FFE3D6] selection:text-[#C4380A]">
      {/* 1. Header Navigation */}
      <Navbar currentPath="/blog" />

      {/* 2. Blog Header Hero */}
      <section className="pt-14 pb-12 bg-[#FAFAF8] border-b border-[#EAEAE6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#71717A] mb-4">
            <Link href="/" className="hover:text-[#0F1012]">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#F05A28]">Recipes & Nutrition Journal</span>
          </div>

          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FFF3EE] text-[#F05A28] border border-[#FDE5D9] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>Evidence-Based High-Protein Recipes</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1012] tracking-tight leading-[1.12]">
              Satisfy any craving with exact macros.
            </h1>
            <p className="text-base sm:text-lg text-[#52525B] mt-4 leading-relaxed">
              Chef-crafted recipes, exact gram measurements, USDA verified nutritional facts, and science-backed strategies for crushing sugar and fast-food urges.
            </p>
          </div>

          {/* Interactive Search Bar & Filters */}
          <div className="bg-white p-3 sm:p-4 rounded-3xl border border-[#EAEAE6] shadow-sm max-w-4xl space-y-3">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-[#A1A1AA] absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes (e.g. tacos, chicken, snickers, meal prep, chocolate)..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#F9F9F8] border border-[#EAEAE6] text-sm sm:text-base text-[#0F1012] placeholder-[#A1A1AA] focus:outline-none focus:border-[#F05A28] focus:ring-2 focus:ring-[#F05A28]/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs font-semibold text-[#71717A] hover:text-[#0F1012] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-[#71717A] flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3" />
                Filter:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#0F1012] text-white shadow-sm"
                      : "bg-[#FAFAF8] text-[#52525B] hover:bg-[#EAEAE6] border border-[#EAEAE6]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Recipe Guide (Hero Card) */}
      {!searchQuery && selectedCategory === "All" && (
        <section className="max-w-6xl mx-auto px-6 pt-12 pb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs uppercase tracking-widest font-bold text-[#71717A]">
              Featured Recipe Guide
            </h2>
            <span className="text-xs font-semibold text-[#F05A28] bg-[#FFF3EE] px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#F05A28] text-[#F05A28]" />
              Trending Recipe
            </span>
          </div>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block bg-[#FAFAF8] rounded-3xl border border-[#EAEAE6] overflow-hidden hover:border-[#F05A28]/40 hover:shadow-xl hover:shadow-black/[0.04] transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[300px] bg-[#F4F4F0] overflow-hidden">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#0F1012]/80 backdrop-blur-md text-white">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#71717A] mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#F05A28]" />
                      {featuredPost.readTime}
                    </span>
                    <span>·</span>
                    <span>{featuredPost.publishedAt}</span>
                    {featuredPost.recipeCard && (
                      <>
                        <span>·</span>
                        <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded-md">
                          {featuredPost.recipeCard.calories} kcal · {featuredPost.recipeCard.protein}g Protein
                        </span>
                      </>
                    )}
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
                    <span>View Recipe & Instructions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 4. Articles Grid */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#71717A]">
            {searchQuery
              ? `Search Results for "${searchQuery}" (${filteredPosts.length})`
              : selectedCategory === "All"
              ? "All Recipes & Health Guides"
              : `${selectedCategory} (${filteredPosts.length})`}
          </h2>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-[#FAFAF8] rounded-3xl p-12 text-center border border-[#EAEAE6] my-8 space-y-4">
            <Utensils className="w-10 h-10 text-[#A1A1AA] mx-auto" />
            <h3 className="text-lg font-bold text-[#0F1012]">No recipes found</h3>
            <p className="text-sm text-[#71717A] max-w-md mx-auto">
              We couldn&apos;t find any recipes matching &quot;{searchQuery}&quot;. Try searching for &quot;tacos&quot;, &quot;chicken&quot;, &quot;dates&quot;, or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 bg-[#0F1012] text-white text-xs font-semibold rounded-xl hover:bg-[#27272A] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between bg-white rounded-3xl border border-[#EAEAE6] overflow-hidden hover:border-[#F05A28]/40 hover:shadow-lg hover:shadow-black/[0.04] transition-all"
              >
                <div>
                  {/* 16:9 Uncropped Gourmet Photo */}
                  <div className="relative aspect-[16/9] w-full bg-[#F4F4F0] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0F1012]/80 backdrop-blur-md text-white">
                        {post.category}
                      </span>
                    </div>

                    {post.recipeCard && (
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-[#0F1012] border border-white/50 shadow-sm flex items-center gap-1.5">
                        <Dumbbell className="w-3 h-3 text-[#F05A28]" />
                        <span>{post.recipeCard.protein}g Protein</span>
                      </div>
                    )}
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

                <div className="px-6 pb-6 pt-3 border-t border-[#F0F0EC] flex items-center justify-between">
                  <div className="text-xs font-semibold text-[#71717A]">
                    By {post.author.name}
                  </div>
                  <span className="text-xs font-bold text-[#F05A28] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Recipe</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 5. Bottom Conversion Callout */}
        <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F1012] to-[#27272A] text-white text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F05A28]">
              Available on iOS & Android
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get all 150+ high-protein swaps right on your phone.
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Automatic macro calculations, portion scaling, aisle-by-aisle grocery lists, and 1-tap social recipe importing.
            </p>
            <div className="pt-2">
              <StoreButtons variant="light" size="lg" />
            </div>
          </div>
        </section>
      </main>

      {/* 6. Minimalist Footer (Cleaned: Sitemap removed per user request) */}
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
              Recipes & Guides
            </Link>
            <Link href="/#app-tour" className="hover:text-[#0F1012] transition-colors">
              App Features
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
