import MetaTagGeneratorExperience from "./MetaTagGeneratorExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/meta-tag-generator`;

export const metadata = {
  title: {
    absolute:
      "Free Meta Tag Generator — Live Google & Social Preview | Shopyor",
  },
  description:
    "Generate SEO, Open Graph & Twitter Card meta tags with a live Google preview. Free, no signup. Character counters, social share preview, copy-paste HTML.",
  keywords: [
    "free meta tag generator with live preview",
    "meta tag generator no signup",
    "open graph meta tag generator",
    "meta tag generator online free",
    "seo meta tag generator",
    "twitter card generator free",
    "meta description generator free",
    "og tag generator with preview",
    "meta tag generator for website",
    "html meta tags generator copy paste",
    "meta title and description generator free",
    "open graph preview tool free",
    "meta robots tag generator",
    "social media meta tag generator",
    "free seo tag generator no account",
    "meta tag generator wordpress",
    "how to generate meta tags for my website",
    "meta tag checker and generator",
    "og image preview generator",
    "free meta tag tool no watermark",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "seo-tools",
  classification: "Free meta tag generator for SEO and social sharing",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "x-default": PAGE_URL,
      en: PAGE_URL,
      "en-US": PAGE_URL,
      "en-GB": PAGE_URL,
      "en-IN": PAGE_URL,
      "en-PK": PAGE_URL,
      "en-NG": PAGE_URL,
      "en-PH": PAGE_URL,
      "en-CA": PAGE_URL,
      "en-AU": PAGE_URL,
      "en-ZA": PAGE_URL,
    },
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_US",
    title: "Free Meta Tag Generator — Live Google & Social Preview",
    description:
      "Generate SEO, Open Graph & Twitter Card meta tags with a live Google search preview and social share preview. Free, no signup, copy-paste ready.",
    images: [
      {
        url: `${BASE_URL}/images/meta-tag-generator-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor Free Meta Tag Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Meta Tag Generator — Live Google & Social Preview | Shopyor",
    description:
      "SEO, Open Graph & Twitter Card tags with live preview. Free, no signup, copy-paste HTML.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/meta-tag-generator-og.png`],
  },
};

/* FAQ — same array drives the JSON-LD (visible copy lives in
   MetaTagGeneratorExperience.jsx, kept in sync 1:1) */
const faq = [
  {
    q: "What are meta tags and why do they matter for SEO?",
    a: "Meta tags are snippets of HTML inside your page's <head> that describe the page to search engines and social networks. The title tag and meta description directly shape how your page appears in Google results, while Open Graph and Twitter Card tags control how it looks when shared. Well-written meta tags improve click-through rate — one of the few SEO factors you control completely.",
  },
  {
    q: "What is the ideal length for a title tag and meta description?",
    a: "Keep title tags between 50 and 60 characters and meta descriptions between 150 and 160 characters. Google truncates longer ones with an ellipsis, which cuts off your message. The character counters in this tool turn green when you're inside the ideal range, so you always know before you publish.",
  },
  {
    q: "What are Open Graph and Twitter Card tags?",
    a: "Open Graph (og:) tags control the title, description, and image shown when your page is shared on Facebook, LinkedIn, WhatsApp, and most platforms. Twitter Card tags do the same for X (Twitter). Adding both ensures your links look polished everywhere — rather than a bare URL or auto-generated thumbnail.",
  },
  {
    q: "Is this meta tag generator really free?",
    a: "Yes, completely free. No signup, no account, no usage limits, and no watermark on the downloaded HTML file. Generate and copy as many sets of meta tags as you need.",
  },
  {
    q: "Where do I put the generated meta tags?",
    a: "Paste the generated tags inside the <head> section of your HTML page, before the closing </head> tag. On WordPress you can add them via an SEO plugin (Yoast, Rank Math) using their 'Additional head code' field, or directly in your theme's header.php.",
  },
  {
    q: "Do meta keywords tags still matter for SEO?",
    a: "No. Google has officially ignored the meta keywords tag since 2009. Bing and most other major search engines also disregard it. Including keywords in your title, description, and on-page content is what actually influences rankings. The meta keywords field in this tool is optional and only kept for legacy CMS compatibility.",
  },
  {
    q: "How do I check if my meta tags are working?",
    a: "After publishing, paste your URL into Google Search Console's URL Inspection tool to see how Googlebot reads your page. For social previews, use Facebook's Sharing Debugger, LinkedIn's Post Inspector, or X's Card Validator. You can also re-paste your live URL into this tool's URL field to verify the output looks correct.",
  },
  {
    q: "Can I use the same meta description on multiple pages?",
    a: "No. Duplicate meta descriptions are a common SEO mistake. Google may rewrite them or discount them entirely if it detects duplicates across your site. Write a unique, page-specific description for every indexable page — it is one of the fastest wins for improving click-through rates across your whole site.",
  },
];

/* Reviews — drives the JSON-LD Review objects (visible copy lives in
   MetaTagGeneratorExperience.jsx, kept in sync 1:1) */
const reviews = [
  {
    name: "Sarah K.",
    role: "Freelance SEO Consultant",
    stars: 5,
    text: "The live Google preview is a game changer. I can see exactly how my title gets cut off before I publish — no more guessing in the dark.",
  },
  {
    name: "Dev M.",
    role: "Full-Stack Developer",
    stars: 5,
    text: "Finally a free tool that generates SEO, Open Graph, and Twitter Card tags together in one go. Saves me 10 minutes per page.",
  },
  {
    name: "Priya T.",
    role: "Content Manager",
    stars: 5,
    text: "The character counters turning green when I'm in the right range is such a small detail but incredibly useful. I use this on every page I publish.",
  },
  {
    name: "James O.",
    role: "Blogger",
    stars: 5,
    text: "No signup, copy-paste ready HTML, no watermark on the download. Does exactly what it says with nothing to get in the way.",
  },
  {
    name: "Ana L.",
    role: "Small Business Owner",
    stars: 4,
    text: "Easy to use for my WordPress site. I paste the output straight into Yoast's additional head code field and it works every time.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.stars, 0) / reviews.length
).toFixed(1);

export default function MetaTagGeneratorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Free Meta Tag Generator",
        url: PAGE_URL,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free meta tag generator with live Google search preview and social share preview. Generates SEO title, meta description, Open Graph and Twitter Card tags with character counters. Copy-paste HTML, no signup.",
        featureList: [
          "Live Google SERP preview updates as you type",
          "Live social share (Open Graph) preview for Facebook, LinkedIn, X",
          "Character counters with green/amber/red SEO-ideal range indicator",
          "Generates SEO, Open Graph and Twitter Card tags together",
          "Robots tag (index/noindex) toggle",
          "Copy to clipboard or download as HTML file",
          "Free with no signup and no watermark",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: AVG_RATING,
          reviewCount: String(reviews.length),
          bestRating: "5",
          worstRating: "1",
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.stars),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: r.text,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${BASE_URL}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Meta Tag Generator",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <MetaTagGeneratorExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
