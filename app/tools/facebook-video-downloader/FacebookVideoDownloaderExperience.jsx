"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Clapperboard,
  Download,
  Film,
  Layers,
  Lock,
  MousePointerClick,
  Sparkles,
  Star,
  Video,
  Wand2,
  Zap,
} from "lucide-react";
import FacebookVideoDownloaderClient from "./client";

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
    icon: Zap,
    title: "No Login Required",
    desc: "Paste a public Facebook video or Reel link and download instantly — no Facebook account needed.",
    accent: "from-blue-500 to-sky-500",
  },
  {
    icon: Film,
    title: "HD & SD Quality",
    desc: "Choose HD (720p–1080p) for the best picture or SD for a smaller, data-friendly file.",
    accent: "from-blue-600 to-indigo-500",
  },
  {
    icon: Lock,
    title: "Private & Ad-Free",
    desc: "No app, no browser extension, no stored videos. We never see or keep your Facebook login.",
    accent: "from-sky-500 to-cyan-500",
  },
];

const steps = [
  {
    icon: Clapperboard,
    title: "Copy the video link",
    desc: "Tap the three-dot menu on the post and choose Copy link, or copy the URL from your address bar on desktop.",
  },
  {
    icon: MousePointerClick,
    title: "Paste & analyze",
    desc: "Paste the link into the box above and click Analyze Video to fetch the available qualities.",
  },
  {
    icon: Download,
    title: "Download the MP4",
    desc: "Pick HD or SD and download — the file saves straight to your phone or computer.",
  },
];

