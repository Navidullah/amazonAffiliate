// app/image-compressor/page.jsx

import ImageCompressorClient from "../components/tools/ImageCompressorClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title:
    "Free Online Image Compressor | Shopyor – Reduce Image Size Without Losing Quality",
  description:
    "Compress JPG, PNG, and WebP images online for free with Shopyor's Image Compressor. Reduce file size while keeping image quality intact for web and social media.",
  alternates: { canonical: "/image-compressor" },
  keywords: [
    "image compressor",
    "free online image compressor",
    "compress JPG",
    "compress PNG",
    "compress WebP",
    "reduce image size",
    "optimize images for web",
  ],
  openGraph: {
    type: "website",
    url: `${BASE_URL}/image-compressor`,
    title: "Free Online Image Compressor | Shopyor",
    description:
      "Compress images online for free without losing quality. Perfect for faster websites and better SEO.",
    images: [
      {
        url: `${BASE_URL}/images/og-image-compressor.jpg`,
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
      "Compress JPG, PNG, and WebP images online for free without losing quality.",
    images: [`${BASE_URL}/images/og-image-compressor.jpg`],
  },
};

export default function ImageCompressorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shopyor Image Compressor",
    url: `${BASE_URL}/image-compressor`,
    description:
      "Free online tool to compress JPG, PNG, and WebP images without losing quality. Ideal for websites and social media.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="wrapper pt-13 space-y-4">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* H1 for SEO */}
      <h1 className="text-3xl font-bold">
        Free Online Image Compressor (JPG, PNG, WebP)
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Reduce image size without losing visible quality. Faster pages, better
        Core Web Vitals, and quick sharing.
      </p>

      <ImageCompressorClient />
    </main>
  );
}
