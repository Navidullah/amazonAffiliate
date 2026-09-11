import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Article not found
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        The blog post you're looking for doesn't exist or may have been
        moved.
      </p>
      <Link
        href="/blog"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
      >
        Browse all articles
      </Link>
    </main>
  );
}
