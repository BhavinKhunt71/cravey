# CRAVEY — Brand Direction & System Architecture

## 1. The Brief (Self-Authored)
- **What is Cravey?**
  Cravey is the guilt-free craving-swap app. It turns late-night junk food impulses and high-calorie desserts into high-protein, clean-fuel visual recipes in seconds.
- **Who is it for?**
  Health-conscious individuals, fitness enthusiasts, gym-goers, and sweet-tooth cravers who want to hit their macros without giving up candy, cookies, burgers, or dessert.
- **The Core Action:**
  When a craving hits (e.g. 9 PM sweet tooth), open Cravey, select or search the craving (e.g. *Snickers Bar, Reese's Cup, Buffalo Burger, Cinnamon Roll*), and immediately get an exact, macro-balanced swap with top-down knolled ingredients, step-by-step prep cards, and one-tap grocery export.
- **Three Words for the Feel:**
  *Appetizing*, *Pristine*, *Effortless*.
- **References from outside apps:**
  - *Kinfolk / Cereal Magazine* (crisp editorial whitespace, generous type hierarchy, zero visual clutter).
  - *Apple Health & Fitness* (fluid, high-contrast, tactile UI with purposeful accents).
  - *Leica / Dieter Rams Braun* (pure functional geometry, every line has purpose).

---

## 2. Refused Category Clichés & Defaults
- **Refused Cliché 1: The Dark Gym-Bro Lime Palette:** We refuse near-black backgrounds with neon lime `#D4F45A` or electric cyan. Cravey is food, wellness, and culinary delight, not a creatine tub.
- **Refused Cliché 2: The Generic AI Purple Glow:** We refuse indigo/purple gradients, blurred radial backdrop blobs, and AI sparkle icons.
- **Refused Cliché 3: The Card-Stack Slop:** No cards inside cards inside cards with uniform 16px margins. We use architectural whitespace, subtle hairlines (`#EAEAE6`), and intentional focal depth.
- **Refused Cliché 4: The Generic Greeting:** No "Good morning, User 👋". The product focuses immediately on the action: *What are you craving right now?*

---

## 3. Design Tokens
- **Ground / Background:** 
  - Primary: `#FFFFFF` (Pure Crisp White)
  - Secondary: `#F9F9F8` (Warm Porcelain / Bone Linen)
  - Surface Glass: `rgba(255, 255, 255, 0.85)` with `backdrop-filter: blur(20px)`
- **Ink / Typography:**
  - Display & Headings: `#0F1012` (Deep Obsidian Ink)
  - Secondary Text: `#52525B` (Muted Zinc)
  - Subtle / Captions: `#8C8C94` (Neutral Titanium)
- **Primary Accent Hue:**
  - `#E25822` / `#F05A28` (Roasted Persimmon / Flame Crave) — appetizing, warm, energetic, and distinct on crisp white.
  - Success Green: `#16A34A` (Clean Emerald)
- **Borders & Dividers:**
  - Hairline: `rgba(15, 16, 18, 0.08)` or `#E8E8E4`
- **Typography System:**
  - Display: `Inter` / `SF Pro Display`, tracking `-0.035em`, weights `600` and `700`.
  - Body: `Inter` / `SF Pro Text`, tracking `-0.01em`, weight `400` and `500`.
- **Border Radius:**
  - Badges: `9999px` (Full Pill)
  - Cards & Containers: `20px` to `24px` (Apple Squircle curve)
  - Buttons: `14px`

---

## 4. The Signature Interaction
**The Craving Morph Slider:**
A user taps a craving pill (e.g. *"Craving a Snickers Bar · 280 kcal · 32g Sugar"*). In a fluid spring animation, the card flips into the swap: *"Frozen Snickers Dates · 215 kcal · 14g Protein · 100% Whole Food"*, dynamically recalculating macros, dropping in the knolled ingredients sheet, and revealing the one-tap grocery export button.

---

## 5. Waitlist Conversion Engine Architecture
1. **Hero with High-Conversion Value Proposition**: Instant emotional hook + social proof badge.
2. **Interactive Craving-Swap Playground**: Visitors test the core product before the app is even downloaded.
3. **Waitlist Capture Form**:
   - Zero-friction email entry.
   - Real API endpoint (`/api/waitlist`) storing verified submissions.
   - Live queue positioning: *"You are #1,428 in line!"*
   - Viral viral referral mechanics: *"Share your unique link to jump 50 spots ahead."*
4. **Visual Knolling Gallery**: Demonstrates real top-down ingredient photography.
5. **Macro Comparison Matrix**: Junk food vs. Cravey swap breakdown.
6. **FAQ & Minimalist Footer**: Trust signals and contact access.
