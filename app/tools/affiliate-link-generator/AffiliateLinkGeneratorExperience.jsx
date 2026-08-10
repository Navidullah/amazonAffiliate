"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Globe2,
  Link2,
  ListChecks,
  Megaphone,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Wand2,
} from "lucide-react";
import AffiliateLinkGeneratorClient from "@/app/components/affiliateLinkGenerator/AffiliateLinkGeneratorClient";

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
    title: "No SiteStripe Needed",
    desc: "Paste any Amazon URL or ASIN and get a clean affiliate link instantly — no toolbar, no API keys.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Globe2,
    title: "19 Marketplaces",
    desc: "Works across amazon.com, .co.uk, .de, .in, .ca, .fr, .co.jp and more — just use the matching tag.",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "Runs In Your Browser",
    desc: "Your Associate Tag is never sent to our servers — everything is built locally on your device.",
    accent: "from-purple-500 to-violet-500",
  },
];

const steps = [
  {
    icon: Tag,
    title: "Enter your Associate Tag",
    desc: "Type your Amazon tracking ID, e.g. yoursite-20, and optionally remember it on this device.",
  },
  {
    icon: Link2,
    title: "Paste the product URL",
    desc: "Drop in any Amazon product link or a raw 10-character ASIN.",
  },
  {
    icon: ScanLine,
    title: "Generate & copy",
    desc: "Get a clean /dp/ASIN?tag= link ready to share in seconds.",
  },
];

const relatedTools = [
  {
    icon: ListChecks,
    label: "All free tools",
    href: "/tools",
  },
  {
    icon: Megaphone,
    label: "Meta tag generator",
    href: "/tools/meta-tag-generator",
  },
  {
    icon: ScanLine,
    label: "Robots.txt generator",
    href: "/tools/robots-txt-generator",
  },
  {
    icon: Sparkles,
    label: "YouTube tag extractor",
    href: "/tools/youtube-tags-extractor",
  },
];

const faqs = [
  {
    q: "How do I create an Amazon affiliate link?",
    a: "Paste any Amazon product URL into the tool above, enter your Amazon Associate Tag (for example yoursite-20), and click Generate. The tool extracts the product's ASIN and builds a clean affiliate link in the format https://amazon.com/dp/ASIN?tag=yourtag that tracks your commissions.",
  },
  {
    q: "Can I create an Amazon affiliate link without SiteStripe?",
    a: "Yes. SiteStripe is Amazon's on-site toolbar, but you don't need it here. As long as you have an approved Amazon Associates account and your tracking ID (Associate Tag), this generator builds the same trackable link from any product URL or ASIN — useful on mobile or when SiteStripe isn't showing.",
  },
  {
    q: "How do I convert a normal Amazon link into an affiliate link?",
    a: "Copy the product page URL from Amazon, paste it into the field above, and add your Associate Tag. The tool strips any existing tracking parameters and someone else's tag, then attaches your own tag so the commission is credited to you.",
  },
  {
    q: "Can I generate an affiliate link from an ASIN?",
    a: "Yes. If your URL contains a 10-character ASIN (such as B0XXXXXXXY) in the path or as an asin= parameter, the tool detects it automatically and rebuilds a clean /dp/ASIN link with your tag attached — no manual editing required.",
  },
  {
    q: "Which Amazon regions and marketplaces are supported?",
    a: "The generator supports 19 marketplaces, including amazon.com, amazon.co.uk, amazon.de, amazon.ca, amazon.in, amazon.fr, amazon.it, amazon.es, amazon.co.jp, amazon.com.au, amazon.com.br, amazon.com.mx, amazon.sg, amazon.ae, amazon.sa, amazon.nl, amazon.se, amazon.pl, and amazon.tr. Remember to use the Associate Tag that belongs to that specific marketplace.",
  },
  {
    q: "Is this Amazon affiliate link generator free?",
    a: "Yes, it is completely free with no signup and no limits. The link is built right in your browser, and your Associate Tag is only stored locally on your device if you tick 'Remember my tag'.",
  },
  {
    q: "Why should I use a clean affiliate link instead of a long one?",
    a: "Short, clean /dp/ASIN?tag= links look more professional, are easier to share on YouTube, social media, or a blog, and avoid the spammy appearance of long URLs packed with tracking parameters. They also reduce the chance of a broken or mistracked link.",
  },
  {
    q: "Will my Associate Tag be saved or shared?",
    a: "Your tag is never sent to our servers. If you enable 'Remember my tag on this device', it is stored only in your browser's local storage so you don't have to retype it. Untick the box to remove it.",
  },
];

