// app/blog/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import {
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  ArrowRight,
  Tag,
  Twitter,
  Facebook,
  Linkedin,
  Download,
  Youtube,
  Music2,
  TrendingUp,
  BookOpen,
  Newspaper,
} from "lucide-react";

/* Visual identity per category (matches the blog list page) */
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

export default function SingleBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (params.slug) {
      fetchBlog();
    }
  }, [params.slug]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blog/${params.slug}`);
      const data = await response.json();

      if (response.ok) {
        setBlog(data);
        // Fetch related blogs
        fetchRelatedBlogs(data.category, data._id);
      } else {
        router.push("/blog");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (category, currentId) => {
    try {
      const response = await fetch(`/api/blog?category=${category}&limit=3`);
      const data = await response.json();
      const filtered = data.blogs.filter((b) => b._id !== currentId);
      setRelatedBlogs(filtered.slice(0, 3));
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`,
      "_blank",
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      "_blank",
    );
  };

  const shareOnLinkedin = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`,
      "_blank",
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) return null;

  const { gradient, Icon } = styleFor(blog.category);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Reading progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
      />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden border-b">
        <div
          className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} opacity-10`}
        />
        <div
          className={`pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl`}
        />

        <div className="container mx-auto max-w-4xl px-4 pt-10 pb-12">
          {/* Back Button */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Category */}
            <div className="mb-5 flex justify-center">
              <span
                className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-4 py-1.5 text-sm font-medium text-white shadow-md`}
              >
                <Icon className="h-4 w-4" />
                {blog.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            {/* Author + Meta Info */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-xs font-bold text-white`}
                >
                  {(blog.author || "A").charAt(0).toUpperCase()}
                </span>
                <span className="font-medium text-foreground">
                  {blog.author || "Admin"}
                </span>
              </div>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{blog.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{blog.views} views</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Blog Content */}
        <article
          className="prose prose-base md:prose-lg dark:prose-invert max-w-none mb-12
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:leading-relaxed prose-p:text-foreground/90
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:bg-muted/40 prose-blockquote:rounded-r-lg prose-blockquote:py-1
            prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-pre:bg-muted prose-pre:border prose-pre:rounded-xl
            prose-img:rounded-xl prose-img:shadow-md
            prose-table:text-sm prose-th:bg-muted/60 prose-td:border prose-th:border"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-2 border-t pt-6">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share Buttons */}
        <div className="mb-12 flex flex-wrap items-center gap-3 rounded-2xl border bg-card/60 p-5 backdrop-blur-sm">
          <span className="text-sm font-semibold">Share this article</span>
          <div className="flex items-center gap-2">
            <button
              onClick={shareOnTwitter}
              aria-label="Share on Twitter"
              className="rounded-full bg-muted p-2.5 transition-all hover:scale-110 hover:bg-[#1DA1F2] hover:text-white"
            >
              <Twitter className="h-4 w-4" />
            </button>
            <button
              onClick={shareOnFacebook}
              aria-label="Share on Facebook"
              className="rounded-full bg-muted p-2.5 transition-all hover:scale-110 hover:bg-[#4267B2] hover:text-white"
            >
              <Facebook className="h-4 w-4" />
            </button>
            <button
              onClick={shareOnLinkedin}
              aria-label="Share on LinkedIn"
              className="rounded-full bg-muted p-2.5 transition-all hover:scale-110 hover:bg-[#0077B5] hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div>
            <h2 className="mb-6 text-2xl font-bold">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedBlogs.map((related) => {
                const rs = styleFor(related.category);
                return (
                  <Link
                    key={related._id}
                    href={`/blog/${related.slug}`}
                    className="group block"
                  >
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                      <div
                        className={`flex h-16 items-center gap-2 bg-gradient-to-br ${rs.gradient} px-4`}
                      >
                        <rs.Icon className="h-5 w-5 text-white/90" />
                        <span className="text-xs font-medium text-white/90">
                          {related.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <h3 className="mb-2 line-clamp-2 font-semibold transition-colors group-hover:text-primary">
                          {related.title}
                        </h3>
                        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                          {related.excerpt}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {related.readingTime} min read
                          </span>
                          <span className="flex items-center gap-1 font-semibold text-primary transition-all group-hover:gap-2">
                            Read <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
