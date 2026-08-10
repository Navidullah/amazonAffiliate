"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  ChevronDown,
  Download,
  Eraser,
  Eye,
  FileImage,
  Layers,
  MapPinOff,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import ExifRemoverClient from "./ExifRemoverClient";

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
    icon: ShieldCheck,
    title: "On-Device Privacy",
    desc: "Clean photos entirely in your browser — files never touch a server when you use the on-device mode.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: Eye,
    title: "See Before You Strip",
    desc: "Inspect every piece of hidden metadata — GPS, camera model, timestamps — before you remove it.",
    accent: "from-teal-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Fast & Verified",
    desc: "One click cleans your photo, then the tool re-scans it so you can confirm the metadata is gone.",
    accent: "from-cyan-500 to-emerald-500",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload & inspect",
    desc: "Drop in a JPEG, PNG, WebP, or AVIF and instantly see every piece of hidden metadata it carries.",
  },
  {
    icon: Eraser,
    title: "Remove the metadata",
    desc: "Clean it on your device for total privacy, or via server for very large files — one click either way.",
  },
  {
    icon: Download,
    title: "Verify & download",
    desc: "The tool re-scans the cleaned file to prove the EXIF is gone, then you download the safe copy.",
  },
];

const USE_CASES = [
  {
    icon: ShoppingBag,
    title: "Marketplace listings",
    text: "Selling on Facebook Marketplace, Craigslist, or eBay? Strip the GPS tag so buyers can't see where you live from your product photos.",
  },
  {
    icon: MessageCircle,
    title: "Files sent as documents",
    text: "WhatsApp documents, Telegram files, and email attachments keep full EXIF. Clean photos first so location data never travels with them.",
  },
  {
    icon: MapPinOff,
    title: "Protect your home location",
    text: "Photos taken at home embed coordinates accurate to a few meters. Remove the geotag before posting anywhere public.",
  },
  {
    icon: Camera,
    title: "Professional photos",
    text: "Share client work without leaking shoot locations, gear lists, or editing timestamps embedded by your camera and software.",
  },
];

const relatedTools = [
  {
    icon: FileImage,
    label: "Compress an image",
    href: "/tools/image-compressor",
  },
  {
    icon: Layers,
    label: "Remove image background",
    href: "/tools/background-remover-image",
  },
];

