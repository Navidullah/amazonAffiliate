// app/layout.jsx (Fully SEO Optimized for Video Downloading)
import {
  JetBrains_Mono,
  Geist,
  Geist_Mono,
  Montserrat,
} from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
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
    default: "Shopyor",
    template: "%s | Shopyor",
  },

  description:
    "Clone any voice for free with Shopyor's AI voice cloner. Upload a short audio sample, type your text, and download natural-sounding speech in that voice in seconds. No sign-up required.",

  keywords: [
    // Voice cloning keywords (high-intent, English markets)
    "ai voice cloner",
    "voice cloning",
    "free ai voice cloning",
    "free voice cloner",
    "voice cloner online free",
    "clone any voice",
    "clone my voice",
    "voice clone online",
    "voice cloning no sign up",
    "clone voice in seconds",
    "ai voice generator",
    "text to speech",
    "tts voice generator",
    "realistic ai voice",
    "custom voice generator",
    "speech synthesis",
    // General tool keywords
    "free online tools",
    "online utility tools",
    "web tools free",
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
    title: "Shopyor — Free AI Voice Cloner",
    description:
      "Clone any voice from a short sample and generate natural speech from text. Free, fast, and private — no sign-up needed.",
    siteName: "Shopyor",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN", "en_CA", "en_AU"],
    countryName: "United States",
    emails: ["support@shopyor.com"],
  },

  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "Shopyor — Free AI Voice Cloner",
    description:
      "Clone a voice from a short sample and generate natural speech from text — free and instant. No sign-up required.",
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

  category: "technology",

  // Google Search Console verification.
  // Set GOOGLE_SITE_VERIFICATION in Vercel (the token from Search Console's
  // "HTML tag" method) and redeploy — it renders the google-site-verification meta tag.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,

  classification: "AI Voice Cloning, Online Tools",

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
    logo: "/shopyor.png",
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

  webSite: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shopyor",
    url: "https://www.shopyor.com",
    description: "Free AI voice cloner and online tools",
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
          {/* Clears the fixed 64px (h-16) header consistently on all breakpoints */}
          <main className="pt-20" id="main-content">
            {children}
          </main>
          <Analytics />
          <SpeedInsights />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
