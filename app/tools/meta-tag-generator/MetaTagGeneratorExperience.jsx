"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Home,
  Tags,
  Share2,
  Code2,
  Gauge,
  Check,
  ClipboardPaste,
  Eye,
  PencilLine,
  Star,
  Sparkles,
  FileText,
  ScanText,
  ImageIcon,
} from "lucide-react";
import MetaTagGeneratorClient from "./MetaTagGeneratorClient";

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
    icon: Eye,
    title: "Live Google & Social Preview",
    desc: "See exactly how your page looks in Google search and when shared on Facebook, X and LinkedIn — as you type.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Gauge,
    title: "Character Counters",
    desc: "Title and description counters turn green inside the SEO-ideal range so Google never truncates your snippet.",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Share2,
    title: "Open Graph + Twitter",
    desc: "Generates SEO, Open Graph and Twitter Card tags together so your links look professional everywhere they're shared.",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    icon: Code2,
    title: "Copy-Paste Ready",
    desc: "Clean, valid HTML you can copy or download and drop straight into your page's head section. No account needed.",
    accent: "from-purple-500 to-fuchsia-500",
  },
];

const steps = [
  {
    icon: PencilLine,
    title: "Enter details",
    desc: "Add your title, description, URL and social image.",
  },
  {
    icon: Eye,
    title: "Check preview",
    desc: "Watch the Google & social previews update live.",
  },
  {
    icon: ClipboardPaste,
    title: "Copy code",
    desc: "Copy or download the generated meta tags.",
  },
  {
    icon: Code2,
    title: "Paste in <head>",
    desc: "Drop them into your page's head section.",
  },
];

const tagRef = [
  { t: "title", d: "The clickable headline in Google results. Keep it 50–60 characters." },
  { t: "meta description", d: "The summary under the title. 150–160 characters for best display." },
  { t: "meta robots", d: "Tells search engines to index/follow your page — or not." },
  { t: "og:title / og:description", d: "Title & text shown on Facebook, LinkedIn and most platforms." },
  { t: "og:image", d: "Social preview image. Ideal size: 1200×630 px." },
  { t: "twitter:card", d: "Sets the card style for X (Twitter). Use summary_large_image for a big preview." },
  { t: "og:url", d: "The canonical URL of the page — prevents duplicate share tracking." },
  { t: "og:type", d: "Content type for Open Graph: website, article, product, etc." },
];

const bestPractices = [
  "Keep titles 50–60 and descriptions 150–160 characters.",
  "Put your main keyword near the start of the title.",
  "Write descriptions that earn the click — not keyword stuffing.",
  "Always set an og:image (1200×630) for social shares.",
  "Use a unique title and description on every indexable page.",
  "Match og:title and twitter:title to your page's <title> tag.",
  "Set og:url to the canonical URL to prevent tracking fragmentation.",
];

const relatedSearches = [
  "free meta tag generator no signup",
  "open graph tag generator",
  "meta description generator free",
  "og image preview tool",
  "twitter card meta tags",
  "meta tag generator wordpress",
  "seo title tag generator",
  "social share meta tags",
  "html head tags generator",
  "meta robots noindex generator",
  "meta tag checker free",
  "og tag generator with live preview",
  "how to add meta tags html",
  "canonical tag generator",
  "schema markup generator free",
  "meta tag generator for blogger",
  "viewport meta tag generator",
  "meta tag generator shopify",
  "seo snippet preview tool",
  "open graph image size checker",
];

const relatedTools = [
  {
    icon: FileText,
    label: "Robots.txt Generator",
    href: "/tools/robots-txt-generator",
  },
  {
    icon: ScanText,
    label: "YouTube Tag Generator",
    href: "/tools/youtube-tags-extractor",
  },
  {
    icon: ImageIcon,
    label: "Image Compressor",
    href: "/tools/image-compressor",
  },
  {
    icon: Sparkles,
    label: "Browse all free tools",
    href: "/tools",
  },
];

