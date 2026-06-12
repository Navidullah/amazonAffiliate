// app/tools/bg-remover/page.jsx
import Link from "next/link";
import BackgroundRemoverClient from "@/app/components/tools/BackgroundRemoverClient";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  ChevronRight,
  Upload,
  Wand2,
  Download,
  ShoppingBag,
  Youtube,
  CircleUserRound,
  PenTool,
  ShieldCheck,
  BadgeCheck,
  Zap,
  FileImage,
  ArrowRight,
  Layers,
  Eraser,
  Scaling,
} from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/bg-remover`;

/** --- SEO (low-competition, long-tail keyword optimized) --- */
export const metadata = {
  title: {
    absolute: "HD Background Remover – Free Transparent PNG Maker | Shopyor",
  },
  description:
    "Free HD background remover and transparent PNG maker. Erase the background from any photo and download a clean PNG cutout — no signup, no watermark.",
  keywords: [
    "hd background remover",
    "transparent png maker",
    "transparent png maker no signup",
    "make background transparent online free",
    "remove background without losing quality",
    "background remover no watermark",
    "convert jpg to transparent png",
    "png cutout maker",
    "remove white background from image",
    "transparent background for product photos",
    "background remover for youtube thumbnail",
    "make logo background transparent",
    "erase background from photo free",
    "transparent png converter",
    "background eraser online",
    "high resolution background removal",
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
    title: "HD Background Remover – Free Transparent PNG Maker",
    description:
      "Erase the background from any photo and download a clean transparent PNG cutout. Free, no signup, no watermark.",
    images: [
      {
        url: `${BASE_URL}/images/shopyor-tools-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor HD Background Remover – Transparent PNG Maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title: "HD Background Remover – Free Transparent PNG Maker | Shopyor",
    description:
      "Upload a photo, erase the background, and download an HD transparent PNG. No signup, no watermark.",
    images: [`${BASE_URL}/images/shopyor-tools-og.png`],
  },
};

/** --- Long-tail keywords for the “Related searches” block --- */
const KEYWORDS = [
  "hd background remover free",
  "transparent png maker no signup",
  "make background transparent online free",
  "remove background without losing quality",
  "background remover no watermark",
  "convert jpg to transparent png",
  "png cutout maker",
  "remove white background from image",
  "transparent background for product photos",
  "background remover for youtube thumbnail",
  "make logo background transparent",
  "erase background from photo free",
  "transparent png converter online",
  "background eraser online free",
  "remove background from profile picture",
  "transparent background maker for ecommerce",
  "cut out image background online",
  "photo background remover hd quality",
];

/** --- FAQ (plain-text answers so JSON-LD and UI stay in sync) --- */
const faq = [
  {
    q: "Is this HD background remover really free?",
    a: "Yes. You can remove the background from up to 50 images per month completely free — no signup, no watermark, and no software to install. Just upload a photo and download your transparent PNG.",
  },
  {
    q: "How do I make a transparent PNG from a JPG?",
    a: "Upload your JPG (or PNG) above, click Remove Background, and the AI erases the background automatically. The result downloads as a PNG with true transparency, ready to place on any new background.",
  },
  {
    q: "Will my photo lose quality when the background is removed?",
    a: "No visible quality is lost in the subject itself. The AI detects edges — including tricky areas like hair and fur — and produces a clean, sharp cutout. For the best result, upload the highest-quality original you have (up to 5MB).",
  },
  {
    q: "What image formats and sizes are supported?",
    a: "You can upload JPG, JPEG, or PNG files up to 5MB. The output is always a PNG, because PNG is the format that supports a fully transparent background.",
  },
  {
    q: "Can I remove a white background from a logo or product photo?",
    a: "Yes. White and solid-color backgrounds are the easiest case — upload the logo or product shot and you will get a clean PNG cutout you can place on any color, gradient, or scene.",
  },
  {
    q: "Are my uploaded images private?",
    a: "Your image is transferred over a secure HTTPS connection, processed by the AI, and not stored permanently. We never add watermarks or reuse your photos.",
  },
  {
    q: "How is this different from the AI Background Remover on Shopyor?",
    a: "This tool sends your photo to a professional-grade AI service for the cleanest possible HD edges, while the AI Background Remover runs entirely in your browser. Try this one for product shots and thumbnails where edge quality matters most, and the in-browser one when you want zero uploads.",
  },
  {
    q: "Can I use the transparent PNG for YouTube thumbnails and online stores?",
    a: "Absolutely. Transparent cutouts are perfect for YouTube thumbnails, Amazon and Shopify product listings, profile pictures, presentations, posters, and ads — anywhere you need a subject without its original background.",
  },
];

