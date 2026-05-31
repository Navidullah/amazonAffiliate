"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  Save,
  Send,
  Tag,
  X,
  FileText,
  AlignLeft,
  Loader2,
} from "lucide-react";

const TiptapEditor = dynamic(
  () => import("@/app/components/blogeditor/TiptapEditor"),
  { ssr: false, loading: () => <div className="h-64 bg-muted animate-pulse rounded-xl" /> },
);

const CATEGORIES = [
  "Video Downloading",
  "Facebook Tips",
  "YouTube Tips",
  "TikTok Tips",
  "SEO",
  "Tutorials",
  "General",
];

function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function FormField({ label, hint, required, children }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

export default function NewBlogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/");
  }, [status, session]);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "General",
    tags: [],
    isPublished: false,
  });
  const [tagInput, setTagInput] = useState("");

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      set("tags", [...form.tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => set("tags", form.tags.filter((t) => t !== tag));

  const handleSubmit = async (publish) => {
    if (!form.title.trim()) return showToast("Title is required", "error");
    if (!form.excerpt.trim()) return showToast("Excerpt is required", "error");
    if (!form.content || form.content === "<p></p>")
      return showToast("Content cannot be empty", "error");

    setSaving(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, isPublished: publish }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create blog");
      showToast(publish ? "Blog published!" : "Draft saved!");
      setTimeout(() => router.push("/admin/blogs"), 800);
    } catch (e) {
      showToast(e.message || "Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || status !== "authenticated" || session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-medium shadow-xl animate-in slide-in-from-top-2 duration-300
            ${toast.type === "error"
              ? "bg-destructive text-destructive-foreground"
              : "bg-green-600 text-white"
            }`}
        >
          {toast.msg}
        </div>
      )}

      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Blog Manager
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSubmit(false)}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-sm"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Page body */}
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Main Column ── */}
          <div className="flex-1 min-w-0 space-y-6">
            <div className="rounded-xl border bg-card p-6 space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border-b pb-3">
                <FileText className="h-4 w-4" /> Post Content
              </div>

              {/* Title */}
              <FormField label="Title" required>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="Write an engaging blog title..."
                  className="w-full rounded-xl border bg-background px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:font-normal placeholder:text-muted-foreground/60"
                />
                {form.title && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Slug:{" "}
                    <span className="font-mono text-primary">{slugify(form.title)}</span>
                  </p>
                )}
              </FormField>

              {/* Content Editor */}
              <FormField label="Content" required>
                <TiptapEditor
                  value={form.content}
                  onChange={(html) => set("content", html)}
                />
              </FormField>
            </div>

            {/* Excerpt */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border-b pb-3">
                <AlignLeft className="h-4 w-4" /> SEO Excerpt
              </div>
              <FormField
                label="Excerpt"
                required
                hint={`${form.excerpt.length}/300`}
              >
                <textarea
                  value={form.excerpt}
                  onChange={(e) => set("excerpt", e.target.value)}
                  rows={3}
                  maxLength={300}
                  placeholder="Short summary shown in search results and blog cards..."
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </FormField>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-5">

            {/* Status */}
            <div className="rounded-xl border bg-card p-5 space-y-4">
              <p className="text-sm font-semibold border-b pb-3">Post Settings</p>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => set("isPublished", !form.isPublished)}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                    form.isPublished ? "bg-green-500" : "bg-muted-foreground/30"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      form.isPublished ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {form.isPublished ? "Published" : "Draft"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {form.isPublished
                      ? "Visible to everyone"
                      : "Only admins can see this"}
                  </p>
                </div>
              </label>
            </div>

            {/* Category */}
            <div className="rounded-xl border bg-card p-5 space-y-3">
              <p className="text-sm font-semibold border-b pb-3">Category</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => set("category", c)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-all ${
                      form.category === c
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-xl border bg-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold border-b pb-3">
                <Tag className="h-4 w-4" /> Tags
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { e.preventDefault(); addTag(); }
                  }}
                  placeholder="Add a tag..."
                  className="flex-1 rounded-lg border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-primary text-primary-foreground text-xs rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add
                </button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-full font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile publish buttons */}
            <div className="lg:hidden flex gap-3">
              <button
                onClick={() => handleSubmit(false)}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </button>
              <button
                onClick={() => handleSubmit(true)}
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