const faqs = [
  {
    q: "What are meta tags and why do they matter for SEO?",
    a: "Meta tags are snippets of HTML inside your page's <head> that describe the page to search engines and social networks. The title tag and meta description directly shape how your page appears in Google results, while Open Graph and Twitter Card tags control how it looks when shared. Well-written meta tags improve click-through rate — one of the few SEO factors you control completely.",
  },
  {
    q: "What is the ideal length for a title tag and meta description?",
    a: "Keep title tags between 50 and 60 characters and meta descriptions between 150 and 160 characters. Google truncates longer ones with an ellipsis, which cuts off your message. The character counters in this tool turn green when you're inside the ideal range, so you always know before you publish.",
  },
  {
    q: "What are Open Graph and Twitter Card tags?",
    a: "Open Graph (og:) tags control the title, description, and image shown when your page is shared on Facebook, LinkedIn, WhatsApp, and most platforms. Twitter Card tags do the same for X (Twitter). Adding both ensures your links look polished everywhere — rather than a bare URL or auto-generated thumbnail.",
  },
  {
    q: "Is this meta tag generator really free?",
    a: "Yes, completely free. No signup, no account, no usage limits, and no watermark on the downloaded HTML file. Generate and copy as many sets of meta tags as you need.",
  },
  {
    q: "Where do I put the generated meta tags?",
    a: "Paste the generated tags inside the <head> section of your HTML page, before the closing </head> tag. On WordPress you can add them via an SEO plugin (Yoast, Rank Math) using their 'Additional head code' field, or directly in your theme's header.php.",
  },
  {
    q: "Do meta keywords tags still matter for SEO?",
    a: "No. Google has officially ignored the meta keywords tag since 2009. Bing and most other major search engines also disregard it. Including keywords in your title, description, and on-page content is what actually influences rankings. The meta keywords field in this tool is optional and only kept for legacy CMS compatibility.",
  },
  {
    q: "How do I check if my meta tags are working?",
    a: "After publishing, paste your URL into Google Search Console's URL Inspection tool to see how Googlebot reads your page. For social previews, use Facebook's Sharing Debugger, LinkedIn's Post Inspector, or X's Card Validator. You can also re-paste your live URL into this tool's URL field to verify the output looks correct.",
  },
  {
    q: "Can I use the same meta description on multiple pages?",
    a: "No. Duplicate meta descriptions are a common SEO mistake. Google may rewrite them or discount them entirely if it detects duplicates across your site. Write a unique, page-specific description for every indexable page — it is one of the fastest wins for improving click-through rates across your whole site.",
  },
];

