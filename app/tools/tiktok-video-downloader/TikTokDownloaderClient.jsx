// app/tools/tiktok-video-downloader/TikTokDownloaderClient.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  Zap,
  Shield,
  Smartphone,
  Monitor,
  Loader2,
  Link2,
  AlertCircle,
  CheckCircle2,
  FileVideo,
  Heart,
  Eye,
  Music,
  Share2,
  MessageCircle,
  TrendingUp,
  Clock,
  Check,
  X,
  Copy,
  ExternalLink,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { TikTokCopyrightDisclaimer } from "@/app/components/tiktokcopyrightdisclaimer/TikTokCopyrightDisclaimer";

export default function TikTokDownloaderClient() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      setUrl(decodeURIComponent(urlParam));
      setTimeout(() => analyzeVideo(), 500);
    }
  }, [searchParams]);

  const validateUrl = (input) => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/i,
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w.-]+\/photo\/\d+/i,
      /(?:https?:\/\/)?(?:vm\.tiktok\.com)\/[\w]+\/?/i,
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/t\/[\w]+\/?/i,
    ];
    return patterns.some((pattern) => pattern.test(input));
  };

  const analyzeVideo = async () => {
    if (!url.trim()) {
      setError("Please enter a TikTok video URL");
      return;
    }

    if (!validateUrl(url)) {
      setError(
        "Please enter a valid TikTok video URL. Example: https://www.tiktok.com/@username/video/1234567890",
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tiktok/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze video");
      }

      setVideoInfo(data);
    } catch (err) {
      setError(err.message || "Failed to analyze video. Please try again.");
      setVideoInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (downloadUrl, quality) => {
    setDownloading(true);
    setDownloadProgress(0);

    try {
      const response = await fetch("/api/tiktok/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: downloadUrl, quality }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Download failed");
      }

      const contentLength = response.headers.get("content-length");
      const total = parseInt(contentLength, 10);
      let loaded = 0;

      const reader = response.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        if (total) {
          setDownloadProgress(Math.round((loaded / total) * 100));
        }
      }

      const blob = new Blob(chunks, { type: "video/mp4" });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `tiktok_video_${quality.replace(/\s/g, "_")}_${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);

      setDownloadProgress(100);
      setTimeout(() => setDownloadProgress(0), 2000);
    } catch (err) {
      setError(err.message || "Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-black to-gray-800 text-white mb-4 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
            <FaTiktok className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-black via-gray-700 to-black dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
            TikTok Video Downloader
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Download TikTok videos{" "}
            <strong className="text-primary">without watermark</strong> in HD
            quality. Free, fast, and easy to use. Works on all devices.
          </p>
        </div>

        {/* URL Input Section */}
        <Card className="shadow-xl border-2 hover:border-primary/20 transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Link2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyzeVideo()}
                  placeholder="Paste TikTok video URL here... (e.g., https://www.tiktok.com/@username/video/1234567890)"
                  className="w-full rounded-xl border bg-background pl-12 pr-24 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:bg-slate-900"
                  disabled={loading}
                />
                {url && (
                  <button
                    onClick={copyToClipboard}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-muted transition-colors"
                    title="Copy URL"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                )}
              </div>

              <button
                onClick={analyzeVideo}
                disabled={loading}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-black to-gray-800 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-gray-800 hover:to-black hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing Video...
                  </>
                ) : (
                  <>
                    <FaTiktok className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    Analyze & Download Video
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t text-xs text-muted-foreground">
              <span className="flex items-center gap-1">✓ No Watermark</span>
              <span className="flex items-center gap-1">✓ HD Quality</span>
              <span className="flex items-center gap-1">✓ Free Forever</span>
              <span className="flex items-center gap-1">✓ No Registration</span>
              <span className="flex items-center gap-1">✓ Mobile Friendly</span>
            </div>
          </CardContent>
        </Card>

        {/* Video Info Section */}
        {videoInfo && (
          <div className="mt-6 rounded-2xl bg-card shadow-xl border overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-lg">
                  ✅ Video Ready to Download
                </h3>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Thumbnail */}
                <div className="relative flex-shrink-0 group">
                  <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="w-full md:w-56 rounded-lg shadow-md object-cover aspect-[9/16] group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {videoInfo.duration && (
                    <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {Math.floor(videoInfo.duration / 60)}:
                      {(videoInfo.duration % 60).toString().padStart(2, "0")}
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                    {videoInfo.title}
                  </h4>

                  {/* Author & Stats */}
                  {videoInfo.author && (
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {videoInfo.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">@{videoInfo.author}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {videoInfo.plays && (
                      <div className="text-center p-2 bg-muted/30 rounded-lg">
                        <Eye className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Plays</p>
                        <p className="font-semibold text-sm">
                          {formatNumber(videoInfo.plays)}
                        </p>
                      </div>
                    )}
                    {videoInfo.likes && (
                      <div className="text-center p-2 bg-muted/30 rounded-lg">
                        <Heart className="h-4 w-4 mx-auto mb-1 text-red-500" />
                        <p className="text-xs text-muted-foreground">Likes</p>
                        <p className="font-semibold text-sm">
                          {formatNumber(videoInfo.likes)}
                        </p>
                      </div>
                    )}
                    {videoInfo.comments && (
                      <div className="text-center p-2 bg-muted/30 rounded-lg">
                        <MessageCircle className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          Comments
                        </p>
                        <p className="font-semibold text-sm">
                          {formatNumber(videoInfo.comments)}
                        </p>
                      </div>
                    )}
                    {videoInfo.shares && (
                      <div className="text-center p-2 bg-muted/30 rounded-lg">
                        <Share2 className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Shares</p>
                        <p className="font-semibold text-sm">
                          {formatNumber(videoInfo.shares)}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Download Options */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      Select Download Quality:
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {videoInfo.qualities.map((quality, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            handleDownload(quality.url, quality.label)
                          }
                          disabled={downloading}
                          className="group flex items-center justify-between rounded-lg border p-3 transition-all hover:border-primary hover:bg-primary/5 disabled:opacity-50"
                        >
                          <div className="flex items-center gap-2">
                            {quality.type === "hd" ? (
                              <Monitor className="h-4 w-4 text-primary" />
                            ) : quality.type === "audio" ? (
                              <Music className="h-4 w-4 text-primary" />
                            ) : (
                              <Smartphone className="h-4 w-4 text-primary" />
                            )}
                            <span className="font-medium">{quality.label}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            {quality.size && (
                              <span className="text-xs text-muted-foreground">
                                {quality.size}
                              </span>
                            )}
                            <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Download Progress Modal */}
        {downloading && downloadProgress > 0 && downloadProgress < 100 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="rounded-xl bg-card p-6 shadow-2xl text-center w-80 animate-in scale-in-95">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
              <p className="mt-3 font-medium">Downloading video...</p>
              <div className="mt-4 h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {downloadProgress}%
              </p>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Download,
              title: "No Watermark",
              desc: "Download TikTok videos without watermarks in original quality",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Get your download links in seconds with optimized servers",
            },
            {
              icon: Shield,
              title: "Privacy First",
              desc: "We don't store any videos or personal data",
            },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="group hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-xl bg-black/10 text-black dark:bg-white/10 dark:text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How to Use Section */}
        <Card className="mt-12 bg-muted/30">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              How to Download TikTok Videos in 3 Simple Steps
            </h3>
            <ol className="space-y-4">
              <li className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-center text-sm font-medium leading-7">
                  1
                </span>
                <div>
                  <p className="font-medium">Copy TikTok Video URL</p>
                  <p className="text-sm text-muted-foreground">
                    Open TikTok app, find the video you want, tap share button,
                    and select "Copy Link"
                  </p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-center text-sm font-medium leading-7">
                  2
                </span>
                <div>
                  <p className="font-medium">Paste URL & Analyze</p>
                  <p className="text-sm text-muted-foreground">
                    Paste the copied URL in the input field above and click
                    "Analyze & Download Video"
                  </p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-center text-sm font-medium leading-7">
                  3
                </span>
                <div>
                  <p className="font-medium">Download Your Video</p>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred quality (No Watermark HD or Audio
                    Only) and click download
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Alert className="mt-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <AlertDescription className="text-sm text-blue-800 dark:text-blue-400">
            💡 <strong>Pro Tip:</strong> You can download TikTok videos from any
            URL format - regular links, share links (vm.tiktok.com/xxx), and
            mobile links all work perfectly!
          </AlertDescription>
        </Alert>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Is this TikTok downloader free?",
                a: "Yes, completely free with no hidden charges or premium tiers.",
              },
              {
                q: "Can I download TikTok videos without watermark?",
                a: "Yes, our tool downloads videos without the TikTok watermark in HD quality.",
              },
              {
                q: "Does it work on mobile?",
                a: "Yes, our tool is fully responsive and works on iPhone, Android, and all mobile browsers.",
              },
              {
                q: "Do I need to install any app?",
                a: "No, it works directly in your browser. No installation needed.",
              },
              {
                q: "Is it legal to download TikTok videos?",
                a: "Downloading for personal use is fine. Don't redistribute without permission.",
              },
              {
                q: "What video qualities are available?",
                a: "HD quality without watermark and audio-only MP3 downloads.",
              },
            ].map((faq, i) => (
              <div key={i} className="p-4 bg-muted/30 rounded-lg">
                <p className="font-semibold mb-1">❓ {faq.q}</p>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright Disclaimer */}
        <TikTokCopyrightDisclaimer />
      </div>
    </div>
  );
}
