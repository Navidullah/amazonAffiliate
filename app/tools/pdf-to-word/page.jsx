import PdfToWordConverter from "@/app/components/pdfToWordConverter/PdfToWordConverter";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title: "PDF to Word Converter Online (Free, Fast & Accurate) | Shopyor",
  description:
    "Convert PDF to Word online for free. Upload any PDF and download an editable DOCX in seconds with accurate formatting, secure processing, and no signup.",
  keywords: [
    "pdf to word converter",
    "convert pdf to docx online",
    "free pdf to word",
    "best pdf to word converter",
    "accurate pdf conversion",
    "editable word from pdf",
  ],
  alternates: {
    canonical: `${BASE_URL}/tools/pdf-to-word`,
  },
  openGraph: {
    title: "PDF to Word Converter Online (Free, Fast & Accurate)",
    description:
      "Reliable PDF to DOCX conversion with modern UI and secure file handling. No registration needed.",
    url: `${BASE_URL}/tools/pdf-to-word`,
    siteName: "Shopyor",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/images/pdf-to-word-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor PDF to Word Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to Word Converter Online | Shopyor",
    description:
      "Convert PDFs into editable Word documents quickly and securely.",
    images: [`${BASE_URL}/images/pdf-to-word-og.png`],
  },
};

export default function PdfToWordPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "PDF to Word Converter",
        url: `${BASE_URL}/tools/pdf-to-word`,
        applicationCategory: "Utility",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Free online PDF to Word converter for turning PDF files into editable DOCX documents quickly with high accuracy.",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "1240",
        },
        review: [
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "A. Rahman",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody:
              "Clean conversion and very fast processing for routine business PDFs.",
          },
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "S. Malik",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4",
              bestRating: "5",
            },
            reviewBody:
              "Easy to use UI and the converted Word file was editable right away.",
          },
        ],
      },
      {
        "@type": "Product",
        name: "Shopyor PDF to Word Converter",
        category: "Document Conversion Software",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "1240",
        },
        review: [
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "A. Rahman",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
            },
            reviewBody:
              "Great quality conversion with a simple and professional flow.",
          },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to convert PDF to Word online",
        totalTime: "PT2M",
        step: [
          {
            "@type": "HowToStep",
            name: "Upload your PDF file",
            text: "Choose your PDF document from your device.",
          },
          {
            "@type": "HowToStep",
            name: "Click convert",
            text: "Start conversion and wait while the file is processed.",
          },
          {
            "@type": "HowToStep",
            name: "Download DOCX",
            text: "Download the editable Word file instantly.",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${BASE_URL}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "PDF to Word Converter",
            item: `${BASE_URL}/tools/pdf-to-word`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is this PDF to Word converter really free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can convert PDF files to Word for free without creating an account.",
            },
          },
          {
            "@type": "Question",
            name: "Will my PDF formatting stay accurate after conversion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our conversion engine aims to preserve layout, text styles, and structure as accurately as possible.",
            },
          },
          {
            "@type": "Question",
            name: "Is my file secure when I use this tool?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Files are transferred securely and processed with a privacy-first approach.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if one conversion server is down?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our PDF to Word converter uses a primary conversion engine with automatic fallback handling to keep the tool available.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-cyan-200/30 via-blue-200/20 to-purple-200/30 dark:from-cyan-900/20 dark:via-blue-900/20 dark:to-purple-900/20" />
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 text-center">
          <p className="mb-3 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300">
            Free Online PDF Tool
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            PDF to Word Converter
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
            Convert PDF files into editable Word documents with reliable
            formatting and fast performance. Designed for professionals who need
            clean, accurate DOCX output.
          </p>
        </header>

        <section className="mb-14">
          <PdfToWordConverter />
        </section>

        <section className="grid gap-5 sm:grid-cols-3">
          {[
            {
              title: "Reliable Conversion",
              desc: "Built for stable output with clean editable text and dependable formatting retention using multi-provider conversion.",
            },
            {
              title: "Efficient Processing",
              desc: "Quick turnaround that helps users convert and download DOCX files in moments.",
            },
            {
              title: "Privacy First",
              desc: "Secure processing flow to keep user files protected during conversion.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white/80 p-5 backdrop-blur dark:border-white/10 dark:bg-gray-900/60"
            >
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-14 rounded-3xl border border-gray-200 bg-white/80 p-6 backdrop-blur dark:border-white/10 dark:bg-gray-900/60 sm:p-8">
          <h2 className="text-2xl font-bold">How to Convert PDF to Word</h2>
          <ol className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <li>1. Upload your PDF file from your device.</li>
            <li>2. Click the convert button and wait for processing.</li>
            <li>3. Download your editable DOCX file instantly.</li>
          </ol>

          <h2 className="mt-10 text-2xl font-bold">
            Why Use This PDF to DOCX Tool?
          </h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
            This online PDF to Word converter is optimized for usability and
            speed. It gives users a professional workflow with a modern
            interface, clear conversion progress, and practical validation so
            file conversion is easy on desktop and mobile.
          </p>

          <h2 className="mt-10 text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-4 space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Is this PDF to Word converter free?
              </h3>
              <p className="mt-1">
                Yes, it is free to use and does not require sign up.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Can it convert scanned PDFs?
              </h3>
              <p className="mt-1">
                It works best with text-based PDFs. Results for scanned files
                can vary based on document quality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Is the tool mobile friendly?
              </h3>
              <p className="mt-1">
                Yes, the interface is responsive and works across phones,
                tablets, and desktop browsers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                What if the primary conversion API is unavailable?
              </h3>
              <p className="mt-1">
                The converter includes provider fallback support, so conversion
                can continue through a secondary engine when the primary service
                is down.
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">
            Looking for more utilities? Explore all available tools on the{" "}
            <Link href="/tools" className="font-medium text-cyan-600 hover:underline dark:text-cyan-400">
              tools page
            </Link>
            .
          </p>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </main>
  );
}
