// app/tools/facebook-video-downloader/page.jsx
import { Suspense } from "react";
import FacebookVideoDownloaderClient from "./client";
import { LoadingFallback } from "@/app/components/tools/LoadingFallback";

// Server-side metadata for SEO
export const metadata = {
  title: "Facebook Video Downloader – HD & Free",
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

  other: {
    "application-name": "Facebook Video Downloader",
    "apple-mobile-web-app-title": "FB Video Downloader",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

// Structured data for SEO (JSON-LD)
const structuredData = [
  // Web Application Schema
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Facebook Video Downloader",
    description: "Download any public Facebook video or reel in HD quality",
    url: "https://shopyor.com/tools/facebook-video-downloader",
    applicationCategory: "MultimediaApplication",
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
  },

  // FAQ Schema
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this Facebook video downloader free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our Facebook video downloader is completely free to use. You can download unlimited videos and reels without any cost.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download Facebook reels using this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can download Facebook reels and public videos in HD quality easily using our tool.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install any software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, this is a fully online tool. You can download Facebook videos directly from your browser without installing anything.",
        },
      },
      {
        "@type": "Question",
        name: "Is it safe to use this downloader?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we do not store your data or downloaded videos. Your privacy and security are our top priorities.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download private Facebook videos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, this tool only supports publicly available Facebook videos.",
        },
      },
    ],
  },
];

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
