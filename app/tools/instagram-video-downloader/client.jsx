"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Download,
  Shield,
  Zap,
  InfoIcon,
  AlertCircle,
  Scale,
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
  const [showMobileHelp, setShowMobileHelp] = useState(false);
  const videoRef = useRef(null);

  // Your Render API URL - Replace with your actual Render URL
  const API_URL =
    process.env.NEXT_PUBLIC_INSTAGRAM_API_URL ||
    "https://instagram-video-downloader.onrender.com";

  const isValidInstagramUrl = (url) => {
    const pattern =
      /^(https?:\/\/)?(www\.)?instagram\.com\/(reel|p|tv)\/([a-zA-Z0-9_-]+)/;
    return pattern.test(url);
  };

  // Mobile detection
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
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
    setShowMobileHelp(false);

    try {
      const response = await fetch(`${API_URL}/api/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim(), quality: "best" }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.detail || data.error || "Failed to fetch video");
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
    // Create a clean filename (remove special characters, keep it short)
    const cleanTitle = (title || "video")
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const filename = `${cleanTitle}.mp4`;

    // Check if mobile
    if (isMobile()) {
      setShowMobileHelp(true);

      // For mobile: Create a visible download link for long-press
      const downloadLink = document.createElement("a");
      downloadLink.href = videoUrl;
      downloadLink.download = filename;
      downloadLink.textContent = "📥 Tap and hold to save video";
      downloadLink.style.display = "block";
      downloadLink.style.marginTop = "10px";
      downloadLink.style.padding = "12px";
      downloadLink.style.backgroundColor = "#3b82f6";
      downloadLink.style.color = "white";
      downloadLink.style.textAlign = "center";
      downloadLink.style.borderRadius = "8px";
      downloadLink.style.textDecoration = "none";
      downloadLink.style.fontWeight = "bold";

      // Show temporary message with download link
      const messageDiv = document.createElement("div");
      messageDiv.innerHTML = `
        <div style="margin-bottom: 10px;">
          ⚠️ <strong>Mobile Download</strong><br>
          On mobile, tap and hold the button below, then select "Save Video" or "Download Linked File"
        </div>
      `;
      messageDiv.appendChild(downloadLink);
      messageDiv.style.position = "fixed";
      messageDiv.style.bottom = "20px";
      messageDiv.style.left = "20px";
      messageDiv.style.right = "20px";
      messageDiv.style.backgroundColor = "#1f2937";
      messageDiv.style.color = "white";
      messageDiv.style.padding = "15px";
      messageDiv.style.borderRadius = "10px";
      messageDiv.style.zIndex = "9999";
      messageDiv.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

      // Add close button
      const closeBtn = document.createElement("button");
      closeBtn.textContent = "×";
      closeBtn.style.position = "absolute";
      closeBtn.style.top = "5px";
      closeBtn.style.right = "10px";
      closeBtn.style.background = "none";
      closeBtn.style.border = "none";
      closeBtn.style.color = "white";
      closeBtn.style.fontSize = "20px";
      closeBtn.style.cursor = "pointer";
      closeBtn.onclick = () => messageDiv.remove();
      messageDiv.appendChild(closeBtn);

      document.body.appendChild(messageDiv);

      // Auto-remove after 15 seconds
      setTimeout(() => {
        if (messageDiv.parentNode) messageDiv.remove();
      }, 15000);

      return;
    }

    // Desktop: Direct download
    // Desktop: Direct download
    try {
      setDownloading(true);

      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback: Open in new tab
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
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Instagram Video Downloader - Download Reels & Videos
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Save public Instagram reels and videos with a clean, mobile-friendly
            downloader experience.
          </p>
        </header>

        <Card className="w-full border shadow-xl">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <label
                htmlFor="instagram-url"
                className="text-sm font-medium text-foreground"
              >
                Paste Instagram Video or Reel URL
              </label>
              <input
                id="instagram-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.instagram.com/reel/..."
                className="w-full rounded-xl border bg-background px-4 py-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                disabled={loading}
              />

              <div className="flex flex-col md:flex-row gap-3">
                <button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1"
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
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>

            {/* Video Preview & Download Section */}
            {videoData && (
              <div className="mt-6 space-y-4 animate-in fade-in duration-300">
                {/* Video Title - Short version */}
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

                {/* Video Player */}
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

                {/* Video Info & Actions */}
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

                {/* Mobile Download Help */}
                {showMobileHelp && (
                  <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-sm text-blue-800 dark:text-blue-400">
                      <strong>💡 Mobile Download Instructions:</strong>
                      <br />
                      1. Tap and hold the "Download" button above
                      <br />
                      2. Select "Save Video" or "Download Linked File"
                      <br />
                      3. The video will save to your device
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Section */}
        <section aria-labelledby="features-heading" className="mt-12">
          <h2 id="features-heading" className="sr-only">
            Features
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">One-URL Workflow</h3>
                <p className="text-sm text-muted-foreground">
                  Simple interface focused on fast copy-paste-and-download flow.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Fast Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Get your video in seconds with our optimized API.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Public Content Only</h3>
                <p className="text-sm text-muted-foreground">
                  Designed around lawful use and privacy-first messaging.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-12">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <InfoIcon className="h-5 w-5 text-primary" />
                How to Download Instagram Videos
              </h2>
              <ol className="space-y-3 text-muted-foreground">
                <li>1. Open Instagram and copy a public reel or video link.</li>
                <li>2. Paste the link into the input field above.</li>
                <li>3. Click "Download Video" and wait for processing.</li>
                <li>4. Preview the video and click download to save it.</li>
                <li>
                  5. On mobile: Tap and hold the download button, then select
                  "Save Video".
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Tips Alert */}
        <Alert className="mt-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <AlertDescription className="text-sm text-blue-800 dark:text-blue-400">
            <strong>💡 Pro Tip:</strong> Works with Instagram Reels, Posts, and
            IGTV videos that are public. For best results, copy the link
            directly from your browser's address bar.
          </AlertDescription>
        </Alert>

        {/* Copyright Notice */}
        <div className="mt-8 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-1 text-amber-700 dark:text-amber-500">
              <p className="font-medium text-amber-800 dark:text-amber-400">
                Copyright & Fair Use Notice
              </p>
              <p>
                Use this tool only for publicly available content with proper
                permission. Do not download copyrighted content for commercial
                or unauthorized use.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Scale className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium text-red-800 dark:text-red-400 mb-1">
                Legal Notice
              </p>
              <p className="text-red-700 dark:text-red-500">
                Shopyor is not affiliated with Instagram or Meta. Users are
                responsible for following platform terms and local laws.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading" className="mt-12">
          <Card className="bg-muted/30">
            <CardContent className="p-6">
              <h2 id="faq-heading" className="text-lg font-semibold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground">
                    Is this Instagram video downloader free?
                  </h3>
                  <p>Yes, it is completely free to use.</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Can I download private Instagram content?
                  </h3>
                  <p>No. Only publicly available links work.</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Do I need to install software?
                  </h3>
                  <p>No, everything works in your browser.</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    What video quality is supported?
                  </h3>
                  <p>
                    The API automatically fetches the best available quality (up
                    to 1080p).
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    How do I download on mobile?
                  </h3>
                  <p>
                    Tap and hold the download button, then select "Save Video"
                    or "Download Linked File" from the menu.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
