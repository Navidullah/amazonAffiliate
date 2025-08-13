// app/product/page.jsx
import React from "react";
import HomeHero from "../components/home/HomeHero";
import TopPicksWithFilter from "../components/home/TopPicksWithFilter";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

// ---- Per-page SEO (title uses your layout template) ----
// ---- Per-page SEO ----
export const metadata = {
  title: "Products", // becomes: Products | Shopyor — Expert Health & Fitness…
  description:
    "Shop Shopyor’s curated health & fitness gear: evidence-backed supplements, recovery tools, and workout essentials—paired with honest reviews and guides.",
  alternates: { canonical: "/product" },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/product`,
    title: "Products",
    description:
      "Curated health & fitness products from Shopyor—tested gear and tools that complement our research-backed guides.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products",
    description:
      "Curated health & fitness products from Shopyor—tested gear and tools that complement our research-backed guides.",
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
