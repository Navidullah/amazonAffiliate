"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ShieldCheck,
  Gauge,
  Map,
  FileCode2,
  Check,
  Upload,
  Settings2,
  Search,
  Sparkles,
  Globe,
  ChevronDown,
  Tags,
  Youtube,
  LayoutGrid,
} from "lucide-react";
import RobotsGeneratorClient from "./RobotsGeneratorClient";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* --------------------------- STATIC CONTENT --------------------------- */
const features = [
  {
    icon: Bot,
    title: "Block AI Bots in One Click",
    desc: "Stop GPTBot, ChatGPT, ClaudeBot, Google-Extended, CCBot & more from scraping your content for AI training — while keeping Google & Bing fully allowed.",
    accent: "from-blue-500 to-slate-600",
  },
  {
    icon: FileCode2,
    title: "Ready-Made Templates",
    desc: "Battle-tested robots.txt presets for WordPress, Shopify, Blogger and eCommerce sites — no syntax knowledge required.",
    accent: "from-indigo-500 to-blue-600",
  },
  {
    icon: Map,
    title: "Sitemap Integration",
    desc: "Add one or many XML sitemaps so Google and Bing discover every page, post, product and image on your site.",
    accent: "from-slate-500 to-blue-500",
  },
  {
    icon: Gauge,
    title: "Crawl-Budget Control",
    desc: "Disallow filters, faceted navigation and parameter URLs to focus crawlers on the pages that actually rank.",
    accent: "from-blue-600 to-indigo-500",
  },
  {
    icon: ShieldCheck,
    title: "Live SEO Validation",
    desc: "Instant warnings catch mistakes — like accidentally blocking your whole site or hiding CSS and JavaScript from Google.",
    accent: "from-slate-600 to-slate-800",
  },
  {
    icon: Search,
    title: "Google Tester Link",
    desc: "Jump straight to Google's robots.txt testing tool to validate your file before you deploy it.",
    accent: "from-blue-500 to-indigo-600",
  },
];

const steps = [
  {
    icon: Sparkles,
    title: "Pick a template",
    desc: "Click a quick-start template at the top of the tool — WordPress, Shopify, Blogger or Block AI Bots — or leave it blank to build from scratch.",
  },
  {
    icon: Globe,
    title: "Enter your domain",
    desc: "On the Basic tab, type your domain (e.g. example.com). The tool auto-adds your Sitemap URL and uses it across the file.",
  },
  {
    icon: Settings2,
    title: "Set your rules",
    desc: "Use the Basic and Advanced tabs to toggle folders to block, add custom Disallow / Allow paths and a crawl-delay.",
  },
  {
    icon: Bot,
    title: "Block AI bots (optional)",
    desc: "Open the AI Bots tab and toggle crawlers like GPTBot or ClaudeBot to keep AI scrapers out while Google stays allowed.",
  },
  {
    icon: FileCode2,
    title: "Copy or download",
    desc: "Check the live preview and the SEO validation panel, then hit Copy or Download to grab your robots.txt.",
  },
  {
    icon: Upload,
    title: "Upload to your root",
    desc: "Place the file in your site root so it loads at yourdomain.com/robots.txt — done.",
  },
];

const examples = [
  {
    title: "Allow everything (default)",
    code: `User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml`,
  },
  {
    title: "Block the entire site (staging)",
    code: `User-agent: *
Disallow: /`,
  },
  {
    title: "Block AI training crawlers",
    code: `User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Google-Extended
Disallow: /`,
  },
  {
    title: "WordPress recommended",
    code: `User-agent: *
Allow: /
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /?s=
Sitemap: https://example.com/sitemap_index.xml`,
  },
];

const directives = [
  {
    d: "User-agent",
    m: "Names the crawler a rule block applies to (* = all bots).",
  },
  { d: "Disallow", m: "Blocks crawlers from a path or pattern." },
  { d: "Allow", m: "Permits a path, even inside a disallowed folder." },
  { d: "Sitemap", m: "Points crawlers to your XML sitemap (absolute URL)." },
  { d: "Crawl-delay", m: "Seconds to wait between requests (Bing/Yandex)." },
  { d: "Host", m: "Declares the preferred domain (used by Yandex)." },
  { d: "* and $", m: "Wildcard for any characters, $ matches the URL end." },
];

const faqs = [
  {
    q: "What is a robots.txt file and why do I need it?",
    a: "A robots.txt is a plain-text file in your site's root that tells search engine crawlers which URLs they may or may not request. It controls crawler access, protects your crawl budget, and keeps low-value or duplicate pages out of crawling.",
  },
  {
    q: "How do I create a custom robots.txt file for my website?",
    a: "Pick a template (WordPress, Shopify, Blogger or Custom) in the generator above, add your domain and sitemap, choose which folders or AI bots to block, then copy or download the file and upload it to your root directory at yourdomain.com/robots.txt.",
  },
  {
    q: "How do I block AI bots like GPTBot and ChatGPT in robots.txt?",
    a: "Add a User-agent block for each AI crawler (GPTBot, ChatGPT-User, ClaudeBot, Google-Extended, CCBot, PerplexityBot and more) followed by 'Disallow: /'. Use the 'Block AI Bots' template above to add all of them with one click while keeping Google and Bing allowed.",
  },
  {
    q: "Where should I upload the robots.txt file?",
    a: "Upload it to the root of your domain so it is reachable at https://yourdomain.com/robots.txt. Search engines only read robots.txt from the root — it will not work inside a sub-folder.",
  },
  {
    q: "Does blocking a page in robots.txt remove it from Google?",
    a: "No. Robots.txt blocks crawling but does not guarantee removal. A blocked URL can still appear in search results without a snippet. To remove a page from the index, use a noindex meta tag (and allow crawling) or password-protect it.",
  },
  {
    q: "Does Googlebot respect the crawl-delay directive?",
    a: "Googlebot ignores crawl-delay; set the crawl rate in Google Search Console instead. Bing, Yahoo and Yandex do honor crawl-delay, so it is still useful for those engines.",
  },
];

