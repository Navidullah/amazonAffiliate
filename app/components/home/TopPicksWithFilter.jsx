"use client";
import { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import TopPicks from "./TopPicks";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function TopPicksWithFilter({ products }) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6; // Products per page

  function normalizeCategory(str) {
    return (str || "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  }

  // Filter logic: match by category AND search
  const filtered = products.filter((p) => {
    const matchCategory =
      category === "all" ||
      normalizeCategory(p.category) === normalizeCategory(category);

    const matchSearch =
      search.trim() === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description &&
        p.description.toLowerCase().includes(search.toLowerCase()));

    return matchCategory && matchSearch;
  });

  // Reset page when filter/search changes
  useEffect(() => setPage(1), [category, search]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Animation direction for pagination
  const [direction, setDirection] = useState(0);

  function handlePageChange(newPage) {
    setDirection(newPage > page ? 1 : -1);
    setPage(newPage);
  }

  return (
    <>
      <div className="backdrop-blur pt-2 pb-4">
        <CategoryList selected={category} onSelectCategory={setCategory} />
        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-xs md:max-w-md mx-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border bg-gray-100 focus:bg-white dark:bg-zinc-900 dark:focus:bg-zinc-800 text-sm sm:text-base"
              placeholder="Search products..."
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={page + category + search} // ensures re-animation on page/filter/search
          initial={{ opacity: 0, x: direction > 0 ? 70 : -70 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -70 : 70 }}
          transition={{ duration: 0.25, type: "tween" }}
        >
          <TopPicks products={paged} category={category} />
          {filtered.length === 0 && (
            <div className="text-center text-muted-foreground py-10 font-bold text-xl">
              No products found.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="px-3 py-1 rounded bg-zinc-800 text-white font-semibold disabled:opacity-50"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded ${
                page === idx + 1
                  ? "bg-indigo-500 text-white"
                  : "bg-zinc-800 text-white"
              } font-semibold`}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-zinc-800 text-white font-semibold disabled:opacity-50"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
