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
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Utensils,
  Dumbbell,
  ArrowDownCircle,
  Share2,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blogs";
import InteractiveRecipeCard from "@/components/InteractiveRecipeCard";
import StoreButtons from "@/components/StoreButtons";

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
  if (!post) return { title: "Recipe Not Found | Cravey" };

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
          width: 1376,
          height: 768,
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

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Structured Data Schema for Google Search Console & Copilot
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
        image: `https://cravey.app${post.coverImage}`,
        author: {
          "@type": "Person",
          name: post.author.name,
        },
        prepTime: `PT${parseInt(post.recipeCard.prepTime) || 10}M`,
        cookTime: post.recipeCard.cookTime.includes("0")
          ? "PT0M"
          : `PT${parseInt(post.recipeCard.cookTime) || 10}M`,
        totalTime: `PT25M`,
        recipeYield: `${post.recipeCard.servings} servings`,
        recipeCategory: post.category,
        keywords: post.keywords.join(", "),
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: post.recipeCard.rating.toString(),
          reviewCount: post.recipeCard.reviewsCount.toString(),
        },
        nutrition: {
          "@type": "NutritionInformation",
          calories: `${post.recipeCard.calories} calories`,
          proteinContent: `${post.recipeCard.protein} g`,
          carbohydrateContent: `${post.recipeCard.carbs} g`,
          fatContent: `${post.recipeCard.fat} g`,
          fiberContent: `${post.recipeCard.fiber} g`,
          sodiumContent: `${post.recipeCard.sodiumMg} mg`,
        },
        recipeIngredient: post.recipeCard.ingredients.map(
          (i) => `${i.amount} ${i.item} (${i.note || ""})`
        ),
        recipeInstructions: post.recipeCard.instructions.map((step) => ({
          "@type": "HowToStep",
          name: step.title,
          text: step.instruction,
          position: step.stepNumber,
        })),
      }
    : null;

  const jsonLdFaq = post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
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
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
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
                Recipes & Guides
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#52525B]">
            <Link href="/" className="hover:text-[#0F1012] transition-colors">
              App Overview
            </Link>
            <Link href="/blog" className="text-[#F05A28] font-bold">
              All Recipes
            </Link>
            <Link href="/#app-tour" className="hover:text-[#0F1012] transition-colors">
              App Tour
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {post.recipeCard && (
              <a
                href="#recipe-card"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FFF3EE] text-[#F05A28] border border-[#FDE5D9] hover:bg-[#FFE8DE] transition-colors"
              >
                <ArrowDownCircle className="w-3.5 h-3.5" />
                <span>Jump to Recipe</span>
              </a>
            )}
            <Link
              href="/#download"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#0F1012] text-white hover:bg-[#27272A] transition-colors"
            >
              Download App
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Article Header & Hero */}
      <article className="max-w-4xl mx-auto px-6 pt-10 pb-20">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#71717A] mb-6">
          <Link href="/" className="hover:text-[#0F1012]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-[#0F1012]">
            Recipes & Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#F05A28] truncate max-w-[200px] sm:max-w-none">
            {post.category}
          </span>
        </div>

        {/* Title, Category & Above-the-fold Quick Info */}
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

            {post.recipeCard && (
              <>
                <span className="text-[#D4D4D8]">·</span>
                <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-full border border-green-200">
                  {post.recipeCard.protein}g Protein · {post.recipeCard.calories} kcal
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1012] tracking-tight leading-[1.12]">
            {post.title}
          </h1>

          <p className="text-base sm:text-xl text-[#52525B] leading-relaxed">
            {post.summary}
          </p>

          {/* Jump to Recipe Button & Author Block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#EAEAE6]">
            <div className="flex items-center gap-3">
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
                  {post.author.role} · USDA Verified
                </div>
              </div>
            </div>

            {post.recipeCard && (
              <a
                href="#recipe-card"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0F1012] text-white hover:bg-[#27272A] transition-all text-xs font-bold shadow-md cursor-pointer"
              >
                <ArrowDownCircle className="w-4 h-4 text-[#F05A28]" />
                <span>Jump to Recipe Card</span>
              </a>
            )}
          </div>
        </div>

        {/* Hero Cover Image (16:9 Landscape - NEVER CROPPED) */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-[#F4F4F0] border border-[#EAEAE6] mb-12 shadow-sm">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Key Takeaways Callout Box */}
        <div className="bg-[#FAFAF8] rounded-3xl p-6 sm:p-8 border border-[#EAEAE6] mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#F05A28]" />
            <h2 className="text-xs uppercase tracking-widest font-extrabold text-[#0F1012]">
              Key Scientific Takeaways
            </h2>
          </div>
          <ul className="space-y-3">
            {post.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#52525B] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Recipe Card (if present) with serving scaler and timers */}
        {post.recipeCard && (
          <InteractiveRecipeCard
            recipe={post.recipeCard}
            coverImage={post.coverImage}
          />
        )}

        {/* Content Body Sections */}
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

        {/* Deep Internal Links Section for SEO */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#FAFAF8] border border-[#EAEAE6]">
          <h3 className="text-xs uppercase tracking-widest font-extrabold text-[#71717A] mb-4">
            Related Recipes & Nutrition Guides
          </h3>
          <div className="space-y-3">
            {post.deepLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.url}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#EAEAE6] hover:border-[#F05A28]/40 hover:shadow-sm transition-all text-xs sm:text-sm font-bold text-[#0F1012] group"
              >
                <span>{link.text}</span>
                <ArrowRight className="w-4 h-4 text-[#F05A28] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        {post.faq.length > 0 && (
          <div className="mt-14 space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F1012]">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {post.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-[#EAEAE6] space-y-2"
                >
                  <h4 className="font-bold text-sm sm:text-base text-[#0F1012] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#F05A28] shrink-0" />
                    <span>{item.q}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed pl-6">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* App Conversion Callout in Article */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#0F1012] text-white space-y-6">
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-[#F05A28] flex items-center justify-center font-bold text-2xl">
            <Image
              src="/app-icon.png"
              alt="Cravey App Icon"
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F05A28]">
              Now Live on iOS & Android
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Get 150+ guilt-free craving swaps on your phone.
            </h3>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-xl">
              Cravey calculates macros, scales portions, generates aisle-sorted grocery lists, and lets you import TikTok & Instagram reels in 1 tap.
            </p>
          </div>
          <div className="pt-2">
            <StoreButtons variant="light" size="lg" className="justify-start" />
          </div>
        </div>

        {/* Related Articles Grid */}
        <div className="mt-20 pt-12 border-t border-[#EAEAE6]">
          <h2 className="text-xs uppercase tracking-widest font-bold text-[#71717A] mb-6">
            Recommended Reading
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group flex flex-col justify-between p-4 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE6] hover:border-[#F05A28]/40 transition-all"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#EAEAE6] mb-3">
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-[#F05A28] uppercase tracking-wider block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-[#0F1012] group-hover:text-[#F05A28] transition-colors leading-snug line-clamp-2 mb-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#F05A28] mt-3">
                  <span>View Recipe</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>

      {/* 3. Footer (Cleaned: Sitemap removed per user request) */}
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
              Recipes & Guides
            </Link>
            <Link href="/#app-tour" className="hover:text-[#0F1012] transition-colors">
              App Features
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
