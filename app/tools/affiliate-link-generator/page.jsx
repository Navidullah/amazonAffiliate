import Link from "next/link";
import AffiliateLinkGeneratorClient from "@/app/components/affiliateLinkGenerator/AffiliateLinkGeneratorClient";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Home, Star } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/affiliate-link-generator`;

export const metadata = {
  title: {
    absolute:
      "Amazon Affiliate Link Generator — Free, No SiteStripe | Shopyor",
  },
  description:
    "Free Amazon affiliate link generator. Convert any Amazon URL or ASIN into a clean affiliate link with your Associate Tag — no SiteStripe, no API. Supports 19 Amazon marketplaces.",
  keywords: [
    "amazon affiliate link generator free no signup",
    "convert amazon link to affiliate link",
    "amazon affiliate link without sitestripe",
    "amazon affiliate link generator from asin",
    "clean amazon affiliate link generator",
    "amazon associate tag link generator",
    "add affiliate tag to amazon link",
    "amazon affiliate url builder free",
    "make amazon affiliate link from product url",
    "amazon affiliate link generator without api",
    "amazon product link with associate id",
    "amazon affiliate link for any region",
    "amazon affiliate link generator for youtube",
    "amazon affiliate link for instagram bio",
    "how to create amazon affiliate link free",
    "amazon associates link builder online",
    "amazon affiliate link generator uk india",
    "shorten amazon affiliate link free",
    "amazon affiliate link with custom tag",
    "amazon affiliate link generator mobile",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "Amazon affiliate link generator tool",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "x-default": PAGE_URL,
      en: PAGE_URL,
      "en-US": PAGE_URL,
      "en-GB": PAGE_URL,
      "en-IN": PAGE_URL,
      "en-PK": PAGE_URL,
      "en-CA": PAGE_URL,
      "en-AU": PAGE_URL,
      "en-NG": PAGE_URL,
      "en-PH": PAGE_URL,
      "en-ZA": PAGE_URL,
    },
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Free Amazon Affiliate Link Generator (No SiteStripe)",
    description:
      "Convert any Amazon URL or ASIN into a clean affiliate link with your own Associate Tag. Free, fast, and supports 19 Amazon marketplaces.",
    siteName: "Shopyor",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/images/affiliate-link-og.png`,
        width: 1200,
        height: 630,
        alt: "Amazon Affiliate Link Generator Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Affiliate Link Generator (Free, No SiteStripe) | Shopyor",
    description:
      "Create clean Amazon affiliate links with your own Associate Tag from any product URL or ASIN. Free, supports all major regions.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/affiliate-link-og.png`],
  },
};

/* ------------------------------------------------------------------ */
/*  Static page data                                                    */
/* ------------------------------------------------------------------ */

const KEYWORDS = [
  "amazon affiliate link generator free no signup",
  "convert amazon link to affiliate link",
  "amazon affiliate link without sitestripe",
  "amazon affiliate link from asin",
  "clean amazon affiliate link",
  "add affiliate tag to amazon link",
  "amazon associate tag link builder",
  "amazon affiliate url builder",
  "make amazon affiliate link from url",
  "amazon affiliate link generator without api",
  "amazon affiliate link for youtube",
  "amazon affiliate link for instagram bio",
  "amazon affiliate link generator mobile",
  "amazon affiliate link generator uk india",
  "shorten amazon affiliate link",
  "amazon associates link builder online",
  "amazon affiliate link generator for bloggers",
  "amazon product link with associate id",
  "amazon affiliate link generator for any region",
  "free affiliate link builder amazon",
];

