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
              text: "Yes. The converter applies OCR (optical character recognition) to scanned and image-based PDFs, analyzing each page as a picture and identifying the individual characters to rebuild them as real, selectable text in the Word file, rather than leaving the page as a flat, uneditable image. This is what lets you search, copy, and edit text from a paper document you scanned or photographed, instead of being stuck with a picture of text. Results depend heavily on the quality of the scan: a clean, high-resolution, straight scan at 300 DPI or higher typically converts with very high accuracy, while a blurry photo taken at an angle, low lighting, or a low-resolution fax-quality scan will produce more recognition errors that need manual correction afterward. For best results, scan at the highest resolution your scanner supports and make sure the page is flat and well-lit.",
            },
          },
          {
            "@type": "Question",
            name: "Will my PDF formatting stay accurate after conversion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The conversion engine preserves layout, fonts, tables, bullet points, headings, and text styles as closely as possible, so your DOCX file looks like the original PDF rather than a stripped-down plain-text version. Simple, single-column documents like letters, resumes, and reports typically convert with near-pixel-perfect formatting, since there's little ambiguity in how the layout should map to Word's document model. Complex multi-column layouts, documents with overlapping text boxes, or PDFs with unusual custom fonts not installed on your system may need minor manual adjustments in Word afterward — for example, a three-column newsletter layout sometimes needs its column breaks re-checked. As a general rule, the simpler and more text-based the original PDF, the more reliably the formatting carries over.",
            },
          },
          {
            "@type": "Question",
            name: "How do I convert a PDF to Word without losing formatting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upload your PDF using the box above, click Convert, and download the resulting DOCX file once processing finishes, which typically takes just a few seconds for a standard document. For the cleanest possible result, use text-based PDFs (ones created directly from Word, Google Docs, or similar software) rather than scanned image PDFs, since text-based PDFs already contain real character data that maps cleanly to Word's formatting, while scans require OCR and carry more risk of small recognition errors. Also avoid copy-pasting text directly from a PDF reader like Adobe Acrobat into Word as an alternative method, because that approach strips almost all original formatting, fonts, and layout — the dedicated converter above preserves far more of the original document's structure than a manual copy-paste ever can.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert PDF to Word on my phone?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. The tool is fully mobile-friendly and works in any modern browser on Android and iPhone, including Safari and Chrome, with no app installation required at any point. Tap to upload a PDF directly from your phone's file manager, cloud storage app, or even an email attachment, then tap Convert and the DOCX file downloads straight to your device just as it would on desktop. This is particularly useful when you receive a PDF contract, scanned form, or report on your phone and need an editable Word version immediately, without waiting until you're at a computer.",
            },
          },
          {
            "@type": "Question",
            name: "What is the maximum file size I can convert?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can convert PDF files up to 25 MB in a single upload, which comfortably covers the vast majority of everyday documents — a typical 20-page text-based PDF report is usually well under 5 MB, and even a 50-page scanned document with images often stays under 20 MB. For larger documents, such as a lengthy scanned book or a PDF packed with high-resolution images, split the file into smaller parts using a free PDF-splitting tool and convert each section separately, then combine the resulting Word documents if needed. This limit exists to keep conversion fast and reliable for everyone using the free tool, rather than letting a handful of very large files slow down processing for other users.",
            },
          },
          {
            "@type": "Question",
            name: "Are my files private and secure?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Files are transferred to our conversion engine over an encrypted HTTPS connection, the same level of security used for online banking, and are not permanently stored on our servers — each file is processed for conversion and then deleted shortly afterward rather than being kept in long-term storage. We don't open, read, or share the contents of your documents, and no human reviews the files you upload; the entire process is automated from upload to download. This matters especially for sensitive documents like contracts, resumes with personal details, or financial statements, where you want assurance that a copy isn't sitting on a server indefinitely after you've finished converting it.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert multiple PDFs at once?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The tool processes one PDF at a time rather than offering a bulk-upload queue, since this keeps each conversion fast and gives you a chance to check the result before moving to the next file. To convert several files, upload and convert each one individually — conversion usually takes just a few seconds per file for standard text-based PDFs, so converting five or six documents back-to-back typically takes well under a couple of minutes total. If you regularly need to convert a large batch of PDFs (for example, archiving dozens of scanned receipts), it's worth doing them in one sitting since there's no daily limit on how many free conversions you can run.",
            },
          },
          {
            "@type": "Question",
            name: "What format is the output, and will it open in Google Docs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The output is a standard .docx file — the same modern Word format used by Microsoft Word 2007 and every version since — which opens directly in Microsoft Word (Windows, Mac, and the web version), Google Docs (via upload or Google Drive), LibreOffice Writer, and Apple Pages without needing any file conversion on your part. If you open it in Google Docs, you can also use Google's 'Save as Google Docs' option afterward to keep editing in that format, or leave it as .docx if you need to send it back to someone using Microsoft Word. The .docx format was chosen specifically because it's the most universally compatible editable document format across both desktop and web-based word processors.",
            },
          },
          {
            "@type": "Question",
            name: "What if the primary conversion service is unavailable?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The converter uses a multi-provider engine with automatic fallback built in, so if the primary conversion service is temporarily down or overloaded, the tool automatically switches to a backup provider behind the scenes to keep your conversion working without any extra steps on your end. You won't typically see any difference in output quality between providers for standard documents, since both are tuned to preserve the same layout, fonts, and OCR accuracy. This redundancy exists specifically so a single point of failure (one provider having downtime) doesn't take the whole tool offline for users who need to convert a file right now.",
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
