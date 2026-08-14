"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { REGIONS, getCategoriesForRegion, getCategoryLabel } from "@/lib/constants/productCategories";

export default function ProductsCatalog({ products }) {
  const [region, setRegion] = useState("all");
  const [category, setCategory] = useState("all");

  const categoryOptions = region === "all" ? [] : getCategoriesForRegion(region);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (region !== "all" && p.region !== region) return false;
      if (category !== "all" && p.category !== category) return false;
      return true;
    });
  }, [products, region, category]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setCategory("all");
          }}
          className="rounded-full border border-gray-200/70 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-200"
        >
          <option value="all">All regions</option>
          {REGIONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={region === "all"}
          className="rounded-full border border-gray-200/70 bg-white/70 px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-200"
        >
          <option value="all">All categories</option>
          {categoryOptions.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          No worksheets match those filters yet — check back soon.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_24px_64px_-30px_rgba(56,89,255,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                {getCategoryLabel(p.category)} · {p.gradeLevel}
              </span>
              <h2 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                {p.title}
              </h2>
              <p className="mt-2 flex-1 text-sm text-gray-600 dark:text-gray-400">
                {p.description}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-300">
                  ${p.price}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 group-hover:text-indigo-600 dark:text-gray-300 dark:group-hover:text-indigo-300">
                  View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
