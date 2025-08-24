// app/image-compression/metadata.jsx
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title:
    "Free Online Image Compressor | Shopyor – Reduce Image Size Without Losing Quality",
  description:
    "Use Shopyor's free online image compressor and photo compressor to reduce image size without losing quality. Compress JPEG, PNG, and WebP files instantly and optimize images for web and social media.",
  alternates: { canonical: "/image-compressor" },
  keywords: [
    "image compressor",
    "free online image compressor",
    "compress JPG",
    "compress PNG",
    "compress WebP",
    "reduce image size",
    "optimize images for web",
    // keywords from your file one
    "image compression",
    "photo compressor",
    "compress jpeg",
    "reduce image file size",
  ],
  openGraph: {
    type: "website",
    url: `${BASE_URL}/image-compressor`,
    title: "Free Online Image Compressor | Shopyor",
    description:
      "Free image compression tool by Shopyor. Use our photo compressor to reduce image size, compress JPEG, PNG, and WebP files, and optimize images for web performance and SEO.",
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
      "Shopyor's free photo compressor lets you compress JPEG, PNG, and WebP images online, reduce image size, and improve site performance without losing quality.",
    images: [`${BASE_URL}/images/og-image-compressor.jpg`],
  },
  metadataBase: new URL(BASE_URL),
};

// Export JSON-LD so the page can inject it as a <script/>
export const jsonLdWebApp = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Shopyor Image Compressor",
  url: `${BASE_URL}/image-compressor`,
  description:
    "Free online photo compressor to reduce image size without losing quality. Compress JPEG, PNG, and WebP for faster websites and better SEO.",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "image compression",
    "photo compressor",
    "compress JPEG",
    "compress PNG",
    "compress WebP",
    "reduce image file size",
  ],
  potentialAction: {
    "@type": "UseAction",
    target: `${BASE_URL}/image-compressor`,
    name: "Compress an image",
  },
};
