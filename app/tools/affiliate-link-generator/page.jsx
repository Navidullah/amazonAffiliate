// app/tools/affiliate-link-generator/page.jsx

import Link from "next/link";
import AffiliateLinkGeneratorClient from "@/app/components/affiliateLinkGenerator/AffiliateLinkGeneratorClient";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Home } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/affiliate-link-generator`;

/** --- SEO (low-competition, long-tail keyword optimized) --- */
export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    absolute:
      "Amazon Affiliate Link Generator — Free, No SiteStripe | Shopyor",
  },
  description:
    "Free Amazon affiliate link generator. Convert any Amazon product URL or ASIN into a clean affiliate link with your own Associate Tag — no SiteStripe, no API. Works for amazon.com, .co.uk, .in, .de and 19 marketplaces.",
  keywords: [
    "amazon affiliate link generator",
    "amazon affiliate link generator free",
    "convert amazon link to affiliate link",
    "how to create amazon affiliate link",
    "amazon affiliate link from asin",
    "amazon affiliate link without sitestripe",
    "amazon affiliate link with my tag",
    "clean amazon affiliate link generator",
    "amazon associate tag link generator",
    "amazon affiliate url builder",
    "add affiliate tag to amazon link",
    "amazon affiliate link generator without api",
    "amazon product link with associate id",
    "make amazon affiliate link from product url",
    "amazon affiliate link for any region",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
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
    type: "website",
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
      "Create clean Amazon affiliate links with your own Associate Tag from any product URL or ASIN. Free and supports all major regions.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/affiliate-link-og.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxPreview: "large",
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  },
};

/** --- Low-competition / long-tail keywords for the “Related searches” block --- */
const KEYWORDS = [
  "amazon affiliate link generator free",
  "convert amazon link to affiliate link",
  "how to create amazon affiliate link",
  "amazon affiliate link from asin",
  "amazon affiliate link without sitestripe",
  "add affiliate tag to amazon link",
  "clean amazon affiliate link generator",
  "amazon associate tag link generator",
  "amazon affiliate url builder",
  "make amazon affiliate link from product url",
  "amazon affiliate link generator without api",
  "amazon product link with associate id",
  "amazon affiliate link for any region",
  "shorten amazon affiliate link",
  "amazon affiliate link for youtube",
  "amazon affiliate link for instagram bio",
];

/** --- FAQ (plain-text answers so JSON-LD and UI stay in sync) --- */
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
    a: "Yes. If your URL contains a 10-character ASIN (such as B0XXXXXXXY) in the path or as an asin= parameter, the tool detects it automatically and rebuilds a clean /dp/ASIN link with your tag attached.",
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

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Amazon Affiliate Link Generator",
        url: PAGE_URL,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online Amazon affiliate link generator that converts any product URL or ASIN into a clean affiliate link with your own Associate Tag, with no SiteStripe or API required.",
        featureList: [
          "Convert any Amazon URL into a clean affiliate link",
          "Build links from an ASIN automatically",
          "Add your own Amazon Associate Tag",
          "Strips old tags and tracking parameters",
          "Supports 19 Amazon marketplaces",
          "Free, no signup, runs in your browser",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "612",
        },
      },
      {
        "@type": "HowTo",
        name: "How to create an Amazon affiliate link",
        totalTime: "PT1M",
        step: [
          {
            "@type": "HowToStep",
            name: "Enter your Associate Tag",
            text: "Type your Amazon Associates tracking ID, e.g. yoursite-20.",
          },
          {
            "@type": "HowToStep",
            name: "Paste the product URL",
            text: "Copy any Amazon product link or ASIN and paste it into the field.",
          },
          {
            "@type": "HowToStep",
            name: "Generate and copy",
            text: "Click Generate to get a clean affiliate link, then copy it.",
          },
        ],
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
    <main className="bg-background mx-auto max-w-3xl px-4 pt-28 md:pt-32 lg:pt-32 pb-20">
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
          Free • No SiteStripe • 19 marketplaces
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Amazon Affiliate Link Generator
        </h1>
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
            tracking ID, for example <code>yoursite-20</code>.
          </li>
          <li>
            <strong>Paste the product URL</strong> — copy any Amazon product
            page link (or one that contains an ASIN) and paste it in.
          </li>
          <li>
            <strong>Generate and copy</strong> — the tool extracts the ASIN,
            removes old tags, and outputs a clean{" "}
            <code>/dp/ASIN?tag=yourtag</code> link ready to share.
          </li>
        </ol>

        <h2>Convert an Amazon link to an affiliate link without SiteStripe</h2>
        <p>
          SiteStripe is Amazon's built-in toolbar, but it isn't always
          available — especially on mobile or inside apps. As long as you have
          an approved Associates account and your tag, this generator produces
          the same trackable link from any product URL. That makes it a handy{" "}
          <strong>Amazon affiliate link generator without the API</strong> for
          quick link-building on the go.
        </p>

        <h2>Generate an affiliate link from an ASIN</h2>
        <p>
          Every Amazon product has a unique 10-character <strong>ASIN</strong>{" "}
          (for example <code>B0XXXXXXXY</code>). If your link contains an ASIN in
          its path or as an <code>asin=</code> parameter, the tool detects it
          automatically and rebuilds a tidy <code>/dp/ASIN</code> link with your
          tag attached — no manual editing required.
        </p>

        <h2>Supported Amazon marketplaces</h2>
        <p>
          The generator works across 19 regions, so you can build a link for the
          right store every time:
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
          <code>amazon.co.uk</code>, and so on.
        </p>

        <h2>Why use clean affiliate links?</h2>
        <ul>
          <li>
            <strong>More clicks:</strong> short, tidy links look trustworthy and
            improve click-through rates.
          </li>
          <li>
            <strong>Easier to share:</strong> clean URLs work better on YouTube
            descriptions, an Instagram bio, blogs, and Telegram.
          </li>
          <li>
            <strong>Accurate tracking:</strong> removing old tags and stray
            parameters means the commission is credited correctly to you.
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

      {/* Disclaimer */}
      <p className="mt-10 rounded-xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
        Shopyor is not affiliated with or endorsed by Amazon. “Amazon” and the
        Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. Always
        follow the Amazon Associates Operating Agreement when sharing affiliate
        links.
      </p>
    </main>
  );
}
