// app/layout.jsx
import { JetBrains_Mono, Geist, Geist_Mono } from "next/font/google";
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

/** Viewport: light/dark aware address bar color */
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00bcd4" }, // keep brand cyan
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
};

/** **********  SITE-WIDE SEO DEFAULTS  ********** */
export const metadata = {
  metadataBase: new URL("https://www.shopyor.com"),
  title: {
    default:
      "Shopyor – Expert Health, Fitness, and Nutrition Insights for a Healthier & Happier Life",
    template: "%s | Shopyor – Expert Health, Fitness, and Nutrition Insights",
  },
  description:
    "Discover expert blogs on health, fitness, and nutrition—featuring workout tips, healthy eating guides, and science-based wellness advice to improve your body, mind, and lifestyle. Stay informed, inspired, and motivated with Shopyor’s in-depth articles.",
  keywords: [
    "health",
    "fitness",
    "nutrition",
    "workout tips",
    "healthy eating",
    "wellness",
    "exercise guides",
    "healthy lifestyle",
    "diet and fitness",
    "mind body health",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot:
      "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
  },
  openGraph: {
    type: "website",
    url: "https://www.shopyor.com/",
    siteName: "Shopyor",
    title:
      "Shopyor – Expert Health, Fitness, and Nutrition Insights for a Healthier & Happier Life",
    description:
      "Explore in-depth blogs on health, fitness, and nutrition—covering workouts, wellness, and healthy living tips to boost your body, mind, and lifestyle.",
    images: [
      {
        url: "/og/og-home-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Shopyor — Health, Fitness, and Nutrition Blogs",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Shopyor",
    creator: "@Shopyor",
    title:
      "Shopyor – Expert Health, Fitness, and Nutrition Insights for a Healthier & Happier Life",
    description:
      "Read expert articles on health, fitness, and nutrition—get workout tips, healthy recipes, and wellness guides to improve your life.",
    images: ["/og/og-home-1200x630.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
  manifest: "/manifest.json",
  verification: {
    google: "", // Add your Google Search Console verification code
    other: { "p:domain_verify": ["606cad5cbdd2926b674d14dfca5887f0"] },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Keep Organization + WebSite JSON-LD site-wide.
            Move WebPage JSON-LD into each page (e.g., home page, post pages). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Shopyor",
                url: "https://www.shopyor.com",
                logo: "https://www.shopyor.com/shopyor.png",
                sameAs: [
                  "https://www.facebook.com/YourPage",
                  "https://www.instagram.com/YourProfile",
                  "https://twitter.com/YourProfile",
                ],
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    email: "support@shopyor.com",
                  },
                ],
              },
              {
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
              },
            ]),
          }}
        />
      </head>

      <body
        className={`${jetbrainsMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Optional background blob */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center min-h-screen">
            <div className="w-[800px] h-[800px] bg-purple-500 opacity-30 dark:opacity-20 blur-[160px] rounded-full mx-auto" />
          </div>
        </div>

        <Providers>
          <HeaderComponent />
          <main className="pt-28 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40">
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
