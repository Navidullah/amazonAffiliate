import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getBookBySlug } from "@/lib/actions/books";
import BookReader from "./BookReader";

const SITE = "https://www.shopyor.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};

  return {
    metadataBase: new URL(SITE),
    title: { absolute: `Read ${book.title} Online | Shopyor` },
    description: `Read ${book.title} by ${book.author} online for free.`,
    alternates: { canonical: `${SITE}/books/${slug}/read` },
    robots: { index: false, follow: true },
  };
}

export default async function ReadBookPage({ params }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6">
      <Link
        href={`/books/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {book.title}
      </Link>

      <h1 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
        {book.title} <span className="font-normal text-gray-500">by {book.author}</span>
      </h1>

      <div className="mt-6">
        <BookReader slug={book.slug} title={book.title} />
      </div>
    </div>
  );
}
