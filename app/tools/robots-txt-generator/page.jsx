import RobotsTxtGeneratorExperience from "./RobotsTxtGeneratorExperience";

/* --------------------------- SEO METADATA --------------------------- */
export const metadata = {
  title:
    "Robots.txt Generator – Free Custom Robots.txt Maker for SEO (Block AI Bots)",
  description:
    "Free robots.txt generator to create a custom, SEO-friendly robots.txt file in seconds. WordPress, Shopify & Blogger templates, sitemap support, crawl-delay, and one-click blocking of AI bots like GPTBot, ChatGPT & ClaudeBot. No signup.",
  keywords: [
    "robots.txt generator",
    "robots file generator",
    "robot file generator",
    "robots txt generator google",
    "google robots.txt generator",
    "custom robots.txt generator",
    "robots.txt generator for blogger",
    "robots.txt generator for wordpress",
    "robots.txt generator for shopify",
    "free robots.txt generator",
    "robots txt file generator",
    "create robots.txt file online",
    "robots.txt maker",
    "block ai bots robots.txt",
    "block gptbot robots.txt",
    "how to block chatgpt from website",
    "robots.txt for seo",
    "crawl delay generator",
    "sitemap robots.txt generator",
    "googlebot disallow generator",
    "robots.txt example for seo",
    "generate robots.txt shopyor",
    "online robots.txt shopyor",
    "online robots.txt shopyor",
    "robots.txt example shopyor",
    "robots.txt validator shopyor",
    "robots.txt file shopyor",
  ],
  alternates: {
    canonical: "https://www.shopyor.com/tools/robots-txt-generator",
  },
  openGraph: {
    title: "Free Robots.txt Generator – Custom SEO Robots File + Block AI Bots",
    description:
      "Generate an SEO-optimized robots.txt in seconds. Templates for WordPress, Shopify & Blogger, sitemap support, and one-click blocking of GPTBot, ClaudeBot & other AI crawlers.",
    url: "https://www.shopyor.com/tools/robots-txt-generator",
    siteName: "ShopYor",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.shopyor.com/og/robots-generator.jpg",
        width: 1200,
        height: 630,
        alt: "Robots.txt Generator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Robots.txt Generator – Custom SEO Robots File",
    description:
      "Create an optimized robots.txt instantly. Templates, sitemaps & block AI bots like GPTBot and ClaudeBot. 100% free.",
    images: ["https://www.shopyor.com/og/robots-generator.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* --------------------------- STRUCTURED DATA --------------------------- */
const schemas = {
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a robots.txt file and why do I need it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A robots.txt is a plain-text file in your site's root that tells search engine crawlers which URLs they may or may not request. It controls crawler access, protects your crawl budget, and keeps low-value or duplicate pages out of crawling.",
        },
      },
      {
        "@type": "Question",
        name: "How do I create a custom robots.txt file for my website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pick a template (WordPress, Shopify, Blogger or Custom) in the generator above, add your domain and sitemap, choose which folders or AI bots to block, then copy or download the file and upload it to your root directory at yourdomain.com/robots.txt.",
        },
      },
      {
        "@type": "Question",
        name: "How do I block AI bots like GPTBot and ChatGPT in robots.txt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Add a User-agent block for each AI crawler (GPTBot, ChatGPT-User, ClaudeBot, Google-Extended, CCBot, PerplexityBot and more) followed by 'Disallow: /'. Use the 'Block AI Bots' template above to add all of them with one click while keeping Google and Bing allowed.",
        },
      },
      {
        "@type": "Question",
        name: "Where should I upload the robots.txt file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Upload it to the root of your domain so it is reachable at https://yourdomain.com/robots.txt. Search engines only read robots.txt from the root — it will not work inside a sub-folder.",
        },
      },
      {
        "@type": "Question",
        name: "Does blocking a page in robots.txt remove it from Google?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Robots.txt blocks crawling but does not guarantee removal. A blocked URL can still appear in search results without a snippet. To remove a page from the index, use a noindex meta tag (and allow crawling) or password-protect it.",
        },
      },
      {
        "@type": "Question",
        name: "Does Googlebot respect the crawl-delay directive?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Googlebot ignores crawl-delay; set the crawl rate in Google Search Console instead. Bing, Yahoo and Yandex do honor crawl-delay, so it is still useful for those engines.",
        },
      },
    ],
  },
  toolSchema: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Robots.txt Generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "318",
    },
  },
  breadcrumbSchema: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.shopyor.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://www.shopyor.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Robots.txt Generator",
        item: "https://www.shopyor.com/tools/robots-txt-generator",
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <RobotsTxtGeneratorExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.faqSchema,
            schemas.toolSchema,
            schemas.breadcrumbSchema,
          ]),
        }}
      />
    </>
  );
}
