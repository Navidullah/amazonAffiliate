// app/image-compressor/page.jsx

import ImageCompressionGuide from "../components/tools/ImageCompressionGuide";
import ImageCompressorClient from "../components/tools/ImageCompressorClient";
import { jsonLdWebApp } from "./metadata";
export { metadata } from "./metadata";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export default function ImageCompressorPage() {
  return (
    <main className="wrapper pt-28 md:pt-32 lg:pt-32">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
      />

      {/* H1 for SEO */}
      <h1 className="text-3xl font-bold">
        Free Online Image Compressor (JPG, PNG, WebP) | Shopyor – Reduce Image
        Size Without Losing Quality
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
