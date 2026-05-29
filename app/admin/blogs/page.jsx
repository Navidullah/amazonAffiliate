"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  FileText,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  BarChart2,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Video Downloading",
  "Facebook Tips",
  "YouTube Tips",
  "TikTok Tips",
  "SEO",
  "Tutorials",
  "General",
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [actionId, setActionId] = useState(null); // which row is loading

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/blog/admin");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch blogs");
      setBlogs(Array.isArray(data) ? data : data.blogs ?? []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setActionId(id);
    try {
      await fetch(`/api/blog/${id}`, { method: "DELETE" });
      fetchBlogs();
    } catch {
      alert("Failed to delete blog");
    } finally {
      setActionId(null);
    }
  };

  const handleTogglePublish = async (id, current) => {
    setActionId(id);
    try {
      await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !current }),
      });
      fetchBlogs();
    } catch {
      alert("Failed to update blog");
    } finally {
      setActionId(null);
    }
  };

  const fmt = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const filtered = blogs.filter((b) => {
    const matchSearch =
      !search ||
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "All" || b.category === filterCat;
    return matchSearch && matchCat;
  });

  const published = blogs.filter((b) => b.isPublished).length;
  const drafts = blogs.length - published;

  /* ── LOADING ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-background py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-40 bg-muted animate-pulse rounded-lg" />
            <div className="h-10 w-32 bg-muted animate-pulse rounded-lg" />
          </div>
          <div className="grid gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── ERROR ── */
  if (error) {
    return (
      <div className="min-h-screen bg-background py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center">
            <p className="text-destructive font-medium mb-3">{error}</p>
            <button
              onClick={fetchBlogs}
              className="inline-flex items-center gap-2 text-sm text-destructive hover:underline"
            >
              <RefreshCw className="h-4 w-4" /> Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="container mx-auto max-w-6xl space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Blog Manager</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {blogs.length} posts · {published} published · {drafts} drafts
            </p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            New Blog Post
          </Link>
        </div>

        {/* ── Stats Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Posts", value: blogs.length, icon: FileText, color: "text-primary" },
            { label: "Published", value: published, icon: CheckCircle2, color: "text-green-600" },
            { label: "Drafts", value: drafts, icon: Clock, color: "text-amber-500" },
            {
              label: "Total Views",
              value: blogs.reduce((s, b) => s + (b.views || 0), 0).toLocaleString(),
              icon: BarChart2,
              color: "text-blue-500",
            },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <s.icon className={`h-4 w-4 ${s.color}`} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-xl border bg-background pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          {/* Category filter */}
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* ── Blog List ── */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-border py-16 text-center">
            <FileText className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">
              {search || filterCat !== "All" ? "No posts match your filters." : "No blog posts yet."}
            </p>
            {!search && filterCat === "All" && (
              <Link
                href="/admin/blogs/new"
                className="mt-4 inline-flex items-center gap-2 text-primary text-sm hover:underline"
              >
                <Plus className="h-4 w-4" /> Create your first post
              </Link>
            )}
          </div>
        ) : (
          <div className="rounded-xl border bg-card overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-[1fr_140px_110px_110px_80px_120px] gap-4 px-5 py-3 bg-muted/40 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              <span>Post</span>
              <span>Category</span>
              <span>Status</span>
              <span>Date</span>
              <span>Views</span>
              <span>Actions</span>
            </div>

            {filtered.map((blog, idx) => (
              <div
                key={blog._id}
                className={`flex flex-col md:grid md:grid-cols-[1fr_140px_110px_110px_80px_120px] md:items-center gap-3 md:gap-4 px-5 py-4 transition-colors hover:bg-muted/20 ${
                  idx !== 0 ? "border-t" : ""
                } ${actionId === blog._id ? "opacity-50 pointer-events-none" : ""}`}
              >
                {/* Title + Excerpt */}
                <div className="min-w-0">
                  <p className="font-semibold text-sm line-clamp-1">{blog.title}</p>
                  {blog.excerpt && (
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {blog.excerpt}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                    {blog.category || "General"}
                  </span>
                </div>

                {/* Status */}
                <div>
                  {blog.isPublished ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-950/30 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="h-3 w-3" /> Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-full">
                      <Clock className="h-3 w-3" /> Draft
                    </span>
                  )}
                </div>

                {/* Date */}
                <div className="text-xs text-muted-foreground">
                  {fmt(blog.publishedAt || blog.createdAt)}
                </div>

                {/* Views */}
                <div className="text-xs text-muted-foreground font-medium">
                  {(blog.views || 0).toLocaleString()}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/blogs/${blog._id}/edit`}
                    title="Edit"
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleTogglePublish(blog._id, blog.isPublished)}
                    title={blog.isPublished ? "Unpublish" : "Publish"}
                    className="p-2 rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
                  >
                    {blog.isPublished ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id, blog.title)}
                    title="Delete"
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {blog.slug && (
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      title="View post"
                      className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
