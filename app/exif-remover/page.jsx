// app/exif-remover/page.jsx

import ExifRemoverClient from "../components/tools/ExifRemoverClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title:
    "Free EXIF Remover | Shopyor – Remove Photo Metadata (GPS, Camera Info) Online",
  description:
    "Remove EXIF metadata from photos online for free. Delete GPS location, camera model, and other hidden data to protect privacy before sharing.",
  alternates: { canonical: "/exif-remover" },
  keywords: [
    "exif remover",
    "remove exif",
    "strip exif",
    "remove photo metadata",
    "remove gps from photos",
    "remove camera info",
    "privacy image tool",
  ],
  openGraph: {
    type: "website",
    url: `${BASE_URL}/exif-remover`,
    title: "Free EXIF Remover | Shopyor",
    description:
      "Strip EXIF metadata (GPS, camera info) from photos online. Fast, free, and privacy-friendly.",
    images: [
      {
        url: `${BASE_URL}/images/og-exif-remover.jpg`,
        width: 1200,
        height: 630,
        alt: "EXIF Remover – Remove photo metadata online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free EXIF Remover | Shopyor",
    description:
      "Remove hidden EXIF metadata like GPS and camera info from images before sharing.",
    images: [`${BASE_URL}/images/og-exif-remover.jpg`],
  },
};

export default function ExifRemoverPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shopyor EXIF Remover",
    url: `${BASE_URL}/exif-remover`,
    description:
      "Free online tool to remove EXIF metadata (GPS, camera info) from images for privacy.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="wrapper py-10 space-y-4">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* H1 + intro for SEO */}
      <h1 className="text-3xl font-bold">Free EXIF Remover (Photo Metadata)</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Strip GPS location, camera model, and other hidden metadata from your
        images. Keep the picture—remove the trails.
      </p>

      <ExifRemoverClient />
    </main>
  );
}
