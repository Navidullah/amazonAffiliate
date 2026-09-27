import Link from "next/link";
import { notFound } from "next/navigation";
import { Home, ChevronRight, BookOpen, CheckCircle2 } from "lucide-react";
import { getBookBySlug, getActiveBooks } from "@/lib/actions/books";
import BookCard from "@/app/components/store/BookCard";
import ReadOnlineButton from "./ReadOnlineButton";
import DownloadBookButton from "./DownloadBookButton";

const SITE = "https://www.shopyor.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};

  const title = `${book.title} — Read Online Free | Shopyor`;
  return {
    metadataBase: new URL(SITE),
    title: { absolute: title },
    description: book.description,
    keywords: [book.title, book.author, book.category, ...(book.tags || [])],
    alternates: { canonical: `${SITE}/books/${slug}` },
    openGraph: {
      type: "book",
      url: `${SITE}/books/${slug}`,
      siteName: "Shopyor",
      title,
      description: book.description,
      images: book.hasCoverImage ? [{ url: `${SITE}/api/books/${slug}/cover` }] : undefined,
    },
  };
}

export default async function BookPage({ params }) {
  const { slug } = await params;
  const [book, allBooks] = await Promise.all([getBookBySlug(slug), getActiveBooks()]);

  if (!book) notFound();

  const related = allBooks.filter((b) => b.slug !== slug && b.category === book.category).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Book",
        name: book.title,
        author: { "@type": "Person", name: book.author },
        description: book.description,
        image: book.hasCoverImage ? `${SITE}/api/books/${slug}/cover` : undefined,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Books", item: `${SITE}/books` },
          { "@type": "ListItem", position: 3, name: book.title, item: `${SITE}/books/${slug}` },
        ],
      },
      ...(book.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: book.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 md:pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="mb-8 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="inline-flex items-center gap-1 hover:text-indigo-600">
          <Home className="h-3.5 w-3.5" /> Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/books" className="hover:text-indigo-600">
          Books
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-700 dark:text-gray-300">{book.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          {book.hasCoverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/api/books/${book.slug}/cover`}
              alt={`Cover of ${book.title}`}
              className="aspect-[3/4] w-full object-cover"
            />
          ) : (
            <div className="flex h-96 items-center justify-center">
              <BookOpen className="h-16 w-16 text-gray-300" />
            </div>
          )}
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-500/20 dark:bg-white/[0.04] dark:text-indigo-300">
            {book.category}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {book.title}
          </h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">by {book.author}</p>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            {book.description}
          </p>

          {book.source === "public_domain" && book.attribution && (
            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
              Source: {book.attribution} — public domain.
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <ReadOnlineButton slug={book.slug} />
            {book.price > 0 && <DownloadBookButton slug={book.slug} price={book.price} />}
          </div>
        </div>
      </div>

      {(book.longDescription || book.whatsInside?.length) && (
        <section className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {book.longDescription && (
            <div className="prose prose-gray max-w-none dark:prose-invert">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                About this book
              </h2>
              {book.longDescription.split("\n\n").map((para, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-400">
                  {para}
                </p>
              ))}
            </div>
          )}
          {book.whatsInside?.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">What's inside</h2>
              <ul className="mt-4 space-y-2.5">
                {book.whatsInside.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {book.faqs?.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-6">
            {book.faqs.map((f, i) => (
              <div key={i}>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{f.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">More in {book.category}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((b) => (
              <BookCard key={b.slug} book={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
