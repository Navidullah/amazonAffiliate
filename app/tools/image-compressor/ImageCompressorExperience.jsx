"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Eraser,
  FileArchive,
  Gauge,
  Lock,
  Sparkles,
  SlidersHorizontal,
  UploadCloud,
  Zap,
} from "lucide-react";
import ImageCompressorClient from "@/app/components/tools/ImageCompressorClient";
import ImageCompressionGuide from "@/app/components/tools/ImageCompressionGuide";

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
    icon: Lock,
    title: "100% private",
    desc: "Compression runs entirely in your browser — your images are never uploaded to a server.",
    accent: "from-amber-500 to-orange-500",
  },
  {
    icon: Zap,
    title: "Instant & free",
    desc: "No signup, no watermark, no limits. Shrink images in seconds, as many as you like.",
    accent: "from-orange-500 to-red-500",
  },
  {
    icon: Gauge,
    title: "Better Core Web Vitals",
    desc: "Smaller images mean faster pages, lower bounce rates, and a healthier SEO score.",
    accent: "from-amber-500 to-yellow-500",
  },
];

const steps = [
  {
    icon: UploadCloud,
    title: "Upload your image",
    desc: "Drag and drop or select a JPG, PNG, or WebP file. It loads instantly and stays in your browser.",
  },
  {
    icon: SlidersHorizontal,
    title: "Set quality and format",
    desc: "Adjust the compression slider and choose JPEG, PNG, or WebP output to balance size and quality.",
  },
  {
    icon: Download,
    title: "Compress and download",
    desc: "Click compress to shrink the file, compare before and after, then download your smaller image.",
  },
];

const relatedTools = [
  {
    icon: Eraser,
    label: "Remove image background",
    href: "/tools/background-remover-image",
  },
  {
    icon: FileArchive,
    label: "Compress a PDF file",
    href: "/tools/compress-your-pdf-file",
  },
];

const keywords = [
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

const faqs = [
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
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      {/* Answer stays mounted (height-animated) so the text is always in the
          DOM and indexable by Google, even when visually collapsed. */}
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

export default function ImageCompressorExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-amber-50/60 via-white to-orange-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-amber-400/20 blur-[120px] dark:bg-amber-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-orange-400/20 blur-[120px] dark:bg-orange-600/10" />

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
            className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-amber-700 shadow-sm backdrop-blur dark:border-amber-500/20 dark:bg-white/[0.04] dark:text-amber-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Free · No signup · Private in your browser
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Compress Image Online{" "}
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-500 bg-clip-text text-transparent dark:from-amber-300 dark:via-orange-300 dark:to-yellow-200">
              Without Losing Quality
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Reduce the file size of JPG, PNG, and WebP images in seconds.
            Shrink photos for faster pages, smaller email attachments, and
            better Core Web Vitals — all for free, right in your browser.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No
              sign up
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
              Runs in your browser
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No
              watermark
            </span>
          </motion.div>
        </motion.header>

        {/* Tool */}
        <section className="mb-20">
          <ImageCompressorClient />
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
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(255,149,0,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
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
            How it works
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent dark:via-amber-500/30 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30">
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

        {/* SEO content / in-depth guide */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 rounded-3xl border border-gray-200/70 bg-white/70 p-7 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] sm:p-10"
        >
          <ImageCompressionGuide />
        </motion.section>

        {/* Related searches */}
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
            People also search for
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-2"
          >
            {keywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-gray-200/70 bg-white/70 px-3 py-1.5 text-xs text-gray-600 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400"
              >
                {kw}
              </span>
            ))}
          </motion.div>
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

        {/* Related tools (internal links) */}
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
            Related free tools
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            More handy document and image utilities — all free, no signup.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-amber-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 text-amber-600 ring-1 ring-amber-500/20 dark:text-amber-300">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tool.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-500" />
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
          className="relative overflow-hidden rounded-3xl border border-amber-200/50 bg-gradient-to-br from-amber-600 via-orange-600 to-yellow-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Need more handy tools?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-amber-50/90">
            Explore the full collection of free, fast, and privacy-friendly
            utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-amber-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
