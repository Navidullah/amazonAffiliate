// app/maths/page.jsx

import MathsLandingExperience from "./MathsLandingExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/maths`;

export const metadata = {
  title: {
    absolute: "Maths Challenge — Interactive KS2 Maths Practice | Shopyor",
  },
  description:
    "Build your Year 6 maths skills with quick interactive questions, instant feedback and fun challenges. Free UK KS2 maths practice, no signup needed.",
  keywords: [
    "maths challenge",
    "year 6 maths practice",
    "ks2 maths quiz",
    "interactive maths questions",
    "uk maths curriculum practice",
    "year 6 maths games",
    "free maths practice for kids",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "education",
  classification: "Interactive maths practice for children",
  alternates: {
    canonical: PAGE_URL,
    languages: { "x-default": PAGE_URL, en: PAGE_URL, "en-GB": PAGE_URL },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_GB",
    title: "Maths Challenge — Interactive KS2 Maths Practice",
    description:
      "Learn, practise and challenge yourself with interactive Year 6 maths questions, instant feedback, points and badges.",
    images: [{ url: `${BASE_URL}/images/shopyor-tools-og.png`, width: 1200, height: 630, alt: "Shopyor Maths Challenge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maths Challenge — Interactive KS2 Maths Practice | Shopyor",
    description: "Free interactive Year 6 maths practice with instant feedback, points and badges.",
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
    ],
  };

  return (
    <>
      <MathsLandingExperience />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
