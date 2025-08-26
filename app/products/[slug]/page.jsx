// app/product/[slug]/page.jsx
/*import ProductDetailsClient from "@/app/components/singleProductPage/ProductDetailsClient";
import { notFound } from "next/navigation";

async function getProduct(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailsPage({ params }) {
  const product = await getProduct(params.slug);
  if (!product) return notFound();

  return (
    <div className="min-h-screen">
      {/* Pass product as prop to client component 
      <div className=" flex justify-center items-start border-1 bg-background p-4 md:p-12">
        <ProductDetailsClient product={product} />
      </div>
    </div>
  );
}
*/
/*
 * Dynamic product detail route for Next.js
 *
 * This server component fetches a single product by slug along with a
 * handful of related products from the same category.  It then renders
 * the client component `ProductDetailsClient`, passing both the product
 * and related products as props.  This approach keeps all data fetching
 * on the server and leverages streaming for better performance.
 */

import React from "react";

import { notFound } from "next/navigation";
import ProductDetailsClient from "@/app/components/singleProductPage/ProductDetailsClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

// Fetch a single product by slug
async function fetchProduct(slug) {
  const res = await fetch(`${BASE_URL}/api/products/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

// Fetch related products from the same category.  Filters out the current
// product and returns up to three other items.
async function fetchRelatedProducts(category, excludeSlug) {
  if (!category) return [];
  const res = await fetch(
    `${BASE_URL}/api/products?category=${encodeURIComponent(category)}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    return [];
  }
  const products = await res.json();
  // Remove the current product and slice the first three
  return products.filter((p) => p.slug !== excludeSlug).slice(0, 3);
}

export default async function ProductDetailRoute({ params }) {
  const { slug } = params;
  const product = await fetchProduct(slug);
  if (!product) {
    return notFound();
  }
  const relatedProducts = await fetchRelatedProducts(product.category, slug);
  return (
    <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
  );
}
