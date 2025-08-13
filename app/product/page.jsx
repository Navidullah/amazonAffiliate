// app/product/page.jsx
import React from "react";
import HomeHero from "../components/home/HomeHero";
import TopPicksWithFilter from "../components/home/TopPicksWithFilter";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

// ---- Per-page SEO (title uses your layout template) ----
export const metadata = {
  title: "Products", // -> "Products | Shopyor – Health & Fitness"
  description:
    "Explore curated health & fitness products, tools, and gear recommended by Shopyor.",
  alternates: { canonical: "/product" }, // change to "/products" if that's your URL
  openGraph: {
    type: "website",
    url: `${BASE_URL}/product`,
    title: "Products",
    description:
      "Explore curated health & fitness products, tools, and gear recommended by Shopyor.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products",
    description:
      "Explore curated health & fitness products, tools, and gear recommended by Shopyor.",
  },
};

async function getTopProducts() {
  const res = await fetch(`${BASE_URL}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProductPage() {
  const topPicks = await getTopProducts();

  // JSON-LD
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Products",
    url: `${BASE_URL}/product`,
    description:
      "Explore curated health & fitness products, tools, and gear recommended by Shopyor.",
    isPartOf: { "@type": "WebSite", name: "Shopyor", url: BASE_URL },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${BASE_URL}/product`,
      },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: (topPicks || []).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${BASE_URL}/products/${p.slug || p._id}`, // adjust if your product route differs
      name: p.title || p.name,
    })),
  };

  return (
    <div>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <HomeHero />
      <TopPicksWithFilter products={topPicks} />
    </div>
  );
}
