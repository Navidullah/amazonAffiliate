// app/maths/year-6/page.jsx

import Year6TopicsExperience from "./Year6TopicsExperience";
import { UK_YEAR_6_TOPICS } from "@/lib/maths/topics";
import { YEAR6_HUB_FAQ } from "@/lib/constants/mathsFaq";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/maths/year-6`;

export const metadata = {
  title: { absolute: "Year 6 Maths Topics — 15 KS2 Practice Areas | Shopyor" },
  description:
    "All 15 UK KS2 Year 6 maths topics in one place: fractions, ratio, algebra, geometry and more. Interactive questions, instant feedback, free progress tracking.",
  keywords: [
    "year 6 maths topics",
    "ks2 maths practice",
    "year 6 fractions practice",
    "year 6 maths quiz",
    "ks2 maths questions",
    "year 6 maths for parents",
    "ks2 maths revision by topic",
  ],
  robots: "index, follow",
  category: "education",
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
    },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_GB",
    title: "Year 6 Maths Challenge | KS2 Maths Practice",
    description: "15 Year 6 maths topics with interactive questions, instant feedback and progress tracking.",
    images: [{ url: `${BASE_URL}/images/shopyor-tools-og.png`, width: 1200, height: 630, alt: "Year 6 Maths Challenge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Year 6 Maths Challenge | KS2 Maths Practice",
    description: "Practise UK KS2 Year 6 maths with interactive questions and instant feedback.",
    images: [`${BASE_URL}/images/shopyor-tools-og.png`],
  },
};

export default function Year6MathsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Year 6 Maths Topics",
        url: PAGE_URL,
        description: "15 UK KS2 Year 6 maths topics with interactive practice questions.",
      },
      {
        "@type": "ItemList",
        itemListElement: UK_YEAR_6_TOPICS.map((topic, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: topic.title,
          url: `${PAGE_URL}/${topic.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Maths Challenge", item: `${BASE_URL}/maths` },
          { "@type": "ListItem", position: 3, name: "Year 6", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: YEAR6_HUB_FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <Year6TopicsExperience />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </>
  );
}
