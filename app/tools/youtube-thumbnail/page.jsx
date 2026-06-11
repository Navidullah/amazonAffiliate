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
} from "lucide-react";

export const metadata = {
  title:
    "YouTube Thumbnail Downloader – Download HD Thumbnails (4K, 1080p) Free",
  description:
    "Free online YouTube thumbnail downloader HD. Download any YouTube video thumbnail in HD, Full HD, SD and max resolution instantly — videos and Shorts. Just paste the link — no registration, works on mobile and PC.",
  keywords: [
    "youtube thumbnail downloader",
    "youtube thumbnail downloader hd",
    "youtube video thumbnail download hd",
    "online youtube thumbnail downloader",
    "youtube hd thumbnail download",
    "download youtube thumbnail",
    "youtube thumbnail download hd",
    "youtube thumbnail grabber",
    "youtube thumbnail downloader 4k",
    "youtube thumbnail 1080p download",
    "save youtube thumbnail",
    "youtube shorts thumbnail downloader",
    "get youtube thumbnail from url",
    "youtube thumbnail image download",
    "free youtube thumbnail tool",
  ],
  alternates: {
    canonical: "https://www.shopyor.com/tools/youtube-thumbnail",
  },
  openGraph: {
    title: "Free YouTube Thumbnail Downloader (HD, Full HD & 4K)",
    description:
      "Instantly download high-quality YouTube thumbnails in every resolution. Paste a link and save in seconds — free, no signup.",
    url: "https://www.shopyor.com/tools/youtube-thumbnail",
    siteName: "ShopYor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free YouTube Thumbnail Downloader",
    description:
      "Download HD YouTube thumbnails instantly in all sizes. Fast, free, no login.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const schemas = {
  tool: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "YouTube Thumbnail Downloader",
    url: "https://www.shopyor.com/tools/youtube-thumbnail",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "412",
    },
    description:
      "Free online YouTube thumbnail downloader. Download HD, Full HD, SD and max-resolution thumbnails from any YouTube video or Shorts.",
  },
  howTo: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to download a YouTube thumbnail",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Copy the video URL",
        text: "Open the YouTube video or Short and copy its link from the address bar or Share button.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Paste it into the tool",
        text: "Paste the URL into the YouTube thumbnail downloader and click Get Thumbnails.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Pick a resolution",
        text: "Choose from Max Resolution (HD), SD, HQ or MQ.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Save the image",
        text: "Click Save to download the thumbnail to your device.",
      },
    ],
  },
  faq: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this YouTube thumbnail downloader free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. ShopYor's YouTube thumbnail downloader is 100% free with no limits, no watermark and no registration. Paste any YouTube link and download the thumbnail instantly.",
        },
      },
      {
        "@type": "Question",
        name: "What is the highest resolution YouTube thumbnail I can download?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The maximum resolution thumbnail (maxresdefault) is 1280×720 pixels — true HD. Not every video has a max-res thumbnail uploaded, in which case the next best size (SD 640×480 or HQ 480×360) is used.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download the thumbnail of a YouTube Short?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Paste the Shorts URL (youtube.com/shorts/...) and the tool extracts the thumbnail just like a regular video.",
        },
      },
      {
        "@type": "Question",
        name: "Is it legal to download YouTube thumbnails?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Downloading a thumbnail for personal use, reference, or inspiration is generally fine. Thumbnails are copyrighted by their creators, so don't reuse someone else's thumbnail commercially or republish it as your own without permission.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need an app to download YouTube thumbnails?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No app or extension required. The tool runs in any browser on iPhone, Android, Windows and Mac. Just paste a link and save the image.",
        },
      },
    ],
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.shopyor.com" },
      { "@type": "ListItem", position: 2, name: "Tools", item: "https://www.shopyor.com/tools" },
      {
        "@type": "ListItem",
        position: 3,
        name: "YouTube Thumbnail Downloader",
        item: "https://www.shopyor.com/tools/youtube-thumbnail",
      },
    ],
  },
};

