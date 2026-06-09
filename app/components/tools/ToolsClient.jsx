"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Image as ImgIcon,
  Wand2,
  Scissors,
  Link2,
  Activity,
  Wand,
  Youtube,
  FileText,
  Tag,
  File,
  Video,
  Search,
  ArrowRight,
  Sparkles,
  SearchX,
  Paintbrush,
  FileUser,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

/* ======================================================
   MOTION HELPERS
====================================================== */
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* Per-category gradient for the icon tile */
const CATEGORY_GRADIENT = {
  "video downloader": "from-blue-600 to-purple-600",
  Image: "from-pink-500 to-rose-500",
  File: "from-amber-500 to-orange-500",
  Marketing: "from-green-500 to-emerald-600",
  Health: "from-teal-500 to-cyan-600",
  PDF: "from-red-500 to-rose-600",
  YouTube: "from-red-600 to-orange-500",
  SEO: "from-violet-500 to-indigo-600",
  Media: "from-fuchsia-500 to-cyan-500",
  Career: "from-violet-600 to-fuchsia-600",
};

const gradientFor = (category) =>
  CATEGORY_GRADIENT[category] || "from-cyan-500 to-blue-600";

export default function ToolsClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const tools = [
    {
      href: "/tools/facebook-video-downloader",
      title: "Download facebook videos",
      desc: "Free download the facebook reels and videos",
      icon: FaFacebook,
      category: "video downloader",
    },
    {
      href: "/tools/youtube-video-downloader",
      title: "Download youtube videos",
      desc: "Free download the youtube reels and videos",
      icon: FaYoutube,
      category: "video downloader",
    },
    // Add TikTok downloader to your tools array
    {
      href: "/tools/free-tiktok-video-downloader",
      title: "TikTok Video Downloader",
      desc: "Download TikTok videos without watermark in HD quality",
      icon: FaTiktok,
      category: "video downloader",
    },
    {
      href: "/tools/instagram-video-downloader",
      title: "Instagram Video Downloader",
      desc: "Download public Instagram reels and videos easily",
      icon: FaInstagram,
      category: "video downloader",
    },
    {
      href: "/tools/video-to-gif",
      title: "Convert Video to Gif",
      desc: "Convert and download your video to GIF using video to GIF converter at Shopyor",
      icon: Video,
      category: "video downloader",
    },
    {
      href: "/tools/whiteboard-animation",
      title: "Whiteboard Animation Maker",
      desc: "Turn any image into a hand-drawn speed-paint animation and export it as video or GIF.",
      icon: Paintbrush,
      category: "Media",
    },
    {
      href: "/tools/resume-builder",
      title: "Resume Builder",
      desc: "Build a modern, professional resume with premium templates and export a print-perfect PDF.",
      icon: FileUser,
      category: "Career",
    },
    {
      href: "/tools/image-compressor",
      title: "Online Image Compressor",
      desc: "Compress images without losing visual quality.",
      icon: ImgIcon,
      category: "Image",
    },
    {
      href: "/tools/image-resizer",
      title: "Online Image resizer",
      desc: "Reduce or resize the sie of images without losing visual quality.",
      icon: ImgIcon,
      category: "Image",
    },
    {
      href: "/tools/exif-remover",
      title: "EXIF Metadata Remover",
      desc: "Remove hidden metadata from images for privacy.",
      icon: Scissors,
      category: "File",
    },
    {
      href: "/tools/bg-remover",
      title: "HD Background Remover (High Quality)",
      desc: "Get clean, transparent PNG images in high resolution.",
      icon: Wand2,
      category: "Image",
    },
    {
      href: "/tools/affiliate-link-generator",
      title: "Affiliate Link Generator Tool",
      desc: "Create clean and trackable affiliate links easily.",
      icon: Link2,
      category: "Marketing",
    },
    {
      href: "/tools/bmi",
      title: "Free BMI Calculator",
      desc: "Calculate your body mass index instantly online.",
      icon: Activity,
      category: "Health",
    },
    {
      href: "/tools/background-remover-image",
      title: "Free AI Image Background Remover",
      desc: "Remove image backgrounds instantly with AI precision.",
      icon: Wand,
      category: "Image",
    },
    {
      href: "/tools/online-pdf-to-word-converter",
      title: "PDF to Word Converter Online",
      desc: "Convert PDF files to editable Word documents instantly.",
      icon: FileText,
      category: "PDF",
    },
    {
      href: "/tools/youtube-thumbnail",
      title: "Youtube Thumbnail Downloader",
      desc: "Download high-quality thumbnails from any YouTube video.",
      icon: Youtube,
      category: "YouTube",
    },
    {
      href: "/tools/youtube-tags",
      title: "YouTube Tags Extractor",
      desc: "Extract tags from any YouTube video instantly.",
      icon: Youtube,
      category: "YouTube",
    },
    {
      href: "/tools/pdf-compressor",
      title: "PDF Compressor",
      desc: "Reduce PDF file size for email and uploads — fast, secure compression.",
      icon: FileText,
      category: "PDF",
    },
    {
      href: "/tools/meta-tag-generator",
      title: "Meta Tag Generator Tool for SEO",
      desc: "Meta tags help search engines understand your webpage content.",
      icon: Tag,
      category: "SEO",
    },
    {
      href: "/tools/robots-txt-generator",
      title: "Robots.txt File Generator for SEO",
      desc: "Robots.txt improves crawl efficiency and overall SEO health.",
      icon: File,
      category: "SEO",
    },
  ];

  const categories = [
    "All",
    "Image",
    "Media",
    "Career",
    "Health",
    "Marketing",
    "File",
    "SEO",
    "PDF",
    "YouTube",
  ];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "All" || tool.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="relative min-h-screen overflow-hidden pb-20 pt-24 sm:pt-28">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        {/* ── Header ── */}
        <motion.header
          className="mx-auto mb-10 max-w-2xl text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              {tools.length}+ Free Online Tools
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Free Online Tools by{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Shopyor
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 text-base sm:text-lg text-muted-foreground"
          >
            Modern, secure, browser-based utilities to download videos, edit
            images, convert PDFs, and boost your SEO — all free, no sign-up.
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeUp} className="relative mt-7">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search tools"
              className="w-full rounded-2xl border border-border bg-card/70 py-3.5 pl-12 pr-4 text-sm backdrop-blur-md outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
          </motion.div>

          {/* Category Tabs — scrollable on mobile, wraps on larger screens */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                    : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.header>

        {/* Result count */}
        <p className="mb-5 text-center text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredTools.length}
          </span>{" "}
          {filteredTools.length === 1 ? "tool" : "tools"}
          {category !== "All" && (
            <>
              {" "}
              in{" "}
              <span className="font-semibold text-foreground">{category}</span>
            </>
          )}
        </p>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <motion.section
            key={`${category}-${search}`}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {filteredTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <motion.div key={tool.href + idx} variants={fadeUp}>
                  <Link
                    href={tool.href}
                    className="group relative flex h-full flex-col rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`shrink-0 rounded-xl bg-gradient-to-br ${gradientFor(
                          tool.category,
                        )} p-3 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className="min-w-0">
                        <h2 className="font-semibold text-base sm:text-lg leading-snug">
                          {tool.title}
                        </h2>
                        <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {tool.category}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 flex-1 text-sm text-muted-foreground">
                      {tool.desc}
                    </p>

                    <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                      Open Tool <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.section>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 py-16 text-center">
            <SearchX className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-semibold">No tools found</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
