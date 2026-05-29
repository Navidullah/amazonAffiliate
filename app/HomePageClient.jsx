"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Download,
  Loader2,
  Link2,
  AlertCircle,
  CheckCircle2,
  Zap,
  Shield,
  Monitor,
  Smartphone,
  Globe,
  Lock,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Clock,
  Copy,
  Check,
  ExternalLink,
  FileVideo,
  ImageIcon,
  FileText,
  Tag,
  File,
  Sparkles,
  X,
} from "lucide-react";
import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolCards from "./components/home/ToolCards";

/* ======================================================
   CONSTANTS & CONFIG
====================================================== */

const INSTAGRAM_API_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_API_URL ||
  "https://instagram-video-downloader.onrender.com";

const PLATFORM_CONFIG = {
  facebook: {
    name: "Facebook",
    gradient: "from-blue-600 to-blue-500",
    iconBg: "bg-blue-600",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    border: "border-blue-300 dark:border-blue-700",
    ring: "focus:ring-blue-400/30",
    icon: FaFacebook,
    placeholder: "https://www.facebook.com/reel/... or fb.watch/...",
    color: "#1877F2",
  },
  instagram: {
    name: "Instagram",
    gradient: "from-pink-500 via-purple-500 to-orange-400",
    iconBg: "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400",
    badge:
      "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
    border: "border-pink-300 dark:border-pink-700",
    ring: "focus:ring-pink-400/30",
    icon: FaInstagram,
    placeholder: "https://www.instagram.com/reel/...",
    color: "#E1306C",
  },
  tiktok: {
    name: "TikTok",
    gradient: "from-gray-900 via-gray-800 to-gray-700",
    iconBg: "bg-gray-900 dark:bg-gray-700",
    badge:
      "bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-200",
    border: "border-gray-300 dark:border-gray-600",
    ring: "focus:ring-gray-400/30",
    icon: FaTiktok,
    placeholder: "https://www.tiktok.com/@username/video/...",
    color: "#010101",
  },
};

const TIKTOK_QUALITIES = [
  { value: "360p", label: "360p", desc: "Low" },
  { value: "720p", label: "720p", desc: "HD" },
  { value: "1080p", label: "1080p", desc: "Full HD" },
  { value: "best", label: "Best", desc: "Max" },
];

const tools = [
  {
    title: "Free AI Background Remover",
    desc: "Remove image backgrounds instantly with AI precision.",
    href: "/tools/background-remover-image",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    title: "Online Image Resizer",
    desc: "Resize images without losing quality.",
    href: "/tools/resizer",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    title: "Online Image Compressor",
    desc: "Compress images without visible quality loss.",
    href: "/tools/image-compressor",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "EXIF Metadata Remover",
    desc: "Strip hidden metadata from images for privacy.",
    href: "/tools/exif-remover",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "PDF to Word Converter",
    desc: "Convert PDF files to editable Word documents.",
    href: "/tools/pdf-to-word",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "YouTube Thumbnail Downloader",
    desc: "Download high-quality thumbnails from any YouTube video.",
    href: "/tools/youtube-thumbnail",
    icon: <FileVideo className="w-5 h-5" />,
  },
  {
    title: "PDF Compressor",
    desc: "Reduce PDF file size with modern compression.",
    href: "/tools/pdf-compress",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Meta Tag Generator",
    desc: "Generate perfect SEO meta tags for any page.",
    href: "/tools/meta-tag-generator",
    icon: <Tag className="w-5 h-5" />,
  },
  {
    title: "Robots.txt Generator",
    desc: "Create a robots.txt file for better crawl efficiency.",
    href: "/tools/robots-txt-generator",
    icon: <File className="w-5 h-5" />,
  },
];

const featuredStats = [
  { label: "Downloads", value: "2.5M+", icon: Download },
  { label: "Happy Users", value: "500K+", icon: Star },
  { label: "Avg Speed", value: "< 3s", icon: Clock },
  { label: "Success Rate", value: "99%", icon: TrendingUp },
];

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Lightning Fast",
    desc: "Videos processed and ready in seconds",
  },
  {
    icon: <Monitor className="h-5 w-5" />,
    title: "HD Quality",
    desc: "Download in original quality up to 1080p",
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "Mobile Friendly",
    desc: "Optimized for all Android and iOS devices",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Multi-Platform",
    desc: "Supports Facebook, Instagram & TikTok",
  },
  {
    icon: <Lock className="h-5 w-5" />,
    title: "Privacy First",
    desc: "We never store your videos or data",
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "No Registration",
    desc: "Use instantly — no sign-up required",
  },
];