const STEPS = [
  {
    icon: Upload,
    title: "Upload your image",
    text: "Drag & drop a JPG or PNG (up to 5MB), or click to browse your device.",
  },
  {
    icon: Wand2,
    title: "Remove the background",
    text: "One click — the AI detects the subject and erases the background in seconds.",
  },
  {
    icon: Download,
    title: "Download your PNG",
    text: "Save a clean, watermark-free transparent PNG ready for any project.",
  },
];

const USE_CASES = [
  {
    icon: ShoppingBag,
    title: "Product photos",
    text: "Create clean cutouts for Amazon, eBay, Etsy, and Shopify listings — white or lifestyle backgrounds in seconds.",
  },
  {
    icon: Youtube,
    title: "YouTube thumbnails",
    text: "Cut yourself out of any frame and drop the PNG onto a bold thumbnail background that gets clicks.",
  },
  {
    icon: CircleUserRound,
    title: "Profile pictures",
    text: "Make a professional headshot cutout for LinkedIn, resumes, team pages, and social media avatars.",
  },
  {
    icon: PenTool,
    title: "Logos & graphics",
    text: "Remove the white background from a logo or graphic to get a transparent version for any design.",
  },
];

const RELATED_TOOLS = [
  {
    icon: Layers,
    name: "AI Background Remover",
    desc: "In-browser background removal — your photo never leaves your device.",
    href: "/tools/background-remover-image",
  },
  {
    icon: FileImage,
    name: "Image Compressor",
    desc: "Shrink your PNG cutout's file size before uploading it anywhere.",
    href: "/tools/image-compressor",
  },
  {
    icon: Scaling,
    name: "Image Resizer",
    desc: "Resize the transparent PNG to exact dimensions for any platform.",
    href: "/tools/image-resizer",
  },
  {
    icon: Eraser,
    name: "EXIF Remover",
    desc: "Strip hidden location and camera metadata from photos for privacy.",
    href: "/tools/exif-remover",
  },
];

