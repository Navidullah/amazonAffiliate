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

export const metadata = {
  title:
    "Shopyor - Best Fitness Equipment, Adjustable Dumbbells, and Workout Gear",
  description:
    "Shop top-rated fitness equipment, adjustable dumbbells, Home gym gear, and Workout accessories. Read expert Health & Fitness blogs and find the best Amazon deals at Shopyor.",
  themeColor: "#00bcd4",
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Shopyor",
              url: "https://www.shopyor.com",
              description:
                "Shopyor delivers expert fitness coach insights, nutrition for health and fitness, weight bench workouts, and home workout routines—then helps you shop quality equipment, fitness gear & recovery tools.",
              logo: "https://www.shopyor.com/shopyor.png",
              sameAs: [
                "https://www.facebook.com/YourPage",
                "https://www.instagram.com/YourProfile",
                "https://twitter.com/YourProfile",
              ],
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.shopyor.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center min-h-screen">
            <div className="w-[800px] h-[800px] bg-purple-500 opacity-30 dark:opacity-20 blur-[160px] rounded-full mx-auto" />
          </div>
        </div>
        <Providers>
          <HeaderComponent />
          <main className="pt-[170px] sm:pt-[145px]">{children}</main>
          <Analytics />
          <SpeedInsights />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
