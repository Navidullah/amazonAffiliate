"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function BookCard({ book, className = "" }) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_24px_64px_-30px_rgba(56,89,255,0.5)] dark:border-white/10 dark:bg-white/[0.03] ${className}`}
    >
      <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden bg-gradient-to-br from-indigo-500 to-fuchsia-500">
        {book.hasCoverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/api/books/${book.slug}/cover`}
            alt={`Cover of ${book.title}`}
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
        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
          {book.category}
        </span>
        <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-white">{book.title}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">by {book.author}</p>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600 dark:text-gray-400">
          {book.description}
        </p>
        <div className="mt-5 flex items-center justify-end">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-gray-700 group-hover:text-indigo-600 dark:text-gray-300 dark:group-hover:text-indigo-300">
            Read online <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
