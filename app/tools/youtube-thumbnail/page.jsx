import YoutubeThumbnailExperience from "./YoutubeThumbnailExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/youtube-thumbnail`;

export const metadata = {
  title: {
    absolute:
      "YouTube Thumbnail Downloader HD — Free, No Signup | Shopyor",
  },
  description:
    "Download any YouTube video thumbnail in HD (1280×720), SD, HQ or MQ — free, no signup, works on mobile. Paste the link and save in seconds.",
  keywords: [
    "youtube thumbnail downloader hd free no signup",
    "download youtube thumbnail hd",
    "youtube thumbnail grabber free",
    "save youtube video thumbnail",
    "youtube shorts thumbnail downloader",
    "youtube thumbnail download no watermark",
    "get youtube thumbnail from url",
    "youtube hd thumbnail download online",
    "download youtube thumbnail 1280x720",
    "youtube thumbnail download no account",
    "youtube thumbnail image saver free",
    "how to download youtube thumbnail hd",
    "youtube thumbnail downloader mobile",
    "youtube video thumbnail extractor free",
    "youtube thumbnail download without login",
    "youtube thumbnail downloader iphone android",
    "free youtube thumbnail tool online",
    "youtube thumbnail 4k download",
    "download thumbnail from youtube url",
    "youtube shorts thumbnail save",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "creator-tools",
  classification: "Free YouTube thumbnail downloader — HD, SD, HQ, MQ",
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
    title: "YouTube Thumbnail Downloader HD — Free, No Signup",
    description:
      "Download any YouTube video or Shorts thumbnail in HD, SD, HQ or MQ instantly. Free, no signup, works on mobile and desktop.",
    images: [
      {
        url: `${BASE_URL}/images/youtube-thumbnail-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor YouTube Thumbnail Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Thumbnail Downloader HD — Free, No Signup | Shopyor",
    description:
      "Paste any YouTube URL and download the thumbnail in HD, SD, HQ or MQ — free, no login, works on any device.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/youtube-thumbnail-og.png`],
  },
};

/* ------------------------------------------------------------------ */
/*  Static page data                                                    */
/* ------------------------------------------------------------------ */

/* FAQ — same array drives both the visible accordion and the JSON-LD */
const faq = [
  {
    q: "Is this YouTube thumbnail downloader free?",
    a: "Yes. Shopyor's YouTube thumbnail downloader is 100% free with no limits, no watermark, and no registration. Paste any YouTube link and download the thumbnail instantly in whichever resolution you need.",
  },
  {
    q: "What is the highest resolution YouTube thumbnail I can download?",
    a: "The maximum resolution thumbnail (maxresdefault) is 1280×720 pixels — true HD. Not every video has a max-resolution thumbnail uploaded by the creator; in those cases, the next best available size (SD 640×480 or HQ 480×360) is used automatically.",
  },
  {
    q: "Can I download the thumbnail of a YouTube Short?",
    a: "Yes. Paste the Shorts URL (youtube.com/shorts/...) directly into the tool and it extracts the thumbnail exactly like a regular video. All available resolutions are shown.",
  },
  {
    q: "Is it legal to download YouTube thumbnails?",
    a: "Downloading a thumbnail for personal use, research, or creative reference is generally fine. Thumbnails are copyrighted by their creators, so don't reuse someone else's thumbnail commercially or republish it as your own without permission.",
  },
  {
    q: "Do I need an app to download YouTube thumbnails?",
    a: "No app or browser extension required. The tool runs entirely in any modern browser on iPhone, Android, Windows and Mac. Just paste the link and save the image — nothing to install.",
  },
  {
    q: "Why can't I see the HD thumbnail for some videos?",
    a: "Not all videos have a maxresdefault (HD 1280×720) thumbnail stored on YouTube's servers — this typically happens with older or lower-quality uploads. In those cases the tool automatically shows the next best available size. SD (640×480) or HQ (480×360) are almost always present.",
  },
  {
    q: "How do I download a YouTube thumbnail on iPhone or Android?",
    a: "Open this page in Safari (iPhone) or Chrome (Android), paste the YouTube URL, and tap Save on the size you want. On iPhone, the image opens in a new tab — long-press it and choose 'Save to Photos'. On Android, long-press the downloaded image and tap 'Download image'.",
  },
  {
    q: "What can I use downloaded YouTube thumbnails for?",
    a: "Common uses include: studying competitors' thumbnail styles and color choices, using thumbnails as reference while designing your own, creating presentations or blog posts that embed a video preview, generating mockups for client pitches, and archiving your own thumbnails. Always respect copyright when reusing others' work.",
  },
];

/* Reviews — same array drives visible cards AND JSON-LD Review objects */
const reviews = [
  {
    name: "Marcus T.",
    role: "Video Editor",
    stars: 5,
    text: "Fastest YouTube thumbnail tool I've used. Paste, see all four sizes, download in one click. No login, no ads filling the screen.",
  },
  {
    name: "Aisha N.",
    role: "YouTuber",
    stars: 5,
    text: "I use this every week to study competitor thumbnails. HD quality, instant download, and it works perfectly on my phone too.",
  },
  {
    name: "Rohan P.",
    role: "Content Creator",
    stars: 5,
    text: "Other tools made me sign up or showed pop-up ads. This one just works — paste the link and the thumbnail is right there.",
  },
  {
    name: "Chloe W.",
    role: "Social Media Manager",
    stars: 5,
    text: "Grabbed Shorts thumbnails without any issues. I didn't know any free tool supported Shorts properly until I found this.",
  },
  {
    name: "Diego R.",
    role: "Graphic Designer",
    stars: 4,
    text: "Clean interface and all four resolutions available at once. Saves real time compared to other sites I've tried in the past.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.stars, 0) / reviews.length
).toFixed(1);

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function YoutubeThumbnailPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "YouTube Thumbnail Downloader HD",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online YouTube thumbnail downloader. Download any YouTube video or Shorts thumbnail in HD (1280×720), SD, HQ and MQ. No signup, no watermark, works on mobile.",
        featureList: [
          "Download YouTube thumbnails in HD (1280×720 maxresdefault)",
          "All four resolutions: HD, SD (640×480), HQ (480×360), MQ (320×180)",
          "Supports YouTube videos and YouTube Shorts",
          "Works on iPhone, Android, Windows and Mac",
          "Instant results — no processing queue",
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
            name: "YouTube Thumbnail Downloader",
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
      <YoutubeThumbnailExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
