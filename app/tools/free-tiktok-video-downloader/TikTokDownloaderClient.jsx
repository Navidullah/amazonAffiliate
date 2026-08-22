// app/tools/free-tiktok-video-downloader/TikTokDownloaderClient.jsx
"use client";

import { useState } from "react";

export default function TikTokDownloaderClient() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quality, setQuality] = useState("best");
  const [success, setSuccess] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a TikTok URL");
      return;
    }

    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch(
        `/api/tiktok-video?url=${encodeURIComponent(url)}&quality=${quality}`,
        { method: "GET" },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Download failed");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `tiktok-video-${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Download error:", err);
      setError(err.message || "Failed to download video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && text.includes("tiktok.com")) {
        setUrl(text);
        setError("");
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const handleClear = () => {
    setUrl("");
    setError("");
    setSuccess(false);
  };

  return (
    <div className="rounded-2xl border bg-card shadow-sm p-6 md:p-8">
      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2 justify-center">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-green-700 dark:text-green-400 font-medium">
              Video downloaded successfully! Check your downloads folder.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 justify-center">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700 dark:text-red-400 font-medium">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleDownload}>
        {/* URL Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            TikTok Video URL
          </label>
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="https://www.tiktok.com/@username/video/123456789..."
              className="w-full px-4 py-3 pr-32 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-background text-foreground"
              disabled={loading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              {url && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-1 text-muted-foreground hover:text-foreground text-sm"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={handlePaste}
                className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-md text-sm font-medium text-muted-foreground transition-colors"
                disabled={loading}
              >
                Paste
              </button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Supports tiktok.com, vm.tiktok.com, and tiktok.com/@username links
          </p>
        </div>

        {/* Quality Options */}
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-3">
            Video Quality
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: "360p", label: "360p", desc: "Low Quality" },
              { value: "720p", label: "720p", desc: "Standard" },
              { value: "1080p", label: "1080p", desc: "HD Quality" },
              { value: "best", label: "Best", desc: "Maximum Quality" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setQuality(option.value)}
                className={`p-3 rounded-lg text-center transition-all ${
                  quality === option.value
                    ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                disabled={loading}
              >
                <div className="font-semibold">{option.label}</div>
                <div className="text-xs opacity-75">{option.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Download Button */}
        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing Video...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Video
            </span>
          )}
        </button>
      </form>

      {/* Waiting Notice */}
      {loading && (
        <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-center dark:border-blue-800 dark:bg-blue-900/20">
          <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
            Please wait up to 2 minutes, the download will start soon.
          </p>
          <p className="mt-1 text-xs text-blue-600/80 dark:text-blue-400/70">
            Stay on this page — closing or refreshing will cancel your download.
          </p>
        </div>
      )}

      {/* Features Grid */}
      <div className="mt-8 pt-6 border-t">
        <p className="text-sm font-semibold text-center mb-4">
          Why use Shopyor TikTok Downloader?
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { icon: "✂️", title: "No Watermark", desc: "Clean MP4 without TikTok logo" },
            { icon: "⚡", title: "Fast Download", desc: "Ready in a few seconds" },
            { icon: "🔒", title: "Free & Private", desc: "No login, no data stored" },
            { icon: "📱", title: "Mobile Ready", desc: "iPhone, Android & desktop" },
            { icon: "🎬", title: "HD Quality", desc: "Up to 1080p resolution" },
            { icon: "🌍", title: "Any Public Video", desc: "Works on all TikTok links" },
          ].map((f, i) => (
            <div
              key={i}
              className="text-center p-3 rounded-lg bg-muted/40"
            >
              <div className="text-2xl mb-1">{f.icon}</div>
              <div className="font-semibold text-sm">{f.title}</div>
              <div className="text-xs text-muted-foreground">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
