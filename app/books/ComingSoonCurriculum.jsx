import Link from "next/link";
import { BookOpen } from "lucide-react";
import CurriculumLinks from "./CurriculumLinks";

export default function ComingSoonCurriculum({ curriculum, blurb }) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 md:pt-8">
      <nav className="text-xs text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/books" className="hover:text-indigo-600">
          Books
        </Link>{" "}
        / <span className="text-gray-700 dark:text-gray-300">{curriculum}</span>
      </nav>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {curriculum} Mathematics Books — Coming Soon
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">{blurb}</p>

      <CurriculumLinks current={curriculum} />

      <div className="mt-16 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-gray-300/70 py-16 text-center dark:border-white/10">
        <BookOpen className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          We&apos;re preparing {curriculum} Mathematics books — check back soon, or browse what&apos;s
          available now.
        </p>
        <Link
          href="/books/fbise"
          className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-md"
        >
          Browse FBISE Class 10 Maths books
        </Link>
      </div>
    </div>
  );
}
