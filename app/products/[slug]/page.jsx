/*
 * Product detail page component for Shopyor
 *
 * This component demonstrates a modern product page layout based on current
 * e‑commerce best practices.  It fetches a single product by slug from the
 * API and displays a gallery of images, price, availability, rating and
 * review count, a concise list of highlights and the full description.  The
 * purchase call‑to‑action adapts depending on whether the item is an affiliate
 * product or owned inventory.  See README for instructions on how to use this
 * component within a Next.js app; typically it would be placed at
 * `app/products/[slug]/page.jsx` so that Next’s dynamic routing can inject
 * the `slug` parameter.
 */

import React from "react";
// We avoid external icon dependencies for portability.  Rating stars are
// rendered using Unicode characters instead of FontAwesome icons.  Filled
// stars represent the integer part of the rating, and empty stars make up
// the remainder of five stars.
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

// Fetch a single product by slug from the public API
async function getProduct(slug) {
  const res = await fetch(`${BASE_URL}/api/products/${slug}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  // Retrieve the product data
  const product = await getProduct(params.slug);

  // Safety defaults in case certain fields are missing
  const images = product?.images && product.images.length > 0 ? product.images : [product.image];
  const rating = product.affiliate?.rating || 0;
  const reviewCount = product.affiliate?.reviews || 0;
  const highlights = Array.isArray(product.highlights) ? product.highlights : [];

  // Helper to render star symbols based on rating out of five.  We round
  // the value to the nearest integer and display filled (★) and empty (☆)
  // stars accordingly.
  function renderStars(value) {
    const rounded = Math.round(value);
    return Array.from({ length: 5 }).map((_, idx) => (
      <span key={idx} className="text-yellow-400 text-lg">
        {idx < rounded ? "★" : "☆"}
      </span>
    ));
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Image Gallery */}
      <div className="md:w-1/2 w-full">
        {/* Main image */}
        <div className="w-full aspect-square overflow-hidden rounded-lg shadow-md">
          <img
            src={images[0]}
            alt={product.title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        {/* Thumbnail strip when multiple images are available */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {images.map((img, idx) => (
              <div key={idx} className="aspect-square overflow-hidden rounded border">
                <img
                  src={img}
                  alt={`${product.title} ${idx + 1}`}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Product Information */}
      <div className="md:w-1/2 w-full space-y-4">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>
        <div className="flex items-center gap-3">
          {rating > 0 && renderStars(rating)}
          {reviewCount > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
            </span>
          )}
        </div>
        {/* Price and availability */}
        <div className="flex items-center gap-4">
          {product.price && (
            <span className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
              ${product.price.toFixed(2)}
            </span>
          )}
          {product.stock !== undefined && (
            <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? "In stock" : "Out of stock"}
            </span>
          )}
        </div>
        {/* Highlights list */}
        {highlights.length > 0 && (
          <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
            {highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
        {/* Full description */}
        {product.description && (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        )}
        {/* Purchase buttons */}
        <div className="mt-4">
          {product.type === "affiliate" ? (
            <a
              href={product.affiliate?.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors"
            >
              Buy on Amazon
            </a>
          ) : (
            <button
              disabled={product.stock <= 0}
              className={`px-6 py-3 rounded-md font-semibold transition-colors ${
                product.stock <= 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>
        {/* Breadcrumb navigation */}
        <nav className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:underline">Home</Link> / {" "}
          <Link href="/product" className="hover:underline">Products</Link> / {" "}
          <span className="text-gray-700 dark:text-gray-200">{product.title}</span>
        </nav>
      </div>
    </div>
  );
}