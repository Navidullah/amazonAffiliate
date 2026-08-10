"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Eraser,
  FileArchive,
  FileDown,
  FileText,
  Gauge,
  ImageDown,
  LayoutGrid,
  Lock,
  Mail,
  MousePointerClick,
  ShieldOff,
  Smartphone,
  Sparkles,
  UploadCloud,
  Zap,
} from "lucide-react";
import PdfCompressorTool from "./PdfCompressorTool";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const ICONS = {
  Gauge,
  Zap,
  Lock,
  Mail,
  UploadCloud,
  Smartphone,
  FileArchive,
  ImageDown,
  Eraser,
  ShieldOff,
  LayoutGrid,
  FileText,
  FileDown,
  MousePointerClick,
};

// ---------------------------------------------------------------------------
// Content per variant (differentiated to avoid keyword cannibalization)
// ---------------------------------------------------------------------------
const CONTENT = {
  compressor: {
    badge: "Free Online Tool",
    h1: { pre: "Free", highlight: "PDF Compressor", post: "" },
    subtitle:
      "Reduce PDF file size online without losing readable quality. A fast, private, browser-based compressor for documents, scans, and reports â€” no signup.",
    features: [
      {
        icon: "Gauge",
        title: "Strong Compression",
        desc: "Shrink large PDFs significantly while keeping text crisp and graphics readable.",
        accent: "from-indigo-500 to-blue-500",
      },
      {
        icon: "Zap",
        title: "Fast & Free",
        desc: "Optimize and download in seconds â€” completely free, with no account required.",
        accent: "from-cyan-500 to-teal-500",
      },
      {
        icon: "Lock",
        title: "Private Processing",
        desc: "Files are processed securely and are not stored permanently on our servers.",
        accent: "from-fuchsia-500 to-pink-500",
      },
    ],
    seo: {
      heading: "Reduce PDF file size online â€” free and secure",
      blocks: [
        {
          text: "A large PDF can be hard to email, slow to upload, and awkward to share. This free online PDF compressor reduces your file size in seconds so it is easier to send and store, while keeping the document clear and readable. Everything runs in your browser â€” no software to install and no registration.",
        },
        {
          h3: "How PDF compression works",
          text: "Our compressor optimizes the internal structure of your PDF and re-encodes heavy elements like images, removing redundant data and metadata. The result is a smaller file that still opens perfectly in any PDF reader. For scanned or image-heavy PDFs you will usually see the biggest savings.",
        },
        {
          h3: "Compress a PDF for email attachments",
          text: "Most email services cap attachments at around 25 MB. If your PDF is too big to send, compress it here first and then attach the smaller version â€” no cloud links or splitting required.",
        },
        {
          h3: "Compress a PDF for uploads and forms",
          text: "Job portals, visa applications, and government websites often limit PDF uploads to a few megabytes. Reduce your file size to meet those limits while keeping the text clear and legible.",
        },
        {
          h3: "Why some PDFs barely shrink",
          text: 'Not every file compresses the same amount â€” a scanned, image-heavy PDF can drop by 50-90%, while a clean text-only export from Word has little left to remove. See our full guide on <crosslink href="/blog/how-to-compress-a-pdf-without-losing-quality">how to compress a PDF without losing quality</crosslink> for a breakdown by file type.',
        },
        {
          h3: "Need to edit the file instead?",
          text: 'If you also need to change the content, try our <crosslink href="/tools/convert-your-pdf-file-to-word">PDF to Word converter</crosslink> to get an editable DOCX.',
        },
      ],
    },
    faqs: [
      {
        q: "Is this PDF compressor free?",
        a: "Yes, it is completely free with no signup, no watermarks, and no daily limits.",
      },
      {
        q: "How can I compress a PDF to send it by email?",
        a: "Compress the file here to get it under your email provider's attachment limit (usually 25 MB), then attach the smaller version as normal.",
      },
      {
        q: "Will my PDF quality stay readable after compression?",
        a: "Yes. The tool is tuned to balance a smaller file size with clear, readable text and graphics. Image-heavy PDFs compress the most.",
      },
      {
        q: "What is the maximum file size I can compress?",
        a: "You can compress PDF files up to 50 MB. For very large files, consider splitting the PDF first.",
      },
      {
        q: "Are my files safe and private?",
        a: "Yes. Files are transferred over a secure connection and are not permanently stored â€” they are processed and then removed.",
      },
      {
        q: "Can I compress a PDF on my phone?",
        a: "Yes. The compressor is fully mobile-friendly and works in any browser on Android and iPhone without installing an app.",
      },
      {
        q: "Why is my compressed file barely smaller?",
        a: "Some PDFs are already optimized, so there is little left to remove. The biggest savings come from PDFs with large or uncompressed images.",
      },
    ],
    cta: {
      title: "Need to edit your PDF too?",
      desc: "Convert it to an editable Word document, or explore all our free tools.",
      href: "/tools/convert-your-pdf-file-to-word",
      label: "Try PDF to Word",
    },
  },

  compress: {
    badge: "Free Online Tool",
    h1: { pre: "", highlight: "Compress PDF", post: "Online" },
    subtitle:
      "Shrink PDF files so they fit email attachment limits, upload forms, and messaging apps. Free, fast, and secure â€” reduce PDF size in seconds with no signup.",
    features: [
      {
        icon: "Mail",
        title: "Fits Email Limits",
        desc: "Get under Gmail and Outlook attachment limits so your PDF actually sends.",
        accent: "from-indigo-500 to-blue-500",
      },
      {
        icon: "UploadCloud",
        title: "Beats Upload Caps",
        desc: "Meet size limits on job portals, government forms, and web uploads.",
        accent: "from-cyan-500 to-teal-500",
      },
      {
        icon: "Smartphone",
        title: "Easy to Share",
        desc: "Smaller files send faster over WhatsApp and slow mobile connections.",
        accent: "from-fuchsia-500 to-pink-500",
      },
    ],
    seo: {
      heading: "Compress PDF for email, uploads, and sharing",
      blocks: [
        {
          text: "Need to compress a PDF because it is too big to email or upload? This free tool reduces your PDF file size in seconds, right in your browser. Whether you are attaching a resume, submitting a form, or sharing a report, a smaller PDF sends faster and slips under strict size limits â€” with no signup and no quality headaches.",
        },
        {
          h3: "Compress a PDF for email attachments",
          text: "Most email services cap attachments at around 25 MB. If your PDF is larger, compress it here first and then attach the smaller version â€” no need for cloud links or splitting the document.",
        },
        {
          h3: "Compress a PDF for uploads and forms",
          text: "Job portals, visa applications, and government websites often limit PDF uploads to a few megabytes. Reduce your file size to meet those limits while keeping the text clear and legible.",
        },
        {
          h3: "Looking for more PDF tools?",
          text: 'For advanced options and bigger savings, use our main <crosslink href="/tools/compress-your-pdf-file">PDF compressor</crosslink>. Need to edit the file instead? Try the <crosslink href="/tools/convert-your-pdf-file-to-word">PDF to Word converter</crosslink>.',
        },
      ],
    },
    faqs: [
      {
        q: "How do I compress a PDF for free?",
        a: "Upload your PDF above, click Compress PDF, and download the smaller file. It is completely free with no signup.",
      },
      {
        q: "How can I compress a PDF to send it by email?",
        a: "Compress the file here to get it under your email provider's attachment limit (usually 25 MB), then attach the smaller version as normal.",
      },
      {
        q: "Will compressing reduce the quality of my PDF?",
        a: "The tool keeps text and most graphics clearly readable while reducing size. Image-heavy PDFs compress the most; text-only PDFs change the least.",
      },
      {
        q: "What file size can I compress?",
        a: "You can compress PDFs up to 50 MB. For larger documents, split the PDF into parts and compress each one.",
      },
      {
        q: "Can I compress a PDF on my phone?",
        a: "Yes. The tool works in any mobile browser on Android and iPhone â€” no app needed.",
      },
      {
        q: "Are my uploaded files private?",
        a: "Yes. Files are processed securely over an encrypted connection and are not stored permanently.",
      },
    ],
    cta: {
      title: "Need advanced compression?",
      desc: "Use our main PDF compressor, or browse all the free tools.",
      href: "/tools/compress-your-pdf-file",
      label: "Open PDF Compressor",
    },
  },
};

