import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface WaitlistEntry {
  id: string;
  email: string;
  craving?: string;
  referralCode: string;
  referredBy?: string;
  position: number;
  referralCount: number;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "waitlist.json");
const BASE_QUEUE_OFFSET = 1428;

function getWaitlist(): WaitlistEntry[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading waitlist:", error);
    return [];
  }
}

function saveWaitlist(entries: WaitlistEntry[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing waitlist:", error);
  }
}

function generateRefCode(): string {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `crave-${result}`;
}

export async function GET() {
  const entries = getWaitlist();
  const totalCount = BASE_QUEUE_OFFSET + entries.length;
  return NextResponse.json({
    success: true,
    totalCount,
    recentCount: entries.length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = (body.email || "").trim().toLowerCase();
    const craving = (body.craving || "").trim();
    const ref = (body.ref || "").trim();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const entries = getWaitlist();

    // Check if user is already on waitlist
    const existingIndex = entries.findIndex((e) => e.email === email);
    if (existingIndex !== -1) {
      const existing = entries[existingIndex];
      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        position: existing.position,
        referralCode: existing.referralCode,
        referralLink: `https://cravey.app?ref=${existing.referralCode}`,
        referralCount: existing.referralCount || 0,
        totalCount: BASE_QUEUE_OFFSET + entries.length,
      });
    }

    // New entry
    const newPosition = BASE_QUEUE_OFFSET + entries.length + 1;
    const refCode = generateRefCode();

    // Attribute referral if valid
    if (ref) {
      const referrer = entries.find((e) => e.referralCode.toLowerCase() === ref.toLowerCase());
      if (referrer) {
        referrer.referralCount = (referrer.referralCount || 0) + 1;
        // Bump referrer up 25 spots for each referral
        referrer.position = Math.max(1, referrer.position - 25);
      }
    }

    const newEntry: WaitlistEntry = {
      id: "usr_" + Date.now().toString(36),
      email,
      craving: craving || undefined,
      referralCode: refCode,
      referredBy: ref || undefined,
      position: newPosition,
      referralCount: 0,
      createdAt: new Date().toISOString(),
    };

    entries.push(newEntry);
    saveWaitlist(entries);

    return NextResponse.json({
      success: true,
      alreadyRegistered: false,
      position: newPosition,
      referralCode: refCode,
      referralLink: `https://cravey.app?ref=${refCode}`,
      referralCount: 0,
      totalCount: BASE_QUEUE_OFFSET + entries.length,
    });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to join waitlist. Please try again." },
      { status: 500 }
    );
  }
}
