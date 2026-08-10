"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  ImageDown,
  Link2,
  MousePointerClick,
  Save,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import YoutubeThumbnailClient from "@/app/components/thumbnail-client/thumbnail-client";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const features = [
  {
    icon: ImageDown,
    title: "Every Resolution",
    desc: "Grab Max Resolution (HD 1280×720), SD, HQ and MQ — all four sizes at once, no guessing which exists.",
    accent: "from-red-500 to-rose-500",
  },
  {
    icon: Zap,
    title: "Instant — One Paste",
    desc: "Paste a link and all thumbnails appear in under a second. No processing queues, no waiting.",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "Free & No Signup",
    desc: "Unlimited downloads, no watermark, no account, no hidden cost — ever.",
    accent: "from-emerald-500 to-teal-500",
  },
];

const steps = [
  {
    icon: Link2,
    title: "Copy the link",
    desc: "Copy the YouTube video or Shorts URL from the address bar or Share button.",
  },
  {
    icon: MousePointerClick,
    title: "Paste & click",
    desc: "Paste it into the tool and click Get Thumbnails.",
  },
  {
    icon: Save,
    title: "Pick a size & save",
    desc: "Choose HD, SD, HQ or MQ and download the image to your device.",
  },
];

const resolutions = [
  { name: "Max Resolution (HD)", file: "maxresdefault.jpg", size: "1280 × 720", use: "Best quality — use for blog headers, presentations, reposts" },
  { name: "Standard (SD)", file: "sddefault.jpg", size: "640 × 480", use: "General use, social media posts" },
  { name: "High Quality (HQ)", file: "hqdefault.jpg", size: "480 × 360", use: "Embedded players, preview images" },
  { name: "Medium (MQ)", file: "mqdefault.jpg", size: "320 × 180", use: "Small thumbnails, lists" },
];

const relatedTools = [
  { icon: ImageDown, label: "YouTube Tag Generator", href: "/tools/youtube-tags-extractor" },
  { icon: Download, label: "Video Downloader", href: "/tools/video-downloader" },
  { icon: Sparkles, label: "Image Compressor", href: "/tools/image-compressor" },
  { icon: ArrowRight, label: "Browse all free tools", href: "/tools" },
];

