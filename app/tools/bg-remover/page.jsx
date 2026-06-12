import BackgroundRemoverClient from "@/app/components/tools/BackgroundRemoverClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title: "HD Background Remover – Transparent PNG Maker | Shopyor",
  description:
    "Make a transparent PNG in HD for free. Upload a photo, erase the background, and download a clean high-resolution cutout for product shots and thumbnails.",
  alternates: { canonical: "/tools/bg-remover" },
  keywords: [
    "hd background remover",
    "transparent png maker",
    "high resolution background removal",
    "transparent background maker",
    "png cutout maker",
  ],
  openGraph: {
    type: "website",
    url: `${BASE_URL}/tools/bg-remover`,
    title: "HD Background Remover – Transparent PNG Maker | Shopyor",
    description:
      "Erase image backgrounds and download high-resolution transparent PNGs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "HD Background Remover – Transparent PNG Maker | Shopyor",
    description: "Upload a photo and get an HD transparent PNG instantly.",
  },
};

export default function BackgroundRemoverPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shopyor HD Background Remover",
    url: `${BASE_URL}/tools/bg-remover`,
    description:
      "Free online tool to remove image backgrounds and export transparent PNGs.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="min-h-screen bg-background pt-28 md:pt-32 lg:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            ✨ HD Background Remover – Transparent PNG Maker
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Upload an image to erase the background and download a clean,
            high-resolution transparent PNG.
          </p>
        </div>

        <BackgroundRemoverClient />
      </div>
    </main>
  );
}
