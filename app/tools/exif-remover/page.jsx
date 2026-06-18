// app/tools/exif-remover/page.jsx
import Link from "next/link";
import ExifRemoverClient from "@/app/components/tools/ExifRemoverClient";
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
  Eraser,
  Download,
  ShieldCheck,
  BadgeCheck,
  Zap,
  MapPinOff,
  Eye,
  ShoppingBag,
  MessageCircle,
  Camera,
  FileImage,
  ArrowRight,
  Layers,
  Scaling,
} from "lucide-react";

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

/** --- Long-tail keywords for the “Related searches” block --- */
const KEYWORDS = [
  "remove exif data from photo online",
  "remove exif data no upload",
  "photo metadata remover free",
  "remove gps location from photo",
  "remove geotag from picture",
  "exif viewer online free",
  "view photo metadata online",
  "strip metadata from image",
  "delete camera info from photo",
  "remove hidden data from image",
  "remove location data before sharing photo",
  "metadata cleaner for photos",
  "remove exif from jpeg",
  "remove exif from png",
  "does whatsapp remove exif data",
  "check if photo has gps data",
  "photo privacy tool online",
  "clean metadata from image free",
];

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

const STEPS = [
  {
    icon: Upload,
    title: "Upload & inspect",
    text: "Drop in a JPEG, PNG, WebP, or AVIF and instantly see every piece of hidden metadata it carries.",
  },
  {
    icon: Eraser,
    title: "Remove the metadata",
    text: "Clean it on your device for total privacy, or via server for very large files — one click either way.",
  },
  {
    icon: Download,
    title: "Verify & download",
    text: "The tool re-scans the cleaned file to prove the EXIF is gone, then you download the safe copy.",
  },
];

const USE_CASES = [
  {
    icon: ShoppingBag,
    title: "Marketplace listings",
    text: "Selling on Facebook Marketplace, Craigslist, or eBay? Strip the GPS tag so buyers can't see where you live from your product photos.",
  },
  {
    icon: MessageCircle,
    title: "Files sent as documents",
    text: "WhatsApp documents, Telegram files, and email attachments keep full EXIF. Clean photos first so location data never travels with them.",
  },
  {
    icon: MapPinOff,
    title: "Protect your home location",
    text: "Photos taken at home embed coordinates accurate to a few meters. Remove the geotag before posting anywhere public.",
  },
  {
    icon: Camera,
    title: "Professional photos",
    text: "Share client work without leaking shoot locations, gear lists, or editing timestamps embedded by your camera and software.",
  },
];

