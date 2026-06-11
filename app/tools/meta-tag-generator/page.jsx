import MetaTagGeneratorClient from "./MetaTagGeneratorClient";
import Link from "next/link";
import {
  Tags,
  Share2,
  Code2,
  Gauge,
  Check,
  ClipboardPaste,
  Eye,
  PencilLine,
} from "lucide-react";

export const metadata = {
  title:
    "Free Meta Tag Generator – SEO, Open Graph & Twitter Card Tags Online",
  description:
    "Free meta tag generator with live Google & social preview. Instantly create SEO meta tags, Open Graph and Twitter Card code with title & description character counters. Copy-paste ready, no signup.",
  keywords: [
    "meta tag generator",
    "free meta tag generator",
    "seo meta tags generator",
    "open graph generator",
    "twitter card generator",
    "meta description generator",
    "html meta tags generator",
    "og tags generator",
    "meta tag generator online",
    "social media meta tags",
    "meta title and description generator",
  ],
  alternates: {
    canonical: "https://www.shopyor.com/tools/meta-tag-generator",
  },
  openGraph: {
    title: "Free Meta Tag Generator – SEO, Open Graph & Twitter Cards",
    description:
      "Generate SEO, Open Graph & Twitter Card meta tags with a live Google and social preview. Copy-paste ready. 100% free.",
    url: "https://www.shopyor.com/tools/meta-tag-generator",
    siteName: "ShopYor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Meta Tag Generator Tool",
    description:
      "Create SEO meta tags, Open Graph & Twitter Cards instantly with live preview. Free online tool.",
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
    name: "Meta Tag Generator",
    url: "https://www.shopyor.com/tools/meta-tag-generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "224",
    },
    description:
      "Free meta tag generator for SEO, Open Graph and Twitter Cards with live Google and social previews and character counters.",
  },
  howTo: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate meta tags for SEO",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter your page details",
        text: "Type your page title, meta description, URL and a social image URL.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Check the live preview",
        text: "Watch the Google search and social share previews update as you type, and stay inside the title/description character limits.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Copy the code",
        text: "Copy the generated meta tags or download them as an HTML file.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Paste into your <head>",
        text: "Paste the tags inside the <head> section of your web page.",
      },
    ],
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are meta tags and why do they matter for SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Meta tags are snippets of HTML that describe your page to search engines and social networks. The title tag and meta description shape how your page appears in Google results, while Open Graph and Twitter Card tags control how it looks when shared. Good meta tags improve click-through rate and search visibility.",
        },
      },
      {
        "@type": "Question",
        name: "What is the ideal length for a title tag and meta description?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Keep title tags around 50–60 characters and meta descriptions around 150–160 characters so Google doesn't truncate them. This tool shows a live character counter that turns green when you're in the ideal range.",
        },
      },
      {
        "@type": "Question",
        name: "What are Open Graph and Twitter Card tags?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open Graph (og:) tags control the title, description and image shown when your page is shared on Facebook, LinkedIn and most platforms. Twitter Card tags do the same for X (Twitter). Adding both ensures your links look professional everywhere they're shared.",
        },
      },
      {
        "@type": "Question",
        name: "Is this meta tag generator free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, it's 100% free with no signup and no limits. Generate, preview, copy and download as many meta tags as you need.",
        },
      },
      {
        "@type": "Question",
        name: "Where do I put the generated meta tags?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Paste the generated tags inside the <head> section of your HTML page, before the closing </head> tag. On WordPress you can add them via an SEO plugin like Yoast or Rank Math.",
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
        name: "Meta Tag Generator",
        item: "https://www.shopyor.com/tools/meta-tag-generator",
      },
    ],
  },
};