const relatedTools = [
  {
    icon: Video,
    label: "Instagram Video Downloader",
    href: "/tools/instagram-video-downloader",
  },
  {
    icon: Layers,
    label: "TikTok Video Downloader",
    href: "/tools/free-tiktok-video-downloader",
  },
  {
    icon: Wand2,
    label: "Video Downloader (all platforms)",
    href: "/tools/video-downloader",
  },
  {
    icon: ArrowRight,
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
  "facebook video downloader no login",
  "download facebook video without app",
  "save facebook video to phone without app",
  "facebook reel downloader no signup",
  "how to download facebook video without login",
  "download facebook reels to gallery",
  "save facebook video to iphone camera roll",
  "facebook video downloader android free",
  "download public facebook video free",
  "facebook mp4 downloader free",
  "facebook reel saver online free",
  "how to save facebook reels offline",
  "download facebook video without watermark",
  "facebook video downloader hd free",
  "how to download videos from facebook on phone",
  "save facebook live video download",
  "download facebook group video free",
  "facebook video download no software",
  "how to download facebook reels without app",
  "free facebook video saver online",
];

const faqs = [
  {
    q: "Is this Facebook video downloader completely free?",
    a: "Yes. The tool is free with no subscription, no hidden cost, and no account required. Paste any public Facebook video or Reel link and download — nothing else needed.",
  },
  {
    q: "Do I need to log in to Facebook to use this?",
    a: "No. Shopyor only accesses publicly available Facebook videos — the exact same content anyone can already view in a browser without logging in, the same way Google's crawler can index a public Facebook page without an account. You never share your Facebook username, password, session cookies, or any account data with this tool at any point, because the downloader never asks for them in the first place; it simply reads the public video URL you paste in. This also means the tool can't access anything from your own account, your friends list, or your private messages — it has no connection to your Facebook login at all, which is exactly why it works the same for every visitor regardless of whether they even have a Facebook account.",
  },
  {
    q: "Can I download private Facebook videos?",
    a: "No, and this is intentional rather than a limitation we plan to remove. Only public videos, public Reels, and videos shared on public pages or public groups are supported — the same content anyone could already watch without logging in. Private videos, anything behind a login wall, friends-only posts, and content inside closed or secret groups cannot be downloaded, because the tool never authenticates as a Facebook user and therefore never gains access to permission-gated content. If you try a private link, the tool will fail to fetch it rather than silently bypassing Facebook's privacy settings. This keeps the tool firmly on the right side of Facebook's terms of service and respects the original poster's chosen audience.",
  },
  {
    q: "What types of Facebook content can I download?",
    a: "You can download public Facebook video posts, Facebook Reels, Facebook Live replays (once the stream has ended and Facebook has finished processing the recording), and videos shared on public pages and public groups — covering the vast majority of shareable Facebook video content. Photo posts, Stories (which expire after 24 hours by design), and audio-only posts are not supported, since the tool is purpose-built for video files specifically. If a video was originally uploaded in HD, the downloader will offer that same HD quality; if the uploader only provided SD, that's the highest quality available to download, since the tool can't generate resolution that doesn't exist in the source file.",
  },
  {
    q: "How do I find the Facebook video link to paste here?",
    a: "On the Facebook mobile app: tap the three-dot menu in the top-right corner of the video post, then tap 'Copy link' — Facebook copies the full URL to your clipboard automatically. On a desktop browser: click the timestamp or date shown on the video post (for example, '3h' or 'June 12') to open the video on its own dedicated page, then copy the full URL from your browser's address bar. Both standard facebook.com video URLs and shortened fb.watch links work equally well — paste either format directly into the input box above and the tool will recognize it. If the link doesn't work, double-check the post is set to public, since the most common cause of a failed download is a private or friends-only video link.",
  },
  {
    q: "What video quality can I download?",
    a: "The tool offers HD and SD quality options for every supported video. HD is typically 720p or 1080p, matching whatever resolution the original uploader chose when they posted the video — Shopyor can't upscale a video beyond its source quality. SD is a noticeably smaller file size, generally a fraction of the HD version, which is useful if you're on a limited mobile data plan or want to save phone storage. You'll see the available quality options after the tool analyzes your pasted link, so you can compare the file sizes before committing to a download. For archiving or reposting where quality matters, HD is almost always the better choice if it's available.",
  },
  {
    q: "Do I need to install an app or browser extension?",
    a: "No — the entire downloader runs inside your existing web browser, with nothing to install on your phone, tablet, or computer and no browser extension to add. This is a deliberate design choice: app-based downloaders often require permissions you may not want to grant, and extensions can quietly track browsing activity across other sites, while a browser-based tool only runs when you have the page open. It works on iPhone Safari, Android Chrome, and all major desktop browsers including Chrome, Firefox, Edge, and Safari on Mac, so the same workflow works whether you're downloading from a phone between scrolling or from a laptop at a desk.",
  },
  {
    q: "Does Shopyor store the videos I download?",
    a: "No. Shopyor fetches the video directly from Facebook's own servers on your behalf for that single request and streams it straight to your browser for download — at no point does a copy sit on Shopyor's servers afterward. We do not retain copies of any videos you download, and we do not log or store the Facebook URLs you paste into the tool, so there's no history of what you've downloaded to later request or have exposed in a data breach. This matters particularly for anything you might consider sensitive, since the only record of your download exists on your own device, in your own downloads folder, exactly like a video you saved from any other website.",
  },
];

const reviews = [
  {
    name: "Tariq B.",
    role: "Small business owner",
    rating: 5,
    body: "I save product demo videos from our public Facebook page as backups before we archive old posts. No login prompt, no watermark — clean MP4 every time. Exactly what I needed.",
  },
  {
    name: "Mrs. Fatima K.",
    role: "High school teacher",
    rating: 5,
    body: "I download educational videos shared on public Facebook pages to play in class offline. The school Wi-Fi is unreliable and this saves us every time. Works on my laptop and phone.",
  },
  {
    name: "Emeka O.",
    role: "Sports blogger and fan content creator",
    rating: 5,
    body: "I archive match highlights from public sports pages before they get taken down. The HD quality option is real — the MP4 is genuinely sharp. No signup needed, which is a big plus.",
  },
  {
    name: "Laura P.",
    role: "Freelance journalist",
    rating: 4,
    body: "When covering local events I save public Facebook Live replays as evidence before pages delete them. This tool is the fastest I have used — paste, click, done in under 30 seconds.",
  },
  {
    name: "Yusuf A.",
    role: "Community event organizer",
    rating: 5,
    body: "I download videos from our public event pages to share with attendees who missed the livestream. No app to install means anyone on the committee can use it — not just the tech person.",
  },
];

const AVG_RATING = (
  reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
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

export default function FacebookVideoDownloaderExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/60 via-white to-sky-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-[120px] dark:bg-blue-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-sky-400/20 blur-[120px] dark:bg-sky-600/10" />

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
            Free • No Login • No App
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Free{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-500 bg-clip-text text-transparent dark:from-blue-300 dark:via-sky-300 dark:to-cyan-200">
              Facebook Video
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
            Paste any public Facebook video or Reel link and download a clean
            HD MP4 — no Facebook login, no app to install, no signup. Works on
            iPhone, Android, and desktop in seconds.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No login
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No app needed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> HD quality
            </span>
          </motion.div>
        </motion.header>

        {/* Tool */}
        <section className="mb-20">
          <Suspense>
            <FacebookVideoDownloaderClient />
          </Suspense>
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
            How to download a Facebook video
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No login, no software to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent dark:via-blue-500/30 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 text-white shadow-lg shadow-blue-500/30">
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
            What is the Shopyor Facebook Video Downloader?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            The Shopyor Facebook Video Downloader is a free, browser-based
            tool that saves public Facebook videos, Reels, and Live replays as
            MP4 files — without requiring you to log in to Facebook, install
            an app, or create any account. Paste the video link, choose HD or
            SD quality, and the file downloads directly to your device. The
            whole process takes under a minute. Most major Facebook
            downloader tools are bloated with ads or push you to install
            browser extensions. Shopyor has no ads, no extension, and no
            login wall — it is a single-page tool: paste, analyse, download.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            What types of Facebook content can you download?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            You can download public <strong>Facebook video posts</strong>,{" "}
            <strong>Facebook Reels</strong>, <strong>Facebook Live replays</strong>{" "}
            once the stream has ended, and videos shared on{" "}
            <strong>public groups</strong>. Private videos, friends-only
            posts, and videos behind a login wall are intentionally not
            supported — only content that is publicly accessible without a
            Facebook account can be downloaded. See our full guide on{" "}
            <Link
              href="/blog/how-to-download-videos-from-facebook-instagram-tiktok"
              className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
            >
              downloading videos from Facebook, Instagram & TikTok
            </Link>
            .
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Why doesn&apos;t Facebook let you save videos directly?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Facebook deliberately omits a native &ldquo;Save to device&rdquo;
            button on most videos. Its <em>Save</em> feature bookmarks the
            post inside the app — if the original post is deleted, your saved
            bookmark disappears with it. Shopyor fetches the same public
            source MP4 file Facebook uses to stream the video and delivers it
            directly to your browser, giving you a permanent copy on your
            device. Read more in{" "}
            <Link
              href="/blog/best-facebook-video-downloader-online-free-in-hd-shopyor"
              className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
            >
              the best Facebook video downloader online, free in HD
            </Link>
            .
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Is it safe? Do I need my Facebook login?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            No Facebook login is ever required. Shopyor only accesses the
            public URL you provide — the same content anyone can view in a
            browser without an account. You never enter your Facebook email,
            password, or any session token, and the tool does not store
            videos on its servers or log the URLs you submit. For a walkthrough
            covering Facebook and TikTok together, see{" "}
            <Link
              href="/blog/easy-guide-download-tiktok-facebook-videos-using-shopyor"
              className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
            >
              our easy guide to downloading TikTok & Facebook videos
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
            Rated {AVG_RATING} / 5 based on {reviews.length} reviews.
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
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  &ldquo;{r.body}&rdquo;
                </p>
                <footer className="mt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
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
            More handy download utilities — all free, no signup.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-blue-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-sky-500/15 text-blue-600 ring-1 ring-blue-500/20 dark:text-blue-300">
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

        {/* Guides */}
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
            {guides.map((link) => (
              <motion.div key={link.href} variants={fadeUp}>
                <Link
                  href={link.href}
                  className="group flex h-full items-center rounded-2xl border border-gray-200/70 bg-white/70 p-4 text-sm font-semibold text-gray-800 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100 dark:hover:border-blue-400/50"
                >
                  {link.title}
                </Link>
              </motion.div>
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
            className="text-center text-lg font-semibold text-gray-900 dark:text-white"
          >
            Related searches
          </motion.h2>
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-2"
          >
            {KEYWORDS.map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-gray-200/70 bg-white/60 px-3 py-1 text-xs text-gray-500 backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400"
              >
                {kw}
              </span>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA footer */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mb-10 overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-600 via-sky-600 to-cyan-500 p-8 text-center shadow-xl sm:p-10"
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

        {/* Disclaimer */}
        <p className="rounded-xl border border-gray-200/70 bg-white/60 px-4 py-3 text-center text-xs text-gray-500 backdrop-blur dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400">
          Facebook and Meta are trademarks of Meta Platforms, Inc. Shopyor is
          not affiliated with Facebook or Meta. This tool is for personal,
          non-commercial use only. Users are responsible for complying with
          Facebook&apos;s Terms of Service and applicable copyright law.
          Copyright concerns: shopyor.com@gmail.com.
        </p>
      </div>
    </main>
  );
}
