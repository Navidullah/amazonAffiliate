// app/tools/tiktok-downloader/page.js
import { Metadata } from "next";
import TikTokDownloaderClient from "./TikTokDownloaderClient";

export const metadata = {
  title: "TikTok Video Downloader - Download TikTok Videos Without Watermark ",
  description:
    "Free TikTok video downloader tool. Download any TikTok video without watermark in high quality. Fast, free, and no registration required.",
  keywords:
    "tiktok downloader, tiktok video downloader, download tiktok videos, tiktok no watermark, tiktok saver, shopyor",
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
};

export default function TikTokDownloaderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "TikTok Video Downloader",
    description: "Download TikTok videos without watermark for free",
    url: "https://www.shopyor.com/tools/free-tiktok-video-downloader",
    applicationCategory: "Multimedia",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: "Download TikTok videos, No watermark, High quality, Free",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TikTokDownloaderClient />
    </>
  );
}