const STEPS = [
  {
    icon: "UploadCloud",
    title: "Upload your PDF",
    desc: "Drag and drop or browse to select any PDF from your device.",
  },
  {
    icon: "MousePointerClick",
    title: "Click compress",
    desc: "The tool optimizes your file and shows the size reduction in real time.",
  },
  {
    icon: "FileDown",
    title: "Download",
    desc: "Your smaller PDF downloads instantly, ready to send or upload.",
  },
];

const RELATED = [
  {
    icon: "FileText",
    label: "Convert PDF to Word",
    href: "/tools/convert-your-pdf-file-to-word",
  },
  {
    icon: "ImageDown",
    label: "Compress an image",
    href: "/tools/image-compressor",
  },
  {
    icon: "Eraser",
    label: "Remove image background",
    href: "/tools/background-remover-image",
  },
  {
    icon: "ShieldOff",
    label: "Remove image metadata (EXIF)",
    href: "/tools/exif-remover",
  },
  { icon: "LayoutGrid", label: "Browse all free tools", href: "/tools" },
];

// Render text that may contain a <crosslink href="...">label</crosslink> token.
function RichText({ text }) {
  const parts = [];
  const regex = /<crosslink href="([^"]+)">([^<]+)<\/crosslink>/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <Link
        key={`l-${key++}`}
        href={match[1]}
        className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
      >
        {match[2]}
      </Link>,
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}

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
      {/* Answer stays mounted so the text is always indexable by Google. */}
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

