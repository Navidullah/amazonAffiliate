// app/tools/image-compressor/page.jsx

import ImageCompressorExperience from "./ImageCompressorExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_PATH = "/tools/image-compressor";
const PAGE_URL = `${BASE_URL}${PAGE_PATH}`;

/** --- SEO (low-competition, long-tail keyword optimized) --- */
export const metadata = {
  title: {
    absolute:
      "Compress Image Online Free (JPG, PNG, WebP) — No Quality Loss | Shopyor",
  },
  description:
    "Compress JPG, PNG, and WebP images online for free without losing quality. Reduce image file size in seconds — smaller files, faster pages, no signup.",
  keywords: [
    "compress image",
    "compress image online free",
    "compress image without losing quality",
    "reduce image size in kb",
    "compress image to 100kb",
    "compress jpg to 200kb",
    "compress png file size",
    "compress webp online",
    "reduce photo size for email",
    "compress image for website",
    "shrink image file size",
    "reduce image mb to kb",
    "optimize images for web",
    "photo compressor online",
    "make image smaller without losing quality",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "tools",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_US",
    title: "Free Online Image Compressor — Reduce Image Size Without Quality Loss",
    description:
      "Compress JPG, PNG & WebP images right in your browser. Smaller files, faster pages, better Core Web Vitals — free and private.",
    images: [
      {
        url: `${BASE_URL}/images/og-image-compressor.jpg`,
        width: 1200,
        height: 630,
        alt: "Shopyor free online image compressor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Image Online Free — No Quality Loss | Shopyor",
    description:
      "Reduce JPG, PNG & WebP file size in seconds. Free, fast, and private in your browser.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/og-image-compressor.jpg`],
  },
};

/** --- FAQ (plain-text answers kept in sync with the FAQPage JSON-LD) --- */
const faq = [
  {
    q: "How do I compress an image without losing quality?",
    a: "Upload your photo, keep the quality slider in the 60-80% range, and export as JPEG or WebP — at that setting, JPEG's compression algorithm discards mostly-invisible high-frequency detail first, so a 5 MB photo can often drop to under 800 KB while still looking visually identical at normal viewing size. Going much below 60% starts to introduce visible blockiness around sharp edges and gradients, so it's worth comparing the before/after preview rather than guessing. For graphics, logos, and screenshots with flat colors and text, choose PNG instead, since it's lossless and avoids the JPEG artifacts that show up around hard edges. Everything runs locally in your browser via WebAssembly, so there's no upload wait and no quality loss from a round-trip to a server.",
  },
  {
    q: "How can I reduce an image to 100 KB?",
    a: "Start by lowering the compression quality slider and choosing WebP output, since WebP typically produces files 25-35% smaller than an equivalent-quality JPEG — then compress and check the new size shown next to the result. If it's still above 100 KB, the fastest second lever is resizing the image's dimensions before compressing: a 4000×3000 photo resized down to 1200×900 with our image resizer can easily cut file size by 80% or more on its own, because file size scales roughly with pixel count, not just compression quality. Combining a moderate quality reduction (around 50-60%) with a smaller dimension is usually far more effective at hitting a strict 100 KB target than pushing the quality slider to its lowest setting alone, which tends to look worse for the same final size.",
  },
  {
    q: "Which format is best — JPG, PNG, or WebP?",
    a: "Use JPEG for photographs and anything with smooth color gradients (skies, skin tones, landscapes), since its compression is tuned for that kind of detail. Use PNG for graphics, logos, screenshots, and anything that needs a transparent background, because PNG is lossless and preserves sharp edges and flat colors without artifacts — the tradeoff is larger file size. Use WebP when you want the smallest possible file at a comparable visual quality to JPEG or PNG: it's supported by every modern browser (Chrome, Firefox, Safari, Edge) and typically beats JPEG by 25-35% and PNG by even more at the same perceived quality, which is why it's increasingly the default recommendation for web images in Google's own PageSpeed Insights guidance.",
  },
  {
    q: "Is this image compressor free and private?",
    a: "Yes. It's completely free with no signup, no watermark, and no file limits. Because compression happens locally in your browser using WebAssembly rather than on a remote server, your images are never uploaded anywhere — they stay on your device for the entire process, from selecting the file to downloading the compressed result.",
  },
  {
    q: "Does compressing images help SEO and page speed?",
    a: "Yes, directly. Large, uncompressed images are one of the single most common causes of slow-loading pages, and Google's Core Web Vitals explicitly measure Largest Contentful Paint (LCP) — the time it takes for the biggest visible element (often a hero image) to render — as a ranking factor. Shrinking a 3 MB hero image down to 300-400 KB can cut LCP by a full second or more on a typical mobile connection, which both improves the user experience (fewer people bounce while waiting) and helps the page qualify for Google's 'good' Core Web Vitals threshold, a factor Google has confirmed influences search rankings. For image-heavy pages like blog posts or product galleries, compression is often the single highest-leverage speed fix available.",
  },
  {
    q: "Can I compress images on my phone?",
    a: "Yes. The tool works in any modern mobile browser on iPhone and Android — there's no app to install and no extra storage taken up beyond your browser itself. Just open the page, tap to select a photo from your camera roll or gallery, adjust the quality slider, tap compress, and download the smaller version straight to your device's downloads or photos folder. Because processing happens on your phone's own hardware rather than a remote server, there's no upload step waiting on your mobile data or Wi-Fi speed, which makes it noticeably faster than cloud-based compressors when you're compressing several photos in a row before sharing them.",
  },
];

/** --- Structured data (single @graph) --- */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Shopyor Image Compressor",
      url: PAGE_URL,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript",
      inLanguage: "en",
      description:
        "Free online image compressor to reduce JPG, PNG, and WebP file size without visible quality loss — runs privately in your browser.",
      featureList: [
        "Compress JPG, PNG, and WebP images",
        "Adjustable quality slider",
        "Choose JPEG, PNG, or WebP output",
        "Before/after size comparison",
        "Runs fully in your browser — private by design",
        "Free with no signup or watermark",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${BASE_URL}/tools` },
        { "@type": "ListItem", position: 3, name: "Image Compressor", item: PAGE_URL },
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

export default function ImageCompressorPage() {
  return (
    <>
      <ImageCompressorExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  );
}
