"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Clapperboard,
  Download,
  EyeOff,
  Film,
  Link2,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  Star,
  Video,
} from "lucide-react";
import InstagramVideoDownloaderClient from "./client";

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
    icon: EyeOff,
    title: "No Watermark",
    desc: "Get the original MP4 exactly as uploaded — no overlay, logo, or watermark added.",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: ShieldCheck,
    title: "No Login Needed",
    desc: "Paste a public link and download. No Instagram account or password ever required.",
    accent: "from-pink-500 to-orange-500",
  },
  {
    icon: Film,
    title: "Preview Before Saving",
    desc: "A built-in player lets you confirm you grabbed the right clip before downloading.",
    accent: "from-orange-500 to-amber-500",
  },
];

const steps = [
  {
    icon: Link2,
    title: "Copy the link",
    desc: "Tap Share or the three-dot menu on any public Reel or video and copy the link.",
  },
  {
    icon: MousePointerClick,
    title: "Paste and download",
    desc: "Paste the link above and click Download Video to fetch the best quality.",
  },
  {
    icon: Download,
    title: "Preview and save",
    desc: "Confirm the clip in the preview player, then save the MP4 to your device.",
  },
];

const relatedTools = [
  {
    icon: Clapperboard,
    label: "TikTok Video Downloader",
    href: "/tools/free-tiktok-video-downloader",
  },
  {
    icon: Video,
    label: "Facebook Video Downloader",
    href: "/tools/facebook-video-downloader",
  },
  {
    icon: Film,
    label: "Video Downloader (all platforms)",
    href: "/tools/video-downloader",
  },
  {
    icon: Sparkles,
    label: "Browse all free tools",
    href: "/tools",
  },
];

const guides = [
  {
    href: "/blog/how-to-download-videos-from-facebook-instagram-tiktok",
    title: "Download Videos from Facebook, Instagram & TikTok",
  },
  {
    href: "/blog/best-facebook-video-downloader-online-free-in-hd-shopyor",
    title: "Best Facebook Video Downloader Online Free in HD",
  },
  {
    href: "/blog/easy-guide-download-tiktok-facebook-videos-using-shopyor",
    title: "Easy Guide: Download TikTok & Facebook Videos",
  },
];

const KEYWORDS = [
  "instagram reel downloader free",
  "download instagram reels without login",
  "save instagram reels to phone",
  "instagram video downloader no watermark",
  "free instagram reel downloader no signup",
  "how to download instagram reels",
  "instagram reel saver online",
  "download instagram videos without app",
  "instagram mp4 downloader free",
  "save instagram videos to camera roll",
  "instagram reel download iphone",
  "instagram video downloader android",
  "download instagram reels no account",
  "free instagram video saver",
  "instagram reels download online free",
  "save instagram reels without watermark",
  "instagram video downloader hd",
  "how to save instagram reels offline",
  "instagram reel downloader no registration",
  "download public instagram videos free",
];

