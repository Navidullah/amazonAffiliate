// components/home/VideoDownloaderDemo.jsx (Updated with direct navigation)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Download,
  Loader2,
  Link2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export function VideoDownloaderDemo() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleAnalyzeAndDownload = () => {
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

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      // Encode the URL to pass as a query parameter
      const encodedUrl = encodeURIComponent(url.trim());
      // Redirect to the Facebook video downloader tool page with the URL pre-filled
      router.push(`/tools/facebook-video-downloader?url=${encodedUrl}`);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAnalyzeAndDownload();
    }
  };

  return (
    <Card className="shadow-2xl border-2 hover:border-primary/20 transition-all duration-300 group">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
            <FaFacebook className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Facebook Video Downloader</h3>
            <p className="text-sm text-muted-foreground">
              Paste any Facebook video or reel URL
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="https://www.facebook.com/... or https://fb.watch/..."
              className="pl-10 h-12 transition-all focus:ring-2 focus:ring-primary/20"
              disabled={loading}
            />
          </div>

          <Button
            onClick={handleAnalyzeAndDownload}
            disabled={loading || !url}
            className="h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 group/btn"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Redirecting to Downloader...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4 group-hover/btn:animate-bounce" />
                Analyze & Download Video
              </>
            )}
          </Button>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Feature badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-xs text-muted-foreground border-t">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              <span>HD Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              <span>No Watermark</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              <span>Fast Download</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              <span>Mobile Friendly</span>
            </div>
          </div>

          {/* Help text */}
          <p className="text-xs text-center text-muted-foreground mt-2">
            🔒 Secure & Private • No Registration Required • Unlimited Downloads
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
