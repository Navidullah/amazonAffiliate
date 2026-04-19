// app/tools/tiktok-video-downloader/page.jsx
import { Metadata } from "next";
import { Suspense } from "react";
import TikTokDownloaderClient from "./TikTokDownloaderClient";

export const metadata = {
  title: "TikTok Video Downloader - Download Without Watermark | Shopyor",
  description:
    "Best free TikTok video downloader to save videos without watermark. Download any TikTok video in HD quality. Fast, free, and works on all devices. No registration required.",
  keywords: [
    "tiktok video downloader",
    "tiktok downloader",
    "download tiktok videos",
    "tiktok video saver",
    "tiktok no watermark",
    "save tiktok videos",
    "tiktok video downloader hd",
    "tiktok downloader online",
    "tiktok video downloader app",
    "download tiktok without watermark",
  ],
  openGraph: {
    title: "TikTok Video Downloader - Save Videos Without Watermark",
    description:
      "Download TikTok videos in HD quality without watermark. Free, fast, and easy to use. Works on all devices including iPhone and Android.",
    url: "https://www.shopyor.com/tools/tiktok-video-downloader",
    siteName: "Shopyor",
    images: [
      {
        url: "/og/tiktok-downloader-og.jpg",
        width: 1200,
        height: 630,
        alt: "TikTok Video Downloader - Save TikTok Videos Without Watermark",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Video Downloader - Free & No Watermark",
    description:
      "Download TikTok videos without watermark. Best online TikTok video downloader tool. Save any TikTok video in seconds.",
    images: ["/og/tiktok-downloader-twitter.jpg"],
    site: "@shopyor",
    creator: "@shopyor",
  },
  alternates: {
    canonical: "https://www.shopyor.com/tools/tiktok-video-downloader",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.shopyor.com/tools/tiktok-video-downloader",
      url: "https://www.shopyor.com/tools/tiktok-video-downloader",
      name: "TikTok Video Downloader - Download Without Watermark",
      description:
        "Download TikTok videos without watermark in HD quality. Free online tool.",
      isPartOf: { "@id": "https://www.shopyor.com/#website" },
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
    },
    {
      "@type": "SoftwareApplication",
      name: "Shopyor TikTok Video Downloader",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web, Android, iOS, Windows, Mac",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "15000",
        bestRating: "5",
        worstRating: "1",
      },
      featureList: [
        "Download TikTok videos without watermark",
        "Save TikTok photos and slideshows",
        "HD quality downloads",
        "No registration required",
        "Mobile compatible",
        "Fast download speeds",
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Download TikTok Videos",
      description: "Download any TikTok video in 3 simple steps",
      step: [
        {
          "@type": "HowToStep",
          name: "Copy TikTok URL",
          text: "Open TikTok app, find the video you want, tap share and copy the link.",
        },
        {
          "@type": "HowToStep",
          name: "Paste URL",
          text: "Paste the copied TikTok URL in the input field above.",
        },
        {
          "@type": "HowToStep",
          name: "Download Video",
          text: "Click analyze button, select quality, and download your video.",
        },
      ],
    },
  ],
};

export default function TikTokDownloaderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={<TikTokDownloaderSkeleton />}>
        <TikTokDownloaderClient />
      </Suspense>
    </>
  );
}

function TikTokDownloaderSkeleton() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="h-12 w-32 bg-muted animate-pulse rounded-full mx-auto mb-4"></div>
          <div className="h-10 w-96 bg-muted animate-pulse rounded-lg mx-auto mb-4"></div>
          <div className="h-6 w-64 bg-muted animate-pulse rounded-lg mx-auto"></div>
        </div>
        <div className="h-96 bg-muted animate-pulse rounded-xl"></div>
      </div>
    </div>
  );
}