const reviews = [
  {
    name: "Sofia L.",
    role: "Social media manager, lifestyle brand",
    rating: 5,
    body: "I save competitor Reels every week for our content benchmarking decks. Shopyor gives me a clean MP4 in seconds — no watermark, no login prompt, no nonsense.",
  },
  {
    name: "James O.",
    role: "Fitness influencer, 45K Instagram followers",
    rating: 5,
    body: "I archive all my workout Reels as backups before Instagram's algorithm buries them. The preview player is a nice touch — I can confirm it's the right clip before saving.",
  },
  {
    name: "Rina C.",
    role: "Recipe blogger and food photographer",
    rating: 5,
    body: "I collect cooking Reels for my moodboard and offline reference. No other free tool I tried actually showed a preview before downloading — this one does.",
  },
  {
    name: "David K.",
    role: "Brand marketing consultant",
    rating: 4,
    body: "We pull public brand content for competitive analysis. Works on desktop Chrome and on my Android phone — consistent results without having to install anything.",
  },
  {
    name: "Aisha M.",
    role: "University student, graphic design major",
    rating: 5,
    body: "I save tutorial Reels to watch offline during my commute. Free, no account required, and the download is instant. Exactly what I needed.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
).toFixed(1);

const faqs = [
  {
    q: "Is the Shopyor Instagram downloader free?",
    a: "Yes. The tool is completely free with no hidden costs, no subscription, and no account required. Paste any public Instagram link and download — nothing else needed.",
  },
  {
    q: "Can I download private Instagram content?",
    a: "No. Only publicly available Reels, feed videos, and IGTV uploads are supported. The tool intentionally does not access private accounts, locked posts, or Stories behind a follow-wall.",
  },
  {
    q: "Does it add a watermark to the downloaded video?",
    a: "No. The downloaded file is the original MP4 with no overlay, logo, or watermark added by Shopyor. You get the video exactly as it was uploaded to Instagram.",
  },
  {
    q: "What types of Instagram content can I download?",
    a: "You can download public Instagram Reels (short vertical videos), standard feed video posts, and IGTV / long-form videos. Static photo posts are not supported.",
  },
  {
    q: "How do I copy an Instagram Reel link on my phone?",
    a: "Open the Reel in the Instagram app, tap the three-dot menu (⋯) in the top-right corner or the Share icon, then tap 'Copy link'. On desktop, copy the URL from the browser address bar.",
  },
  {
    q: "Do I need to install an app or browser extension?",
    a: "No. The downloader runs entirely in your browser. It works on iPhone Safari, Android Chrome, and all major desktop browsers — no installation required.",
  },
  {
    q: "What resolution will the video download in?",
    a: "Shopyor automatically fetches the best available quality Instagram makes available for that specific post — usually up to 1080p. You can preview the video before saving to confirm the quality.",
  },
  {
    q: "Does Shopyor store or log the videos I download?",
    a: "No. Shopyor retrieves the video from Instagram's servers on your behalf and streams it to your browser. We do not store copies of videos, and we do not log the Instagram URLs you submit.",
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
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-300"
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

export default function InstagramVideoDownloaderExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-fuchsia-50/60 via-white to-orange-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-fuchsia-400/20 blur-[120px] dark:bg-fuchsia-600/20" />
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
            className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-fuchsia-700 shadow-sm backdrop-blur dark:border-fuchsia-500/20 dark:bg-white/[0.04] dark:text-fuchsia-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Free • No login • No watermark • No app
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Free{" "}
            <span className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-orange-500 bg-clip-text text-transparent dark:from-fuchsia-300 dark:via-pink-300 dark:to-orange-200">
              Instagram Reel &amp; Video
            </span>{" "}
            Downloader
          </motion.h1>

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
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
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
            Paste any public Instagram Reel or video link and download a clean
            MP4 in up to 1080p. Preview before you save — works on iPhone,
            Android, and desktop, no account or app required.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No sign up
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No watermark
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Up to 1080p
            </span>
          </motion.div>
        </motion.header>

        {/* Downloader */}
        <section className="mb-20">
          <InstagramVideoDownloaderClient />
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
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(219,39,119,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
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
            How to download Instagram Reels and videos
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-fuchsia-300/60 to-transparent dark:via-fuchsia-500/30 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-orange-500 text-white shadow-lg shadow-fuchsia-500/30">
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
            What is the Shopyor Instagram Video Downloader?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            The Shopyor Instagram Video Downloader is a free, browser-based
            tool that saves public Instagram Reels, feed videos, and IGTV
            uploads as clean MP4 files — no watermark added, no Instagram
            login required. There is nothing to install on your phone or
            computer. Paste the link, hit Download, preview the clip in the
            built-in player, and save the file — all in under a minute.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Unlike Instagram&apos;s built-in share flow, which only lets you
            re-share inside the app, Shopyor gives you an actual file on your
            device. Whether you are on iPhone Safari, Android Chrome, or a
            desktop browser, the workflow is the same and the result is a
            proper MP4 you can play, edit, or store offline.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            What types of Instagram content can you download?
          </motion.h3>
          <motion.ul
            variants={fadeUp}
            className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>
              <strong>Instagram Reels</strong> — short vertical videos up to
              90 seconds shared publicly. The most common use case.
            </li>
            <li>
              <strong>Feed video posts</strong> — standard video posts from
              public profiles (links that contain{" "}
              <code>instagram.com/p/...</code>).
            </li>
            <li>
              <strong>IGTV / long-form videos</strong> — longer public
              uploads shared to a creator&apos;s channel.
            </li>
          </motion.ul>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Private accounts, Stories behind a follow-wall, and any content
            from accounts you do not have permission to access are
            intentionally not supported. Only public content can be
            downloaded.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Is it safe? Do I need my Instagram login?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            No Instagram login is required at any point. Shopyor only
            accesses publicly available URLs — the same content anyone can
            view by visiting the link in a browser without logging in. You
            never share your Instagram credentials, session cookies, or any
            account data. The tool does not store videos or log the URLs you
            submit.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Legal and ethical use
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            This tool is intended for{" "}
            <strong>personal, non-commercial use</strong>: saving your own
            Reels as backups, archiving reference content you have permission
            to use, or keeping a clip for offline viewing. Do not download
            other creators&apos; content to republish or monetise without
            their explicit written consent. Always credit the original
            creator when sharing, and comply with Instagram&apos;s Terms of
            Use and applicable copyright law. Read more in our guide on{" "}
            <Link
              href="/blog/how-to-download-videos-from-facebook-instagram-tiktok"
              className="font-medium text-fuchsia-600 underline-offset-2 hover:underline dark:text-fuchsia-400"
            >
              downloading videos from Facebook, Instagram &amp; TikTok
            </Link>
            .
          </motion.p>
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
            What users are saying
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Rated {AVG_RATING} / 5 based on {reviews.length} reviews
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <motion.blockquote
                key={r.name}
                variants={fadeUp}
                className="rounded-2xl border border-gray-200/70 bg-white/70 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`h-3.5 w-3.5 ${
                        s < r.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  &ldquo;{r.body}&rdquo;
                </p>
                <footer className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  — {r.name}, {r.role}
                </footer>
              </motion.blockquote>
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
            className="text-center text-lg font-bold text-gray-900 dark:text-white"
          >
            Related searches
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-2 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            People also look for these Instagram download topics
          </motion.p>
          <motion.ul
            variants={fadeUp}
            className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2"
          >
            {KEYWORDS.map((kw) => (
              <li
                key={kw}
                className="rounded-full border border-gray-200/70 bg-white/60 px-3 py-1 text-xs text-gray-600 backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.06]"
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
          className="mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            More free video downloader tools
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            More handy downloader utilities — all free, no signup.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-fuchsia-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-orange-500/15 text-fuchsia-600 ring-1 ring-fuchsia-500/20 dark:text-fuchsia-300">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tool.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-fuchsia-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Guides */}
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
            Guides &amp; tutorials
          </motion.h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {guides.map((link) => (
              <motion.div key={link.href} variants={fadeUp}>
                <Link
                  href={link.href}
                  className="flex h-full items-center rounded-2xl border border-gray-200/70 bg-white/70 p-4 text-sm font-semibold text-gray-800 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100 dark:hover:border-fuchsia-400/50"
                >
                  {link.title}
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
          className="relative overflow-hidden rounded-3xl border border-fuchsia-200/50 bg-gradient-to-br from-fuchsia-600 via-pink-600 to-orange-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Need more handy tools?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-pink-50/90">
            Explore the full collection of free, fast, and privacy-friendly
            utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-fuchsia-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        {/* Disclaimer */}
        <p className="mt-10 rounded-xl border border-gray-200/70 bg-white/60 px-4 py-3 text-center text-xs text-gray-500 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400">
          Instagram and Meta are trademarks of Meta Platforms, Inc. Shopyor is
          not affiliated with Instagram or Meta. This tool is for personal,
          non-commercial use only. Always respect content creators&apos;
          rights and Instagram&apos;s Terms of Use.
        </p>
      </div>
    </main>
  );
}
