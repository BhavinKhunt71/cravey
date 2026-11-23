export interface AppScreenshotFeature {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  image: string;
  highlights: string[];
}

export const APP_SCREENSHOT_FEATURES: AppScreenshotFeature[] = [
  {
    id: "social-import",
    title: "1-Tap Social Recipe Import",
    subtitle: "Turn viral TikTok & Instagram food into macro-counted meals",
    badge: "AI Powered",
    description:
      "Paste any Instagram reel, TikTok video, or YouTube Shorts link. Cravey extracts the exact ingredients, calculates the calories and macros, and transforms chaotic viral recipes into measured, easy-to-follow kitchen cards in seconds.",
    image: "/screenshots/iPhone_67_02_social_import.png",
    highlights: [
      "Paste Instagram, TikTok & YouTube Shorts links",
      "Automatic ingredient quantity & macro parsing",
      "Instant calorie and protein per serving calculation",
      "One-tap save to your personal Cravey cookbook",
    ],
  },
  {
    id: "catalog",
    title: "High-Protein Craving Catalog",
    subtitle: "Over 150+ guilt-free swaps for your favorite sweet & savory treats",
    badge: "150+ Swaps",
    description:
      "Never fight your sweet tooth or comfort food urges again. Browse chef-tested swaps for Snickers, Reese's cups, glazed donuts, bakery cookies, smash burgers, and buffalo melts—all dialed to high protein and minimal sugar.",
    image: "/screenshots/iPhone_67_01_discover_feed.png",
    highlights: [
      "Categorized by Sweet, Savory, Bakery, and Fast-Food",
      "Filter by Gluten-Free, Dairy-Free, Low-Carb & Vegan",
      "Average +20g to +40g protein boost per recipe",
      "Real whole-food ingredients with zero artificial fillers",
    ],
  },
  {
    id: "macros",
    title: "Precise Macros & Recipe Detail",
    subtitle: "Full nutritional transparency calculated to the exact gram",
    badge: "USDA Verified",
    description:
      "Every single recipe card features an exact macronutrient breakdown: total calories, protein grams, net carbohydrates, fiber, and healthy fats. Know exactly what fuel goes into your body before you take your first bite.",
    image: "/screenshots/iPhone_67_03_recipe_detail.png",
    highlights: [
      "Gram-by-gram protein, carb, fat, and fiber metrics",
      "Visual macro ratio dial for quick scanning",
      "Sugar alcohol & net carb tracking for keto / low-GI",
      "Direct integration with Apple Health & fitness logs",
    ],
  },
  {
    id: "guided-cook",
    title: "Hands-Free Guided Cook Mode",
    subtitle: "Large visual step cards with integrated kitchen timers",
    badge: "Kitchen Friendly",
    description:
      "Step into the kitchen with confidence. Cravey's distraction-free cook mode provides high-contrast typography, large knolled photography, and integrated prep/cook timers so you never burn a batch or get sauce on your screen.",
    image: "/screenshots/iPhone_67_04_cook_mode.png",
    highlights: [
      "Step-by-step full-screen cards designed for kitchen counters",
      "Built-in countdown timers for baking and prep",
      "Keep-awake display mode while actively cooking",
      "Clear visual checkpoints for texture and doneness",
    ],
  },
  {
    id: "planner",
    title: "Weekly Meal & Prep Planner",
    subtitle: "Map out your weekly swaps and generate instant grocery lists",
    badge: "Organized",
    description:
      "Organize your breakfast, post-workout snacks, and late-night cravings across the week. Cravey automatically aggregates all ingredients into an aisle-by-aisle grocery checklist that you can check off or export in one tap.",
    image: "/screenshots/iPhone_67_05_meal_planner.png",
    highlights: [
      "Visual 7-day drag-and-drop craving calendar",
      "Smart grocery list organized by supermarket aisle",
      "Zero food waste planning across shared ingredients",
      "Export directly to Apple Reminders or clipboard",
    ],
  },
  {
    id: "grocery",
    title: "Smart Aisle-by-Aisle Grocery List",
    subtitle: "Automatic ingredient aggregation sorted by supermarket aisle",
    badge: "Zero Waste",
    description:
      "No more running back and forth between supermarket aisles. Cravey groups your weekly ingredients by Produce, Dairy, Proteins, Pantry, and Spices, merging identical items automatically so you never buy doubles.",
    image: "/screenshots/iPhone_67_06_grocery_list.png",
    highlights: [
      "Auto-grouped by produce, dairy, bakery, and pantry",
      "Consolidates quantities across multiple recipes",
      "Interactive tap-to-cross-off shopping checklist",
      "1-tap export to Instacart or supermarket delivery",
    ],
  },
  {
    id: "pro",
    title: "Cravey Pro Membership",
    subtitle: "Unlock unlimited social imports, AI pantry scan, and custom macros",
    badge: "Pro Access",
    description:
      "Upgrade to Cravey Pro to unlock unlimited reel conversions, automatic grocery cart sync, personalized calorie & macro targets, and our entire vault of 150+ exclusive craving swaps.",
    image: "/screenshots/iPhone_67_07_cravey_pro_paywall.png",
    highlights: [
      "Unlimited AI social video recipe conversions",
      "Full access to 150+ chef-crafted craving swaps",
      "Personalized macro targets synced to Apple Health",
      "3-day free trial with zero risk",
    ],
  },
];
