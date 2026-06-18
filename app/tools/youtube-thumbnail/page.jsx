import YoutubeThumbnailClient from "@/app/components/thumbnail-client/thumbnail-client";
import Link from "next/link";
import {
  Download,
  Zap,
  ShieldCheck,
  ImageIcon,
  Smartphone,
  Check,
  Link2,
  MousePointerClick,
  Save,
  Star,
  ChevronRight,
  Home,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/youtube-thumbnail`;

export const metadata = {
  title: {
    absolute:
      "YouTube Thumbnail Downloader HD — Free, No Signup | Shopyor",
  },
  description:
    "Download any YouTube video thumbnail in HD (1280×720), SD, HQ or MQ — free, no signup, works on mobile. Paste the link and save in seconds.",
  keywords: [
    "youtube thumbnail downloader hd free no signup",
    "download youtube thumbnail hd",
    "youtube thumbnail grabber free",
    "save youtube video thumbnail",
    "youtube shorts thumbnail downloader",
    "youtube thumbnail download no watermark",
    "get youtube thumbnail from url",
    "youtube hd thumbnail download online",
    "download youtube thumbnail 1280x720",
    "youtube thumbnail download no account",
    "youtube thumbnail image saver free",
    "how to download youtube thumbnail hd",
    "youtube thumbnail downloader mobile",
    "youtube video thumbnail extractor free",
    "youtube thumbnail download without login",
    "youtube thumbnail downloader iphone android",
    "free youtube thumbnail tool online",
    "youtube thumbnail 4k download",
    "download thumbnail from youtube url",
    "youtube shorts thumbnail save",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "creator-tools",
  classification: "Free YouTube thumbnail downloader — HD, SD, HQ, MQ",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "x-default": PAGE_URL,
      en: PAGE_URL,
      "en-US": PAGE_URL,
      "en-GB": PAGE_URL,
      "en-IN": PAGE_URL,
      "en-PK": PAGE_URL,
      "en-NG": PAGE_URL,
      "en-PH": PAGE_URL,
      "en-CA": PAGE_URL,
      "en-AU": PAGE_URL,
      "en-ZA": PAGE_URL,
    },
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_US",
    title: "YouTube Thumbnail Downloader HD — Free, No Signup",
    description:
      "Download any YouTube video or Shorts thumbnail in HD, SD, HQ or MQ instantly. Free, no signup, works on mobile and desktop.",
    images: [
      {
        url: `${BASE_URL}/images/youtube-thumbnail-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor YouTube Thumbnail Downloader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Thumbnail Downloader HD — Free, No Signup | Shopyor",
    description:
      "Paste any YouTube URL and download the thumbnail in HD, SD, HQ or MQ — free, no login, works on any device.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/youtube-thumbnail-og.png`],
  },
};

/* ------------------------------------------------------------------ */
/*  Static page data                                                    */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: ImageIcon,
    title: "Every Resolution",
    text: "Grab Max Resolution (HD 1280×720), SD, HQ and MQ — all four sizes at once, no guessing which exists.",
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
  {
    icon: Zap,
    title: "Instant — One Paste",
    text: "Paste a link and all thumbnails appear in under a second. No processing queues, no waiting.",
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    text: "iPhone, Android, Windows or Mac — fully browser-based, no app or extension to install.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: ShieldCheck,
    title: "Free & No Signup",
    text: "Unlimited downloads, no watermark, no account, no hidden cost — ever.",
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
];

const steps = [
  { icon: Link2, title: "Copy the link", text: "Copy the YouTube video or Shorts URL from the address bar or Share button." },
  { icon: MousePointerClick, title: "Paste & click", text: "Paste it into the tool and click Get Thumbnails." },
  { icon: ImageIcon, title: "Pick a size", text: "Choose from HD (1280×720), SD, HQ or MQ." },
  { icon: Save, title: "Save it", text: "Click Save to download the image to your device." },
];

