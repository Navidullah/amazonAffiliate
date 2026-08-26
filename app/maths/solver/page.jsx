// app/maths/solver/page.jsx

import MathSolverPageExperience from "@/components/math-solver/MathSolverPageExperience";
import { MATH_SOLVER_FAQ } from "@/lib/constants/mathSolverFaq";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/maths/solver`;

export const metadata = {
  title: { absolute: "Free AI Math Problem Solver — Step by Step with Diagrams | Shopyor" },
  description:
    "Free AI math solver for school, college and university students. Get step-by-step explanations with geometry diagrams, plotted graphs and tables — not just the answer.",
  keywords: [
    "ai math solver",
    "step by step math solver",
    "math problem solver online free",
    "algebra solver with steps",
    "calculus solver step by step",
    "geometry solver with diagram",
    "math homework help online",
    "college math solver",
    "university math solver",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "education",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_GB",
    title: "Free AI Math Problem Solver — Step by Step with Diagrams",
    description:
      "Get step-by-step math solutions with diagrams, plotted graphs and tables. Free for school, college and university students.",
    images: [{ url: `${BASE_URL}/images/shopyor-tools-og.png`, width: 1200, height: 630, alt: "Shopyor Math Solver" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Math Problem Solver — Step by Step | Shopyor",
    description: "Step-by-step math solutions with diagrams, graphs and tables. Free.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/shopyor-tools-og.png`],
  },
};

export default function MathSolverPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "AI Math Problem Solver",
        url: PAGE_URL,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "An AI-powered math problem solver that explains solutions step by step, with geometry diagrams, plotted graphs and tables where helpful.",
        audience: { "@type": "EducationalAudience", educationalRole: "student" },
        featureList: [
          "Step-by-step explanations, not just the final answer",
          "Auto-generated geometry diagrams",
          "Plotted function graphs and data charts",
          "Tables for tabular data",
          "Works for school, college and university level math",
          "Free with a daily question limit",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Maths", item: `${BASE_URL}/maths` },
          { "@type": "ListItem", position: 3, name: "Math Solver", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: MATH_SOLVER_FAQ.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <MathSolverPageExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
