import RobotsGeneratorClient from "./RobotsGeneratorClient";
import { Suspense } from "react";
import Link from "next/link";
import {
  Bot,
  ShieldCheck,
  Gauge,
  Map,
  FileCode2,
  Check,
  Upload,
  Settings2,
  Search,
  Sparkles,
  Globe,
} from "lucide-react";

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
  howToSchema: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create a robots.txt file for SEO",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Pick a template",
        text: "Click a quick-start template (WordPress, Shopify, Blogger or Block AI Bots) at the top of the generator, or start from scratch.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Enter your domain",
        text: "On the Basic tab, enter your domain so the tool auto-adds your sitemap URL.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Set your rules",
        text: "Use the Basic and Advanced tabs to choose folders to block and add custom Allow/Disallow paths and a crawl-delay.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Block AI bots",
        text: "Optionally open the AI Bots tab and toggle crawlers like GPTBot and ClaudeBot to block AI scrapers.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Copy or download",
        text: "Review the live preview and SEO validation, then copy the robots.txt or download the file.",
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Upload to root",
        text: "Upload robots.txt to your site root so it loads at yourdomain.com/robots.txt.",
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

/* --------------------------- STATIC CONTENT --------------------------- */
const features = [
  {
    icon: Bot,
    title: "Block AI Bots in One Click",
    text: "Stop GPTBot, ChatGPT, ClaudeBot, Google-Extended, CCBot & more from scraping your content for AI training — while keeping Google & Bing fully allowed.",
    color: "text-cyan-600",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
  },
  {
    icon: FileCode2,
    title: "Ready-Made Templates",
    text: "Battle-tested robots.txt presets for WordPress, Shopify, Blogger and eCommerce sites — no syntax knowledge required.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: Map,
    title: "Sitemap Integration",
    text: "Add one or many XML sitemaps so Google and Bing discover every page, post, product and image on your site.",
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    icon: Gauge,
    title: "Crawl-Budget Control",
    text: "Disallow filters, faceted navigation and parameter URLs to focus crawlers on the pages that actually rank.",
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    icon: ShieldCheck,
    title: "Live SEO Validation",
    text: "Instant warnings catch mistakes — like accidentally blocking your whole site or hiding CSS and JavaScript from Google.",
    color: "text-rose-600",
    bg: "bg-rose-100 dark:bg-rose-900/30",
  },
  {
    icon: Search,
    title: "Google Tester Link",
    text: "Jump straight to Google's robots.txt testing tool to validate your file before you deploy it.",
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
];

const steps = [
  {
    icon: Sparkles,
    title: "Pick a template",
    text: "Click a quick-start template at the top of the tool — WordPress, Shopify, Blogger or Block AI Bots — or leave it blank to build from scratch.",
  },
  {
    icon: Globe,
    title: "Enter your domain",
    text: "On the Basic tab, type your domain (e.g. example.com). The tool auto-adds your Sitemap URL and uses it across the file.",
  },
  {
    icon: Settings2,
    title: "Set your rules",
    text: "Use the Basic and Advanced tabs to toggle folders to block, add custom Disallow / Allow paths and a crawl-delay.",
  },
  {
    icon: Bot,
    title: "Block AI bots (optional)",
    text: "Open the AI Bots tab and toggle crawlers like GPTBot or ClaudeBot to keep AI scrapers out while Google stays allowed.",
  },
  {
    icon: FileCode2,
    title: "Copy or download",
    text: "Check the live preview and the SEO validation panel, then hit Copy or Download to grab your robots.txt.",
  },
  {
    icon: Upload,
    title: "Upload to your root",
    text: "Place the file in your site root so it loads at yourdomain.com/robots.txt — done.",
  },
];

const examples = [
  {
    title: "Allow everything (default)",
    code: `User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml`,
  },
  {
    title: "Block the entire site (staging)",
    code: `User-agent: *
Disallow: /`,
  },
  {
    title: "Block AI training crawlers",
    code: `User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /`,
  },
  {
    title: "WordPress recommended",
    code: `User-agent: *
Allow: /
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /?s=
Sitemap: https://example.com/sitemap_index.xml`,
  },
];

const directives = [
  {
    d: "User-agent",
    m: "Names the crawler a rule block applies to (* = all bots).",
  },
  { d: "Disallow", m: "Blocks crawlers from a path or pattern." },
  { d: "Allow", m: "Permits a path, even inside a disallowed folder." },
  { d: "Sitemap", m: "Points crawlers to your XML sitemap (absolute URL)." },
  { d: "Crawl-delay", m: "Seconds to wait between requests (Bing/Yandex)." },
  { d: "Host", m: "Declares the preferred domain (used by Yandex)." },
  { d: "* and $", m: "Wildcard for any characters, $ matches the URL end." },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.faqSchema,
            schemas.howToSchema,
            schemas.toolSchema,
            schemas.breadcrumbSchema,
          ]),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-slate-500 dark:text-slate-400 mb-6"
          >
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/tools" className="hover:text-blue-600">
                  Tools
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-700 dark:text-slate-200 font-medium">
                Robots.txt Generator
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-800 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Free SEO Tool · Now blocks AI bots
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-slate-100 dark:via-blue-300 dark:to-slate-100 bg-clip-text text-transparent">
              Robots.txt Generator
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A free{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                robots file generator
              </strong>{" "}
              that builds a custom, SEO-friendly{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                robots.txt file
              </strong>{" "}
              in seconds. Ready-made templates for WordPress, Shopify &amp;
              Blogger, sitemap support, crawl-delay control, and one-click
              blocking of AI crawlers like GPTBot &amp; ClaudeBot.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-6">
              {[
                "100% free",
                "No signup",
                "Instant download",
                "AI-bot blocking",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400"
                >
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick how-to (above the tool) */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-white/70 dark:bg-slate-800/60 backdrop-blur rounded-2xl border border-slate-200 dark:border-slate-700 p-5 md:p-6">
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                How to use this robots.txt generator
              </h2>
              <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {steps.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {s.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {s.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Tool */}
          <Suspense
            fallback={
              <div className="text-center py-20 text-slate-500">
                Loading generator…
              </div>
            }
          >
            <RobotsGeneratorClient />
          </Suspense>

          {/* Features */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-3">
              Everything you need for a perfect robots.txt
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
              Built for SEOs, bloggers and store owners who want technical SEO
              done right — without editing files by hand.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
                  >
                    <div
                      className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <Icon className={`w-6 h-6 ${f.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {f.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How to */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-3">
              How to make a robots.txt file step by step
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
              Follow these six steps to generate and publish your robots.txt
              with the tool above.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
                  >
                    <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                      {i + 1}
                    </span>
                    <Icon className="w-7 h-7 text-blue-600 mb-3" />
                    <h3 className="font-semibold mb-1.5">{s.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {s.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Examples */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-3">
              Robots.txt examples for SEO
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
              Copy-paste starting points for the most common setups. Generate
              your own customized version with the tool above.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {examples.map((ex) => (
                <div
                  key={ex.title}
                  className="bg-slate-900 dark:bg-slate-950 rounded-2xl border border-slate-700 overflow-hidden"
                >
                  <div className="px-5 py-3 border-b border-slate-700/70 bg-slate-800/40 text-sm font-medium text-slate-200">
                    {ex.title}
                  </div>
                  <pre className="text-xs sm:text-sm font-mono text-emerald-400 p-5 overflow-x-auto whitespace-pre-wrap">
                    {ex.code}
                  </pre>
                </div>
              ))}
            </div>
          </section>

          {/* Directives reference */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-10">
              Robots.txt directives explained
            </h2>
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700/40">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Directive</th>
                    <th className="px-5 py-3 font-semibold">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {directives.map((row) => (
                    <tr
                      key={row.d}
                      className="border-t border-slate-100 dark:border-slate-700"
                    >
                      <td className="px-5 py-3 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        {row.d}
                      </td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                        {row.m}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Educational copy */}
          <section className="mt-20 grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">
                What is a robots.txt file?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Robots.txt is a simple text file placed in the root of your
                website that follows the Robots Exclusion Protocol. It tells
                search engine crawlers — and now AI scrapers — which areas of
                your site they are allowed to request. A well-built robots.txt
                protects your crawl budget, keeps duplicate and low-value URLs
                out of crawling, and is one of the foundations of technical SEO.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">
                Robots.txt best practices
              </h2>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {[
                  "Always include your XML sitemap URL.",
                  "Never block CSS or JavaScript — Google needs them to render.",
                  "Use Disallow for filters, search and parameter URLs.",
                  "Block AI bots separately to keep search engines allowed.",
                  "Keep the file under 500 KB and test before deploying.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Google-specific */}
          <section className="mt-20 grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">
                Robots.txt generator for Google (Googlebot)
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                This robots file generator produces a file Googlebot reads
                exactly the way Google documents it. Add your sitemap so Google
                discovers every URL, keep CSS and JavaScript allowed so Google
                can render your pages, and use Disallow only for the sections
                you truly want kept out of crawling. Remember that Googlebot
                ignores crawl-delay — set your crawl rate in Google Search
                Console instead — and that blocking a URL here stops crawling
                but does not remove an already-indexed page (use a noindex tag
                for that).
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">
                Robot file generator for any platform
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Whether you call it a robots file generator, a robot file
                generator or a robots.txt maker, the goal is the same: a clean,
                valid file at the root of your domain. Pick a WordPress, Shopify
                or Blogger template above, generate your file, and validate it
                with the built-in SEO checks before you upload it to{" "}
                <span className="font-mono">yourdomain.com/robots.txt</span>.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-20 bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {schemas.faqSchema.mainEntity.map((qa) => (
                <details key={qa.name} className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 font-semibold text-sm md:text-base">
                    {qa.name}
                    <span className="transition group-open:rotate-180 text-slate-400">
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
                  <p className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                    {qa.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">
              Related free SEO tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                {
                  href: "/tools/meta-tag-generator",
                  label: "Meta Tag Generator",
                },
                { href: "/tools/youtube-tags-extractor", label: "YouTube Tag Generator" },
                { href: "/tools", label: "All SEO Tools" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Trust */}
          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-2 items-center opacity-70 text-sm font-medium">
            <span>Trusted by 25,000+ websites</span>
            <span>⭐ 4.9/5 from 300+ reviews</span>
            <span>🔒 100% free — no credit card</span>
          </div>
        </div>
      </div>
    </>
  );
}
