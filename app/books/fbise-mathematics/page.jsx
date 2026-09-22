import Link from "next/link";
import { getActiveBooksByCurriculum } from "@/lib/actions/books";
import { getActiveDigitalProductsByGradeLevel } from "@/lib/actions/products";
import BooksCatalog from "../BooksCatalog";
import CurriculumProducts from "../CurriculumProducts";
import CurriculumLinks from "../CurriculumLinks";
import CurriculumFaq from "../CurriculumFaq";

// Same reasoning as /books/page.jsx — books are added live by the admin
// without a redeploy, so this must not be statically cached at build time.
export const dynamic = "force-dynamic";

const SITE = "https://www.shopyor.com";

const FAQS = [
  {
    q: "Where can I read the FBISE Class 10 Mathematics book online for free?",
    a: "Right here — the full FBISE (Federal Board) Class 10 Mathematics textbook is available to read online in your browser, free, with no sign-up and no download required. Just open any book below and it loads straight into the reader. If you also want a downloadable copy, a low-cost PDF download is offered on each book's page.",
  },
  {
    q: "What topics do these FBISE Class 10 Maths resources cover?",
    a: "The full textbook plus step-by-step exercise solutions for Complex Numbers (Exercise 1.1 and 1.2) and Quadratic Equations (Exercise 2.1 and 2.2) — the units students most often search for solved examples on. More chapters and exercises are added as they're completed.",
  },
  {
    q: "Is FBISE the same as the Federal Board or SSC Part 2?",
    a: "Yes. FBISE stands for the Federal Board of Intermediate and Secondary Education, Islamabad. Class 10 under FBISE is also referred to as SSC Part 2 or Matric Part 2, and the syllabus is set by the National Curriculum of Pakistan (NBF-published textbooks).",
  },
  {
    q: "Are these exercise solutions useful for board exam preparation?",
    a: "Yes — each solved exercise walks through every question step by step, the same way you'd need to show working in the FBISE board exam, rather than just giving final answers. They're written to be studied alongside the official textbook, not as a replacement for it.",
  },
];

export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "FBISE Class 10 Maths Book & Exercise Solutions Online | Shopyor" },
  description:
    "Read the FBISE (Federal Board) Class 10 Mathematics textbook and step-by-step exercise solutions — Complex Numbers, Quadratic Equations — online free. No download, no sign-up.",
  alternates: { canonical: `${SITE}/books/fbise-mathematics` },
  openGraph: {
    type: "website",
    url: `${SITE}/books/fbise-mathematics`,
    siteName: "Shopyor",
    title: "FBISE Class 10 Maths Book & Exercise Solutions Online",
    description:
      "Read the FBISE (Federal Board) Class 10 Mathematics textbook and step-by-step exercise solutions online free — no download, no sign-up.",
  },
};

export default async function FbiseBooksPage() {
  const [books, products] = await Promise.all([
    getActiveBooksByCurriculum("FBISE"),
    getActiveDigitalProductsByGradeLevel("FBISE"),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: `${SITE}/books/fbise-mathematics`,
        name: "FBISE Class 10 Mathematics Books & Exercise Solutions",
        description:
          "The FBISE Class 10 Mathematics textbook and step-by-step exercise solutions, free to read online.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Books", item: `${SITE}/books` },
          { "@type": "ListItem", position: 3, name: "FBISE", item: `${SITE}/books/fbise-mathematics` },
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
        / <span className="text-gray-700 dark:text-gray-300">FBISE</span>
      </nav>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        FBISE Class 10 Mathematics — Book &amp; Exercise Solutions, Free Online
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        The FBISE (Federal Board) Class 10 Mathematics textbook plus step-by-step
        solved exercises for Complex Numbers and Quadratic Equations — read
        instantly in your browser, no download, no sign-up.
      </p>

      <CurriculumLinks current="FBISE" />

      <div className="mt-10">
        <BooksCatalog initialBooks={books} lockedCurriculum="FBISE" />
      </div>

      <CurriculumProducts products={products} curriculum="FBISE" />

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Frequently asked questions
        </h2>
        <CurriculumFaq faqs={FAQS} />
      </section>
    </div>
  );
}
