"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function ReadOnlineButton({ slug }) {
  return (
    <Link
      href={`/books/${slug}/read`}
      className="inline-flex h-12 items-center gap-2 rounded-2xl bg-indigo-600 px-8 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 transition-colors hover:bg-indigo-700"
    >
      <BookOpen className="h-5 w-5" /> Read Online — Free
    </Link>
  );
}
