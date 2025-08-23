"use client";

import Link from "next/link";

export default function HomeHero({ postsCount = 0 }) {
  return (
    <section
      className="
      relative overflow-hidden rounded-2xl border 
      border-gray-200 dark:border-white/10 
      bg-gradient-to-b from-cyan-50 via-white to-white 
      dark:from-cyan-500/10 dark:via-transparent dark:to-transparent
      p-8 sm:p-12
    "
    >
      {/* soft glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full 
          bg-cyan-200/40 blur-3xl 
          dark:bg-cyan-400/20
        "
      />

      <div className="relative z-[1] max-w-3xl">
        <span
          className="
          inline-flex items-center gap-2 rounded-full border 
          border-gray-200 dark:border-white/10 
          bg-white px-3 py-1 text-xs font-medium text-cyan-700
          dark:bg-white/5 dark:text-cyan-300
        "
        >
          💪 Health & Fitness • Shopyor
        </span>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Practical
          <span className="bg-gradient-to-r from-cyan-500 to-teal-400 bg-clip-text text-transparent">
            {" "}
            Health & Fitness{" "}
          </span>
          Guides for Real Life
        </h1>

        <p className="mt-4 text-gray-700 dark:text-white/75 sm:text-lg">
          Evidence-based tips, simple routines, and clear product breakdowns. No
          fluff—just what helps you feel better, think sharper, and move more.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blogs"
            className="rounded-lg border border-gray-200 dark:border-white/10 
                       bg-white dark:bg-white/5 
                       px-4 py-2 text-sm font-semibold 
                       hover:bg-gray-50 dark:hover:bg-white/10 
                       active:scale-[0.99]"
          >
            Explore Blogs
          </Link>
          <Link
            href="/tools"
            className="rounded-lg border border-gray-200 dark:border-white/10 
                       px-4 py-2 text-sm font-medium 
                       hover:bg-gray-50 dark:hover:bg-white/5 
                       active:scale-[0.99]"
          >
            Try Tools
          </Link>
          <Link
            href="/product"
            className="rounded-lg border border-gray-200 dark:border-white/10 
                       px-4 py-2 text-sm font-medium 
                       hover:bg-gray-50 dark:hover:bg-white/5 
                       active:scale-[0.99]"
          >
            Explore Products
          </Link>
        </div>

        {/* Quick topics */}
        <div className="mt-6 flex flex-wrap gap-2">
          {["Eczema", "Protein", "Jogging", "Sleep", "Beginners"].map((t) => (
            <Link
              key={t}
              href={`/blogs?tag=${encodeURIComponent(t.toLowerCase())}`}
              className="rounded-full border border-gray-200 dark:border-white/10 
                         bg-white dark:bg-white/5 
                         px-3 py-1 text-xs text-gray-700 dark:text-white/90 
                         hover:bg-gray-50 dark:hover:bg-white/10"
            >
              #{t}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div
          className="mt-6 grid w-full max-w-md grid-cols-3 overflow-hidden rounded-xl 
                        border border-gray-200 dark:border-white/10 
                        bg-white dark:bg-white/5 text-center text-xs"
        >
          <div className="p-3">
            <div className="font-semibold">{postsCount}</div>
            <div className="text-gray-500 dark:text-white/60">Posts</div>
          </div>
          <div className="border-l border-gray-200 dark:border-white/10 p-3">
            <div className="font-semibold">Weekly</div>
            <div className="text-gray-500 dark:text-white/60">New Guides</div>
          </div>
          <div className="border-l border-gray-200 dark:border-white/10 p-3">
            <div className="font-semibold">No Hype</div>
            <div className="text-gray-500 dark:text-white/60">Just Clarity</div>
          </div>
        </div>
      </div>
    </section>
  );
}
