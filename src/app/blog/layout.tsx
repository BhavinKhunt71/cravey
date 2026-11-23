import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "High-Protein Recipes & Craving Swaps Hub | Cravey",
  description:
    "Explore chef-tested high-protein craving swaps, 15-minute quick meal preps, and healthy dessert dupes with exact USDA macros.",
  alternates: {
    canonical: "https://cravey-omega.vercel.app/blog",
  },
  openGraph: {
    title: "High-Protein Recipes & Craving Swaps Hub | Cravey",
    description:
      "Satisfy your sweet tooth and nighttime junk food cravings with 15-minute, high-protein whole-food visual recipes.",
    url: "https://cravey-omega.vercel.app/blog",
    siteName: "Cravey",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/healthy-candy-sweet-snacks-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Cravey High-Protein Recipes & Craving Swaps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Protein Recipes & Craving Swaps Hub | Cravey",
    description:
      "Chef-tested macro friendly craving swaps that taste like real candy and cheat meals.",
    images: ["/images/healthy-candy-sweet-snacks-hero.jpg"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cravey High-Protein Recipes & Craving Swaps Hub",
    description:
      "Collection of 15-minute high-protein visual recipes, late-night craving swaps, and healthy candy alternatives.",
    url: "https://cravey-omega.vercel.app/blog",
    publisher: {
      "@type": "Organization",
      name: "Cravey",
      url: "https://cravey-omega.vercel.app",
      logo: "https://cravey-omega.vercel.app/app-icon.png",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {children}
    </>
  );
}
