import PdfToWordConverter from "@/app/components/pdfToWordConverter/PdfToWordConverter";
import Head from "next/head";

export default function PdfToWordPage() {
  const pageTitle = "PDF to Word Converter - Convert PDF Files to Word Online";
  const pageDescription =
    "Convert your PDF files to editable Word documents instantly. Fast, free, and easy-to-use PDF to Word converter tool.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social Sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:url"
          content="https://www.shopyor.com/tools/pdf-to-word"
        />
        <meta
          property="og:image"
          content="https://www.shopyor.com/images/pdf-to-word-og.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://www.shopyor.com/images/pdf-to-word-og.png"
        />
      </Head>

      <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <header className="max-w-2xl text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PDF to Word Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Upload your PDF and download an editable Word document instantly.
            Fast, free, and easy-to-use.
          </p>
        </header>

        <section className="w-full max-w-xl">
          <PdfToWordConverter />
        </section>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
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
              description: pageDescription,
            }),
          }}
        />
      </main>
    </>
  );
}
