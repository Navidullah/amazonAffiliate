"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DEBOUNCE_MS = 400;

export default function SearchBox({ className = "", onNavigate }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const navigate = (term) => {
    clearTimeout(timeoutRef.current);
    const trimmed = term.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`, { scroll: false });
    }
    onNavigate?.();
  };

  const handleChange = (e) => {
    const next = e.target.value;
    setValue(next);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => navigate(next), DEBOUNCE_MS);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Site search"
      className={className}
    >
      <div className="relative w-full">
        <label htmlFor="header-search" className="sr-only">
          Search
        </label>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
          aria-hidden="true"
        />
        <Input
          id="header-search"
          type="text"
          placeholder="Search"
          value={value}
          onChange={handleChange}
          className="w-full rounded-full border bg-gray-100 pl-10 pr-4 text-sm focus:bg-white dark:bg-zinc-900 dark:focus:bg-zinc-800"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
        />
      </div>
    </form>
  );
}
