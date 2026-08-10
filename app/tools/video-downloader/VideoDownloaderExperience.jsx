"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap,
  ShieldCheck,
  Ban,
  LinkIcon,
  Search,
  Download,
  ImageDown,
  LayoutGrid,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const PLATFORMS = [
  {
    href: "/tools/facebook-video-downloader",
    name: "Facebook",
    icon: FaFacebook,
    gradient: "from-blue-600 to-blue-500",
    desc: "Save public Facebook videos, Reels, and Live replays as HD MP4.",
    bullets: ["Public videos & Reels", "Live replay support", "HD or SD quality"],
  },
  {
    href: "/tools/instagram-video-downloader",
    name: "Instagram",
    icon: FaInstagram,
    gradient: "from-fuchsia-600 to-rose-500",
    desc: "Download public Instagram Reels and videos in up to 1080p.",
    bullets: ["Reels & feed videos", "Up to 1080p", "No watermark added"],
  },
  {
    href: "/tools/free-tiktok-video-downloader",
    name: "TikTok",
    icon: FaTiktok,
    gradient: "from-slate-800 to-slate-600",
    desc: "Download TikTok videos without the platform's watermark.",
    bullets: ["No TikTok watermark", "HD quality", "Works on mobile & desktop"],
  },
];

const features = [
  {
    icon: Zap,
    title: "Fast",
    desc: "Paste, analyze, download in seconds — no waiting around.",
    accent: "from-indigo-500 to-blue-500",
  },
  {
    icon: ShieldCheck,
    title: "No login required",
    desc: "Only public links, ever. We never ask for your account credentials.",
    accent: "from-fuchsia-500 to-violet-500",
  },
  {
    icon: Ban,
    title: "No app needed",
    desc: "Runs entirely in your browser on mobile and desktop.",
    accent: "from-cyan-500 to-teal-500",
  },
];

const steps = [
  {
    icon: LinkIcon,
    title: "Copy the link",
    desc: "Copy the public video URL from Facebook, Instagram, or TikTok.",
  },
  {
    icon: Search,
    title: "Pick the platform",
    desc: "Choose the matching downloader below — each one is purpose-built for that site.",
  },
  {
    icon: Download,
    title: "Download the MP4",
    desc: "Paste the link, analyze, and save a clean video to your device.",
  },
];

const relatedTools = [
  {
    icon: ImageDown,
    label: "Compress an image",
    href: "/tools/image-compressor",
  },
  {
    icon: LayoutGrid,
    label: "Browse all free tools",
    href: "/tools",
  },
];

