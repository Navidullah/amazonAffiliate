// app/blog/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Download,
  Youtube,
  Music2,
  TrendingUp,
  BookOpen,
  Newspaper,
  Facebook,
  FileX,
} from "lucide-react";

const categories = [
  "All",
  "Video Downloading",
  "Facebook Tips",
  "YouTube Tips",
  "TikTok Tips",
  "SEO",
  "Tutorials",
  "General",
];

/* Visual identity per category (no cover images in the model) */
const CATEGORY_STYLE = {
  "Video Downloading": { gradient: "from-blue-600 to-purple-600", Icon: Download },
  "Facebook Tips": { gradient: "from-blue-600 to-blue-400", Icon: Facebook },
  "YouTube Tips": { gradient: "from-red-600 to-orange-500", Icon: Youtube },
  "TikTok Tips": { gradient: "from-gray-900 to-gray-600", Icon: Music2 },
  SEO: { gradient: "from-violet-500 to-indigo-600", Icon: TrendingUp },
  Tutorials: { gradient: "from-emerald-500 to-teal-600", Icon: BookOpen },
  General: { gradient: "from-cyan-500 to-blue-600", Icon: Newspaper },
};

const styleFor = (category) =>
  CATEGORY_STYLE[category] || {
    gradient: "from-cyan-500 to-blue-600",
    Icon: Newspaper,
  };

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, selectedCategory, searchQuery]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 9,
        ...(selectedCategory !== "All" && { category: selectedCategory }),
        ...(searchQuery && { search: searchQuery }),
      });

      const response = await fetch(`/api/blog?${params}`);
      const data = await response.json();

      if (response.ok) {
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background py-16 px-4">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Shopyor Blog
            </span>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Tips, Tutorials &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Guides
            </span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Everything about downloading videos from social media — plus SEO,
            tutorials, and creator tips.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="w-full rounded-2xl border bg-card/70 py-3.5 pl-12 pr-24 backdrop-blur-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </div>
        </form>

        {/* Categories */}
        <div className="mb-10 flex flex-nowrap justify-start gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border bg-card"
              >
                <div className="h-28 animate-pulse bg-muted" />
                <div className="space-y-3 p-6">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/40 py-16 text-center">
            <FileX className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-semibold">No blog posts found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
          </div>
        ) : (
          <>
            <motion.div
              key={`${selectedCategory}-${searchQuery}-${currentPage}`}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {blogs.map((blog) => {
                const { gradient, Icon } = styleFor(blog.category);
                return (
                  <motion.div key={blog._id} variants={fadeUp}>
                    <Link href={`/blog/${blog.slug}`} className="group block h-full">
                      <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl">
                        {/* Gradient banner */}
                        <div
                          className={`relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}
                        >
                          <Icon className="h-12 w-12 text-white/90 transition-transform duration-300 group-hover:scale-110" />
                          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl" />
                          <span className="absolute bottom-3 left-4 rounded-full bg-black/25 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                            {blog.category}
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          {/* Title */}
                          <h2 className="mb-2 line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
                            {blog.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="mb-4 line-clamp-3 flex-1 text-muted-foreground">
                            {blog.excerpt}
                          </p>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(blog.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{blog.readingTime} min read</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{blog.views} views</span>
                            </div>
                          </div>

                          {/* Footer: author + read more */}
                          <div className="mt-4 flex items-center justify-between border-t pt-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-[11px] font-bold text-white`}
                              >
                                {(blog.author || "A").charAt(0).toUpperCase()}
                              </span>
                              <span className="text-xs font-medium text-muted-foreground">
                                {blog.author || "Admin"}
                              </span>
                            </div>
                            <span className="flex items-center gap-1 text-xs font-semibold text-primary transition-all group-hover:gap-2">
                              Read <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="rounded-lg border p-2 transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-9 rounded-lg px-3 py-1 text-sm font-medium transition-all ${
                          currentPage === page
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md"
                            : "hover:bg-muted"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="rounded-lg border p-2 transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
