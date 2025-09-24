// app/image-compressor/metadata.jsx
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: "Free Online Image Compressor | Shopyor",
  description:
    "Compress JPG, PNG & WebP online without visible quality loss. Free Shopyor image compressor—smaller files, faster pages, better Core Web Vitals.",
  alternates: { canonical: "/image-compressor" },

  keywords: [
    "image compressor",
    "free online image compressor",
    "compress JPG",
    "compress PNG",
    "compress WebP",
    "reduce image size",
    "optimize images for web",
    "image compression",
    "photo compressor",
    "compress jpeg",
    "reduce image file size",
  ],

  openGraph: {
    type: "website",
    url: "/image-compressor",
    title: "Free Online Image Compressor | Shopyor",
    description:
      "Compress JPG, PNG & WebP online without visible quality loss. Free, fast, and perfect for better Core Web Vitals.",
    siteName: "Shopyor",
    images: [
      {
        url: "/images/og-image-compressor.jpg",
        width: 1200,
        height: 630,
        alt: "Free Online Image Compressor Tool",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Free Online Image Compressor | Shopyor",
    description:
      "Compress JPG, PNG & WebP online without visible quality loss. Free and fast.",
    images: ["/images/og-image-compressor.jpg"],
  },

  robots: { index: true, follow: true },
};

// Expose JSON-LD so the page can inject it via <script/>
export const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Shopyor Image Compressor",
  url: `${BASE_URL}/image-compressor`,
  description:
    "Free online photo compressor to reduce image size without visible quality loss. Compress JPEG, PNG, and WebP for faster sites and better SEO.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  potentialAction: {
    "@type": "UseAction",
    target: `${BASE_URL}/image-compressor`,
    name: "Compress an image",
  },
};
