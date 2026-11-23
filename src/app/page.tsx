"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Flame,
  Dumbbell,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Star,
  Download,
  AlertTriangle,
  Zap,
} from "lucide-react";
import StoreButtons, { APP_STORE_URL, PLAY_STORE_URL } from "@/components/StoreButtons";
import Navbar from "@/components/Navbar";
import CravingEmergencyTool from "@/components/CravingEmergencyTool";
import { APP_SCREENSHOT_FEATURES } from "@/data/appScreenshots";
import { BLOG_POSTS } from "@/data/blogs";

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

export default function HomePage() {
  const [selectedCraving, setSelectedCraving] = useState<string>("snickers");
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(APP_SCREENSHOT_FEATURES[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Active swap preview
  const currentSwap =
    SWAP_DATABASE.find((item) => item.id === selectedCraving) ||
    SWAP_DATABASE[0];

  // Active app feature screenshot
  const activeFeature =
    APP_SCREENSHOT_FEATURES.find((f) => f.id === selectedFeatureId) ||
    APP_SCREENSHOT_FEATURES[0];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-[#0F1012] selection:bg-[#FFE3D6] selection:text-[#C4380A]">
      {/* 1. Header Navigation */}
      <Navbar currentPath="/" />

      {/* 2. Hero Section */}
      <section
        id="download"
        className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-gradient-to-b from-[#FAFAF8] via-white to-white scroll-mt-20"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FFF3EE] text-[#F05A28] border border-[#FDE5D9] mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
            <span>Now Available on iOS & Android</span>
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

          {/* Direct App Store & Google Play Download Box */}
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#EAEAE6] shadow-xl shadow-black/[0.04] space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#F05A28] block">
                Official Launch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] tracking-tight">
                Get Cravey on your phone today
              </h2>
              <p className="text-xs sm:text-sm text-[#52525B]">
                Start swapping cravings, tracking macros, and importing reels with 1 tap.
              </p>
            </div>

            {/* Store Buttons */}
            <StoreButtons variant="dark" size="lg" />

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-[#71717A] border-t border-[#F0F0EC]">
              <span className="flex items-center gap-1 font-semibold text-[#0F1012]">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                3-Day Free Trial
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-semibold text-[#0F1012]">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Zero Commitment
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-semibold text-[#0F1012]">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                Cancel Anytime
              </span>
            </div>
          </div>

          {/* Social Proof Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#71717A]">
            <div className="flex items-center gap-1 text-[#F05A28] font-bold">
              <span>★★★★★</span>
              <span className="text-[#0F1012] ml-1">4.9/5 Average App Rating</span>
            </div>
            <span className="hidden sm:inline">·</span>
            <div>
              <strong className="text-[#0F1012]">150+</strong> high-protein tested swaps
            </div>
            <span className="hidden sm:inline">·</span>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>USDA Verified Nutrition</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. The Interactive Craving Panic Simulator */}
      <section className="py-12 -mt-8 relative z-20 max-w-6xl mx-auto px-4 sm:px-6">
        <CravingEmergencyTool />
      </section>

      {/* 2.6. The Emotional Controversy: Death of Diet Culture */}
      <section
        id="controversy"
        className="py-24 bg-[#0F1012] text-white border-y border-[#27272A] scroll-mt-20 relative overflow-hidden"
      >
        {/* Subtle decorative glowing background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#F05A28]/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-[#F05A28]/20 text-[#F05A28] border border-[#F05A28]/40 mb-4">
              <Flame className="w-3.5 h-3.5 text-[#F05A28]" />
              <span>The 9 PM Biological Reality</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6">
              Diet culture lied to you.{" "}
              <span className="text-[#F05A28] block sm:inline">
                Willpower is not why you binge.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
              When fitness gurus tell you to &ldquo;drink a glass of water&rdquo; or &ldquo;chew celery&rdquo; when your brain screams for chocolate at 9 PM, they are committing biological malpractice.
            </p>
          </div>

          {/* High-Impact Side-by-Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-16">
            {/* Left: The Diet Culture Trap */}
            <div className="bg-[#18181B] rounded-3xl p-6 sm:p-8 border border-red-500/20 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#27272A] mb-6">
                  <span className="text-xs uppercase font-black tracking-widest text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-800/40">
                    ❌ The Toxic Diet Trap
                  </span>
                  <span className="text-xs text-[#71717A] font-semibold">94% Failure Rate</span>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-red-400 font-mono text-xs font-bold shrink-0 mt-0.5">7:00 PM</span>
                    <p className="text-sm text-[#D4D4D8]">
                      You eat plain steamed broccoli and dry chicken breast. Zero sensory satisfaction.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-red-400 font-mono text-xs font-bold shrink-0 mt-0.5">8:45 PM</span>
                    <p className="text-sm text-[#D4D4D8]">
                      Your dopamine drops. Ghrelin spikes. Your brain sounds the emergency alarm for fat and sugar.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-red-400 font-mono text-xs font-bold shrink-0 mt-0.5">9:30 PM</span>
                    <p className="text-sm text-[#D4D4D8]">
                      Your prefrontal discipline fatigues. You stand in the pantry and inhale 1,200 calories of cookies, peanut butter, or cereal.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-red-400 font-mono text-xs font-bold shrink-0 mt-0.5">Next AM</span>
                    <p className="text-sm text-red-300 font-semibold">
                      Bloated face, heavy guilt, self-hatred, and another &ldquo;failed diet&rdquo;.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#27272A] text-xs text-[#71717A] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Starvation triggers hyper-focus on forbidden calorie-dense foods.</span>
              </div>
            </div>

            {/* Right: The Cravey Protocol */}
            <div className="bg-[#18181B] rounded-3xl p-6 sm:p-8 border-2 border-[#F05A28] relative flex flex-col justify-between shadow-2xl shadow-orange-950/30">
              <div className="absolute top-0 right-0 bg-[#F05A28] text-white text-[10px] font-black uppercase px-3.5 py-1 rounded-bl-2xl tracking-wider">
                ⚡ The Dopamine Hack
              </div>

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#27272A] mb-6">
                  <span className="text-xs uppercase font-black tracking-widest text-[#F05A28] bg-orange-950/60 px-3 py-1 rounded-full border border-orange-800/40">
                    ✓ The Cravey Protocol
                  </span>
                  <span className="text-xs text-[#16A34A] font-bold">100% Sustainable</span>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="text-[#F05A28] font-mono text-xs font-bold shrink-0 mt-0.5">7:00 PM</span>
                    <p className="text-sm text-[#E4E4E7]">
                      You eat a high-flavor dinner with rich spices, texture, and proper seasoning.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#F05A28] font-mono text-xs font-bold shrink-0 mt-0.5">8:45 PM</span>
                    <p className="text-sm text-[#E4E4E7]">
                      Your brain demands a sweet candy bar, bakery cake, or creamy dessert.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#F05A28] font-mono text-xs font-bold shrink-0 mt-0.5">9:00 PM</span>
                    <p className="text-sm text-[#E4E4E7]">
                      You make Cravey&apos;s 10-minute Frozen Snickers Dates or Chocolate Lava Fluff (34g protein, zero refined sugar).
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#16A34A] font-mono text-xs font-bold shrink-0 mt-0.5">Next AM</span>
                    <p className="text-sm text-[#4ADE80] font-semibold">
                      Dopamine fully satisfied, 30g+ protein delivered to repair muscle, waking up lean.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#27272A] text-xs text-[#4ADE80] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>Zero food guilt. Your body burns the clean protein during sleep.</span>
              </div>
            </div>
          </div>

          {/* Controversial Quote Banner */}
          <div className="bg-gradient-to-r from-[#18181B] via-[#27272A] to-[#18181B] rounded-3xl p-8 sm:p-10 border border-[#3F3F46] text-center max-w-4xl mx-auto space-y-6">
            <blockquote className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-relaxed">
              &ldquo;You do not have a willpower deficiency. You have a protein and dopamine mismatch. Stop starving your cravings&mdash;outsmart them.&rdquo;
            </blockquote>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">
                Available Now on Both Stores:
              </span>
              <StoreButtons variant="dark" size="sm" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Interactive Craving Swap Engine */}
      <section id="swaps" className="py-20 bg-[#F9F9F8] border-y border-[#EAEAE6] scroll-mt-20">
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
                      ? "bg-[#0F1012] text-white shadow-md shadow-black/10"
                      : "bg-white text-[#52525B] hover:bg-[#EAEAE6] border border-[#EAEAE6]"
                  }`}
                >
                  {item.cravingName}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Card Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* The Junk Craving (Before) */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAEAE6] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#A1A1AA]">
                    The Junk Craving
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
                    High Sugar Crash
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-[#0F1012] mb-2">
                  {currentSwap.cravingName}
                </h3>
                <p className="text-xs sm:text-sm text-[#71717A] mb-6">
                  Standard store-bought or fast food version. Leaves you lethargic and hungry again within 45 minutes.
                </p>

                {/* Macro Metric Bars */}
                <div className="space-y-4 pt-4 border-t border-[#F0F0EC]">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#71717A]">Calories</span>
                      <span className="text-red-600 font-extrabold">
                        {currentSwap.cravingCal} kcal
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#F4F4F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-400 rounded-full"
                        style={{ width: `${Math.min(100, (currentSwap.cravingCal / 800) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#71717A]">Protein</span>
                      <span className="text-[#0F1012]">
                        {currentSwap.cravingProtein}g
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#F4F4F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-300 rounded-full"
                        style={{ width: `${Math.min(100, (currentSwap.cravingProtein / 50) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-[#71717A]">Refined Sugar</span>
                      <span className="text-red-500">
                        {currentSwap.cravingSugar}g
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#F4F4F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-300 rounded-full"
                        style={{ width: `${Math.min(100, (currentSwap.cravingSugar / 50) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F0F0EC] text-xs text-[#A1A1AA] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-400" />
                <span>Triggers rapid spike in evening ghrelin & reactive hypoglycemia</span>
              </div>
            </div>

            {/* The Cravey Swap (After) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#F05A28]/30 shadow-xl shadow-orange-950/[0.04] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#F05A28] text-white text-[11px] font-bold px-4 py-1 rounded-bl-2xl">
                {currentSwap.highlight}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#F05A28]">
                    Cravey Clean Swap
                  </span>
                  <span className="text-xs text-[#71717A]">·</span>
                  <span className="text-xs font-semibold text-[#16A34A] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {currentSwap.prepTime} prep
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] mb-3">
                  {currentSwap.swapName}
                </h3>

                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-6">
                  {currentSwap.tasteDescription}
                </p>

                {/* Macro Metric Bars */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FFF9F5] border border-[#FDE5D9] mb-6 text-center">
                  <div>
                    <span className="block text-[11px] font-semibold text-[#71717A] uppercase">
                      Calories
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#0F1012]">
                      {currentSwap.swapCal}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-[#F05A28] uppercase">
                      Protein
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#F05A28]">
                      {currentSwap.swapProtein}g
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold text-[#16A34A] uppercase">
                      Sugar
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-[#16A34A]">
                      {currentSwap.swapSugar}g
                    </span>
                  </div>
                </div>

                {/* Knolled Ingredients Mini-List */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#71717A] mb-2.5">
                    Whole-Food Clean Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentSwap.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium bg-[#FAFAF8] text-[#0F1012] px-3 py-1.5 rounded-xl border border-[#EAEAE6]"
                      >
                        ✓ {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual Card Preview */}
              <div className="mt-8 pt-6 border-t border-[#F0F0EC] flex items-center justify-between">
                <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-[#FAFAF8] border border-[#EAEAE6]">
                  <Image
                    src={currentSwap.cardImage}
                    alt={currentSwap.swapName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4 justify-between">
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

      {/* 4. Inside The App: Showcase with Pixel-Perfect Uncropped Screen Mockup */}
      <section id="app-tour" className="py-24 bg-white border-b border-[#EAEAE6] scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FFF3EE] text-[#F05A28] border border-[#FDE5D9] mb-3">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Full App Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] tracking-tight">
              Built for your kitchen counter, not just a spreadsheet.
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] mt-3">
              Cravey brings chef-level visual elegance, social video importing, and automatic portion scaling together into one seamless mobile app.
            </p>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {APP_SCREENSHOT_FEATURES.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeatureId(feature.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedFeatureId === feature.id
                    ? "bg-[#F05A28] text-white shadow-md shadow-orange-900/10"
                    : "bg-[#FAFAF8] text-[#52525B] hover:bg-[#EAEAE6] border border-[#EAEAE6]"
                }`}
              >
                <span>{feature.title}</span>
              </button>
            ))}
          </div>

          {/* Feature Showcase Container */}
          <div className="bg-[#FAFAF8] rounded-3xl border border-[#EAEAE6] p-6 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Feature Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#F05A28] bg-[#FFF3EE] px-3 py-1 rounded-full border border-[#FDE5D9] inline-block">
                    {activeFeature.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] tracking-tight">
                    {activeFeature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#F05A28] font-semibold">
                    {activeFeature.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
                  {activeFeature.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#71717A] block">
                    Key Features:
                  </span>
                  <ul className="space-y-2.5">
                    {activeFeature.highlights.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0F1012]">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 space-y-4">
                  <StoreButtons variant="dark" size="md" className="justify-start" />
                </div>
              </div>

              {/* Right Column: Pixel-Perfect Native Screen Frame (NO CROPPING) */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-64 sm:w-72 md:w-[320px] bg-[#0F1012] rounded-[48px] p-3 shadow-2xl shadow-black/20 border-4 border-[#27272A]">
                  {/* Dynamic Island / Speaker Pill */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0F1012] rounded-full z-20 flex items-center justify-center">
                    <div className="w-10 h-1.5 bg-[#27272A] rounded-full"></div>
                  </div>

                  {/* Inner Screen: Exact 1290x2796 aspect ratio with uncropped full fit */}
                  <div className="relative w-full aspect-[1290/2796] rounded-[38px] overflow-hidden bg-black">
                    <Image
                      src={activeFeature.image}
                      alt={activeFeature.title}
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="mt-12 pt-8 border-t border-[#EAEAE6]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#71717A] mb-4 text-center">
                All 7 Core App Modules (Tap to preview)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {APP_SCREENSHOT_FEATURES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFeatureId(item.id)}
                    className={`p-2 rounded-2xl border text-left transition-all cursor-pointer flex flex-col items-center text-center ${
                      selectedFeatureId === item.id
                        ? "bg-white border-[#F05A28] shadow-md ring-2 ring-[#F05A28]/20"
                        : "bg-white/60 border-[#EAEAE6] hover:bg-white"
                    }`}
                  >
                    <div className="relative w-full aspect-[1290/2796] rounded-xl overflow-hidden bg-[#EAEAE6] mb-2">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-[#0F1012] truncate w-full">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Visual Knolling Bento Showcase */}
      <section id="knolling" className="py-24 bg-white scroll-mt-20">
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
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-[#EAEAE6]">
                <Image
                  src="/images/snickers-dates-hero.jpg"
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
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-[#EAEAE6]">
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
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white border border-[#EAEAE6]">
                <Image
                  src="/images/high-protein-tacos-hero.jpg"
                  alt="High-protein meal swaps"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-[#0F1012]">
                  3. 1-Tap Grocery Cart Sync
                </h3>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  Found a craving swap you love? Export all ingredients directly into Instacart or supermarket delivery in a single click.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. From The Blog & Health Journal */}
      <section className="py-20 bg-[#FAFAF8] border-y border-[#EAEAE6]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-[#F05A28] block mb-2">
                Nutrition & Macro Journal
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] tracking-tight">
                Latest health facts, swaps & recipes
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#F05A28] hover:underline"
            >
              <span>Explore all recipes & guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between bg-white rounded-3xl border border-[#EAEAE6] overflow-hidden hover:border-[#F05A28]/40 hover:shadow-lg hover:shadow-black/[0.04] transition-all"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full bg-[#F4F4F0] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0F1012]/80 backdrop-blur-md text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] text-[#71717A] mb-2">
                      <Clock className="w-3 h-3 text-[#F05A28]" />
                      <span>{post.readTime}</span>
                      <span>·</span>
                      <span>{post.publishedAt}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#0F1012] group-hover:text-[#F05A28] transition-colors leading-snug line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#52525B] line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-[#F0F0EC] flex items-center justify-between text-xs font-bold text-[#F05A28]">
                  <span>View Recipe & Macros</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-20 bg-white border-t border-[#EAEAE6] scroll-mt-20">
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
                q: "Is Cravey officially available right now?",
                a: "Yes! Cravey is live and ready to download on both the Apple App Store and Google Play Store. You can start using it immediately on iOS and Android.",
              },
              {
                q: "Is Cravey free to use?",
                a: "Yes! Cravey offers a generous free tier with daily craving swaps, knolled visual recipes, and basic macro tracking. A Pro subscription is available for unlimited AI reel importing and automated grocery sync.",
              },
              {
                q: "Can I filter for allergies or dietary restrictions?",
                a: "Absolutely. Cravey allows you to set filters for Gluten-Free, Dairy-Free, Nut-Free, High-Protein / Low-Carb, Vegan, and Sugar-Free swaps.",
              },
              {
                q: "How does the 1-tap social video recipe import work?",
                a: "Simply share or paste any TikTok, Instagram Reel, or YouTube Shorts link into Cravey. Our AI parses the video caption, extracts exact ingredient quantities, and automatically looks up verified USDA macronutrients.",
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

      {/* 8. Bottom Call-to-Action with Store Links */}
      <section className="py-20 bg-[#FAFAF8] border-t border-[#EAEAE6]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#EAEAE6] shadow-sm flex items-center justify-center mx-auto bg-[#F05A28]">
            <Image
              src="/app-icon.png"
              alt="Cravey App Icon"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1012] tracking-tight">
            Stop fighting your cravings. Start swapping them.
          </h2>
          <p className="text-base text-[#52525B] max-w-xl mx-auto">
            Download Cravey on iOS or Android now. Get instant access to all 150+ high-protein recipes and meal prep tools.
          </p>
          <div className="pt-2">
            <StoreButtons variant="dark" size="lg" />
          </div>
        </div>
      </section>

      {/* 9. Minimalist Footer */}
      <footer className="py-12 bg-white border-t border-[#EAEAE6] text-xs text-[#71717A]">
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
            <a href="#app-tour" className="hover:text-[#0F1012] transition-colors">
              App Features
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
