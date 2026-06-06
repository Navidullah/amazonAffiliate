// app/tools/youtube-video-downloader/page.jsx
import { Suspense } from "react";
import YoutubeVideoDownloaderClient from "./client";
import { LoadingFallback } from "@/app/components/tools/LoadingFallback";

// ── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata = {
  title: {
    absolute: "YouTube Video Downloader – MP4 & MP3, 4K Free | Shopyor",
  },
  description:
    "Download any YouTube video or Short in MP4 (144p to 4K) or extract MP3 audio at 320kbps. Fast, free, no sign-in required. Supports all resolutions and YouTube Shorts.",
  keywords:
    "youtube video downloader, download youtube videos, youtube to mp4, youtube to mp3, youtube shorts downloader, 4k youtube downloader, free youtube downloader",
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  openGraph: {
    title: "YouTube Video Downloader – Download MP4 & MP3 Free",
    description:
      "Download any YouTube video or Short in MP4 or MP3. Choose 144p to 4K quality. Fast, free, no sign-in required.",
    type: "website",
    locale: "en_US",
    siteName: "Shopyor",
    images: [
      {
        url: "/og-youtube-downloader.jpg",
        width: 1200,
        height: 630,
        alt: "YouTube Video Downloader Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Video Downloader – Download MP4 & MP3 Free",
    description:
      "Download any YouTube video or Short in MP4 or MP3. Choose 144p to 4K quality.",
    images: ["/og-youtube-downloader.jpg"],
    creator: "@shopyor",
    site: "@shopyor",
  },
  alternates: {
    canonical: "https://www.shopyor.com/tools/youtube-video-downloader",
  },
  category: "tools",
  classification: "video downloader tool",
  other: {
    "application-name": "YouTube Video Downloader",
    "apple-mobile-web-app-title": "YT Downloader",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

// ── JSON-LD Structured Data ───────────────────────────────────────────────────
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "YouTube Video Downloader",
    description:
      "Download YouTube videos and Shorts as MP4 (144p–4K) or extract MP3 audio at up to 320kbps. Free, no sign-in required.",
    url: "https://www.shopyor.com/tools/youtube-video-downloader",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this YouTube downloader free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely free. No sign-in or account required.",
        },
      },
      {
        "@type": "Question",
        name: "Does it support YouTube Shorts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Paste any YouTube Shorts URL and download it as MP4 or MP3.",
        },
      },
      {
        "@type": "Question",
        name: "What video qualities are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "144p, 240p, 360p, 480p, 720p, 1080p, 1440p, and 4K — depending on the video.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download YouTube audio as MP3?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Switch to the MP3 tab and choose 128, 192, or 320 kbps before downloading.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install anything?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This is a fully browser-based tool. Just paste the URL and download.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to download a YouTube video as MP4 or MP3",
    description:
      "Save any public YouTube video or Short as an MP4 or MP3 in four steps using the Shopyor YouTube Video Downloader.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Copy the YouTube link",
        text: "Copy the URL of any YouTube video or Short from your browser or the share menu.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Paste and analyze",
        text: "Paste the link into the input box on this page and click Analyze Video.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Choose format and quality",
        text: "Pick MP4 for video or MP3 for audio, then select your preferred quality from 144p to 4K.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Download the file",
        text: "Click Download and the file saves automatically to your device.",
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
        name: "YouTube Video Downloader",
        item: "https://www.shopyor.com/tools/youtube-video-downloader",
      },
    ],
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function YoutubeVideoDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={<LoadingFallback />}>
        <YoutubeVideoDownloaderClient />
      </Suspense>
    </>
  );
}
