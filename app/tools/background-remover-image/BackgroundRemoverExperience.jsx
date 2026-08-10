"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Download,
  FileArchive,
  FileText,
  ImageDown,
  LayoutGrid,
  Lock,
  ShieldOff,
  Sparkles,
  UploadCloud,
  Wand2,
  Zap,
} from "lucide-react";
import BgRemoveClient from "@/app/components/tools/BgRemoveClient";
import BgRemoveHero from "@/app/components/tools/BgRemoveHero";

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
    icon: Wand2,
    title: "AI-Powered Cut-Outs",
    desc: "The AI automatically detects the subject and erases the background in seconds — no manual masking needed.",
    accent: "from-cyan-500 to-teal-500",
  },
  {
    icon: Lock,
    title: "Runs in Your Browser",
    desc: "Processing happens entirely on your device, so your photos are never uploaded to a server.",
    accent: "from-teal-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Instant Transparent PNG",
    desc: "Export a clean transparent PNG, WebP, or JPEG — ready for logos, ecommerce, and design in one click.",
    accent: "from-sky-500 to-cyan-500",
  },
];

const steps = [
  {
    icon: UploadCloud,
    title: "Upload your image",
    desc: "Drop in or select a JPG, PNG, or WEBP photo of the person, product, or logo you want to cut out.",
  },
  {
    icon: Wand2,
    title: "AI removes the background",
    desc: "The AI automatically detects the subject and erases the background in seconds, right in your browser.",
  },
  {
    icon: Download,
    title: "Download your cut-out",
    desc: "Save a transparent PNG for logos, ecommerce, and design — or export as JPG or WEBP.",
  },
];

const relatedTools = [
  {
    icon: FileText,
    label: "Convert a PDF to Word",
    href: "/tools/convert-your-pdf-file-to-word",
  },
  {
    icon: FileArchive,
    label: "Compress a PDF file",
    href: "/tools/compress-your-pdf-file",
  },
  {
    icon: ImageDown,
    label: "Compress an image",
    href: "/tools/image-compressor",
  },
  {
    icon: ShieldOff,
    label: "Remove image metadata (EXIF)",
    href: "/tools/exif-remover",
  },
  {
    icon: LayoutGrid,
    label: "Browse all free tools",
    href: "/tools",
  },
];

const faqs = [
  {
    q: "How do I remove the background from an image online?",
    a: "Upload a JPG, PNG, or WEBP, and the AI detects the subject and erases the background automatically. Then download your image as a transparent PNG or high-quality JPEG.",
  },
  {
    q: "Is this background remover free?",
    a: "Yes — you can remove backgrounds for free, with no sign-up. The processing runs in your browser, so your images are not uploaded to a server.",
  },
  {
    q: "Does it work for logos, people, and products?",
    a: "Yes. It works well on people, products, and simple logos. Complex hair and fine edges look best with clear, high-resolution uploads.",
  },
  {
    q: "Can I make a transparent PNG?",
    a: "Absolutely — choose PNG on download to keep the transparent background for websites, ecommerce listings, or design apps.",
  },
  {
    q: "How is this different from Photoshop background removal?",
    a: "Photoshop offers manual precision but has a learning curve. This AI tool is fast and automatic — great for quick, clean cut-outs in seconds, free, with no software to install.",
  },
];

const relatedKeywords = [
  "background remove",
  "remove background from image",
  "free background remover",
  "remove background from image free",
  "transparent background maker",
  "adobe background remover",
  "background eraser",
  "photo background remover",
  "remove background photoshop",
  "app to remove background",
  "bg remover",
  "video background remover",
  "app to remove people from background",
  "remove white background from image",
  "photo background",
  "remove background from logo",
  "remove background online",
  "picture background remover",
  "remove white background",
  "remove people from background",
  "cut out background",
  "delete background",
  "background remover png",
  "remove background online free",
  "ai background remover",
  "photo background editor",
  "change picture background",
  "background changer",
  "app to remove background from photo",
  "remove background from image photoshop",
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
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-300"
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

export default function BackgroundRemoverExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-cyan-50/60 via-white to-teal-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px] dark:bg-cyan-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-teal-400/20 blur-[120px] dark:bg-teal-600/10" />

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
            className="inline-flex items-center gap-2 rounded-full border border-cyan-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-cyan-700 shadow-sm backdrop-blur dark:border-cyan-500/20 dark:bg-white/[0.04] dark:text-cyan-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Background Remover · 100% Free
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Remove Image Background{" "}
            <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent dark:from-cyan-300 dark:via-teal-300 dark:to-emerald-200">
              online, free
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Erase the background from any photo in seconds. Cut out people,
            products, and logos with AI, and download a transparent PNG — no
            Photoshop, no sign-up.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No sign up
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Private — runs in your browser
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Transparent PNG
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10">
            <BgRemoveHero />
          </motion.div>
        </motion.header>

        {/* Tool */}
        <section id="tool" className="mb-20 scroll-mt-24">
          <BgRemoveClient />
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
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(20,184,166,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
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
            How to remove a background in 3 steps
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent dark:via-cyan-500/30 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30">
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

        {/* SEO content */}
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
            Erase backgrounds in seconds — free
          </motion.h2>
          <motion.ul
            variants={fadeUp}
            className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>Auto-detects the subject and deletes the background with AI.</li>
            <li>Keep fine edges like hair with clear, high-resolution uploads.</li>
            <li>Export a transparent PNG for logos, ecommerce, and graphics.</li>
            <li>Runs in your browser — your photos never leave your device.</li>
            <li>No design skills needed — faster than manual editing in Photoshop.</li>
          </motion.ul>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Tips for the best results
          </motion.h3>
          <motion.ul
            variants={fadeUp}
            className="mt-2 list-disc space-y-2 pl-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>Use clear, well-lit images with strong subject/background contrast.</li>
            <li>Avoid heavy compression or tiny images; higher resolution helps.</li>
            <li>For tricky edges, try a solid background or re-shoot if possible.</li>
          </motion.ul>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            For a full walkthrough — including how to get a transparent PNG,
            clean up a logo background, and pick the right export format — see
            our guide on{" "}
            <Link
              href="/blog/how-to-remove-background-from-an-image"
              className="font-medium text-cyan-600 underline-offset-2 hover:underline dark:text-cyan-400"
            >
              how to remove the background from an image
            </Link>
            .
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Related searches
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
          >
            People also look for these background-removal topics:
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-3 flex flex-wrap gap-2">
            {relatedKeywords.map((kw) => (
              <li
                key={kw}
                className="rounded-full border border-gray-200/70 bg-white/60 px-3 py-1 text-xs text-gray-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-300"
              >
                {kw}
              </li>
            ))}
          </motion.ul>
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
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-cyan-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-teal-500/15 text-cyan-600 ring-1 ring-cyan-500/20 dark:text-cyan-300">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tool.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-500" />
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
          className="relative overflow-hidden rounded-3xl border border-cyan-200/50 bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Need more handy tools?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-cyan-50/90">
            Explore the full collection of free, fast, and privacy-friendly
            utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-cyan-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
