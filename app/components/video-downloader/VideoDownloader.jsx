// components/VideoDownloader.jsx (Updated to handle the new data structure)
"use client";

import { useState } from "react";
import {
  Download,
  Loader2,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
  FileVideo,
  Smartphone,
  Monitor,
  Clock,
  Film,
} from "lucide-react";

export function VideoDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const validateUrl = (input) => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9\.]+\/videos\/[a-zA-Z0-9\.]+\/?/,
      /(?:https?:\/\/)?(?:www\.)?fb\.watch\/[a-zA-Z0-9]+/,
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/reel\/[0-9]+/,
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/watch\?v=[0-9]+/,
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/share\/[a-zA-Z0-9]+\/?/,
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/share\/r\/[a-zA-Z0-9]+\/?/,
    ];
    return patterns.some((pattern) => pattern.test(input));
  };

  const analyzeVideo = async () => {
    if (!url.trim()) {
      setError("Please enter a Facebook video URL");
      return;
    }

    if (!validateUrl(url)) {
      setError("Please enter a valid Facebook video or reel URL");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analyze", {
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
      const response = await fetch("/api/download", {
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
      a.download = `facebook_video_${quality.replace(/\s/g, "_")}_${Date.now()}.mp4`;
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

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getQualityIcon = (type) => {
    if (type === "hd") return <Monitor className="h-4 w-4 text-primary" />;
    if (type === "mobile")
      return <Smartphone className="h-4 w-4 text-primary" />;
    return <FileVideo className="h-4 w-4 text-primary" />;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* URL Input Section */}
      <div className="rounded-2xl bg-card shadow-xl border p-6 md:p-8">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <LinkIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyzeVideo()}
              placeholder="Paste Facebook video or reel URL here..."
              className="w-full rounded-xl border bg-background pl-12 pr-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all dark:bg-slate-900"
              disabled={loading}
            />
          </div>

          <button
            onClick={analyzeVideo}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing Video...
              </>
            ) : (
              <>
                <Film className="h-5 w-5" />
                Analyze Video
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Video Info & Download Section */}
      {videoInfo && (
        <div className="mt-6 rounded-2xl bg-card shadow-xl border overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b bg-muted/30">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold">Video Ready to Download</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Thumbnail */}
              <div className="relative flex-shrink-0">
                <img
                  src={videoInfo.thumbnail}
                  alt={videoInfo.title}
                  className="w-full md:w-56 rounded-lg shadow-md object-cover aspect-video"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x225?text=Video+Thumbnail";
                  }}
                />
                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatDuration(videoInfo.duration)}
                </div>
              </div>

              {/* Video Title & Download Options */}
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-3 line-clamp-2">
                  {videoInfo.title !== "Untitled"
                    ? videoInfo.title
                    : "Facebook Video"}
                </h4>

                {videoInfo.videoId && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Video ID: {videoInfo.videoId}
                  </p>
                )}

                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Select Quality:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {videoInfo.qualities.map((quality, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          handleDownload(quality.url, quality.label)
                        }
                        disabled={downloading}
                        className="flex items-center justify-between rounded-lg border p-3 transition-all hover:border-primary hover:bg-primary/5 disabled:opacity-50 group"
                      >
                        <div className="flex items-center gap-2">
                          {getQualityIcon(quality.type)}
                          <span className="font-medium">{quality.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {quality.size && (
                            <span className="text-xs text-muted-foreground">
                              {quality.size}
                            </span>
                          )}
                          <Download className="h-4 w-4 group-hover:text-primary transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>

                  {videoInfo.qualities.length === 0 && (
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        No download options available for this video.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Download Progress Modal */}
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
    </div>
  );
}
