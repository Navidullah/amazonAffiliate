// ==============================
// File: app/pinterest/page.jsx
// ==============================
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  Image as ImageIcon,
  Link as LinkIcon,
  Text as TextIcon,
  Send,
  Upload,
} from "lucide-react";

function isHttpUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export default function PinterestPinPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [result, setResult] = useState(null);

  const titleCount = title.trim().length;
  const descCount = description.trim().length;

  const canSubmitUrl = useMemo(() => {
    return (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      isHttpUrl(imageUrl) &&
      (link ? isHttpUrl(link) : true)
    );
  }, [title, description, imageUrl, link]);

  const canSubmitFile = useMemo(() => {
    return (
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      file instanceof File &&
      (link ? isHttpUrl(link) : true)
    );
  }, [title, description, file, link]);

  async function submitViaUrl(e) {
    e.preventDefault();
    if (!canSubmitUrl) return;
    setPosting(true);
    setResult(null);
    try {
      const res = await fetch("/api/pins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          link: link || undefined,
          imageUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        setResult({
          ok: false,
          message: data?.error
            ? JSON.stringify(data.error)
            : "Failed to create pin",
        });
      else {
        const pinId = data?.pin?.id || "";
        setResult({
          ok: true,
          message: pinId
            ? `Pin created (id: ${pinId}).`
            : "Pin created successfully.",
        });
      }
    } catch (err) {
      setResult({ ok: false, message: String(err) });
    } finally {
      setPosting(false);
    }
  }

  async function submitViaFile(e) {
    e.preventDefault();
    if (!canSubmitFile) return;
    setPosting(true);
    setResult(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("title", title);
      fd.append("description", description);
      if (link) fd.append("link", link);

      const res = await fetch("/api/pins/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok)
        setResult({
          ok: false,
          message: data?.error
            ? JSON.stringify(data.error)
            : "Upload flow failed",
        });
      else {
        const pinId = data?.pin?.id || "";
        setResult({
          ok: true,
          message: pinId
            ? `Pin created (id: ${pinId}).`
            : "Pin created successfully.",
        });
      }
    } catch (err) {
      setResult({ ok: false, message: String(err) });
    } finally {
      setPosting(false);
    }
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] w-full flex items-center justify-center p-6 md:p-10 bg-gradient-to-br from-background to-muted/30">
      <Card className="w-full max-w-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl">
            Pinterest Pin Uploader
          </CardTitle>
          <CardDescription>
            Post Pins via your Next.js backend. Use a public Image URL or upload
            a file.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-10">
          {/* --- URL mode --- */}
          <form onSubmit={submitViaUrl} className="space-y-6">
            <h3 className="font-semibold">Via Image URL</h3>
            <div className="grid gap-4">
              <Label htmlFor="imageUrl" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Image URL *
              </Label>
              <Input
                id="imageUrl"
                placeholder="https://.../banner.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              {imageUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl overflow-hidden border bg-muted/30"
                >
                  {/* eslint-disable @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="pin preview"
                    className="w-full max-h-[360px] object-contain bg-black/5"
                  />
                </motion.div>
              )}
              {!isHttpUrl(imageUrl) && imageUrl.length > 0 && (
                <p className="text-sm text-destructive">
                  Please provide a valid public HTTP(S) image URL.
                </p>
              )}
            </div>

            <Separator />

            <div className="grid gap-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <TextIcon className="h-4 w-4" /> Title *
              </Label>
              <Input
                id="title"
                placeholder="Catchy, keyword-rich title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
              />
              <div className="text-xs text-muted-foreground">
                {titleCount}/100
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Compelling description with keywords, value proposition, and CTA."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px]"
                maxLength={500}
              />
              <div className="text-xs text-muted-foreground">
                {descCount}/500
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="link" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" /> Destination Link (optional)
              </Label>
              <Input
                id="link"
                type="url"
                placeholder="https://www.shopyor.com/blog/your-post"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              {link && !isHttpUrl(link) && (
                <p className="text-sm text-destructive">
                  Please provide a valid HTTP(S) URL.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Fields marked * are required.
              </p>
              <Button
                type="submit"
                disabled={!canSubmitUrl || posting}
                className="gap-2"
              >
                {posting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {posting ? "Posting…" : "Create Pin (URL)"}
              </Button>
            </div>
          </form>

          <Separator className="my-2" />

          {/* --- File mode --- */}
          <form onSubmit={submitViaFile} className="space-y-6">
            <h3 className="font-semibold">Via File Upload</h3>
            <div className="grid gap-2">
              <Label htmlFor="file" className="flex items-center gap-2">
                <Upload className="h-4 w-4" /> Image File *
              </Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file && (
                <p className="text-xs text-muted-foreground">
                  {file.name} — {(file.size / 1024).toFixed(1)} KB
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title2">Title *</Label>
              <Input
                id="title2"
                placeholder="Catchy, keyword-rich title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
              />
              <div className="text-xs text-muted-foreground">
                {titleCount}/100
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description2">Description *</Label>
              <Textarea
                id="description2"
                placeholder="Compelling description with keywords, value proposition, and CTA."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px]"
                maxLength={500}
              />
              <div className="text-xs text-muted-foreground">
                {descCount}/500
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="link2" className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" /> Destination Link (optional)
              </Label>
              <Input
                id="link2"
                type="url"
                placeholder="https://www.shopyor.com/blog/your-post"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
              {link && !isHttpUrl(link) && (
                <p className="text-sm text-destructive">
                  Please provide a valid HTTP(S) URL.
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Button
                type="submit"
                disabled={!canSubmitFile || posting}
                className="gap-2"
              >
                {posting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {posting ? "Posting…" : "Create Pin (File)"}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-2">
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={result.ok ? "text-emerald-600" : "text-destructive"}
            >
              {result.message}
            </motion.div>
          )}
          <p className="text-xs text-muted-foreground">
            Tip: URL mode requires a public image URL. File mode uses Pinterest
            media uploads under the hood.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

// ==================================
// File: app/api/pins/route.js
// (Create a Pin using a public image URL)
// ==================================

// ==================================
// File: app/api/pins/upload/route.js
// (Register media → PUT bytes → Create Pin from media_id)
// ==================================

// ==============================
// .env.local (example)
// ==============================
// PINTEREST_ACCESS_TOKEN=your_long_lived_token
// PINTEREST_BOARD_ID=your_board_id
