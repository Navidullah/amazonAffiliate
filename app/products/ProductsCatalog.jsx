"use client";

import { useMemo, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { CONTENT_TYPES } from "@/lib/constants/productCategories";
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

const BOARDS = [
  { value: "gcse-maths", label: "GCSE" },
  { value: "igcse-maths", label: "IGCSE" },
  { value: "ib-aahl-maths", label: "IB" },
  { value: "ks2-maths", label: "KS2" },
];

export default function ProductsCatalog({ products }) {
  const [board, setBoard] = useState("all");
  const [contentType, setContentType] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (board !== "all" && p.category !== board) return false;
      if (contentType !== "all" && p.contentType !== contentType) return false;
      if (q && !`${p.title} ${p.description || ""}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [products, board, contentType, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search e.g. 0580 Paper 2, AA HL, fractions"
        aria-label="Search solutions and worksheets"
        className="w-full max-w-md rounded-full border border-gray-200/70 bg-white/70 px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
      />

      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by board">
        <FilterPill active={board === "all"} onClick={() => setBoard("all")}>
          All boards
        </FilterPill>
        {BOARDS.map((b) => (
          <FilterPill key={b.value} active={board === b.value} onClick={() => setBoard(b.value)}>
            {b.label}
          </FilterPill>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
        <FilterPill active={contentType === "all"} onClick={() => setContentType("all")}>
          All types
        </FilterPill>
        {CONTENT_TYPES.map((t) => (
          <FilterPill key={t.value} active={contentType === t.value} onClick={() => setContentType(t.value)}>
            {t.label}
          </FilterPill>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Showing {filtered.length} of {products.length} {products.length === 1 ? "pack" : "packs"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-gray-300/70 py-16 text-center dark:border-white/10">
          <LayoutGrid className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Nothing matches those filters yet — check back soon.
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
