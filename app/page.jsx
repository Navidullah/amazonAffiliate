import HomePageClient from "./HomePageClient";

export const metadata = {
  title: {
    absolute:
      "Free Video Downloader – Facebook, Instagram & TikTok | Shopyor",
  },
  description:
    "Download videos from Facebook, Instagram, and TikTok for free. Paste any video link — our smart detector auto-identifies the platform and downloads in HD quality. No registration required.",
  keywords:
    "video downloader, facebook video downloader, instagram video downloader, tiktok video downloader, download facebook reels, download instagram reels, tiktok no watermark, free video downloader online, social media video downloader",
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.shopyor.com",
  },
  openGraph: {
    title: "Free Video Downloader – Facebook, Instagram & TikTok | Shopyor",
    description:
      "Paste any video link from Facebook, Instagram, or TikTok. Our tool auto-detects the platform and downloads in HD. Completely free & instant.",
    url: "https://www.shopyor.com",
    type: "website",
    siteName: "Shopyor",
    locale: "en_US",
    images: [
      {
        url: "/og/og-video-downloader-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Shopyor Universal Video Downloader – Facebook, Instagram & TikTok",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "Free Video Downloader – Facebook, Instagram & TikTok | Shopyor",
    description:
      "Paste any video URL and our smart tool auto-detects whether it's Facebook, Instagram, or TikTok — then downloads it in HD for free.",
    images: ["/og/og-video-downloader-1200x630.jpg"],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shopyor",
    url: "https://www.shopyor.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.shopyor.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Shopyor Universal Video Downloader",
    description:
      "Download videos from Facebook, Instagram, and TikTok for free in HD quality. Auto-detects the platform from the URL.",
    url: "https://www.shopyor.com",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web, Android, iOS, Windows, Mac",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "15000",
    },
    featureList: [
      "Download Facebook videos and reels in HD",
      "Download Instagram reels and videos",
      "Download TikTok videos without watermark",
      "Auto-detects platform from URL",
      "No registration required",
      "Mobile compatible",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I download Facebook, Instagram, or TikTok videos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply copy the video URL from Facebook, Instagram, or TikTok, paste it in the input box on our homepage, and click Download. Our tool automatically detects the platform and downloads the video in HD quality.",
        },
      },
      {
        "@type": "Question",
        name: "Is this video downloader free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Shopyor's video downloader is 100% free to use. No registration, no subscription, and no hidden fees.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download TikTok videos without watermark?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Our TikTok downloader removes the watermark so you get a clean, high-quality video.",
        },
      },
      {
        "@type": "Question",
        name: "Does it work on mobile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our tool is fully responsive and works on all devices including Android, iPhone, tablets, and desktop computers.",
        },
      },
      {
        "@type": "Question",
        name: "What video quality can I download?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support HD quality downloads up to 1080p. For Facebook videos we offer both HD and SD options when available.",
        },
      },
    ],
  },
];

export default function Page() {
  return (
    <>
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomePageClient />
    </>
  );
}
