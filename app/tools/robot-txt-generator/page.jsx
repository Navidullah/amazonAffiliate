import RobotsGeneratorClient from "./RobotsGeneratorClient";

export const metadata = {
  title: "Robots.txt Generator – Create SEO Friendly Robots File Online",
  description:
    "Generate SEO optimized robots.txt files instantly. Control crawler access, add sitemap references and improve your technical SEO.",
  keywords: [
    "robots.txt generator",
    "create robots file",
    "seo robots.txt tool",
    "technical seo tools",
  ],
  alternates: {
    canonical: "https://www.shopyor.com/tools/robots-txt-generator",
  },
  openGraph: {
    title: "Robots.txt Generator Tool",
    description:
      "Create optimized robots.txt files for your website in seconds.",
    url: "https://www.shopyor.com/tools/robots-txt-generator",
    siteName: "Shopyor",
    type: "website",
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
        text: "A robots.txt file tells search engine crawlers which pages or sections of your website they can crawl or should avoid.",
      },
    },
    {
      "@type": "Question",
      name: "Where should I upload the robots.txt file?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload the robots.txt file in the root directory of your website such as https://example.com/robots.txt.",
      },
    },
    {
      "@type": "Question",
      name: "Does robots.txt improve SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Robots.txt improves technical SEO by guiding crawlers to focus on important pages and avoid unnecessary sections.",
      },
    },
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Robots.txt Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, toolSchema]),
        }}
      />

      <div className="text-center mb-14">
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Free Robots.txt Generator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create a fully optimized robots.txt file for your website in seconds.
          Control crawler access and improve your technical SEO.
        </p>
      </div>

      <RobotsGeneratorClient />

      <div className="mt-20 space-y-8 max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold">
          Why You Need a Robots.txt File
        </h2>

        <p>
          A robots.txt file guides search engine crawlers on which pages should
          be crawled and which should be avoided. Proper configuration helps
          improve crawl efficiency and protects sensitive sections of your site.
        </p>

        <h2 className="text-3xl font-semibold">Common Robots.txt Mistakes</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Blocking important pages accidentally</li>
          <li>Forgetting to include sitemap reference</li>
          <li>Incorrect syntax in directives</li>
          <li>Blocking CSS or JavaScript resources</li>
        </ul>
      </div>
    </div>
  );
}
