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
    default: "Shopyor - Health, Fitness Tips, Wellness & Proven Gear",
    template:
      "%s | Shopyor — Expert Health & Fitness Guides, Wellness Tips & Store for Proven Gear",
  },
  description:
    "Shopyor brings you health & fitness tips, detailed wellness guides, and trustworthy product picks. Practical, research-driven content to help you stay active, confident, and live a healthier life daily.",
  keywords: [
    "health and fitness",
    "wellness tips",
    "workout routines",
    "nutrition advice",
    "sleep and recovery",
  ],
  openGraph: {
    type: "website",
    title:
      "Shopyor — Expert Health & Fitness Guides, Wellness Tips & Store for Proven Gear",
    description:
      "Research-driven guides on health, fitness, nutrition, recovery, and curated products that actually help.",
    url: "https://www.shopyor.com",
    images: [
      {
        url: "/og/og-home-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Shopyor — Health & Fitness Guides and Store",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Shopyor — Expert Health & Fitness Guides, Wellness Tips & Store for Proven Gear",
    description:
      "Research-driven guides on health, fitness, nutrition, recovery, and curated products that actually help.",
    images: ["/og/og-home-1200x630.jpg"],
  },
  alternates: { canonical: "https://www.shopyor.com" },
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
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-x-0 top-[-200px] h-[800px]">
            <div className="mx-auto max-w-5xl">
              <div className="w-[800px] h-[800px] bg-cyan-500 opacity-20 dark:opacity-15 blur-[120px] rounded-full mx-auto" />
            </div>
          </div>
        </div>

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