const faqs = [
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

const reviews = [
  {
    name: "Marcus T.",
    role: "Video Editor",
    rating: 5,
    body: "Fastest YouTube thumbnail tool I've used. Paste, see all four sizes, download in one click. No login, no ads filling the screen.",
  },
  {
    name: "Aisha N.",
    role: "YouTuber",
    rating: 5,
    body: "I use this every week to study competitor thumbnails. HD quality, instant download, and it works perfectly on my phone too.",
  },
  {
    name: "Rohan P.",
    role: "Content Creator",
    rating: 5,
    body: "Other tools made me sign up or showed pop-up ads. This one just works — paste the link and the thumbnail is right there.",
  },
  {
    name: "Chloe W.",
    role: "Social Media Manager",
    rating: 5,
    body: "Grabbed Shorts thumbnails without any issues. I didn't know any free tool supported Shorts properly until I found this.",
  },
  {
    name: "Diego R.",
    role: "Graphic Designer",
    rating: 4,
    body: "Clean interface and all four resolutions available at once. Saves real time compared to other sites I've tried in the past.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
).toFixed(1);

const relatedSearches = [
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
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-300"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {faq.a}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function YoutubeThumbnailExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-red-50/60 via-white to-rose-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-red-400/20 blur-[120px] dark:bg-red-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-rose-400/20 blur-[120px] dark:bg-rose-600/10" />

      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <motion.header
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-red-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-red-700 shadow-sm backdrop-blur dark:border-red-500/20 dark:bg-white/[0.04] dark:text-red-300"
          >
            <Download className="h-3.5 w-3.5" />
            Free YouTube Tool · No signup · Works on mobile
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            YouTube{" "}
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 bg-clip-text text-transparent dark:from-red-300 dark:via-rose-300 dark:to-orange-200">
              Thumbnail
            </span>{" "}
            Downloader HD
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex items-center justify-center gap-1.5"
          >
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
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Download any YouTube video thumbnail in HD — plus SD, HQ and MQ
            sizes — from videos and Shorts. Paste the link and save in
            seconds. Free, no watermark, no signup.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            {["HD up to 1280×720", "YouTube Shorts supported", "No watermark", "Works on iPhone & Android"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-500" /> {t}
              </span>
            ))}
          </motion.div>
        </motion.header>

        {/* Tool */}
        <section className="mb-20">
          <YoutubeThumbnailClient />
        </section>

        {/* Features */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 grid gap-6 sm:grid-cols-3"
        >
          {features.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(220,38,38,0.35)] dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </motion.article>
          ))}
        </motion.section>

        {/* How to */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            How to download a YouTube thumbnail in HD
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-red-300/60 to-transparent dark:via-red-500/30 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30">
                  <step.icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-xs font-bold text-white dark:border-gray-950">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Resolutions table + SEO content */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 rounded-3xl border border-gray-200/70 bg-white/70 p-7 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] sm:p-10"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            YouTube thumbnail resolutions explained
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Every YouTube video stores several thumbnail sizes on YouTube's
            servers. Here's what each resolution is best used for.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 overflow-x-auto rounded-2xl border border-gray-200/70 dark:border-white/10"
          >
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-gray-50 dark:bg-white/[0.04]">
                <tr>
                  <th className="px-5 py-3 font-semibold text-gray-900 dark:text-gray-100">Quality</th>
                  <th className="px-5 py-3 font-semibold text-gray-900 dark:text-gray-100">Dimensions</th>
                  <th className="px-5 py-3 font-semibold text-gray-900 dark:text-gray-100">Best for</th>
                </tr>
              </thead>
              <tbody>
                {resolutions.map((r) => (
                  <tr key={r.file} className="border-t border-gray-100 dark:border-white/10">
                    <td className="px-5 py-3 font-medium text-gray-900 dark:text-gray-100">{r.name}</td>
                    <td className="px-5 py-3 whitespace-nowrap font-mono text-red-600 dark:text-red-400">{r.size}</td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Why download YouTube thumbnails?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Thumbnails drive a video's click-through rate more than almost any
            other factor. Creators download competitor thumbnails to study
            color choices, font styles, facial expressions, and composition.
            Marketers use them for mockups and presentations. Designers
            reference them while building their own. This tool gives you the
            original HD image straight from YouTube's servers — no screenshot
            blur, no quality loss, just the full 1280×720 file the creator
            uploaded.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Tips for great YouTube thumbnails
          </motion.h3>
          <motion.ul variants={fadeUp} className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
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
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{t}</span>
              </li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Reviews */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            What users say
          </motion.h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                className="rounded-2xl border border-gray-200/70 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`h-3.5 w-3.5 ${s < r.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-700"}`}
                    />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  &ldquo;{r.body}&rdquo;
                </blockquote>
                <footer className="mt-3 border-t border-gray-100 pt-3 dark:border-white/10">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{r.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{r.role}</p>
                </footer>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            Frequently asked questions
          </motion.h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </motion.section>

        {/* Related searches */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <motion.h2 variants={fadeUp} className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Related searches
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-3 text-sm text-gray-600 dark:text-gray-400">
            People also search for these YouTube thumbnail topics:
          </motion.p>
          <motion.ul variants={fadeUp} className="flex flex-wrap gap-2">
            {relatedSearches.map((kw) => (
              <li
                key={kw}
                className="rounded-full border border-gray-200/70 bg-white/60 px-3 py-1 text-xs text-gray-500 backdrop-blur transition-colors hover:bg-gray-100 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.06]"
              >
                {kw}
              </li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Related tools */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            More free creator tools
          </motion.h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-red-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-red-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/15 to-rose-500/15 text-red-600 ring-1 ring-red-500/20 dark:text-red-300">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tool.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA footer */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-red-200/50 bg-gradient-to-br from-red-600 via-rose-600 to-orange-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">Need more handy tools?</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-red-50/90">
            Explore the full collection of free, fast, and privacy-friendly utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-red-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        <p className="mt-10 rounded-xl border border-gray-200/70 bg-white/50 px-4 py-3 text-xs text-gray-500 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400">
          YouTube thumbnails are copyrighted by their respective creators.
          Download for personal use, research, or inspiration only. Do not
          republish or use others&apos; thumbnails commercially without
          permission.
        </p>
      </div>
    </main>
  );
}
