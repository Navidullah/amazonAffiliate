import RobotsGeneratorClient from "./RobotsGeneratorClient";

export const metadata = {
  title: "Free Robots.txt Generator Tool (SEO Optimized & Easy)",
  description:
    "Create SEO-friendly robots.txt files instantly. Control search engine crawling, improve technical SEO and generate a ready-to-use robots.txt file online.",
  keywords: [
    "robots.txt generator",
    "create robots.txt file",
    "seo robots file tool",
    "robots.txt example",
    "technical seo tools",
  ],
  alternates: {
    canonical: "https://www.shopyor.com/tools/robots-txt-generator",
  },
  openGraph: {
    title: "Free Robots.txt Generator Tool",
    description:
      "Generate optimized robots.txt files instantly. Improve technical SEO and control search engine crawling.",
    url: "https://www.shopyor.com/tools/robots-txt-generator",
    siteName: "Shopyor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Robots.txt Generator Tool",
    description:
      "Create optimized robots.txt files for your website in seconds.",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a robots.txt file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A robots.txt file tells search engine crawlers which pages or sections of your website they are allowed or not allowed to crawl.",
      },
    },
    {
      "@type": "Question",
      name: "Where should I upload the robots.txt file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload the robots.txt file to the root directory of your website. Example: https://yourdomain.com/robots.txt",
      },
    },
    {
      "@type": "Question",
      name: "Does robots.txt improve SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Robots.txt helps control crawl budget and prevent indexing of unnecessary pages, improving technical SEO structure.",
      },
    },
  ],
};

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Premium Hero */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Free Robots.txt Generator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Generate an SEO-optimized robots.txt file in seconds. Control search
          engine crawling and improve your technical SEO structure.
        </p>
      </div>

      <RobotsGeneratorClient />

      {/* SEO Content Section */}
      <div className="mt-20 space-y-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold">
          Why You Need a Robots.txt File
        </h2>
        <p>
          A properly configured robots.txt file ensures search engines crawl the
          right pages while avoiding sensitive or duplicate content. This
          improves crawl efficiency and overall SEO health.
        </p>

        <h2 className="text-3xl font-semibold">Common Robots.txt Mistakes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Blocking important pages accidentally</li>
          <li>Forgetting to add sitemap reference</li>
          <li>Blocking CSS/JS resources</li>
          <li>Using incorrect syntax</li>
        </ul>
      </div>
    </div>
  );
}
