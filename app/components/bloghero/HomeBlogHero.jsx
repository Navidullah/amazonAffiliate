"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function HomeBlogHero() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/blog?search=${encodeURIComponent(term)}` : "/blog");
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent p-6 sm:p-10">
      {/* Glow / shape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl"
      />

      <div className="relative z-[1] grid items-center gap-8 md:grid-cols-2">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-cyan-300">
            💪 Health & Fitness • Shopyor
          </span>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Practical Health & Fitness Guides
            <span className="block bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">
              that you can actually use.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm/6 text-white/70 sm:text-base/7">
            Read expert-backed tips, routines, and product breakdowns. Search a
            topic below or dive into the latest blogs.
          </p>

          {/* Search */}
          <form onSubmit={onSearch} className="mt-6">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="m21 21-4.35-4.35m1.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                />
              </svg>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                type="text"
                placeholder="Search blogs e.g. eczema diet, whey isolate…"
                className="w-full bg-transparent outline-none placeholder:text-white/50"
              />
              <button
                type="submit"
                className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-400 active:scale-[0.99]"
              >
                Search
              </button>
            </div>
          </form>

          {/* CTAs */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium hover:bg-white/5"
            >
              Explore Blogs
            </Link>
            <Link
              href="/tools"
              className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
            >
              Try Tools
            </Link>
          </div>

          {/* Quick tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["Eczema", "Protein", "Jogging", "Sleep"].map((t) => (
              <Link
                key={t}
                href={`/blogs?tag=${encodeURIComponent(t.toLowerCase())}`}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/80 hover:bg-white/5"
              >
                #{t}
              </Link>
            ))}
          </div>
        </div>

        {/* Right visual (optional) */}
        <div className="relative mx-auto aspect-[4/3] w-full max-w-md md:max-w-none">
          <Image
            src="/hero/health-hero.png" // <- replace with your asset (or remove Image block)
            alt="Healthy lifestyle illustration"
            fill
            className="rounded-xl object-cover ring-1 ring-white/10"
            priority
          />
        </div>
      </div>
    </section>
  );
}
