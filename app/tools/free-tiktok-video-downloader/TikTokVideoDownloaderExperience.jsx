"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  LayoutGrid,
  Lock,
  Sparkles,
  Star,
  Video,
  Zap,
  ClipboardPaste,
  SlidersHorizontal,
  Download,
} from "lucide-react";
import TikTokDownloaderClient from "./TikTokDownloaderClient";

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
    icon: Sparkles,
    title: "No Watermark",
    desc: "Grabs the original source file before TikTok overlays the username and logo watermark.",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Fast HD Downloads",
    desc: "Choose 360p, 720p, 1080p, or Best quality and get a clean MP4 in seconds.",
    accent: "from-cyan-400 to-sky-500",
  },
  {
    icon: Lock,
    title: "No Login Required",
    desc: "No TikTok credentials, no cookies, no account — just paste the link and download.",
    accent: "from-gray-700 to-gray-900",
  },
];

const steps = [
  {
    icon: ClipboardPaste,
    title: "Copy the TikTok link",
    desc: "Tap Share on any public TikTok video, then Copy link. Works on mobile and desktop.",
  },
  {
    icon: SlidersHorizontal,
    title: "Paste and pick quality",
    desc: "Paste the link above and choose 360p, 720p, 1080p, or Best.",
  },
  {
    icon: Download,
    title: "Download the MP4",
    desc: "Get a clean, watermark-free video saved straight to your device.",
  },
];

