import PdfCompressorClient from "./PdfCompressorClient";

export const metadata = {
  title: "Free PDF Compressor Online | Reduce PDF File Size Instantly",
  description:
    "Compress PDF files online for free. Reduce PDF size without losing quality. Fast, secure, and easy-to-use PDF compressor tool.",
  keywords: [
    "PDF compressor",
    "Reduce PDF size",
    "Online PDF compressor",
    "PDF optimization tool",
    "Compress PDF online",
  ],
  openGraph: {
    title: "Free PDF Compressor Online",
    description:
      "Upload your PDF and compress it instantly while keeping quality intact.",
    url: "https://www.shopyor.com/tools/pdf-compressor",
    siteName: "Shopyor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Compressor Online",
    description: "Reduce PDF file size quickly and securely online.",
  },
};

export default function PdfCompressorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PDF Compressor",
    url: "https://www.shopyor.com/tools/pdf-compressor",
    applicationCategory: "Utility",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Free online PDF compressor tool. Compress PDF files instantly while maintaining quality.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this PDF compressor free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, it is completely free for all users.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compress multiple PDFs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, but one at a time for the best performance.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, files are processed securely and are not stored permanently.",
        },
      },
    ],
  };

  return (
    <>
      <main className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 opacity-30 blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              PDF Compressor
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl">
              Reduce your PDF file size instantly without losing quality. Fast,
              secure, and 100% free.
            </p>
          </div>

          {/* PDF Compressor Tool */}
          <PdfCompressorClient />

          {/* SEO Content Section */}
          <section className="prose dark:prose-invert max-w-none text-gray-200">
            <h2>How to Compress PDF Online?</h2>
            <ol>
              <li>Upload your PDF file using the upload button above.</li>
              <li>
                Click <strong>Compress PDF</strong>.
              </li>
              <li>Download your reduced-size PDF instantly.</li>
            </ol>

            <h2>Why Use Our PDF Compressor?</h2>
            <ul>
              <li>⚡ Fast and secure processing</li>
              <li>📄 Maintain PDF quality</li>
              <li>🔒 Files are not stored permanently</li>
              <li>💯 Completely free to use</li>
            </ul>
          </section>
        </div>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </main>
    </>
  );
}
