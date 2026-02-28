import TagsClient from "./tags-client";

export const metadata = {
  title: "YouTube Tags Extractor (Free) | Extract Video Tags Instantly",
  description:
    "Extract YouTube video tags, title, and description instantly. Free YouTube tag finder tool for creators and SEO optimization.",
  keywords: [
    "YouTube tags extractor",
    "YouTube tag finder",
    "Extract YouTube tags",
    "YouTube video tags checker",
  ],
};

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YouTube Tags Extractor",
    applicationCategory: "Utility",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this YouTube tags extractor free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our YouTube tag extractor is completely free to use.",
        },
      },
      {
        "@type": "Question",
        name: "Can I export YouTube tags as CSV?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can copy all tags or export them as a CSV file.",
        },
      },
    ],
  };

  return (
    <>
      <TagsClient />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
