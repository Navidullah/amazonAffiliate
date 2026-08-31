"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UploadCloud, Loader2, BookPlus, Edit2, Trash2, EyeOff, ExternalLink } from "lucide-react";
import { toast } from "react-toastify";

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white";

const selectClass =
  "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-gray-800 dark:text-white";

const fileInputClass =
  "block text-sm text-gray-700 file:mr-3 file:cursor-pointer file:rounded-xl file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition-colors hover:file:bg-violet-700 dark:text-gray-300";

const cardClass =
  "rounded-3xl border border-gray-200/70 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-8";

const EMPTY_FORM = {
  title: "",
  author: "",
  description: "",
  category: "",
  tags: "",
  source: "public_domain",
  attribution: "",
};

export default function AdminBooksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [actionSlug, setActionSlug] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [status, session, router]);

  const fetchBooks = useCallback(async () => {
    setLoadingBooks(true);
    const res = await fetch("/api/books");
    if (res.ok) {
      const data = await res.json();
      setBooks(data.books || []);
    }
    setLoadingBooks(false);
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchBooks();
    }
  }, [status, session, fetchBooks]);

  const handleDelete = async (slug, title) => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setActionSlug(slug);
    const res = await fetch(`/api/books/${slug}`, { method: "DELETE" });
    setActionSlug(null);
    if (!res.ok) {
      toast.error("Failed to delete book.");
      return;
    }
    setBooks((prev) => prev.filter((b) => b.slug !== slug));
    toast.success("Book deleted.");
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }
  if (status !== "authenticated" || session?.user?.role !== "admin") return null;

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("A PDF file is required.");
      return;
    }
    if (form.source === "public_domain" && !form.attribution.trim()) {
      toast.error("Attribution is required for public domain books.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    formData.append("file", file);
    if (coverImage) formData.append("coverImage", coverImage);

    const res = await fetch("/api/books", { method: "POST", body: formData });
    setUploading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || "Failed to upload book.");
      return;
    }

    toast.success("Book uploaded.");
    setForm(EMPTY_FORM);
    setFile(null);
    setCoverImage(null);
    e.target.reset();
    fetchBooks();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
        <BookPlus className="h-6 w-6 text-violet-600" /> Upload a Book
      </h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        The PDF is automatically watermarked and stored privately — visitors
        only ever read it through the site&apos;s reader, never a direct link.
      </p>

      <form onSubmit={handleSubmit} className={`${cardClass} mt-6 space-y-4`}>
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
            Title
          </label>
          <input required value={form.title} onChange={update("title")} className={inputClass} />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
            Author
          </label>
          <input required value={form.author} onChange={update("author")} className={inputClass} />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
            Description
          </label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={update("description")}
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
              Category
            </label>
            <input required value={form.category} onChange={update("category")} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
              Tags (comma-separated)
            </label>
            <input value={form.tags} onChange={update("tags")} className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
              Source
            </label>
            <select value={form.source} onChange={update("source")} className={selectClass}>
              <option value="public_domain">Public domain</option>
              <option value="original">Original (I own the rights)</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
              Attribution {form.source === "public_domain" && "(required)"}
            </label>
            <input
              value={form.attribution}
              onChange={update("attribution")}
              placeholder="e.g. Project Gutenberg #1234"
              required={form.source === "public_domain"}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
              Book PDF
            </label>
            <input
              type="file"
              required
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className={fileInputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
              Cover image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className={fileInputClass}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="inline-flex h-11 items-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-60"
        >
          <UploadCloud className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload Book"}
        </button>
      </form>

      <h2 className="mt-12 text-lg font-bold text-gray-900 dark:text-white">
        Uploaded Books ({books.length})
      </h2>

      {loadingBooks ? (
        <div className="mt-4 flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
        </div>
      ) : books.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No books uploaded yet.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {books.map((book) => (
            <div
              key={book.slug}
              className={`flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03] ${
                actionSlug === book.slug ? "pointer-events-none opacity-50" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                  {book.title}
                  {!book.active && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500 dark:bg-white/10 dark:text-gray-400">
                      <EyeOff className="h-3 w-3" /> Hidden
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  by {book.author} · {book.category} · {book.views || 0} views
                </p>
              </div>
              <Link
                href={`/books/${book.slug}`}
                target="_blank"
                title="View live page"
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Link
                href={`/admin/books/${book.slug}/edit`}
                title="Edit"
                className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/30"
              >
                <Edit2 className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(book.slug, book.title)}
                title="Delete"
                className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