export default function PdfCompressExperience({ variant = "compressor" }) {
  const c = CONTENT[variant] ?? CONTENT.compressor;
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
            {c.badge}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            {c.h1.pre && <>{c.h1.pre} </>}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-blue-300 dark:to-cyan-200">
              {c.h1.highlight}
            </span>
            {c.h1.post && <> {c.h1.post}</>}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            {c.subtitle}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No
              signup
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
              Secure processing
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Up to
              50 MB
            </span>
          </motion.div>
        </motion.header>

        {/* Tool */}
        <section className="mb-20">
          <PdfCompressorTool />
        </section>

        {/* Features */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 grid gap-6 sm:grid-cols-3"
        >
          {c.features.map((item) => {
            const Icon = ICONS[item.icon];
            return (
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
                  {Icon && <Icon className="h-6 w-6" />}
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.article>
            );
          })}
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
            How to compress a PDF online
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent dark:via-indigo-500/30 sm:block" />
            {STEPS.map((step, i) => {
              const Icon = ICONS[step.icon];
              return (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30">
                    {Icon && <Icon className="h-7 w-7" />}
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
              );
            })}
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
            {c.seo.heading}
          </motion.h2>
          {c.seo.blocks.map((block, i) => (
            <div key={i}>
              {block.h3 && (
                <motion.h3
                  variants={fadeUp}
                  className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
                >
                  {block.h3}
                </motion.h3>
              )}
              <motion.p
                variants={fadeUp}
                className={`${block.h3 ? "mt-2" : "mt-4"} text-sm leading-relaxed text-gray-600 dark:text-gray-300`}
              >
                <RichText text={block.text} />
              </motion.p>
            </div>
          ))}
        </motion.section>

        {/* FAQ */}
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
            Frequently asked questions
          </motion.h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {c.faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
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
            Related free tools
          </motion.h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RELATED.map((tool) => {
              const Icon = ICONS[tool.icon];
              return (
                <motion.div key={tool.href} variants={fadeUp}>
                  <Link
                    href={tool.href}
                    className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-indigo-400/50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 text-indigo-600 ring-1 ring-indigo-500/20 dark:text-indigo-300">
                      {Icon && <Icon className="h-5 w-5" />}
                    </span>
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {tool.label}
                    </span>
                    <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-indigo-200/50 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">{c.cta.title}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-indigo-50/90">
            {c.cta.desc}
          </p>
          <Link
            href={c.cta.href}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition-transform hover:scale-105"
          >
            {c.cta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
