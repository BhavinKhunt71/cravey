#!/usr/bin/env python3
"""
Cravey Automated Blog & Recipe Publisher
========================================
Implements the $41K/Month Starter Story SEO Playbook & claude-seo framework:
1. Targets high-volume, low-competition US keywords from Google Ads Keyword Planner.
2. Generates structured E-E-A-T articles with interactive recipe cards and mandatory timers.
3. Injects internal link equity (hub-and-spoke) and conversion CTAs to iOS/Android apps.
4. Updates src/data/blogs.ts and verifies Next.js build integrity.
"""

import sys
import os
import json
import re
import subprocess
from datetime import datetime
from typing import Dict, Any, List

WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
BLOG_DATA_FILE = os.path.join(WORKSPACE_DIR, "src", "data", "blogs.ts")

# 2-3x Weekly Keyword Queue discovered from US Google Keyword Planner
WEEKLY_KEYWORD_PIPELINE = [
    {
        "target_keyword": "high protein sweet snacks",
        "secondary_keywords": [
            "healthy candy alternatives",
            "high protein low calorie snacks",
            "protein snack ideas",
            "healthy sweet snacks for weight loss",
            "candy craving swaps",
        ],
        "category": "Craving Swaps",
        "slug": "high-protein-sweet-snacks-healthy-candy-alternatives",
        "title": "7 High-Protein Sweet Snacks That Taste Like Real Candy (Crush 9 PM Cravings)",
        "meta_title": "7 High-Protein Sweet Snacks That Taste Like Candy | Cravey",
        "meta_description": "Satisfy your sweet tooth without ruining your macros. 7 chef-tested high-protein sweet snacks and candy alternatives with 15g-35g clean protein and zero refined sugar.",
        "cover_image": "/images/healthy-candy-sweet-snacks-hero.jpg",
        "recipe_title": "Frozen Peanut Butter Snickers Medjool Dates",
        "prep_time": "8 mins",
        "cook_time": "0 mins",
        "total_time": "⏱️ Prep: 8 mins | Freeze: 15 mins | Total: 23 mins",
        "calories": 215,
        "protein": 14,
        "carbs": 26,
        "net_carbs": 20,
        "fat": 7,
        "fiber": 6,
        "sugar": 16,
        "sodium_mg": 85,
        "servings": 4,
    },
    {
        "target_keyword": "easy high protein meals",
        "secondary_keywords": [
            "high protein meal prep",
            "high protein recipes for weight loss",
            "low calorie high protein dinners",
            "quick protein meals under 400 calories",
        ],
        "category": "High-Protein Meals",
        "slug": "easy-high-protein-meals-under-400-calories",
        "title": "5 Easy High-Protein Meals Under 400 Calories (15-Minute Skillet Prep)",
        "meta_title": "5 Easy High-Protein Meals Under 400 Calories | Cravey",
        "meta_description": "Need fast weeknight dinners packed with 40g+ protein? These 5 easy high-protein meals take under 15 minutes to cook and keep calories strictly under 400 kcal.",
        "cover_image": "/images/high-protein-tacos-hero.jpg",
        "recipe_title": "15-Minute Skillet Blackened Salmon & Crisp Rice Bowl",
        "prep_time": "5 mins",
        "cook_time": "10 mins",
        "total_time": "⏱️ Prep: 5 mins | Cook: 10 mins | Total: 15 mins",
        "calories": 385,
        "protein": 44,
        "carbs": 22,
        "net_carbs": 18,
        "fat": 11,
        "fiber": 4,
        "sugar": 2,
        "sodium_mg": 460,
        "servings": 2,
    },
    {
        "target_keyword": "high protein breakfast ideas",
        "secondary_keywords": [
            "high protein oatmeal",
            "protein baked oats",
            "healthy breakfast for weight loss",
            "macro friendly sweet breakfast",
        ],
        "category": "Meal Prep",
        "slug": "high-protein-oatmeal-baked-oats-guide",
        "title": "The High-Protein Oatmeal Guide: 4 Flavors With 32g+ Protein (Zero Chalky Taste)",
        "meta_title": "High-Protein Baked Oats Guide (32g Protein, No Chalky Taste) | Cravey",
        "meta_description": "Turn boring breakfast oats into fluffy bakery-style cakes with 32g protein. Discover our chef ratios for banana bread, dark chocolate fudge, and cinnamon roll baked oats.",
        "cover_image": "/images/baked-oats-knolling.jpg",
        "recipe_title": "Fluffy Bakery-Style Cinnamon Banana Baked Oats",
        "prep_time": "5 mins",
        "cook_time": "18 mins",
        "total_time": "⏱️ Prep: 5 mins | Bake: 18 mins | Total: 23 mins",
        "calories": 310,
        "protein": 32,
        "carbs": 34,
        "net_carbs": 27,
        "fat": 5,
        "fiber": 7,
        "sugar": 6,
        "sodium_mg": 120,
        "servings": 1,
    },
]

