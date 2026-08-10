// app/tools/video-downloader/page.jsx
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import VideoDownloaderExperience from "./VideoDownloaderExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/video-downloader`;

// ─── Keyword strategy ─────────────────────────────────────────────────────
// This is a hub/picker page, not a downloader in its own right — its job is
// to catch the platform-agnostic "video downloader" query and route the
// visitor to the specific tool they need. Long-tails match the platform
// pages it links to, so the hub inherits their internal-link equity instead
// of competing with them for the same terms.
// ─────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: {
    absolute:
      "Free Video Downloader — Facebook, Instagram & TikTok | Shopyor",
  },
  description:
    "Download videos from Facebook, Instagram, or TikTok — free, no login, no app. Pick a platform below and save a clean MP4 in seconds.",
  keywords: [
    "free video downloader online",
    "download facebook instagram tiktok videos",
    "social media video downloader free",
    "video downloader no login no app",
    "download videos from social media free",
    "facebook instagram tiktok downloader",
    "online video downloader no signup",
    "save social media videos to phone",
    "video downloader for all platforms",
    "download reels and videos free",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "Social media video downloader hub",
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
    type: "website",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_US",
    title: "Free Video Downloader — Facebook, Instagram & TikTok",
    description:
      "Pick a platform and download videos free — no login, no app, no watermark on TikTok. Works on iPhone, Android, and desktop.",
    images: [
      {
        url: `${BASE_URL}/images/shopyor-tools-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor Video Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Video Downloader — Facebook, Instagram & TikTok | Shopyor",
    description:
      "Download videos from Facebook, Instagram, or TikTok free — no login, no app.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/shopyor-tools-og.png`],
  },
};

const PLATFORMS = [
  {
    href: "/tools/facebook-video-downloader",
    name: "Facebook",
    icon: FaFacebook,
    gradient: "from-blue-600 to-blue-500",
    desc: "Save public Facebook videos, Reels, and Live replays as HD MP4.",
    bullets: ["Public videos & Reels", "Live replay support", "HD or SD quality"],
  },
  {
    href: "/tools/instagram-video-downloader",
    name: "Instagram",
    icon: FaInstagram,
    gradient: "from-fuchsia-600 to-rose-500",
    desc: "Download public Instagram Reels and videos in up to 1080p.",
    bullets: ["Reels & feed videos", "Up to 1080p", "No watermark added"],
  },
  {
    href: "/tools/free-tiktok-video-downloader",
    name: "TikTok",
    icon: FaTiktok,
    gradient: "from-slate-800 to-slate-600",
    desc: "Download TikTok videos without the platform's watermark.",
    bullets: ["No TikTok watermark", "HD quality", "Works on mobile & desktop"],
  },
];

const faq = [
  {
    q: "Which video downloader should I use?",
    a: "Pick the tool that matches where the video was posted: use the Facebook downloader for facebook.com or fb.watch links, the Instagram downloader for instagram.com Reels or post links, and the TikTok downloader for tiktok.com links. Each tool is purpose-built to read that platform's link format and video player, so pasting a Facebook link into the TikTok tool (or vice versa) will not work — always match the tool to the site the video is actually hosted on.",
  },
  {
    q: "Is this video downloader really free?",
    a: "Yes. All three downloaders — Facebook, Instagram, and TikTok — are free with no subscription, no daily download limit, and no account required. Paste a public video link into the matching tool and download the MP4 directly. There is no premium tier or paywall hidden behind a 'free trial'.",
  },
  {
    q: "Do I need to log in or install an app?",
    a: "No. None of the three downloaders require you to log in to Facebook, Instagram, or TikTok, and none require installing an app or browser extension. Everything runs inside your existing browser tab — paste the link, wait a few seconds while it analyzes the video, then download. This works the same on iPhone Safari, Android Chrome, and desktop browsers.",
  },
  {
    q: "Can I download private videos or posts?",
    a: "No, and this is intentional. Only public content — videos anyone could already view without logging in — can be downloaded. Private accounts, friends-only posts, and content behind a login wall are not supported on any of the three platforms, because none of these tools authenticate as a user on your behalf. This keeps the tools on the right side of each platform's terms of service.",
  },
  {
    q: "Does the TikTok downloader remove the watermark?",
    a: "Yes. The TikTok downloader fetches the original, unwatermarked source file where TikTok makes it available, instead of the watermarked version served in the app's share sheet. Some very short or already-processed clips may still carry TikTok's own on-video watermark if that is the only version TikTok exposes, but in the vast majority of cases you get a clean MP4.",
  },
  {
    q: "What video quality can I expect?",
    a: "Facebook and Instagram downloads offer HD and SD options, typically 720p–1080p depending on what the original uploader posted — none of these tools can upscale beyond the source quality. TikTok downloads default to the highest quality TikTok's own servers provide for that clip. You'll see the available options after pasting the link and before downloading.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "Free Video Downloader — Facebook, Instagram & TikTok",
      url: PAGE_URL,
      description:
        "Hub page linking to Shopyor's free Facebook, Instagram, and TikTok video downloaders.",
      inLanguage: "en",
    },
    {
      "@type": "ItemList",
      itemListElement: PLATFORMS.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${p.name} Video Downloader`,
        url: `${BASE_URL}${p.href}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
        { "@type": "ListItem", position: 3, name: "Video Downloader", item: PAGE_URL },
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

export default function VideoDownloaderHubPage() {
  return (
    <>
      <VideoDownloaderExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