const faqs = [
  {
    q: "Which video downloader should I use?",
    a: "Pick the tool that matches where the video was posted: use the Facebook downloader for facebook.com or fb.watch links, the Instagram downloader for instagram.com Reels or post links, and the TikTok downloader for tiktok.com links. Each tool is purpose-built to read that platform's link format and video player, so pasting a Facebook link into the TikTok tool (or vice versa) will not work — always match the tool to the site the video is actually hosted on.",
  },
  {
    q: "Is this video downloader really free?",
    a: "Yes. All three downloaders — Facebook, Instagram, and TikTok — are free with no subscription, no daily download limit, and no account required. Paste a public video link into the matching tool and download the MP4 directly. There is no premium tier or paywall hidden behind a 'free trial'.",
  },
  {
    q: "Do I need to log in or install an app?",
    a: "No. None of the three downloaders require you to log in to Facebook, Instagram, or TikTok, and none require installing an app or browser extension. Everything runs inside your existing browser tab — paste the link, wait a few seconds while it analyzes the video, then download. This works the same on iPhone Safari, Android Chrome, and desktop browsers.",
  },
  {
    q: "Can I download private videos or posts?",
    a: "No, and this is intentional. Only public content — videos anyone could already view without logging in — can be downloaded. Private accounts, friends-only posts, and content behind a login wall are not supported on any of the three platforms, because none of these tools authenticate as a user on your behalf. This keeps the tools on the right side of each platform's terms of service.",
  },
  {
    q: "Does the TikTok downloader remove the watermark?",
    a: "Yes. The TikTok downloader fetches the original, unwatermarked source file where TikTok makes it available, instead of the watermarked version served in the app's share sheet. Some very short or already-processed clips may still carry TikTok's own on-video watermark if that is the only version TikTok exposes, but in the vast majority of cases you get a clean MP4.",
  },
  {
    q: "What video quality can I expect?",
    a: "Facebook and Instagram downloads offer HD and SD options, typically 720p–1080p depending on what the original uploader posted — none of these tools can upscale beyond the source quality. TikTok downloads default to the highest quality TikTok's own servers provide for that clip. You'll see the available options after pasting the link and before downloading.",
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

export default function VideoDownloaderExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-[120px] dark:bg-indigo-600/20" />
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
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur dark:border-indigo-500/20 dark:bg-white/[0.04] dark:text-indigo-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Free • No login • No app
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Free{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-fuchsia-200">
              Video Downloader
            </span>{" "}
            — Facebook, Instagram &amp; TikTok
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Pick the platform your video is on and we&apos;ll take you to the
            right tool. No login, no app to install, no watermark added —
            just paste the link and download.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No sign up
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Public links only
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Works on mobile & desktop
            </span>
          </motion.div>
        </motion.header>

        {/* Platform picker */}
        <motion.section
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-20 grid gap-5 sm:grid-cols-1"
          aria-label="Choose a platform"
        >
          {PLATFORMS.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.href} variants={fadeUp}>
                <Link
                  href={p.href}
                  className="group flex items-center gap-4 rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_24px_64px_-30px_rgba(56,89,255,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
                >
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${p.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-bold text-gray-900 dark:text-white">
                      {p.name} Video Downloader
                    </span>
                    <span className="block text-sm text-gray-600 dark:text-gray-400">
                      {p.desc}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                      {p.bullets.map((b) => (
                        <span key={b}>• {b}</span>
                      ))}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500" />
                </Link>
              </motion.div>
            );
          })}
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
            How to download a video
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
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30">
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
            One hub, three downloaders
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Shopyor runs a separate, purpose-built downloader for each
            platform instead of one tool trying to handle every link format.
            That means each downloader is tuned to how that specific platform
            serves its video files — Facebook Reels and Live replays,
            Instagram Reels and feed videos, and TikTok clips with the
            watermark stripped where possible. This page exists to route you
            to the right one quickly.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            How to choose the right downloader
          </motion.h3>
          <motion.ul
            variants={fadeUp}
            className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>
              <strong>Facebook</strong> — use this for links starting with{" "}
              <code>facebook.com</code> or the shortened <code>fb.watch</code>{" "}
              format, including public videos, Reels, and ended Live replays.
            </li>
            <li>
              <strong>Instagram</strong> — use this for{" "}
              <code>instagram.com</code> Reel and post links from public
              accounts.
            </li>
            <li>
              <strong>TikTok</strong> — use this for <code>tiktok.com</code>{" "}
              links; it fetches the version without TikTok&apos;s in-app
              watermark where the source allows it.
            </li>
          </motion.ul>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Is it safe?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            None of the three tools ask for your account login on any
            platform. They only read the public video URL you paste in — the
            same content anyone could already view in a browser without an
            account — and none of them store a copy of the video or log the
            links you submit after the download completes.
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
            These tools are intended for{" "}
            <strong>personal, non-commercial use</strong>: saving your own
            videos, archiving public content you have permission to keep, or
            downloading reference material for creative projects. Do not
            redistribute other creators&apos; content commercially or claim
            ownership of downloaded videos. Always follow the source
            platform&apos;s Terms of Service and applicable copyright law.
            Copyright concerns: <strong>shopyor.com@gmail.com</strong>.
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
            More free tools
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
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-indigo-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/15 text-indigo-600 ring-1 ring-indigo-500/20 dark:text-indigo-300">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tool.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-500" />
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
          className="mb-10 rounded-2xl border border-gray-200/70 bg-white/70 px-4 py-3 text-xs text-gray-500 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400"
        >
          Facebook, Instagram, and TikTok are trademarks of their respective
          owners. Shopyor is not affiliated with Meta Platforms, Inc. or
          TikTok. These tools are for personal, non-commercial use only.
          Users are responsible for complying with each platform&apos;s Terms
          of Service and applicable copyright law.
        </motion.p>

        {/* CTA footer */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-indigo-200/50 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 p-8 text-center shadow-xl sm:p-10"
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
