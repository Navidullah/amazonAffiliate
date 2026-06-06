"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Download,
  Loader2,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
  FileVideo,
  Music,
  Youtube,
  Info,
  Scale,
  Clock,
  Eye,
  User,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// ─── Config ──────────────────────────────────────────────────────────────────
// Reads from .env.local → NEXT_PUBLIC_YOUTUBE_API_URL
const API_BASE = process.env.NEXT_PUBLIC_YOUTUBE_API_URL;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function formatViews(count) {
  if (!count) return null;
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M views`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K views`;
  return `${count} views`;
}

function formatFileSize(bytes) {
  if (!bytes) return null;
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
  if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
  return `${(bytes / 1_024).toFixed(0)} KB`;
}

// Deduplicate formats — keep one per quality label, prefer mp4
function buildVideoOptions(formats) {
  const qualityOrder = ["2160p", "1440p", "1080p", "720p", "480p", "360p", "240p", "144p"];
  const seen = new Map();

  for (const f of formats) {
    const label = f.quality_label;
    if (!label) continue;
    if (!seen.has(label)) {
      seen.set(label, f);
    } else if (f.ext === "mp4" && seen.get(label).ext !== "mp4") {
      seen.set(label, f);
    }
  }

  // Sort by our preferred order
  return qualityOrder
    .filter((q) => seen.has(q))
    .map((q) => seen.get(q));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function DownloadProgress({ progress }) {
  if (!progress) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="rounded-2xl bg-card p-8 shadow-2xl text-center w-80 border">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg font-semibold">
          {progress < 10 ? "Preparing download…" : progress < 90 ? "Downloading…" : "Almost done…"}
        </p>
        <div className="mt-4 h-3 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{progress}%</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Large files may take a moment. Please wait…
        </p>
      </div>
    </div>
  );
}

