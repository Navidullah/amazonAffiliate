import PdfToWordConverter from "@/app/components/pdfToWordConverter/PdfToWordConverter";

export const metadata = {
  title: "Free PDF to Word Converter Online | Convert PDF to DOCX Instantly",
  description:
    "Convert PDF to Word online for free. Upload your PDF and download an editable DOCX file instantly. Fast, secure, and easy-to-use PDF to Word converter tool.",
  keywords: [
    "PDF to Word",
    "Convert PDF to DOCX",
    "Free PDF to Word Converter",
    "Online PDF Converter",
    "PDF to Word tool",
  ],
  alternates: {
    canonical: "https://www.shopyor.com/tools/pdf-to-word",
  },
  openGraph: {
    title: "Free PDF to Word Converter Online",
    description:
      "Upload your PDF and convert it to an editable Word document instantly.",
    url: "https://www.shopyor.com/tools/pdf-to-word",
    siteName: "Shopyor",
    type: "website",
    images: [
      {
        url: "https://www.shopyor.com/images/pdf-to-word-og.png",
        width: 1200,
        height: 630,
        alt: "PDF to Word Converter Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF to Word Converter Online",
    description:
      "Convert PDF files to editable Word documents instantly and securely.",
    images: ["https://www.shopyor.com/images/pdf-to-word-og.png"],
  },
};

export default function PdfToWordPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "PDF to Word Converter",
        url: "https://www.shopyor.com/tools/pdf-to-word",
        applicationCategory: "Utility",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Free online PDF to Word converter tool. Convert PDF files into editable DOCX documents instantly.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is this PDF to Word converter free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, our tool is completely free and does not require registration.",
            },
          },
          {
            "@type": "Question",
            name: "Are my files secure?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Your files are processed securely and are not stored permanently.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert large PDF files?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can convert PDF files up to the supported size limit.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Free PDF to Word Converter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Convert your PDF files into editable Word documents instantly. No
            registration required. 100% free and secure.
          </p>
        </header>

        {/* Tool */}
        <section className="mb-16">
          <PdfToWordConverter />
        </section>

        {/* SEO Content */}
        <section className="prose dark:prose-invert max-w-none">
          <h2>What is a PDF to Word Converter?</h2>
          <p>
            A PDF to Word converter is an online tool that allows you to
            transform non-editable PDF documents into fully editable Microsoft
            Word (DOCX) files. This makes it easy to edit text, update content,
            and reuse documents without recreating them from scratch.
          </p>

          <h2>How to Convert PDF to Word Online?</h2>
          <ol>
            <li>Upload your PDF file using the upload button above.</li>
            <li>
              Click on <strong>Convert to Word</strong>.
            </li>
            <li>Download your editable DOCX file instantly.</li>
          </ol>

          <h2>Why Use Our PDF to Word Converter?</h2>
          <ul>
            <li>⚡ Fast and secure processing</li>
            <li>📄 High-quality DOCX output</li>
            <li>🔒 Files are not stored permanently</li>
            <li>💯 Completely free to use</li>
          </ul>

          <h2>Frequently Asked Questions</h2>

          <h3>Is this PDF to Word converter free?</h3>
          <p>
            Yes, our tool is completely free and does not require registration.
          </p>

          <h3>Are my files secure?</h3>
          <p>
            Your files are processed securely and are not stored permanently on
            our servers.
          </p>

          <h3>Can I convert large PDF files?</h3>
          <p>
            Yes, you can convert PDF files up to the supported file size limit.
          </p>

          <h2>Related Tools</h2>
          <p>
            You may also want to try our{" "}
            <a href="/tools/word-to-pdf" className="text-blue-600 underline">
              Word to PDF converter
            </a>{" "}
            or explore other document conversion tools available on our website.
          </p>
        </section>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </main>
  );
}