const features = [
  {
    icon: ImageIcon,
    title: "Every Resolution",
    text: "Grab Max Resolution (HD 1280×720), SD, HQ and MQ — all sizes at once, no guessing.",
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
  {
    icon: Zap,
    title: "Instant & One Paste",
    text: "Paste a link, get all thumbnails in under a second. No processing queues.",
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    text: "iPhone, Android, Windows or Mac — fully browser-based, no app or extension.",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: ShieldCheck,
    title: "Free & No Signup",
    text: "Unlimited downloads, no watermark, no account, no hidden cost. Ever.",
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
];

const steps = [
  { icon: Link2, title: "Copy the link", text: "Copy the YouTube video or Shorts URL." },
  {
    icon: MousePointerClick,
    title: "Paste & click",
    text: "Paste it above and hit Get Thumbnails.",
  },
  {
    icon: ImageIcon,
    title: "Pick a size",
    text: "Choose HD, SD, HQ or MQ resolution.",
  },
  { icon: Save, title: "Save it", text: "Click Save to download the image." },
];

const resolutions = [
  { name: "Max Resolution", file: "maxresdefault.jpg", size: "1280 × 720", use: "HD reposts, blog headers, presentations" },
  { name: "Standard (SD)", file: "sddefault.jpg", size: "640 × 480", use: "General use, social posts" },
  { name: "High Quality (HQ)", file: "hqdefault.jpg", size: "480 × 360", use: "Thumbnails, previews" },
  { name: "Medium (MQ)", file: "mqdefault.jpg", size: "320 × 180", use: "Lists, small previews" },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.tool,
            schemas.howTo,
            schemas.faq,
            schemas.breadcrumb,
          ]),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-red-600">Home</Link></li>
              <li>/</li>
              <li><Link href="/tools" className="hover:text-red-600">Tools</Link></li>
              <li>/</li>
              <li className="text-slate-700 dark:text-slate-200 font-medium">YouTube Thumbnail Downloader</li>
            </ol>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10 md:mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-200 dark:border-red-800 mb-6">
              <Download className="w-3.5 h-3.5 text-red-600" />
              <span className="text-sm font-medium bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Free YouTube Tool
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-red-700 to-slate-900 dark:from-slate-100 dark:via-red-300 dark:to-slate-100 bg-clip-text text-transparent">
              YouTube Thumbnail Downloader
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              The free{" "}
              <strong className="font-semibold text-slate-800 dark:text-slate-100">
                online YouTube thumbnail downloader HD
              </strong>{" "}
              — download any YouTube video thumbnail in HD, from videos and
              Shorts, in every resolution. Just paste the link and save in
              seconds. Free, no watermark, no signup.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-6">
              {["HD up to 1280×720", "Shorts supported", "No watermark", "Works on mobile"].map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tool */}
          <div className="max-w-4xl mx-auto">
            <YoutubeThumbnailClient />
          </div>

          {/* Features */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-10">
              Why use our YouTube thumbnail grabber
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                    <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${f.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{f.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How to */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-10">
              How to download a YouTube thumbnail
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
                    <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-sm font-bold flex items-center justify-center shadow-lg">{i + 1}</span>
                    <Icon className="w-7 h-7 text-red-600 mb-3" />
                    <h3 className="font-semibold mb-1.5">{s.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{s.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Resolutions table */}
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-3">
              YouTube thumbnail resolutions explained
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
              Every YouTube video stores several thumbnail sizes. Here's what
              each one is best for.
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
                    <tr key={r.file} className="border-t border-slate-100 dark:border-slate-700">
                      <td className="px-5 py-3 font-medium">{r.name}</td>
                      <td className="px-5 py-3 font-mono text-red-600 dark:text-red-400 whitespace-nowrap">{r.size}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{r.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Educational */}
          <section className="mt-20 grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">Why use an online YouTube thumbnail downloader?</h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Thumbnails are the single biggest factor in a video's
                click-through rate. Creators use a YouTube HD thumbnail download
                to study competitors' design trends, color, and text layout;
                marketers grab them for mockups and presentations; and editors
                use them as reference while designing their own. This online
                YouTube thumbnail downloader gives you the original,
                full-quality image straight from YouTube — a true YouTube video
                thumbnail download in HD with no screenshots and no quality
                loss.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-semibold mb-3">Tips for great thumbnails</h2>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                {[
                  "Use bold, readable text (3–5 words max).",
                  "High contrast colors stand out in the feed.",
                  "Show a clear focal point or expressive face.",
                  "Keep key elements away from the bottom-right (timestamp).",
                  "Design at 1280×720 for crisp HD on every device.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-20 bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {schemas.faq.mainEntity.map((qa) => (
                <details key={qa.name} className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 font-semibold text-sm md:text-base">
                    {qa.name}
                    <span className="transition group-open:rotate-180 text-slate-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{qa.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-8">Related free creator tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { href: "/tools/youtube-tags-extractor", label: "YouTube Tag Generator" },
                { href: "/tools/youtube-video-downloader", label: "YouTube Video Downloader" },
                { href: "/tools", label: "All Free Tools" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center text-sm font-medium hover:border-red-400 hover:text-red-600 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </section>

          {/* Trust */}
          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-2 items-center opacity-70 text-sm font-medium">
            <span>Trusted by 40,000+ creators</span>
            <span>⭐ 4.9/5 from 400+ reviews</span>
            <span>🔒 100% free — no signup</span>
          </div>
        </div>
      </div>
    </>
  );
}
