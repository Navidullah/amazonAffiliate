// app/tools/facebook-video-downloader/page.jsx
import { Suspense } from "react";
import FacebookVideoDownloaderClient from "./client";
import { LoadingFallback } from "@/app/components/tools/LoadingFallback";

// Server-side metadata for SEO
export const metadata = {
  title:
    "Facebook Video Downloader - Download HD Videos & Reels for Free | Shopyor",
  description:
    "Download any public Facebook video or reel in HD quality. Fast, free, and easy to use. Save Facebook videos to your device with our powerful downloader tool.",
  keywords:
    "facebook video downloader, download facebook videos, facebook reel downloader, save facebook videos, facebook video saver",
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  openGraph: {
    title: "Facebook Video Downloader - Download HD Videos & Reels",
    description:
      "Download any public Facebook video or reel in HD quality. Fast, free, and easy to use.",
    type: "website",
    locale: "en_US",
    siteName: "Shopyor",
    images: [
      {
        url: "/og-facebook-downloader.jpg",
        width: 1200,
        height: 630,
        alt: "Facebook Video Downloader Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Facebook Video Downloader - Download HD Videos & Reels",
    description:
      "Download any public Facebook video or reel in HD quality. Fast, free, and easy to use.",
    images: ["/twitter-facebook-downloader.jpg"],
    creator: "@shopyor",
    site: "@shopyor",
  },
  alternates: {
    canonical: "https://shopyor.com/tools/facebook-video-downloader",
  },
  category: "tools",
  classification: "video downloader tool",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "your-google-verification-code",
  },
  other: {
    "application-name": "Facebook Video Downloader",
    "apple-mobile-web-app-title": "FB Video Downloader",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

// Structured data for SEO (JSON-LD)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Facebook Video Downloader",
  description: "Download any public Facebook video or reel in HD quality",
  url: "https://shopyor.com/tools/facebook-video-downloader",
  applicationCategory: "Utility",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
  featureList: [
    "Download HD videos",
    "Support Facebook Reels",
    "Fast processing",
    "No registration required",
    "Privacy focused",
  ],
};

export default function FacebookVideoDownloaderPage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Suspense fallback={<LoadingFallback />}>
        <FacebookVideoDownloaderClient />
      </Suspense>
    </>
  );
}
