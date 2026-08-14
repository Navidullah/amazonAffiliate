"use client";

import { useMemo, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { REGIONS, getCategoriesForRegion, getCategoryLabel } from "@/lib/constants/productCategories";
import ProductCard from "@/app/components/store/ProductCard";

function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
        active
          ? "bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white shadow-md"
          : "border border-gray-200/70 bg-white/70 text-gray-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:text-indigo-300"
      }`}
    >
      {children}
    </button>
  );
}

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
      <div className="flex flex-wrap items-center gap-2">
        <FilterPill active={region === "all"} onClick={() => { setRegion("all"); setCategory("all"); }}>
          All regions
        </FilterPill>
        {REGIONS.map((r) => (
          <FilterPill
            key={r.value}
            active={region === r.value}
            onClick={() => { setRegion(r.value); setCategory("all"); }}
          >
            {r.label}
          </FilterPill>
        ))}
      </div>

      {categoryOptions.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <FilterPill active={category === "all"} onClick={() => setCategory("all")}>
            All categories
          </FilterPill>
          {categoryOptions.map((c) => (
            <FilterPill key={c.value} active={category === c.value} onClick={() => setCategory(c.value)}>
              {getCategoryLabel(c.value)}
            </FilterPill>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Showing {filtered.length} of {products.length} {products.length === 1 ? "pack" : "packs"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-gray-300/70 py-16 text-center dark:border-white/10">
          <LayoutGrid className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            No worksheets match those filters yet — check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