const reviews = [
  {
    name: "Leila K.",
    role: "YouTube Creator",
    stars: 5,
    text: "SiteStripe never works on my phone. This tool lets me generate clean Amazon affiliate links in seconds without needing the toolbar — exactly what I was looking for.",
  },
  {
    name: "Omar S.",
    role: "Affiliate Blogger",
    stars: 5,
    text: "I use this for every product roundup I write. Paste the URL, hit generate, done. It's the fastest way to go from an Amazon product to a ready-to-use affiliate link.",
  },
  {
    name: "Priya M.",
    role: "Instagram Influencer",
    stars: 5,
    text: "Clean, short affiliate links look so much better in an Instagram bio than massive Amazon URLs. This tool is bookmarked on every device I own.",
  },
  {
    name: "James T.",
    role: "UK Affiliate Marketer",
    stars: 5,
    text: "Great that it supports amazon.co.uk — most tools only do .com. My UK associate tag works perfectly. Saves me building links manually.",
  },
  {
    name: "Fatima A.",
    role: "Content Creator",
    stars: 4,
    text: "Needed to update dozens of old Amazon links with my affiliate tag. Doing them one by one was still faster than using SiteStripe. Clean output every time.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.stars, 0) / reviews.length
).toFixed(1);

const MARKETPLACES = [
  "amazon.com",
  "amazon.co.uk",
  "amazon.de",
  "amazon.ca",
  "amazon.in",
  "amazon.fr",
  "amazon.it",
  "amazon.es",
  "amazon.co.jp",
  "amazon.com.au",
  "amazon.com.br",
  "amazon.com.mx",
  "amazon.sg",
  "amazon.ae",
  "amazon.sa",
  "amazon.nl",
  "amazon.se",
  "amazon.pl",
  "amazon.tr",
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

export default function AffiliateLinkGeneratorExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px] dark:bg-violet-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-fuchsia-400/20 blur-[120px] dark:bg-fuchsia-600/10" />

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
            className="inline-flex items-center gap-2 rounded-full border border-violet-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-violet-700 shadow-sm backdrop-blur dark:border-violet-500/20 dark:bg-white/[0.04] dark:text-violet-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Free • No SiteStripe • 19 marketplaces
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Amazon{" "}
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 bg-clip-text text-transparent dark:from-violet-300 dark:via-fuchsia-300 dark:to-pink-200">
              Affiliate Link
            </span>{" "}
            Generator
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Convert any Amazon product URL or ASIN into a clean affiliate link
            with your own Associate Tag. No SiteStripe, no API, no signup —
            just paste, generate, and copy.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No sign up
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Runs in your browser
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> 19 marketplaces
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex items-center justify-center gap-1.5"
          >
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${
                    s <= Math.round(Number(AVG_RATING))
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300 dark:text-gray-700"
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
        </motion.header>

        {/* Tool */}
        <section className="mb-20">
          <AffiliateLinkGeneratorClient />
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
            How to create an Amazon affiliate link
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No SiteStripe, no software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent dark:via-violet-500/30 sm:block" />
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
            What is an Amazon affiliate link generator?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            An Amazon affiliate link generator turns a normal Amazon product
            URL into a trackable affiliate link that carries your{" "}
            <strong>Associate Tag</strong>. When someone buys through that
            link, the commission is credited to your Amazon Associates
            account. This tool builds those links instantly — entirely in
            your browser — so you can <strong>convert an Amazon link to an
            affiliate link</strong> without SiteStripe or the Product
            Advertising API.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Convert an Amazon link to an affiliate link without SiteStripe
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            SiteStripe is Amazon&rsquo;s built-in toolbar, but it isn&rsquo;t
            always available — especially on mobile, inside apps, or when
            Amazon rolls out UI changes. As long as you have an approved
            Associates account and your tag, this generator produces the
            same trackable link from any product URL. That makes it a
            practical <strong>Amazon affiliate link generator without the
            API</strong> for quick link-building anywhere. For the full
            walkthrough — including how to avoid the most common mistake
            that loses affiliates commission — see our guide on{" "}
            <Link
              href="/blog/how-to-create-an-amazon-affiliate-link"
              className="font-medium text-violet-600 underline-offset-2 hover:underline dark:text-violet-400"
            >
              how to create an Amazon affiliate link without SiteStripe
            </Link>
            .
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Generate an affiliate link from an ASIN
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Every Amazon product has a unique 10-character <strong>ASIN</strong>{" "}
            (for example <code>B0XXXXXXXY</code>). If your link contains an
            ASIN in its path or as an <code>asin=</code> parameter, the tool
            detects it automatically and rebuilds a tidy <code>/dp/ASIN</code>{" "}
            link with your tag attached — no manual editing required.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Supported Amazon marketplaces
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            The generator works across 19 regions, so you can build a link
            for the right store every time.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-3 flex flex-wrap gap-2">
            {MARKETPLACES.map((d) => (
              <span
                key={d}
                className="rounded-lg border border-gray-200/70 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-400"
              >
                {d}
              </span>
            ))}
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Use the Associate Tag that belongs to the same marketplace you
            are linking to — a US tag works on <code>amazon.com</code>, a UK
            tag on <code>amazon.co.uk</code>, and so on. Running multiple
            regional programmes? Generate separate links for each and use a
            localisation tool like Amazon OneLink to serve the right region
            automatically.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Where to share Amazon affiliate links
          </motion.h3>
          <motion.ul
            variants={fadeUp}
            className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>
              <strong>Blog posts &amp; product reviews:</strong> clean{" "}
              <code>/dp/ASIN?tag=</code> links are less intimidating than
              long URLs and reduce link-checker false positives.
            </li>
            <li>
              <strong>YouTube descriptions:</strong> short affiliate links
              fit neatly in pinned comments and description boxes.
            </li>
            <li>
              <strong>Instagram &amp; TikTok bio:</strong> place a single
              collection link (e.g. Linktree) and use individual clean
              affiliate links behind each product button.
            </li>
            <li>
              <strong>Email newsletters:</strong> clean links look
              professional and pass through most spam filters more reliably.
            </li>
            <li>
              <strong>Telegram &amp; WhatsApp:</strong> paste directly — the
              preview card loads correctly from a standard Amazon product
              URL.
            </li>
          </motion.ul>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Why use clean affiliate links?
          </motion.h3>
          <motion.ul
            variants={fadeUp}
            className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>
              <strong>More clicks:</strong> short, tidy links look
              trustworthy and improve click-through rates.
            </li>
            <li>
              <strong>Accurate tracking:</strong> removing old tags and stray
              parameters means the commission is credited correctly to you.
            </li>
            <li>
              <strong>Avoids broken links:</strong> long URLs with dozens of
              parameters sometimes break when copied across platforms.
            </li>
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

        {/* Reviews */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.div variants={fadeUp} className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              What users say
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-5 w-5 ${
                      s <= Math.round(Number(AVG_RATING))
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 dark:text-gray-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {AVG_RATING}
              </span>
              <span className="text-sm">
                out of 5 &middot; {reviews.length} reviews
              </span>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <motion.article
                key={r.name}
                variants={fadeUp}
                className="rounded-2xl border border-gray-200/70 bg-white/70 p-5 backdrop-blur-xl transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
              >
                <div className="mb-3 flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-4 w-4 ${
                        s <= r.stars
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 dark:text-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <footer className="border-t border-gray-200/70 pt-3 dark:border-white/10">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
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
            More handy utilities for creators and marketers — all free, no signup.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Disclaimer */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 rounded-xl border border-gray-200/70 bg-white/70 px-4 py-3 text-xs text-gray-500 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400"
        >
          Shopyor is not affiliated with or endorsed by Amazon. &ldquo;Amazon&rdquo;
          and the Amazon logo are trademarks of Amazon.com, Inc. or its
          affiliates. Always follow the Amazon Associates Operating Agreement
          when sharing affiliate links.
        </motion.p>

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
      </div>
    </main>
  );
}
