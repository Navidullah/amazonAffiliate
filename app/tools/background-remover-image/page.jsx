// app/tools/background-remover-image/page.jsx

import BackgroundRemoverExperience from "./BackgroundRemoverExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/background-remover-image`;

/** --- SEO (keyword-optimized) --- */
export const metadata = {
  title:
    "Free Background Remover Online (AI) | Remove Background from Image to Transparent PNG",
  description:
    "Remove background from image online free with AI. Create transparent PNGs, erase white backgrounds, and cut out people, products, and logos instantly — no Photoshop, no sign-up.",
  alternates: { canonical: "/tools/background-remover-image" },
  keywords:
    "background remover, remove background from image, free background remover, remove background from image free, transparent background maker, background eraser, photo background remover, ai background remover, remove white background, bg remover, cut out background, remove background online free, make transparent png",
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "Shopyor",
    title:
      "AI Background Remover | Erase Background to Transparent PNG Online — Free",
    description:
      "Fast, accurate AI background remover. Remove white backgrounds, cut out people, and export transparent PNGs or JPEGs in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remove Background from Image Online — Free AI Background Remover",
    description:
      "Erase photo backgrounds, make logos transparent, and cut out objects instantly. Download as transparent PNG.",
  },
};

/** --- FAQ content (drives FAQPage schema) --- */
const faq = [
  {
    q: "How do I remove the background from an image online?",
    a: "Upload a JPG, PNG, or WEBP, and the AI detects the subject and erases the background automatically. Then download your image as a transparent PNG or high-quality JPEG.",
  },
  {
    q: "Is this background remover free?",
    a: "Yes — you can remove backgrounds for free, with no sign-up. The processing runs in your browser, so your images are not uploaded to a server.",
  },
  {
    q: "Does it work for logos, people, and products?",
    a: "Yes. It works well on people, products, and simple logos. Complex hair and fine edges look best with clear, high-resolution uploads.",
  },
  {
    q: "Can I make a transparent PNG?",
    a: "Absolutely — choose PNG on download to keep the transparent background for websites, ecommerce listings, or design apps.",
  },
  {
    q: "How is this different from Photoshop background removal?",
    a: "Photoshop offers manual precision but has a learning curve. This AI tool is fast and automatic — great for quick, clean cut-outs in seconds, free, with no software to install.",
  },
];

export default function BackgroundRemoverImagePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shopyor Background Remover",
    url: PAGE_URL,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web, Android, iOS, Windows, Mac",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Remove image background automatically with AI",
      "Export transparent PNG",
      "Cut out people, products, and logos",
      "Runs in the browser — images never leave your device",
      "Free, no sign-up",
    ],
  };

  return (
    <>
      <BackgroundRemoverExperience />

      {[faqLd, appLd].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
