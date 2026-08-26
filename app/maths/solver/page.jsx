// app/maths/solver/page.jsx

import MathSolverPageExperience from "@/components/math-solver/MathSolverPageExperience";
import { MATH_SOLVER_FAQ } from "@/lib/constants/mathSolverFaq";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/maths/solver`;

export const metadata = {
  title: { absolute: "AI Math Solver — Algebra, Equation & Calculus Solver | Shopyor" },
  description:
    "Free AI math solver with step-by-step explanations. Solve algebra, equations, calculus and word problems, with diagrams and graphs — for school, college and university level maths.",
  keywords: [
    "ai math solver",
    "math solver",
    "math problem solver",
    "algebra calculator",
    "algebra solver",
    "equation solver",
    "calculus solver",
    "trigonometry calculator",
    "quadratic equation solver",
    "step by step math solver",
    "free math problem solver",
    "math homework solver",
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
    title: "AI Math Solver — Algebra, Equation & Calculus Solver",
    description:
      "Solve algebra, equations, calculus and word problems step by step, with diagrams and graphs. Free for school, college and university students.",
    images: [{ url: `${BASE_URL}/images/shopyor-tools-og.png`, width: 1200, height: 630, alt: "Shopyor Math Solver" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Math Solver — Algebra, Equation & Calculus Solver | Shopyor",
    description: "Step-by-step math solutions for algebra, equations, calculus and more. Free.",
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
          "A free AI math solver that explains algebra, equations, calculus and word problems step by step, with diagrams, plotted graphs and tables where helpful.",
        audience: { "@type": "EducationalAudience", educationalRole: "student" },
        featureList: [
          "Step-by-step explanations, not just the final answer",
          "Algebra, equation and calculus solving",
          "Auto-generated geometry diagrams",
          "Plotted function graphs and data charts",
          "Tables for tabular data",
          "Works for school, college and university level math",
          "1 free question per day, with a paid day pass for unlimited additional questions",
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
