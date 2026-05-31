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
  Link as LinkIcon,
  Check,
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
  const [copied, setCopied] = useState(false);
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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="mx-auto max-w-[720px]">
          <div className="animate-pulse space-y-4">
            <div className="h-5 w-24 rounded bg-muted" />
            <div className="h-10 w-full rounded bg-muted" />
            <div className="h-10 w-2/3 rounded bg-muted" />
            <div className="mt-8 h-4 w-full rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
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

      {/* ── Article ── */}
      <article className="mx-auto max-w-[720px] px-5 pb-20 pt-10 sm:px-6">
        {/* Back Button */}
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header (editorial, left-aligned) */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Category */}
          <Link
            href="/blog"
            className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-white`}
          >
            <Icon className="h-3.5 w-3.5" />
            {blog.category}
          </Link>

          {/* Title */}
          <h1 className="mt-5 font-sans text-[2.1rem] font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-[2.6rem] md:text-[3rem] md:leading-[1.1]">
            {blog.title}
          </h1>

          {/* Excerpt as subtitle */}
          {blog.excerpt && (
            <p className="mt-4 font-serif text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {blog.excerpt}
            </p>
          )}

          {/* Author + Meta */}
          <div className="mt-7 flex items-center gap-3">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-base font-bold text-white`}
            >
              {(blog.author || "A").charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="font-medium text-foreground">
                {blog.author || "Admin"}
              </p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(blog.publishedAt)}
                </span>
                <span className="text-muted-foreground/50">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {blog.readingTime} min read
                </span>
                <span className="text-muted-foreground/50">·</span>
                <span className="inline-flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {blog.views} views
                </span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Inline share row */}
        <div className="mt-7 flex items-center gap-2 border-y py-3">
          <span className="mr-1 text-xs font-medium text-muted-foreground">
            Share
          </span>
          <button
            onClick={shareOnTwitter}
            aria-label="Share on Twitter"
            className="rounded-full p-2 text-muted-foreground transition-all hover:scale-110 hover:bg-muted hover:text-[#1DA1F2]"
          >
            <Twitter className="h-4 w-4" />
          </button>
          <button
            onClick={shareOnFacebook}
            aria-label="Share on Facebook"
            className="rounded-full p-2 text-muted-foreground transition-all hover:scale-110 hover:bg-muted hover:text-[#4267B2]"
          >
            <Facebook className="h-4 w-4" />
          </button>
          <button
            onClick={shareOnLinkedin}
            aria-label="Share on LinkedIn"
            className="rounded-full p-2 text-muted-foreground transition-all hover:scale-110 hover:bg-muted hover:text-[#0077B5]"
          >
            <Linkedin className="h-4 w-4" />
          </button>
          <button
            onClick={copyLink}
            aria-label="Copy link"
            className="ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" /> Copied
              </>
            ) : (
              <>
                <LinkIcon className="h-3.5 w-3.5" /> Copy link
              </>
            )}
          </button>
        </div>

        {/* Blog Content — Medium-style typography */}
        <div
          className="prose dark:prose-invert mt-10 max-w-none
            prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-headings:scroll-mt-24
            prose-h1:text-[2rem] prose-h1:mt-12 prose-h1:mb-4
            prose-h2:text-[1.75rem] prose-h2:mt-12 prose-h2:mb-4 prose-h2:leading-snug
            prose-h3:text-[1.4rem] prose-h3:mt-9 prose-h3:mb-3
            prose-h4:text-xl prose-h4:mt-7 prose-h4:mb-2
            prose-p:font-serif prose-p:text-[1.15rem] md:prose-p:text-[1.25rem] prose-p:leading-[1.8] prose-p:text-foreground/85 prose-p:my-6
            prose-li:font-serif prose-li:text-[1.15rem] md:prose-li:text-[1.2rem] prose-li:leading-[1.8] prose-li:text-foreground/85 prose-li:my-2
            prose-ul:my-6 prose-ol:my-6 prose-li:marker:text-muted-foreground
            prose-a:font-medium prose-a:text-foreground prose-a:underline prose-a:decoration-foreground/30 prose-a:underline-offset-[3px] hover:prose-a:decoration-foreground
            prose-strong:font-semibold prose-strong:text-foreground
            prose-blockquote:font-serif prose-blockquote:not-italic prose-blockquote:border-l-[3px] prose-blockquote:border-foreground prose-blockquote:pl-6 prose-blockquote:text-[1.35rem] prose-blockquote:leading-relaxed prose-blockquote:text-foreground/80 prose-blockquote:my-8
            prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-[''] prose-code:after:content-['']
            prose-pre:rounded-xl prose-pre:border prose-pre:bg-muted prose-pre:text-[0.95rem]
            prose-img:rounded-xl prose-img:shadow-sm
            prose-hr:my-12 prose-hr:border-border
            prose-table:text-base prose-th:bg-muted/60 prose-th:border prose-td:border prose-td:p-2 prose-th:p-2"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center gap-2 border-t pt-8">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author footer card */}
        <div className="mt-10 flex items-center gap-4 rounded-2xl border bg-card/60 p-5">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-xl font-bold text-white`}
          >
            {(blog.author || "A").charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Written by
            </p>
            <p className="text-lg font-bold text-foreground">
              {blog.author || "Admin"}
            </p>
            <p className="text-sm text-muted-foreground">
              Sharing tips, tutorials &amp; guides on the Shopyor blog.
            </p>
          </div>
        </div>
      </article>

      {/* ── Related Blogs ── */}
      {relatedBlogs.length > 0 && (
        <section className="border-t bg-muted/20 py-14">
          <div className="mx-auto max-w-5xl px-5 sm:px-6">
            <h2 className="mb-8 text-2xl font-bold">More from the blog</h2>
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
                        className={`flex h-14 items-center gap-2 bg-gradient-to-br ${rs.gradient} px-4`}
                      >
                        <rs.Icon className="h-5 w-5 text-white/90" />
                        <span className="text-xs font-medium text-white/90">
                          {related.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="mb-2 line-clamp-2 font-bold leading-snug transition-colors group-hover:text-primary">
                          {related.title}
                        </h3>
                        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">
                          {related.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {related.readingTime} min read
                          </span>
                          <span className="inline-flex items-center gap-1 font-semibold text-primary transition-all group-hover:gap-2">
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
        </section>
      )}
    </div>
  );
}
