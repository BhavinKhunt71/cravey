export interface RecipeCardData {
  title: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  servings: number;
  ingredients: { item: string; amount: string; note?: string }[];
  instructions: string[];
  macrosRatio: { proteinPct: number; carbsPct: number; fatPct: number };
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: "Craving Swaps" | "Macro Science" | "Meal Prep" | "Recipe Tech";
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  coverImage: string;
  recipeCard?: RecipeCardData;
  keyTakeaways: string[];
  sections: {
    heading: string;
    subheading?: string;
    content: string;
    highlightBox?: {
      title: string;
      text: string;
      type: "tip" | "fact" | "warning";
    };
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "high-protein-sweet-craving-swaps",
    title: "5 High-Protein Sweet Craving Swaps That Satisfy Your 9 PM Sugar Urge",
    metaTitle: "5 High-Protein Sweet Craving Swaps That Taste Like Real Candy | Cravey",
    metaDescription:
      "Struggling with late-night sugar cravings? Discover 5 chef-tested, high-protein dessert swaps that deliver the exact texture of candy bars with 20g+ protein.",
    keywords: [
      "high protein sweet snacks",
      "healthy candy swaps",
      "macro friendly dessert",
      "late night craving swap",
      "frozen snickers dates recipe",
      "protein peanut butter cups",
    ],
    category: "Craving Swaps",
    readTime: "7 min read",
    publishedAt: "2026-11-20",
    updatedAt: "2026-11-23",
    author: {
      name: "Elena Rostova",
      role: "Sports Nutritionist & Culinary Developer",
      avatar: "/app-icon.png",
    },
    summary:
      "Why fighting sugar cravings backfires, how protein and dietary fat shut down ghrelin spikes, and 5 gourmet visual swaps you can assemble in under 15 minutes.",
    coverImage: "/images/snickers-dates-card.jpg",
    recipeCard: {
      title: "Gourmet Frozen Snickers Dates",
      prepTime: "10 mins",
      cookTime: "0 mins",
      totalTime: "⏱️ Prep: 10 mins | Total: 10 mins (+ 20 mins chill)",
      calories: 215,
      protein: 14,
      carbs: 26,
      fat: 7,
      fiber: 4,
      servings: 2,
      ingredients: [
        { item: "Medjool Dates", amount: "4 large (pitted)", note: "Natural caramel base" },
        { item: "Whey or Casein Isolate (Vanilla)", amount: "20g", note: "Blended with peanut butter" },
        { item: "Natural Creamy Peanut Butter", amount: "2 tbsp (32g)", note: "100% roasted peanuts" },
        { item: "Roasted Salted Peanuts", amount: "1 tbsp (15g)", note: "For authentic crunch" },
        { item: "85% Extra Dark Chocolate", amount: "25g melted", note: "Antioxidant rich drizzle" },
        { item: "Maldon Flaky Sea Salt", amount: "1 pinch", note: "Essential flavor balancer" },
      ],
      instructions: [
        "Slice dates lengthwise along one seam and gently open them to form small hollow boats.",
        "In a small ramekin, vigorously stir creamy peanut butter with vanilla protein powder and 1 tsp almond milk until a thick caramel paste forms.",
        "Generously stuff each date boat with the protein peanut butter blend, then press 3-4 roasted whole peanuts into the center.",
        "Melt the dark chocolate in a microwave-safe bowl (30-second bursts), then drizzle or dip the dates.",
        "Sprinkle Maldon sea salt on top and freeze for 15-20 minutes until chocolate is crisp and snaps cleanly.",
      ],
      macrosRatio: { proteinPct: 26, carbsPct: 48, fatPct: 26 },
    },
    keyTakeaways: [
      "Willpower is an exhaustible cognitive resource; dietary substitution outperforms deprivation by 400% in long-term adherence.",
      "The combination of whole-food fructose (dates), casein/whey protein, and monounsaturated fats triggers cholecystokinin (CCK) release, blunting hunger signaling.",
      "Commercial candy bars pack over 30g of refined sucrose with negligible protein, creating rapid insulin spikes followed by reactive hypoglycemia.",
    ],
    sections: [
      {
        heading: "The Neurobiology of the 9 PM Sweet Tooth",
        subheading: "Why your brain screams for dopamine after a long workday",
        content:
          "It's 9:15 PM. You've hit your daily calories, eaten clean chicken and greens for dinner, yet your brain insists on opening the pantry for chocolate. This isn't lack of character—it's neurobiology. By evening, circulating cortisol drops while fatigue and decision fatigue peak. Your brain seeks an effortless surge of dopamine to signal reward and relief. Standard high-sugar candy delivers this spike rapidly, but triggers an insulin surge that crashes your blood glucose within 60 minutes, restarting the hunger loop.",
        highlightBox: {
          title: "The Satiety Formula",
          text: "Combining high biological value protein (>10g) with natural whole-food viscosity (fiber and healthy fats) sustains dopamine release while keeping blood glucose flat.",
          type: "fact",
        },
      },
      {
        heading: "Swap #1: Frozen Snickers Medjool Dates",
        subheading: "Caramel mouthfeel with +250% more protein and zero refined cane sugar",
        content:
          "Medjool dates are nature's caramel. Their high content of natural invert sugars and soluble fiber gives them the exact chewy, rich consistency of commercial nougat. When stuffed with an all-natural peanut butter and protein blend, then enrobed in dark cacao, the flavor is indistinguishable from a chilled Snickers bar—yet provides 14 grams of muscle-repairing protein per serving.",
      },
      {
        heading: "Swap #2: Greek Yogurt Peanut Butter Crisps",
        subheading: "Replacing Reese's Cups with frozen slow-release casein treats",
        content:
          "Reese's Peanut Butter Cups deliver 220 calories with only 4 grams of protein and 22 grams of sugar. Our swap blends non-fat Greek yogurt (or micellar casein) with powdered peanut flour and sea salt, topped with a crackling layer of melted dark chocolate. Because casein digests slowly over 4 to 6 hours, it suppresses nighttime muscle protein breakdown while you sleep.",
      },
      {
        heading: "Swap #3: 3-Minute Microwave High-Protein Lava Mug Cake",
        subheading: "Molten chocolate bakery experience with 34g of clean protein",
        content:
          "When you crave warm, decadent chocolate cake, combine 1 scoop chocolate whey/casein blend, 1 tbsp cocoa powder, 1/2 tsp baking powder, 1 tbsp oat flour, and 1/3 cup unsweetened almond milk. Microwave for 50 seconds. The center remains molten and gooey, providing 34g of protein for under 220 calories.",
      },
    ],
  },
  {
    slug: "science-of-late-night-cravings",
    title: "The Science of Late-Night Cravings: Blood Sugar, Dopamine, and Macro Swaps",
    metaTitle: "Why Do We Crave Sugar at Night? The Science & Solutions | Cravey",
    metaDescription:
      "Understand the physiological triggers behind late-night snacking. Learn how circadian ghrelin rhythms, sleep debt, and protein timing eliminate nighttime urges.",
    keywords: [
      "late night cravings science",
      "why do i crave sweets at night",
      "ghrelin and leptin cravings",
      "stop evening snacking",
      "high protein night snack",
      "blood sugar stabilization",
    ],
    category: "Macro Science",
    readTime: "8 min read",
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-23",
    author: {
      name: "Dr. Marcus Vance",
      role: "Metabolic Health Researcher",
      avatar: "/app-icon.png",
    },
    summary:
      "Explore the hormonal interplay between circadian rhythms, ghrelin, insulin sensitivity, and how targeted macro nutrient swaps satisfy psychological hunger.",
    coverImage: "/images/candy-snacks-cover.jpg",
    keyTakeaways: [
      "Circadian biology naturally ramps up appetite for sweet, starchy, and salty foods around 8:00 PM to 10:00 PM, an evolutionary mechanism for nocturnal fasting.",
      "Dinner low in dietary protein or fiber accelerates stomach emptying, leading to active hunger within 90 to 120 minutes of finishing dinner.",
      "Targeted slow-digesting protein snacks containing casein and magnesium promote restorative sleep without causing digestive distress.",
    ],
    sections: [
      {
        heading: "Circadian Clocks and Appetite Regulation",
        subheading: "The evolutionary mechanism that makes you hungry before bed",
        content:
          "In 2013, Harvard researchers demonstrated that the internal human circadian clock naturally peaks hunger and craving intensity in the biological evening, independent of actual caloric intake during the day. Historically, humans faced an 8 to 12-hour overnight fast in cold environments; storing energy before sleep was an evolutionary survival advantage. However, in our modern environment with 24/7 access to ultra-processed snacks, this ancient clock works against our aesthetic and metabolic goals.",
        highlightBox: {
          title: "Hormonal Rhythm Insight",
          text: "Ghrelin (the hunger hormone) exhibits an evening circadian surge, while leptin (the fullness hormone) can be desensitized by chronic stress and blue light exposure.",
          type: "fact",
        },
      },
      {
        heading: "Insulin Sensitivity Decreases at Night",
        subheading: "Why high-glycemic snacks are metabolically costlier after dark",
        content:
          "Human pancreatic beta-cells produce less insulin in response to carbohydrates ingested late in the evening compared to morning hours. Consuming 40g of refined sugars at 10 PM creates a prolonged blood sugar elevation, suppressing melatonin synthesis and disrupting REM and deep slow-wave sleep. Cravey swaps replace rapid carbohydrates with slow-burning fiber and branched-chain amino acids, preventing the glucose spike while calming the reward centers in the brain.",
      },
      {
        heading: "The 3 Pillars of an Effective Nighttime Swap",
        subheading: "Macro ratios that promote satiety without heavy digestion",
        content:
          "An ideal evening snack should meet three criteria: First, high protein density (>15g per 200 kcal) to trigger peptide YY and cholecystokinin. Second, high palatability and tactile satisfaction (crunch, creaminess, or chewiness) to satisfy the psychological desire for indulgence. Third, low glycemic impact to ensure deep, undisturbed sleep.",
      },
    ],
  },
  {
    slug: "batch-cooking-high-protein-meals",
    title: "Batch Cooking High-Protein Meals: How to Scale Ingredients and Save 5+ Hours a Week",
    metaTitle: "High-Protein Meal Prep Batching: The Complete Scaler Guide | Cravey",
    metaDescription:
      "Master the art of high-protein batch cooking. Discover which ingredients scale linearly, how to preserve texture across 5 days, and weekly prep templates.",
    keywords: [
      "batch cooking high protein",
      "meal prep ingredient scaling",
      "high protein meal prep guide",
      "prep recipes for the week",
      "portion scaling app",
      "macro meal prep",
    ],
    category: "Meal Prep",
    readTime: "6 min read",
    publishedAt: "2026-11-15",
    updatedAt: "2026-11-23",
    author: {
      name: "Chef Liam Chen",
      role: "Executive Prep Chef & Fitness Coach",
      avatar: "/app-icon.png",
    },
    summary:
      "Step-by-step techniques for scaling single-serving recipes into week-long batches without sacrificing flavor, moisture, or macro accuracy.",
    coverImage: "/images/buffalo-melt-card.jpg",
    recipeCard: {
      title: "Batch-Prepped Buffalo Chicken Sourdough Melts",
      prepTime: "12 mins",
      cookTime: "15 mins",
      totalTime: "⏱️ Prep: 12 mins | Cook: 15 mins | Total: 27 mins",
      calories: 380,
      protein: 44,
      carbs: 28,
      fat: 10,
      fiber: 4,
      servings: 4,
      ingredients: [
        { item: "Boneless Skinless Chicken Breast", amount: "650g", note: "Poached and shredded" },
        { item: "Low-Fat Whipped Cottage Cheese", amount: "200g", note: "Blended until velvety smooth" },
        { item: "Aged Cayenne Buffalo Sauce", amount: "1/3 cup (80ml)", note: "Zero sugar classic hot sauce" },
        { item: "Artisan High-Fiber Sourdough", amount: "8 thick slices", note: "Lightly toasted" },
        { item: "Reduced-Fat Mozzarella", amount: "80g shredded", note: "Melting top layer" },
        { item: "Chopped Chives & Celery Ribs", amount: "1/4 cup", note: "For authentic Buffalo crunch" },
      ],
      instructions: [
        "In a large prep bowl, combine shredded warm chicken breast, blended smooth cottage cheese, cayenne sauce, and chopped celery.",
        "Divide the mixture evenly across 4 glass meal prep containers (160g chicken mix per container).",
        "When ready to eat, spread over sourdough, top with 20g mozzarella, and toast under the oven broiler for 4 minutes until bubbling and golden.",
        "Store base chicken mixture sealed in the refrigerator for up to 5 days without loss of moisture.",
      ],
      macrosRatio: { proteinPct: 46, carbsPct: 30, fatPct: 24 },
    },
    keyTakeaways: [
      "Direct multiplication works for proteins and carbohydrates, but aromatics and salt must scale at approximately 75% to prevent overwhelming salinity in large batches.",
      "Moisture-rich sauces (blended cottage cheese, Greek yogurt, reduced stock) protect lean poultry from drying out during microwave reheating.",
      "Storing crispy elements (sourdough, seed crunches, toasted nuts) separately from bases ensures restaurant-quality texture on Day 5.",
    ],
    sections: [
      {
        heading: "The Mathematical Fallacy of Raw Ingredient Scaling",
        subheading: "Why doubling everything ruins flavor balance",
        content:
          "Most home cooks assume that scaling a recipe from 1 serving to 4 servings simply requires multiplying every single line item by four. While this holds true for macronutrient building blocks (chicken breast, egg whites, oats, protein isolate), it fails completely for salt, pungent spices, acid, and leavening agents. Surface area evaporation does not increase linearly in a Dutch oven or sheet pan, meaning liquids evaporate slower and concentrated flavors become unpalatably strong.",
        highlightBox: {
          title: "The Golden Scaling Rule",
          text: "Scale macros (proteins, grains, vegetables) at 100%. Scale sodium, strong spices (cayenne, cumin, clove), and high-heat oils at 70-80% for 4x+ batches.",
          type: "tip",
        },
      },
      {
        heading: "Protective Emulsions: The Secret to Reheated Poultry",
        subheading: "How whipped cottage cheese revolutionizes batch prep",
        content:
          "Reheated cooked chicken breast is notorious for 'warmed-over flavor'—the oxidation of polyunsaturated fatty acids during storage and microwave reheat. By coating shredded chicken in a protective emulsion of blended low-fat cottage cheese and acid (such as vinegar-based buffalo sauce or lemon zest), the protein fibers stay insulated from atmospheric oxygen, remaining succulent through Friday.",
      },
    ],
  },
  {
    slug: "convert-tiktok-recipes-macros",
    title: "How to Import Social Media Recipes into an Accurate Macro Tracker in Seconds",
    metaTitle: "Import TikTok & Instagram Recipes into Accurate Macros | Cravey",
    metaDescription:
      "Tired of guessing nutrition on viral cooking videos? Learn how Cravey parses ingredients, standardizes portion sizes, and counts macros from any reel.",
    keywords: [
      "import tiktok recipe macros",
      "instagram recipe nutrition calculator",
      "track macros from food reels",
      "viral recipe calorie counter",
      "recipe import app",
      "social recipe nutrition scanner",
    ],
    category: "Recipe Tech",
    readTime: "5 min read",
    publishedAt: "2026-11-12",
    updatedAt: "2026-11-23",
    author: {
      name: "Sophia Zhang",
      role: "Lead Software & Nutrition Technologist",
      avatar: "/app-icon.png",
    },
    summary:
      "How computer vision and natural language processing turn chaotic social media food videos into precise, macro-calculated kitchen cards.",
    coverImage: "/screenshots/01_social_import.png",
    keyTakeaways: [
      "Viral food videos on TikTok and Instagram frequently omit measurements, use ambiguous visual cues, and conceal high-calorie cooking fats.",
      "Cravey's parser cross-references USDA nutritional databases with standardized cooking loss factors (moisture loss, fat rendering) for accurate data.",
      "Turn saved bookmarks into an actionable, weekly grocery list in a single tap.",
    ],
    sections: [
      {
        heading: "The Hidden Calorie Trap of Social Media Cooking",
        subheading: "Why 'healthy' viral reels often pack 800+ unaccounted calories",
        content:
          "Social media cooking content is optimized for visual dopamine: cheese pulls, shimmering glazes, and oversized portions. Content creators frequently label recipes as 'low-calorie' or 'high-protein' without actual lab analysis. A casual drizzle of extra virgin olive oil shown for 1.5 seconds on screen often measures 3 tablespoons (360 calories and 42g of fat), instantly wrecking a user's caloric deficit.",
        highlightBox: {
          title: "Visual Measurement Gap",
          text: "Studies show visual estimations of cooking oil and nut butters underestimate actual caloric load by an average of 43% among fitness app users.",
          type: "warning",
        },
      },
      {
        heading: "How 1-Tap Social Import Solves the Problem",
        subheading: "From video URL to verified kitchen card",
        content:
          "With Cravey, users simply share a Reel or TikTok directly to the Cravey app or paste the link. The AI engine extracts the caption ingredients, identifies unstated cooking mediums from the visual frames, maps each item to USDA certified nutrition references, and outputs a clean card with exact grams, calories, and macros per serving.",
      },
    ],
  },
];