const relatedTools = [
  {
    icon: Tags,
    label: "Meta Tag Generator",
    href: "/tools/meta-tag-generator",
  },
  {
    icon: Youtube,
    label: "YouTube Tag Generator",
    href: "/tools/youtube-tags-extractor",
  },
  {
    icon: LayoutGrid,
    label: "All SEO Tools",
    href: "/tools",
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
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300"
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

export default function RobotsTxtGeneratorExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/60 via-white to-slate-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-slate-400/20 blur-[120px] dark:bg-slate-600/10" />

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
            className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-blue-500/20 dark:bg-white/[0.04] dark:text-blue-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Free SEO Tool · Now blocks AI bots
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            <span className="bg-gradient-to-r from-blue-600 via-slate-700 to-blue-500 bg-clip-text text-transparent dark:from-blue-300 dark:via-slate-200 dark:to-blue-200">
              Robots.txt
            </span>{" "}
            Generator
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            A free robots file generator that builds a custom, SEO-friendly
            robots.txt file in seconds. Ready-made templates for WordPress,
            Shopify &amp; Blogger, sitemap support, crawl-delay control, and
            one-click blocking of AI crawlers like GPTBot &amp; ClaudeBot.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 100% free
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No signup
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Instant download
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> AI-bot blocking
            </span>
          </motion.div>
        </motion.header>

        {/* Tool */}
        <section className="mb-20">
          <Suspense
            fallback={
              <div className="text-center py-20 text-slate-500">
                Loading generator…
              </div>
            }
          >
            <RobotsGeneratorClient />
          </Suspense>
        </section>

        {/* Features */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(37,99,235,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
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
            How to make a robots.txt file step by step
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Six simple steps. No syntax knowledge required.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent dark:via-blue-500/30 lg:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-slate-600 text-white shadow-lg shadow-blue-500/30">
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

        {/* Examples */}
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
            Robots.txt examples for SEO
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Copy-paste starting points for the most common setups. Generate
            your own customized version with the tool above.
          </motion.p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {examples.map((ex) => (
              <motion.div
                key={ex.title}
                variants={fadeUp}
                className="overflow-hidden rounded-2xl border border-gray-800 bg-slate-900 dark:border-white/10 dark:bg-slate-950"
              >
                <div className="border-b border-slate-700/70 bg-slate-800/40 px-5 py-3 text-sm font-medium text-slate-200">
                  {ex.title}
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap p-5 font-mono text-xs text-emerald-400 sm:text-sm">
                  {ex.code}
                </pre>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Directives reference */}
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
            Robots.txt directives explained
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
          >
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/80 dark:bg-white/[0.04]">
                <tr>
                  <th className="px-5 py-3 font-semibold text-gray-900 dark:text-white">
                    Directive
                  </th>
                  <th className="px-5 py-3 font-semibold text-gray-900 dark:text-white">
                    What it does
                  </th>
                </tr>
              </thead>
              <tbody>
                {directives.map((row) => (
                  <tr
                    key={row.d}
                    className="border-t border-gray-100 dark:border-white/10"
                  >
                    <td className="whitespace-nowrap px-5 py-3 font-mono text-blue-600 dark:text-blue-400">
                      {row.d}
                    </td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                      {row.m}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
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
            What is a robots.txt file?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Robots.txt is a simple text file placed in the root of your
            website that follows the Robots Exclusion Protocol. It tells
            search engine crawlers — and now AI scrapers — which areas of your
            site they are allowed to request. A well-built{" "}
            <strong>robots.txt</strong> protects your crawl budget, keeps
            duplicate and low-value URLs out of crawling, and is one of the
            foundations of technical SEO.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Robots.txt best practices
          </motion.h3>
          <motion.ul
            variants={fadeUp}
            className="mt-3 space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            {[
              "Always include your XML sitemap URL.",
              "Never block CSS or JavaScript — Google needs them to render.",
              "Use Disallow for filters, search and parameter URLs.",
              "Block AI bots separately to keep search engines allowed.",
              "Keep the file under 500 KB and test before deploying.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{t}</span>
              </li>
            ))}
          </motion.ul>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Robots.txt generator for Google (Googlebot)
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            This robots file generator produces a file Googlebot reads
            exactly the way Google documents it. Add your sitemap so Google
            discovers every URL, keep CSS and JavaScript allowed so Google can
            render your pages, and use Disallow only for the sections you
            truly want kept out of crawling. Remember that Googlebot ignores
            crawl-delay — set your crawl rate in Google Search Console
            instead — and that blocking a URL here stops crawling but does
            not remove an already-indexed page (use a noindex tag for that).
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Robot file generator for any platform
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Whether you call it a robots file generator, a robot file
            generator or a robots.txt maker, the goal is the same: a clean,
            valid file at the root of your domain. Pick a WordPress, Shopify
            or Blogger template above, generate your file, and validate it
            with the built-in SEO checks before you upload it to{" "}
            <span className="font-mono">yourdomain.com/robots.txt</span>.
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
            Related free SEO tools
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            More free SEO utilities — no signup required.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-slate-500/15 text-blue-600 ring-1 ring-blue-500/20 dark:text-blue-300">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tool.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-500" />
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
          className="relative overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-600 via-slate-700 to-blue-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Need more handy tools?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-blue-50/90">
            Explore the full collection of free, fast, and privacy-friendly
            utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
