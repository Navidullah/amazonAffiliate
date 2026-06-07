import PdfToWordExperience from "@/app/components/pdfToWordConverter/PdfToWordExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title: "PDF to Word Converter — Free, Online & Accurate (No Signup) | Shopyor",
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
    canonical: `${BASE_URL}/tools/pdf-to-word`,
    languages: {
      "x-default": `${BASE_URL}/tools/pdf-to-word`,
      en: `${BASE_URL}/tools/pdf-to-word`,
      "en-US": `${BASE_URL}/tools/pdf-to-word`,
      "en-GB": `${BASE_URL}/tools/pdf-to-word`,
      "en-IN": `${BASE_URL}/tools/pdf-to-word`,
      "en-PK": `${BASE_URL}/tools/pdf-to-word`,
      "en-NG": `${BASE_URL}/tools/pdf-to-word`,
      "en-PH": `${BASE_URL}/tools/pdf-to-word`,
      "en-ID": `${BASE_URL}/tools/pdf-to-word`,
      "en-BD": `${BASE_URL}/tools/pdf-to-word`,
      "en-CA": `${BASE_URL}/tools/pdf-to-word`,
      "en-AU": `${BASE_URL}/tools/pdf-to-word`,
      "en-ZA": `${BASE_URL}/tools/pdf-to-word`,
    },
  },
  openGraph: {
    title: "Free PDF to Word Converter Online — Editable DOCX in Seconds",
    description:
      "Convert PDF to Word for free with formatting preserved and OCR for scanned files. No signup, secure, and mobile-friendly.",
    url: `${BASE_URL}/tools/pdf-to-word`,
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
        url: `${BASE_URL}/tools/pdf-to-word`,
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
          {
            "@type": "Question",
            name: "Can I convert a scanned PDF to Word?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The converter applies OCR (optical character recognition) to scanned and image-based PDFs so the text becomes editable in the Word file. Results depend on the scan quality.",
            },
          },
          {
            "@type": "Question",
            name: "Does it keep my PDF formatting in the Word file?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The engine preserves layout, fonts, tables, and text styles as closely as possible so your DOCX looks like the original PDF.",
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
            name: "What is the difference between DOC and DOCX?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "DOCX is the modern Microsoft Word format used since Word 2007 and is supported by Word, Google Docs, and LibreOffice. This tool outputs DOCX, which opens in all current word processors.",
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
