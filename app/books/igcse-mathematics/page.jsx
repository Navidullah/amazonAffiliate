import Link from "next/link";
import { getActiveBooksByCurriculum } from "@/lib/actions/books";
import BooksCatalog from "../BooksCatalog";
import CurriculumLinks from "../CurriculumLinks";
import CurriculumFaq from "../CurriculumFaq";

// Same reasoning as /books/page.jsx — books are added live by the admin
// without a redeploy, so this must not be statically cached at build time.
export const dynamic = "force-dynamic";

const SITE = "https://www.shopyor.com";

const FAQS = [
  {
    q: "Where can I find Cambridge IGCSE Mathematics 0580 worked solutions online for free?",
    a: "Right here — fully worked, step-by-step solutions to real Cambridge IGCSE Mathematics 0580 past papers are available to read online in your browser, free, with no sign-up. Open any book below and it loads straight into the reader. A low-cost PDF download is also offered on each book's page for offline study and printing.",
  },
  {
    q: "Which paper and tier do these worked solutions cover?",
    a: "The current book covers Paper 1 (Core tier, Variant 11) from the May/June 2025 exam session, with all 26 questions solved in full. More papers, variants and the Extended tier are added as they're completed.",
  },
  {
    q: "Are these solutions from a real past exam paper?",
    a: "Yes — the questions are based on a genuine, official Cambridge IGCSE 0580 exam paper from the stated session. Question wording is paraphrased in our own words rather than reproduced from the original paper, and question numbers and mark allocations follow the original paper for easy cross-reference.",
  },
  {
    q: "Do the solutions show working, not just final answers?",
    a: "Yes — every question is solved step by step with the reasoning behind each step, mark-scheme notation (M1, A1, B1) shown alongside the working, and examiner tips flagging the mistakes students most commonly make, the same way you'd need to show working in the real IGCSE exam.",
  },
];

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    absolute: "IGCSE Mathematics 0580 Worked Solutions Online | Shopyor",
  },
  description:
    "Read fully worked Cambridge IGCSE Mathematics 0580 past-paper solutions online free — step-by-step working, examiner tips, mark-scheme notation. No download, no sign-up.",
  alternates: { canonical: `${SITE}/books/igcse-mathematics` },
  openGraph: {
    type: "website",
    url: `${SITE}/books/igcse-mathematics`,
    siteName: "Shopyor",
    title: "IGCSE Mathematics 0580 Worked Solutions Online",
    description:
      "Read fully worked Cambridge IGCSE Mathematics 0580 past-paper solutions online free — step-by-step working, examiner tips, mark-scheme notation.",
  },
};

export default async function IgcseBooksPage() {
  const books = await getActiveBooksByCurriculum("IGCSE");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: `${SITE}/books/igcse-mathematics`,
        name: "Cambridge IGCSE Mathematics 0580 Worked Solutions",
        description:
          "Fully worked Cambridge IGCSE Mathematics 0580 past-paper solutions, free to read online.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Books", item: `${SITE}/books` },
          { "@type": "ListItem", position: 3, name: "IGCSE", item: `${SITE}/books/igcse-mathematics` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6 md:pt-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <nav className="text-xs text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/books" className="hover:text-indigo-600">
          Books
        </Link>{" "}
        / <span className="text-gray-700 dark:text-gray-300">IGCSE</span>
      </nav>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        Cambridge IGCSE Mathematics 0580 — Worked Solutions, Free Online
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        Fully worked, step-by-step solutions to real Cambridge IGCSE
        Mathematics 0580 past papers — read instantly in your browser, no
        download, no sign-up. A PDF download is also available for offline
        study and printing.
      </p>

      <CurriculumLinks current="IGCSE" />

      <div className="mt-10">
        <BooksCatalog initialBooks={books} lockedCurriculum="IGCSE" />
      </div>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Frequently asked questions
        </h2>
        <CurriculumFaq faqs={FAQS} />
      </section>
    </div>
  );
}
