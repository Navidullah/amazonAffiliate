"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, LayoutGrid } from "lucide-react";
import BookCard from "@/app/components/store/BookCard";
import { BOOK_CURRICULA } from "@/lib/constants/bookCurricula";

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

export default function BooksCatalog({ initialBooks, lockedCurriculum }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);
  const [curriculum, setCurriculum] = useState(lockedCurriculum || "all");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResults(null);
      return;
    }
    let cancelled = false;
    setSearching(true);
    fetch(`/api/books/search?q=${encodeURIComponent(debouncedQuery)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setSearchResults(Array.isArray(data) ? data : []);
      })
      .finally(() => {
        if (!cancelled) setSearching(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const searchedBooks = useMemo(() => {
    return searchResults !== null ? searchResults : initialBooks;
  }, [searchResults, initialBooks]);

  const books = useMemo(() => {
    if (curriculum === "all") return searchedBooks;
    return searchedBooks.filter((b) => b.curriculum === curriculum);
  }, [searchedBooks, curriculum]);

  return (
    <div>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or author..."
          className="w-full rounded-2xl border border-gray-200/70 bg-white/70 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-indigo-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-white"
        />
      </div>

      {!lockedCurriculum && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <FilterPill active={curriculum === "all"} onClick={() => setCurriculum("all")}>
            All
          </FilterPill>
          {BOOK_CURRICULA.map((c) => (
            <FilterPill key={c} active={curriculum === c} onClick={() => setCurriculum(c)}>
              {c}
            </FilterPill>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        {searching ? "Searching..." : `Showing ${books.length} ${books.length === 1 ? "book" : "books"}`}
      </p>

      {books.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-gray-300/70 py-16 text-center dark:border-white/10">
          <LayoutGrid className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {debouncedQuery || curriculum !== "all"
              ? "No books match your filters."
              : "No books available yet — check back soon."}
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
