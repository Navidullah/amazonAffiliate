import ToolsClient from "@/app/components/tools/ToolsClient";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title: "Free Online Tools",
  description:
    "Use Shopyor’s free online tools: social media video downloader(facebook,tiktok),Image Compressor, Background Remover. Fast, secure and browser-based utilities.",
  keywords: [
    "free online tools",
    "facebook video downloader",
    "instagram video downloader",
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
      "Fast, privacy-friendly browser tools to download social media videos, compress images, remove backgrounds, and many more.",
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
    "@graph": [
      {
        "@type": "ItemList",
        name: "Shopyor Free Online Tools",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Image Compressor",
            url: `${BASE_URL}/tools/image-compressor`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Background Remover",
            url: `${BASE_URL}/tools/background-remover-image`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "BMI Calculator",
            url: `${BASE_URL}/tools/bmi`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "PDF to Word Converter",
            url: `${BASE_URL}/tools/online-pdf-to-word-converter`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "PDF Compressor",
            url: `${BASE_URL}/tools/pdf-compressor`,
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Robots.txt Generator",
            url: `${BASE_URL}/tools/robots-txt-generator`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Looking for a reliable PDF to Word converter?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Try our PDF to Word Converter to turn PDF files into editable DOCX documents quickly.",
            },
          },
          {
            "@type": "Question",
            name: "Want to convert other file types too?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Explore more document tools like PDF Compressor and image utilities across this tools directory.",
            },
          },
          {
            "@type": "Question",
            name: "Need to control how search engines crawl your site?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use our free robots.txt generator to create a custom robots file for WordPress, Shopify or Blogger, add your sitemap, and block AI bots in one click.",
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
                href="/tools/online-pdf-to-word-converter"
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
                href="/tools/pdf-compressor"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-400"
              >
                PDF Compressor
              </Link>{" "}
              and image utilities across this tools directory.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Need to control how search engines crawl your site?
            </h3>
            <p className="mt-1">
              Use our free{" "}
              <Link
                href="/tools/robots-txt-generator"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-400"
              >
                robots.txt generator
              </Link>{" "}
              to create a custom robots file for WordPress, Shopify or Blogger,
              add your sitemap, and block AI bots in one click.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