const features = [
  {
    icon: Eye,
    title: "Live Google & Social Preview",
    text: "See exactly how your page looks in Google search and when shared on Facebook, X and LinkedIn — as you type.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: Gauge,
    title: "Character Counters",
    text: "Title and description counters turn green inside the SEO-ideal range so Google never truncates your snippet.",
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    icon: Share2,
    title: "Open Graph + Twitter",
    text: "Generates SEO, Open Graph and Twitter Card tags together so your links look perfect everywhere.",
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    icon: Code2,
    title: "Copy-Paste Ready",
    text: "Clean, valid HTML you can copy or download and drop straight into your page's head section.",
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
];

const steps = [
  { icon: PencilLine, title: "Enter details", text: "Add your title, description, URL and image." },
  { icon: Eye, title: "Check preview", text: "Watch the Google & social previews update live." },
  { icon: ClipboardPaste, title: "Copy code", text: "Copy or download the generated meta tags." },
  { icon: Code2, title: "Paste in <head>", text: "Drop them into your page's head section." },
];

const tagRef = [
  { t: "Title tag", d: "The clickable headline in search results. ~50–60 characters." },
  { t: "Meta description", d: "The summary under the title. ~150–160 characters." },
  { t: "Meta robots", d: "Tells search engines to index/follow — or not." },
  { t: "og:title / og:description", d: "Title & text shown when shared on Facebook, LinkedIn, etc." },
  { t: "og:image", d: "The preview image for social shares (1200×630px ideal)." },
  { t: "twitter:card", d: "Sets the card style for X (Twitter) shares." },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.tool,
            schemas.howTo,
            schemas.faq,
            schemas.breadcrumb,
          ]),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li>/</li>
              <li><Link href="/tools" className="hover:text-blue-600">Tools</Link></li>
              <li>/</li>
              <li className="text-slate-700 dark:text-slate-200 font-medium">Meta Tag Generator</li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-200 dark:border-blue-800 mb-6">
              <Tags className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Free SEO Tool · Live preview
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-slate-100 dark:via-blue-300 dark:to-slate-100 bg-clip-text text-transparent">
              Meta Tag Generator
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Create perfect{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                SEO, Open Graph &amp; Twitter Card meta tags
              </strong>{" "}
              with a live Google and social preview. Character counters keep you
              in the ideal range — just copy and paste. Free, no signup.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-6">
              {["Live preview", "Char counters", "Open Graph + Twitter", "100% free"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tool */}
          <MetaTagGeneratorClient />

          {/* Features */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-10">
              Why use our meta tag generator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                    <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${f.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{f.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How to */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-10">
              How to generate meta tags
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">{i + 1}</span>
                    <Icon className="w-7 h-7 text-blue-600 mb-3" />
                    <h3 className="font-semibold mb-1.5">{s.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{s.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Tag reference */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-3">
              Meta tags explained
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
              Here's what each tag this tool generates actually does.
            </p>
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[480px]">
                <thead className="bg-slate-50 dark:bg-slate-700/40">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Tag</th>
                    <th className="px-5 py-3 font-semibold">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {tagRef.map((r) => (
                    <tr key={r.t} className="border-t border-slate-100 dark:border-slate-700">
                      <td className="px-5 py-3 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">{r.t}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{r.d}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Educational */}
          <section className="mt-20 grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">Why meta tags matter for SEO</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Search engines use your title tag and meta description to
                understand and display your page. A compelling, well-sized
                snippet directly improves your click-through rate — which is one
                of the strongest signals you control. Add Open Graph and Twitter
                Card tags and every share of your link turns into clean,
                branded, clickable content instead of a bare URL.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">Meta tag best practices</h2>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {[
                  "Keep titles 50–60 and descriptions 150–160 characters.",
                  "Put your main keyword near the start of the title.",
                  "Write descriptions that earn the click — not keyword stuffing.",
                  "Always set an og:image (1200×630) for social shares.",
                  "Use a unique title and description on every page.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-20 bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {schemas.faq.mainEntity.map((qa) => (
                <details key={qa.name} className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 font-semibold text-sm md:text-base">
                    {qa.name}
                    <span className="transition group-open:rotate-180 text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{qa.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">Related free SEO tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { href: "/tools/robots-txt-generator", label: "Robots.txt Generator" },
                { href: "/tools/youtube-tags-extractor", label: "YouTube Tag Generator" },
                { href: "/tools", label: "All SEO Tools" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center text-sm font-medium hover:border-blue-400 hover:text-blue-600 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Trust */}
          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-2 items-center opacity-70 text-sm font-medium">
            <span>Trusted by 20,000+ sites</span>
            <span>⭐ 4.9/5 from 220+ reviews</span>
            <span>🔒 100% free — no signup</span>
          </div>
        </div>
      </div>
    </>
  );
}