export default function BackgroundRemoverPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Shopyor HD Background Remover",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free HD background remover and transparent PNG maker. Erase the background from JPG or PNG photos and download a clean, watermark-free transparent PNG cutout.",
        featureList: [
          "AI background removal with clean HD edges",
          "Exports true transparent PNG cutouts",
          "Supports JPG, JPEG, and PNG up to 5MB",
          "No signup and no watermark",
          "50 free images per month",
          "Works on mobile and desktop browsers",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "HowTo",
        name: "How to remove the background from an image",
        totalTime: "PT1M",
        step: STEPS.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.title,
          text: s.text,
        })),
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
            name: "HD Background Remover",
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
    <main className="min-h-screen bg-background pt-28 md:pt-32 lg:pt-32 pb-20">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-4xl px-4">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground"
        >
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Home className="size-3.5" /> Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/tools" className="transition-colors hover:text-foreground">
            Tools
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">HD Background Remover</span>
        </nav>

        {/* Hero */}
        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300">
            <BadgeCheck className="size-3.5" />
            Free • No signup • No watermark
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            HD Background Remover{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 bg-clip-text text-transparent">
              — Transparent PNG Maker
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Remove the background from any photo and make a transparent PNG in
            seconds. Upload a JPG or PNG, let the AI erase the background with
            clean HD edges, and download a watermark-free cutout — free, with no
            signup.
          </p>

          {/* Trust pills */}
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            {[
              { icon: Zap, label: "Results in seconds" },
              { icon: ShieldCheck, label: "Secure HTTPS upload" },
              { icon: FileImage, label: "JPG & PNG up to 5MB" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-muted-foreground"
              >
                <Icon className="size-3.5 text-cyan-600 dark:text-cyan-400" />
                {label}
              </li>
            ))}
          </ul>
        </header>

        {/* The tool */}
        <section
          aria-label="Background remover tool"
          className="rounded-2xl border bg-white/60 shadow-lg shadow-cyan-500/5 backdrop-blur dark:bg-white/5"
        >
          <BackgroundRemoverClient />
        </section>

        {/* How it works */}
        <section className="mt-14">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How to remove a background in 3 steps
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="group relative rounded-2xl border bg-white/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 dark:bg-white/5"
              >
                <span className="absolute right-4 top-4 text-4xl font-extrabold text-muted-foreground/10">
                  {i + 1}
                </span>
                <div className="inline-flex rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 p-2.5">
                  <Icon className="size-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section className="mt-14">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            What can you make with a transparent PNG?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
            A clean PNG cutout drops into any design. These are the most popular
            ways people use this background eraser:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {USE_CASES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group flex gap-4 rounded-2xl border bg-white/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 dark:bg-white/5"
              >
                <div className="h-fit rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 p-2.5">
                  <Icon className="size-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Article */}
        <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-2xl prose-h2:font-semibold">
          <h2>What does this HD background remover do?</h2>
          <p>
            This free <strong>HD background remover</strong> turns any photo
            into a <strong>transparent PNG</strong> in one click. Upload a JPG
            or PNG, and a professional-grade AI detects the subject — a person,
            product, pet, or logo — and erases everything behind it. You get a
            clean cutout with smooth, high-definition edges, even around
            difficult details like hair, fur, and semi-transparent objects. The
            download is always a watermark-free PNG, the only common image
            format that supports true transparency.
          </p>

          <h2>Why a transparent PNG (and not a JPG)?</h2>
          <p>
            JPG files cannot store transparency — any &quot;removed&quot;
            background would be filled with white. PNG supports an alpha
            channel, which means every erased pixel stays genuinely see-through.
            When you place the cutout on a new background — a YouTube thumbnail,
            a product banner, a slide — it blends in perfectly with no white box
            around your subject. That is why this tool always converts your{" "}
            <strong>JPG to a transparent PNG</strong> automatically.
          </p>

          <h2>Tips for the cleanest cutout</h2>
          <ul>
            <li>
              <strong>Upload the best original you have.</strong> Sharper input
              gives the AI more edge detail to work with (files up to 5MB).
            </li>
            <li>
              <strong>Prefer contrast.</strong> Subjects that stand out from the
              background — by color or lighting — produce the cleanest edges.
            </li>
            <li>
              <strong>Avoid heavy filters.</strong> Strong filters and
              compression artifacts blur the boundary the AI needs to find.
            </li>
            <li>
              <strong>Compress after, not before.</strong> Remove the background
              first, then run the PNG through our{" "}
              <Link href="/tools/image-compressor">Image Compressor</Link> if
              you need a smaller file.
            </li>
          </ul>

          <h2>HD remover vs. the in-browser AI remover</h2>
          <p>
            Shopyor has two background removal tools, and they solve different
            problems:
          </p>
          <div className="not-prose overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold"></th>
                  <th className="px-4 py-3 text-left font-semibold">
                    HD Background Remover (this page)
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    AI Background Remover
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Processing</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Professional AI service via secure upload
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    100% in your browser — no upload at all
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Edge quality</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Best-in-class on hair, fur, and fine detail
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Very good for most photos
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">Best for</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Product listings, thumbnails, professional use
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Quick edits and maximum privacy
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Want the no-upload option? Try the{" "}
            <Link href="/tools/background-remover-image">
              AI Background Remover
            </Link>
            . For a step-by-step walkthrough with examples, read our guide on{" "}
            <Link href="/blog/how-to-remove-background-from-an-image">
              how to remove the background from an image
            </Link>
            .
          </p>

          <h2>Frequently asked questions</h2>
          <div className="not-prose">
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx + 1}`}>
                  <AccordionTrigger className="text-left text-base">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </article>

        {/* Related tools */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold tracking-tight">
            More free image tools
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Finish the job with the rest of the Shopyor image toolbox:
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {RELATED_TOOLS.map(({ icon: Icon, name, desc, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-4 rounded-2xl border bg-white/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 dark:bg-white/5"
              >
                <div className="rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 p-2.5">
                  <Icon className="size-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold transition-colors group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                    {name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
                <ArrowRight className="mt-1 size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-500" />
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Or browse <Link href="/tools" className="font-medium text-cyan-600 hover:underline dark:text-cyan-400">all free online tools</Link>.
          </p>
        </section>

        {/* Related searches */}
        <section className="mt-12">
          <h2 className="mb-2 text-lg font-semibold">Related searches</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            People also look for these background removal topics:
          </p>
          <ul className="flex flex-wrap gap-2">
            {KEYWORDS.map((kw) => (
              <li
                key={kw}
                className="rounded-full border bg-muted/30 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/60"
              >
                {kw}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
