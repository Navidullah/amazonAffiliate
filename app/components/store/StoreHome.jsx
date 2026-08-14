"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download,
  ClipboardCheck,
  LayoutGrid,
  FileCheck2,
  Ban,
} from "lucide-react";
import { HOMEPAGE_FAQ } from "@/lib/constants/homepageFaq";
import ProductCard from "./ProductCard";
import FaqAccordion from "./FaqAccordion";

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
    icon: ClipboardCheck,
    title: "Matches the real SATs format",
    desc: "Timing, mark allocation, and question style formatted like the real KS2 assessment.",
    accent: "from-indigo-500 to-blue-500",
  },
  {
    icon: ShieldCheck,
    title: "Pay once, download once",
    desc: "No subscriptions, no accounts. One clean payment per worksheet pack.",
    accent: "from-fuchsia-500 to-violet-500",
  },
  {
    icon: Download,
    title: "Instant delivery",
    desc: "Your PDF unlocks the moment payment is confirmed — no waiting.",
    accent: "from-cyan-500 to-teal-500",
  },
];

const trustStats = [
  { icon: FileCheck2, label: "SATs-style packs" },
  { icon: Download, label: "Instant PDF download" },
  { icon: ClipboardCheck, label: "Full mark scheme included" },
  { icon: Ban, label: "No subscription, ever" },
];

export default function StoreHome({ products = [] }) {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-24 pt-6 sm:px-6 md:pt-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-[120px] dark:bg-indigo-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-fuchsia-400/20 blur-[120px] dark:bg-fuchsia-600/10" />

      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <motion.header
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-16 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur dark:border-indigo-500/20 dark:bg-white/[0.04] dark:text-indigo-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Year 6 Maths &amp; KS2 SATs resources
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Year 6 Maths Worksheets &amp; KS2 SATs Papers.{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-fuchsia-200">
              Pay once, download instantly.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Printable PDF worksheets and practice papers for KS2 Year 6
            Maths, formatted like the real SATs assessment with full mark
            schemes included. No sign-up, no subscription — pick a pack and
            download.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No sign up
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Full mark scheme included
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Instant PDF download
            </span>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-gray-200/70 bg-white/60 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
          >
            {trustStats.map((stat) => (
              <span
                key={stat.label}
                className="inline-flex items-center gap-2 px-2 text-xs font-semibold text-gray-600 dark:text-gray-300 sm:text-sm"
              >
                <stat.icon className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
                {products.length && stat.label === "SATs-style packs"
                  ? `${products.length} ${stat.label}`
                  : stat.label}
              </span>
            ))}
          </motion.div>
        </motion.header>

        {/* Product grid */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-20 grid gap-6 sm:grid-cols-2"
          aria-label="Worksheet packs"
        >
          {products.map((p) => (
            <motion.div key={p.slug} variants={fadeUp}>
              <ProductCard product={p} />
            </motion.div>
          ))}

          {/* Browse-all card keeps the grid from looking sparse early on */}
          <motion.div variants={fadeUp}>
            <Link
              href="/products"
              className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300/70 p-6 text-center transition hover:border-indigo-400 dark:border-white/10"
            >
              <LayoutGrid className="h-8 w-8 text-gray-400 dark:text-gray-500" />
              <p className="mt-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
                Browse all worksheets
              </p>
            </Link>
          </motion.div>
        </motion.section>

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

        {/* SEO content — real body copy for the primary keyword intent */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 rounded-3xl border border-gray-200/70 bg-white/70 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] sm:p-10"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Printable Year 6 Maths worksheets, built like the real SATs
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
            <p>
              Year 6 is the final year of Key Stage 2, and the run-up to the
              KS2 SATs is when Maths practice matters most. Shopyor's
              worksheet packs are printable PDFs written to match the real
              SATs format — the same timing, mark allocation, and question
              style pupils will see in the actual Arithmetic and Reasoning
              papers — so every practice session feels like the real thing,
              not a generic worksheet.
            </p>
            <p>
              Each pack includes a full mark scheme, so parents, tutors, and
              teachers can mark it without needing a teaching background.
              Whether you need a complete two-paper revision pack or a
              focused topic pack on fractions, decimals, percentages, ratio,
              proportion, or algebra, every pack downloads as a single PDF —
              ready to print at home, in a tutoring session, or for a single
              classroom.
            </p>
            <p>
              Unlike subscription-based worksheet libraries, Shopyor is
              pay-per-pack: no account, no recurring charge, and no email
              sign-up. Pick a pack, pay once, and your download unlocks
              instantly.
            </p>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
          <div className="mt-6">
            <FaqAccordion items={HOMEPAGE_FAQ} />
          </div>
        </motion.section>

        {/* CTA footer — points to the tools hub, which is still fully live */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-indigo-200/50 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Also looking for a free tool?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-indigo-50/90">
            Shopyor still runs 17+ free, browser-based tools for video, PDF,
            image, AI, and SEO — no purchase needed.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse free tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
