import PdfCompressExperience from "@/app/components/pdf-compressor-node/PdfCompressExperience";

const BASE_URL = "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/pdf-compress`;

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
    absolute: "Compress PDF Online — Free PDF Size Reducer for Email | Shopyor",
  },
  description:
    "Compress PDF online for free to fit email and upload size limits. Reduce PDF file size in seconds while keeping it readable. No signup, secure, mobile-friendly.",
  keywords: [
    "compress pdf",
    "compress pdf online",
    "compress pdf for email",
    "reduce pdf file size",
    "make pdf smaller",
    "compress pdf to send by email",
    "compress pdf for upload",
    "shrink pdf file",
    "compress pdf free",
    "compress pdf on phone",
    "reduce pdf size for whatsapp",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "compress PDF tool",
  alternates: {
    canonical: PAGE_URL,
    languages: hreflang("/tools/pdf-compress"),
  },
  openGraph: {
    title: "Compress PDF Online — Free PDF Size Reducer",
    description:
      "Shrink PDF files to fit email attachments and upload limits. Free, fast, secure — no signup.",
    url: PAGE_URL,
    siteName: "Shopyor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Online — Free | Shopyor",
    description:
      "Reduce PDF file size for email and uploads in seconds — free and secure.",
    creator: "@shopyor",
    site: "@shopyor",
  },
};

const FAQS = [
  {
    q: "How do I compress a PDF for free?",
    a: "Upload your PDF above, click Compress PDF, and download the smaller file. It is completely free with no signup.",
  },
  {
    q: "How can I compress a PDF to send it by email?",
    a: "Compress the file here to get it under your email provider's attachment limit (usually 25 MB), then attach the smaller version as normal.",
  },
  {
    q: "Will compressing reduce the quality of my PDF?",
    a: "The tool keeps text and most graphics clearly readable while reducing size. Image-heavy PDFs compress the most; text-only PDFs change the least.",
  },
  {
    q: "What file size can I compress?",
    a: "You can compress PDFs up to 50 MB. For larger documents, split the PDF into parts and compress each one.",
  },
  {
    q: "Can I compress a PDF on my phone?",
    a: "Yes. The tool works in any mobile browser on Android and iPhone — no app needed.",
  },
  {
    q: "Are my uploaded files private?",
    a: "Yes. Files are processed securely over an encrypted connection and are not stored permanently.",
  },
];

export default function PdfCompressPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Compress PDF",
        url: PAGE_URL,
        applicationCategory: "Utility",
        operatingSystem: "Web",
        inLanguage: "en",
        featureList: [
          "Compress PDF for email attachments",
          "Reduce PDF size to meet upload limits",
          "Keep documents readable",
          "Works on mobile and desktop",
          "Free with no signup",
          "Secure processing",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description:
          "Free online tool to compress PDF files so they fit email attachment and upload size limits.",
      },
      {
        "@type": "HowTo",
        name: "How to compress a PDF for email or upload",
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
            text: "The tool shrinks your file and shows the new size.",
          },
          {
            "@type": "HowToStep",
            name: "Download and send",
            text: "Download the smaller PDF and attach or upload it.",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
          { "@type": "ListItem", position: 3, name: "Compress PDF", item: PAGE_URL },
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
      <PdfCompressExperience variant="compress" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
