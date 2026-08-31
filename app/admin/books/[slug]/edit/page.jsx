"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white";

const selectClass =
  "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-gray-800 dark:text-white";

const fileInputClass =
  "block text-sm text-gray-700 file:mr-3 file:cursor-pointer file:rounded-xl file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:transition-colors hover:file:bg-violet-700 dark:text-gray-300";

const cardClass =
  "rounded-3xl border border-gray-200/70 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-8";

export default function EditBookPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(null);
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated" && session?.user?.role !== "admin") router.push("/");
  }, [status, session, router]);

  useEffect(() => {
    if (status !== "authenticated" || session?.user?.role !== "admin") return;

    (async () => {
      setFetching(true);
      setFetchError("");
      try {
        const res = await fetch(`/api/books/${params.slug}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load book");
        setForm({
          title: data.book.title,
          author: data.book.author,
          description: data.book.description,
          category: data.book.category,
          tags: (data.book.tags || []).join(", "),
          source: data.book.source,
          attribution: data.book.attribution || "",
          active: data.book.active,
        });
      } catch (e) {
        setFetchError(e.message);
      } finally {
        setFetching(false);
      }
    })();
  }, [params.slug, status, session]);

  if (status === "loading" || fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    );
  }
  if (status !== "authenticated" || session?.user?.role !== "admin") return null;

  if (fetchError) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
        <p className="text-sm font-medium text-red-500">{fetchError}</p>
        <Link href="/admin/books" className="mt-4 inline-flex items-center gap-2 text-sm text-violet-600 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Books
        </Link>
      </div>
    );
  }

  const update = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.source === "public_domain" && !form.attribution.trim()) {
      toast.error("Attribution is required for public domain books.");
      return;
    }

    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (file) formData.append("file", file);
    if (coverImage) formData.append("coverImage", coverImage);

    const res = await fetch(`/api/books/${params.slug}`, { method: "PUT", body: formData });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || "Failed to update book.");
      return;
    }

    toast.success("Book updated.");
    router.push("/admin/books");
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${form.title}"? This can't be undone.`)) return;
    const res = await fetch(`/api/books/${params.slug}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Failed to delete book.");
      return;
    }
    toast.success("Book deleted.");
    router.push("/admin/books");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/admin/books"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-violet-600 dark:text-gray-400"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Books
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Edit Book</h1>

      <form onSubmit={handleSubmit} className={`${cardClass} mt-6 space-y-4`}>
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Title</label>
          <input required value={form.title} onChange={update("title")} className={inputClass} />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Author</label>
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

        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <input type="checkbox" checked={form.active} onChange={update("active")} className="h-4 w-4" />
          Visible on the site
        </label>

        <div className="grid gap-4 border-t border-gray-200/70 pt-4 dark:border-white/10 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
              Replace PDF (optional)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className={fileInputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
              Replace cover image (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className={fileInputClass}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            <Trash2 className="h-4 w-4" /> Delete Book
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-60"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
