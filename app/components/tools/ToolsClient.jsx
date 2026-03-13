"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

export default function ToolsClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const tools = [
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
      href: "/tools/pdf-to-word",
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
      href: "/tools/pdf-compress",
      title: "PDF Compressor ( Node.Js )",
      desc: "Reduce PDF file size quickly using modern compression.",
      icon: FileText,
      category: "PDF",
    },
    {
      href: "/tools/pdf-compressor",
      title: "PDF Compressor ( Python API )",
      desc: "Compress PDF files securely with advanced API processing.",
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
    <main className="relative min-h-screen pb-16 pt-28 max-w-6xl mx-auto px-4">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-200/30 via-blue-200/20 to-purple-200/30 dark:from-cyan-900/20 dark:via-blue-900/20 dark:to-purple-900/20 animate-[pulse_8s_ease-in-out_infinite]" />

      <header className="max-w-3xl mb-8">
        <h1 className="text-3xl font-bold">Free Online Tools</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Modern browser-based tools to boost your workflow.
        </p>

        {/* Search */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-white/10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md focus:ring-2 focus:ring-cyan-400 outline-none transition"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full cursor-pointer text-sm transition ${
                category === cat
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <Link
              key={idx}
              href={tool.href}
              className="group relative rounded-2xl border border-gray-200 dark:border-white/10 p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/60 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-cyan-100 dark:bg-cyan-900 p-3 group-hover:scale-110 transition">
                  <Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>

                <div>
                  <h2 className="font-semibold text-lg">{tool.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tool.desc}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
