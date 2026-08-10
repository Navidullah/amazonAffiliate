// app/tools/exif-remover/page.jsx
import ExifRemoverExperience from "@/app/components/tools/ExifRemoverExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/exif-remover`;

/** --- SEO (low-competition, long-tail keyword optimized) --- */
export const metadata = {
  title: {
    absolute: "Free EXIF Remover – View & Remove Photo Metadata | Shopyor",
  },
  description:
    "Remove EXIF data from photos online — strip GPS location, camera info, and hidden metadata right in your browser with no upload. Free, no signup.",
  keywords: [
    "exif remover",
    "remove exif data from photo online",
    "remove exif data no upload",
    "photo metadata remover",
    "remove gps location from photo",
    "strip metadata from image",
    "exif viewer online",
    "view exif data online",
    "remove geotag from photo",
    "delete camera info from photo",
    "remove hidden data from image",
    "exif data remover free",
    "remove location data before sharing",
    "metadata cleaner for photos",
    "remove exif from jpeg png webp",
    "photo privacy tool",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_US",
    title: "Free EXIF Remover – View & Remove Photo Metadata Online",
    description:
      "Strip GPS location, camera info, and hidden metadata from photos — in your browser with no upload, or via server for big files. Free, no signup.",
    images: [
      {
        url: `${BASE_URL}/images/shopyor-tools-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor EXIF Remover – Remove photo metadata online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "Free EXIF Remover – View & Remove Photo Metadata | Shopyor",
    description:
      "See exactly what hidden data your photo carries, then strip GPS and camera info before sharing. Free, no signup, no upload needed.",
    images: [`${BASE_URL}/images/shopyor-tools-og.png`],
  },
};

/** --- FAQ (plain-text answers so JSON-LD and UI stay in sync) --- */
const faq = [
  {
    q: "What is EXIF data and why should I remove it?",
    a: "EXIF (Exchangeable Image File Format) is hidden metadata your camera or phone embeds in every photo: GPS coordinates of where it was taken, the exact date and time, your device model, and camera settings. Anyone who downloads your photo can read this data, which can reveal your home address or daily routine — so it is worth stripping before you share images publicly.",
  },
  {
    q: "Does this tool upload my photos?",
    a: "Not if you choose the on-device option. \"Remove on device\" processes the photo entirely in your browser — it never leaves your computer or phone. The optional \"Remove via server\" mode uploads over a secure HTTPS connection and is better for very large files; the image is processed and not stored permanently.",
  },
  {
    q: "How do I remove the GPS location from a photo?",
    a: "Upload the photo above and click Remove on device. GPS coordinates are part of the EXIF block, so they are deleted along with the rest of the metadata. You can expand \"Show detected EXIF\" first to see exactly which location data the photo contains.",
  },
  {
    q: "Can I see what metadata my photo contains before removing it?",
    a: "Yes. As soon as you upload an image, the built-in EXIF viewer lists everything it detects — GPS, timestamps, camera make and model, lens, exposure settings, and more. After cleaning, the tool re-checks the file so you can verify the metadata is gone.",
  },
  {
    q: "Does removing EXIF data reduce image quality?",
    a: "Your photo stays visually identical. Only the hidden metadata block is affected — the picture itself is preserved. The on-device mode re-encodes at very high quality, and the server mode uses the Sharp image engine to keep your pixels intact.",
  },
  {
    q: "What image formats are supported?",
    a: "You can clean JPEG, PNG, WebP, and AVIF files. JPEG photos from phones and cameras carry the most metadata, but screenshots and exported PNGs can contain hidden data too.",
  },
  {
    q: "Don't Instagram and WhatsApp remove EXIF data automatically?",
    a: "Major social networks like Instagram, Facebook, and X strip most metadata on upload, but you should not rely on it everywhere: files sent as documents or attachments — for example via WhatsApp's document option, Telegram file sharing, email, or cloud links — often keep full EXIF including GPS. The safest habit is stripping metadata before the photo leaves your device.",
  },
  {
    q: "Is this EXIF remover free?",
    a: "Yes — completely free with no signup, no watermark, and no limits on the on-device mode. Upload, inspect, clean, and download as many photos as you like.",
  },
];

export default function ExifRemoverPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Shopyor EXIF Remover",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online EXIF remover and viewer. Inspect hidden photo metadata, then strip GPS location, camera info, and timestamps — on-device with no upload, or via server for large files.",
        featureList: [
          "Built-in EXIF viewer shows all hidden metadata",
          "On-device cleaning — photos never leave your browser",
          "Optional server mode for very large files",
          "Removes GPS location, camera info, and timestamps",
          "Supports JPEG, PNG, WebP, and AVIF",
          "Verifies the cleaned file is metadata-free",
          "Free with no signup and no watermark",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${BASE_URL}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "EXIF Remover",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <ExifRemoverExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
