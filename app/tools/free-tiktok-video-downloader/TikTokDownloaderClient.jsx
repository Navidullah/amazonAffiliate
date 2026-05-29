// app/tools/tiktok-downloader/client.js
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800  py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            TikTok Video Downloader
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Download TikTok videos without watermark • Free & Fast
          </p>
          <p className="text-sm opacity-75 mt-2">
            No registration required • Works on all devices
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl -mt-8 relative z-10 p-6 md:p-8">
          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fadeIn">
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
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-fadeIn">
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
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
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
                  className="w-full px-4 py-3 pr-32 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  disabled={loading}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                  {url && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="px-3 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors"
                    disabled={loading}
                  >
                    Paste
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Supports TikTok.com, vm.tiktok.com, and tiktok.com/@username
                links
              </p>
            </div>

            {/* Quality Options */}
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
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
                        ? "bg-blue-600 text-white shadow-md ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
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

          {/* Features Grid */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white mb-4">
              Why Choose Shopyor TikTok Downloader?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  emoji: "🎵",
                  title: "No Watermark",
                  desc: "Clean videos without TikTok logo",
                },
                {
                  emoji: "⚡",
                  title: "Fast Download",
                  desc: "High-speed downloads",
                },
                {
                  emoji: "🔒",
                  title: "Free & Safe",
                  desc: "No registration required",
                },
                {
                  emoji: "📱",
                  title: "Mobile Ready",
                  desc: "Works on all devices",
                },
                {
                  emoji: "🎨",
                  title: "HD Quality",
                  desc: "Up to 1080p resolution",
                },
                {
                  emoji: "🌍",
                  title: "Global",
                  desc: "Works with all TikTok videos",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="text-2xl mb-1">{feature.emoji}</div>
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">
                    {feature.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {feature.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Is this TikTok downloader free?",
                a: "Yes, completely free with no hidden costs or registration required.",
              },
              {
                q: "Does it remove TikTok watermark?",
                a: "Yes, all downloaded videos are without the TikTok watermark.",
              },
              {
                q: "What qualities can I download?",
                a: "You can download in 360p, 720p, 1080p, or best available quality.",
              },
              {
                q: "Is it legal to download TikTok videos?",
                a: "For personal use only. Respect content creators' rights and TikTok's terms.",
              },
              {
                q: "Do I need to install anything?",
                a: "No, it works directly in your browser. No software installation needed.",
              },
              {
                q: "Can I use it on mobile?",
                a: "Yes, it works perfectly on all devices including iPhone and Android.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
            How to Download TikTok Videos
          </h3>
          <div className="grid gap-4 md:grid-cols-3 text-center">
            <div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                1
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Copy TikTok video link
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                2
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Paste link above
              </p>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                3
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Click download button
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>
            TikTok is a trademark of ByteDance. Shopyor is not affiliated with
            TikTok.
          </p>
          <p className="mt-1">
            For personal use only. Respect copyright and content creators'
            rights.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
