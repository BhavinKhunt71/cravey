"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Clock,
  Printer,
  Share2,
  Check,
  Dumbbell,
  Flame,
  Utensils,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Star,
  Sparkles,
} from "lucide-react";
import { RecipeCardData } from "@/data/blogs";

interface Props {
  recipe: RecipeCardData;
  coverImage: string;
}

export default function InteractiveRecipeCard({ recipe, coverImage }: Props) {
  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  // Helper to parse numbers and scale amounts
  const scaleAmount = (amountStr: string, multiplier: number) => {
    if (multiplier === 1) return amountStr;
    // Match leading numbers or fractions (e.g. "4", "320g", "1.5 tbsp", "1/3 cup")
    return amountStr.replace(/(\d+(?:\.\d+)?|\d+\/\d+)/, (match) => {
      if (match.includes("/")) {
        const [num, den] = match.split("/").map(Number);
        const val = (num / den) * multiplier;
        return val % 1 === 0 ? val.toString() : val.toFixed(1);
      }
      const val = parseFloat(match) * multiplier;
      return val % 1 === 0 ? val.toString() : val.toFixed(1);
    });
  };

  const scaledServings = recipe.servings * servingMultiplier;
  const scaledCalories = Math.round(recipe.calories);
  const scaledProtein = Math.round(recipe.protein);

  return (
    <div
      id="recipe-card"
      className="bg-white rounded-3xl border-2 border-[#FDE5D9] p-6 sm:p-10 mb-14 shadow-xl shadow-orange-950/[0.04] scroll-mt-24"
    >
      {/* Top Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FCE1D4] mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-[#F05A28]">
              Cravey Official Recipe Card
            </span>
            <span className="text-xs text-[#71717A]">·</span>
            <div className="flex items-center gap-1 text-xs font-bold text-[#F05A28]">
              <Star className="w-3.5 h-3.5 fill-[#F05A28]" />
              <span>{recipe.rating}</span>
              <span className="text-[#71717A] font-normal">({recipe.reviewsCount} reviews)</span>
            </div>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1012]">
            {recipe.title}
          </h3>
        </div>

        {/* Action Buttons: Print, Share */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-[#FAFAF8] border border-[#EAEAE6] text-xs font-semibold text-[#0F1012] hover:bg-[#F4F4F0] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Print Recipe Card"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="px-3.5 py-2 rounded-xl bg-[#FAFAF8] border border-[#EAEAE6] text-xs font-semibold text-[#0F1012] hover:bg-[#F4F4F0] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Share Recipe"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mandatory Timers Banner (Prominent & Explicit) */}
      <div className="bg-[#FFF9F5] border border-[#FDE5D9] rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[#0F1012] font-extrabold text-sm sm:text-base">
          <Clock className="w-5 h-5 text-[#F05A28]" />
          <span>{recipe.totalTime}</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-[#71717A]">
          <div>
            Prep: <strong className="text-[#0F1012]">{recipe.prepTime}</strong>
          </div>
          <span>·</span>
          <div>
            Cook: <strong className="text-[#0F1012]">{recipe.cookTime}</strong>
          </div>
          <span>·</span>
          <div>
            Difficulty: <strong className="text-[#F05A28]">{recipe.difficulty}</strong>
          </div>
        </div>
      </div>

      {/* Nutrition Macro Strip (Per Serving) */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 mb-8 text-center">
        <div className="bg-[#FAFAF8] p-3 rounded-2xl border border-[#EAEAE6]">
          <div className="text-[10px] font-semibold text-[#71717A] uppercase">Calories</div>
          <div className="text-xl font-extrabold text-[#0F1012] mt-0.5">
            {scaledCalories} <span className="text-[10px] font-normal text-[#71717A]">kcal</span>
          </div>
        </div>
        <div className="bg-[#FFF3EE] p-3 rounded-2xl border border-[#FDE5D9]">
          <div className="text-[10px] font-bold text-[#F05A28] uppercase flex items-center justify-center gap-1">
            <Dumbbell className="w-3 h-3" />
            Protein
          </div>
          <div className="text-xl font-extrabold text-[#F05A28] mt-0.5">
            {scaledProtein}g
          </div>
        </div>
        <div className="bg-[#FAFAF8] p-3 rounded-2xl border border-[#EAEAE6]">
          <div className="text-[10px] font-semibold text-[#71717A] uppercase">Net Carbs</div>
          <div className="text-xl font-extrabold text-[#0F1012] mt-0.5">
            {recipe.netCarbs}g
          </div>
        </div>
        <div className="bg-[#FAFAF8] p-3 rounded-2xl border border-[#EAEAE6]">
          <div className="text-[10px] font-semibold text-[#71717A] uppercase">Total Fat</div>
          <div className="text-xl font-extrabold text-[#0F1012] mt-0.5">
            {recipe.fat}g
          </div>
        </div>
        <div className="bg-[#FAFAF8] p-3 rounded-2xl border border-[#EAEAE6]">
          <div className="text-[10px] font-semibold text-[#71717A] uppercase">Fiber</div>
          <div className="text-xl font-extrabold text-[#0F1012] mt-0.5">
            {recipe.fiber}g
          </div>
        </div>
        <div className="bg-[#FAFAF8] p-3 rounded-2xl border border-[#EAEAE6]">
          <div className="text-[10px] font-semibold text-[#71717A] uppercase">Sodium</div>
          <div className="text-xl font-extrabold text-[#0F1012] mt-0.5">
            {recipe.sodiumMg}mg
          </div>
        </div>
      </div>

      {/* Serving Scaler Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAFAF8] border border-[#EAEAE6] mb-8">
        <div className="flex items-center gap-2">
          <Utensils className="w-4 h-4 text-[#F05A28]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F1012]">
            Servings: {scaledServings} {scaledServings === 1 ? "portion" : "portions"}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#71717A] mr-1">Scale Recipe:</span>
          {[1, 2, 3, 4].map((mult) => (
            <button
              key={mult}
              onClick={() => setServingMultiplier(mult)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                servingMultiplier === mult
                  ? "bg-[#0F1012] text-white shadow-sm"
                  : "bg-white text-[#52525B] hover:bg-[#EAEAE6] border border-[#EAEAE6]"
              }`}
            >
              {mult}x
            </button>
          ))}
        </div>
      </div>

      {/* Ingredients & Method with Interactive Kitchen Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Ingredients Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAEAE6]">
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#0F1012] flex items-center gap-2">
              <span>Ingredients</span>
            </h4>
            <span className="text-[11px] text-[#71717A]">Tap to check off</span>
          </div>

          <ul className="space-y-2.5">
            {recipe.ingredients.map((ing, i) => {
              const isChecked = !!checkedIngredients[i];
              return (
                <li
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                    isChecked
                      ? "bg-[#F4F4F0] border-[#EAEAE6] opacity-60 line-through"
                      : "bg-[#FAFAF8] border-[#EAEAE6] hover:bg-white hover:border-[#F05A28]/40"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? "bg-[#16A34A] border-[#16A34A] text-white"
                        : "border-[#A1A1AA] bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div className="flex flex-col text-xs sm:text-sm">
                    <span className="font-bold text-[#0F1012]">
                      {scaleAmount(ing.amount, servingMultiplier)} {ing.item}
                    </span>
                    {ing.note && (
                      <span className="text-[11px] text-[#71717A] mt-0.5">
                        {ing.note}
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Step-by-Step Instructions Column */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAEAE6]">
            <h4 className="text-xs uppercase tracking-widest font-extrabold text-[#0F1012] flex items-center gap-2">
              <span>Cooking Method</span>
            </h4>
            <span className="text-[11px] text-[#71717A]">Step-by-step guidance</span>
          </div>

          <ol className="space-y-3.5">
            {recipe.instructions.map((step, idx) => {
              const isStepDone = !!checkedSteps[idx];
              return (
                <li
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                    isStepDone
                      ? "bg-[#F4F4F0] border-[#EAEAE6] opacity-60"
                      : "bg-white border-[#EAEAE6] hover:border-[#F05A28]/40 shadow-sm"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isStepDone
                        ? "bg-[#16A34A] text-white"
                        : "bg-[#FFF3EE] text-[#F05A28]"
                    }`}
                  >
                    {isStepDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.stepNumber}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className={`text-xs font-bold uppercase tracking-wider ${isStepDone ? "text-[#71717A] line-through" : "text-[#0F1012]"}`}>
                        {step.title}
                      </h5>
                      {step.timerMins && (
                        <span className="text-[11px] font-bold text-[#F05A28] bg-[#FFF3EE] px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.timerMins} mins
                        </span>
                      )}
                    </div>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isStepDone ? "text-[#71717A] line-through" : "text-[#52525B]"}`}>
                      {step.instruction}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
