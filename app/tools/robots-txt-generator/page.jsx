import RobotsGeneratorClient from "./RobotsGeneratorClient";
import { Suspense } from "react";

// Enhanced metadata for better SEO
export const metadata = {
  title:
    "Robots.txt Generator – Create SEO Friendly Robots File Online | Free Tool",
  description:
    "Free professional robots.txt generator tool. Create optimized robots.txt files with sitemap support, crawl delay, and advanced directives. Improve your technical SEO instantly.",
  keywords: [
    "robots.txt generator",
    "create robots file",
    "seo robots.txt tool",
    "technical seo tools",
    "robots.txt creator",
    "free seo tools",
    "crawl delay generator",
    "sitemap robots.txt",
    "googlebot directives",
  ],
  alternates: {
    canonical: "https://www.shopyor.com/tools/robots-txt-generator",
  },
  openGraph: {
    title: "Free Robots.txt Generator - Create SEO Optimized Robot Files",
    description:
      "Generate professional robots.txt files in seconds. Control crawler access, add sitemaps, and improve your technical SEO strategy.",
    url: "https://www.shopyor.com/tools/robots-txt-generator",
    siteName: "Shopyor",
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
    title: "Free Robots.txt Generator - SEO Tool",
    description:
      "Create optimized robots.txt files instantly. Free professional SEO tool.",
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

// Enhanced Schema markup for better visibility
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
          text: "A robots.txt file tells search engine crawlers which pages or sections of your website they can or cannot crawl. It's essential for controlling crawler access, managing crawl budget, and preventing search engines from indexing sensitive or duplicate content.",
        },
      },
      {
        "@type": "Question",
        name: "Where should I upload the robots.txt file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Upload the robots.txt file to your website's root directory (e.g., https://yourdomain.com/robots.txt). It must be accessible at this exact location for search engines to find it.",
        },
      },
      {
        "@type": "Question",
        name: "What is crawl delay and when should I use it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Crawl delay tells search engine bots to wait a specified number of seconds between requests. Use it if your server is struggling with crawl traffic or if you have a large site that needs controlled crawling.",
        },
      },
      {
        "@type": "Question",
        name: "Can I have multiple sitemaps in robots.txt?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can include multiple sitemap directives in your robots.txt file. This is useful for large websites with different sitemaps for different content types like products, blog posts, or images.",
        },
      },
      {
        "@type": "Question",
        name: "Does blocking pages in robots.txt remove them from Google?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, robots.txt prevents crawling but doesn't guarantee removal from search results. Use noindex meta tags or password protection for pages you want completely removed from search engines.",
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
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "152",
    },
    featuredIn: "https://www.shopyor.com/tools",
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800 mb-6">
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🔧 Free SEO Tool
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-slate-100 dark:via-blue-300 dark:to-slate-100 bg-clip-text text-transparent">
              Robots.txt Generator
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-4">
              Create professional, SEO-optimized robots.txt files in seconds.
              Control crawler access, manage crawl budget, and improve your
              technical SEO.
            </p>

            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Instant download</span>
              </div>
            </div>
          </div>

          {/* Main Tool */}
          <Suspense
            fallback={
              <div className="text-center py-20">Loading awesome tool...</div>
            }
          >
            <RobotsGeneratorClient />
          </Suspense>

          {/* Features Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Google Bot Specific
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Create rules specifically for Googlebot, Bingbot, and other
                major search engines.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Sitemap Integration
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Automatically add sitemap references and support multiple
                sitemap files.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Crawl Optimization</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Optimize your crawl budget with crawl-delay directives and smart
                blocking rules.
              </p>
            </div>
          </div>

          {/* Educational Content */}
          <div className="mt-20 prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Master Your Technical SEO with Robots.txt
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">
                  What is Robots.txt?
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Robots.txt is a critical file that instructs search engine
                  crawlers which pages to crawl and which to avoid. It's the
                  first line of defense in controlling how search engines
                  interact with your website.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                  <li>Always include sitemap reference</li>
                  <li>Don't block important resources (CSS, JS)</li>
                  <li>Use specific user-agents for better control</li>
                  <li>Test your robots.txt before deploying</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 font-semibold">
                  How do I test my robots.txt file?
                  <span className="transition group-open:rotate-180">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="p-4 text-slate-600 dark:text-slate-300">
                  Use Google Search Console's robots.txt Tester tool or our
                  built-in testing feature to validate your file before
                  deployment.
                </p>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 font-semibold">
                  Can I block specific search engines?
                  <span className="transition group-open:rotate-180">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="p-4 text-slate-600 dark:text-slate-300">
                  Yes, use specific user-agent directives like "User-agent:
                  Googlebot" or "User-agent: Bingbot" to target individual
                  crawlers.
                </p>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 font-semibold">
                  What's the difference between robots.txt and meta robots?
                  <span className="transition group-open:rotate-180">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="p-4 text-slate-600 dark:text-slate-300">
                  Robots.txt controls crawling at the directory level, while
                  meta robots tags control indexing at the page level. Use both
                  for comprehensive control.
                </p>
              </details>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              <span className="text-sm font-medium">
                Trusted by 10,000+ websites
              </span>
              <span className="text-sm font-medium">
                ⭐ 4.8/5 from 150+ reviews
              </span>
              <span className="text-sm font-medium">
                🔒 100% Free. No credit card
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
