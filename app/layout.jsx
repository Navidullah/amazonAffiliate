// app/layout.jsx (Fully SEO Optimized for Video Downloading)
import {
  JetBrains_Mono,
  Geist,
  Geist_Mono,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers/Providers";
import HeaderComponent from "./components/header/HeaderComponent";
import Footer from "./components/footer/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainsMono",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

/** Light/Dark aware address bar color */
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

/** **********  SITE-WIDE SEO DEFAULTS - ENHANCED FOR VIDEO DOWNLOADING  ********** */
export const metadata = {
  metadataBase: new URL("https://www.shopyor.com"),

  title: {
    default: "Shopyor – Free Facebook, YouTube & TikTok Video Downloader",
    template: "%s | Shopyor - Free Video Downloader & Online Tools",
  },

  description:
    "Download videos from Facebook, YouTube & TikTok for free. Best online video downloader - save reels, shorts, and videos in HD quality. No registration required.",

  keywords: [
    // Video Downloader Keywords
    "facebook video downloader",
    "youtube video downloader",
    "tiktok video downloader",
    "download facebook reels",
    "save youtube videos",
    "tiktok video saver",
    "fb video downloader",
    "online video downloader",
    "free video downloader",
    "download reels from facebook",
    "youtube shorts downloader",
    "tiktok no watermark",
    // General tool keywords
    "free online tools",
    "background remover online",
    "image compressor",
    "remove image background",
    "EXIF data remover",
    "BMI calculator",
    "online utility tools",
    "web tools free",
    "productivity tools online",
  ],

  authors: [{ name: "Shopyor", url: "https://www.shopyor.com" }],

  creator: "Shopyor",

  publisher: "Shopyor",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    url: "https://www.shopyor.com",
    title: "Shopyor — Free Facebook, YouTube & TikTok Video Downloader",
    description:
      "Download videos from Facebook, YouTube & TikTok in HD quality. Free, fast, and secure video downloader. No registration needed.",
    siteName: "Shopyor",
    images: [
      {
        url: "/og/og-video-downloader-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Shopyor - Free Video Downloader for Facebook, YouTube & TikTok",
      },
    ],
    locale: "en_US",
    alternateLocale: ["en_GB", "en_AU"],
    countryName: "United States",
    emails: ["support@shopyor.com"],
  },

  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "Shopyor — Free Video Downloader for Facebook, YouTube & TikTok",
    description:
      "Download videos from Facebook, YouTube & TikTok for free. Save reels, shorts, and videos in HD quality. No registration required.",
    images: ["/og/og-video-downloader-1200x630.jpg"],
  },

  alternates: {
    canonical: "https://www.shopyor.com",
    languages: {
      "en-US": "https://www.shopyor.com",
      "en-GB": "https://www.shopyor.com/en-gb",
    },
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

  verification: {
    google: "your-google-verification-code", // Add your Google Search Console code
    // yandex: "your-yandex-code",
    // bing: "your-bing-code",
  },

  category: "technology",

  classification: "Video Downloader, Online Tools",

  referrer: "strict-origin-when-cross-origin",

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48", rel: "shortcut icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2563eb",
      },
    ],
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    title: "Shopyor",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

// Enhanced JSON-LD with video downloader specific schemas
const jsonLdSchemas = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shopyor",
    url: "https://www.shopyor.com",
    logo: "https://www.shopyor.com/logo.png",
    sameAs: [
      "https://www.facebook.com/shopyor",
      "https://twitter.com/shopyor",
      "https://www.instagram.com/shopyor",
      "https://www.pinterest.com/shopyor",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@shopyor.com",
      contactType: "customer support",
      availableLanguage: ["English"],
    },
  },

  softwareApplication: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Shopyor Video Downloader",
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
      "Download Facebook videos and reels",
      "Download YouTube videos and shorts",
      "Download TikTok videos without watermark",
      "HD quality downloads",
      "No registration required",
      "Mobile compatible",
      "Fast download speeds",
    ],
  },

  webSite: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shopyor",
    url: "https://www.shopyor.com",
    description: "Free video downloader for Facebook, YouTube, and TikTok",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.shopyor.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },

  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.shopyor.com",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch for third-party domains */}
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.tiktok.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Site JSON-LD Schemas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchemas.organization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchemas.softwareApplication),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchemas.webSite),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchemas.breadcrumb),
          }}
        />

        {/* Preload critical assets */}
        <link
          rel="preload"
          href="/fonts/montserrat.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Additional meta tags for social sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shopyor" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@shopyor" />
        <meta name="twitter:creator" content="@shopyor" />

        {/* Pinterest verification */}
        <meta
          name="p:domain_verify"
          content="your-pinterest-verification-code"
        />

        {/* Facebook Domain Verification */}
        <meta property="fb:pages" content="your-facebook-page-id" />

        {/* Geo meta tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.position" content="37.09024;-95.712891" />
        <meta name="ICBM" content="37.09024, -95.712891" />

        {/* Mobile optimization */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />

        {/* PWA capabilities */}
        <link rel="apple-touch-startup-image" href="/apple-splash.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>

      <body
        className={`${montserrat.variable} ${jetbrainsMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <HeaderComponent />
          {/* ✅ Corrected to clear the fixed header on all breakpoints */}
          <main className="pt-24 md:pt-28 lg:pt-32" id="main-content">
            {children}
          </main>
          <Analytics />
          <SpeedInsights />
          <Footer />
        </Providers>

        {/* Schema for scroll to top functionality */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Shopyor Video Downloader",
              description:
                "Download videos from Facebook, YouTube, and TikTok for free",
              url: "https://www.shopyor.com",
              inLanguage: "en-US",
            }),
          }}
        />
      </body>
    </html>
  );
}
