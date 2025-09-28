// app/image-compressor/page.jsx

import ImageCompressionGuide from "@/app/components/tools/ImageCompressionGuide";
import ImageCompressorClient from "@/app/components/tools/ImageCompressorClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

// 1) Page-level metadata (App Router)
export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Free Online Image Compressor | Shopyor",
    template: "%s | Shopyor",
  },
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
    "photo compressor",
  ],
  openGraph: {
    type: "website",
    url: "/image-compressor",
    title: "Free Online Image Compressor | Shopyor",
    description:
      "Compress JPG, PNG & WebP online without visible quality loss. Free, fast, and perfect for better Core Web Vitals.",
    siteName: "Shopyor",
    locale: "en_US",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxPreview: "large",
      maxImagePreview: "large",
      maxSnippet: -1,
    },
  },
};

// 2) JSON-LD (optional but recommended)
const jsonLdWebApp = {
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

export default function ImageCompressorPage() {
  return (
    <main className="wrapper pt-28 md:pt-32 lg:pt-32">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />

      {/* H1 for SEO */}
      <h1 className="text-3xl font-bold mb-3">
        Free Online Image Compressor (JPG, PNG, WebP) | Shopyor – Reduce Image
        Size Without Losing Quality
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Reduce image size without losing visible quality. Faster pages, better
        Core Web Vitals, and quick sharing.
      </p>

      <ImageCompressorClient />
      <ImageCompressionGuide />
    </main>
  );
}
