import { getActiveBooks } from "@/lib/actions/books";
import BooksCatalog from "./BooksCatalog";

// Books are added live by the admin without a redeploy — this must not be
// statically cached at build time, or newly uploaded books never appear.
export const dynamic = "force-dynamic";

const SITE = "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "Read Books Online Free | Shopyor" },
  description:
    "Browse and read books online for free — no download, no sign-up. Search by title or author and start reading instantly.",
  alternates: { canonical: `${SITE}/books` },
  openGraph: {
    type: "website",
    url: `${SITE}/books`,
    siteName: "Shopyor",
    title: "Read Books Online Free | Shopyor",
    description:
      "Browse and read books online for free — no download, no sign-up. Search by title or author and start reading instantly.",
  },
};

export default async function BooksPage() {
  const books = await getActiveBooks();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: `${SITE}/books`,
        name: "Read Books Online Free",
        description: "Browse and read books online for free.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Books", item: `${SITE}/books` },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 md:pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Read Books Online — Free
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        Search by title or author and start reading instantly in your browser
        — no download, no sign-up.
      </p>

      <div className="mt-10">
        <BooksCatalog initialBooks={books} />
      </div>
    </div>
  );
}