function VideoCard({ info }) {
  return (
    <div className="flex flex-col sm:flex-row gap-5">
      {/* Thumbnail */}
      <div className="relative flex-shrink-0">
        <img
          src={info.thumbnail}
          alt={info.title}
          className="w-full sm:w-52 rounded-xl shadow-md object-cover aspect-video sm:aspect-auto"
          onError={(e) => { e.target.src = "https://placehold.co/400x225?text=No+Thumbnail"; }}
        />
        {info.duration && (
          <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-2 py-0.5 text-xs text-white font-mono">
            {formatDuration(info.duration)}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base line-clamp-3 leading-snug mb-3">
          {info.title}
        </h3>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {info.uploader && (
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" /> {info.uploader}
            </span>
          )}
          {info.view_count && (
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {formatViews(info.view_count)}
            </span>
          )}
          {info.duration && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {formatDuration(info.duration)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function YoutubeVideoDownloaderClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("video"); // "video" | "audio"
  const [selectedQuality, setSelectedQuality] = useState("best");
  const [selectedAudio, setSelectedAudio] = useState("320");
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // ── Step 1: Fetch metadata ────────────────────────────────────────────────
  const analyzeVideo = async () => {
    if (!url.trim()) { setError("Please paste a YouTube URL first."); return; }

    setLoading(true);
    setError("");
    setVideoInfo(null);

    try {
      const res = await fetch(`${API_BASE}/api/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Could not fetch video info. Check the URL and try again.");
      }

      setVideoInfo(data);
    } catch (err) {
      setError(err.message || "Failed to analyze video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Step 2: Download (streaming blob) ────────────────────────────────────
  const handleDownload = async () => {
    if (!videoInfo) return;
    setDownloading(true);
    setDownloadProgress(5);

    const endpoint = activeTab === "video" ? "/api/download/video" : "/api/download/audio";
    const body =
      activeTab === "video"
        ? { url: videoInfo.webpage_url, quality: selectedQuality }
        : { url: videoInfo.webpage_url, quality: selectedAudio };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || "Download failed. Please try again.");
      }

      // Stream → chunks → blob → save
      const contentLength = res.headers.get("content-length");
      const total = parseInt(contentLength, 10);
      const reader = res.body.getReader();
      const chunks = [];
      let loaded = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        setDownloadProgress(total ? Math.min(95, Math.round((loaded / total) * 100)) : 50);
      }

      setDownloadProgress(98);

      const mimeType = activeTab === "video" ? "video/mp4" : "audio/mpeg";
      const ext = activeTab === "video" ? "mp4" : "mp3";
      const blob = new Blob(chunks, { type: mimeType });
      const blobUrl = URL.createObjectURL(blob);

      const filename =
        res.headers.get("x-file-name") ||
        `${(videoInfo.title || "video").slice(0, 60)}.${ext}`;

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      setDownloadProgress(100);
      setTimeout(() => setDownloadProgress(0), 2000);
    } catch (err) {
      setError(err.message || "Download failed. Please try again.");
      setDownloadProgress(0);
    } finally {
      setDownloading(false);
    }
  };

  const videoOptions = videoInfo ? buildVideoOptions(videoInfo.formats) : [];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-red-100 dark:bg-red-950/40 mb-4">
            <Youtube className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            YouTube Video Downloader
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Download any YouTube video or Short in MP4 or MP3. Choose your quality — 144p to 4K. Fast, free, no sign-in required.
          </p>
        </header>

        {/* ── URL Input ──────────────────────────────────────────────────── */}
        <Card className="shadow-xl border-0 bg-card">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyzeVideo()}
                  placeholder="Paste YouTube URL here (video, Short, or playlist)…"
                  className="w-full rounded-xl border bg-background pl-12 pr-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all dark:bg-slate-900"
                  disabled={loading || downloading}
                  aria-label="YouTube URL"
                />
              </div>

              <button
                onClick={analyzeVideo}
                disabled={loading || downloading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Fetching info…</>
                ) : (
                  <><FileVideo className="h-5 w-5" /> Analyze Video</>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ── Result Card ────────────────────────────────────────────────── */}
        {videoInfo && (
          <div className="mt-6 rounded-2xl bg-card shadow-xl border overflow-hidden">

            {/* Video info header */}
            <div className="p-5 border-b bg-muted/30">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="font-semibold">Video ready — choose format & quality</span>
              </div>
              <VideoCard info={videoInfo} />
            </div>

            <div className="p-5">
              {/* Tabs */}
              <div className="flex rounded-xl bg-muted p-1 mb-5 w-fit">
                <button
                  onClick={() => setActiveTab("video")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === "video"
                      ? "bg-background shadow text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileVideo className="h-4 w-4" /> MP4 Video
                </button>
                <button
                  onClick={() => setActiveTab("audio")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === "audio"
                      ? "bg-background shadow text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Music className="h-4 w-4" /> MP3 Audio
                </button>
              </div>

              {/* Video quality options */}
              {activeTab === "video" && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">Select quality:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-5">
                    {/* Always show "Best" option */}
                    {[{ quality_label: "Best", format_id: "best", filesize: null }, ...videoOptions].map((f) => {
                      const val = f.format_id === "best" ? "best" : f.quality_label;
                      const isActive = selectedQuality === val;
                      return (
                        <button
                          key={f.format_id}
                          onClick={() => setSelectedQuality(val)}
                          className={`rounded-xl border p-3 text-sm font-medium text-center transition-all ${
                            isActive
                              ? "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400"
                              : "border-border hover:border-red-400 hover:bg-muted/50"
                          }`}
                        >
                          <span className="block font-semibold">{f.quality_label}</span>
                          {f.filesize && (
                            <span className="block text-xs text-muted-foreground mt-0.5">
                              {formatFileSize(f.filesize)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Audio quality options */}
              {activeTab === "audio" && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">Select bitrate:</p>
                  <div className="grid grid-cols-3 gap-2 mb-5 max-w-xs">
                    {["320", "192", "128"].map((kbps) => (
                      <button
                        key={kbps}
                        onClick={() => setSelectedAudio(kbps)}
                        className={`rounded-xl border p-3 text-sm font-medium text-center transition-all ${
                          selectedAudio === kbps
                            ? "border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400"
                            : "border-border hover:border-red-400 hover:bg-muted/50"
                        }`}
                      >
                        <span className="block font-semibold">{kbps}</span>
                        <span className="block text-xs text-muted-foreground">kbps</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Download button */}
              <button
                onClick={handleDownload}
                disabled={downloading || loading}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {downloading ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Downloading…</>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Download {activeTab === "video" ? `MP4 (${selectedQuality === "best" ? "Best" : selectedQuality})` : `MP3 (${selectedAudio} kbps)`}
                  </>
                )}
              </button>

              <p className="mt-3 text-xs text-muted-foreground">
                ⚡ Powered by a cloud server — first download may take ~10s to wake up (free tier).
              </p>
            </div>
          </div>
        )}

        {/* ── Disclaimer ─────────────────────────────────────────────────── */}
        <div className="mt-8 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-semibold text-amber-800 dark:text-amber-400">
                📋 Copyright & Fair Use Disclaimer
              </p>
              <p className="text-amber-700 dark:text-amber-500">
                This tool is for downloading <strong>publicly available</strong> YouTube videos for{" "}
                <strong>personal, non-commercial use only</strong>. Always obtain permission from the
                content owner before downloading. We do not encourage copyright infringement.
              </p>
            </div>
          </div>
        </div>

        {/* ── Features ───────────────────────────────────────────────────── */}
        <section className="mt-12">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: <FileVideo className="h-6 w-6" />, title: "All Resolutions", desc: "144p to 4K — choose the quality that fits your device and storage." },
              { icon: <Music className="h-6 w-6" />, title: "MP3 Extraction", desc: "Extract audio in 128, 192, or 320 kbps MP3 with one click." },
              { icon: <Youtube className="h-6 w-6" />, title: "Shorts Supported", desc: "Works with YouTube Shorts — just paste the Short URL." },
            ].map((f, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-xl bg-red-100 dark:bg-red-950/30 text-red-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── How to use ─────────────────────────────────────────────────── */}
        <section className="mt-10">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                How to Download YouTube Videos
              </h2>
              <ol className="space-y-3 text-muted-foreground">
                {[
                  "Copy the URL of any YouTube video, Short, or playlist.",
                  "Paste it in the input box above and click \"Analyze Video\".",
                  "Choose MP4 for video or MP3 for audio, then pick your quality.",
                  "Click Download — your file saves automatically.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* ── Alert tip ──────────────────────────────────────────────────── */}
        <Alert className="mt-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <AlertDescription className="text-sm text-blue-800 dark:text-blue-400">
            💡 <strong>Pro Tip:</strong> This downloader also works with YouTube Shorts — just paste
            the Short URL exactly as it appears in your browser.
          </AlertDescription>
        </Alert>

        {/* ── Legal ──────────────────────────────────────────────────────── */}
        <div className="mt-8 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Scale className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-semibold text-red-800 dark:text-red-400 mb-1">⚠️ Legal Notice</p>
              <p className="text-red-700 dark:text-red-500">
                Shopyor is not affiliated with YouTube or Google LLC. This tool is provided "as is"
                without any warranties. Users are solely responsible for complying with YouTube's
                Terms of Service and all applicable copyright laws.
              </p>
            </div>
          </div>
        </div>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <section className="mt-10">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-5 text-muted-foreground">
                {[
                  ["Is this YouTube downloader free?", "Yes, completely free. No sign-in, no limits on how many videos you can analyze."],
                  ["Does it work with YouTube Shorts?", "Yes. Paste the Short URL (youtube.com/shorts/…) and it works exactly the same way."],
                  ["What resolutions are supported?", "144p, 240p, 360p, 480p, 720p, 1080p, 1440p, and 4K — depending on what the video offers."],
                  ["Can I download MP3 audio only?", "Yes — switch to the MP3 tab and choose 128, 192, or 320 kbps before downloading."],
                  ["Why is the first download slow?", "Our server goes to sleep after inactivity (free hosting plan). The first request wakes it up — subsequent downloads are instant."],
                  ["Can I download private or age-restricted videos?", "No. This tool only works with publicly available videos that do not require a sign-in."],
                ].map(([q, a], i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-foreground">{q}</h3>
                    <p className="mt-1">{a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Related tools & guides — internal linking ──────────────────── */}
        <section className="mt-10 border-t pt-8">
          <h2 className="text-lg font-semibold mb-4">
            Related downloaders &amp; guides
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/tools/instagram-video-downloader"
              className="rounded-lg border p-4 hover:bg-muted transition-colors"
            >
              <span className="font-medium">Instagram Video Downloader</span>
              <span className="block text-sm text-muted-foreground">
                Save public Instagram reels and videos.
              </span>
            </Link>
            <Link
              href="/tools/free-tiktok-video-downloader"
              className="rounded-lg border p-4 hover:bg-muted transition-colors"
            >
              <span className="font-medium">TikTok Video Downloader</span>
              <span className="block text-sm text-muted-foreground">
                Save TikTok videos without a watermark.
              </span>
            </Link>
            <Link
              href="/tools/facebook-video-downloader"
              className="rounded-lg border p-4 hover:bg-muted transition-colors"
            >
              <span className="font-medium">Facebook Video Downloader</span>
              <span className="block text-sm text-muted-foreground">
                Download public Facebook videos and reels.
              </span>
            </Link>
            <Link
              href="/blog/how-to-download-videos-from-facebook-instagram-tiktok"
              className="rounded-lg border p-4 hover:bg-muted transition-colors"
            >
              <span className="font-medium">
                Guide: Download videos from Facebook, Instagram &amp; TikTok
              </span>
              <span className="block text-sm text-muted-foreground">
                Step-by-step walkthrough for every platform.
              </span>
            </Link>
          </div>
        </section>

      </div>

      {/* Global download progress overlay */}
      <DownloadProgress progress={downloadProgress} />
    </div>
  );
}
