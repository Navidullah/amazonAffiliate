import TagsClient from "./tags-client";
import Link from "next/link";
import {
  Tag,
  Search,
  Copy,
  TrendingUp,
  Check,
  Link2,
  MousePointerClick,
  ListChecks,
  Eye,
} from "lucide-react";

export const metadata = {
  title:
    "YouTube Tags Extractor & Generator – Find Any Video's Tags Free | ShopYor",
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
    siteName: "ShopYor",
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

const features = [
  {
    icon: Search,
    title: "Reveal Hidden Tags",
    text: "YouTube hides tags from viewers — this tool surfaces every keyword a creator used in one click.",
    color: "text-purple-600",
    bg: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    icon: Eye,
    title: "Spy on Competitors",
    text: "See exactly which tags ranking videos in your niche are targeting, then craft a smarter strategy.",
    color: "text-pink-600",
    bg: "bg-pink-100 dark:bg-pink-900/30",
  },
  {
    icon: Copy,
    title: "Copy & Export",
    text: "Click any tag to copy it, copy all at once, or export the full list as CSV or TXT.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: TrendingUp,
    title: "500-Char Counter",
    text: "A live character counter keeps you inside YouTube's 500-character tag limit while you plan.",
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
];

const steps = [
  { icon: Link2, title: "Copy the link", text: "Grab the YouTube video or Shorts URL." },
  { icon: MousePointerClick, title: "Paste & extract", text: "Paste it above and click Extract Tags." },
  { icon: ListChecks, title: "Review tags", text: "See all tags, title, channel & char count." },
  { icon: Copy, title: "Copy or export", text: "Copy a tag, copy all, or download CSV/TXT." },
];

export default function Page() {
  return (
    <>
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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-purple-600">Home</Link></li>
              <li>/</li>
              <li><Link href="/tools" className="hover:text-purple-600">Tools</Link></li>
              <li>/</li>
              <li className="text-slate-700 dark:text-slate-200 font-medium">YouTube Tags Extractor</li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-800 mb-6">
              <Tag className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Free YouTube SEO Tool
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-purple-700 to-slate-900 dark:from-slate-100 dark:via-purple-300 dark:to-slate-100 bg-clip-text text-transparent">
              YouTube Tags Extractor
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Instantly{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                find and copy the tags
              </strong>{" "}
              of any YouTube video or Short. See the keywords your competitors
              rank for, then use them to boost your own YouTube SEO. Free, fast,
              no signup.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-6">
              {["See hidden tags", "Copy & export", "Shorts supported", "100% free"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tool */}
          <div className="max-w-4xl mx-auto">
            <TagsClient />
          </div>

          {/* Features */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-10">
              Why creators use this YouTube tag finder
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
              How to find the tags of any YouTube video
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">{i + 1}</span>
                    <Icon className="w-7 h-7 text-purple-600 mb-3" />
                    <h3 className="font-semibold mb-1.5">{s.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{s.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Educational */}
          <section className="mt-20 grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">What are YouTube tags?</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                YouTube tags are keywords a creator adds to a video to tell the
                algorithm what it's about. They help YouTube understand context,
                match your video to searches and suggested feeds, and connect it
                with related content. While title, thumbnail and watch time
                matter most, well-chosen tags still help — especially for
                niche topics and commonly misspelled terms.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">YouTube tag best practices</h2>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {[
                  "Put your most important tag first.",
                  "Mix broad tags with specific long-tail keywords.",
                  "Stay within YouTube's 500-character total limit.",
                  "Study ranking competitors and adapt their best tags.",
                  "Avoid irrelevant or misleading tags — they can hurt reach.",
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
            <h2 className="text-2xl font-bold text-center mb-8">Related free creator tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { href: "/tools/youtube-thumbnail", label: "YouTube Thumbnail Downloader" },
                { href: "/tools/youtube-video-downloader", label: "YouTube Video Downloader" },
                { href: "/tools", label: "All Free Tools" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center text-sm font-medium hover:border-purple-400 hover:text-purple-600 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Trust */}
          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-2 items-center opacity-70 text-sm font-medium">
            <span>Trusted by 30,000+ creators</span>
            <span>⭐ 4.8/5 from 270+ reviews</span>
            <span>🔒 100% free — no signup</span>
          </div>
        </div>
      </div>
    </>
  );
}
