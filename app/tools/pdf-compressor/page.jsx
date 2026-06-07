import PdfCompressExperience from "@/app/components/pdf-compressor-node/PdfCompressExperience";

const BASE_URL = "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/pdf-compressor`;

const hreflang = (path) => ({
  "x-default": `${BASE_URL}${path}`,
  en: `${BASE_URL}${path}`,
  "en-US": `${BASE_URL}${path}`,
  "en-GB": `${BASE_URL}${path}`,
  "en-IN": `${BASE_URL}${path}`,
  "en-PK": `${BASE_URL}${path}`,
  "en-NG": `${BASE_URL}${path}`,
  "en-PH": `${BASE_URL}${path}`,
  "en-ID": `${BASE_URL}${path}`,
  "en-BD": `${BASE_URL}${path}`,
  "en-CA": `${BASE_URL}${path}`,
  "en-AU": `${BASE_URL}${path}`,
  "en-ZA": `${BASE_URL}${path}`,
});

export const metadata = {
  title: {
    absolute: "PDF Compressor — Reduce PDF File Size Online Free | Shopyor",
  },
  description:
    "Free online PDF compressor. Reduce PDF file size in seconds while keeping quality readable. Secure, no signup, works on mobile and desktop.",
  keywords: [
    "pdf compressor",
    "compress pdf",
    "compress pdf online",
    "reduce pdf size",
    "pdf size reducer",
    "online pdf compressor",
    "pdf optimizer",
    "shrink pdf",
    "decrease pdf file size",
    "free pdf compressor",
    "compress pdf without losing quality",
    "compress pdf on mobile",
    "compress pdf for email",
    "compress pdf for upload",
    "make pdf smaller",
    "compress pdf to send by email",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "PDF compressor tool",
  alternates: {
    canonical: PAGE_URL,
    languages: hreflang("/tools/pdf-compressor"),
  },
  openGraph: {
    title: "Free PDF Compressor Online — Reduce PDF File Size",
    description:
      "Compress PDF files in seconds while keeping quality readable. Free, secure, and mobile-friendly — no signup.",
    url: PAGE_URL,
    siteName: "Shopyor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PDF Compressor Online | Shopyor",
    description:
      "Reduce PDF file size online in seconds — free, secure, no signup.",
    creator: "@shopyor",
    site: "@shopyor",
  },
};

const FAQS = [
  {
    q: "Is this PDF compressor free?",
    a: "Yes, it is completely free with no signup, no watermarks, and no daily limits.",
  },
  {
    q: "How can I compress a PDF to send it by email?",
    a: "Compress the file here to get it under your email provider's attachment limit (usually 25 MB), then attach the smaller version as normal.",
  },
  {
    q: "Will my PDF quality stay readable after compression?",
    a: "Yes. The tool is tuned to balance a smaller file size with clear, readable text and graphics. Image-heavy PDFs compress the most.",
  },
  {
    q: "What is the maximum file size I can compress?",
    a: "You can compress PDF files up to 50 MB. For very large files, consider splitting the PDF first.",
  },
  {
    q: "Are my files safe and private?",
    a: "Yes. Files are transferred over a secure connection and are not permanently stored — they are processed and then removed.",
  },
  {
    q: "Can I compress a PDF on my phone?",
    a: "Yes. The compressor is fully mobile-friendly and works in any browser on Android and iPhone without installing an app.",
  },
  {
    q: "Why is my compressed file barely smaller?",
    a: "Some PDFs are already optimized, so there is little left to remove. The biggest savings come from PDFs with large or uncompressed images.",
  },
];

export default function PdfCompressorPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "PDF Compressor",
        url: PAGE_URL,
        applicationCategory: "Utility",
        operatingSystem: "Web",
        inLanguage: "en",
        featureList: [
          "Reduce PDF file size online",
          "Keep quality readable",
          "Before/after size comparison",
          "Works on mobile and desktop",
          "Free with no signup",
          "Secure processing",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Free online PDF compressor to reduce PDF file size while keeping quality readable.",
      },
      {
        "@type": "HowTo",
        name: "How to compress a PDF online",
        totalTime: "PT1M",
        step: [
          {
            "@type": "HowToStep",
            name: "Upload your PDF",
            text: "Drag and drop or browse to select your PDF file.",
          },
          {
            "@type": "HowToStep",
            name: "Click compress",
            text: "The tool optimizes your file and shows the size reduction.",
          },
          {
            "@type": "HowToStep",
            name: "Download",
            text: "Download the smaller PDF instantly.",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "PDF Compressor", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <PdfCompressExperience variant="compressor" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