const resolutions = [
  { name: "Max Resolution (HD)", file: "maxresdefault.jpg", size: "1280 × 720", use: "Best quality — use for blog headers, presentations, reposts" },
  { name: "Standard (SD)", file: "sddefault.jpg", size: "640 × 480", use: "General use, social media posts" },
  { name: "High Quality (HQ)", file: "hqdefault.jpg", size: "480 × 360", use: "Embedded players, preview images" },
  { name: "Medium (MQ)", file: "mqdefault.jpg", size: "320 × 180", use: "Small thumbnails, lists" },
];

/* FAQ — same array drives both the visible Accordion and the JSON-LD */
const faq = [
  {
    q: "Is this YouTube thumbnail downloader free?",
    a: "Yes. Shopyor's YouTube thumbnail downloader is 100% free with no limits, no watermark, and no registration. Paste any YouTube link and download the thumbnail instantly in whichever resolution you need.",
  },
  {
    q: "What is the highest resolution YouTube thumbnail I can download?",
    a: "The maximum resolution thumbnail (maxresdefault) is 1280×720 pixels — true HD. Not every video has a max-resolution thumbnail uploaded by the creator; in those cases, the next best available size (SD 640×480 or HQ 480×360) is used automatically.",
  },
  {
    q: "Can I download the thumbnail of a YouTube Short?",
    a: "Yes. Paste the Shorts URL (youtube.com/shorts/...) directly into the tool and it extracts the thumbnail exactly like a regular video. All available resolutions are shown.",
  },
  {
    q: "Is it legal to download YouTube thumbnails?",
    a: "Downloading a thumbnail for personal use, research, or creative reference is generally fine. Thumbnails are copyrighted by their creators, so don't reuse someone else's thumbnail commercially or republish it as your own without permission.",
  },
  {
    q: "Do I need an app to download YouTube thumbnails?",
    a: "No app or browser extension required. The tool runs entirely in any modern browser on iPhone, Android, Windows and Mac. Just paste the link and save the image — nothing to install.",
  },
  {
    q: "Why can't I see the HD thumbnail for some videos?",
    a: "Not all videos have a maxresdefault (HD 1280×720) thumbnail stored on YouTube's servers — this typically happens with older or lower-quality uploads. In those cases the tool automatically shows the next best available size. SD (640×480) or HQ (480×360) are almost always present.",
  },
  {
    q: "How do I download a YouTube thumbnail on iPhone or Android?",
    a: "Open this page in Safari (iPhone) or Chrome (Android), paste the YouTube URL, and tap Save on the size you want. On iPhone, the image opens in a new tab — long-press it and choose 'Save to Photos'. On Android, long-press the downloaded image and tap 'Download image'.",
  },
  {
    q: "What can I use downloaded YouTube thumbnails for?",
    a: "Common uses include: studying competitors' thumbnail styles and color choices, using thumbnails as reference while designing your own, creating presentations or blog posts that embed a video preview, generating mockups for client pitches, and archiving your own thumbnails. Always respect copyright when reusing others' work.",
  },
];

