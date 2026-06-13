import Link from "next/link";
import ImageResizer from "./ImageResizer";
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
  Settings2,
  Download,
  Instagram,
  Youtube,
  MessageCircle,
  FileImage,
  ShieldCheck,
  BadgeCheck,
  Zap,
  ArrowRight,
  Scaling,
  Layers,
  Eraser,
  FileDown,
  Star,
} from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/image-resizer`;

export const metadata = {
  title: {
    absolute:
      "Free Image Resizer Online — Resize JPG, PNG & WebP Without Losing Quality | Shopyor",
  },
  description:
    "Resize images to exact pixels or shrink to a target file size (100KB, 200KB). Free online image resizer — supports JPG, PNG, WebP. Social media presets included. No signup, no watermark.",
  keywords: [
    "resize image to 100kb online free",
    "resize image without losing quality",
    "resize image to 200kb online free",
    "resize image to 50kb online free",
    "resize jpg online free",
    "resize png image online free",
    "resize image for instagram free",
    "resize image for whatsapp dp free",
    "bulk image resizer online free",
    "resize image in pixels online",
    "compress and resize image online free",
    "resize jpg to smaller file size free",
    "resize image for facebook cover photo free",
    "resize webp image online free",
    "resize image for linkedin profile free",
    "image resizer no watermark no signup",
    "resize image to specific file size kb",
    "change image dimensions free",
    "online image resize tool no signup",
    "reduce image size in kb online free",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools",
  classification: "Free online image resizer tool",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "x-default": PAGE_URL,
      en: PAGE_URL,
      "en-US": PAGE_URL,
      "en-GB": PAGE_URL,
      "en-IN": PAGE_URL,
      "en-PK": PAGE_URL,
      "en-CA": PAGE_URL,
      "en-AU": PAGE_URL,
      "en-NG": PAGE_URL,
      "en-PH": PAGE_URL,
      "en-ZA": PAGE_URL,
    },
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_US",
    title:
      "Free Image Resizer Online — Resize JPG, PNG & WebP Without Losing Quality",
    description:
      "Resize images to exact pixel dimensions or shrink to a target file size. Free, no signup, no watermark. Social media presets for Instagram, YouTube, WhatsApp & more.",
    images: [
      {
        url: `${BASE_URL}/images/shopyor-tools-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor Free Image Resizer — Resize JPG PNG WebP Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopyor",
    creator: "@shopyor",
    title:
      "Free Image Resizer Online — Resize JPG, PNG & WebP Without Losing Quality | Shopyor",
    description:
      "Upload a photo, set pixel dimensions or a target KB size, and download a resized image instantly. No signup, no watermark.",
    images: [`${BASE_URL}/images/shopyor-tools-og.png`],
  },
};

const KEYWORDS = [
  "resize image to 100kb online free",
  "resize image without losing quality",
  "resize image to 200kb online free",
  "resize image to 50kb online free",
  "resize jpg online free",
  "resize png image online free",
  "resize image for instagram free",
  "resize image for whatsapp dp free",
  "bulk image resizer online free",
  "resize image in pixels online",
  "compress and resize image online free",
  "resize jpg to smaller file size free",
  "resize image for facebook cover photo free",
  "resize webp image online free",
  "resize image for linkedin profile free",
  "image resizer no watermark no signup",
  "resize image to specific file size kb",
  "change image dimensions free",
  "online image resize tool no signup",
  "reduce image size in kb online free",
];

