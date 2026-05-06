import PdfCompressorClient from "./PdfCompressorClient";

export const metadata = {
  title: {
    absolute: "PDF Compressor Online - Reduce PDF File Size Free | Shopyor",
  },
  description:
    "Compress PDF files online for free with Shopyor. Reduce PDF file size quickly while keeping readable quality. Secure browser-based PDF compression tool.",
  keywords: [
    "PDF compressor",
    "Reduce PDF size",
    "Online PDF compressor",
    "PDF optimization tool",
    "Compress PDF online",
    "small PDF file",
    "decrease PDF size",
    "free PDF reducer",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.shopyor.com/tools/pdf-compressor",
  },
  openGraph: {
    title: "PDF Compressor Online - Free File Size Reducer",
    description:
      "Upload your PDF and compress it in seconds. Reduce file size for faster sharing, email, and uploads.",
    url: "https://www.shopyor.com/tools/pdf-compressor",
    siteName: "Shopyor",
    type: "website",
    images: [
      {
        url: "/og/og-video-downloader-1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Shopyor PDF Compressor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Compressor Online - Free and Secure",
    description:
      "Reduce PDF size online in seconds. No signup, clean interface, quality-focused compression.",
    images: ["/og/og-video-downloader-1200x630.jpg"],
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
      "Free online PDF compressor tool to reduce file size for sharing, emailing, and faster uploads.",
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
          text: "You can compress one file at a time in this version to keep compression fast and reliable.",
        },
      },
      {
        "@type": "Question",
        name: "Will PDF quality stay readable after compression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The tool is tuned for practical compression while keeping text and most graphics clear and readable.",
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
      <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,.22),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,.18),transparent_30%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,.2),transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,.1),rgba(2,6,23,.9))]" />

        <div className="relative mx-auto max-w-6xl space-y-14 px-6 py-20 md:py-24">
          <section className="text-center">
            <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
              Free Online Tool
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              PDF Compressor
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-slate-200 md:text-xl">
              Reduce PDF file size in seconds with a modern, privacy-focused
              compressor. Perfect for email attachments, form uploads, and
              faster sharing.
            </p>
          </section>

          <PdfCompressorClient />

          <section className="grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <h2 className="text-lg font-semibold">Fast Compression</h2>
              <p className="mt-2 text-sm text-slate-300">
                Shrink large PDFs quickly so they are easier to upload and send.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <h2 className="text-lg font-semibold">Readable Results</h2>
              <p className="mt-2 text-sm text-slate-300">
                Optimized to balance smaller file size with practical visual
                quality.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <h2 className="text-lg font-semibold">Private Processing</h2>
              <p className="mt-2 text-sm text-slate-300">
                Your files are handled securely and not kept permanently.
              </p>
            </article>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold">How to Compress PDF Online</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-200">
              <li>Choose your PDF file from your device.</li>
              <li>Click <strong>Compress PDF</strong> to start optimization.</li>
              <li>Download the compressed PDF instantly.</li>
            </ol>

            <h3 className="mt-7 text-xl font-semibold">Why use this tool?</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-200">
              <li>Works directly in your browser with no sign-up needed.</li>
              <li>Helps meet upload limits for forms and job portals.</li>
              <li>Makes document sharing faster over slow connections.</li>
              <li>Completely free for everyday use.</li>
            </ul>
          </section>
        </div>

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
