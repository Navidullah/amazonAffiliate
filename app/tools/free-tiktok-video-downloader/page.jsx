// app/tools/free-tiktok-video-downloader/page.js
import TikTokDownloaderClient from "./TikTokDownloaderClient";

export const metadata = {
  title: {
    absolute:
      "TikTok Video Downloader - Save TikTok Videos Without Watermark | Shopyor",
  },
  description:
    "Free online TikTok video downloader. Save any public TikTok video without the watermark in HD (up to 1080p) — no app, no registration, works on iPhone, Android and desktop.",
  keywords:
    "tiktok downloader, tiktok video downloader, download tiktok videos, tiktok no watermark, save tiktok videos, tiktok saver, tiktok mp4 download, shopyor",
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  openGraph: {
    title: "TikTok Video Downloader - Download Without Watermark | Shopyor",
    description:
      "Free TikTok video downloader. Download any TikTok video without watermark in high quality.",
    url: "https://www.shopyor.com/tools/free-tiktok-video-downloader",
    siteName: "Shopyor",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.shopyor.com/tiktok-og.jpg",
        width: 1200,
        height: 630,
        alt: "TikTok Video Downloader Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Video Downloader | Shopyor",
    description: "Download TikTok videos without watermark for free",
    images: ["https://www.shopyor.com/tiktok-twitter.jpg"],
  },
  alternates: {
    canonical: "https://www.shopyor.com/tools/free-tiktok-video-downloader",
  },
  category: "tools",
  classification: "video downloader tool",
};

const pageUrl = "https://www.shopyor.com/tools/free-tiktok-video-downloader";

const faqs = [
  {
    q: "Is this TikTok downloader free?",
    a: "Yes, completely free with no hidden costs or registration required.",
  },
  {
    q: "Does it remove the TikTok watermark?",
    a: "Yes, all downloaded videos are saved without the TikTok watermark.",
  },
  {
    q: "What qualities can I download?",
    a: "You can download in 360p, 720p, 1080p, or the best available quality.",
  },
  {
    q: "Is it legal to download TikTok videos?",
    a: "Downloading is intended for personal use only. Respect content creators' rights and TikTok's terms of service.",
  },
  {
    q: "Do I need to install anything?",
    a: "No, it works directly in your browser. No software installation is needed.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Yes, it works on all devices including iPhone and Android.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "TikTok Video Downloader",
    description:
      "Download public TikTok videos without watermark in HD quality, for free.",
    url: pageUrl,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList:
      "Download TikTok videos, No watermark, HD quality up to 1080p, Free, No registration",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to download a TikTok video without watermark",
    description:
      "Save any public TikTok video to your device in three steps using the Shopyor TikTok Video Downloader.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Copy the TikTok link",
        text: "Open TikTok, tap Share on the video and choose Copy Link.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Paste the link",
        text: "Paste the copied link into the input box on this page.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Download the video",
        text: "Pick a quality and click Download Video to save the watermark-free MP4.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.shopyor.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: "https://www.shopyor.com/tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "TikTok Video Downloader",
        item: pageUrl,
      },
    ],
  },
];

export default function TikTokDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TikTokDownloaderClient />
    </>
  );
}
