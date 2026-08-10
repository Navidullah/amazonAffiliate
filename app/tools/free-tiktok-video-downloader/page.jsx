// app/tools/free-tiktok-video-downloader/page.jsx
import TikTokVideoDownloaderExperience from "./TikTokVideoDownloaderExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/free-tiktok-video-downloader`;

export const metadata = {
  title: {
    absolute:
      "Free TikTok Video Downloader — No Watermark, No Signup | Shopyor",
  },
  description:
    "Download any public TikTok video without watermark in HD (up to 1080p). Free, no sign-up, no app — works on iPhone, Android, and desktop. Just paste the link.",
  keywords: [
    "tiktok video downloader without watermark",
    "download tiktok without watermark free",
    "tiktok downloader no signup",
    "save tiktok video to phone",
    "tiktok mp4 download free",
    "how to download tiktok without watermark",
    "tiktok video saver online",
    "tiktok download no app needed",
    "free tiktok downloader no login",
    "download tiktok video to camera roll",
    "tiktok without watermark iphone",
    "tiktok video downloader android",
    "tiktok hd download free",
    "vm tiktok downloader",
    "download tiktok reels without watermark",
    "tiktok saver no registration",
    "free tiktok video download online",
    "tiktok downloader 1080p",
    "save tiktok videos for offline viewing",
    "tiktok video download no watermark no app",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "TikTok video downloader tool",
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
    title: "Free TikTok Video Downloader — No Watermark, No Signup",
    description:
      "Download any public TikTok video without watermark in HD — free, no registration, works on all devices.",
    images: [
      {
        url: `${BASE_URL}/images/tiktok-downloader-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor TikTok Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free TikTok Video Downloader — No Watermark | Shopyor",
    description:
      "Paste a TikTok link, pick quality, download a clean MP4 — no watermark, no signup, no app.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/tiktok-downloader-og.png`],
  },
};

const reviews = [
  {
    name: "Priya M.",
    role: "Content creator, 120K TikTok followers",
    rating: 5,
    body: "I archive my best TikToks every month so I always have a clean, watermark-free copy for my portfolio. Shopyor is the only tool that consistently delivers HD without making me sign up.",
  },
  {
    name: "Carlos R.",
    role: "Social media manager, marketing agency",
    rating: 5,
    body: "We clip TikToks for client pitch decks. A clean 1080p download in seconds saves us from stitching frames out of a screen recording. This has become a daily tool for our team.",
  },
  {
    name: "Dana K.",
    role: "Freelance video editor",
    rating: 5,
    body: "I collect TikTok reference clips before starting any vertical-video project. It spits out a proper MP4 in 10 seconds — no watermark, no fuss, no installation.",
  },
  {
    name: "Mr. Hassan",
    role: "High school media studies teacher",
    rating: 4,
    body: "I save educational TikToks to play in class when the school Wi-Fi decides to die. Works on my phone and on the classroom laptop — no installation or account needed.",
  },
  {
    name: "Leila T.",
    role: "Fitness coach and content repurposer",
    rating: 5,
    body: "I download my own workout TikToks to re-edit for YouTube Shorts and Instagram Reels. The no-signup part is key — I am not handing over my login to every tool I try.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
).toFixed(1);

const faq = [
  {
    q: "Is the Shopyor TikTok downloader completely free?",
    a: "Yes. The tool is free with no hidden costs, no subscription, and no registration. Paste your TikTok link, pick a quality, and download — nothing else required.",
  },
  {
    q: "Does it really remove the TikTok watermark?",
    a: "Yes. When you save a video inside the TikTok app, the app overlays the creator's username and the TikTok logo as a moving watermark. Shopyor fetches the original source video before that overlay is applied, so you get a clean MP4 file with no watermark.",
  },
  {
    q: "What video quality options are available?",
    a: "You can choose 360p (small file, fast download), 720p (standard HD), 1080p (full HD), or Best — the highest quality available for that specific video. Most TikToks max out at 1080p.",
  },
  {
    q: "How do I copy a TikTok link on my phone?",
    a: "Open TikTok, tap the Share icon (arrow) on the right side of the video, then tap 'Copy link'. On a desktop browser, copy the URL from the address bar. Paste the link into the input box above and click Download. Short vm.tiktok.com share links also work.",
  },
  {
    q: "Is it legal to download TikTok videos?",
    a: "Downloading is intended for personal, non-commercial use — saving your own clips, keeping an offline copy of content you have permission to use, or collecting reference material for editing. Do not download and republish other creators' videos commercially without their explicit consent. Always follow TikTok's Terms of Service and respect copyright law.",
  },
  {
    q: "Do I need to install an app or browser extension?",
    a: "No. The downloader runs entirely in your web browser — nothing to install. It works on iPhone Safari, Android Chrome, and all major desktop browsers on Mac and Windows.",
  },
  {
    q: "Does Shopyor store the videos I download?",
    a: "No. Shopyor fetches the video from TikTok's servers on your behalf and streams it directly to your device. We do not retain copies of any videos and do not log the TikTok links you submit.",
  },
  {
    q: "Why does the download sometimes fail?",
    a: "Downloads fail when a video is private, the account has been deleted, or the link has expired. Make sure the video is public and paste the full URL. If a vm.tiktok.com share link fails, try finding the full tiktok.com/@username/video/... link instead.",
  },
];

export default function TikTokDownloaderPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "TikTok Video Downloader",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online TikTok video downloader. Save any public TikTok video without watermark in HD (up to 1080p) — no app, no registration, works on all devices.",
        featureList: [
          "Download TikTok videos without watermark",
          "Quality options: 360p, 720p, 1080p, Best",
          "Works on iPhone, Android, Mac, and Windows",
          "No app or browser extension to install",
          "Free with no sign-up required",
          "Supports tiktok.com and vm.tiktok.com links",
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
            name: "TikTok Video Downloader",
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
      <TikTokVideoDownloaderExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
