import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Clock,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Flame,
  Dumbbell,
  CheckCircle2,
  Share2,
  Utensils,
  Lightbulb,
  AlertCircle,
  HelpCircle,
  Bookmark,
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "@/data/blogs";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found | Cravey" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://cravey.app/blog/${post.slug}`,
      siteName: "Cravey",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Structured Data Schema for Google Search Console
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `https://cravey.app${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Cravey",
      logo: {
        "@type": "ImageObject",
        url: "https://cravey.app/app-icon.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cravey.app/blog/${post.slug}`,
    },
  };

  const jsonLdRecipe = post.recipeCard
    ? {
        "@context": "https://schema.org",
        "@type": "Recipe",
        name: post.recipeCard.title,
        description: post.summary,
        prepTime: `PT${parseInt(post.recipeCard.prepTime)}M`,
        cookTime: post.recipeCard.cookTime.includes("0") ? "PT0M" : `PT${parseInt(post.recipeCard.cookTime)}M`,
        recipeYield: `${post.recipeCard.servings} servings`,
        nutrition: {
          "@type": "NutritionInformation",
          calories: `${post.recipeCard.calories} calories`,
          proteinContent: `${post.recipeCard.protein} grams`,
          carbohydrateContent: `${post.recipeCard.carbs} grams`,
          fatContent: `${post.recipeCard.fat} grams`,
          fiberContent: `${post.recipeCard.fiber} grams`,
        },
        recipeIngredient: post.recipeCard.ingredients.map(
          (i) => `${i.amount} ${i.item} (${i.note || ""})`
        ),
        recipeInstructions: post.recipeCard.instructions.map((step, idx) => ({
          "@type": "HowToStep",
          text: step,
          position: idx + 1,
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-white text-[#0F1012] selection:bg-[#FFE3D6] selection:text-[#C4380A]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      {jsonLdRecipe && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdRecipe) }}
        />
      )}

      {/* 1. Sticky Nav */}
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
                Journal
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#52525B]">
            <Link href="/" className="hover:text-[#0F1012] transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-[#F05A28] font-bold">
              All Articles
            </Link>
            <Link href="/#app-tour" className="hover:text-[#0F1012] transition-colors">
              App Features
            </Link>
          </nav>

          <Link
            href="/#waitlist"
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#0F1012] text-white hover:bg-[#27272A] transition-colors"
          >
            Join Free Waitlist
          </Link>
        </div>
      </header>

      {/* 2. Article Header */}
      <article className="max-w-4xl mx-auto px-6 pt-10 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#71717A] mb-6">
          <Link href="/" className="hover:text-[#0F1012]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-[#0F1012]">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F05A28] truncate max-w-[200px] sm:max-w-none">
            {post.category}
          </span>
        </div>

        {/* Title & Metadata */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF3EE] text-[#F05A28] border border-[#FDE5D9]">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#71717A]">
              <Clock className="w-3.5 h-3.5 text-[#F05A28]" />
              {post.readTime}
            </span>
            <span className="text-[#D4D4D8]">·</span>
            <span className="text-xs text-[#71717A]">Published {post.publishedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1012] tracking-tight leading-[1.12]">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-[#52525B] leading-relaxed">
            {post.summary}
          </p>

          {/* Author Block */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#EAEAE6]">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-[#F4F4F0] border border-[#EAEAE6]">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0F1012]">
                {post.author.name}
              </div>
              <div className="text-xs text-[#71717A]">
                {post.author.role} · Evidence-Checked
              </div>
            </div>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-[#F4F4F0] border border-[#EAEAE6] mb-12 shadow-sm">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-[#FAFAF8] rounded-3xl p-6 sm:p-8 border border-[#EAEAE6] mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#F05A28]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#0F1012]">
              Key Scientific Takeaways
            </h2>
          </div>
          <ul className="space-y-3">
            {post.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-[#52525B] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recipe Card (if present) — strictly adhering to safe padding and mandatory timers */}
        {post.recipeCard && (
          <div className="bg-gradient-to-b from-[#FFFDFB] to-[#FFF9F5] rounded-3xl border-2 border-[#FDE5D9] p-6 sm:p-10 mb-14 shadow-lg shadow-orange-950/[0.03]">
            {/* Safe zone top banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#FCE1D4] mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#F05A28] block mb-1">
                  Cravey Official Recipe Card
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012]">
                  {post.recipeCard.title}
                </h3>
              </div>

              {/* MANDATORY TIMER BADGE */}
              <div className="bg-white px-4 py-2.5 rounded-2xl border border-[#FDE5D9] shadow-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F05A28]" />
                <span className="text-xs sm:text-sm font-bold text-[#0F1012]">
                  {post.recipeCard.totalTime}
                </span>
              </div>
            </div>

            {/* Quick Macro Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
              <div className="bg-white p-3.5 rounded-2xl border border-[#FCE1D4] text-center">
                <div className="text-[11px] font-semibold text-[#71717A] uppercase">Calories</div>
                <div className="text-xl font-extrabold text-[#0F1012] mt-0.5">
                  {post.recipeCard.calories} <span className="text-xs font-normal text-[#71717A]">kcal</span>
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#FCE1D4] text-center">
                <div className="text-[11px] font-semibold text-[#F05A28] uppercase flex items-center justify-center gap-1">
                  <Dumbbell className="w-3 h-3" />
                  Protein
                </div>
                <div className="text-xl font-extrabold text-[#F05A28] mt-0.5">
                  {post.recipeCard.protein}g
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#FCE1D4] text-center">
                <div className="text-[11px] font-semibold text-[#71717A] uppercase">Carbs</div>
                <div className="text-xl font-extrabold text-[#0F1012] mt-0.5">
                  {post.recipeCard.carbs}g
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#FCE1D4] text-center">
                <div className="text-[11px] font-semibold text-[#71717A] uppercase">Fat</div>
                <div className="text-xl font-extrabold text-[#0F1012] mt-0.5">
                  {post.recipeCard.fat}g
                </div>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#FCE1D4] text-center col-span-2 sm:col-span-1">
                <div className="text-[11px] font-semibold text-[#71717A] uppercase">Fiber</div>
                <div className="text-xl font-extrabold text-[#0F1012] mt-0.5">
                  {post.recipeCard.fiber}g
                </div>
              </div>
            </div>

            {/* Ingredients & Steps */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Knolled Ingredients */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#F05A28]" />
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#0F1012]">
                    Ingredients ({post.recipeCard.servings} Servings)
                  </h4>
                </div>
                <ul className="space-y-2.5">
                  {post.recipeCard.ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className="bg-white p-3 rounded-xl border border-[#FDE5D9] text-xs sm:text-sm flex flex-col"
                    >
                      <span className="font-bold text-[#0F1012]">
                        {ing.amount} {ing.item}
                      </span>
                      {ing.note && (
                        <span className="text-[11px] text-[#71717A] mt-0.5">
                          {ing.note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by step */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#F05A28]" />
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#0F1012]">
                    Preparation Method
                  </h4>
                </div>
                <ol className="space-y-3">
                  {post.recipeCard.instructions.map((step, idx) => (
                    <li
                      key={idx}
                      className="bg-white p-4 rounded-xl border border-[#FDE5D9] flex gap-3 text-xs sm:text-sm text-[#52525B] leading-relaxed"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#FFF3EE] text-[#F05A28] font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-12">
          {post.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] tracking-tight">
                {sec.heading}
              </h2>

              {sec.subheading && (
                <h3 className="text-base sm:text-lg font-semibold text-[#F05A28]">
                  {sec.subheading}
                </h3>
              )}

              <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
                {sec.content}
              </p>

              {sec.highlightBox && (
                <div
                  className={`p-5 rounded-2xl border text-sm leading-relaxed ${
                    sec.highlightBox.type === "fact"
                      ? "bg-[#FFF9F5] border-[#FDE5D9] text-[#0F1012]"
                      : sec.highlightBox.type === "tip"
                      ? "bg-[#F0FDF4] border-[#DCFCE7] text-[#14532D]"
                      : "bg-[#FEF2F2] border-[#FEE2E2] text-[#7F1D1D]"
                  }`}
                >
                  <div className="font-bold flex items-center gap-2 mb-1.5">
                    {sec.highlightBox.type === "fact" && <Sparkles className="w-4 h-4 text-[#F05A28]" />}
                    {sec.highlightBox.type === "tip" && <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />}
                    {sec.highlightBox.type === "warning" && <AlertCircle className="w-4 h-4 text-[#DC2626]" />}
                    <span>{sec.highlightBox.title}</span>
                  </div>
                  <div>{sec.highlightBox.text}</div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* App Conversion Card in Article */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#0F1012] text-white space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#F05A28] flex items-center justify-center font-bold text-2xl">
            C
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F05A28]">
              Ready to Swap Your Cravings?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get all 150+ high-protein swaps right on your phone.
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-xl">
              Cravey automatically calculates macros, scales portions, generates aisle-sorted grocery lists, and lets you import reels in 1 tap.
            </p>
          </div>
          <div>
            <Link
              href="/#waitlist"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-[#F05A28] text-white hover:bg-[#DE5227] transition-all shadow-md text-sm"
            >
              <span>Join the Free Launch Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-20 pt-12 border-t border-[#EAEAE6]">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#71717A] mb-6">
            Recommended Reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group p-5 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE6] hover:border-[#F05A28]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#F05A28] uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-base font-bold text-[#0F1012] group-hover:text-[#F05A28] transition-colors leading-snug mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#71717A] line-clamp-2">
                    {rel.summary}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#F05A28] mt-4">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* 3. Footer */}
      <footer className="py-12 bg-[#FAFAF8] border-t border-[#EAEAE6] text-xs text-[#71717A]">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