/* ======================================================
   PLATFORM DETECTION
====================================================== */
function detectPlatform(url) {
  if (!url || !url.trim()) return null;
  const u = url.trim().toLowerCase();
  if (u.includes("facebook.com") || u.includes("fb.watch")) return "facebook";
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("tiktok.com")) return "tiktok";
  return null;
}

/* ======================================================
   UNIVERSAL DOWNLOADER COMPONENT
====================================================== */
function UniversalVideoDownloader() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef(null);

  const handleUrlChange = (e) => {
    const val = e.target.value;
    setUrl(val);
    setPlatform(detectPlatform(val));
    setError("");
    setResult(null);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        setPlatform(detectPlatform(text));
        setError("");
        setResult(null);
      }
    } catch {
      /* clipboard access denied */
    }
  };

  const handleClear = () => {
    setUrl("");
    setPlatform(null);
    setError("");
    setResult(null);
  };

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Please paste a video URL first.");
      return;
    }
    const detected = detectPlatform(url);
    if (!detected) {
      setError(
        "Could not detect platform. Please use a Facebook, Instagram, or TikTok link.",
      );
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      if (detected === "facebook") {
        await analyzeFacebook(url.trim());
      } else if (detected === "instagram") {
        await analyzeInstagram(url.trim());
      } else if (detected === "tiktok") {
        // TikTok: skip analyze step — download directly as binary blob
        setLoading(false);
        await downloadTikTokDirect(url.trim());
        return;
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* --- Facebook --- */
  const analyzeFacebook = async (videoUrl) => {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to analyze video");
    if (!data.qualities || data.qualities.length === 0)
      throw new Error("No downloadable qualities found for this video.");
    setResult({ type: "facebook", ...data });
  };

  const downloadFacebookQuality = async (downloadUrl, label) => {
    setDownloading(true);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: downloadUrl, quality: label }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Download failed");
      }
      const blob = await res.blob();
      triggerBlobDownload(blob, `facebook_video_${label}.mp4`);
    } catch {
      window.open(downloadUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  /* --- Instagram (via server-side proxy to avoid CORS) --- */
  const analyzeInstagram = async (videoUrl) => {
    const response = await fetch("/api/instagram-download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: videoUrl }),
    });
    const data = await response.json();
    if (!response.ok || !data.success)
      throw new Error(
        data.error || "Failed to fetch Instagram video. Make sure the link is public.",
      );
    setResult({ type: "instagram", ...data.data });
  };

  const downloadInstagramVideo = async (videoUrl, title) => {
    setDownloading(true);
    try {
      // Must proxy through our server — Instagram CDN blocks direct browser fetches (CORS)
      const clean = (title || "video").replace(/[^a-z0-9]/gi, "_").toLowerCase();
      const res = await fetch("/api/proxy-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl, filename: `${clean}.mp4` }),
      });
      if (!res.ok) {
        // Fallback: open in new tab so user can long-press save on mobile
        window.open(videoUrl, "_blank");
        return;
      }
      const blob = await res.blob();
      triggerBlobDownload(blob, `${clean}.mp4`);
    } catch {
      window.open(videoUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  /* --- TikTok (direct blob download via /api/tiktok-video) --- */
  const downloadTikTokDirect = async (videoUrl) => {
    setDownloading(true);
    setError("");
    setDownloadSuccess(false);
    try {
      const response = await fetch(
        `/api/tiktok-video?url=${encodeURIComponent(videoUrl)}&quality=best`,
        { method: "GET" },
      );
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || "TikTok download failed. Please try again.");
      }
      const blob = await response.blob();
      triggerBlobDownload(blob, `tiktok_video_${Date.now()}.mp4`);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  /* --- Helpers --- */
  const triggerBlobDownload = (blob, filename) => {
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const config = platform ? PLATFORM_CONFIG[platform] : null;
  const PlatformIcon = config?.icon;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ── Downloading Overlay ── */}
      {downloading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 text-center px-6 max-w-sm">
            {/* Pulsing ring + spinner */}
            <div className="relative flex items-center justify-center">
              <div className="absolute h-24 w-24 rounded-full border-2 border-primary/30 animate-ping" />
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <p className="text-xl font-bold">Please wait...</p>
              <p className="text-lg font-semibold text-primary">
                Your video is downloading
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This may take a few seconds depending on the video size.
                <br />
                <strong>Please do not close or refresh this tab.</strong>
              </p>
            </div>

            {/* Bouncing dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2.5 w-2.5 rounded-full bg-primary/70 animate-bounce"
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Card className="shadow-2xl border-2 border-border/60 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 pt-6 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-base">Shopyor Video Downloader</p>
              <p className="text-xs text-muted-foreground">
                Supports Facebook · Instagram · TikTok
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* URL Input */}
          <div className="space-y-2">
            <div className="relative">
              {/* Platform icon or generic link icon */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                {PlatformIcon ? (
                  <PlatformIcon
                    className="h-5 w-5"
                    style={{ color: config.color }}
                  />
                ) : (
                  <Link2 className="h-5 w-5 text-muted-foreground" />
                )}
              </div>

              <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                onKeyDown={(e) => e.key === "Enter" && handleDownload()}
                placeholder="Paste Facebook, Instagram, or TikTok link here..."
                disabled={loading}
                className={`w-full rounded-xl border bg-background pl-11 pr-24 py-4 text-sm
                  focus:outline-none focus:ring-2 ${config?.ring || "focus:ring-primary/20"}
                  focus:border-primary transition-all disabled:opacity-60
                  ${config ? config.border : "border-border"}`}
              />

              {/* Right side: paste/clear */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {url ? (
                  <button
                    onClick={handleClear}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                    title="Clear"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handlePaste}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 transition-colors text-foreground"
                  >
                    Paste
                  </button>
                )}
              </div>
            </div>

            {/* Detected platform badge */}
            {platform && config && (
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.badge}`}
              >
                <PlatformIcon className="h-3 w-3" />
                {config.name} detected
              </div>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={loading || !url.trim()}
            className={`w-full h-12 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2
              transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
              ${
                config
                  ? `bg-gradient-to-r ${config.gradient} hover:opacity-90`
                  : "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                {PlatformIcon ? (
                  <PlatformIcon className="h-4 w-4" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {platform
                  ? `Download ${config.name} Video`
                  : "Paste a URL to Download"}
              </>
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-destructive/10 border border-destructive/20 p-3 text-destructive animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* TikTok success message */}
          {downloadSuccess && (
            <div className="flex items-center gap-2 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-3 text-green-700 dark:text-green-400 animate-in fade-in duration-300">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <p className="text-sm font-medium">
                Video downloaded successfully! Check your Downloads folder.
              </p>
            </div>
          )}

          {/* Results: Facebook */}
          {result?.type === "facebook" && (
            <div className="rounded-xl border bg-muted/20 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/40">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-semibold">
                  Video Ready — Choose Quality
                </span>
              </div>
              <div className="p-4">
                {result.thumbnail && (
                  <div className="relative mb-3 rounded-lg overflow-hidden bg-black/10 max-h-48">
                    <img
                      src={result.thumbnail}
                      alt={result.title || "Facebook video"}
                      className="w-full object-cover max-h-48"
                    />
                  </div>
                )}
                {result.title && (
                  <p className="text-sm font-medium line-clamp-1 mb-3">
                    {result.title}
                  </p>
                )}
                <div className="grid gap-2 sm:grid-cols-2">
                  {result.qualities.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => downloadFacebookQuality(q.url, q.label)}
                      disabled={downloading}
                      className="flex items-center justify-between rounded-lg border p-3 text-sm hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2">
                        {q.type === "hd" ? (
                          <Monitor className="h-4 w-4 text-primary" />
                        ) : (
                          <Smartphone className="h-4 w-4 text-primary" />
                        )}
                        <span className="font-medium">{q.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {q.size}
                        </span>
                        {downloading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results: Instagram */}
          {result?.type === "instagram" && result.videoUrl && (
            <div className="rounded-xl border bg-muted/20 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/40">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-semibold">Video Ready</span>
              </div>
              <div className="p-4 space-y-3">
                {result.title && (
                  <p className="text-sm font-medium line-clamp-2">
                    {result.title}
                  </p>
                )}
                {result.username && (
                  <p className="text-xs text-muted-foreground">
                    @{result.username}
                  </p>
                )}
                <video
                  ref={videoRef}
                  src={result.videoUrl}
                  controls
                  poster={result.thumbnail}
                  playsInline
                  controlsList="nodownload"
                  className="w-full rounded-lg max-h-64 object-contain bg-black/10"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      downloadInstagramVideo(result.videoUrl, result.title)
                    }
                    disabled={downloading}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {downloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {downloading ? "Downloading..." : "Download Video"}
                  </button>
                  <button
                    onClick={() => copyToClipboard(result.videoUrl)}
                    className="flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium hover:bg-muted transition-all"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "Copied!" : "Copy Link"}
                  </button>
                  <button
                    onClick={() => window.open(result.videoUrl, "_blank")}
                    className="flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium hover:bg-muted transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/40 text-xs text-muted-foreground">
            {["HD Quality", "No Watermark", "100% Free", "No Login"].map(
              (label) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {label}
                </div>
              ),
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ======================================================
   PLATFORM CARDS
====================================================== */
function PlatformCards() {
  const platforms = [
    {
      key: "facebook",
      name: "Facebook",
      desc: "Download Facebook videos & reels in HD quality",
      href: "/tools/facebook-video-downloader",
      Icon: FaFacebook,
      gradient: "from-blue-600 to-blue-500",
      features: ["Videos & Reels", "HD Quality", "No Software"],
    },
    {
      key: "instagram",
      name: "Instagram",
      desc: "Save Instagram reels and videos instantly",
      href: "/tools/instagram-video-downloader",
      Icon: FaInstagram,
      gradient: "from-pink-500 via-purple-500 to-orange-400",
      features: ["Reels & Posts", "Best Quality", "Mobile Ready"],
    },
    {
      key: "tiktok",
      name: "TikTok",
      desc: "Download TikTok videos without watermark",
      href: "/tools/free-tiktok-video-downloader",
      Icon: FaTiktok,
      gradient: "from-gray-900 to-gray-700",
      features: ["No Watermark", "Up to 1080p", "All Regions"],
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {platforms.map((p) => (
        <Link key={p.key} href={p.href} className="group block">
          <Card className="h-full border-2 border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-5">
              <div
                className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${p.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
              >
                <p.Icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base mb-1">{p.name} Downloader</h3>
              <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
              <ul className="space-y-1">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
                Open Tool <ArrowRight className="h-3 w-3" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

/* ======================================================
   MAIN PAGE
====================================================== */
export default function HomePageClient() {
  return (
    <main className="min-h-screen">
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-6 pb-20">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -bottom-20 -left-40 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl px-4">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Free Shopyor Video Downloader
            </div>
          </div>

          {/* Headline */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-5">
              Download Any Social{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Video Instantly
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Paste any link from{" "}
              <span className="font-semibold text-blue-500">Facebook</span>,{" "}
              <span className="font-semibold text-pink-500">Instagram</span>, or{" "}
              <span className="font-semibold text-foreground">TikTok</span> —
              our tool auto-detects the platform and downloads in HD for free.
            </p>
          </div>

          {/* Universal Downloader */}
          <div className="flex justify-center mb-10">
            <UniversalVideoDownloader />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {featuredStats.map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className="h-5 w-5 mx-auto mb-1.5 text-primary" />
                <p className="text-xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM CARDS ───────────────────────────── */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Supported Platforms
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              One universal downloader — three major platforms. Each tool page
              offers the full dedicated experience.
            </p>
          </div>
          <PlatformCards />
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              How to Download in 3 Steps
            </h2>
            <p className="text-muted-foreground text-sm">
              Works for Facebook, Instagram & TikTok
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 relative">
            {/* connector lines */}
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {[
              {
                step: "01",
                icon: Link2,
                title: "Copy the Video URL",
                desc: "Open Facebook, Instagram, or TikTok. Find the video and copy its link from your browser or the share menu.",
              },
              {
                step: "02",
                icon: Play,
                title: "Paste & Auto-Detect",
                desc: "Paste the link into our input box. The tool instantly recognizes the platform and prepares the download.",
              },
              {
                step: "03",
                icon: Download,
                title: "Download in HD",
                desc: "Click the download button. Choose your preferred quality if prompted, and save the video to your device.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center group px-4"
              >
                <div className="relative mb-5 flex justify-center">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    {item.step}
                  </div>
                </div>
                <div className="inline-flex p-3 rounded-xl bg-muted mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Why Choose Shopyor Video Downloader?
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Built for speed, privacy, and reliability across all devices
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Card
                key={i}
                className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <CardContent className="p-5">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-base mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── MORE TOOLS ───────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              More Free Online Tools
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Image editors, PDF converters, SEO tools and more — all free, no
              sign-up required
            </p>
          </div>
          <ToolCards tools={tools} />
        </div>
      </section>

      {/* ── SEO CONTENT ──────────────────────────────── */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            The Best Free Social Video Downloader Online
          </h2>

          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Shopyor is a free, universal{" "}
              <strong>social media video downloader</strong> that supports{" "}
              <strong>Facebook</strong>, <strong>Instagram</strong>, and{" "}
              <strong>TikTok</strong>. Simply paste any video link and our
              intelligent platform detection automatically identifies whether
              it's a Facebook reel, an Instagram video, or a TikTok clip —
              then downloads it in the best available quality, all without
              requiring any software installation or account login.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Unlike other tools that only support one platform, Shopyor handles
              all three major social networks from a single input box. Our{" "}
              <strong>Facebook video downloader</strong> supports videos, reels,
              and shared content in HD. The{" "}
              <strong>Instagram video downloader</strong> works with reels,
              posts, and IGTV content. Our{" "}
              <strong>TikTok downloader</strong> removes watermarks and lets
              you choose from 360p up to 1080p quality.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-3">
              Why Shopyor Ranks as the Best Free Video Downloader
            </h3>
            <ul className="list-none space-y-2 text-muted-foreground">
              {[
                "Auto-detects Facebook, Instagram, and TikTok URLs automatically",
                "100% free with no hidden fees, subscriptions, or premium tiers",
                "No registration or account creation required",
                "Downloads videos in original HD quality (up to 1080p)",
                "Works seamlessly on Android, iPhone, Windows, and Mac",
                "Privacy-focused — we never store your URLs or downloaded videos",
                "TikTok videos downloaded without the TikTok watermark",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-muted-foreground leading-relaxed mt-6">
              Beyond video downloading, Shopyor provides a full suite of free
              tools including an{" "}
              <Link
                href="/tools/background-remover-image"
                className="text-primary hover:underline font-medium"
              >
                AI Image Background Remover
              </Link>
              ,{" "}
              <Link
                href="/tools/image-compressor"
                className="text-primary hover:underline font-medium"
              >
                Image Compressor
              </Link>
              ,{" "}
              <Link
                href="/tools/pdf-to-word"
                className="text-primary hover:underline font-medium"
              >
                PDF to Word Converter
              </Link>
              , and SEO tools like our{" "}
              <Link
                href="/tools/meta-tag-generator"
                className="text-primary hover:underline font-medium"
              >
                Meta Tag Generator
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: "How do I download a Facebook video?",
                a: "Copy the Facebook video or reel URL, paste it in the input above, and click Download. Our tool fetches the video in HD quality automatically.",
              },
              {
                q: "Can I download Instagram reels?",
                a: "Yes. Paste any public Instagram reel or video URL and our tool will detect it as Instagram and download the video for you.",
              },
              {
                q: "Does the TikTok downloader remove the watermark?",
                a: "Yes. Our TikTok downloader returns a clean version of the video without the TikTok logo watermark.",
              },
              {
                q: "Is this video downloader free?",
                a: "Completely free. No registration, no subscription, and no hidden charges. Use it as many times as you want.",
              },
              {
                q: "What video quality can I download?",
                a: "For Facebook and Instagram we download the best available quality (up to 1080p). For TikTok you can select from 360p, 720p, 1080p, or Best.",
              },
              {
                q: "Does it work on mobile?",
                a: "Yes. The tool is fully responsive and works on all smartphones and tablets, including iPhone and Android devices.",
              },
              {
                q: "Do you store my data or videos?",
                a: "No. We never store any URLs, videos, or personal data. All processing is done in real-time and nothing is saved on our servers.",
              },
              {
                q: "Can I download private videos?",
                a: "No. This tool only works with publicly available videos. Downloading private content is not supported for privacy and legal reasons.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/8 via-transparent to-primary/8">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Download Any Social Video?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Free, fast, and private. No sign-up required. Works on all devices.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="group"
            >
              <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              Download a Video Now
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tools">
                Explore All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── LEGAL ────────────────────────────────────── */}
      <div className="py-8 px-4 border-t">
        <div className="container mx-auto max-w-4xl">
          <p className="text-xs text-center text-muted-foreground leading-relaxed">
            Shopyor is not affiliated with Facebook, Meta, Instagram, or TikTok
            (ByteDance). This tool is intended for downloading{" "}
            <strong>publicly available</strong> videos for{" "}
            <strong>personal, non-commercial use only</strong>. By using this
            tool, you agree to respect all applicable copyright laws and each
            platform&apos;s terms of service. We do not host, store, or
            redistribute any downloaded content.
          </p>
        </div>
      </div>
    </main>
  );
}
