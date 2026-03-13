import ToolsClient from "@/app/components/tools/ToolsClient";
import MonetagAd from "../components/monetagad/MonetagAd";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title: "Free Online Tools | Shopyor",
  description:
    "Use Shopyor’s free online tools: Image Compressor, EXIF Remover, Background Remover, BMI Calculator and more. Fast, secure and browser-based utilities.",
  keywords: [
    "free online tools",
    "image compressor",
    "background remover",
    "exif remover",
    "bmi calculator",
    "affiliate link generator",
  ],
  alternates: { canonical: "/tools" },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/tools`,
    title: "Free Online Tools | Shopyor",
    description:
      "Fast, privacy-friendly browser tools to compress images, remove backgrounds, strip metadata and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools | Shopyor",
    description:
      "Modern, secure, browser-based utilities. No sign-up required.",
  },
};

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Shopyor Free Online Tools",
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        name: "Image Compressor",
        applicationCategory: "Utility",
        operatingSystem: "Web Browser",
      },
      {
        "@type": "SoftwareApplication",
        name: "Background Remover",
        applicationCategory: "Utility",
        operatingSystem: "Web Browser",
      },
      {
        "@type": "SoftwareApplication",
        name: "BMI Calculator",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web Browser",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MonetagAd zoneId="219386" />
      <ToolsClient />
    </>
  );
}