/* FAQ — same array drives visible Accordion AND JSON-LD */
const faq = [
  {
    q: "How do I create an Amazon affiliate link?",
    a: "Paste any Amazon product URL into the tool above, enter your Amazon Associate Tag (for example yoursite-20), and click Generate. The tool extracts the product's ASIN and builds a clean affiliate link in the format https://amazon.com/dp/ASIN?tag=yourtag that tracks your commissions.",
  },
  {
    q: "Can I create an Amazon affiliate link without SiteStripe?",
    a: "Yes. SiteStripe is Amazon's on-site toolbar, but you don't need it here. As long as you have an approved Amazon Associates account and your tracking ID (Associate Tag), this generator builds the same trackable link from any product URL or ASIN — useful on mobile or when SiteStripe isn't showing.",
  },
  {
    q: "How do I convert a normal Amazon link into an affiliate link?",
    a: "Copy the product page URL from Amazon, paste it into the field above, and add your Associate Tag. The tool strips any existing tracking parameters and someone else's tag, then attaches your own tag so the commission is credited to you.",
  },
  {
    q: "Can I generate an affiliate link from an ASIN?",
    a: "Yes. If your URL contains a 10-character ASIN (such as B0XXXXXXXY) in the path or as an asin= parameter, the tool detects it automatically and rebuilds a clean /dp/ASIN link with your tag attached — no manual editing required.",
  },
  {
    q: "Which Amazon regions and marketplaces are supported?",
    a: "The generator supports 19 marketplaces, including amazon.com, amazon.co.uk, amazon.de, amazon.ca, amazon.in, amazon.fr, amazon.it, amazon.es, amazon.co.jp, amazon.com.au, amazon.com.br, amazon.com.mx, amazon.sg, amazon.ae, amazon.sa, amazon.nl, amazon.se, amazon.pl, and amazon.tr. Remember to use the Associate Tag that belongs to that specific marketplace.",
  },
  {
    q: "Is this Amazon affiliate link generator free?",
    a: "Yes, it is completely free with no signup and no limits. The link is built right in your browser, and your Associate Tag is only stored locally on your device if you tick 'Remember my tag'.",
  },
  {
    q: "Why should I use a clean affiliate link instead of a long one?",
    a: "Short, clean /dp/ASIN?tag= links look more professional, are easier to share on YouTube, social media, or a blog, and avoid the spammy appearance of long URLs packed with tracking parameters. They also reduce the chance of a broken or mistracked link.",
  },
  {
    q: "Will my Associate Tag be saved or shared?",
    a: "Your tag is never sent to our servers. If you enable 'Remember my tag on this device', it is stored only in your browser's local storage so you don't have to retype it. Untick the box to remove it.",
  },
];

