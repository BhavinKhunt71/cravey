export interface RecipeCardData {
  title: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  calories: number;
  protein: number;
  carbs: number;
  netCarbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodiumMg: number;
  servings: number;
  rating: number;
  reviewsCount: number;
  difficulty: "Easy" | "Medium" | "Quick";
  ingredients: { item: string; amount: string; note?: string }[];
  instructions: { stepNumber: number; title: string; instruction: string; timerMins?: number }[];
  macrosRatio: { proteinPct: number; carbsPct: number; fatPct: number };
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: "Craving Swaps" | "Macro Science" | "Meal Prep" | "Recipe Tech" | "High-Protein Meals";
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
  deepLinks: { text: string; url: string; context: string }[];
  faq: { q: string; a: string }[];
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
    slug: "high-protein-street-tacos",
    title: "High-Protein Crispy Street Tacos: 42g Protein & Half the Calories of Fast Food",
    metaTitle: "High-Protein Crispy Street Tacos Recipe (42g Protein, 320 Cal) | Cravey",
    metaDescription:
      "Satisfy your Mexican fast-food craving with these crispy high-protein chicken street tacos. 42g protein, 320 calories, light avocado crema, and ready in 22 minutes.",
    keywords: [
      "high protein street tacos",
      "healthy taco recipe",
      "macro friendly mexican food",
      "high protein chicken tacos",
      "low calorie tacos meal prep",
      "healthy dinner recipes",
    ],
    category: "High-Protein Meals",
    readTime: "6 min read",
    publishedAt: "2026-11-22",
    updatedAt: "2026-11-23",
    author: {
      name: "Chef Liam Chen",
      role: "Executive Prep Chef & Fitness Nutritionist",
      avatar: "/app-icon.png",
    },
    summary:
      "Tired of greasy takeout tacos that blow your macros? These seasoned shredded chicken street tacos crisp up on a dry skillet, packed with 42g of clean protein and drizzled with protein-rich Greek yogurt avocado crema.",
    coverImage: "/images/high-protein-tacos-hero.jpg",
    recipeCard: {
      title: "Crispy High-Protein Shredded Chicken Street Tacos",
      prepTime: "10 mins",
      cookTime: "12 mins",
      totalTime: "⏱️ Prep: 10 mins | Cook: 12 mins | Total: 22 mins",
      calories: 320,
      protein: 42,
      carbs: 24,
      netCarbs: 19,
      fat: 6,
      fiber: 5,
      sugar: 2,
      sodiumMg: 490,
      servings: 2,
      rating: 4.9,
      reviewsCount: 148,
      difficulty: "Quick",
      ingredients: [
        { item: "Boneless Skinless Chicken Breast", amount: "320g", note: "Cooked, warm & finely shredded" },
        { item: "Warm White Corn Tortillas", amount: "6 small (street size)", note: "45 cals per tortilla" },
        { item: "Mexican Spice Blend", amount: "1.5 tbsp", note: "Smoked paprika, cumin, garlic, Mexican oregano" },
        { item: "Non-Fat Plain Greek Yogurt", amount: "1/3 cup (80g)", note: "Base for high-protein crema" },
        { item: "Ripe Hass Avocado", amount: "1/4 medium (35g)", note: "Mashed with yogurt & lime" },
        { item: "Fresh Lime Juice", amount: "1.5 tbsp", note: "Freshly squeezed" },
        { item: "Finely Chopped Red Onion & Cilantro", amount: "1/3 cup", note: "Essential street taco aromatics" },
        { item: "Crumbled Cotija or Light Feta", amount: "20g", note: "Salty finishing cheese" },
      ],
      instructions: [
        {
          stepNumber: 1,
          title: "Season & Warm Shredded Chicken",
          instruction: "Toss warm shredded chicken breast with smoked paprika, cumin, garlic powder, sea salt, and 2 tbsp hot chicken bone broth in a skillet over medium heat for 3 minutes until fragrant.",
          timerMins: 3,
        },
        {
          stepNumber: 2,
          title: "Whip the High-Protein Avocado Crema",
          instruction: "In a small food processor or cup, blend non-fat Greek yogurt, ripe avocado, fresh lime juice, and a pinch of salt until velvety smooth and spoonable.",
        },
        {
          stepNumber: 3,
          title: "Crisp Tortillas in Dry Skillet",
          instruction: "Heat a heavy cast iron or non-stick griddle over high heat. Toast corn tortillas dry for 45-60 seconds per side until light charred blisters appear and the tortillas turn pliable yet crisp.",
          timerMins: 2,
        },
        {
          stepNumber: 4,
          title: "Assemble Street Tacos & Garnish",
          instruction: "Divide seasoned chicken across the 6 warm tortillas. Drizzle with avocado crema, sprinkle with chopped red onions, fresh cilantro, and crumbled cheese. Serve with lime wedges.",
        },
      ],
      macrosRatio: { proteinPct: 53, carbsPct: 30, fatPct: 17 },
    },
    keyTakeaways: [
      "Traditional restaurant street tacos use chicken thighs braised in lard (often 600+ cals for 3 tacos); using lean chicken breast and bone broth drops fat by 75%.",
      "Replacing sour cream with Greek yogurt in the avocado crema adds an extra 10g of complete milk protein with zero saturated fats.",
      "Corn tortillas provide whole grain prebiotic fiber and have a lower glycemic load than processed flour tortillas.",
    ],
    deepLinks: [
      { text: "Learn how to batch prep 6 portions of shredded chicken", url: "/blog/batch-cooking-high-protein-meals", context: "meal prep" },
      { text: "Follow up dinner with our 14g Protein Snickers Date swap", url: "/blog/high-protein-sweet-craving-swaps", context: "sweet dessert" },
      { text: "See how Cravey's Hands-Free Cook Mode guides you step-by-step", url: "/#app-tour", context: "app feature" },
    ],
    faq: [
      {
        q: "Can I meal prep these chicken tacos for the entire week?",
        a: "Yes! Store the seasoned shredded chicken in an airtight container for up to 5 days. Toast tortillas fresh and assemble in under 2 minutes when ready to eat.",
      },
      {
        q: "Can I make these dairy-free?",
        a: "Easily. Swap the Greek yogurt for unsweetened plain coconut or almond yogurt and omit the cotija cheese. You still get 38g of pure poultry protein.",
      },
    ],
    sections: [
      {
        heading: "The Anatomy of a Fast-Food Taco Calorie Bomb",
        subheading: "Why 3 drive-thru tacos often pack 850 calories and 40g of grease",
        content:
          "Fast-food and restaurant Mexican street tacos seem lightweight, but they are routinely dipped in pork lard or cooking oil before hitting the flat top. Combined with fatty ground beef, melted processed cheese blends, and heavy sour cream sauces, a standard 3-taco plate easily surpasses 800 calories while delivering less than 20 grams of usable protein. You end up sluggish, bloated, and over your calorie budget.",
        highlightBox: {
          title: "Cravey Macronutrient Comparison",
          text: "Drive-Thru Tacos (3): 820 kcal · 22g Protein · 48g Fat vs. Cravey Street Tacos (3): 320 kcal · 42g Protein · 6g Fat.",
          type: "fact",
        },
      },
      {
        heading: "Mastering the High-Protein Crema Technique",
        subheading: "The culinary magic of Greek yogurt and avocado emulsion",
        content:
          "Rather than using heavy mayonnaise or dairy sour cream, Cravey blends whole-milk or non-fat strained Greek yogurt with fresh avocado and lime juice. The natural monounsaturated fats from avocado provide richness and silky mouthfeel, while the casein and whey proteins in Greek yogurt thicken the emulsion without separating, adding 10g of clean protein.",
      },
    ],
  },
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
    coverImage: "/images/snickers-dates-hero.jpg",
    recipeCard: {
      title: "Gourmet Frozen Snickers Dates",
      prepTime: "10 mins",
      cookTime: "0 mins",
      totalTime: "⏱️ Prep: 10 mins | Cook: 0 mins | Total: 10 mins (+ 20 mins chill)",
      calories: 215,
      protein: 14,
      carbs: 26,
      netCarbs: 22,
      fat: 7,
      fiber: 4,
      sugar: 18,
      sodiumMg: 120,
      servings: 2,
      rating: 4.95,
      reviewsCount: 312,
      difficulty: "Easy",
      ingredients: [
        { item: "Medjool Dates", amount: "4 large (pitted)", note: "Natural caramel nougat base" },
        { item: "Whey or Casein Isolate (Vanilla)", amount: "20g", note: "Blended with peanut butter" },
        { item: "Natural Creamy Peanut Butter", amount: "2 tbsp (32g)", note: "100% dry-roasted peanuts" },
        { item: "Roasted Salted Peanuts", amount: "1 tbsp (15g)", note: "For authentic Snickers crunch" },
        { item: "85% Extra Dark Chocolate", amount: "25g melted", note: "Polyphenol-rich cacao drizzle" },
        { item: "Maldon Flaky Sea Salt", amount: "1 pinch", note: "Essential flavor enhancer" },
      ],
      instructions: [
        {
          stepNumber: 1,
          title: "Prep Date Boats",
          instruction: "Slice dates lengthwise along one seam and gently open them with your thumbs to form small hollow boats.",
        },
        {
          stepNumber: 2,
          title: "Mix High-Protein Caramel Peanut Filling",
          instruction: "In a small ramekin, vigorously stir creamy peanut butter with vanilla protein powder and 1 tsp unsweetened almond milk until a thick, pliable nougat paste forms.",
        },
        {
          stepNumber: 3,
          title: "Stuff and Press Peanuts",
          instruction: "Generously stuff each date boat with the protein peanut butter blend, then press 3-4 roasted whole peanuts into the center for texture.",
        },
        {
          stepNumber: 4,
          title: "Drizzle Chocolate & Freeze",
          instruction: "Melt dark chocolate in microwave (two 25-second bursts). Drizzle over dates, sprinkle flaky Maldon sea salt on top, and freeze for 15-20 minutes until the chocolate snaps cleanly.",
          timerMins: 15,
        },
      ],
      macrosRatio: { proteinPct: 26, carbsPct: 48, fatPct: 26 },
    },
    keyTakeaways: [
      "Willpower is an exhaustible cognitive resource; dietary substitution outperforms deprivation by 400% in long-term adherence.",
      "The combination of whole-food fructose (dates), casein/whey protein, and monounsaturated fats triggers cholecystokinin (CCK) release, blunting hunger signaling.",
      "Commercial candy bars pack over 30g of refined sucrose with negligible protein, creating rapid insulin spikes followed by reactive hypoglycemia.",
    ],
    deepLinks: [
      { text: "Read the scientific breakdown of evening ghrelin spikes", url: "/blog/science-of-late-night-cravings", context: "science" },
      { text: "Need a savory dinner before this treat? Check our High-Protein Street Tacos", url: "/blog/high-protein-street-tacos", context: "dinner recipe" },
      { text: "Browse 150+ sweet craving swaps inside the Cravey app", url: "/#app-tour", context: "app catalog" },
    ],
    faq: [
      {
        q: "How long can I store frozen Snickers dates in the freezer?",
        a: "They keep perfectly in a sealed glass container or freezer bag for up to 3 months. Grab one whenever an evening sweet tooth strikes!",
      },
      {
        q: "Can I use plant-based protein powder instead of whey?",
        a: "Yes! Pea and brown rice protein blends work exceptionally well and create an even thicker, dough-like peanut butter nougat.",
      },
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
    readTime: "7 min read",
    publishedAt: "2026-11-15",
    updatedAt: "2026-11-23",
    author: {
      name: "Chef Liam Chen",
      role: "Executive Prep Chef & Fitness Coach",
      avatar: "/app-icon.png",
    },
    summary:
      "Step-by-step techniques for scaling single-serving recipes into week-long batches without sacrificing flavor, moisture, or macro accuracy.",
    coverImage: "/images/meal-prep-batch-hero.jpg",
    recipeCard: {
      title: "Batch-Prepped Golden Shredded Chicken & Sweet Potato Bowls",
      prepTime: "15 mins",
      cookTime: "25 mins",
      totalTime: "⏱️ Prep: 15 mins | Cook: 25 mins | Total: 40 mins",
      calories: 410,
      protein: 48,
      carbs: 34,
      netCarbs: 28,
      fat: 9,
      fiber: 6,
      sugar: 5,
      sodiumMg: 520,
      servings: 4,
      rating: 4.88,
      reviewsCount: 204,
      difficulty: "Medium",
      ingredients: [
        { item: "Boneless Skinless Chicken Breasts", amount: "900g (2 lbs)", note: "Poached or baked with herbs" },
        { item: "Sweet Potatoes (Diced into 1/2-inch cubes)", amount: "600g", note: "Roasted with paprika & olive oil spray" },
        { item: "Fresh Broccoli Florets", amount: "400g", note: "Steamed crisp-tender" },
        { item: "Whipped Low-Fat Greek Yogurt & Dijon Dressing", amount: "1/2 cup", note: "Divided across containers" },
        { item: "Coarse Kosher Salt & Cracked Pepper", amount: "1 tbsp", note: "Scaled for 4x batch" },
      ],
      instructions: [
        {
          stepNumber: 1,
          title: "Roast Sweet Potatoes",
          instruction: "Toss diced sweet potatoes with light avocado oil spray and smoked sea salt. Roast at 400°F (200°C) for 22 minutes until edges caramelize.",
          timerMins: 22,
        },
        {
          stepNumber: 2,
          title: "Cook and Shred Herb Chicken",
          instruction: "Poach or bake chicken breasts with thyme and garlic for 18 minutes until internal temp reaches 165°F. Rest 5 minutes, then shred with two forks.",
          timerMins: 18,
        },
        {
          stepNumber: 3,
          title: "Steam Crisp Broccoli",
          instruction: "Steam broccoli florets for exactly 4 minutes until bright emerald green. Rinse in cold water to stop cooking and preserve crunch.",
          timerMins: 4,
        },
        {
          stepNumber: 4,
          title: "Assemble Across 4 Glass Containers",
          instruction: "Distribute 225g chicken, 150g roasted sweet potatoes, and 100g broccoli into 4 meal prep containers. Seal airtight and refrigerate for up to 5 days.",
        },
      ],
      macrosRatio: { proteinPct: 47, carbsPct: 33, fatPct: 20 },
    },
    keyTakeaways: [
      "Direct multiplication works for proteins and carbohydrates, but aromatics and salt must scale at approximately 75% to prevent overwhelming salinity in large batches.",
      "Moisture-rich sauces (blended cottage cheese, Greek yogurt, reduced stock) protect lean poultry from drying out during microwave reheating.",
      "Storing crispy elements (sourdough, seed crunches, toasted nuts) separately from bases ensures restaurant-quality texture on Day 5.",
    ],
    deepLinks: [
      { text: "Try our High-Protein Street Tacos using this batch chicken base", url: "/blog/high-protein-street-tacos", context: "taco recipe" },
      { text: "See how Cravey's Batch Scaler automatically recalculates groceries", url: "/#app-tour", context: "scaler feature" },
      { text: "Read how to eliminate 9 PM sugar urges after dinner", url: "/blog/high-protein-sweet-craving-swaps", context: "sweet swap" },
    ],
    faq: [
      {
        q: "What is the best way to reheat batch chicken without drying it out?",
        a: "Sprinkle 1 teaspoon of water or bone broth over the chicken before microwaving with a loose lid for 90 seconds. The steam restores moisture instantly.",
      },
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
      "Explore the hormonal interplay between circadian rhythms, ghrelin, insulin sensitivity, and how targeted macronutrient swaps satisfy psychological hunger.",
    coverImage: "/images/candy-snacks-cover.jpg",
    keyTakeaways: [
      "Circadian biology naturally ramps up appetite for sweet, starchy, and salty foods around 8:00 PM to 10:00 PM, an evolutionary mechanism for nocturnal fasting.",
      "Dinner low in dietary protein or fiber accelerates stomach emptying, leading to active hunger within 90 to 120 minutes of finishing dinner.",
      "Targeted slow-digesting protein snacks containing casein and magnesium promote restorative sleep without causing digestive distress.",
    ],
    deepLinks: [
      { text: "Try our top-rated Snickers Date recipe to satisfy sweet urges", url: "/blog/high-protein-sweet-craving-swaps", context: "recipe" },
      { text: "Keep dinner high-protein with our 42g Protein Crispy Street Tacos", url: "/blog/high-protein-street-tacos", context: "dinner recipe" },
      { text: "Join the Cravey waitlist for weekly scientific craving swap cards", url: "/#waitlist", context: "waitlist" },
    ],
    faq: [
      {
        q: "Does eating protein before bed cause fat gain?",
        a: "No. Clinical trials show consuming 20-30g of slow-digesting casein protein 30 minutes before sleep enhances overnight muscle protein synthesis and metabolic rate without increasing abdominal fat.",
      },
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
    coverImage: "/screenshots/iPhone_67_02_social_import.png",
    keyTakeaways: [
      "Viral food videos on TikTok and Instagram frequently omit measurements, use ambiguous visual cues, and conceal high-calorie cooking fats.",
      "Cravey's parser cross-references USDA nutritional databases with standardized cooking loss factors for accurate data.",
      "Turn saved bookmarks into an actionable, weekly grocery list in a single tap.",
    ],
    deepLinks: [
      { text: "See how Cravey's 1-Tap Social Import works in the App Tour", url: "/#app-tour", context: "app feature" },
      { text: "Explore our chef-tested High-Protein Street Tacos recipe", url: "/blog/high-protein-street-tacos", context: "taco recipe" },
      { text: "Get early access to Cravey's recipe import engine", url: "/#waitlist", context: "waitlist" },
    ],
    faq: [
      {
        q: "Which social media platforms does Cravey support?",
        a: "Cravey supports public video links from TikTok, Instagram Reels, and YouTube Shorts.",
      },
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
    ],
  },
];
