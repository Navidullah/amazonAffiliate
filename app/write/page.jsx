"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

// Firebase (for cover upload if mode === 'file')
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import TiptapEditor from "../components/blogeditor/TiptapEditor";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// simple slugify (keeps it local)
function slugify(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function WritePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // required by model
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // ✅ model-required
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState(""); // ✅ model-required
  const [authorEmail, setAuthorEmail] = useState(""); // ✅ model-required
  const [authorImage, setAuthorImage] = useState(""); // ✅ model-required
  const [slug, setSlug] = useState(""); // ✅ model-required & unique

  // editor content (not in your model yet, but keep sending if your API stores it)
  const [content, setContent] = useState("");

  // cover image controls
  const [coverMode, setCoverMode] = useState("file"); // 'file' | 'url'
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [preview, setPreview] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // auto-generate slug from title (editable afterwards)
  useEffect(() => {
    if (!title) return setSlug("");
    setSlug((prev) => (prev ? prev : slugify(title)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  const handleCoverPick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setPreview(URL.createObjectURL(file));
  };

  async function uploadCoverToFirebase() {
    const safeName = `blogs/covers/${Date.now()}_${coverFile.name.replace(/\s+/g, "_")}`;
    const imageRef = ref(storage, safeName);
    await uploadBytes(imageRef, coverFile);
    return await getDownloadURL(imageRef);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // minimal front-end guard rails to match your model
    if (!title || !category || !description || !metaDescription) {
      return toast.error("Please all fields are required");
    }

    if (coverMode === "file" && !coverFile) {
      return toast.error(
        "Please choose a cover image file or switch to URL mode."
      );
    }
    if (coverMode === "url" && !/^https?:\/\//i.test(coverUrl.trim())) {
      return toast.error("Please provide a valid http(s) cover image URL.");
    }

    setSubmitting(true);
    try {
      // Resolve cover image -> model field name is "image"
      let image = "";
      if (coverMode === "file") {
        image = await uploadCoverToFirebase();
      } else {
        image = coverUrl.trim();
      }

      const payload = {
        title,
        description, // ✅ model-required
        metaDescription,
        category, // ✅ model-required
        author: session.user.name || "", // ✅ model-required
        authorEmail: session.user.email || "", // ✅ model-required
        authorImage: session.user.image, // ✅ model-required (URL)
        image, // ✅ model-required (cover)
        slug, // ✅ model-required & unique
      };

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(json?.message || json?.error || "Failed to publish");

      toast.success("Blog published!");

      // reset form
      setTitle("");
      setDescription("");
      setMetaDescription("");
      setCategory("");
      setAuthor("");
      setAuthorEmail("");
      setAuthorImage("");
      setSlug("");
      setContent("");
      setCoverMode("file");
      setCoverFile(null);
      setCoverUrl("");
      setPreview("");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Write a Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title / Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label>Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Slug */}
            <div>
              <Label>Slug</Label>
              <Input
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="auto-generated-from-title"
                required
              />
            </div>

            {/* Description (model-required) vs Meta Description (SEO) */}

            <div>
              <Label>Meta Description (less than 165 chars for SEO)</Label>
              <Textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                maxLength={165}
                required
              />
            </div>

            {/* Author details (required by model) */}

            {/* Cover image: File or URL */}
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <div className="flex gap-6 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="coverMode"
                    value="file"
                    checked={coverMode === "file"}
                    onChange={() => setCoverMode("file")}
                  />
                  <span>Upload file</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="coverMode"
                    value="url"
                    checked={coverMode === "url"}
                    onChange={() => setCoverMode("url")}
                  />
                  <span>Use image URL</span>
                </label>
              </div>

              {coverMode === "file" ? (
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverPick}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-36 h-28 rounded object-cover border"
                    />
                  )}
                </div>
              ) : (
                <Input
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                />
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label>Blog Description</Label>
              <TiptapEditor
                initialContent="<p>Write your blog…</p>"
                onChange={setDescription}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full"
            >
              {submitting ? "Publishing…" : "Publish Blog"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
