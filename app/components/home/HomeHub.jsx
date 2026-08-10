"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Mic,
  Wand2,
  ImageDown,
  ShieldCheck,
  FileText,
  FileArchive,
  Activity,
  Link2,
  Youtube,
  Tags,
  Tag,
  Bot,
  LayoutGrid,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

/* ===== Motion helpers ===== */
const EASE = [0.22, 1, 0.36, 1];

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ===== Tool content, grouped by category =====
   Each tool: a heading, a discussion paragraph (what it is + why use it),
   and an elaborated, descriptive link to its tool page. */
const GROUPS = [
  {
    id: "video-media",
    category: "Video & Media",
    gradient: "from-blue-600 to-purple-600",
    blurb:
      "Save and repurpose video from anywhere on the web â€” no apps, no watermarks, no sign-up.",
    tools: [
      {
        id: "facebook-video-downloader",
        name: "Facebook Video Downloader",
        href: "/tools/facebook-video-downloader",
        icon: FaFacebook,
        cta: "Open the Facebook Video Downloader",
        body: "Facebook keeps your favourite reels and videos locked inside the app, with no built-in save button. Our Facebook Video Downloader fixes that: paste any public Facebook video or reel link and download it in crisp HD quality straight to your phone or computer. There is nothing to install and no account to create â€” it works right in your browser, so you can keep clips for offline viewing, re-sharing, or editing in seconds.",
      },
      {
        id: "instagram-video-downloader",
        name: "Instagram Video Downloader",
        href: "/tools/instagram-video-downloader",
        icon: FaInstagram,
        cta: "Open the Instagram Video Downloader",
        body: "Want to keep an Instagram reel, post video, or IGTV clip? Instagram doesn't let you save other people's videos directly. Paste a public Instagram link into our Instagram Video Downloader and it fetches the original, full-quality file for you â€” preview it, copy the link, or download the MP4 in one tap. It's perfect for content creators collecting inspiration and anyone who wants their favourite reels available offline.",
      },
      {
        id: "tiktok-video-downloader",
        name: "TikTok Video Downloader",
        href: "/tools/free-tiktok-video-downloader",
        icon: FaTiktok,
        cta: "Open the TikTok Video Downloader",
        body: "Downloading a TikTok normally leaves a giant moving watermark across the clip. Our TikTok Video Downloader removes that: paste the video URL and save a clean, watermark-free copy in up to 1080p Full HD. Whether you're archiving your own posts, building a compilation, or reposting to another platform, you get a sharp, logo-free video that's ready to use â€” completely free and with unlimited downloads.",
      },
      {
        id: "voice-cloner",
        name: "AI Voice Cloner",
        href: "/tools/voice-clone",
        icon: Mic,
        cta: "Open the Free AI Voice Cloner",
        body: "Record once, narrate forever. Our free AI Voice Cloner learns a voice from a short 10â€“30 second sample, then reads any text you type in that voice â€” a no-watermark alternative to ElevenLabs and Speechify. It's ideal for YouTube voiceovers, podcasts, audiobooks, and personalised text-to-speech in your own voice. A required consent step keeps cloning ethical, and you can download the result as a high-quality WAV file instantly.",
      },
    ],
  },
  {
    id: "image",
    category: "Image Tools",
    gradient: "from-pink-500 to-rose-500",
    blurb:
      "Clean up, shrink, and resize images right in your browser â€” your files never leave your device.",
    tools: [
      {
        id: "ai-background-remover",
        name: "AI Background Remover",
        href: "/tools/background-remover-image",
        icon: Wand2,
        cta: "Open the AI Background Remover",
        body: "Cutting out a background by hand is slow and fiddly. Our AI Background Remover does it automatically: upload a photo and the AI detects the subject and erases the background in one click, leaving a clean transparent PNG. It's perfect for product shots, profile pictures, logos, and marketplace listings â€” no Photoshop, no manual masking, and no design experience required.",
      },
      {
        id: "image-compressor",
        name: "Image Compressor",
        href: "/tools/image-compressor",
        icon: ImageDown,
        cta: "Open the Image Compressor",
        body: "Large images slow down websites and clog up email attachments. Our Image Compressor shrinks JPG and PNG file sizes dramatically while keeping them looking sharp, using smart compression that targets invisible data first. Faster-loading pages rank better and feel smoother, so this is a quick win for bloggers, store owners, and anyone uploading photos who wants smaller files without obvious quality loss.",
      },
      {
        id: "exif-remover",
        name: "EXIF Metadata Remover",
        href: "/tools/exif-remover",
        icon: ShieldCheck,
        cta: "Open the EXIF Metadata Remover",
        body: "Every photo you take quietly stores hidden EXIF data â€” including the exact GPS location, device model, and timestamp. Before you share images online, our EXIF Metadata Remover strips that information out so you don't accidentally reveal where you live or work. It's a simple, important privacy step: upload your photo, remove the metadata, and download a clean copy that's safe to post anywhere.",
      },
    ],
  },
  {
    id: "documents",
    category: "PDF & Documents",
    gradient: "from-amber-500 to-orange-500",
    blurb:
      "Convert, compress, and build documents fast â€” secure processing and clean results.",
    tools: [
      {
        id: "pdf-to-word",
        name: "PDF to Word Converter",
        href: "/tools/convert-your-pdf-file-to-word",
        icon: FileText,
        cta: "Open the PDF to Word Converter",
        body: "Stuck with a PDF you can't edit? Our PDF to Word Converter turns any PDF into a fully editable Word (DOCX) document while preserving the layout, fonts, tables, and formatting. It even applies OCR to scanned, image-based PDFs so the text becomes selectable and editable. Convert contracts, resumes, and reports in seconds â€” free, with no sign-up â€” then open the result in Word, Google Docs, or LibreOffice.",
      },
      {
        id: "pdf-compressor",
        name: "PDF Compressor",
        href: "/tools/compress-your-pdf-file",
        icon: FileArchive,
        cta: "Open the PDF Compressor",
        body: "Email attachment limits and upload caps love to reject big PDFs. Our PDF Compressor reduces PDF file size quickly while keeping the document clear and readable, so you can send, upload, and store files without hassle. It's perfect for shrinking scanned documents, portfolios, and presentations down to a manageable size â€” secure, fast, and free, with the original quality kept as high as possible.",
      },
    ],
  },
  {
    id: "everyday",
    category: "Health, Marketing & SEO",
    gradient: "from-emerald-500 to-teal-600",
    blurb:
      "Handy calculators and marketing utilities that save you time every day.",
    tools: [
      {
        id: "bmi-calculator",
        name: "BMI Calculator",
        href: "/tools/bmi",
        icon: Activity,
        cta: "Open the Free BMI Calculator",
        body: "Body Mass Index (BMI) is a quick way to check whether your weight sits in a healthy range for your height. We calculate BMI because it's a simple, recognised screening signal â€” a high or low number can flag when it's worth looking more closely at your health. Our BMI Calculator works in kg & cm or lb & ft, shows your category on a colour-coded chart, and tells you the healthy weight range for your height by age and gender.",
      },
      {
        id: "affiliate-link-generator",
        name: "Amazon Affiliate Link Generator",
        href: "/tools/affiliate-link-generator",
        icon: Link2,
        cta: "Open the Amazon Affiliate Link Generator",
        body: "If you earn through Amazon Associates, every link needs your tracking tag to credit your commission. Our Amazon Affiliate Link Generator converts any Amazon product URL or ASIN into a clean, trackable affiliate link with your own Associate Tag â€” no SiteStripe or API required. It supports 19 marketplaces and strips out old tags, so your links look professional and track correctly on a blog, YouTube description, or social bio.",
      },
      {
        id: "youtube-thumbnail",
        name: "YouTube Thumbnail Downloader",
        href: "/tools/youtube-thumbnail",
        icon: Youtube,
        cta: "Open the YouTube Thumbnail Downloader",
        body: "Thumbnails are the single biggest factor in a video's click-through rate, so studying the best ones is smart research. Our YouTube Thumbnail Downloader grabs the full-resolution thumbnail image from any YouTube video in one step. Paste the video link and download the HD thumbnail to analyse competitors, build mood boards, or reuse your own artwork â€” quick, free, and no sign-up needed.",
      },
      {
        id: "youtube-tags",
        name: "YouTube Tags Extractor",
        href: "/tools/youtube-tags-extractor",
        icon: Tags,
        cta: "Open the YouTube Tags Extractor",
        body: "The tags a video uses reveal how its creator targets search and suggested feeds. Our YouTube Tags Extractor pulls the hidden tags from any YouTube video instantly, so you can see exactly which keywords a successful video is ranking for. Use those insights to research your niche, refine your own tags, and improve how your videos get discovered â€” a fast, free shortcut for content strategy.",
      },
      {
        id: "meta-tag-generator",
        name: "Meta Tag Generator",
        href: "/tools/meta-tag-generator",
        icon: Tag,
        cta: "Open the Meta Tag Generator",
        body: "Meta tags tell Google and social platforms what your page is about and how it should appear in search results and link previews. Our Meta Tag Generator builds clean, correct title, description, and Open Graph tags for any web page â€” just fill in your details and copy the generated code. It's an easy way for site owners and developers to improve SEO and get attractive, accurate previews when pages are shared.",
      },
      {
        id: "robots-txt-generator",
        name: "Robots.txt Generator",
        href: "/tools/robots-txt-generator",
        icon: Bot,
        cta: "Open the Robots.txt Generator",
        body: "A robots.txt file tells search engine crawlers which parts of your site to crawl and which to skip, which protects your crawl budget and keeps private areas out of search. Our Robots.txt Generator creates a correct, ready-to-upload file in seconds â€” choose your rules, generate the file, and drop it into your site's root. It's a small file that has a real impact on your site's SEO health.",
      },
    ],
  },
];

