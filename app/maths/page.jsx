// app/maths/page.jsx

import MathsLandingExperience from "./MathsLandingExperience";
import { MATHS_FAQ } from "@/lib/constants/mathsFaq";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/maths`;

export const metadata = {
  title: {
    absolute: "Free Year 6 Maths Practice — KS2 Maths Challenge | Shopyor",
  },
  description:
    "Free Year 6 maths practice: 15 KS2 topics, instant feedback, a daily challenge & progress tracking. No signup — for UK and international schools.",
  keywords: [
    "year 6 maths practice online free",
    "ks2 maths quiz",
    "maths challenge for kids",
    "help my child with year 6 maths",
    "year 6 maths practice for parents",
    "british curriculum maths practice",
    "ks2 maths revision online",
    "interactive maths questions year 6",
    "free maths practice for kids",
    "year 6 maths games",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "education",
  classification: "Interactive Year 6 / KS2 maths practice for children",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "x-default": PAGE_URL,
      en: PAGE_URL,
      "en-GB": PAGE_URL,
      "en-PK": PAGE_URL,
      "en-IN": PAGE_URL,
      "en-NG": PAGE_URL,
      "en-PH": PAGE_URL,
      "en-BD": PAGE_URL,
      "en-AE": PAGE_URL,
      "en-AU": PAGE_URL,
      "en-NZ": PAGE_URL,
    },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_GB",
    alternateLocale: ["en_US", "en_IN", "en_PK", "en_NG", "en_AU"],
    title: "Year 6 Maths Practice Online Free — KS2 Maths Challenge",
    description:
      "15 UK KS2 Year 6 maths topics with instant feedback, a daily challenge, points, badges and an optional progress dashboard for parents. Free, no signup required.",
    images: [{ url: `${BASE_URL}/images/shopyor-tools-og.png`, width: 1200, height: 630, alt: "Shopyor Maths Challenge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Year 6 Maths Practice Online Free — KS2 Maths Challenge | Shopyor",
    description: "Free interactive Year 6 / KS2 maths practice with instant feedback, points, badges and a parent progress dashboard.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/shopyor-tools-og.png`],
  },
};

export default function MathsChallengePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Maths Challenge",
        url: PAGE_URL,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "An interactive maths learning area for children, starting with UK KS2 Year 6 mathematics, with instant feedback, scoring and progress tracking.",
        audience: { "@type": "EducationalAudience", educationalRole: "student" },
        featureList: [
          "Interactive Year 6 maths questions across 15 topics",
          "Instant feedback with teaching explanations",
          "Points, streaks and badges",
          "Daily maths challenge",
          "Progress tracking saved in your browser",
          "Free with no signup",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Maths Challenge", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: MATHS_FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <MathsLandingExperience />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
