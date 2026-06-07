"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  FileDown,
  Gauge,
  Lock,
  MousePointerClick,
  Sparkles,
  UploadCloud,
  Zap,
} from "lucide-react";
import PdfToWordConverter from "./PdfToWordConverter";

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
    icon: Gauge,
    title: "Reliable Conversion",
    desc: "Clean, editable text with dependable formatting retention using multi-provider conversion.",
    accent: "from-indigo-500 to-blue-500",
  },
  {
    icon: Zap,
    title: "Efficient Processing",
    desc: "Quick turnaround that lets you convert and download DOCX files in moments.",
    accent: "from-cyan-500 to-teal-500",
  },
  {
    icon: Lock,
    title: "Privacy First",
    desc: "A secure processing flow that keeps your files protected during conversion.",
    accent: "from-fuchsia-500 to-pink-500",
  },
];

const steps = [
  {
    icon: UploadCloud,
    title: "Upload your PDF",
    desc: "Drag and drop or browse to select any PDF from your device.",
  },
  {
    icon: MousePointerClick,
    title: "Click convert",
    desc: "Start the conversion and watch real-time progress as it processes.",
  },
  {
    icon: FileDown,
    title: "Download DOCX",
    desc: "Get your editable Word document instantly, ready to use.",
  },
];

const faqs = [
  {
    q: "Is this PDF to Word converter free?",
    a: "Yes, it is completely free to use and does not require any sign up. Convert as many PDF files to Word as you need.",
  },
  {
    q: "Can I convert a scanned PDF to Word?",
    a: "Yes. The converter applies OCR (optical character recognition) to scanned and image-based PDFs so the text becomes editable in the Word file. Results depend on the quality of the scan.",
  },
  {
    q: "Will my PDF formatting stay accurate after conversion?",
    a: "The engine preserves layout, fonts, tables, and text styles as closely as possible, so your DOCX looks like the original PDF.",
  },
  {
    q: "Can I convert PDF to Word on my phone?",
    a: "Yes. The tool is fully mobile-friendly and works in any browser on Android and iPhone — no app installation required.",
  },
  {
    q: "What is the difference between DOC and DOCX?",
    a: "DOCX is the modern Word format used since Word 2007 and works in Word, Google Docs, and LibreOffice. This tool outputs DOCX, which opens in all current word processors.",
  },
  {
    q: "What if the primary conversion API is unavailable?",
    a: "The converter includes provider fallback support, so conversion can continue through a secondary engine when the primary service is down.",
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
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PdfToWordExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/60 via-white to-cyan-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-[120px] dark:bg-indigo-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-cyan-400/20 blur-[120px] dark:bg-cyan-600/10" />

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
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur dark:border-indigo-500/20 dark:bg-white/[0.04] dark:text-indigo-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Free Online PDF Tool
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Convert{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-blue-300 dark:to-cyan-200">
              PDF to Word
            </span>{" "}
            in seconds
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Turn any PDF into a fully editable Word document with reliable
            formatting and fast performance. Built for professionals who need
            clean, accurate DOCX output.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No sign up
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Secure processing
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Up to 25 MB
            </span>
          </motion.div>
        </motion.header>

        {/* Converter */}
        <section className="mb-20">
          <PdfToWordConverter />
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
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(56,89,255,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
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
            How to convert PDF to Word
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent dark:via-indigo-500/30 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30">
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
            Free PDF to Word converter — online, accurate, no signup
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Need to edit a PDF? The fastest way is to convert your PDF to an
            editable Word document. This free online{" "}
            <strong>PDF to Word converter</strong> turns any PDF into a clean,
            editable <strong>DOCX</strong> file in seconds — no software to
            install, no account to create, and no watermarks. It works directly
            in your browser on Windows, macOS, Android, and iPhone, so you can
            convert PDF to Word on your phone or laptop anywhere.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Convert scanned PDFs to Word with OCR
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Got a scanned document or an image-based PDF? Our converter applies{" "}
            <strong>OCR (optical character recognition)</strong> to recognise the
            text inside scans and pictures, so the words become fully editable in
            Word instead of locked-in images. Learn more in our guide on{" "}
            <Link
              href="/blog/how-to-convert-a-scanned-pdf-to-word-with-ocr"
              className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
            >
              converting a scanned PDF to Word with OCR
            </Link>
            .
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Keep your formatting intact
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Layout matters. The conversion engine preserves fonts, headings,
            tables, lists, and spacing so your Word file looks like the original
            PDF and needs minimal cleanup. For best results, read our tips on{" "}
            <Link
              href="/blog/how-to-convert-pdf-to-word-without-losing-formatting"
              className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
            >
              converting PDF to Word without losing formatting
            </Link>
            .
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Convert PDF to Word on mobile
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Most people convert documents on their phones. This tool is built
            mobile-first with a touch-friendly upload area, so converting a PDF
            to Word on Android or iPhone takes just a few taps. See the full
            walkthrough on{" "}
            <Link
              href="/blog/how-to-convert-pdf-to-word-on-mobile-for-free"
              className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
            >
              how to convert PDF to Word on mobile for free
            </Link>
            .
          </motion.p>
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

        {/* CTA footer */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-indigo-200/50 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Need more handy tools?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-indigo-50/90">
            Explore the full collection of free, fast, and privacy-friendly
            utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
