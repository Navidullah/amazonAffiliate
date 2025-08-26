"use client";

import { useState } from "react";
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

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  // cover image controls
  const [coverMode, setCoverMode] = useState("file"); // 'file' | 'url'
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState("");
  const [preview, setPreview] = useState("");

  const [submitting, setSubmitting] = useState(false);

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

    if (!title || !metaDescription || !category) {
      return toast.error("Please fill title, meta description, and category.");
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
      // Resolve cover image
      let image = "";
      if (coverMode === "file") {
        image = await uploadCoverToFirebase();
      } else {
        image = coverUrl.trim();
      }

      // POST your blog
      const payload = {
        title,
        metaDescription,
        category,
        image, // cover image URL (from file upload or direct URL)
        contentHtml: content, // editor HTML
      };

      // Adjust endpoint to match your API
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed to publish");

      toast.success("Blog published!");
      // reset form
      setTitle("");
      setMetaDescription("");
      setCategory("");
      setContent("");
      setCoverMode("file");
      setCoverFile(null);
      setCoverUrl("");
      setPreview("");
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

            <div>
              <Label>Meta Description</Label>
              <Textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                required
              />
            </div>

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

            {/* Tiptap editor: supports insert image by URL and local upload via toolbar */}
            <div className="space-y-2">
              <Label>Content</Label>
              <TiptapEditor
                initialContent="<p>Write your blog…</p>"
                onChange={setContent}
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
