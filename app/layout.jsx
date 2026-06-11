// app/layout.jsx (Site-wide SEO defaults for the Shopyor free tools hub)
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

/** **********  SITE-WIDE SEO DEFAULTS — FREE ONLINE TOOLS HUB  **********
 * These are fallbacks for routes that don't set their own metadata. The
 * homepage (app/page.jsx) and individual tool pages override title/description/
 * openGraph/twitter for their own keywords. */
export const metadata = {
  metadataBase: new URL("https://www.shopyor.com"),

  title: {
    default: "Free Online Tools — Video, PDF, Image, AI & SEO | Shopyor",
    template: "%s | Shopyor",
  },

  description:
    "Shopyor is a free online toolbox: download Facebook, Instagram, TikTok & YouTube videos, convert & compress PDFs, remove image backgrounds, compress & resize images, clone a voice, build a resume, calculate BMI, and generate SEO tags. No sign-up, no install — all in your browser.",

  keywords: [
    "free online tools",
    "online utility tools",
    "web tools free",
    "video downloader",
    "pdf to word converter",
    "pdf compressor",
    "image compressor",
    "background remover",
    "ai voice cloner",
    "resume builder",
    "bmi calculator",
    "meta tag generator",
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
    title: "Free Online Tools by Shopyor — One Free Toolbox for Everything",
    description:
      "Download videos, convert & compress PDFs, remove image backgrounds, clone a voice, build a resume, calculate BMI, and generate SEO tags — 21+ free tools, no sign-up.",
    siteName: "Shopyor",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_IN", "en_CA", "en_AU"],
    emails: ["support@shopyor.com"],
    images: [
      {
        url: "/images/shopyor-tools-og.png",
        width: 1200,
        height: 630,
        alt: "Shopyor Free Online Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "Free Online Tools by Shopyor",
    description:
      "21+ free, browser-based tools: video downloaders, PDF & image utilities, AI voice cloner, resume builder, BMI calculator, and SEO tools. No sign-up.",
    images: ["/images/shopyor-tools-og.png"],
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

  classification: "Free Online Tools",

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

// Site-wide JSON-LD: Organization + WebSite, emitted once globally (per the
// SEO skill). Stable @ids let page-level @graphs reference these entities
// instead of re-declaring them. BreadcrumbList is per-page, not here.
const jsonLdSchemas = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.shopyor.com/#organization",
    name: "Shopyor",
    url: "https://www.shopyor.com",
    logo: "https://www.shopyor.com/shopyor.png",
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
    "@id": "https://www.shopyor.com/#website",
    name: "Shopyor",
    url: "https://www.shopyor.com",
    description:
      "A free online toolbox with 21+ browser-based tools for video, images, PDFs, AI, and SEO — no sign-up required.",
    publisher: { "@id": "https://www.shopyor.com/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.shopyor.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
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

        {/* Pinterest / Facebook domain verification:
            add real values via env when available — placeholders removed so
            invalid tags don't ship. */}
        {process.env.PINTEREST_DOMAIN_VERIFY && (
          <meta
            name="p:domain_verify"
            content={process.env.PINTEREST_DOMAIN_VERIFY}
          />
        )}
        {process.env.FB_PAGES_ID && (
          <meta property="fb:pages" content={process.env.FB_PAGES_ID} />
        )}

        {/* Geo meta tags intentionally omitted: this is a global tool, so
            pinning it to one country would mislead local-search signals. */}

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