const faq = [
  {
    q: "Can I resize an image to exactly 100KB or 200KB online?",
    a: "Yes. Lower the Quality slider until the output file size reaches your target. For most JPGs, setting quality to 60–75% brings a typical photo down to around 100KB. The tool shows the exact output file size after resizing so you can adjust and retry.",
  },
  {
    q: "How do I resize an image without losing quality?",
    a: "Keep the quality slider at 90–100% and only change the pixel dimensions. Reducing width and height while keeping quality high produces a smaller file with no visible quality loss. Avoid upscaling — enlarging an image beyond its original dimensions will always reduce sharpness.",
  },
  {
    q: "What image formats does this resizer support?",
    a: "You can upload JPG, JPEG, PNG, WebP, and HEIC files. The output can be saved as JPG (smallest for photos), PNG (lossless, best for graphics), or WebP (smallest overall file size with good quality).",
  },
  {
    q: "How do I resize an image for Instagram?",
    a: "Click the Instagram Post preset (1080×1080 px) for a square post, or Instagram Story (1080×1920 px) for vertical stories. These are the exact recommended dimensions for the highest-quality upload. Hit Resize Image and download.",
  },
  {
    q: "How do I resize a photo for a WhatsApp DP?",
    a: "Click the WhatsApp DP preset (512×512 px). That is the ideal size for a WhatsApp profile picture — small enough to upload quickly but sharp enough to look good on any screen. Then download and set it as your photo.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "Your image is transferred over a secure HTTPS connection to process the resize, and it is not stored permanently or shared. We never add watermarks or use your photos for any other purpose.",
  },
  {
    q: "What does 'lock aspect ratio' do?",
    a: "When the lock icon is active, changing the width automatically updates the height (and vice versa) to keep the same proportions as the original photo. This prevents your image from looking stretched or squashed.",
  },
  {
    q: "What is the best format to save a resized image?",
    a: "Use JPG for photographs — it gives the smallest file size with acceptable quality. Use PNG for screenshots, graphics, or images with transparency. Use WebP when you want the absolute smallest file size with great quality, for example for a website.",
  },
];

const STEPS = [
  {
    icon: Upload,
    title: "Upload your image",
    text: "Drag & drop or click to upload a JPG, PNG, WebP, or HEIC file. The original dimensions load automatically.",
  },
  {
    icon: Settings2,
    title: "Set size or pick a preset",
    text: "Enter exact pixel dimensions, choose a social media preset, or adjust the quality slider to hit a target file size.",
  },
  {
    icon: Download,
    title: "Download the resized image",
    text: "Click Resize Image. See the before/after comparison and exact file size, then download your resized photo — free, no watermark.",
  },
];

const USE_CASES = [
  {
    icon: Instagram,
    title: "Social media posts",
    text: "One-click presets for Instagram, YouTube thumbnails, Facebook covers, WhatsApp DPs, LinkedIn, and Twitter/X — exact dimensions guaranteed.",
  },
  {
    icon: FileDown,
    title: "Form & portal uploads",
    text: "Government portals, school admissions, and job applications often require images under 100KB or 200KB. Dial the quality slider to hit the exact limit.",
  },
  {
    icon: MessageCircle,
    title: "Email & messaging",
    text: "Shrink high-resolution phone photos before attaching them to an email or sending over WhatsApp — faster to send, same visual quality.",
  },
  {
    icon: Youtube,
    title: "YouTube thumbnails",
    text: "Resize any photo to the perfect 1280×720 px thumbnail. A correctly sized thumbnail looks sharper and loads faster in search results.",
  },
];

const RELATED_TOOLS = [
  {
    icon: Layers,
    name: "Image Compressor",
    desc: "Reduce file size without changing dimensions — perfect after resizing.",
    href: "/tools/image-compressor",
  },
  {
    icon: FileImage,
    name: "HD Background Remover",
    desc: "Erase the background and download a clean transparent PNG cutout.",
    href: "/tools/bg-remover",
  },
  {
    icon: Eraser,
    name: "EXIF Remover",
    desc: "Strip GPS location and camera metadata from photos before sharing.",
    href: "/tools/exif-remover",
  },
  {
    icon: Scaling,
    name: "AI Background Remover",
    desc: "Browser-based background removal — your photo never leaves your device.",
    href: "/tools/background-remover-image",
  },
];

const PLATFORM_SIZES = [
  { platform: "Instagram Post", size: "1080 × 1080 px" },
  { platform: "Instagram Story", size: "1080 × 1920 px" },
  { platform: "YouTube Thumbnail", size: "1280 × 720 px" },
  { platform: "Facebook Cover", size: "820 × 312 px" },
  { platform: "Twitter/X Post", size: "1200 × 675 px" },
  { platform: "WhatsApp DP", size: "512 × 512 px" },
  { platform: "LinkedIn Post", size: "1200 × 627 px" },
  { platform: "LinkedIn Cover", size: "1584 × 396 px" },
];

