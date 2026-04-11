"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  Download,
  Copy,
  Sparkles,
  Share2,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FacebookDownloaderPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!url) return;

    setLoading(true);
    setError("");
    setVideo(null);

    try {
      const res = await fetch("/api/facebook-download", {
        method: "POST",
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const apiData = data.data;

      let links = [];

      if (Array.isArray(apiData?.links)) {
        links = apiData.links;
      } else if (apiData?.links && typeof apiData.links === "object") {
        links = Object.entries(apiData.links).map(([quality, url]) => ({
          quality,
          url,
        }));
      }

      setVideo({ ...apiData, links });
    } catch (err) {
      setError("Network error. Try again.");
    }

    setLoading(false);
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
  };

  const sharePage = () => {
    if (navigator.share) {
      navigator.share({
        title: "Facebook Video Downloader",
        url: window.location.href,
      });
    } else {
      alert("Sharing not supported on this device");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      {/* HERO */}
      <div className="text-center py-12 px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Sparkles className="mx-auto text-blue-400" />
          <h1 className="text-3xl md:text-5xl font-bold mt-3">
            Facebook Video Downloader
          </h1>
          <p className="text-gray-400 mt-2">
            Download Facebook Reels & Videos in HD — Fast, Free & Secure
          </p>
        </motion.div>

        {/* SHARE BUTTON (VIRAL BOOST) */}
        <Button onClick={sharePage} className="mt-4 gap-2">
          <Share2 size={16} /> Share Tool
        </Button>
      </div>

      {/* INPUT SECTION */}
      <div className="max-w-2xl mx-auto px-4">
        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
          <CardContent className="p-5 space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Paste Facebook video URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-black/40 border-white/10"
              />

              <Button onClick={handleDownload} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Download"}
              </Button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
          </CardContent>
        </Card>
      </div>

      {/* RESULT */}
      {video && (
        <div className="max-w-3xl mx-auto mt-10 px-4">
          <Card className="bg-white/5 border border-white/10">
            <CardContent className="p-5 space-y-5">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <TrendingUp className="text-green-400" />
                Download Ready
              </h2>

              {/* VIDEO PREVIEW */}
              {video.links?.[0]?.url && (
                <video
                  controls
                  className="w-full rounded-xl border border-white/10"
                >
                  <source src={video.links[0].url} />
                </video>
              )}

              {/* DOWNLOAD BUTTONS */}
              <div className="space-y-3">
                {video.links?.map((link, i) => (
                  <div key={i} className="flex gap-2">
                    <a href={link.url} target="_blank" className="flex-1">
                      <Button className="w-full justify-between">
                        {link.quality || "Download"}
                        <Download size={16} />
                      </Button>
                    </a>

                    <Button
                      variant="outline"
                      onClick={() => copyLink(link.url)}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ADS SECTION (IMPORTANT FOR REVENUE) */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <Card className="bg-yellow-500/10 border border-yellow-500/30">
          <CardContent className="p-6 text-center text-sm text-gray-300">
            🔥 Ad Space — Place Google AdSense Here for Monetization
          </CardContent>
        </Card>
      </div>

      {/* SEO CONTENT SECTION */}
      <div className="max-w-3xl mx-auto mt-16 px-4 space-y-10">
        <h2 className="text-2xl font-bold text-center">
          How to Download Facebook Videos
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            "Copy Facebook video link",
            "Paste it in input box",
            "Click download & save video",
          ].map((step, i) => (
            <Card key={i} className="bg-white/5 border border-white/10">
              <CardContent className="p-4 text-center text-gray-300">
                {step}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ (SEO RICH SNIPPETS BOOST) */}
        <div className="space-y-4 text-sm text-gray-400">
          <h3 className="text-white text-xl font-semibold">FAQs</h3>

          <p>
            <span className="text-white">Is this free?</span> Yes, 100% free
            tool.
          </p>
          <p>
            <span className="text-white">Can I download reels?</span> Yes,
            supports reels & videos.
          </p>
          <p>
            <span className="text-white">Is it safe?</span> Yes, no data is
            stored.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      {/* PRIVACY & COPYRIGHT SAFETY SECTION */}
      <div className="max-w-3xl mx-auto mt-16 px-4">
        <Card className="bg-blue-500/10 border border-blue-500/30">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              🔐 Privacy & Copyright Policy
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed">
              This tool does not host, store, or save any Facebook videos on our
              servers. All processing is done through third-party APIs and only
              for user-requested URLs.
            </p>

            <p className="text-gray-300 text-sm leading-relaxed">
              We respect copyright laws and do not encourage downloading or
              sharing content without proper authorization from the content
              owner.
            </p>

            <p className="text-gray-300 text-sm leading-relaxed">
              Users are solely responsible for ensuring they have the right to
              download and use any media content accessed through this tool.
            </p>

            <p className="text-gray-400 text-xs">
              ⚠️ This tool is intended for personal and educational use only.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