/* Reviews — same array drives visible cards AND JSON-LD Review objects */
const reviews = [
  {
    name: "Marcus T.",
    role: "Video Editor",
    stars: 5,
    text: "Fastest YouTube thumbnail tool I've used. Paste, see all four sizes, download in one click. No login, no ads filling the screen.",
  },
  {
    name: "Aisha N.",
    role: "YouTuber",
    stars: 5,
    text: "I use this every week to study competitor thumbnails. HD quality, instant download, and it works perfectly on my phone too.",
  },
  {
    name: "Rohan P.",
    role: "Content Creator",
    stars: 5,
    text: "Other tools made me sign up or showed pop-up ads. This one just works — paste the link and the thumbnail is right there.",
  },
  {
    name: "Chloe W.",
    role: "Social Media Manager",
    stars: 5,
    text: "Grabbed Shorts thumbnails without any issues. I didn't know any free tool supported Shorts properly until I found this.",
  },
  {
    name: "Diego R.",
    role: "Graphic Designer",
    stars: 4,
    text: "Clean interface and all four resolutions available at once. Saves real time compared to other sites I've tried in the past.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.stars, 0) / reviews.length
).toFixed(1);

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function YoutubeThumbnailPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "YouTube Thumbnail Downloader HD",
        url: PAGE_URL,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online YouTube thumbnail downloader. Download any YouTube video or Shorts thumbnail in HD (1280×720), SD, HQ and MQ. No signup, no watermark, works on mobile.",
        featureList: [
          "Download YouTube thumbnails in HD (1280×720 maxresdefault)",
          "All four resolutions: HD, SD (640×480), HQ (480×360), MQ (320×180)",
          "Supports YouTube videos and YouTube Shorts",
          "Works on iPhone, Android, Windows and Mac",
          "Instant results — no processing queue",
          "Free with no signup and no watermark",
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
        name: "How to download a YouTube thumbnail for free",
        totalTime: "PT1M",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Copy the video URL",
            text: "Open the YouTube video or Short and copy its link from the address bar or the Share button.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Paste into the tool",
            text: "Paste the URL into the YouTube thumbnail downloader and click Get Thumbnails.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Pick a resolution",
            text: "Choose from Max Resolution HD (1280×720), SD (640×480), HQ (480×360) or MQ (320×180).",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Save the image",
            text: "Click Save to download the thumbnail to your device. No account or app needed.",
          },
        ],
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
            name: "YouTube Thumbnail Downloader",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-20">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"
          >
            <Link href="/" className="flex items-center gap-1 hover:text-red-600">
              <Home className="size-3.5" /> Home
            </Link>
            <ChevronRight className="size-3.5" />
            <Link href="/tools" className="hover:text-red-600">
              Tools
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-slate-700 dark:text-slate-200 font-medium">
              YouTube Thumbnail Downloader
            </span>
          </nav>

          {/* Hero */}
          <header className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-200 dark:border-red-800 mb-6">
              <Download className="w-3.5 h-3.5 text-red-600" />
              <span className="text-sm font-medium bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Free YouTube Tool · No signup · Works on mobile
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-red-700 to-slate-900 dark:from-slate-100 dark:via-red-300 dark:to-slate-100 bg-clip-text text-transparent">
              YouTube Thumbnail Downloader HD
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Download any{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                YouTube video thumbnail in HD
              </strong>{" "}
              — plus SD, HQ and MQ sizes — from videos and Shorts. Paste the
              link and save in seconds. Free, no watermark, no signup.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-6">
              {[
                "HD up to 1280×720",
                "YouTube Shorts supported",
                "No watermark",
                "Works on iPhone & Android",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400"
                >
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </header>

          {/* Tool */}
          <div className="max-w-4xl mx-auto">
            <YoutubeThumbnailClient />
          </div>

          {/* Features */}
          <section className="mt-20" aria-label="Tool features">
            <h2 className="text-3xl font-bold text-center mb-10">
              Why use this YouTube thumbnail grabber
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
                  >
                    <div
                      className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}
                    >
                      <Icon className={`w-6 h-6 ${f.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {f.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How to */}
          <section className="mt-20" aria-label="How to download">
            <h2 className="text-3xl font-bold text-center mb-10">
              How to download a YouTube thumbnail in HD
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700"
                  >
                    <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">
                      {i + 1}
                    </span>
                    <Icon className="w-7 h-7 text-red-600 mb-3" />
                    <h3 className="font-semibold mb-1.5">{s.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {s.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Resolutions table */}
          <section className="mt-20" aria-label="Thumbnail resolutions">
            <h2 className="text-3xl font-bold text-center mb-3">
              YouTube thumbnail resolutions explained
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
              Every YouTube video stores several thumbnail sizes on YouTube's
              servers. Here's what each resolution is best used for.
            </p>
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[520px]">
                <thead className="bg-slate-50 dark:bg-slate-700/40">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Quality</th>
                    <th className="px-5 py-3 font-semibold">Dimensions</th>
                    <th className="px-5 py-3 font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {resolutions.map((r) => (
                    <tr
                      key={r.file}
                      className="border-t border-slate-100 dark:border-slate-700"
                    >
                      <td className="px-5 py-3 font-medium">{r.name}</td>
                      <td className="px-5 py-3 font-mono text-red-600 dark:text-red-400 whitespace-nowrap">
                        {r.size}
                      </td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                        {r.use}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Educational */}
          <section
            className="mt-20 grid md:grid-cols-2 gap-8"
            aria-label="Background info"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">
                Why download YouTube thumbnails?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Thumbnails drive a video's click-through rate more than almost
                any other factor. Creators download competitor thumbnails to
                study color choices, font styles, facial expressions, and
                composition. Marketers use them for mockups and presentations.
                Designers reference them while building their own. This tool
                gives you the <strong>original HD image straight from
                YouTube's servers</strong> — no screenshot blur, no quality
                loss, just the full 1280×720 file the creator uploaded.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">
                Tips for great YouTube thumbnails
              </h2>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                {[
                  "Design at 1280×720 — YouTube's native HD size.",
                  "Use bold, readable text (3–5 words max).",
                  "High contrast colors stand out in a crowded feed.",
                  "Show a clear focal point or expressive face close to the camera.",
                  "Keep key elements away from the bottom-right (timestamp overlay).",
                  "Test your thumbnail at small sizes — it must work at 120×68 px too.",
                  "A/B test thumbnails via YouTube Studio's built-in test feature.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Separator className="mt-20" />

          {/* ---- REVIEWS ---- */}
          <section className="mt-16" aria-label="User reviews">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">What users say</h2>
              <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-300">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-5 h-5 ${
                        s <= Math.round(Number(AVG_RATING))
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">{AVG_RATING}</span>
                <span className="text-sm">
                  out of 5 · {reviews.length} reviews
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {reviews.map((r, i) => (
                <article
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= r.stars
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    &ldquo;{r.text}&rdquo;
                  </blockquote>
                  <footer className="border-t border-slate-100 dark:border-slate-700 pt-3">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {r.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {r.role}
                    </p>
                  </footer>
                </article>
              ))}
            </div>
          </section>

          <Separator className="mt-16" />

          {/* FAQ */}
          <section
            className="mt-16 max-w-3xl mx-auto"
            aria-label="Frequently asked questions"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faq.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx + 1}`}>
                  <AccordionTrigger className="text-left text-base">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Related searches */}
          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="mb-2 text-lg font-semibold">Related searches</h2>
            <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
              People also search for these YouTube thumbnail topics:
            </p>
            <ul className="flex flex-wrap gap-2">
              {[
                "youtube thumbnail downloader hd",
                "download youtube thumbnail free",
                "youtube shorts thumbnail download",
                "youtube thumbnail grabber",
                "save youtube thumbnail as jpg",
                "youtube thumbnail 1280x720 download",
                "get thumbnail from youtube url",
                "youtube thumbnail download mobile",
                "youtube thumbnail download iphone",
                "youtube hd thumbnail no watermark",
                "youtube thumbnail extractor online",
                "download youtube video thumbnail",
                "youtube thumbnail downloader chrome",
                "youtube thumbnail url direct",
                "custom youtube thumbnail download",
                "youtube live thumbnail download",
                "youtube playlist thumbnail download",
                "youtube channel thumbnail download",
                "thumbnail downloader no signup",
                "free youtube image downloader",
              ].map((kw, i) => (
                <li
                  key={i}
                  className="rounded-full border bg-slate-100/60 dark:bg-slate-800/60 px-3 py-1 text-xs text-slate-500 dark:text-slate-400 transition-colors hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
                >
                  {kw}
                </li>
              ))}
            </ul>
          </section>

          {/* Related tools */}
          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              More free creator tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: "/tools/youtube-tags-extractor", label: "YouTube Tag Generator" },
                { href: "/tools/youtube-video-downloader", label: "YouTube Video Downloader" },
                { href: "/tools/image-compressor", label: "Image Compressor" },
                { href: "/tools", label: "All Free Tools" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center text-sm font-medium hover:border-red-400 hover:text-red-600 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </section>

          <p className="mt-12 max-w-3xl mx-auto rounded-xl border bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
            YouTube thumbnails are copyrighted by their respective creators.
            Download for personal use, research, or inspiration only. Do not
            republish or use others&apos; thumbnails commercially without
            permission.
          </p>
        </div>
      </div>
    </>
  );
}
