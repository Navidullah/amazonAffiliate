import React from "react";
import HomeHero from "../components/home/HomeHero";
import TopPicksWithFilter from "../components/home/TopPicksWithFilter";

async function getTopProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const products = await res.json();
  return products;
}

export default async function ProductPage() {
  const topPicks = await getTopProducts();
  return (
    <div>
      <HomeHero />

      <TopPicksWithFilter products={topPicks} />
    </div>
  );
}
