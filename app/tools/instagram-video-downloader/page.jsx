import { Suspense } from "react";
import InstagramVideoDownloaderClient from "./client";
import { LoadingFallback } from "@/app/components/tools/LoadingFallback";

export const metadata = {
  title: {
    absolute: "Instagram Video Downloader - Fast & Free | Shopyor",
  },
  description:
    "Download public Instagram videos and reels online for free. Fast, mobile-friendly, and easy to use Instagram downloader tool.",
  keywords:
    "instagram video downloader, instagram reel downloader, download instagram videos, save instagram reels, instagram saver",
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  openGraph: {
    title: "Instagram Video Downloader - Download Reels & Videos",
    description:
      "Free Instagram video downloader for public reels and videos. Clean UI, fast workflow, and mobile-ready experience.",
    type: "website",
    locale: "en_US",
    siteName: "Shopyor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Video Downloader - Free Tool",
    description:
      "Download public Instagram reels and videos in a few clicks.",
    creator: "@shopyor",
    site: "@shopyor",
  },
  alternates: {
    canonical: "https://www.shopyor.com/tools/instagram-video-downloader",
  },
  category: "tools",
  classification: "video downloader tool",
};

const pageUrl = "https://www.shopyor.com/tools/instagram-video-downloader";

const faqs = [
  {
    q: "Is this Instagram video downloader free?",
    a: "Yes, it is completely free to use with no registration required.",
  },
  {
    q: "Can I download private Instagram content?",
    a: "No. Only publicly available reels, posts and IGTV links work. This tool is intended for lawful personal use only.",
  },
  {
    q: "Do I need to install software?",
    a: "No installation is required. The tool runs directly in your browser on any device.",
  },
  {
    q: "What video quality is supported?",
    a: "The tool automatically fetches the best available quality, up to 1080p.",
  },
  {
    q: "How do I download on mobile?",
    a: "Tap and hold the download button, then select 'Save Video' or 'Download Linked File' from the menu.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Instagram Video Downloader",
    description:
      "Download public Instagram videos and reels online with a fast and easy workflow.",
    url: pageUrl,
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
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to download an Instagram reel or video",
    description:
      "Save any public Instagram reel, post or IGTV video to your device in three steps.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Copy the Instagram link",
        text: "Open the reel or video, tap the share icon and choose Copy Link.",
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
        text: "Click Download Video, preview the result and save the MP4 to your device.",
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
        name: "Instagram Video Downloader",
        item: pageUrl,
      },
    ],
  },
];

export default function InstagramVideoDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Suspense fallback={<LoadingFallback />}>
        <InstagramVideoDownloaderClient />
      </Suspense>
    </>
  );
}
