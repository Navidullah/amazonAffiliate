import BackgroundRemoverClient from "../components/tools/BackgroundRemoverClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title: "Free Online Background Remover | Shopyor – Instant Transparent PNGs",
  description:
    "Remove image backgrounds online for free. Upload a photo and download a clean, transparent PNG in seconds—perfect for product shots and thumbnails.",
  alternates: { canonical: "/background-remover" },
  keywords: [
    "background remover",
    "remove background online",
    "transparent PNG",
    "AI background removal",
    "erase background",
  ],
  openGraph: {
    type: "website",
    url: `${BASE_URL}/background-remover`,
    title: "Free Online Background Remover | Shopyor",
    description:
      "Remove image backgrounds in seconds and download transparent PNGs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Background Remover | Shopyor",
    description: "Upload a photo and get a transparent PNG instantly.",
  },
};

export default function BackgroundRemoverPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shopyor Background Remover",
    url: `${BASE_URL}/background-remover`,
    description:
      "Free online tool to remove image backgrounds and export transparent PNGs.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="min-h-screen bg-background pt-12 md:p-9">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            ✨ Free Background Remover
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Upload an image to instantly remove the background and download as a
            transparent PNG.
          </p>
        </div>

        <BackgroundRemoverClient />
      </div>
    </main>
  );
}
