import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cravey.app"),
  title: "Cravey — Satisfy Sweet Cravings Without Breaking Your Macros",
  description:
    "Cravey turns late-night junk food and sweet cravings into 15-minute, high-protein visual recipes. Top-down knolled ingredients, exact macros, zero guilt.",
  keywords: [
    "healthy recipes",
    "craving swap",
    "high protein snacks",
    "macro friendly desserts",
    "taste like candy",
    "visual recipes",
    "meal prep",
  ],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Cravey — High-Protein Craving Swaps",
    description: "Satisfy your 9 PM cravings without breaking your macros.",
    url: "https://cravey.app",
    siteName: "Cravey",
    images: [
      {
        url: "/images/snickers-dates-card.jpg",
        width: 1080,
        height: 1920,
        alt: "Cravey Visual Recipe Card",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cravey — High-Protein Craving Swaps",
    description: "Satisfy your 9 PM cravings without breaking your macros.",
    images: ["/images/snickers-dates-card.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0F1012] selection:bg-[#FFE3D6] selection:text-[#C4380A]">
        {children}
      </body>
    </html>
  );
}
