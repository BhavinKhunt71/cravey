"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Share2,
  Copy,
  Clock,
  Flame,
  Dumbbell,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Zap,
  Heart,
  SlidersHorizontal,
} from "lucide-react";
import confetti from "canvas-confetti";

interface CravingSwapItem {
  id: string;
  cravingName: string;
  cravingCal: number;
  cravingProtein: number;
  cravingSugar: number;
  swapName: string;
  swapCal: number;
  swapProtein: number;
  swapSugar: number;
  prepTime: string;
  cardImage: string;
  knollingImage: string;
  ingredients: string[];
  tasteDescription: string;
  highlight: string;
}

const SWAP_DATABASE: CravingSwapItem[] = [
  {
    id: "snickers",
    cravingName: "Snickers Candy Bar",
    cravingCal: 280,
    cravingProtein: 4,
    cravingSugar: 32,
    swapName: "Frozen Snickers Dates",
    swapCal: 215,
    swapProtein: 14,
    swapSugar: 8,
    prepTime: "10 mins",
    cardImage: "/images/snickers-dates-card.jpg",
    knollingImage: "/images/snickers-dates-knolling.jpg",
    ingredients: [
      "Plump Medjool Dates",
      "All-Natural Creamy Peanut Butter",
      "Roasted Salted Peanuts",
      "85% Dark Cacao Drizzle",
      "Maldon Flaky Sea Salt",
    ],
    tasteDescription:
      "Tastes like a chilled, chewy gourmet caramel nougat bar. Satisfies the sweet chocolate-peanut urge instantly with zero refined sugar.",
    highlight: "+250% More Protein · 100% Whole Food",
  },
  {
    id: "melt",
    cravingName: "Greasy Diner Patty Melt",
    cravingCal: 740,
    cravingProtein: 22,
    cravingSugar: 6,
    swapName: "Crispy Buffalo Chicken Melt",
    swapCal: 380,
    swapProtein: 44,
    swapSugar: 2,
    prepTime: "12 mins",
    cardImage: "/images/buffalo-melt-card.jpg",
    knollingImage: "/images/buffalo-melt-card.jpg",
    ingredients: [
      "Tender Shredded Chicken Breast",
      "Whipped Low-Fat Cottage Cheese Blend",
      "Tangy Aged Cayenne Pepper Sauce",
      "Artisan Sourdough Slice",
      "Crisp Micro-Greens",
    ],
    tasteDescription:
      "All the spicy, crunchy, gooey savory comfort of game-day buffalo wings, packed into a high-protein grilled toast.",
    highlight: "Double the Protein · Half the Calories",
  },
  {
    id: "banana-oats",
    cravingName: "Bakery Banana Loaf Cake",
    cravingCal: 490,
    cravingProtein: 3,
    cravingSugar: 44,
    swapName: "Banana Bread Baked Oats",
    swapCal: 310,
    swapProtein: 26,
    swapSugar: 6,
    prepTime: "15 mins",
    cardImage: "/images/baked-oats-knolling.jpg",
    knollingImage: "/images/baked-oats-knolling.jpg",
    ingredients: [
      "Rolled Whole Grain Oats",
      "Overripe Caramelized Banana",
      "Vanilla Whey Isolate",
      "Ceylon Cinnamon & Nutmeg",
      "Dark Chocolate Shavings",
    ],
    tasteDescription:
      "Warm, fluffy, cake-like interior with a golden crust. Feels like eating fresh dessert for breakfast or post-workout.",
    highlight: "+760% More Protein · 8g Prebiotic Fiber",
  },
];

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [selectedCraving, setSelectedCraving] = useState<string>("snickers");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalWaitlistCount, setTotalWaitlistCount] = useState(1428);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Active swap preview
  const currentSwap =
    SWAP_DATABASE.find((item) => item.id === selectedCraving) ||
    SWAP_DATABASE[0];

  useEffect(() => {
    // Fetch live waitlist counter
    fetch("/api/waitlist")
      .then((res) => res.json())
      .then((data) => {
        if (data.totalCount) setTotalWaitlistCount(data.totalCount);
      })
      .catch(() => {});
  }, []);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          craving: currentSwap.cravingName,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setJoined(true);
        setQueuePosition(data.position);
        setReferralLink(data.referralLink);
        setTotalWaitlistCount(data.totalCount);

        // Confetti celebration
        confetti({
          particleCount: 90,
          spread: 60,
          origin: { y: 0.65 },
          colors: ["#F05A28", "#FF8A65", "#16A34A", "#0F1012"],
        });
      } else {
        setErrorMessage(data.error || "Failed to join. Please try again.");
      }
    } catch {
      setErrorMessage("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyReferral = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-[#0F1012] selection:bg-[#FFE3D6] selection:text-[#C4380A]">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#EAEAE6]">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F05A28] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl tracking-tight">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-[#0F1012]">
                Cravey
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#F05A28] -mt-1">
                Craving Swaps
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#52525B]">
            <a href="#swaps" className="hover:text-[#0F1012] transition-colors">
              The Swaps
            </a>
            <a href="#knolling" className="hover:text-[#0F1012] transition-colors">
              Visual Recipes
            </a>
            <a href="#how-it-works" className="hover:text-[#0F1012] transition-colors">
              How It Works
            </a>
            <a href="#faq" className="hover:text-[#0F1012] transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F4F4F0] text-[#52525B]">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
              Coming Soon to iOS
            </span>
            <a
              href="#waitlist"
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#0F1012] text-white hover:bg-[#27272A] transition-colors"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section
        id="waitlist"
        className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FAFAF8] via-white to-white"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FFF3EE] text-[#F05A28] border border-[#FDE5D9] mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
            <span>The Guilt-Free Craving Swap Engine</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F1012] tracking-tight leading-[1.08] mb-6">
            Satisfy your 9 PM sweet cravings.{" "}
            <span className="text-[#F05A28] block sm:inline">
              Without breaking your macros.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-[#52525B] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Cravey transforms your favorite junk food and desserts into 15-minute,
            high-protein visual recipes. Zero bland diet food. Zero food guilt.
          </p>

          {/* Waitlist Capture Card */}
          <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEAE6] shadow-xl shadow-black/[0.03]">
            {!joined ? (
              <form onSubmit={handleJoinWaitlist} className="space-y-4">
                <div className="text-left mb-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                      Join the VIP Waitlist
                    </label>
                    <span className="text-[11px] font-semibold text-[#F05A28] bg-[#FFF3EE] px-2 py-0.5 rounded-full">
                      🎁 Free Recipe Card Pack Included
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email (e.g. alex@gmail.com)"
                      required
                      className="w-full px-4 py-3.5 rounded-2xl bg-[#F9F9F8] border border-[#EAEAE6] text-[#0F1012] placeholder-[#A1A1AA] text-base focus:outline-none focus:ring-2 focus:ring-[#F05A28]/20 focus:border-[#F05A28] transition-all"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-500 font-medium text-left">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-[#F05A28] hover:bg-[#E04B19] active:scale-[0.99] transition-all shadow-md shadow-[#F05A28]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-base"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Reserving Your Spot...
                    </span>
                  ) : (
                    <>
                      <span>Join Waitlist & Get Free Recipe Pack</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-xs text-[#71717A] pt-1">
                  🔒 No spam ever. We'll send your recipe pack and notify you the moment Cravey goes live.
                </p>
              </form>
            ) : (
              /* Success / Queue Position State */
              <div className="text-center py-2 space-y-4">
                <div className="w-14 h-14 bg-[#FFF3EE] rounded-full flex items-center justify-center mx-auto text-[#F05A28]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#16A34A] bg-[#DCFCE7] px-3 py-1 rounded-full">
                    Spot Confirmed
                  </span>
                  <h3 className="text-2xl font-bold text-[#0F1012] pt-2">
                    You are #{queuePosition?.toLocaleString()} in line!
                  </h3>
                  <p className="text-sm text-[#52525B]">
                    We’ve reserved your spot for <strong>{email}</strong>. Check your inbox shortly for your free craving-swap starter cards!
                  </p>
                </div>

                {/* Referral Booster */}
                <div className="bg-[#FAFAF8] rounded-2xl p-4 border border-[#EAEAE6] text-left space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0F1012]">
                      Want to skip the queue?
                    </span>
                    <span className="text-xs font-semibold text-[#F05A28]">
                      +50 spots per friend
                    </span>
                  </div>
                  <p className="text-xs text-[#71717A]">
                    Share your invite link. Every friend who joins bumps you 50 spots closer to instant access.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="text-xs bg-white border border-[#EAEAE6] rounded-xl px-3 py-2 flex-1 text-[#52525B] font-mono select-all"
                    />
                    <button
                      type="button"
                      onClick={copyReferral}
                      className="px-3 py-2 bg-[#0F1012] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-[#27272A] transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Social Proof Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#71717A]">
            <div className="flex items-center gap-1 text-[#F05A28] font-bold">
              <span>★★★★★</span>
              <span className="text-[#0F1012] ml-1">4.9/5 Macro & Taste Rating</span>
            </div>
            <span className="hidden sm:inline">·</span>
            <div>
              <strong className="text-[#0F1012]">{totalWaitlistCount.toLocaleString()}</strong> health-conscious food lovers on waitlist
            </div>
            <span className="hidden sm:inline">·</span>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>USDA Verified Nutrition</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Interactive Craving Swap Engine (Show, Don't Tell) */}
      <section id="swaps" className="py-20 bg-[#F9F9F8] border-y border-[#EAEAE6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F05A28] block mb-2">
              Interactive Preview
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] tracking-tight">
              Pick your craving. See the Cravey swap.
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] mt-3">
              Tap any craving below to see how Cravey engineers the exact mouthfeel and taste using high-protein whole ingredients.
            </p>

            {/* Craving Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {SWAP_DATABASE.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCraving(item.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    selectedCraving === item.id
                      ? "bg-[#0F1012] text-white shadow-md"
                      : "bg-white text-[#52525B] border border-[#EAEAE6] hover:bg-[#F4F4F0]"
                  }`}
                >
                  Craving {item.cravingName}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Card Presentation */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAEAE6] shadow-sm max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Macro Comparison */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#FFF3EE] text-[#F05A28] mb-3">
                    {currentSwap.highlight}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012]">
                    {currentSwap.swapName}
                  </h3>
                  <p className="text-sm text-[#52525B] mt-2 leading-relaxed">
                    {currentSwap.tasteDescription}
                  </p>
                </div>

                {/* Macro Compare Box */}
                <div className="grid grid-cols-2 gap-4 bg-[#FAFAF8] p-5 rounded-2xl border border-[#EAEAE6]">
                  {/* The Junk Version */}
                  <div className="space-y-2 border-r border-[#EAEAE6] pr-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-red-500">
                      Typical {currentSwap.cravingName}
                    </span>
                    <div className="text-2xl font-bold text-[#0F1012]">
                      {currentSwap.cravingCal} <span className="text-xs text-[#71717A]">kcal</span>
                    </div>
                    <div className="space-y-1 text-xs text-[#52525B]">
                      <div className="flex justify-between">
                        <span>Protein:</span>
                        <strong className="text-red-600">{currentSwap.cravingProtein}g</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Added Sugar:</span>
                        <strong className="text-red-600">{currentSwap.cravingSugar}g</strong>
                      </div>
                    </div>
                  </div>

                  {/* The Cravey Swap */}
                  <div className="space-y-2 pl-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A]">
                      Cravey Clean Swap
                    </span>
                    <div className="text-2xl font-bold text-[#0F1012]">
                      {currentSwap.swapCal} <span className="text-xs text-[#71717A]">kcal</span>
                    </div>
                    <div className="space-y-1 text-xs text-[#52525B]">
                      <div className="flex justify-between">
                        <span>Protein:</span>
                        <strong className="text-[#16A34A] font-bold">
                          {currentSwap.swapProtein}g
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Added Sugar:</span>
                        <strong className="text-[#16A34A] font-bold">
                          {currentSwap.swapSugar}g
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ingredients Pill List */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] block">
                    Zero Artificial Additives · Whole Ingredients
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentSwap.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-xl text-xs font-medium bg-[#F4F4F0] text-[#0F1012]"
                      >
                        ✓ {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Spec Badges */}
                <div className="flex items-center gap-6 text-xs text-[#52525B] pt-2 border-t border-[#EAEAE6]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-4 h-4 text-[#F05A28]" />
                    <span>Prep: {currentSwap.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Flame className="w-4 h-4 text-[#F05A28]" />
                    <span>No oven needed</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Dumbbell className="w-4 h-4 text-[#F05A28]" />
                    <span>Macro Verified</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Photo Card */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-[340px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#0F1012] bg-[#0F1012]">
                  <Image
                    src={currentSwap.cardImage}
                    alt={currentSwap.swapName}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      Cravey Recipe Card
                    </span>
                    <span className="bg-[#F05A28] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      {currentSwap.swapCal} kcal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visual Knolling Bento Showcase */}
      <section id="knolling" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F05A28] block mb-2">
              Visual-First Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] tracking-tight">
              Never read a wall of recipe text again.
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] mt-3">
              Standard recipe websites hide food behind 12 paragraphs of life stories and ad popups. Cravey is engineered like Apple software: visual, immediate, and tactile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bento Card 1 */}
            <div className="bg-[#FAFAF8] rounded-3xl p-6 sm:p-8 border border-[#EAEAE6] space-y-4 hover:border-[#F05A28]/40 transition-colors">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-[#EAEAE6]">
                <Image
                  src="/images/snickers-dates-knolling.jpg"
                  alt="Flat-lay knolled ingredients"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#0F1012]">
                  1. Top-Down Ingredient Knolling
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  Every single ingredient is laid out flat with exact measurements before you begin. Zero kitchen confusion or surprise steps.
                </p>
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="bg-[#FAFAF8] rounded-3xl p-6 sm:p-8 border border-[#EAEAE6] space-y-4 hover:border-[#F05A28]/40 transition-colors">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-[#EAEAE6]">
                <Image
                  src="/images/candy-snacks-cover.jpg"
                  alt="Candy taste swaps"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#0F1012]">
                  2. Biological Craving Physics
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  We don’t tell you to eat celery when you want chocolate. Cravey mirrors the exact fat, crunch, and sweet textures using clean protein.
                </p>
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="bg-[#FAFAF8] rounded-3xl p-6 sm:p-8 border border-[#EAEAE6] space-y-4 hover:border-[#F05A28]/40 transition-colors">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-[#EAEAE6]">
                <Image
                  src="/images/baked-oats-knolling.jpg"
                  alt="Baked oats knolling"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#0F1012]">
                  3. 1-Tap Grocery Cart Sync
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  Found a craving swap you love? Export all 5 ingredients directly into Instacart or Walmart in a single click. No manual grocery lists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="py-20 bg-[#F9F9F8] border-y border-[#EAEAE6]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F05A28] block mb-2">
              Three Effortless Steps
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] tracking-tight">
              From craving to eating in 15 minutes.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-[#EAEAE6] space-y-3 relative shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3EE] text-[#F05A28] font-bold text-lg flex items-center justify-center">
                01
              </div>
              <h3 className="text-lg font-bold text-[#0F1012]">Name Your Craving</h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Tell Cravey what you want to eat: a Snickers bar, a burger, warm cookies, or iced mocha. Or simply scan the barcode of the junk food in your pantry.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-[#EAEAE6] space-y-3 relative shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3EE] text-[#F05A28] font-bold text-lg flex items-center justify-center">
                02
              </div>
              <h3 className="text-lg font-bold text-[#0F1012]">Get The Visual Swap</h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Cravey matches the flavor and texture profile with a 15-minute high-protein recipe. Exact calorie counts and macros are calculated automatically.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-[#EAEAE6] space-y-3 relative shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3EE] text-[#F05A28] font-bold text-lg flex items-center justify-center">
                03
              </div>
              <h3 className="text-lg font-bold text-[#0F1012]">Crush It Without Guilt</h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Eat something that genuinely tastes decadent, hit your daily protein target, and wake up feeling energized instead of sluggish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Comparison Table: Traditional Dieting vs Cravey */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F05A28] block mb-2">
              Why Willpower Fails
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] tracking-tight">
              Diets fail at 9 PM. Cravey doesn’t.
            </h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[#EAEAE6] bg-white shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAFAF8] border-b border-[#EAEAE6] text-[#0F1012]">
                <tr>
                  <th className="py-4 px-6 font-bold">The Experience</th>
                  <th className="py-4 px-6 font-bold text-red-500">Traditional Restriction</th>
                  <th className="py-4 px-6 font-bold text-[#16A34A] bg-[#F0FDF4]">The Cravey Way</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAE6]">
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#0F1012]">When cravings hit</td>
                  <td className="py-4 px-6 text-[#52525B]">Fight urge with willpower, eventually binge</td>
                  <td className="py-4 px-6 text-[#0F1012] font-medium bg-[#F0FDF4]/50">
                    Instant high-protein whole-food swap
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#0F1012]">Recipe experience</td>
                  <td className="py-4 px-6 text-[#52525B]">Walls of text, ads, measuring scales</td>
                  <td className="py-4 px-6 text-[#0F1012] font-medium bg-[#F0FDF4]/50">
                    Top-down visual ingredient knolling
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#0F1012]">Daily protein goal</td>
                  <td className="py-4 px-6 text-[#52525B]">Bland dry chicken & chalky protein shakes</td>
                  <td className="py-4 px-6 text-[#0F1012] font-medium bg-[#F0FDF4]/50">
                    Desserts that naturally pack 15–40g protein
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#0F1012]">Grocery planning</td>
                  <td className="py-4 px-6 text-[#52525B]">Manual notepad lists, wasted ingredients</td>
                  <td className="py-4 px-6 text-[#0F1012] font-medium bg-[#F0FDF4]/50">
                    One-tap export to Instacart & Walmart
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-20 bg-[#F9F9F8] border-t border-[#EAEAE6]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#F05A28] block mb-2">
              Questions & Answers
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F1012] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "When is Cravey officially launching?",
                a: "Cravey is launching on iOS and Android soon. Waitlist members get notified first, receive free founding member badges, and get immediate access to all launch recipes.",
              },
              {
                q: "Is Cravey free to use?",
                a: "Yes! Cravey offers a generous free tier with daily craving swaps, knolled visual recipes, and basic macro tracking. A Pro subscription will be available for customized meal planning and automatic grocery sync.",
              },
              {
                q: "Can I filter for allergies or dietary restrictions?",
                a: "Absolutely. Cravey allows you to set filters for Gluten-Free, Dairy-Free, Nut-Free, High-Protein / Low-Carb, Vegan, and Sugar-Free swaps.",
              },
              {
                q: "What happens when I join the waitlist?",
                a: "You'll secure your spot in line, receive our free 'Top 10 Secret Candy Swaps' guide, and get notified the exact minute Cravey launches with exclusive founding member perks.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#EAEAE6] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left font-bold text-[#0F1012] flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAFAF8] transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#F05A28]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#71717A]" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-[#52525B] leading-relaxed border-t border-[#F0F0EC] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Bottom Call-to-Action */}
      <section className="py-20 bg-white border-t border-[#EAEAE6]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-[#F05A28] flex items-center justify-center mx-auto text-white font-bold text-2xl">
            C
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] tracking-tight">
            Stop fighting your cravings. Start swapping them.
          </h2>
          <p className="text-base text-[#52525B] max-w-xl mx-auto">
            Join over 1,400 health-conscious food lovers on the Cravey list. Get your free recipe pack and be the first to know when we launch.
          </p>
          <div className="pt-2">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-[#0F1012] hover:bg-[#27272A] transition-all shadow-lg shadow-black/10 text-base"
            >
              <span>Join the Waitlist (Free)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. Minimalist Footer */}
      <footer className="py-12 bg-[#FAFAF8] border-t border-[#EAEAE6] text-xs text-[#71717A]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0F1012]">Cravey Inc.</span>
            <span>·</span>
            <span>© 2026 Cravey. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#0F1012] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#0F1012] transition-colors">
              Terms of Service
            </a>
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