export default function HomeHub() {
  return (
    <div className="min-h-screen">
      {/* ===== Banner / Hero ===== */}
      <section className="relative overflow-hidden px-4 pt-4 pb-14 text-center sm:pt-6">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute -top-40 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[130px]"
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </div>

        {/* Above-the-fold hero is rendered as static HTML (no entrance
            animation) so the LCP element paints on first paint instead of
            waiting for Framer Motion to hydrate. Do NOT wrap this content in
            motion with an opacity:0 initial â€” that regresses mobile LCP. */}
        <div>
          <div className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              21+ Free Online Tools Â· No sign-up
            </span>
          </div>

          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
            Free Online Tools by{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Shopyor
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Shopyor brings together everything you need in one place â€” a growing
            suite of fast, secure, browser-based tools that are{" "}
            <span className="font-medium text-foreground">100% free</span> with
            no sign-up and no software to install. Download videos, edit and
            compress images, convert and shrink PDFs, build a resume, clone a
            voice, and sharpen your SEO. Explore each tool below, or jump
            straight to the full collection.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-transform hover:-translate-y-0.5"
            >
              <LayoutGrid className="h-4 w-4" /> Browse all tools
            </Link>
            <a
              href="#video-media"
              className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-black/[0.02] px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-black/[0.04] dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
            >
              Start exploring
            </a>
          </div>

          {/* Quick category jump links */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                {g.category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tool sections by category ===== */}
      {GROUPS.map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          className={`scroll-mt-24 px-4 py-14 ${gi % 2 === 1 ? "bg-muted/30" : ""}`}
        >
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-10 text-center">
              <span
                className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${group.gradient} px-4 py-1.5 text-sm font-semibold text-white shadow-md`}
              >
                {group.category}
              </span>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                {group.blurb}
              </p>
            </Reveal>

            <div className="space-y-5">
              {group.tools.map((tool, ti) => {
                const Icon = tool.icon;
                return (
                  <Reveal key={tool.id} delay={Math.min(ti * 0.05, 0.2)}>
                    <div
                      id={tool.id}
                      className="group scroll-mt-24 rounded-2xl border border-border bg-card/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl sm:p-7"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                        <span
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${group.gradient} text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                        >
                          <Icon className="h-7 w-7" />
                        </span>

                        <div className="min-w-0">
                          <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                            {tool.name}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                            {tool.body}
                          </p>
                          <Link
                            href={tool.href}
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
                          >
                            {tool.cta}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* ===== Closing CTA ===== */}
      <section className="px-4 py-16">
        <Reveal className="mx-auto max-w-3xl rounded-3xl border border-primary/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            One toolbox, zero cost
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Every Shopyor tool is free, private, and works in your browser on any
            device. New tools are added regularly â€” bookmark the collection so
            you always have the right tool on hand.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-transform hover:-translate-y-0.5"
            >
              <LayoutGrid className="h-4 w-4" /> Browse all free tools
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
