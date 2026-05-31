// app/blog/[slug]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  Tag,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";

export default function SingleBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

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

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Blog Header */}
        <div className="text-center mb-8">
          {/* Category */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
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
        </div>

        {/* Blog Content */}
        <div
          className="prose prose-base md:prose-lg dark:prose-invert max-w-none mb-12
            prose-headings:font-bold prose-headings:tracking-tight
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
          <div className="flex flex-wrap items-center gap-2 mb-8 pt-6 border-t">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {blog.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-muted rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share Buttons */}
        <div className="flex items-center gap-3 mb-12 pb-8 border-b">
          <span className="text-sm font-medium">Share this article:</span>
          <button
            onClick={shareOnTwitter}
            className="p-2 rounded-full bg-muted hover:bg-[#1DA1F2] hover:text-white transition-colors"
          >
            <Twitter className="h-4 w-4" />
          </button>
          <button
            onClick={shareOnFacebook}
            className="p-2 rounded-full bg-muted hover:bg-[#4267B2] hover:text-white transition-colors"
          >
            <Facebook className="h-4 w-4" />
          </button>
          <button
            onClick={shareOnLinkedin}
            className="p-2 rounded-full bg-muted hover:bg-[#0077B5] hover:text-white transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </button>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedBlogs.map((related) => (
                <Link
                  key={related._id}
                  href={`/blog/${related.slug}`}
                  className="group block"
                >
                  <div className="bg-card border rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{related.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
