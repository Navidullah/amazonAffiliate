import Link from "next/link";
import { getActiveBooksByCurriculum } from "@/lib/actions/books";
import { getActiveDigitalProductsByGradeLevel } from "@/lib/actions/products";
import BooksCatalog from "../BooksCatalog";
import CurriculumProducts from "../CurriculumProducts";
import CurriculumLinks from "../CurriculumLinks";
import CurriculumFaq from "../CurriculumFaq";

// Same reasoning as /books/page.jsx — books/products are added live by the
// admin without a redeploy, so this must not be statically cached at build time.
export const dynamic = "force-dynamic";

const SITE = "https://www.shopyor.com";

const FAQS = [
  {
    q: "Does Shopyor have IB Mathematics AA HL Paper 1 practice with worked solutions?",
    a: "Yes — original IB Mathematics: Analysis & Approaches HL Paper 1-style practice questions, written to match the real Paper 1 format, topics and mark allocations, with every question fully worked step by step. A low-cost PDF download unlocks the full set instantly.",
  },
  {
    q: "Is this a real, official IB past paper?",
    a: "No — this is original Shopyor content written to match the syllabus, style and mark allocations of a real AA HL Paper 1, not a solved official IB past paper. Shopyor is not affiliated with or endorsed by the International Baccalaureate Organization (IBO).",
  },
  {
    q: "What topics does the practice set cover?",
    a: "Quadratic functions, integration and kinematics, geometric sequences, logarithms, probability (independent events, tree diagrams and conditional probability), circular measure, and complex numbers and polynomials — 8 questions, 50 marks, no calculator.",
  },
  {
    q: "How are the solutions marked?",
    a: "Every question is worked step by step with method marks tagged M1/A1/R1 exactly as an IB examiner would award them, plus an examiner tip on each question flagging the mistake students most commonly make.",
  },
];

export const metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: "IB Maths AA HL Paper 1 Worked Solutions | Shopyor" },
  description:
    "Original IB Mathematics AA HL Paper 1-style practice questions with fully worked, step-by-step solutions and examiner-style method marks. Pay once, download instantly.",
  alternates: { canonical: `${SITE}/books/ib-mathematics` },
  openGraph: {
    type: "website",
    url: `${SITE}/books/ib-mathematics`,
    siteName: "Shopyor",
    title: "IB Maths AA HL Paper 1 Worked Solutions",
    description:
      "Original IB Mathematics AA HL Paper 1-style practice questions with fully worked, step-by-step solutions and examiner-style method marks.",
  },
};

export default async function IbBooksPage() {
  const [books, products] = await Promise.all([
    getActiveBooksByCurriculum("IB"),
    getActiveDigitalProductsByGradeLevel("IB"),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        url: `${SITE}/books/ib-mathematics`,
        name: "IB Mathematics AA HL Worked Solutions",
        description:
          "Original IB Mathematics AA HL Paper 1-style practice questions with fully worked solutions.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Books", item: `${SITE}/books` },
          { "@type": "ListItem", position: 3, name: "IB", item: `${SITE}/books/ib-mathematics` },
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
        / <span className="text-gray-700 dark:text-gray-300">IB</span>
      </nav>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        IB Mathematics AA HL — Worked Solutions
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-400">
        Original IB Mathematics: Analysis &amp; Approaches HL Paper 1-style
        practice questions, written to match the real exam format and mark
        allocations, with every question fully worked step by step.
      </p>

      <CurriculumLinks current="IB" />

      {books.length > 0 && (
        <div className="mt-10">
          <BooksCatalog initialBooks={books} lockedCurriculum="IB" />
        </div>
      )}

      <CurriculumProducts products={products} curriculum="IB" />

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Frequently asked questions
        </h2>
        <CurriculumFaq faqs={FAQS} />
      </section>
    </div>
  );
}
