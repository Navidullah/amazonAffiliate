"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getCategoryLabel, getRegionLabel } from "@/lib/constants/productCategories";

/**
 * Shared product card for the homepage grid, the /products catalog, and
 * related-products blocks. Renders the real generated preview image
 * (/api/product-image/[slug]) instead of a generic icon.
 */
export default function ProductCard({ product, className = "" }) {
  return (
    <Link
      href={product.href || `/products/${product.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_24px_64px_-30px_rgba(56,89,255,0.5)] dark:border-white/10 dark:bg-white/[0.03] ${className}`}
    >
      <div className="relative aspect-[1200/630] w-full shrink-0 overflow-hidden bg-gradient-to-br from-indigo-500 to-fuchsia-500">
        {product.previewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.previewImage}
            alt={`Preview of ${product.title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="h-10 w-10 text-white/90" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {(product.region || product.category) && (
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
            {product.region ? getRegionLabel(product.region) : null}
            {product.region && product.category ? " · " : null}
            {product.category ? getCategoryLabel(product.category) : null}
            {product.gradeLevel ? ` · ${product.gradeLevel}` : null}
          </span>
        )}
        <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
          {product.title}
        </h2>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-300">
            ${product.price}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 group-hover:text-indigo-600 dark:text-gray-300 dark:group-hover:text-indigo-300">
            View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
