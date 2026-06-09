import WhiteboardAnimator from "./WhiteboardAnimator";

export const metadata = {
  title: "Whiteboard Animation Maker — Free Speed Paint / Draw Tool | Shopyor",
  description:
    "Turn any image into a hand-drawn whiteboard animation online for free. Like Canva's Speed Paint / Draw effect — add a drawing hand and export as video (MP4) or GIF. No sign-up, no watermark, 100% in your browser.",
  keywords: [
    "whiteboard animation",
    "whiteboard animation maker",
    "speed paint tool",
    "draw animation",
    "canva draw effect",
    "image to whiteboard animation",
    "hand drawing animation",
    "doodle animation maker",
    "sketch animation",
    "explainer video maker",
    "whiteboard video maker free",
    "animated drawing maker",
    "image to gif animation",
    "draw my image",
    "free whiteboard animation online",
  ],
  alternates: {
    canonical: "https://shopyor.com/tools/whiteboard-animation",
  },
  openGraph: {
    title: "Free Whiteboard Animation Maker — Speed Paint Your Images",
    description:
      "Create whiteboard / speed-paint animations from any image and export them as video or GIF. Free, instant, browser-based.",
    type: "website",
    url: "https://shopyor.com/tools/whiteboard-animation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whiteboard Animation Maker — Free Online Tool",
    description: "Turn images into hand-drawn whiteboard animations. Export as video or GIF.",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Whiteboard Animation Maker",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    url: "https://shopyor.com/tools/whiteboard-animation",
    description:
      "Free online whiteboard animation maker. Convert any image into a hand-drawn speed-paint animation and export it as an MP4 video or animated GIF, right in your browser.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a whiteboard animation / speed paint tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It animates an image so it looks like it is being drawn by hand on a whiteboard, stroke by stroke — the same effect as Canva's Draw / Speed Paint animation.",
        },
      },
      {
        "@type": "Question",
        name: "What image formats can I use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PNG, JPG and WebP are supported. Transparent PNG line-art gives the cleanest hand-drawn look, but photos work too.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download the animation as a video or GIF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can export your whiteboard animation as an MP4 video or an animated GIF. Everything is generated in your browser with no watermark.",
        },
      },
      {
        "@type": "Question",
        name: "Is the whiteboard animation tool free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, it is completely free with no sign-up required, and your image never leaves your device.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <WhiteboardAnimator />
    </>
  );
}
