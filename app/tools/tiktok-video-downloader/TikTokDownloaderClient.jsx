// app/tools/tiktok-video-downloader/TikTokDownloaderClient.jsx - Fixed Version
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
      setError("Please enter a valid TikTok video URL");
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
      a.download = `tiktok_video_${Date.now()}.mp4`;
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

  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  // Safe function to get author name
  const getAuthorName = (author) => {
    if (!author) return "U";
    if (typeof author === "string") return author;
    if (typeof author === "object") {
      return author.unique_id || author.username || author.nickname || "U";
    }
    return "U";
  };

  // Safe function to get author initial
  const getAuthorInitial = (author) => {
    const name = getAuthorName(author);
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-black to-gray-800 text-white mb-4 shadow-lg">
            <FaTiktok className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-black via-gray-700 to-black dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
            TikTok Video Downloader
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download TikTok videos{" "}
            <strong className="text-primary">without watermark</strong> in HD
            quality. Free, fast, and easy to use.
          </p>
        </div>

        {/* URL Input Section */}
        <Card className="shadow-xl border-2">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Link2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyzeVideo()}
                  placeholder="Paste TikTok video URL here..."
                  className="w-full rounded-xl border bg-background pl-12 pr-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20"
                  disabled={loading}
                />
              </div>

              <button
                onClick={analyzeVideo}
                disabled={loading}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-black to-gray-800 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all hover:from-gray-800 hover:to-black disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing Video...
                  </>
                ) : (
                  <>
                    <FaTiktok className="h-5 w-5" />
                    Analyze & Download Video
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t text-xs text-muted-foreground">
              <span>✓ No Watermark</span>
              <span>✓ HD Quality</span>
              <span>✓ Free Forever</span>
              <span>✓ No Registration</span>
              <span>✓ Mobile Friendly</span>
            </div>
          </CardContent>
        </Card>

        {/* Video Info Section */}
        {videoInfo && (
          <div className="mt-6 rounded-2xl bg-card shadow-xl border overflow-hidden">
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
                <div className="relative flex-shrink-0">
                  <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="w-full md:w-56 rounded-lg shadow-md object-cover aspect-[9/16]"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "https://picsum.photos/400/300";
                    }}
                  />
                </div>

                {/* Video Info */}
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                    {videoInfo.title}
                  </h4>
                  {/* Author Section - Fixed to handle different data types */}
                  {videoInfo.author && (
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">
                        {getAuthorInitial(videoInfo.author)}
                      </div>
                      <span className="font-medium">
                        @{getAuthorName(videoInfo.author)}
                      </span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {videoInfo.plays && (
                      <div className="text-center p-2 bg-muted/30 rounded-lg">
                        <Eye className="h-4 w-4 mx-auto mb-1" />
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
                  </div>
                  {/* Download Options */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">
                      Select Download Quality:
                    </p>
                    <div className="grid gap-3">
                      {videoInfo.qualities &&
                        videoInfo.qualities.map((quality, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              handleDownload(quality.url, quality.label)
                            }
                            disabled={downloading}
                            className="flex items-center justify-between rounded-lg border p-3 transition-all hover:border-primary hover:bg-primary/5"
                          >
                            <div className="flex items-center gap-2">
                              {quality.type === "hd" ? (
                                <Monitor className="h-4 w-4 text-primary" />
                              ) : quality.type === "audio" ? (
                                <Music className="h-4 w-4 text-primary" />
                              ) : (
                                <FileVideo className="h-4 w-4 text-primary" />
                              )}
                              <span className="font-medium">
                                {quality.label}
                              </span>
                            </div>
                            <Download className="h-4 w-4" />
                          </button>
                        ))}
                    </div>
                  </div>
                  // Add this to your video info section to verify the video
                  {videoInfo && (
                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <p className="text-sm text-yellow-800 dark:text-yellow-400">
                        ⚠️ Please verify the thumbnail and title match the video
                        you want to download before proceeding.
                      </p>
                    </div>
                  )}
                  {videoInfo && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Video ID: {videoInfo.id}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Download Progress */}
        {downloading && downloadProgress > 0 && downloadProgress < 100 && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="rounded-xl bg-card p-6 shadow-2xl text-center w-80">
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

        {/* Features */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <Download className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">No Watermark</h3>
              <p className="text-sm text-muted-foreground">
                Download TikTok videos without watermarks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Get download links in seconds
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                We don't store any videos or data
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Copyright Disclaimer */}
        <TikTokCopyrightDisclaimer />
      </div>
    </div>
  );
}
