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
      "Paste any Instagram reel or TikTok food video link. Cravey extracts the exact ingredients, calculates the calories and macros, and transforms chaotic viral recipes into measured, easy-to-follow kitchen cards in seconds.",
    image: "/screenshots/01_social_import.png",
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
    image: "/screenshots/02_high_protein_catalog.png",
    highlights: [
      "Categorized by Sweet, Savory, Bakery, and Fast-Food",
      "Filter by Gluten-Free, Dairy-Free, Low-Carb & Vegan",
      "Average +20g to +40g protein boost per recipe",
      "Real whole-food ingredients with zero artificial fillers",
    ],
  },
  {
    id: "macros",
    title: "Precise Macros & Nutrition",
    subtitle: "Full nutritional transparency calculated to the exact gram",
    badge: "USDA Verified",
    description:
      "Every single recipe card features an exact macronutrient breakdown: total calories, protein grams, net carbohydrates, fiber, and healthy fats. Know exactly what fuel goes into your body before you take your first bite.",
    image: "/screenshots/03_macros_and_nutrition.png",
    highlights: [
      "Gram-by-gram protein, carb, fat, and fiber metrics",
      "Visual macro ratio dial for quick scanning",
      "Sugar alcohol & net carb tracking for keto / low-GI",
      "Direct integration with Apple Health & fitness logs",
    ],
  },
  {
    id: "scaler",
    title: "Batch Prep & Portion Scaler",
    subtitle: "Effortlessly scale from single-serve snacks to weekly meal prep",
    badge: "Smart Scaling",
    description:
      "Cooking for yourself tonight or meal prepping 6 portions for your work week? Simply slide the portion selector. Cravey dynamically recalibrates every ingredient measurement and macro calculation with zero math required.",
    image: "/screenshots/04_batch_prep_scaler.png",
    highlights: [
      "Dynamic serving multiplier (1x up to 12x batch)",
      "Automatic metric & imperial unit conversion",
      "Smart pantry rounding so you buy exact package sizes",
      "Meal prep container distribution guide",
    ],
  },
  {
    id: "planner",
    title: "Weekly Meal & Prep Planner",
    subtitle: "Map out your weekly swaps and generate instant grocery lists",
    badge: "Organized",
    description:
      "Organize your breakfast, post-workout snacks, and late-night cravings across the week. Cravey automatically aggregates all ingredients into an aisle-by-aisle grocery checklist that you can check off or export in one tap.",
    image: "/screenshots/05_weekly_planner.png",
    highlights: [
      "Visual 7-day drag-and-drop craving calendar",
      "Smart grocery list organized by supermarket aisle",
      "Zero food waste planning across shared ingredients",
      "Export directly to Apple Reminders or clipboard",
    ],
  },
  {
    id: "guided-cook",
    title: "Hands-Free Guided Cook Mode",
    subtitle: "Large visual step cards with integrated kitchen timers",
    badge: "Kitchen Friendly",
    description:
      "Step into the kitchen with confidence. Cravey's distraction-free cook mode provides high-contrast typography, large knolled photography, and integrated prep/cook timers so you never burn a batch or get sauce on your screen.",
    image: "/screenshots/06_guided_cook_mode.png",
    highlights: [
      "Step-by-step full-screen cards designed for kitchen counters",
      "Built-in countdown timers for baking and prep",
      "Keep-awake display mode while actively cooking",
      "Clear visual checkpoints for texture and doneness",
    ],
  },
];