const RELATED_TOOLS = [
  {
    icon: FileImage,
    name: "Image Compressor",
    desc: "Shrink the cleaned photo's file size before posting or emailing it.",
    href: "/tools/image-compressor",
  },
  {
    icon: Scaling,
    name: "Image Resizer",
    desc: "Resize the photo to exact dimensions for any platform.",
    href: "/tools/image-resizer",
  },
  {
    icon: Layers,
    name: "AI Background Remover",
    desc: "Erase the background and download a transparent PNG cutout.",
    href: "/tools/background-remover-image",
  },
  {
    icon: Eye,
    name: "AI Background Remover",
    desc: "In-browser background removal — your photo never leaves your device.",
    href: "/tools/background-remover-image",
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
    <div className="min-h-screen bg-background pt-6 md:pt-8 pb-20">
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
          <span className="text-foreground">EXIF Remover</span>
        </nav>

        {/* Hero */}
        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <BadgeCheck className="size-3.5" />
            Free • No signup • On-device privacy
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Free EXIF Remover{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
              — View & Remove Photo Metadata
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Remove EXIF data from photos online before you share them. Upload an
            image to see every piece of hidden metadata — GPS location, camera
            model, timestamps — then strip it all in one click, right in your
            browser with no upload required.
          </p>

          {/* Trust pills */}
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            {[
              { icon: ShieldCheck, label: "On-device — no upload needed" },
              { icon: Eye, label: "See metadata before you strip it" },
              { icon: Zap, label: "JPEG, PNG, WebP & AVIF" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-muted-foreground"
              >
                <Icon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                {label}
              </li>
            ))}
          </ul>
        </header>

        {/* The tool */}
        <section
          aria-label="EXIF remover tool"
          className="rounded-2xl border bg-white/60 pb-6 shadow-lg shadow-emerald-500/5 backdrop-blur dark:bg-white/5"
        >
          <ExifRemoverClient />
        </section>

        {/* How it works */}
        <section className="mt-14">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How to remove EXIF data in 3 steps
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="group relative rounded-2xl border bg-white/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10 dark:bg-white/5"
              >
                <span className="absolute right-4 top-4 text-4xl font-extrabold text-muted-foreground/10">
                  {i + 1}
                </span>
                <div className="inline-flex rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 p-2.5">
                  <Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
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
            When should you strip photo metadata?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
            Any time a photo leaves your device, its hidden data goes with it.
            These are the moments it matters most:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {USE_CASES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group flex gap-4 rounded-2xl border bg-white/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 dark:bg-white/5"
              >
                <div className="h-fit rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 p-2.5">
                  <Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
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
          <h2>What is hidden inside your photos?</h2>
          <p>
            Every photo from a phone or camera carries an invisible{" "}
            <strong>EXIF metadata</strong> block. It typically includes the GPS
            coordinates of where the photo was taken (often accurate to a few
            meters), the exact date and time, your device make and model, lens
            and exposure settings, and sometimes even the editing software you
            used. None of it is visible in the picture — but anyone who
            downloads the file can read it with free tools in seconds. This{" "}
            <strong>EXIF remover</strong> lets you see exactly what your photo
            is carrying, then <strong>strip the metadata</strong> before you
            share it.
          </p>

          <h2>Which apps remove EXIF data for you — and which don't</h2>
          <p>
            Big social networks strip most metadata on upload, so a photo
            posted to your feed usually loses its GPS tag. The danger is
            everywhere else: <strong>files sent as documents keep their full
            EXIF data</strong>, including location.
          </p>
          <div className="not-prose overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    How the photo travels
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Is EXIF removed?
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">
                    Instagram / Facebook / X feed posts
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Mostly stripped on upload
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">
                    WhatsApp / Telegram sent as a document or file
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Kept — full EXIF including GPS travels with the file
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">
                    Email attachments & cloud links (Drive, Dropbox)
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Kept — the original file is shared as-is
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-medium">
                    Marketplace & classified listings
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Varies by site — never assume it is removed
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The only habit that always works is cleaning the photo{" "}
            <em>before</em> it leaves your device — which is exactly what this
            tool is for.
          </p>

          <h2>On-device vs. server cleaning</h2>
          <ul>
            <li>
              <strong>Remove on device (recommended):</strong> the photo is
              cleaned entirely in your browser using a canvas re-encode. It
              never touches a server, making it the most private option — ideal
              for sensitive images.
            </li>
            <li>
              <strong>Remove via server:</strong> for very large files or less
              common formats, the server mode uses the Sharp image engine to
              strip metadata while preserving your original pixels. Files are
              sent over HTTPS and are not stored permanently.
            </li>
          </ul>
          <p>
            Either way, the tool re-scans the cleaned file and shows you the
            result, so you can verify the metadata is actually gone instead of
            taking it on faith.
          </p>

          <h2>Three quick privacy wins after cleaning</h2>
          <ol>
            <li>
              <strong>Turn off geotagging at the source.</strong> In your phone
              camera settings, disable location access so future photos never
              embed GPS in the first place.
            </li>
            <li>
              <strong>Compress before posting.</strong> A cleaned photo can
              still be heavy — run it through our{" "}
              <Link href="/tools/image-compressor">Image Compressor</Link> for
              faster uploads.
            </li>
            <li>
              <strong>Resize for the platform.</strong> Use the{" "}
              <Link href="/tools/image-resizer">Image Resizer</Link> to match
              each site's recommended dimensions exactly.
            </li>
          </ol>

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
            Clean it, compress it, cut it out — the full Shopyor image toolbox:
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {RELATED_TOOLS.map(({ icon: Icon, name, desc, href }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-4 rounded-2xl border bg-white/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 dark:bg-white/5"
              >
                <div className="rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 p-2.5">
                  <Icon className="size-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
                <ArrowRight className="mt-1 size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-500" />
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Or browse{" "}
            <Link
              href="/tools"
              className="font-medium text-emerald-600 hover:underline dark:text-emerald-400"
            >
              all free online tools
            </Link>
            .
          </p>
        </section>

        {/* Related searches */}
        <section className="mt-12">
          <h2 className="mb-2 text-lg font-semibold">Related searches</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            People also look for these photo metadata and privacy topics:
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
    </div>
  );
}
