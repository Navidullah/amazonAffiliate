// app/tools/background-remover-image/page.jsx

import Link from "next/link";
import { UploadCloud, Wand2, Download, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import BgRemoveClient from "@/app/components/tools/BgRemoveClient";
import BgRemoveHero from "@/app/components/tools/BgRemoveHero";

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

/** --- "How it works" steps (also drive HowTo schema) --- */
const steps = [
  {
    icon: UploadCloud,
    name: "Upload your image",
    text: "Drop in or select a JPG, PNG, or WEBP photo of the person, product, or logo you want to cut out.",
  },
  {
    icon: Wand2,
    name: "AI removes the background",
    text: "The AI automatically detects the subject and erases the background in seconds — right in your browser, with nothing to install.",
  },
  {
    icon: Download,
    name: "Download your cut-out",
    text: "Save a transparent PNG for logos, ecommerce, and design — or export as JPG or WEBP.",
  },
];

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
    <div className="mx-auto max-w-5xl px-4 pt-6 pb-16">
      {/* JSON-LD */}
      {[faqLd, appLd].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ===== Hero: copy + animated before/after ===== */}
      <header className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-5 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-300">
            <Sparkles className="h-4 w-4" />
            AI Background Remover · 100% Free
          </span>
          <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-[2.7rem]">
            Remove Image Background{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              online, free
            </span>
          </h1>
          <p className="mx-auto max-w-md text-base text-muted-foreground md:mx-0">
            Erase the background from any photo in seconds. Cut out people,
            products, and logos with AI, and download a{" "}
            <strong className="font-semibold text-foreground">transparent PNG</strong> —
            no Photoshop, no sign-up.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href="#tool"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-transform hover:-translate-y-0.5"
            >
              <UploadCloud className="h-4 w-4" /> Remove a background
            </Link>
            <span className="text-xs text-muted-foreground">
              Free · Transparent PNG · Private (runs in your browser)
            </span>
          </div>
        </div>

        <BgRemoveHero />
      </header>

      {/* ===== Tool ===== */}
      <section id="tool" className="mt-14 scroll-mt-24">
        <BgRemoveClient />
      </section>

      {/* ===== How it works ===== */}
      <section id="how-to" className="mt-16 scroll-mt-24">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          How to remove a background in 3 steps
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className="group relative rounded-2xl border border-black/5 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span className="absolute right-5 top-5 text-4xl font-black text-black/5 dark:text-white/5">
                  {i + 1}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-500 transition-transform duration-300 group-hover:scale-110 dark:text-violet-300">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-bold">
                  Step {i + 1}: {s.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <Separator className="my-14" />

      {/* ===== Benefits / Guidance ===== */}
      <article className="max-w-none space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Erase backgrounds in seconds — free
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Auto-detects the subject and deletes the background with AI.</li>
          <li>Keep fine edges like hair with clear, high-resolution uploads.</li>
          <li>Export a transparent PNG for logos, ecommerce, and graphics.</li>
          <li>Runs in your browser — your photos never leave your device.</li>
          <li>No design skills needed — faster than manual editing in Photoshop.</li>
        </ul>

        <h2 className="text-2xl font-bold tracking-tight">Tips for the best results</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          <li>Use clear, well-lit images with strong subject/background contrast.</li>
          <li>Avoid heavy compression or tiny images; higher resolution helps.</li>
          <li>For tricky edges, try a solid background or re-shoot if possible.</li>
        </ul>

        <h2 className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx + 1}`}>
              <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
              <AccordionContent>
                <p className="mt-2 text-muted-foreground">{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Related searches (visible chips; clean UX; no hidden text) */}
        <section className="mt-8">
          <h2 className="mb-3 text-2xl font-bold tracking-tight">Related searches</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            People also look for these background-removal topics:
          </p>
          <ul className="flex flex-wrap gap-2">
            {KEYWORDS.map((kw, i) => (
              <li
                key={i}
                className="rounded-full border bg-muted/30 px-3 py-1 text-xs"
              >
                {kw}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