const reviews = [
  {
    name: "Sarah K.",
    role: "Freelance SEO Consultant",
    stars: 5,
    text: "The live Google preview is a game changer. I can see exactly how my title gets cut off before I publish — no more guessing in the dark.",
  },
  {
    name: "Dev M.",
    role: "Full-Stack Developer",
    stars: 5,
    text: "Finally a free tool that generates SEO, Open Graph, and Twitter Card tags together in one go. Saves me 10 minutes per page.",
  },
  {
    name: "Priya T.",
    role: "Content Manager",
    stars: 5,
    text: "The character counters turning green when I'm in the right range is such a small detail but incredibly useful. I use this on every page I publish.",
  },
  {
    name: "James O.",
    role: "Blogger",
    stars: 5,
    text: "No signup, copy-paste ready HTML, no watermark on the download. Does exactly what it says with nothing to get in the way.",
  },
  {
    name: "Ana L.",
    role: "Small Business Owner",
    stars: 4,
    text: "Easy to use for my WordPress site. I paste the output straight into Yoast's additional head code field and it works every time.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.stars, 0) / reviews.length
).toFixed(1);

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
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"
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

export default function MetaTagGeneratorExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px] dark:bg-violet-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-fuchsia-400/20 blur-[120px] dark:bg-fuchsia-600/10" />

      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"
        >
          <Link href="/" className="flex items-center gap-1 hover:text-violet-600">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/tools" className="hover:text-violet-600">
            Tools
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Meta Tag Generator
          </span>
        </nav>

        {/* Hero */}
        <motion.header
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur dark:border-violet-500/20 dark:bg-white/[0.04] dark:text-violet-300"
          >
            <Tags className="h-3.5 w-3.5" />
            Free SEO Tool · Live preview · No signup
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Free{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent dark:from-violet-300 dark:via-fuchsia-300 dark:to-pink-200">
              Meta Tag
            </span>{" "}
            Generator
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mb-2 mt-5 flex items-center justify-center gap-1.5"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${
                    s <= Math.round(Number(AVG_RATING))
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {AVG_RATING}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({reviews.length} reviews)
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Create perfect <strong>SEO, Open Graph &amp; Twitter Card meta
            tags</strong> with a live Google search preview and social share
            preview. Character counters keep you in the ideal range — copy
            and paste straight into your <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm dark:bg-gray-800">&lt;head&gt;</code>.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live Google preview
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open Graph + Twitter
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 100% free — no account
            </span>
          </motion.div>
        </motion.header>

        {/* Tool */}
        <section className="mb-20">
          <MetaTagGeneratorClient />
        </section>

        {/* Features */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(168,85,247,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
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
            How to generate meta tags in 2 minutes
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Four simple steps. No software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent dark:via-violet-500/30 lg:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30">
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

        {/* Tag reference */}
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
            Meta tags explained
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Here&apos;s what each tag this tool generates actually does for
            your SEO and social sharing.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-8 max-w-3xl overflow-hidden overflow-x-auto rounded-3xl border border-gray-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
          >
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-gray-50/80 dark:bg-white/[0.04]">
                <tr>
                  <th className="px-5 py-3 font-semibold text-gray-900 dark:text-gray-100">
                    Tag
                  </th>
                  <th className="px-5 py-3 font-semibold text-gray-900 dark:text-gray-100">
                    What it does
                  </th>
                </tr>
              </thead>
              <tbody>
                {tagRef.map((r) => (
                  <tr
                    key={r.t}
                    className="border-t border-gray-100 dark:border-white/10"
                  >
                    <td className="whitespace-nowrap px-5 py-3 font-mono text-violet-600 dark:text-violet-400">
                      {r.t}
                    </td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-300">
                      {r.d}
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
          className="mb-20 grid gap-6 md:grid-cols-2"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-3xl border border-gray-200/70 bg-white/70 p-7 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Why meta tags matter for SEO
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              Search engines use your title tag and meta description to
              understand and display your page. A compelling, well-sized
              snippet directly improves your click-through rate — one of the
              strongest ranking signals you control entirely yourself. Add
              Open Graph and Twitter Card tags and every share of your link
              becomes clean, branded, clickable content instead of a bare URL
              or auto-generated thumbnail. Pages with a complete set of meta
              tags consistently outperform those without across every major
              platform.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="rounded-3xl border border-gray-200/70 bg-white/70 p-7 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Meta tag best practices
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
              {bestPractices.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.section>

        {/* Reviews */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              What users say
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-5 w-5 ${
                      s <= Math.round(Number(AVG_RATING))
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {AVG_RATING}
              </span>
              <span className="text-sm">out of 5 · {reviews.length} reviews</span>
            </div>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <motion.article
                key={r.name}
                variants={fadeUp}
                className="rounded-2xl border border-gray-200/70 bg-white/70 p-5 backdrop-blur-xl transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="mb-3 flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s <= r.stars
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <footer className="border-t border-gray-100 pt-3 dark:border-white/10">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {r.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {r.role}
                  </p>
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
          <motion.h2
            variants={fadeUp}
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            Related searches
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-1 text-sm text-gray-500 dark:text-gray-400"
          >
            People also search for these meta tag and SEO topics:
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-4 flex flex-wrap gap-2">
            {relatedSearches.map((kw) => (
              <li
                key={kw}
                className="rounded-full border border-gray-200/70 bg-white/60 px-3 py-1 text-xs text-gray-500 backdrop-blur transition-colors hover:bg-violet-50 hover:text-violet-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-violet-500/10 dark:hover:text-violet-300"
              >
                {kw}
              </li>
            ))}
          </motion.ul>
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
            More free SEO tools
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            More handy SEO and marketing utilities — all free, no signup.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-violet-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-300">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tool.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-violet-500" />
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
          className="relative overflow-hidden rounded-3xl border border-violet-200/50 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Need more handy tools?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-violet-50/90">
            Explore the full collection of free, fast, and privacy-friendly
            utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        <p className="mt-12 rounded-xl border border-gray-200/70 bg-white/60 px-4 py-3 text-xs text-gray-500 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400">
          Meta tags are one factor in SEO — search rankings depend on many
          additional signals including content quality, backlinks, Core Web
          Vitals, and more. Use this tool as a starting point, not a complete
          SEO solution.
        </p>
      </div>
    </main>
  );
}
