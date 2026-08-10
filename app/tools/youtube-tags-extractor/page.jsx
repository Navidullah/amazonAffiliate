import YoutubeTagsExtractorExperience from "./YoutubeTagsExtractorExperience";

export const metadata = {
  title: {
    absolute:
      "YouTube Tags Extractor & Generator – Find Any Video's Tags Free | Shopyor",
  },
  description:
    "Free YouTube tags extractor. Instantly find, copy and export the tags, title and description of any YouTube video or Short for SEO. See competitors' keywords and rank higher — no login required.",
  keywords: [
    "youtube tags extractor",
    "youtube tag generator",
    "youtube tag finder",
    "extract youtube tags",
    "youtube video tags checker",
    "find youtube video tags",
    "copy youtube tags",
    "youtube tags for views",
    "see tags on youtube video",
    "youtube seo tags tool",
    "youtube hashtag extractor",
  ],
  alternates: {
    canonical: "https://www.shopyor.com/tools/youtube-tags-extractor",
  },
  openGraph: {
    title: "Free YouTube Tags Extractor – Find Any Video's Tags",
    description:
      "Reveal the tags, title and description behind any YouTube video. Copy and export for your own YouTube SEO. Free, instant, no signup.",
    url: "https://www.shopyor.com/tools/youtube-tags-extractor",
    siteName: "Shopyor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Tags Extractor & Finder",
    description:
      "Find, copy and export the tags of any YouTube video for SEO. Free and instant.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
};

const schemas = {
  tool: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "YouTube Tags Extractor",
    url: "https://www.shopyor.com/tools/youtube-tags-extractor",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "276",
    },
    description:
      "Free YouTube tags extractor and finder. Reveal, copy and export the tags, title and description of any YouTube video or Short for SEO.",
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I see the tags on a YouTube video?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "YouTube hides tags from public view, but they're still in the video's data. Paste the video URL into this free YouTube tags extractor and it instantly reveals every tag the creator used, along with the title and description.",
        },
      },
      {
        "@type": "Question",
        name: "Is this YouTube tags extractor free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, it's completely free with no limits and no account required. You can extract, copy and export tags from as many videos as you like.",
        },
      },
      {
        "@type": "Question",
        name: "Why do some YouTube videos show no tags?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tags are optional, so many creators leave them blank — especially on large channels that rank on title, thumbnail and watch time alone. If a video returns no tags, it simply means none were added.",
        },
      },
      {
        "@type": "Question",
        name: "How many characters of tags does YouTube allow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "YouTube allows up to 500 characters of tags per video in total. This tool shows a live character count so you can stay within the limit when planning your own tags.",
        },
      },
      {
        "@type": "Question",
        name: "Can I export the extracted tags?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can copy all tags at once, click any single tag to copy it, or download the full list as a CSV or TXT file for use in your own video.",
        },
      },
    ],
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.shopyor.com" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.shopyor.com/tools" },
      {
        "@type": "ListItem",
        position: 3,
        name: "YouTube Tags Extractor",
        item: "https://www.shopyor.com/tools/youtube-tags-extractor",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <YoutubeTagsExtractorExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.tool,
            schemas.faq,
            schemas.breadcrumb,
          ]),
        }}
      />
    </>
  );
}
