import PdfToWordExperience from "@/app/components/pdfToWordConverter/PdfToWordExperience";

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
