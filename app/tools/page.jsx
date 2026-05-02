import ToolsClient from "@/app/components/tools/ToolsClient";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title: "Free Online Tools | Shopyor",
  description:
    "Use Shopyor’s free online tools: Image Compressor, EXIF Remover, Background Remover, BMI Calculator and more. Fast, secure and browser-based utilities.",
  keywords: [
    "free online tools",
    "facebook video downloader",
    "tiktok video downloader",
    "youtube video downloader",
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
      {
        "@type": "SoftwareApplication",
        name: "PDF to Word Converter",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web Browser",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "1240",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Which is the best PDF to Word converter on Shopyor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use the Shopyor PDF to Word Converter for fast and accurate DOCX output.",
            },
          },
          {
            "@type": "Question",
            name: "Are Shopyor tools free to use?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, all core tools are free and work directly in your browser.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ToolsClient />

      <section className="mx-auto mb-14 mt-8 max-w-5xl rounded-3xl border border-gray-200 bg-white/80 p-6 backdrop-blur dark:border-white/10 dark:bg-gray-900/60 sm:p-8">
        <h2 className="text-2xl font-bold">Tools FAQ</h2>
        <div className="mt-4 space-y-4 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Looking for a reliable PDF to Word converter?
            </h3>
            <p className="mt-1">
              Try our{" "}
              <Link
                href="/tools/pdf-to-word"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-400"
              >
                PDF to Word Converter
              </Link>{" "}
              to turn PDF files into editable DOCX documents quickly.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Want to convert other file types too?
            </h3>
            <p className="mt-1">
              Explore more document tools like{" "}
              <Link
                href="/tools/pdf-compress"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-400"
              >
                PDF Compressor
              </Link>{" "}
              and image utilities across this tools directory.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
