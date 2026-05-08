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

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Instagram Video Downloader",
    description:
      "Download public Instagram videos and reels online with a fast and easy workflow.",
    url: "https://www.shopyor.com/tools/instagram-video-downloader",
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
        name: "Is this Instagram video downloader free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can use this Instagram downloader tool for free.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download private Instagram videos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This page is intended only for publicly available content and lawful personal use.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install an app?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No installation is required. The tool runs directly in your browser.",
        },
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
