"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Flame,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import StoreButtons, { APP_STORE_URL, PLAY_STORE_URL } from "./StoreButtons";

interface EmergencyCraving {
  id: string;
  emoji: string;
  name: string;
  junkTitle: string;
  junkCals: number;
  junkSugar: string;
  junkProtein: string;
  junkTrap: string;
  swapTitle: string;
  swapCals: number;
  swapSugar: string;
  swapProtein: string;
  swapPrep: string;
  swapHero: string;
  swapImage: string;
  scientificDopamineHook: string;
}

const EMERGENCY_CRAVINGS: EmergencyCraving[] = [
  {
    id: "snickers",
    emoji: "🍫",
    name: "Snickers & Chocolate",
    junkTitle: "King-Size Snickers Bar",
    junkCals: 280,
    junkSugar: "32g Sugar",
    junkProtein: "4g Protein",
    junkTrap: "Instant insulin surge followed by a severe dopamine drop at 10 PM, causing morning cravings.",
    swapTitle: "Frozen Snickers Medjool Dates",
    swapCals: 215,
    swapSugar: "0g Refined Sugar",
    swapProtein: "14g Whole Protein",
    swapPrep: "8 mins",
    swapHero: "Stuffed with all-natural peanut butter, roasted peanuts, and coated in 85% dark cacao with flaky Maldon sea salt.",
    swapImage: "/images/snickers-dates-card.jpg",
    scientificDopamineHook: "Medjool dates provide natural fructose and potassium to calm adrenaline, while peanut fats sustain dopamine.",
  },
  {
    id: "icecream",
    emoji: "🍦",
    name: "Ben & Jerry's Ice Cream",
    junkTitle: "Pint of Cookie Dough Ice Cream",
    junkCals: 1160,
    junkSugar: "88g Sugar",
    junkProtein: "14g Protein",
    junkTrap: "More than an entire day's sugar in one sitting. Triggers severe nighttime acid reflux and lethargy.",
    swapTitle: "Whipped Vanilla Cookie Dough Fluff",
    swapCals: 260,
    swapSugar: "4g Sugar",
    swapProtein: "38g Clean Protein",
    swapPrep: "3 mins",
    swapHero: "Thick creamy Greek yogurt whipped with vanilla whey isolate, cinnamon, and sugar-free chocolate chips.",
    swapImage: "/images/candy-snacks-cover.jpg",
    scientificDopamineHook: "Micellar casein and whey provide a 4-hour amino acid drip to stimulate muscle protein synthesis overnight.",
  },
  {
    id: "burger",
    emoji: "🍔",
    name: "Greasy Patty Melt / Burger",
    junkTitle: "Fast Food Double Patty Melt",
    junkCals: 840,
    junkSugar: "8g Sugar",
    junkProtein: "24g Protein",
    junkTrap: "Excess industrial seed oils and saturated fats cause systemic inflammation and heavy morning face puffiness.",
    swapTitle: "Crispy Buffalo Chicken Sourdough Melt",
    swapCals: 380,
    swapSugar: "2g Sugar",
    swapProtein: "44g Lean Protein",
    swapPrep: "12 mins",
    swapHero: "Tender shredded chicken, aged cayenne buffalo glaze, and whipped low-fat cottage cheese on artisan sourdough.",
    swapImage: "/images/buffalo-melt-card.jpg",
    scientificDopamineHook: "Capsaicin from aged hot peppers triggers natural endorphin release while lean poultry delivers high-satiety leucine.",
  },
  {
    id: "cinnamon",
    emoji: "🍩",
    name: "Bakery Pastries & Donuts",
    junkTitle: "Mall Glazed Cinnamon Roll",
    junkCals: 620,
    junkSugar: "58g Sugar",
    junkProtein: "5g Protein",
    junkTrap: "Bleached refined flour spikes blood glucose immediately, leaving you starving again in under 45 minutes.",
    swapTitle: "Banana Bread Baked Oats",
    swapCals: 310,
    swapSugar: "6g Natural Sugar",
    swapProtein: "26g Whey Protein",
    swapPrep: "15 mins",
    swapHero: "Rolled whole oats, caramelized ripe banana, and whey isolate baked into a warm cake-like golden crust.",
    swapImage: "/images/baked-oats-knolling.jpg",
    scientificDopamineHook: "Beta-glucan prebiotic fiber expands in the digestive tract, releasing satiety peptides CCK and PYY.",
  },
  {
    id: "tacos",
    emoji: "🌮",
    name: "2 AM Street Tacos",
    junkTitle: "Greasy Late-Night Drive-Thru Tacos",
    junkCals: 740,
    junkSugar: "6g Sugar",
    junkProtein: "18g Protein",
    junkTrap: "Heavy grease and extreme sodium levels result in water retention, elevated blood pressure, and sluggish mornings.",
    swapTitle: "Crispy Chipotle Carne Asada Tacos",
    swapCals: 390,
    swapSugar: "2g Sugar",
    swapProtein: "48g Steak Protein",
    swapPrep: "15 mins",
    swapHero: "Marinated lean flank steak, charred corn tortillas, fresh cilantro lime pico, and high-protein Greek yogurt crema.",
    swapImage: "/images/high-protein-tacos-hero.jpg",
    scientificDopamineHook: "Heme iron and zinc from steak support testosterone and neurotransmitter production without excess saturated fats.",
  },
];

