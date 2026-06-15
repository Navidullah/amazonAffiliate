// app/tools/instagram-video-downloader/client.jsx
"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  AlertCircle,
  Instagram,
  Loader2,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

export default function InstagramVideoDownloaderClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef(null);

  const isValidInstagramUrl = (url) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|p|tv)\/([a-zA-Z0-9_-]+)/;
    return pattern.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter an Instagram URL");
      return;
    }

    if (!isValidInstagramUrl(url)) {
      setError("Please enter a valid Instagram reel or video URL");
      return;
    }

    setError("");
    setLoading(true);
    setVideoData(null);

    try {
      const response = await fetch("/api/instagram-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch video");
      }

      setVideoData({
        videoUrl: data.data.videoUrl,
        thumbnail: data.data.thumbnail,
        title: data.data.title,
        fullTitle: data.data.fullTitle,
        username: data.data.username,
        duration: data.data.duration,
        type: data.data.type,
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (videoUrl, title) => {
    const cleanTitle = (title || "video")
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const filename = `${cleanTitle}.mp4`;

    setDownloading(true);
    try {
      const res = await fetch("/api/proxy-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl, filename }),
      });

      if (!res.ok) throw new Error("proxy failed");

      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(videoUrl, "_blank");
    } finally {
      setDownloading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatDuration = (seconds) => {
    if (!seconds || seconds === 0) return "Unknown";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full border shadow-sm">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="instagram-url"
            className="text-sm font-medium text-foreground"
          >
            Paste Instagram Reel or Video URL
          </label>
          <input
            id="instagram-url"
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="https://www.instagram.com/reel/..."
            className="w-full rounded-xl border bg-background px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Instagram className="h-5 w-5" />
                Download Video
              </>
            )}
          </button>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>

        {/* Video Preview & Download */}
        {videoData && (
          <div className="mt-6 space-y-4">
            <div className="bg-muted/30 rounded-lg p-3">
              <h3
                className="font-semibold text-lg truncate"
                title={videoData.fullTitle || videoData.title}
              >
                {videoData.title || "Instagram Video"}
              </h3>
              {videoData.username && (
                <p className="text-sm text-muted-foreground mt-1">
                  @{videoData.username}
                </p>
              )}
            </div>

            <div className="rounded-lg overflow-hidden bg-black/5">
              <video
                ref={videoRef}
                src={videoData.videoUrl}
                controls
                className="w-full max-h-[500px] object-contain"
                poster={videoData.thumbnail}
                controlsList="nodownload"
                playsInline
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center p-4 bg-muted/20 rounded-lg">
              <div className="space-y-1">
                {videoData.type && (
                  <p className="text-xs text-muted-foreground capitalize">
                    Type: {videoData.type}
                  </p>
                )}
                {videoData.duration > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Duration: {formatDuration(videoData.duration)}
                  </p>
                )}
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    handleDownload(videoData.videoUrl, videoData.title)
                  }
                  disabled={downloading}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground cursor-pointer hover:bg-primary/90 transition-all flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {downloading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download {videoData.title || "Video"}
                    </>
                  )}
                </button>

                <button
                  onClick={() => copyToClipboard(videoData.videoUrl)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted transition-all"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied!" : "Copy Link"}
                </button>

                <button
                  onClick={() => window.open(videoData.videoUrl, "_blank")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-muted transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open
                </button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