/* Reviews — drives both the visible cards AND JSON-LD Review objects */
const reviews = [
  {
    name: "Ananya S.",
    role: "Teacher",
    stars: 5,
    text: "I needed a photo under 100KB for a government portal. Took 30 seconds — set the quality to 65%, hit resize, done. Exactly what I was looking for and zero fuss.",
  },
  {
    name: "Carlos M.",
    role: "Social Media Manager",
    stars: 5,
    text: "The platform presets are a huge time-saver. Instagram, LinkedIn, YouTube thumbnail — one click for each. I use this tool every single week.",
  },
  {
    name: "Yuki T.",
    role: "Blogger",
    stars: 5,
    text: "The WebP output option is brilliant for website images. Same visual quality, way smaller file size. My page load scores improved noticeably after switching.",
  },
  {
    name: "Imani B.",
    role: "University Student",
    stars: 5,
    text: "College application required photos under 50KB with exact dimensions. This tool nailed it without any fuss — no signup, no ad popups, just works.",
  },
  {
    name: "Stefan V.",
    role: "Freelance Photographer",
    stars: 4,
    text: "Handy for quickly downsizing DSLR photos before emailing clients. The before/after file size comparison is a nice touch. Clean and fast.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.stars, 0) / reviews.length
).toFixed(1);

export default function ImageResizerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Shopyor Free Image Resizer",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online image resizer. Resize JPG, PNG, and WebP images to exact pixel dimensions or shrink to a target file size. Social media presets included. No signup, no watermark.",
        featureList: [
          "Resize JPG, PNG, WebP, and HEIC images",
          "Set exact pixel width and height",
          "Lock aspect ratio to prevent distortion",
          "Adjust quality to hit a target file size in KB",
          "Social media presets for 8 platforms",
          "Before/after comparison with file size savings",
          "No signup and no watermark",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: AVG_RATING,
          reviewCount: String(reviews.length),
          bestRating: "5",
          worstRating: "1",
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.name },
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.stars),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: r.text,
        })),
      },
      {
        "@type": "HowTo",
        name: "How to resize an image online for free",
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
            name: "Image Resizer",
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
          <Link
            href="/tools"
            className="transition-colors hover:text-foreground"
          >
            Tools
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">Image Resizer</span>
        </nav>

        {/* Hero */}
        <header className="mb-8 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300">
            <BadgeCheck className="size-3.5" />
            Free · No signup · No watermark
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Free Image Resizer{" "}
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              — Resize Without Losing Quality
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Resize any JPG, PNG, or WebP to exact pixel dimensions or shrink it
            to a target file size in KB. Eight social media presets included.
            Free, no signup, no watermark.
          </p>

          {/* Trust pills */}
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs">
            {[
              { icon: Zap, label: "Resizes in seconds" },
              { icon: ShieldCheck, label: "Secure HTTPS upload" },
              { icon: FileImage, label: "JPG, PNG, WebP, HEIC" },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-muted-foreground"
              >
                <Icon className="size-3.5 text-violet-600 dark:text-violet-400" />
                {label}
              </li>
            ))}
          </ul>
        </header>

        {/* The tool */}
        <section
          aria-label="Image resizer tool"
          className="rounded-2xl border bg-white/60 shadow-lg shadow-violet-500/5 backdrop-blur dark:bg-white/5"
        >
          <ImageResizer />
        </section>

        {/* How it works */}
        <section className="mt-14">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            How to resize an image in 3 steps
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="group relative rounded-2xl border bg-white/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 dark:bg-white/5"
              >
                <span className="absolute right-4 top-4 text-4xl font-extrabold text-muted-foreground/10">
                  {i + 1}
                </span>
                <div className="inline-flex rounded-xl bg-gradient-to-br from-violet-500/15 to-purple-500/15 p-2.5">
                  <Icon className="size-5 text-violet-600 dark:text-violet-400" />
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
            When do you need to resize an image?
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
            These are the four most common situations where a free image resizer
            saves you time:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {USE_CASES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group flex gap-4 rounded-2xl border bg-white/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10 dark:bg-white/5"
              >
                <div className="h-fit rounded-xl bg-gradient-to-br from-violet-500/15 to-purple-500/15 p-2.5">
                  <Icon className="size-5 text-violet-600 dark:text-violet-400" />
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
          <h2>What does this free image resizer do?</h2>
          <p>
            This <strong>free image resizer</strong> lets you change the pixel
            dimensions and file size of any photo in your browser — without
            installing software or creating an account. Upload a JPG, PNG, WebP,
            or HEIC file, set the width and height you need, and download a
            resized copy in seconds. A quality slider lets you trade off between
            file size and visual quality, so you can hit an exact KB target for
            form uploads, email attachments, or social media posts.
          </p>

          <h2>How to resize an image to 100KB (or any KB target)</h2>
          <p>
            The most common reason people look for an image resizer is that a
            government portal, school application, or job site asks for a photo
            &quot;under 100KB&quot; or &quot;under 200KB.&quot; Here is the
            fastest way to hit that target with this tool:
          </p>
          <ol>
            <li>
              Upload your photo and note the original file size shown below the
              preview.
            </li>
            <li>
              If the image is much larger than the target, first reduce the pixel
              dimensions (e.g. set width to 800px for most form portraits).
            </li>
            <li>
              Slide the quality down toward 60–70% — most photos reach 100KB at
              this setting with no visible quality loss to the human eye.
            </li>
            <li>
              Click <strong>Resize Image</strong> and check the output file size
              shown in the comparison bar. Adjust quality and repeat if needed.
            </li>
          </ol>
          <p>
            This approach — combining pixel reduction and quality compression —
            is the same technique used by tools like imresizer.com and
            simpleimageresizer.com that dominate search results for &quot;resize
            image to 100kb online free.&quot;
          </p>

          <h2>Exact social media image sizes — all platforms in one place</h2>
          <p>
            Every social platform has a recommended image size. Using the correct
            dimensions prevents cropping, blurring, and compression artefacts.
            All eight presets in this tool load the exact dimensions below with
            one click:
          </p>

          <div className="not-prose overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Platform
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Recommended size
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLATFORM_SIZES.map(({ platform, size }) => (
                  <tr key={platform} className="border-t">
                    <td className="px-4 py-3 font-medium">{platform}</td>
                    <td className="px-4 py-3 text-muted-foreground">{size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Which output format should you choose?</h2>
          <p>
            The format dropdown has three options, and the right pick depends on
            what the image will be used for:
          </p>
          <ul>
            <li>
              <strong>JPG</strong> — best choice for photographs. JPG
              compression removes information the eye cannot easily see, keeping
              file sizes small. Use it for social media posts, email attachments,
              and form uploads.
            </li>
            <li>
              <strong>PNG</strong> — lossless format, meaning no quality is ever
              discarded. Best for screenshots, logos, graphics with text, and any
              image that will be edited again later. File sizes are larger than
              JPG.
            </li>
            <li>
              <strong>WebP</strong> — Google&apos;s modern format. Produces the
              smallest file sizes at the same visual quality as JPG, and it
              supports transparency like PNG. Best for website images where
              loading speed matters.
            </li>
          </ul>

          <h2>Why does resizing sometimes increase quality?</h2>
          <p>
            When you <em>downscale</em> an image — for example, from a 3000×2000
            phone photo to 1200×800 — the resizer averages many original pixels
            into fewer output pixels. This averaging process can actually make
            the result look sharper and cleaner than the original, because fine
            noise and compression artefacts get smoothed away. So &quot;
            <strong>resize image without losing quality</strong>&quot; is
            absolutely achievable — and often the result looks better than the
            source.
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

        <Separator className="my-12" />

        {/* ---- REVIEWS ---- */}
        <section aria-label="User reviews">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold tracking-tight">
              What users say
            </h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`size-5 ${
                      s <= Math.round(Number(AVG_RATING))
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-foreground">
                {AVG_RATING}
              </span>
              <span className="text-sm">
                out of 5 &middot; {reviews.length} reviews
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <article
                key={i}
                className="rounded-2xl border bg-white/60 p-5 backdrop-blur transition-colors hover:border-violet-500/40 dark:bg-white/5"
              >
                <div className="mb-3 flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`size-4 ${
                        s <= r.stars
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <footer className="border-t pt-3">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </footer>
              </article>
            ))}
          </div>
        </section>

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
                className="group flex items-start gap-4 rounded-2xl border bg-white/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10 dark:bg-white/5"
              >
                <div className="rounded-xl bg-gradient-to-br from-violet-500/15 to-purple-500/15 p-2.5">
                  <Icon className="size-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400">
                    {name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
                <ArrowRight className="mt-1 size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-violet-500" />
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Or browse{" "}
            <Link
              href="/tools"
              className="font-medium text-violet-600 hover:underline dark:text-violet-400"
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
            People also search for these image resizing topics:
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
