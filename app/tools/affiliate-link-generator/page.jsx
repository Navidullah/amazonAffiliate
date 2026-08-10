import AffiliateLinkGeneratorExperience from "./AffiliateLinkGeneratorExperience";

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

/* FAQ — drives the JSON-LD FAQPage (visible FAQ accordion lives in
   AffiliateLinkGeneratorExperience) */
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
    <>
      <AffiliateLinkGeneratorExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
