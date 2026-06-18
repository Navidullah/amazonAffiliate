import PdfToWordExperience from "@/app/components/pdfToWordConverter/PdfToWordExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  // `absolute` bypasses the root layout's "%s | Shopyor" template so the
  // brand isn't duplicated. Kept under 60 chars to avoid SERP truncation.
  title: {
    absolute: "PDF to Word Converter — Free, Fast & Accurate | Shopyor",
  },
  description:
    "Convert PDF to Word (DOCX) online for free — no signup. Editable Word in seconds with formatting preserved, OCR for scanned PDFs, and secure processing. Works on mobile & desktop.",
  keywords: [
    "pdf to word converter",
    "convert pdf to word online",
    "pdf to word free",
    "pdf to docx converter",
    "convert pdf to docx online",
    "free pdf to word converter no signup",
    "pdf to word converter online free",
    "scanned pdf to word",
    "pdf to word with ocr",
    "convert scanned pdf to editable word",
    "pdf to word keep formatting",
    "accurate pdf to word converter",
    "pdf to word on mobile",
    "convert pdf to word on phone",
    "pdf to editable word document",
    "best free pdf to word converter",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "PDF to Word converter tool",
  alternates: {
    canonical: `${BASE_URL}/tools/online-pdf-to-word-converter`,
    languages: {
      "x-default": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      en: `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-US": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-GB": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-IN": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-PK": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-NG": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-PH": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-ID": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-BD": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-CA": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-AU": `${BASE_URL}/tools/online-pdf-to-word-converter`,
      "en-ZA": `${BASE_URL}/tools/online-pdf-to-word-converter`,
    },
  },
  openGraph: {
    title: "Free PDF to Word Converter Online — Editable DOCX in Seconds",
    description:
      "Convert PDF to Word for free with formatting preserved and OCR for scanned files. No signup, secure, and mobile-friendly.",
    url: `${BASE_URL}/tools/online-pdf-to-word-converter`,
    siteName: "Shopyor",
    type: "website",
    locale: "en_US",
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
    title: "Free PDF to Word Converter Online | Shopyor",
    description:
      "Convert PDFs into editable Word documents in seconds — free, no signup, OCR for scanned PDFs.",
    creator: "@shopyor",
    site: "@shopyor",
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
        url: `${BASE_URL}/tools/online-pdf-to-word-converter`,
        applicationCategory: "Utility",
        operatingSystem: "Web",
        inLanguage: "en",
        featureList: [
          "Convert PDF to editable Word (DOCX)",
          "OCR for scanned and image-based PDFs",
          "Preserves layout and formatting",
          "Works on mobile and desktop",
          "Free with no signup",
          "Secure processing with provider fallback",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Free online PDF to Word converter for turning PDF files into editable DOCX documents quickly with high accuracy and OCR for scanned PDFs.",
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
            item: `${BASE_URL}/tools/online-pdf-to-word-converter`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is this PDF to Word converter free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, it is completely free to use with no signup, no daily limits, and no hidden fees. Convert as many PDF files to Word as you need.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert a scanned PDF to Word?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The converter applies OCR (optical character recognition) to scanned and image-based PDFs so the text becomes editable and searchable in the Word file. Results depend on the quality of the scan.",
            },
          },
          {
            "@type": "Question",
            name: "Will my PDF formatting stay accurate after conversion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The engine preserves layout, fonts, tables, bullet points, and text styles as closely as possible, so your DOCX looks like the original PDF. Complex multi-column layouts may need minor adjustments in Word.",
            },
          },
          {
            "@type": "Question",
            name: "How do I convert a PDF to Word without losing formatting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upload your PDF, click Convert, and download the DOCX. For the cleanest result use text-based PDFs rather than scans, and avoid copy-pasting from a PDF reader because that strips formatting.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert PDF to Word on my phone?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The tool is fully mobile-friendly and works in any browser on Android and iPhone — no app installation required.",
            },
          },
          {
            "@type": "Question",
            name: "What is the maximum file size I can convert?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can convert PDF files up to 25 MB. For larger documents, split the PDF into smaller parts and convert each section separately.",
            },
          },
          {
            "@type": "Question",
            name: "Are my files private and secure?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Files are transferred over a secure connection and are not permanently stored on our servers — they are processed and then removed after conversion.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert multiple PDFs at once?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The tool processes one PDF at a time. To convert several files, upload and convert each one individually — conversion usually takes just a few seconds per file.",
            },
          },
          {
            "@type": "Question",
            name: "What format is the output, and will it open in Google Docs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The output is a standard .docx file, which opens in Microsoft Word (all versions), Google Docs, LibreOffice Writer, and Apple Pages.",
            },
          },
          {
            "@type": "Question",
            name: "What if the primary conversion service is unavailable?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The converter uses a multi-provider engine with automatic fallback, so if the primary service is temporarily down it switches to a backup provider to keep working.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <PdfToWordExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