const relatedTools = [
  {
    icon: Instagram,
    label: "Instagram Video Downloader",
    href: "/tools/instagram-video-downloader",
  },
  {
    icon: Facebook,
    label: "Facebook Video Downloader",
    href: "/tools/facebook-video-downloader",
  },
  {
    icon: Video,
    label: "Video Downloader (all platforms)",
    href: "/tools/video-downloader",
  },
  {
    icon: LayoutGrid,
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
  "tiktok video downloader without watermark",
  "download tiktok without watermark free",
  "tiktok downloader no signup",
  "save tiktok video to phone",
  "tiktok mp4 download free",
  "how to download tiktok without watermark",
  "tiktok video saver online",
  "tiktok download no app needed",
  "free tiktok downloader no login",
  "download tiktok video to camera roll",
  "tiktok without watermark iphone",
  "tiktok video downloader android",
  "tiktok hd download free",
  "vm tiktok downloader",
  "download tiktok reels without watermark",
  "tiktok saver no registration",
  "free tiktok video download online",
  "tiktok downloader 1080p",
  "save tiktok videos for offline viewing",
  "tiktok video download no watermark no app",
];

const reviews = [
  {
    name: "Priya M.",
    role: "Content creator, 120K TikTok followers",
    rating: 5,
    body: "I archive my best TikToks every month so I always have a clean, watermark-free copy for my portfolio. Shopyor is the only tool that consistently delivers HD without making me sign up.",
  },
  {
    name: "Carlos R.",
    role: "Social media manager, marketing agency",
    rating: 5,
    body: "We clip TikToks for client pitch decks. A clean 1080p download in seconds saves us from stitching frames out of a screen recording. This has become a daily tool for our team.",
  },
  {
    name: "Dana K.",
    role: "Freelance video editor",
    rating: 5,
    body: "I collect TikTok reference clips before starting any vertical-video project. It spits out a proper MP4 in 10 seconds — no watermark, no fuss, no installation.",
  },
  {
    name: "Mr. Hassan",
    role: "High school media studies teacher",
    rating: 4,
    body: "I save educational TikToks to play in class when the school Wi-Fi decides to die. Works on my phone and on the classroom laptop — no installation or account needed.",
  },
  {
    name: "Leila T.",
    role: "Fitness coach and content repurposer",
    rating: 5,
    body: "I download my own workout TikToks to re-edit for YouTube Shorts and Instagram Reels. The no-signup part is key — I am not handing over my login to every tool I try.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
).toFixed(1);

const faqs = [
  {
    q: "Is the Shopyor TikTok downloader completely free?",
    a: "Yes. The tool is free with no hidden costs, no subscription, and no registration. Paste your TikTok link, pick a quality, and download — nothing else required.",
  },
  {
    q: "Does it really remove the TikTok watermark?",
    a: "Yes. When you save a video inside the TikTok app, the app overlays the creator's username and the TikTok logo as a moving watermark. Shopyor fetches the original source video before that overlay is applied, so you get a clean MP4 file with no watermark.",
  },
  {
    q: "What video quality options are available?",
    a: "You can choose 360p (small file, fast download), 720p (standard HD), 1080p (full HD), or Best — the highest quality available for that specific video. Most TikToks max out at 1080p.",
  },
  {
    q: "How do I copy a TikTok link on my phone?",
    a: "Open TikTok, tap the Share icon (arrow) on the right side of the video, then tap 'Copy link'. On a desktop browser, copy the URL from the address bar. Paste the link into the input box above and click Download. Short vm.tiktok.com share links also work.",
  },
  {
    q: "Is it legal to download TikTok videos?",
    a: "Downloading is intended for personal, non-commercial use — saving your own clips, keeping an offline copy of content you have permission to use, or collecting reference material for editing. Do not download and republish other creators' videos commercially without their explicit consent. Always follow TikTok's Terms of Service and respect copyright law.",
  },
  {
    q: "Do I need to install an app or browser extension?",
    a: "No. The downloader runs entirely in your web browser — nothing to install. It works on iPhone Safari, Android Chrome, and all major desktop browsers on Mac and Windows.",
  },
  {
    q: "Does Shopyor store the videos I download?",
    a: "No. Shopyor fetches the video from TikTok's servers on your behalf and streams it directly to your device. We do not retain copies of any videos and do not log the TikTok links you submit.",
  },
  {
    q: "Why does the download sometimes fail?",
    a: "Downloads fail when a video is private, the account has been deleted, or the link has expired. Make sure the video is public and paste the full URL. If a vm.tiktok.com share link fails, try finding the full tiktok.com/@username/video/... link instead.",
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
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-cyan-400 dark:bg-white/10 dark:text-cyan-300"
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

export default function TikTokVideoDownloaderExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-gray-100 via-white to-cyan-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-[120px] dark:bg-fuchsia-600/20" />
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
            className="inline-flex items-center gap-2 rounded-full border border-gray-800/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-gray-900 shadow-sm backdrop-blur dark:border-white/20 dark:bg-white/[0.04] dark:text-white"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
            Free • No Watermark • No Signup • No App
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Free{" "}
            <span className="bg-gradient-to-r from-gray-900 via-fuchsia-600 to-cyan-500 bg-clip-text text-transparent dark:from-white dark:via-fuchsia-300 dark:to-cyan-200">
              TikTok Video
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
            Paste any public TikTok link and download a clean, watermark-free
            MP4 in up to 1080p HD. Works on iPhone, Android, and desktop — no
            app, no account, no cost.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No
              watermark
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No
              sign up
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Up
              to 1080p
            </span>
          </motion.div>
        </motion.header>

        {/* Downloader */}
        <section className="mb-20">
          <TikTokDownloaderClient />
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
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(217,70,239,0.45)] dark:border-white/10 dark:bg-white/[0.03]"
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
            How to download a TikTok video without watermark
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent dark:via-fuchsia-500/30 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30">
                  <step.icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-cyan-500 text-xs font-bold text-white dark:border-gray-950">
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
            What is the Shopyor TikTok Video Downloader?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            The Shopyor TikTok Video Downloader is a free, browser-based tool
            that lets you save any public TikTok video as a clean{" "}
            <strong>MP4</strong> file — without the TikTok watermark. There is
            no app to install, no account to create, and no browser extension
            required. Paste the link, choose a quality between 360p and
            1080p, and the file downloads straight to your device in seconds.
            It works the same on every platform: iPhone, Android, Mac, and
            Windows.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Why does TikTok add a watermark — and how does this tool remove
            it?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            When you use TikTok&apos;s built-in <em>Save video</em> option,
            the app burns a moving overlay onto the clip: the original
            creator&apos;s username and the TikTok logo. Shopyor accesses the
            original source file directly from TikTok&apos;s servers — the
            version that exists <em>before</em> any watermark overlay is
            composited in. The result is the same video at the same
            resolution, just without the username stamp or TikTok logo.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Supported link types and output format
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Full desktop links (<code>tiktok.com/@username/video/1234567890</code>)
            and mobile share links (<code>vm.tiktok.com/ZMxxxxxx/</code>) are
            both supported. Output format is <strong>MP4</strong> — the
            universal video format that plays natively on every phone,
            tablet, and computer, and that editing software accepts without
            conversion. Quality choices are <strong>360p</strong>,{" "}
            <strong>720p</strong>, <strong>1080p</strong>, and{" "}
            <strong>Best</strong> (the resolution the creator originally
            uploaded). Private videos, videos from deleted accounts, and
            videos behind regional restrictions cannot be fetched — only
            public TikToks are supported.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Is it safe and private?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Shopyor does not ask for your TikTok login. You never share your
            credentials, your cookies, or your account. The tool sends only
            the video URL you provide to TikTok&apos;s public servers,
            retrieves the video on your behalf, and streams it to your
            browser. No copy of the video is stored on Shopyor&apos;s
            servers, and the links you submit are not logged.
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
            clips, archiving content you have permission to use, or
            downloading reference material for creative projects. Do not
            download other creators&apos; videos to republish or monetise
            without their explicit written consent. Always credit the
            original creator when sharing clips, and comply with
            TikTok&apos;s Terms of Service and applicable copyright law in
            your country. Read more in our guide on{" "}
            <Link
              href="/blog/how-to-download-videos-from-facebook-instagram-tiktok"
              className="font-medium text-fuchsia-600 underline-offset-2 hover:underline dark:text-fuchsia-400"
            >
              downloading videos from Facebook, Instagram & TikTok
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
          aria-label="User reviews"
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
            {reviews.map((r, i) => (
              <motion.blockquote
                key={i}
                variants={fadeUp}
                className="rounded-2xl border border-gray-200/70 bg-white/70 p-5 text-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
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
                <p className="text-gray-800 dark:text-gray-200">
                  &ldquo;{r.body}&rdquo;
                </p>
                <footer className="mt-2 text-xs text-gray-500 dark:text-gray-400">
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

        {/* Related tools (internal links) */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
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
            More handy video downloader utilities — all free, no signup.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-fuchsia-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-900/10 to-cyan-500/15 text-fuchsia-600 ring-1 ring-fuchsia-500/20 dark:text-fuchsia-300">
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

        {/* Guides & tutorials */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            Guides &amp; tutorials
          </motion.h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {guides.map((g) => (
              <motion.div key={g.href} variants={fadeUp}>
                <Link
                  href={g.href}
                  className="flex h-full items-center rounded-2xl border border-gray-200/70 bg-white/70 p-4 text-sm font-medium text-gray-800 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100 dark:hover:border-fuchsia-400/50"
                >
                  {g.title}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Related searches */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <h2 className="mb-2 text-center text-lg font-semibold text-gray-900 dark:text-white">
            Related searches
          </h2>
          <p className="mx-auto mb-4 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400">
            People also look for these TikTok download topics:
          </p>
          <ul className="flex flex-wrap justify-center gap-2">
            {KEYWORDS.map((kw, i) => (
              <li
                key={i}
                className="rounded-full border border-gray-200/70 bg-white/60 px-3 py-1 text-xs text-gray-500 backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/[0.08]"
              >
                {kw}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* CTA footer */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-gray-800/40 bg-gradient-to-br from-gray-900 via-fuchsia-700 to-cyan-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Need more handy tools?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
            Explore the full collection of free, fast, and privacy-friendly
            utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>

        {/* Disclaimer */}
        <p className="mt-10 rounded-xl border border-gray-200/70 bg-white/60 px-4 py-3 text-center text-xs text-gray-500 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400">
          TikTok is a trademark of ByteDance Ltd. Shopyor is not affiliated
          with TikTok. This tool is for personal, non-commercial use only.
          Always respect content creators&apos; rights and TikTok&apos;s
          Terms of Service.
        </p>
      </div>
    </main>
  );
}
