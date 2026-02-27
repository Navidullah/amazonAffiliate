// app/layout.jsx
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
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});

/** Light/Dark aware address bar color */
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00bcd4" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

/** **********  SITE-WIDE SEO DEFAULTS  ********** */
export const metadata = {
  metadataBase: new URL("https://www.shopyor.com"),

  title: {
    default: "Shopyor — Free Online Tools",
    template: "%s | Shopyor Free Online Tools",
  },

  description:
    "Shopyor offers powerful free online tools including background remover, image compressor, EXIF cleaner, BMI calculator, and productivity utilities. Fast, secure, and browser-based tools with no downloads required.",

  keywords: [
    "free online tools",
    "image tools",
    "background remover online",
    "image compressor",
    "remove image background",
    "EXIF data remover",
    "BMI calculator",
    "online utility tools",
    "web tools free",
    "productivity tools online",
  ],

  openGraph: {
    type: "website",
    url: "https://www.shopyor.com",
    title: "Shopyor — Free Online Image & Utility Tools",
    description:
      "Use powerful free online tools like background remover, image compressor, EXIF cleaner, and productivity utilities. Secure, fast, and 100% browser-based.",
    siteName: "Shopyor",
    images: [
      {
        url: "/og/og-tools-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Shopyor Free Online Tools Platform",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shopyor — Free Online Tools Platform",
    description:
      "Background remover, image compressor, EXIF cleaner, BMI calculator and more. Free browser-based tools with no sign-up required.",
    images: ["/og/og-tools-1200x630.jpg"],
  },

  alternates: {
    canonical: "https://www.shopyor.com",
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

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", rel: "shortcut icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Site JSON-LD (WebSite + SearchAction) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Shopyor",
              url: "https://www.shopyor.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.shopyor.com/blogs?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${montserrat.variable} ${jetbrainsMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* subtle brand blur background */}
        //*
        <Providers>
          <HeaderComponent />
          {/* ✅ Corrected to clear the fixed header on all breakpoints */}
          <main className="pt-24 md:pt-28 lg:pt-32">{children}</main>
          <Analytics />
          <SpeedInsights />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
