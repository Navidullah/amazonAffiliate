import PdfCompressor from "@/app/components/pdf-compressor-node/PdfCompressor";

export const metadata = {
  title: "Free PDF Compressor Online | Reduce PDF File Size Instantly",
  description:
    "Compress your PDF files online for free. Reduce file size without losing quality. Fast, secure, and easy-to-use PDF compressor tool.",
  keywords: [
    "PDF compressor",
    "Compress PDF online",
    "Reduce PDF size",
    "Free PDF tool",
  ],
  openGraph: {
    title: "Free PDF Compressor Online",
    description: "Reduce PDF file size instantly and securely.",
    url: "https://www.shopyor.com/tools/pdf-compressor",
    siteName: "Shopyor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Compressor Online",
    description:
      "Compress PDF files easily and quickly without losing quality.",
  },
};

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PDF Compressor",
    url: "https://www.shopyor.com/tools/pdf-compressor",
    applicationCategory: "Utility",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online PDF compressor tool. Reduce your PDF file size quickly and securely without losing quality.",
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-12">
        <PdfCompressor />

        <section className="prose dark:prose-invert max-w-none mt-12">
          <h2>How to Compress PDF Online?</h2>
          <ol>
            <li>Upload your PDF using the upload button above.</li>
            <li>
              Click on <strong>Compress PDF</strong>.
            </li>
            <li>Download your compressed PDF instantly.</li>
          </ol>

          <h2>Why Use Our PDF Compressor?</h2>
          <ul>
            <li>⚡ Fast and easy to use</li>
            <li>🔒 Secure and private</li>
            <li>💯 Free tool with no registration</li>
            <li>📄 Preserves PDF quality while reducing size</li>
          </ul>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
