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
} from "lucide-react";

export default function ToolsClient() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const tools = [
    {
      href: "/tools/image-compressor",
      title: "Image Compressor",
      desc: "Reduce image size without losing quality.",
      icon: ImgIcon,
      category: "Image",
    },
    {
      href: "/tools/exif-remover",
      title: "EXIF Remover",
      desc: "Remove photo metadata instantly.",
      icon: Scissors,
      category: "Image",
    },
    {
      href: "/tools/bg-remover",
      title: "Background Remover",
      desc: "Remove backgrounds in seconds.",
      icon: Wand2,
      category: "Image",
    },
    {
      href: "/tools/affiliate-link-generator",
      title: "Affiliate Link Generator",
      desc: "Generate clean affiliate links.",
      icon: Link2,
      category: "Marketing",
    },
    {
      href: "/tools/bmi",
      title: "BMI Calculator",
      desc: "Instant BMI calculator.",
      icon: Activity,
      category: "Health",
    },
    {
      href: "/tools/background-remover-image",
      title: "AI Background Remover",
      desc: "AI-powered background removal.",
      icon: Wand,
      category: "Image",
    },
    {
      href: "/tools/pdf-to-word",
      title: "Convert PDF file to Word file",
      desc: "PDF to WORD API using Python code.",
      icon: FileText,
      category: "Image",
    },
    {
      href: "/tools/youtube-thumbnail",
      title: "Youtube Thumbnail Downloader",
      desc: "Here You Can Easily Download Thumbnails",
      icon: Youtube,
      category: "Image",
    },
    {
      href: "/tools/youtube-tags",
      title: "Youtube Tags Downloader Tool",
      desc: "Download Youtube Tags Here You are At Right Place",
      icon: Youtube,
      category: "Image",
    },
    {
      href: "/tools/pdf-compress",
      title: "PDF Compressor By Using Node.Js",
      desc: "This Tool is very important for reducing the size of PDF file",
      icon: FileText,
      category: "Image",
    },
    {
      href: "/tools/pdf-compress",
      title: "PDF Compressor By Using Node.Js",
      desc: "This Tool is very important for reducing the size of PDF file",
      icon: FileText,
      category: "Image",
    },
  ];

  const categories = ["All", "Image", "Health", "Marketing"];

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
              className={`px-4 py-1.5 rounded-full text-sm transition ${
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