/* Reviews — drives both the visible cards AND the JSON-LD Review objects */
const reviews = [
  {
    name: "Leila K.",
    role: "YouTube Creator",
    stars: 5,
    text: "SiteStripe never works on my phone. This tool lets me generate clean Amazon affiliate links in seconds without needing the toolbar — exactly what I was looking for.",
  },
  {
    name: "Omar S.",
    role: "Affiliate Blogger",
    stars: 5,
    text: "I use this for every product roundup I write. Paste the URL, hit generate, done. It's the fastest way to go from an Amazon product to a ready-to-use affiliate link.",
  },
  {
    name: "Priya M.",
    role: "Instagram Influencer",
    stars: 5,
    text: "Clean, short affiliate links look so much better in an Instagram bio than massive Amazon URLs. This tool is bookmarked on every device I own.",
  },
  {
    name: "James T.",
    role: "UK Affiliate Marketer",
    stars: 5,
    text: "Great that it supports amazon.co.uk — most tools only do .com. My UK associate tag works perfectly. Saves me building links manually.",
  },
  {
    name: "Fatima A.",
    role: "Content Creator",
    stars: 4,
    text: "Needed to update dozens of old Amazon links with my affiliate tag. Doing them one by one was still faster than using SiteStripe. Clean output every time.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.stars, 0) / reviews.length
).toFixed(1);

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function AffiliateLinkGeneratorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Amazon Affiliate Link Generator",
        url: PAGE_URL,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online Amazon affiliate link generator that converts any product URL or ASIN into a clean affiliate link with your own Associate Tag. No SiteStripe or API required. Supports 19 Amazon marketplaces.",
        featureList: [
          "Convert any Amazon URL into a clean affiliate link",
          "Build links from an ASIN automatically",
          "Add your own Amazon Associate Tag",
          "Strips old tags and tracking parameters",
          "Supports 19 Amazon marketplaces",
          "Optional 'Remember my tag' via browser localStorage",
          "Free, no signup, runs entirely in your browser",
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
            name: "Amazon Affiliate Link Generator",
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
    <div className="bg-background mx-auto max-w-3xl px-4 pt-6 md:pt-8 pb-20">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Link href="/" className="flex items-center gap-1 hover:text-foreground">
          <Home className="size-3.5" /> Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href="/tools" className="hover:text-foreground">
          Tools
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">Affiliate Link Generator</span>
      </nav>

      {/* Intro */}
      <header className="mb-6 space-y-3">
        <span className="inline-flex items-center rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          Free • No SiteStripe • No signup • 19 marketplaces
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Amazon Affiliate Link Generator
        </h1>
        <div className="flex items-center gap-1.5">
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
        <p className="text-sm text-muted-foreground sm:text-base">
          Convert any Amazon product URL or ASIN into a clean affiliate link
          with your own Associate Tag. No SiteStripe, no API, no signup — just
          paste, generate, and copy.
        </p>
      </header>

      <AffiliateLinkGeneratorClient />

      <Separator className="my-10" />

      {/* Article */}
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-3">
        <h2>What is an Amazon affiliate link generator?</h2>
        <p>
          An Amazon affiliate link generator turns a normal Amazon product URL
          into a trackable affiliate link that carries your{" "}
          <strong>Associate Tag</strong>. When someone buys through that link,
          the commission is credited to your Amazon Associates account. This
          tool builds those links instantly — entirely in your browser — so you
          can <strong>convert an Amazon link to an affiliate link</strong>{" "}
          without SiteStripe or the Product Advertising API.
        </p>

        <h2>How to create an Amazon affiliate link (step by step)</h2>
        <ol>
          <li>
            <strong>Enter your Associate Tag</strong> — your Amazon Associates
            tracking ID, for example <code>yoursite-20</code>. Tick{" "}
            &ldquo;Remember my tag&rdquo; to avoid retyping it each visit.
          </li>
          <li>
            <strong>Paste the product URL</strong> — copy any Amazon product
            page link (or one that contains an ASIN) and paste it in. A raw
            10-character ASIN works too.
          </li>
          <li>
            <strong>Generate and copy</strong> — the tool extracts the ASIN,
            removes old tags, and outputs a clean{" "}
            <code>/dp/ASIN?tag=yourtag</code> link ready to share in a blog,
            YouTube description, or social bio.
          </li>
        </ol>

        <h2>Convert an Amazon link to an affiliate link without SiteStripe</h2>
        <p>
          SiteStripe is Amazon&rsquo;s built-in toolbar, but it isn&rsquo;t
          always available — especially on mobile, inside apps, or when Amazon
          rolls out UI changes. As long as you have an approved Associates
          account and your tag, this generator produces the same trackable link
          from any product URL. That makes it a practical{" "}
          <strong>Amazon affiliate link generator without the API</strong> for
          quick link-building anywhere.
        </p>

        <h2>Generate an affiliate link from an ASIN</h2>
        <p>
          Every Amazon product has a unique 10-character{" "}
          <strong>ASIN</strong> (for example <code>B0XXXXXXXY</code>). If your
          link contains an ASIN in its path or as an <code>asin=</code>{" "}
          parameter, the tool detects it automatically and rebuilds a tidy{" "}
          <code>/dp/ASIN</code> link with your tag attached — no manual editing
          required.
        </p>

        <h2>Supported Amazon marketplaces</h2>
        <p>
          The generator works across 19 regions, so you can build a link for
          the right store every time:
        </p>
        <div className="not-prose flex flex-wrap gap-2">
          {[
            "amazon.com",
            "amazon.co.uk",
            "amazon.de",
            "amazon.ca",
            "amazon.in",
            "amazon.fr",
            "amazon.it",
            "amazon.es",
            "amazon.co.jp",
            "amazon.com.au",
            "amazon.com.br",
            "amazon.com.mx",
            "amazon.sg",
            "amazon.ae",
            "amazon.sa",
            "amazon.nl",
            "amazon.se",
            "amazon.pl",
            "amazon.tr",
          ].map((d) => (
            <span
              key={d}
              className="rounded-lg border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {d}
            </span>
          ))}
        </div>
        <p className="mt-3">
          Use the Associate Tag that belongs to the same marketplace you are
          linking to — a US tag works on <code>amazon.com</code>, a UK tag on{" "}
          <code>amazon.co.uk</code>, and so on. Running multiple regional
          programmes? Generate separate links for each and use a
          localisation tool like Amazon OneLink to serve the right region
          automatically.
        </p>

        <h2>Where to share Amazon affiliate links</h2>
        <ul>
          <li>
            <strong>Blog posts &amp; product reviews:</strong> clean{" "}
            <code>/dp/ASIN?tag=</code> links are less intimidating than long
            URLs and reduce link-checker false positives.
          </li>
          <li>
            <strong>YouTube descriptions:</strong> short affiliate links fit
            neatly in pinned comments and description boxes.
          </li>
          <li>
            <strong>Instagram &amp; TikTok bio:</strong> place a single
            collection link (e.g. Linktree) and use individual clean affiliate
            links behind each product button.
          </li>
          <li>
            <strong>Email newsletters:</strong> clean links look professional
            and pass through most spam filters more reliably.
          </li>
          <li>
            <strong>Telegram &amp; WhatsApp:</strong> paste directly — the
            preview card loads correctly from a standard Amazon product URL.
          </li>
        </ul>

        <h2>Why use clean affiliate links?</h2>
        <ul>
          <li>
            <strong>More clicks:</strong> short, tidy links look trustworthy
            and improve click-through rates.
          </li>
          <li>
            <strong>Accurate tracking:</strong> removing old tags and stray
            parameters means the commission is credited correctly to you.
          </li>
          <li>
            <strong>Avoids broken links:</strong> long URLs with dozens of
            parameters sometimes break when copied across platforms.
          </li>
        </ul>

        <h2>Frequently asked questions</h2>
        <div className="not-prose">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx + 1}`}>
                <AccordionTrigger className="text-left text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </article>

      <Separator className="my-10" />

      {/* ---- REVIEWS ---- */}
      <section aria-label="User reviews">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-bold">What users say</h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`size-5 ${
                    s <= Math.round(Number(AVG_RATING))
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">
              {AVG_RATING}
            </span>
            <span className="text-sm">
              out of 5 &middot; {reviews.length} reviews
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="rounded-2xl border bg-muted/20 p-5 hover:bg-muted/40 transition-colors"
            >
              <div className="mb-3 flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`size-4 ${
                      s <= r.stars
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="mb-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <footer className="border-t pt-3">
                <p className="text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </footer>
            </article>
          ))}
        </div>
      </section>

      {/* Related searches */}
      <section className="mt-12">
        <h2 className="mb-2 text-lg font-semibold">Related searches</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          People also look for these Amazon affiliate topics:
        </p>
        <ul className="flex flex-wrap gap-2">
          {KEYWORDS.map((kw, i) => (
            <li
              key={i}
              className="rounded-full border bg-muted/30 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/60"
            >
              {kw}
            </li>
          ))}
        </ul>
      </section>

      {/* More free tools */}
      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">More free tools</h2>
        <ul className="flex flex-wrap gap-3 text-sm">
          {[
            { href: "/tools", label: "All free tools" },
            { href: "/tools/meta-tag-generator", label: "Meta tag generator" },
            { href: "/tools/robots-txt-generator", label: "Robots.txt generator" },
            { href: "/tools/youtube-tags-extractor", label: "YouTube tag extractor" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-lg border px-3 py-2 text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Disclaimer */}
      <p className="mt-10 rounded-xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
        Shopyor is not affiliated with or endorsed by Amazon. &ldquo;Amazon&rdquo; and the
        Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. Always
        follow the Amazon Associates Operating Agreement when sharing affiliate
        links.
      </p>
    </div>
  );
}
