"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  Loader2,
  Link2,
  AlertCircle,
  CheckCircle2,
  Youtube,
  Sparkles,
  Shield,
} from "lucide-react";

// Get API URL from environment variable
const API_URL =
  process.env.NEXT_PUBLIC_YOUTUBE_API_URL || "http://localhost:8000";

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [removeWatermark, setRemoveWatermark] = useState(true);

  const analyzeVideo = async () => {
    if (!url.trim()) {
      setError("Please enter a YouTube video URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to analyze video");
      }

      setVideoInfo(data);
      if (data.formats && data.formats.length > 0) {
        setSelectedFormat(data.formats[0]);
      }
    } catch (err) {
      setError(err.message || "Failed to analyze video. Please try again.");
      setVideoInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!selectedFormat) {
      setError("Please select a quality first");
      return;
    }

    setDownloading(true);

    try {
      const response = await fetch(`${API_URL}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          format_id: selectedFormat.format_id,
          remove_watermark: removeWatermark,
        }),
      });

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      const watermarkSuffix = removeWatermark ? "_no_watermark" : "";
      a.download = `${videoInfo.title.replace(/[^a-z0-9]/gi, "_")}${watermarkSuffix}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      setError(err.message || "Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-red-600 to-red-500 text-white mb-4 shadow-lg">
            <Youtube className="h-8 w-8" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            YouTube Video Downloader
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download YouTube videos in{" "}
            <strong className="text-red-500">any quality</strong> from 144p to
            4K.
            <span className="block text-sm mt-1">
              ✨ Try to remove watermarks from videos!
            </span>
          </p>
        </div>

        {/* URL Input */}
        <Card className="shadow-xl border-2">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Link2 className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyzeVideo()}
                  placeholder="Paste YouTube video URL here..."
                  className="pl-12 py-6 text-base"
                  disabled={loading}
                />
              </div>

              <Button
                onClick={analyzeVideo}
                disabled={loading}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-6 text-base font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Analyzing Video...
                  </>
                ) : (
                  <>
                    <Youtube className="h-5 w-5 mr-2" />
                    Analyze Video
                  </>
                )}
              </Button>
            </div>

            {/* Watermark Removal Toggle */}
            {videoInfo && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      Remove Watermarks
                    </span>
                  </div>
                  <button
                    onClick={() => setRemoveWatermark(!removeWatermark)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      removeWatermark ? "bg-blue-600" : "bg-muted"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        removeWatermark ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {removeWatermark
                    ? "✨ Enabled: Will try to download version without watermarks"
                    : "⚠️ Disabled: Will download standard version (may include watermarks)"}
                </p>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t text-xs text-muted-foreground">
              <span>✓ All Qualities (144p - 4K)</span>
              <span>✓ MP4 Format</span>
              <span>✓ Free Forever</span>
              <span>✓ Watermark Removal Option</span>
            </div>
          </CardContent>
        </Card>

        {/* Video Info */}
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
                    className="w-full md:w-64 rounded-lg shadow-md object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                    {formatDuration(videoInfo.duration)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                    {videoInfo.title}
                  </h4>

                  <div className="flex items-center gap-4 mb-4 pb-4 border-b text-sm text-muted-foreground">
                    <span>👤 {videoInfo.author}</span>
                    <span>👁️ {formatNumber(videoInfo.views)} views</span>
                  </div>

                  {/* Quality Selection */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Select Quality:</p>
                    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-h-60 overflow-y-auto p-1">
                      {videoInfo.formats.map((format, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedFormat(format)}
                          className={`flex flex-col items-center p-2 rounded-lg border transition-all ${
                            selectedFormat?.format_id === format.format_id
                              ? "border-red-500 bg-red-500/10 ring-2 ring-red-500/20"
                              : "hover:border-red-500 hover:bg-red-500/5"
                          }`}
                        >
                          <span
                            className={`font-bold text-xs ${format.has_watermark ? "line-through text-muted-foreground" : ""}`}
                          >
                            {format.quality
                              .replace(" (no watermark)", "")
                              .replace(" (with watermark)", "")}
                          </span>
                          {!format.has_watermark && (
                            <span className="text-[10px] text-green-600 mt-0.5">
                              ✨ No WM
                            </span>
                          )}
                          {format.has_watermark && (
                            <span className="text-[10px] text-orange-500 mt-0.5">
                              ⚠️ WM
                            </span>
                          )}
                          {format.size !== "Unknown" && (
                            <span className="text-[10px] text-muted-foreground">
                              {format.size}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <Button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 py-6 text-base font-semibold"
                  >
                    {downloading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5 mr-2" />
                        Download{" "}
                        {selectedFormat?.quality?.split(" ")[0] || "Video"}
                        {removeWatermark && " (No Watermark)"}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">
                    {removeWatermark
                      ? "✨ Trying to download watermark-free version (if available)"
                      : "📹 Downloading standard version"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
