import Link from "next/link";
import { Home, ChevronRight, Star } from "lucide-react";
import VideoToGifConverter from "./video-to-gif-converter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

const reviews = [
  {
    author: "Danny R.",
    role: "Social Media Manager",
    rating: 5,
    body: "I make meme GIFs from video clips daily. The fact that nothing uploads to a server is a huge plus — client videos stay private. Fast and zero fuss.",
  },
  {
    author: "Lena K.",
    role: "Frontend Developer",
    rating: 5,
    body: "Perfect for creating UI demo GIFs for documentation. The FPS and width sliders let me nail the file size before embedding in a README.",
  },
  {
    author: "Marcus T.",
    role: "Gaming Content Creator",
    rating: 5,
    body: "I clip game highlights and convert them to GIF for Discord and Reddit. No upload wait, no registration — just drop the clip and download the GIF.",
  },
  {
    author: "Aisha N.",
    role: "Online Teacher",
    rating: 4,
    body: "Great for making short instructional GIFs from screen recordings. Works right in the browser with no installs. The quality settings are a nice touch.",
  },
  {
    author: "Tom H.",
    role: "Digital Marketer",
    rating: 5,
    body: "I use this constantly for email campaign GIFs. No watermark, no size restrictions on the output — just a clean animated GIF ready to go.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
).toFixed(1);

const faqs = [
  {
    q: "Does my video get uploaded to your servers?",
    a: "No — conversion happens entirely in your browser using JavaScript. Your video file never leaves your device and is never sent to any server. It's 100% private.",
  },
  {
    q: "What video formats are supported?",
    a: "You can convert MP4, WebM, MOV, and AVI files. MP4 is the most reliable format across all browsers. Files up to 500 MB are supported.",
  },
  {
    q: "Is this video to GIF converter free?",
    a: "Yes, completely free. There's no signup, no account, no watermark on the output, and no limit on how many conversions you can do.",
  },
  {
    q: "What's the maximum video file size?",
    a: "The tool supports video files up to 500 MB. Since conversion runs in your browser, very large files may take longer depending on your device's processing power.",
  },
  {
    q: "How do I control the GIF quality and file size?",
    a: "Use the three settings: lower FPS (5–10) for smaller files, lower width (200–320 px) for compact GIFs, and the Quality selector to balance speed vs. colour fidelity. Lower quality renders faster and produces a smaller file.",
  },
  {
    q: "Why is my output GIF file so large?",
    a: "GIFs store colour data frame-by-frame, making them inherently large. Reduce file size by lowering FPS (try 10–12), reducing width to 320–480 px, and choosing Low quality. Limit the source clip to under 10 seconds for best results.",
  },
  {
    q: "How many frames per second should I use?",
    a: "10–15 FPS is the sweet spot for most uses — smooth enough to look good, small enough to share easily. Use 20–24 FPS only for fast-moving content where motion blur would be visible at lower rates.",
  },
  {
    q: "Can I make the GIF loop continuously?",
    a: "Yes — the Loop GIF checkbox is on by default. Uncheck it if you want the animation to play once and stop. Most platforms (Giphy, Tenor, Discord, Slack) expect looping GIFs.",
  },
];

export const metadata = {
  title: {
    absolute:
      "Free Video to GIF Converter Online — No Upload, No Signup | Shopyor",
  },
  description:
    "Convert MP4, WebM, MOV, or AVI to GIF free in your browser — no upload, no signup, no watermark. Adjust FPS, width, and quality, then download instantly.",
  keywords: [
    "video to gif converter free no upload",
    "convert mp4 to gif online free no signup",
    "video to gif browser based no upload",
    "free gif maker from video no registration",
    "convert video to gif without uploading",
    "mp4 to gif converter free online",
    "video to gif online free no watermark",
    "free animated gif maker from video",
    "convert webm to gif online free",
    "video to gif converter private no server",
    "make gif from video free no sign up",
    "mov to gif converter online free",
    "gif maker from video clip free",
    "video to gif converter in browser",
    "convert video to animated gif free",
    "mp4 to gif no upload free download",
    "free video to gif with fps control",
    "high quality video to gif free",
    "avi to gif converter online free",
    "gif converter no upload no registration",
  ],
  authors: [{ name: "Shopyor" }],
  category: "Video Tools",
  classification: "Web Application",
  robots: "index, follow",
  alternates: {
    canonical: `${BASE_URL}/tools/video-to-gif`,
    languages: {
      "en-US": `${BASE_URL}/tools/video-to-gif`,
      "en-GB": `${BASE_URL}/tools/video-to-gif`,
      "en-AU": `${BASE_URL}/tools/video-to-gif`,
      "en-CA": `${BASE_URL}/tools/video-to-gif`,
      "en-IN": `${BASE_URL}/tools/video-to-gif`,
      "fr-FR": `${BASE_URL}/tools/video-to-gif`,
      "de-DE": `${BASE_URL}/tools/video-to-gif`,
      "es-ES": `${BASE_URL}/tools/video-to-gif`,
      "pt-BR": `${BASE_URL}/tools/video-to-gif`,
      "ja-JP": `${BASE_URL}/tools/video-to-gif`,
      "zh-CN": `${BASE_URL}/tools/video-to-gif`,
    },
  },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/tools/video-to-gif`,
    title: "Free Video to GIF Converter — No Upload, No Signup | Shopyor",
    description:
      "Convert MP4, WebM, or MOV to GIF instantly in your browser. No file upload, no account, no watermark.",
    images: [{ url: `${BASE_URL}/images/shopyor-tools-og.png` }],
    siteName: "Shopyor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Video to GIF Converter — No Upload | Shopyor",
    description:
      "Convert video to GIF in your browser — no upload, no signup, no watermark. Adjust FPS and width, then download free.",
    images: [`${BASE_URL}/images/shopyor-tools-og.png`],
  },
};

export default function VideoToGifPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${BASE_URL}/tools/video-to-gif#app`,
        name: "Shopyor Video to GIF Converter",
        url: `${BASE_URL}/tools/video-to-gif`,
        description:
          "Free browser-based video to GIF converter. Convert MP4, WebM, MOV, or AVI to animated GIF with no upload, no signup, and no watermark.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "All",
        browserRequirements:
          "Requires a modern web browser with JavaScript enabled",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Convert MP4, WebM, MOV, and AVI to GIF",
          "100% browser-based — no file upload",
          "Adjustable FPS (5–24)",
          "Adjustable output width (200–800 px)",
          "Low / Medium / High quality setting",
          "Loop or single-play GIF output",
          "No signup or account required",
          "No watermark on output",
          "Free to use",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: AVG_RATING,
          reviewCount: String(reviews.length),
          bestRating: "5",
          worstRating: "1",
        },
        review: reviews.map((r) => ({
          "@type": "Review",
          author: { "@type": "Person", name: r.author },
          reviewRating: {
            "@type": "Rating",
            ratingValue: String(r.rating),
            bestRating: "5",
            worstRating: "1",
          },
          reviewBody: r.body,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${BASE_URL}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Video to GIF Converter",
            item: `${BASE_URL}/tools/video-to-gif`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Page header ── */}
      <div className="mx-auto max-w-5xl px-4 pt-6 md:pt-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link
            href="/"
            className="inline-flex items-center transition-colors hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5" />
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            href="/tools"
            className="transition-colors hover:text-foreground"
          >
            Tools
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">Video to GIF</span>
        </nav>

        {/* Badges */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-500" />
            Browser-Based · No Upload
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            No Signup
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            No Watermark
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-3xl font-black leading-tight tracking-tight md:text-4xl">
          Free Video to GIF Converter —{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            No Upload Required
          </span>
        </h1>
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-4 w-4 ${s <= Math.round(Number(AVG_RATING)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{AVG_RATING}</span>
          <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Convert MP4, WebM, MOV, or AVI to an animated GIF entirely in your
          browser. Your video never leaves your device. Free, no signup, no
          watermark — download your GIF in seconds.
        </p>

        {/* Trust pills */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {[
            "MP4 · WebM · MOV · AVI",
            "Up to 500 MB",
            "FPS control (5–24)",
            "Width control (200–800 px)",
            "Loop or single-play",
            "100% private",
          ].map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-muted/50 px-2.5 py-1"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* ── Tool ── */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        <VideoToGifConverter />
      </div>

      {/* ── User Reviews ── */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          What users say about our free video to GIF converter
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <blockquote
              key={r.author}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;{r.body}&rdquo;
              </p>
              <footer className="mt-3">
                <p className="text-xs font-semibold text-foreground">
                  {r.author}
                </p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── Article ── */}
      <article className="mx-auto max-w-3xl px-4 pb-16">
        <h2 className="mb-4 text-xl font-bold text-foreground">
          Why convert video to GIF in the browser?
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Most online converters upload your video to a server, process it
          remotely, and send back a download link — which means wait times,
          file-size limits, and your footage passing through a third-party
          server. Shopyor&rsquo;s converter runs entirely in your browser using
          the Web Audio API and the GIF.js library. Frames are captured from
          your video element directly on your device, encoded locally, and
          handed back to you as a downloadable GIF — no upload, no server, no
          privacy risk.
        </p>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          This also means conversion speed depends on your CPU rather than your
          internet connection, making it especially fast for short clips on
          modern hardware.
        </p>

        <h2 className="mb-4 text-xl font-bold text-foreground">
          How to convert a video to GIF in 4 steps
        </h2>
        <ol className="mb-8 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">
              1. Select your video file.
            </strong>{" "}
            Click the upload area or drag and drop an MP4, WebM, MOV, or AVI
            file (up to 500 MB). A preview loads immediately in your browser.
          </li>
          <li>
            <strong className="text-foreground">2. Adjust GIF settings.</strong>{" "}
            Set FPS (5–24), output width (200–800 px), and quality. Tick
            &ldquo;Loop GIF&rdquo; for a continuously repeating animation.
          </li>
          <li>
            <strong className="text-foreground">3. Click Convert to GIF.</strong>{" "}
            The tool captures frames and encodes your GIF entirely on-device.
            A progress bar tracks completion.
          </li>
          <li>
            <strong className="text-foreground">4. Download your GIF.</strong>{" "}
            Preview the result and click &ldquo;Download GIF&rdquo;. No account,
            no email, no watermark.
          </li>
        </ol>

        <h2 className="mb-4 text-xl font-bold text-foreground">
          GIF settings guide: FPS, width, and quality explained
        </h2>
        <div className="mb-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Setting
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Recommended value
                </th>
                <th className="px-4 py-3 text-left font-semibold text-foreground">
                  Effect on file size
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["FPS", "10–15 for most use cases", "Lower FPS = smaller file"],
                ["Width", "320–480 px for social/web", "Smaller width = smaller file"],
                ["Quality", "Medium for balanced output", "Low quality = fastest, smallest"],
                ["Loop", "On (default)", "No effect on file size"],
              ].map(([setting, rec, effect]) => (
                <tr key={setting}>
                  <td className="px-4 py-2.5 font-medium text-foreground">
                    {setting}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{rec}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mb-4 text-xl font-bold text-foreground">
          Tips for smaller, sharper GIFs
        </h2>
        <ul className="mb-8 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Keep clips under 10 seconds.</strong>{" "}
            GIFs grow linearly with duration — a 30-second clip at 15 FPS
            produces 450 frames, which can easily exceed 50 MB.
          </li>
          <li>
            <strong className="text-foreground">Use 320 px width for messaging apps.</strong>{" "}
            Discord, Slack, and most chat platforms display GIFs at 320–480 px
            wide, so higher resolutions are wasted size.
          </li>
          <li>
            <strong className="text-foreground">Try 10 FPS first.</strong>{" "}
            Most GIFs look perfectly smooth at 10–12 FPS. Only push to 20+ FPS
            for very fast motion like sports clips.
          </li>
          <li>
            <strong className="text-foreground">Trim your clip first.</strong>{" "}
            Edit down to just the key moment before converting — a shorter source
            means far fewer frames to process.
          </li>
          <li>
            <strong className="text-foreground">
              Use MP4 as your source format.
            </strong>{" "}
            MP4 has the broadest browser support and typically loads fastest for
            frame capture.
          </li>
        </ul>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          For the full breakdown of FPS, width, and quality trade-offs, see our
          guide on{" "}
          <Link href="/blog/how-to-convert-a-video-to-gif-without-losing-quality">
            how to convert a video to GIF without a huge file size
          </Link>
          .
        </p>

        <h2 className="mb-4 text-xl font-bold text-foreground">
          More free tools
        </h2>
        <ul className="mb-0 grid gap-2 text-sm sm:grid-cols-2">
          {[
            { href: "/tools/image-resizer", label: "Image Resizer" },
            { href: "/tools/background-remover-image", label: "Background Remover" },
            { href: "/tools/image-compressor", label: "Image Compressor" },
            { href: "/tools/pdf-compressor", label: "PDF Compressor" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-purple-400/50 hover:bg-purple-500/5"
              >
                {label} →
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Link
            href="/tools"
            className="text-sm font-medium text-purple-600 transition hover:text-blue-600 dark:text-purple-300"
          >
            View all free tools →
          </Link>
        </div>
      </article>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="mb-6 text-xl font-bold text-foreground">
          Frequently asked questions about video to GIF conversion
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-xl border border-border bg-card px-5"
            >
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── Related searches ── */}
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Related searches
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "video to gif converter",
            "mp4 to gif free",
            "convert video to gif no upload",
            "gif maker from video",
            "webm to gif online",
            "mov to gif converter",
            "avi to gif free",
            "animated gif from video",
            "gif converter no signup",
            "browser gif maker",
            "gif no watermark",
            "video to gif private",
            "gif fps control",
            "small gif from video",
            "gif for discord",
            "gif for twitter",
            "gif for slack",
            "video clip to gif",
            "screen recording to gif",
            "free gif converter online",
          ].map((kw) => (
            <span
              key={kw}
              className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground"
            >
              {kw}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
