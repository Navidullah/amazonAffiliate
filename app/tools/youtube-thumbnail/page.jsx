import YoutubeThumbnailClient from "@/app/components/thumbnail-client/thumbnail-client";

export const metadata = {
  title: "Free YouTube Thumbnail Downloader (HD, 1080p) | Shopyor Tools",
  description:
    "Download YouTube thumbnails in HD, Full HD, and all available resolutions instantly. Free online YouTube thumbnail downloader. No registration required.",
  keywords: [
    "YouTube thumbnail downloader",
    "Download YouTube thumbnail HD",
    "YouTube thumbnail 1080p",
    "YouTube thumbnail grabber",
    "Free YouTube thumbnail tool",
  ],
  openGraph: {
    title: "Free YouTube Thumbnail Downloader (HD)",
    description:
      "Instantly download high-quality YouTube thumbnails in multiple resolutions.",
    url: "https://www.shopyor.com/tools/youtube-thumbnail",
    siteName: "Shopyor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Thumbnail Downloader",
    description: "Download HD YouTube thumbnails instantly. Fast and free.",
  },
};

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "YouTube Thumbnail Downloader",
    url: "https://www.shopyor.com/tools/youtube-thumbnail",
    applicationCategory: "Utility",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online YouTube thumbnail downloader. Download HD and Full HD thumbnails instantly.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this YouTube thumbnail downloader free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our YouTube thumbnail downloader is completely free to use.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download HD YouTube thumbnails?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can download HD and Full HD thumbnails if available for the video.",
        },
      },
    ],
  };

  return (
    <>
      <YoutubeThumbnailClient />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