export default function CravingEmergencyTool() {
  const [activeCravingId, setActiveCravingId] = useState<string>("snickers");

  const current =
    EMERGENCY_CRAVINGS.find((c) => c.id === activeCravingId) ||
    EMERGENCY_CRAVINGS[0];

  return (
    <div className="bg-white rounded-3xl border-2 border-[#0F1012] shadow-2xl shadow-black/10 overflow-hidden">
      {/* Top Header Pill Banner */}
      <div className="bg-[#0F1012] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-[#F05A28] text-white text-xs font-black uppercase">
            Interactive Tool
          </span>
          <span className="font-extrabold text-sm sm:text-base tracking-tight">
            The 9 PM Craving Panic Simulator
          </span>
        </div>
        <div className="text-xs text-[#A1A1AA] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#F05A28]" />
          <span>Select what your brain is screaming for right now:</span>
        </div>
      </div>

      {/* Craving Selection Buttons */}
      <div className="p-4 sm:p-6 bg-[#FAFAF8] border-b border-[#EAEAE6]">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {EMERGENCY_CRAVINGS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCravingId(c.id)}
              className={`px-3.5 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeCravingId === c.id
                  ? "bg-[#F05A28] text-white shadow-lg shadow-orange-900/20 scale-105"
                  : "bg-white text-[#52525B] hover:bg-[#EAEAE6] border border-[#EAEAE6]"
              }`}
            >
              <span className="text-base sm:text-lg">{c.emoji}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Visual Battle */}
      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: The Junk Trap (Old Way) */}
        <div className="lg:col-span-5 bg-[#FFF9F9] rounded-2xl p-6 border border-red-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase font-black tracking-wider text-red-600 bg-red-100 px-2.5 py-0.5 rounded-md">
                🛑 The Guilt Trap
              </span>
              <span className="text-xs font-bold text-red-500">Traditional Junk</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F1012] mb-1">
              {current.junkTitle}
            </h3>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 my-5 text-center bg-white rounded-xl p-3 border border-red-100">
              <div>
                <span className="block text-[10px] font-bold text-[#71717A] uppercase">Calories</span>
                <span className="text-lg font-black text-red-600">{current.junkCals}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#71717A] uppercase">Sugar</span>
                <span className="text-lg font-black text-red-600">{current.junkSugar}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#71717A] uppercase">Protein</span>
                <span className="text-lg font-black text-[#71717A]">{current.junkProtein}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#52525B] leading-relaxed">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p><strong>The Biological Consequence:</strong> {current.junkTrap}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-red-100 text-[11px] text-red-700 font-semibold flex items-center gap-1.5">
            <span>Result: Guilt, bloated face, broken diet streak</span>
          </div>
        </div>

        {/* Right: The Cravey Swap (The Controversial Fix) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border-2 border-[#16A34A]/40 shadow-xl shadow-green-950/[0.03] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#16A34A] text-white text-[10px] font-black uppercase px-3.5 py-1 rounded-bl-xl tracking-wider">
            ⚡ Neuro-Satiety Swap
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] uppercase font-black tracking-wider text-[#16A34A] bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                ✓ The Cravey Hack
              </span>
              <span className="text-xs text-[#71717A]">·</span>
              <span className="text-xs font-bold text-[#F05A28] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {current.swapPrep} kitchen prep
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012] mb-2">
              {current.swapTitle}
            </h3>

            {/* Winning Metrics */}
            <div className="grid grid-cols-3 gap-2 my-5 text-center bg-[#F0FDF4] rounded-xl p-3 border border-emerald-100">
              <div>
                <span className="block text-[10px] font-bold text-[#71717A] uppercase">Calories</span>
                <span className="text-lg font-black text-[#0F1012]">{current.swapCals} kcal</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#16A34A] uppercase">Sugar</span>
                <span className="text-lg font-black text-[#16A34A]">{current.swapSugar}</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-[#F05A28] uppercase">Protein</span>
                <span className="text-lg font-black text-[#F05A28]">{current.swapProtein}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed mb-4">
              {current.swapHero}
            </p>

            <div className="p-3 bg-[#FAFAF8] rounded-xl border border-[#EAEAE6] text-xs text-[#0F1012] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#F05A28] shrink-0 mt-0.5" />
              <p>
                <strong>The Science:</strong> {current.scientificDopamineHook}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-[#F0F0EC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full recipe + visual timers in Cravey</span>
            </div>
            <a
              href="#download"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F1012] text-white text-xs font-bold hover:bg-[#27272A] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Recipe Free</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