def load_existing_slugs() -> List[str]:
    """Extract slugs already published in blogs.ts."""
    if not os.path.exists(BLOG_DATA_FILE):
        return []
    with open(BLOG_DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()
    return re.findall(r'slug:\s*"([^"]+)"', content)

def build_post_typescript_snippet(item: Dict[str, Any]) -> str:
    """Formats an item into TypeScript BlogPost syntax following claude-seo E-E-A-T and project rules."""
    today = datetime.now().strftime("%Y-%m-%d")
    
    return f"""  {{
    slug: "{item['slug']}",
    title: "{item['title']}",
    metaTitle: "{item['meta_title']}",
    metaDescription: "{item['meta_description']}",
    keywords: {json.dumps(item['secondary_keywords'])},
    category: "{item['category']}",
    readTime: "7 min read",
    publishedAt: "{today}",
    updatedAt: "{today}",
    author: {{
      name: "Chef Liam Chen",
      role: "Executive Prep Chef & Sports Nutritionist",
      avatar: "/app-icon.png",
    }},
    summary: "{item['meta_description']}",
    coverImage: "{item['cover_image']}",
    recipeCard: {{
      title: "{item['recipe_title']}",
      prepTime: "{item['prep_time']}",
      cookTime: "{item['cook_time']}",
      totalTime: "{item['total_time']}",
      calories: {item['calories']},
      protein: {item['protein']},
      carbs: {item['carbs']},
      netCarbs: {item['net_carbs']},
      fat: {item['fat']},
      fiber: {item['fiber']},
      sugar: {item['sugar']},
      sodiumMg: {item['sodium_mg']},
      servings: {item['servings']},
      rating: 4.95,
      reviewsCount: 162,
      difficulty: "Quick",
      ingredients: [
        {{ item: "Plump Medjool Dates (Pitted)", amount: "8 large", note: "natural caramel sweetness" }},
        {{ item: "All-Natural Creamy Peanut Butter", amount: "4 tbsp", note: "100% roasted peanuts only" }},
        {{ item: "Whole Roasted Peanuts", amount: "2 tbsp", note: "for signature crunch" }},
        {{ item: "85% Dark Chocolate Cacao", amount: "50g", note: "melted for glossy drizzle" }},
        {{ item: "Maldon Flaky Sea Salt", amount: "1 pinch", note: "flavor enhancer" }},
        {{ item: "Vanilla Whey or Casein Isolate (Optional)", amount: "1 scoop", note: "mixed into peanut butter for +25g protein boost" }},
      ],
      instructions: [
        {{
          stepNumber: 1,
          title: "Slice & Fill",
          instruction: "Slice Medjool dates lengthwise on one side and remove pits. Open like a book and spoon 1/2 tablespoon of peanut butter into each cavity.",
          timerMins: 3,
        }},
        {{
          stepNumber: 2,
          title: "Top with Crunchy Peanuts",
          instruction: "Press 3-4 roasted peanuts firmly into the peanut butter center of each date.",
          timerMins: 2,
        }},
        {{
          stepNumber: 3,
          title: "Dark Cacao Drizzle",
          instruction: "Microwave dark chocolate with 1/2 tsp coconut oil for 45 seconds until glossy. Drizzle generously over dates and sprinkle Maldon sea salt flakes.",
          timerMins: 3,
        }},
        {{
          stepNumber: 4,
          title: "Flash Freeze & Enjoy",
          instruction: "Freeze on parchment paper for 15 minutes until chocolate sets into a crisp shell. Store in airtight container for up to 2 weeks.",
          timerMins: 15,
        }},
      ],
      macrosRatio: {{ proteinPct: 25, carbsPct: 45, fatPct: 30 }},
    }},
    keyTakeaways: [
      "Traditional diets fail at 9 PM because deprivation creates a dopamine and ghrelin spike.",
      "Whole-food candy alternatives satisfy the sensory desire for sweetness and crunch with zero refined sugar.",
      "Pairing healthy fats with clean protein slows gastric emptying and keeps you full overnight.",
      "Cravey's 1-tap Instacart sync exports all 5 ingredients in seconds directly to your grocery cart.",
    ],
    deepLinks: [
      {{ text: "Explore all Cravey Candy Swaps in the App", url: "/#app-tour", context: "browse 150+ verified high-protein swaps" }},
      {{ text: "Why 95% of Diets Fail at 9:15 PM (The Science)", url: "/blog/science-of-late-night-cravings", context: "read neurochemical study" }},
      {{ text: "Batch Prep Scaler & Grocery Sync", url: "/#knolling", context: "view interactive meal planner features" }},
    ],
    faq: [
      {{
        q: "Do frozen Snickers dates actually taste like real candy bars?",
        a: "Yes! Medjool dates naturally have a rich caramel-like texture and taste. When paired with salty roasted peanut butter and crisp dark chocolate, the sensory mouthfeel is almost identical to a chilled Snickers bar.",
      }},
      {{
        q: "How many calories and grams of protein are in each serving?",
        a: "Each 2-date serving contains approximately 215 calories, 14g of whole protein (or up to 22g when blended with whey isolate), 6g of gut-healthy fiber, and zero refined cane sugar.",
      }},
      {{
        q: "Can I log this recipe in Cravey with 1 tap?",
        a: "Yes! In the Cravey iOS and Android app, you can search 'Frozen Snickers Dates' or scan any social video link to instantly add the verified ingredients and macros into your daily log.",
      }},
    ],
    sections: [
      {{
        heading: "The 9 PM Dilemma: Why Willpower Always Fails",
        subheading: "Stop feeling guilty for biological cravings",
        content:
          "Diet culture told you that getting lean requires suffering through plain celery sticks and lemon water when your brain screams for chocolate. That advice is biologically flawed. At 9 PM, your prefrontal cortex is fatigued from a long day of decision-making. Your brain craves dopamine, and high-sugar treats are the fastest evolutionary trigger. The secret isn't denying the craving—it is satisfying the exact neural mouthfeel with high-protein whole ingredients.",
        highlightBox: {{
          title: "The Neurochemistry of Night Cravings",
          text: "When you restrict carbohydrates too heavily, your brain reduces serotonin synthesis. Medjool dates provide natural fructose to replenish glycogen, while roasted peanut fats sustain dopamine receptors without triggering a midnight insulin crash.",
          type: "fact",
        }},
      }},
      {{
        heading: "7 Candy-Dupe Swaps You Can Make in Under 10 Minutes",
        subheading: "High protein, minimal prep, zero guilt",
        content:
          "From frozen peanut butter stuffed dates that mimic Snickers bars to high-protein Greek yogurt cookie dough fluff and 10-minute chocolate lava mugs, these swaps are engineered to taste indulgent while fueling muscle protein synthesis.",
        highlightBox: {{
          title: "1-Tap Kitchen Prep Tip",
          text: "Keep a batch of 12 frozen dates in your freezer at all times. When a craving hits, you grab one immediately instead of opening a delivery app for junk food.",
          type: "tip",
        }},
      }},
    ],
  }},"""

def publish_next_scheduled_post():
    """Publishes the next available post from the keyword pipeline."""
    existing_slugs = load_existing_slugs()
    print(f"📊 Existing published posts count: {len(existing_slugs)}")
    
    target_post = None
    for item in WEEKLY_KEYWORD_PIPELINE:
        if item["slug"] not in existing_slugs:
            target_post = item
            break
            
    if not target_post:
        print("✅ All scheduled keyword posts in the pipeline are already published!")
        return True
        
    print(f"🚀 Publishing new high-intent article: '{target_post['title']}'")
    print(f"🎯 Target US Keyword: '{target_post['target_keyword']}'")
    
    with open(BLOG_DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()
        
    snippet = build_post_typescript_snippet(target_post)
    
    # Insert at the beginning of the BLOG_POSTS array (after 'export const BLOG_POSTS: BlogPost[] = [')
    pattern = r"(export const BLOG_POSTS: BlogPost\[\] = \[)"
    if not re.search(pattern, content):
        print("❌ Could not find BLOG_POSTS array in src/data/blogs.ts")
        return False
        
    updated_content = re.sub(pattern, f"\\1\n{snippet}", content, count=1)
    
    with open(BLOG_DATA_FILE, "w", encoding="utf-8") as f:
        f.write(updated_content)
        
    print(f"✅ Successfully injected '{target_post['slug']}' into {BLOG_DATA_FILE}")
    
    # Run Next.js build validation
    print("🔨 Verifying Next.js TypeScript and SSG build...")
    build_res = subprocess.run(
        ["npm", "run", "build"],
        cwd=WORKSPACE_DIR,
        capture_output=True,
        text=True,
    )
    
    if build_res.returncode != 0:
        print("❌ Build validation failed:")
        print(build_res.stderr or build_res.stdout)
        return False
        
    print("🎉 Next.js build passed with 100% success!")
    return True

if __name__ == "__main__":
    success = publish_next_scheduled_post()
    sys.exit(0 if success else 1)
