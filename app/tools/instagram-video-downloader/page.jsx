// app/tools/instagram-video-downloader/page.jsx
import InstagramVideoDownloaderExperience from "./InstagramVideoDownloaderExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/instagram-video-downloader`;

export const metadata = {
  title: {
    absolute:
      "Free Instagram Reel & Video Downloader — No Login, No Watermark | Shopyor",
  },
  description:
    "Download public Instagram Reels and videos free — no login, no watermark, no app. Paste the link and save a clean MP4 in up to 1080p. Works on iPhone, Android & desktop.",
  keywords: [
    "instagram reel downloader free",
    "download instagram reels without login",
    "save instagram reels to phone",
    "instagram video downloader no watermark",
    "free instagram reel downloader no signup",
    "how to download instagram reels",
    "instagram reel saver online",
    "download instagram videos without app",
    "instagram mp4 downloader free",
    "save instagram videos to camera roll",
    "instagram reel download iphone",
    "instagram video downloader android",
    "download instagram reels no account",
    "free instagram video saver",
    "instagram reels download online free",
    "save instagram reels without watermark",
    "instagram video downloader hd",
    "how to save instagram reels offline",
    "instagram reel downloader no registration",
    "download public instagram videos free",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "Instagram video and reel downloader tool",
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
    title:
      "Free Instagram Reel & Video Downloader — No Login, No Watermark",
    description:
      "Save public Instagram Reels and videos as clean MP4s — no login, no watermark, no app required. Works on all devices.",
    images: [
      {
        url: `${BASE_URL}/images/instagram-downloader-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor Instagram Reel & Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Instagram Reel & Video Downloader | Shopyor",
    description:
      "Paste an Instagram link, get a clean MP4 — no login, no watermark, no signup.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/instagram-downloader-og.png`],
  },
};

const reviews = [
  {
    name: "Sofia L.",
    role: "Social media manager, lifestyle brand",
    rating: 5,
    body: "I save competitor Reels every week for our content benchmarking decks. Shopyor gives me a clean MP4 in seconds — no watermark, no login prompt, no nonsense.",
  },
  {
    name: "James O.",
    role: "Fitness influencer, 45K Instagram followers",
    rating: 5,
    body: "I archive all my workout Reels as backups before Instagram's algorithm buries them. The preview player is a nice touch — I can confirm it's the right clip before saving.",
  },
  {
    name: "Rina C.",
    role: "Recipe blogger and food photographer",
    rating: 5,
    body: "I collect cooking Reels for my moodboard and offline reference. No other free tool I tried actually showed a preview before downloading — this one does.",
  },
  {
    name: "David K.",
    role: "Brand marketing consultant",
    rating: 4,
    body: "We pull public brand content for competitive analysis. Works on desktop Chrome and on my Android phone — consistent results without having to install anything.",
  },
  {
    name: "Aisha M.",
    role: "University student, graphic design major",
    rating: 5,
    body: "I save tutorial Reels to watch offline during my commute. Free, no account required, and the download is instant. Exactly what I needed.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
).toFixed(1);

const faq = [
  {
    q: "Is the Shopyor Instagram downloader free?",
    a: "Yes. The tool is completely free with no hidden costs, no subscription, and no account required. Paste any public Instagram link and download — nothing else needed.",
  },
  {
    q: "Can I download private Instagram content?",
    a: "No. Only publicly available Reels, feed videos, and IGTV uploads are supported. The tool intentionally does not access private accounts, locked posts, or Stories behind a follow-wall.",
  },
  {
    q: "Does it add a watermark to the downloaded video?",
    a: "No. The downloaded file is the original MP4 with no overlay, logo, or watermark added by Shopyor. You get the video exactly as it was uploaded to Instagram.",
  },
  {
    q: "What types of Instagram content can I download?",
    a: "You can download public Instagram Reels (short vertical videos), standard feed video posts, and IGTV / long-form videos. Static photo posts are not supported.",
  },
  {
    q: "How do I copy an Instagram Reel link on my phone?",
    a: "Open the Reel in the Instagram app, tap the three-dot menu (⋯) in the top-right corner or the Share icon, then tap 'Copy link'. On desktop, copy the URL from the browser address bar.",
  },
  {
    q: "Do I need to install an app or browser extension?",
    a: "No. The downloader runs entirely in your browser. It works on iPhone Safari, Android Chrome, and all major desktop browsers — no installation required.",
  },
  {
    q: "What resolution will the video download in?",
    a: "Shopyor automatically fetches the best available quality Instagram makes available for that specific post — usually up to 1080p. You can preview the video before saving to confirm the quality.",
  },
  {
    q: "Does Shopyor store or log the videos I download?",
    a: "No. Shopyor retrieves the video from Instagram's servers on your behalf and streams it to your browser. We do not store copies of videos, and we do not log the Instagram URLs you submit.",
  },
];

export default function InstagramVideoDownloaderPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Instagram Reel & Video Downloader",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online Instagram video and Reel downloader. Save any public Instagram Reel, feed video, or IGTV upload as a clean MP4 — no login, no watermark, no app.",
        featureList: [
          "Download Instagram Reels without watermark",
          "Supports Reels, feed videos, and IGTV",
          "Video preview before downloading",
          "Best available quality up to 1080p",
          "Works on iPhone, Android, Mac, and Windows",
          "Free with no login or registration required",
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
            ratingValue: String(r.rating),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: r.body,
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
            name: "Instagram Video Downloader",
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
      <InstagramVideoDownloaderExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
