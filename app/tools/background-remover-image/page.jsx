// app/tools/background-remover-image/page.jsx

import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import BgRemoveClient from "@/app/components/tools/BgRemoveClient";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

/** --- SEO (keyword-optimized) --- */
export const metadata = {
  title:
    "Free Background Remover Online (AI) | Remove Background from Image to Transparent PNG",
  description:
    "Remove background from image online free with AI. Create transparent PNGs, erase white backgrounds, and cut out subjects instantly—no Photoshop required.",
  alternates: { canonical: "/tools/background-remover-image" },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/tools/background-remover-image`,
    siteName: "Shopyor",
    title:
      "AI Background Remover | Delete/Erase Background to Transparent PNG Online",
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

/** --- Related search chips (from your keyword sheet) --- */
const KEYWORDS = [
  "background remove",
  "remove background from image",
  "free background remover",
  "remove background from image free",
  "transparent background maker",
  "adobe background remover",
  "background eraser",
  "photo background remover",
  "remove background photoshop",
  "app to remove background",
  "bg remover",
  "video background remover",
  "app to remove people from background",
  "remove white background from image",
  "photo background",
  "remove background from logo",
  "remove background online",
  "picture background remover",
  "remove white background",
  "remove people from background",
  "cut out background",
  "delete background",
  "background remover png",
  "remove background online free",
  "ai background remover",
  "photo background editor",
  "change picture background",
  "background changer",
  "app to remove background from photo",
  "remove background from image photoshop",
];

/** --- FAQ content --- */
const faq = [
  {
    q: "How do I remove the background from an image online?",
    a: (
      <>
        Upload a JPG/PNG, then our AI detects the subject and erases the
        background automatically. Download your image as a transparent PNG or
        high-quality JPEG.
      </>
    ),
  },
  {
    q: "Is this background remover free?",
    a: (
      <>
        Yes, you can remove backgrounds for free. For large files or bulk
        processing, consider upgrading to a higher limit if available.
      </>
    ),
  },
  {
    q: "Does it work for logos, people, and products?",
    a: (
      <>
        Yes. It works well on people, products, and simple logos. Complex
        hair/edges typically look best with high-resolution uploads.
      </>
    ),
  },
  {
    q: "Can I make a transparent PNG?",
    a: (
      <>
        Absolutely—choose PNG on download to keep the transparent background for
        websites, ecommerce listings, or design apps.
      </>
    ),
  },
  {
    q: "How is this different from Photoshop background removal?",
    a: (
      <>
        Photoshop offers manual precision. Our AI tool is fast and automatic—
        great for quick, clean cutouts without a learning curve.
      </>
    ),
  },
];

export default function BackgroundRemoverImagePage() {
  // FAQ JSON-LD
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: stripTags(item.q),
      acceptedAnswer: { "@type": "Answer", text: toPlainHtml(item.a) },
    })),
  };

  return (
    <main className="mx-auto max-w-4xl px-4 pt-28 md:pt-32 lg:pt-32">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero */}
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Free AI Background Remover — Make Transparent PNGs
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Remove background from image online. Cut out people, products, and
          logos with AI. Download as transparent PNG or high-quality JPEG.
        </p>
      </header>

      {/* Tool */}
      <section>
        <BgRemoveClient />
      </section>

      <Separator />

      {/* Benefits / Guidance */}
      <article className="max-w-none space-y-6">
        <h2>Erase Backgrounds in Seconds</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Auto-detects the subject and deletes the background.</li>
          <li>Keep fine edges like hair with high-res uploads.</li>
          <li>Export as transparent PNG for logos, ecommerce, and graphics.</li>
          <li>No design skills needed—faster than manual editing.</li>
        </ul>

        <h2>Best Results: Quick Tips</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Use clear, well-lit images with strong subject/background contrast.
          </li>
          <li>
            Avoid heavy compression or tiny images; higher resolution helps.
          </li>
          <li>
            For tricky edges, try a solid background or re-shoot if possible.
          </li>
        </ul>

        <h2>Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx + 1}`}>
              <AccordionTrigger className="text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="[&_p]:mt-2 [&_strong]:font-semibold">
                <p>{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Related searches (visible chips; clean UX; no hidden text) */}
        <section className="mt-8">
          <h2 className="mb-3">Related searches</h2>
          <p className="text-sm text-muted-foreground mb-3">
            People also look for these background-removal topics:
          </p>
          <ul className="flex flex-wrap gap-2">
            {KEYWORDS.map((kw, i) => (
              <li
                key={i}
                className="text-xs rounded-full border px-3 py-1 bg-muted/30"
              >
                {kw}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}

/** Helpers to safely serialize React content to JSON-LD text */
function stripTags(text) {
  return String(text).replace(/<[^>]*>/g, "");
}
function toPlainHtml(node) {
  return stripTags(renderToText(node));
}
function renderToText(node) {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(renderToText).join("");
  if (!node || typeof node !== "object") return "";
  const children = node.props?.children ?? "";
  return renderToText(children);
}
