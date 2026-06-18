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
  Star,
  ChevronRight,
  Home,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

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

/* ------------------------------------------------------------------ */
/*  Static page data                                                    */
/* ------------------------------------------------------------------ */

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
    text: "Generates SEO, Open Graph and Twitter Card tags together so your links look professional everywhere they're shared.",
    color: "text-violet-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    icon: Code2,
    title: "Copy-Paste Ready",
    text: "Clean, valid HTML you can copy or download and drop straight into your page's head section. No account needed.",
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
];

const steps = [
  { icon: PencilLine, title: "Enter details", text: "Add your title, description, URL and social image." },
  { icon: Eye, title: "Check preview", text: "Watch the Google & social previews update live." },
  { icon: ClipboardPaste, title: "Copy code", text: "Copy or download the generated meta tags." },
  { icon: Code2, title: "Paste in <head>", text: "Drop them into your page's head section." },
];

const tagRef = [
  { t: "title", d: "The clickable headline in Google results. Keep it 50–60 characters." },
  { t: "meta description", d: "The summary under the title. 150–160 characters for best display." },
  { t: "meta robots", d: "Tells search engines to index/follow your page — or not." },
  { t: "og:title / og:description", d: "Title & text shown on Facebook, LinkedIn and most platforms." },
  { t: "og:image", d: "Social preview image. Ideal size: 1200×630 px." },
  { t: "twitter:card", d: "Sets the card style for X (Twitter). Use summary_large_image for a big preview." },
  { t: "og:url", d: "The canonical URL of the page — prevents duplicate share tracking." },
  { t: "og:type", d: "Content type for Open Graph: website, article, product, etc." },
];

/* FAQ — same array drives both the visible Accordion and the JSON-LD */
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

