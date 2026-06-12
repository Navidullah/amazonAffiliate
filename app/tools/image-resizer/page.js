import ImageResizer from "./ImageResizer";

export const metadata = {
  title: "Image Resizer Tool – Resize Images Online | Shopyor",
  description:
    "Resize any image instantly with our free Image Resizer tool. Change width and height of JPG, PNG and other formats online.",
  keywords: [
    "resize image online",
    "change image size",
    "resize jpg",
    "resize png",
    "free image resizer",
    "decrease picture size",
    "pic size reducer",
    "reduce picture size",
    "reduce image dimensions",
    "reduce image resolution",
    "image resize",
    "photo resizer",
    "resize and image",
    "re size image",
    "minimize picture size",
    "lower photo size",
    "minimize photo size",
    "decrease pic size",
    "photo image resizer",
    "pic size decrease",
    "reduce image size",
    "resize image in kb",
    "photo size reducer",
    "reduce the size of jpg",
    "reduce size of jpg",
    "reduce image",
    "increase image size",
    "increase dimensions of image",
    "reduce size of jpeg",
    "increase size image",
    "increase picture size",
    "photo resizer in kb",
    "passport photo size maker",
    "jpeg to jpg compressor",
    "image kb resizer",
    "image resizer to kb",
    "increase the image size",
    "shrink jpeg size",
    "jpg to resize",
    "pic resize in kb",
    "reduce pic",
    "reduce pictures",
    "increase image dimensions",
    "resize image into kb",
    "resize image size in kb",
    "resize the image in kb",
  ],
  alternates: { canonical: "/tools/image-resizer" },
  openGraph: {
    title: "Image Resizer Tool - Shopyor",
    description: "Resize any image instantly online.",
    url: "https://www.shopyor.com/tools/image-resizer",
    type: "website",
  },
};

export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can I resize any image format?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, our tool supports JPG, PNG, and most common image formats.",
        },
      },
      {
        "@type": "Question",
        name: "Is this image resizer free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can resize images online for free using our tool.",
        },
      },
      {
        "@type": "Question",
        name: "Are my images stored?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, images are processed instantly and not stored on our servers.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <ImageResizer />
    </>
  );
}