const faqs = [
  {
    q: "What is EXIF data and why should I remove it?",
    a: "EXIF (Exchangeable Image File Format) is hidden metadata your camera or phone embeds in every photo: GPS coordinates of where it was taken, the exact date and time, your device model, and camera settings. Anyone who downloads your photo can read this data, which can reveal your home address or daily routine — so it is worth stripping before you share images publicly.",
  },
  {
    q: "Does this tool upload my photos?",
    a: 'Not if you choose the on-device option. "Remove on device" processes the photo entirely in your browser — it never leaves your computer or phone. The optional "Remove via server" mode uploads over a secure HTTPS connection and is better for very large files; the image is processed and not stored permanently.',
  },
  {
    q: "How do I remove the GPS location from a photo?",
    a: 'Upload the photo above and click Remove on device. GPS coordinates are part of the EXIF block, so they are deleted along with the rest of the metadata. You can expand "Show detected EXIF" first to see exactly which location data the photo contains.',
  },
  {
    q: "Can I see what metadata my photo contains before removing it?",
    a: "Yes. As soon as you upload an image, the built-in EXIF viewer lists everything it detects — GPS, timestamps, camera make and model, lens, exposure settings, and more. After cleaning, the tool re-checks the file so you can verify the metadata is gone.",
  },
  {
    q: "Does removing EXIF data reduce image quality?",
    a: "Your photo stays visually identical. Only the hidden metadata block is affected — the picture itself is preserved. The on-device mode re-encodes at very high quality, and the server mode uses the Sharp image engine to keep your pixels intact.",
  },
  {
    q: "What image formats are supported?",
    a: "You can clean JPEG, PNG, WebP, and AVIF files. JPEG photos from phones and cameras carry the most metadata, but screenshots and exported PNGs can contain hidden data too.",
  },
  {
    q: "Don't Instagram and WhatsApp remove EXIF data automatically?",
    a: "Major social networks like Instagram, Facebook, and X strip most metadata on upload, but you should not rely on it everywhere: files sent as documents or attachments — for example via WhatsApp's document option, Telegram file sharing, email, or cloud links — often keep full EXIF including GPS. The safest habit is stripping metadata before the photo leaves your device.",
  },
  {
    q: "Is this EXIF remover free?",
    a: "Yes — completely free with no signup, no watermark, and no limits on the on-device mode. Upload, inspect, clean, and download as many photos as you like.",
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
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300"
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

export default function ExifRemoverExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/60 via-white to-cyan-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[120px] dark:bg-emerald-600/20" />
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
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-500/20 dark:bg-white/[0.04] dark:text-emerald-300"
          >
            <BadgeCheck className="h-3.5 w-3.5" />
            Free • No signup • On-device privacy
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Free{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent dark:from-emerald-300 dark:via-teal-300 dark:to-cyan-200">
              EXIF Remover
            </span>{" "}
            — View & Remove Photo Metadata
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Remove EXIF data from photos online before you share them. Upload
            an image to see every piece of hidden metadata — GPS location,
            camera model, timestamps — then strip it all in one click, right
            in your browser with no upload required.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />{" "}
              On-device — no upload needed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-emerald-500" /> See metadata
              before you strip it
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-emerald-500" /> JPEG, PNG,
              WebP & AVIF
            </span>
          </motion.div>
        </motion.header>

        {/* Tool */}
        <section className="mb-20 rounded-3xl border border-gray-200/70 bg-white/70 pb-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]">
          <ExifRemoverClient />
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
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(16,185,129,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
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
            How to remove EXIF data in 3 steps
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent dark:via-emerald-500/30 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/30">
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

        {/* Use cases */}
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
            When should you strip photo metadata?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Any time a photo leaves your device, its hidden data goes with it.
            These are the moments it matters most:
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {USE_CASES.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group flex gap-4 rounded-3xl border border-gray-200/70 bg-white/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="h-fit rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 p-2.5">
                  <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {item.text}
                  </p>
                </div>
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
            What is hidden inside your photos?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Every photo from a phone or camera carries an invisible{" "}
            <strong>EXIF metadata</strong> block. It typically includes the
            GPS coordinates of where the photo was taken (often accurate to a
            few meters), the exact date and time, your device make and model,
            lens and exposure settings, and sometimes even the editing
            software you used. None of it is visible in the picture — but
            anyone who downloads the file can read it with free tools in
            seconds. This <strong>EXIF remover</strong> lets you see exactly
            what your photo is carrying, then <strong>strip the metadata</strong>{" "}
            before you share it.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Which apps remove EXIF data for you — and which don't
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Big social networks strip most metadata on upload, so a photo
            posted to your feed usually loses its GPS tag. The danger is
            everywhere else: <strong>files sent as documents keep their full
            EXIF data</strong>, including location — WhatsApp's document
            option, Telegram file sharing, email attachments, and cloud links
            all keep the original file as-is.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            On-device vs. server cleaning
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <strong>Remove on device (recommended):</strong> the photo is
            cleaned entirely in your browser using a canvas re-encode. It
            never touches a server, making it the most private option — ideal
            for sensitive images. <strong>Remove via server:</strong> for very
            large files or less common formats, the server mode uses the
            Sharp image engine to strip metadata while preserving your
            original pixels. Files are sent over HTTPS and are not stored
            permanently. Either way, the tool re-scans the cleaned file and
            shows you the result, so you can verify the metadata is actually
            gone instead of taking it on faith.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Three quick privacy wins after cleaning
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <strong>Turn off geotagging at the source</strong> — in your phone
            camera settings, disable location access so future photos never
            embed GPS in the first place. <strong>Compress before
            posting</strong> — a cleaned photo can still be heavy, so run it
            through our{" "}
            <Link
              href="/tools/image-compressor"
              className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
            >
              Image Compressor
            </Link>{" "}
            for faster uploads. For the full picture — including why GPS data
            in a photo is a real privacy risk and which apps you can't rely
            on to strip it for you — see our guide on{" "}
            <Link
              href="/blog/how-to-remove-exif-data-and-gps-location-from-a-photo"
              className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
            >
              removing EXIF data and GPS location from a photo
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
            More free image tools
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Clean it, compress it, cut it out — the full Shopyor image
            toolbox, all free, no signup.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-300">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tool.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-500" />
                </Link>
              </motion.div>
            ))}
            <motion.div variants={fadeUp}>
              <Link
                href="/tools"
                className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-400/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-cyan-500/15 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-300">
                  <Sparkles className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Browse all free tools
                </span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-500" />
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA footer */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-emerald-200/50 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Need more handy tools?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-emerald-50/90">
            Explore the full collection of free, fast, and privacy-friendly
            utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