/* Reviews — drives both the visible cards AND the JSON-LD Review objects */
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

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-20">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"
          >
            <Link href="/" className="flex items-center gap-1 hover:text-blue-600">
              <Home className="size-3.5" /> Home
            </Link>
            <ChevronRight className="size-3.5" />
            <Link href="/tools" className="hover:text-blue-600">
              Tools
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-slate-700 dark:text-slate-200 font-medium">
              Meta Tag Generator
            </span>
          </nav>

          {/* Hero */}
          <header className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-200 dark:border-blue-800 mb-6">
              <Tags className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Free SEO Tool · Live preview · No signup
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-slate-100 dark:via-blue-300 dark:to-slate-100 bg-clip-text text-transparent">
              Free Meta Tag Generator
            </h1>

            <div className="mb-4 flex items-center justify-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${s <= Math.round(Number(AVG_RATING)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{AVG_RATING}</span>
              <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
            </div>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Create perfect{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                SEO, Open Graph &amp; Twitter Card meta tags
              </strong>{" "}
              with a live Google search preview and social share preview.
              Character counters keep you in the ideal range — copy and paste
              straight into your{" "}
              <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                &lt;head&gt;
              </code>
              . Free, no signup.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-6">
              {[
                "Live Google preview",
                "Open Graph + Twitter",
                "Char counters",
                "100% free — no account",
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
          </header>

          {/* Tool */}
          <MetaTagGeneratorClient />

          {/* Features */}
          <section className="mt-20" aria-label="Tool features">
            <h2 className="text-3xl font-bold text-center mb-10">
              Why use this meta tag generator
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <section className="mt-20" aria-label="How to use">
            <h2 className="text-3xl font-bold text-center mb-10">
              How to generate meta tags in 2 minutes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
                  >
                    <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
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

          {/* Tag reference */}
          <section className="mt-20" aria-label="Meta tags reference">
            <h2 className="text-3xl font-bold text-center mb-3">
              Meta tags explained
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
              Here's what each tag this tool generates actually does for your
              SEO and social sharing.
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
                    <tr
                      key={r.t}
                      className="border-t border-slate-100 dark:border-slate-700"
                    >
                      <td className="px-5 py-3 font-mono text-blue-600 dark:text-blue-400 whitespace-nowrap">
                        {r.t}
                      </td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                        {r.d}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Educational */}
          <section className="mt-20 grid md:grid-cols-2 gap-8" aria-label="SEO guidance">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">
                Why meta tags matter for SEO
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Search engines use your title tag and meta description to
                understand and display your page. A compelling, well-sized
                snippet directly improves your click-through rate — one of the
                strongest ranking signals you control entirely yourself. Add Open
                Graph and Twitter Card tags and every share of your link becomes
                clean, branded, clickable content instead of a bare URL or
                auto-generated thumbnail. Pages with a complete set of meta tags
                consistently outperform those without across every major
                platform.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">
                Meta tag best practices
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                {[
                  "Keep titles 50–60 and descriptions 150–160 characters.",
                  "Put your main keyword near the start of the title.",
                  "Write descriptions that earn the click — not keyword stuffing.",
                  "Always set an og:image (1200×630) for social shares.",
                  "Use a unique title and description on every indexable page.",
                  "Match og:title and twitter:title to your page's <title> tag.",
                  "Set og:url to the canonical URL to prevent tracking fragmentation.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Separator className="mt-20" />

          {/* ---- REVIEWS ---- */}
          <section className="mt-16" aria-label="User reviews">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">What users say</h2>
              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-5 h-5 ${
                        s <= Math.round(Number(AVG_RATING))
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">{AVG_RATING}</span>
                <span className="text-sm">
                  out of 5 · {reviews.length} reviews
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {reviews.map((r, i) => (
                <article
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= r.stars
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <footer className="border-t border-slate-100 dark:border-slate-700 pt-3">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {r.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {r.role}
                    </p>
                  </footer>
                </article>
              ))}
            </div>
          </section>

          <Separator className="mt-16" />

          {/* FAQ */}
          <section
            className="mt-16 max-w-3xl mx-auto"
            aria-label="Frequently asked questions"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx + 1}`}>
                  <AccordionTrigger className="text-left text-base">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Related searches */}
          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="mb-2 text-lg font-semibold">Related searches</h2>
            <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
              People also search for these meta tag and SEO topics:
            </p>
            <ul className="flex flex-wrap gap-2">
              {[
                "free meta tag generator no signup",
                "open graph tag generator",
                "meta description generator free",
                "og image preview tool",
                "twitter card meta tags",
                "meta tag generator wordpress",
                "seo title tag generator",
                "social share meta tags",
                "html head tags generator",
                "meta robots noindex generator",
                "meta tag checker free",
                "og tag generator with live preview",
                "how to add meta tags html",
                "canonical tag generator",
                "schema markup generator free",
                "meta tag generator for blogger",
                "viewport meta tag generator",
                "meta tag generator shopify",
                "seo snippet preview tool",
                "open graph image size checker",
              ].map((kw, i) => (
                <li
                  key={i}
                  className="rounded-full border bg-slate-100/60 dark:bg-slate-800/60 px-3 py-1 text-xs text-slate-500 dark:text-slate-400 transition-colors hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
                >
                  {kw}
                </li>
              ))}
            </ul>
          </section>

          {/* Related tools */}
          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              More free SEO tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: "/tools/robots-txt-generator", label: "Robots.txt Generator" },
                { href: "/tools/youtube-tags-extractor", label: "YouTube Tag Generator" },
                { href: "/tools/image-compressor", label: "Image Compressor" },
                { href: "/tools", label: "All Free Tools" },
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

          <p className="mt-12 max-w-3xl mx-auto rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
            Meta tags are one factor in SEO — search rankings depend on many
            additional signals including content quality, backlinks, Core Web
            Vitals, and more. Use this tool as a starting point, not a complete
            SEO solution.
          </p>
        </div>
      </div>
    </>
  );
}
