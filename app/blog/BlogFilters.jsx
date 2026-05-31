"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

/**
 * Search box + category pills. Updates the URL query string so the server
 * component re-renders with the filtered results (SEO-friendly, shareable).
 */
export default function BlogFilters({
  categories,
  currentCategory = "All",
  currentSearch = "",
}) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(currentSearch);

  const apply = ({ category = currentCategory, search = searchInput }) => {
    const params = new URLSearchParams();
    if (category && category !== "All") params.set("category", category);
    if (search) params.set("search", search);
    // page resets to 1 by omitting it
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : "/blog");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    apply({ search: searchInput });
  };

  return (
    <>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mx-auto mb-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="w-full rounded-2xl border bg-card/70 py-3.5 pl-12 pr-24 backdrop-blur-md transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Search
          </button>
        </div>
      </form>

      {/* Categories */}
      <div className="mb-10 flex flex-nowrap justify-start gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => apply({ category })}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              currentCategory === category
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
}
