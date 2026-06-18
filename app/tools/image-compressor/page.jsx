// app/tools/image-compressor/page.jsx

import Link from "next/link";
import ImageCompressionGuide from "@/app/components/tools/ImageCompressionGuide";
import ImageCompressorClient from "@/app/components/tools/ImageCompressorClient";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Home,
  UploadCloud,
  SlidersHorizontal,
  Download,
  Lock,
  Zap,
  Gauge,
  ImageDown,
  Crop,
  Eraser,
  FileArchive,
} from "lucide-react";

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

/** --- "How it works" steps (also drive HowTo schema) --- */
const steps = [
  {
    icon: UploadCloud,
    name: "Upload your image",
    text: "Drag and drop or select a JPG, PNG, or WebP file. It loads instantly and stays in your browser.",
  },
  {
    icon: SlidersHorizontal,
    name: "Set quality and format",
    text: "Adjust the compression slider and choose JPEG, PNG, or WebP output to balance size and quality.",
  },
  {
    icon: Download,
    name: "Compress and download",
    text: "Click compress to shrink the file, compare before and after, then download your smaller image.",
  },
];

/** --- Feature highlights --- */
const features = [
  {
    icon: Lock,
    title: "100% private",
    text: "Compression runs entirely in your browser — your images are never uploaded to a server.",
  },
  {
    icon: Zap,
    title: "Instant & free",
    text: "No signup, no watermark, no limits. Shrink images in seconds, as many as you like.",
  },
  {
    icon: Gauge,
    title: "Better Core Web Vitals",
    text: "Smaller images mean faster pages, lower bounce rates, and a healthier SEO score.",
  },
];

/** --- Long-tail "Related searches" block --- */
const KEYWORDS = [
  "compress image to 100kb",
  "compress jpg to 200kb",
  "reduce image size in kb",
  "compress image without losing quality",
  "compress png file size",
  "compress webp online",
  "reduce photo size for email",
  "compress image for website",
  "shrink image file size online",
  "reduce image mb to kb",
  "make image smaller without losing quality",
  "optimize images for web free",
];

/** --- Related tools (internal links) --- */
const relatedTools = [
  {
    icon: Crop,
    title: "Image Resizer",
    text: "Change image dimensions before you compress.",
    href: "/tools/image-resizer",
  },
  {
    icon: Eraser,
    title: "Background Remover",
    text: "Erase a background and export a transparent PNG.",
    href: "/tools/background-remover-image",
  },
  {
    icon: FileArchive,
    title: "PDF Compressor",
    text: "Shrink PDF files the same easy way.",
    href: "/tools/pdf-compressor",
  },
];

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
    <div className="bg-background mx-auto max-w-4xl px-4 pt-6 pb-20 md:pt-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Link href="/" className="flex items-center gap-1 hover:text-foreground">
          <Home className="size-3.5" /> Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href="/tools" className="hover:text-foreground">
          Tools
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">Image Compressor</span>
      </nav>

      {/* Hero */}
      <header className="relative mb-8 overflow-hidden rounded-3xl border bg-gradient-to-br from-emerald-500/5 via-background to-sky-500/5 px-6 py-10 text-center sm:px-10">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <ImageDown className="size-3.5 text-emerald-500" />
            Free · No signup · Private in your browser
          </span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Compress Image Online{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
              Without Losing Quality
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Reduce the file size of JPG, PNG, and WebP images in seconds. Shrink
            photos for faster pages, smaller email attachments, and better Core
            Web Vitals — all for free, right in your browser.
          </p>
        </div>
      </header>

      {/* The tool */}
      <ImageCompressorClient />

      {/* How it works */}
      <section className="mt-14">
        <h2 className="mb-6 text-center text-2xl font-semibold">How it works</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white">
                <step.icon className="size-5" />
              </div>
              <h3 className="mb-1.5 font-semibold">
                {i + 1}. {step.name}
              </h3>
              <p className="text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mt-12 grid gap-5 sm:grid-cols-3">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3 rounded-2xl border bg-card/50 p-6 text-center"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <f.icon className="size-5" />
            </div>
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>

      <Separator className="my-12" />

      {/* In-depth guide */}
      <ImageCompressionGuide />

      <Separator className="my-12" />

      {/* FAQ */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx + 1}`}>
              <AccordionTrigger className="text-left text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Related searches */}
      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">People also search for</h2>
        <div className="flex flex-wrap gap-2">
          {KEYWORDS.map((kw, i) => (
            <span
              key={i}
              className="rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* Related tools */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold">Related free tools</h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {relatedTools.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-muted text-foreground transition-colors group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                <tool.icon className="size-5" />
              </div>
              <h3 className="mb-1.5 flex items-center gap-1 font-semibold">
                {tool.title}
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </h3>
              <p className="text-sm text-muted-foreground">{tool.text}</p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Browse{" "}
          <Link
            href="/tools"
            className="font-medium text-foreground underline underline-offset-4"
          >
            all Shopyor tools
          </Link>{" "}
          — free, no signup required.
        </p>
      </section>
    </div>
  );
}
