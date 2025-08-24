// app/image-compressor/page.jsx

import ImageCompressionGuide from "../components/tools/ImageCompressionGuide";
import ImageCompressorClient from "../components/tools/ImageCompressorClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

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
      {/* Blog/Guide Section */}
      <ImageCompressionGuide />
    </main>
  );
}
