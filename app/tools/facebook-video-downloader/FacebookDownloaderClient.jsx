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
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FacebookDownloaderClient() {
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
      alert("Sharing not supported");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0f19] to-[#111827] text-white">
      {/* HERO */}
      <div className="text-center py-16 px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Sparkles className="mx-auto text-blue-400" size={32} />

          <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
            Facebook Video Downloader HD
          </h1>

          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Download Facebook videos, reels, and HD clips instantly — fast,
            secure & completely free.
          </p>
        </motion.div>

        <Button onClick={sharePage} className="mt-6 gap-2">
          <Share2 size={16} /> Share Tool
        </Button>
      </div>

      {/* INPUT CARD */}
      <div className="max-w-2xl mx-auto px-4">
        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Paste Facebook Video URL to Download..."
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
          <Card className="bg-white/5 border border-white/10 shadow-lg">
            <CardContent className="p-6 space-y-5">
              <h2 className="text-xl font-semibold">Download Your Video</h2>

              {video.links?.[0]?.url && (
                <video
                  controls
                  className="w-full rounded-xl border border-white/10"
                >
                  <source src={video.links[0].url} />
                </video>
              )}

              <div className="space-y-3">
                {video.links?.map((link, i) => (
                  <div key={i} className="flex gap-2">
                    <a href={link.url} target="_blank" className="flex-1">
                      <Button className="w-full justify-between">
                        {link.quality || "Download HD"}
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

      {/* FEATURES SECTION */}
      <div className="max-w-4xl mx-auto mt-16 px-4 grid md:grid-cols-3 gap-6">
        {[
          "Fast & Unlimited Downloads",
          "No Watermark Videos",
          "Works on All Devices",
        ].map((item, i) => (
          <Card
            key={i}
            className="bg-white/5 border border-white/10 text-center"
          >
            <CardContent className="p-6 text-gray-300">{item}</CardContent>
          </Card>
        ))}
      </div>

      {/* SEO CONTENT */}
      <div className="max-w-3xl mx-auto mt-16 px-4 space-y-6 text-gray-400 text-sm">
        <h2 className="text-white text-xl font-semibold">
          Download Facebook Videos Easily
        </h2>

        <p>
          This free Facebook video downloader helps you save videos and reels in
          HD quality. No login or software required.
        </p>

        <p>
          Simply paste your Facebook video URL and download instantly on any
          device including Android, iPhone, and desktop.
        </p>
      </div>

      {/* COPYRIGHT & POLICY (ADSENSE SAFE) */}
      <div className="max-w-3xl mx-auto mt-16 px-4 mb-20">
        <Card className="bg-blue-500/10 border border-blue-500/30">
          <CardContent className="p-6 space-y-4 text-sm text-gray-300">
            <h3 className="text-white text-lg font-semibold flex items-center gap-2">
              <ShieldCheck size={18} /> Privacy & Copyright Policy
            </h3>

            <p>
              This website does not host, store, or upload any videos. All media
              content is delivered through third-party sources based on user
              request.
            </p>

            <p>
              We respect copyright laws and do not support downloading or
              distributing copyrighted material without permission from the
              rightful owner.
            </p>

            <p>
              Users are responsible for how they use this tool and must ensure
              they comply with applicable laws and platform terms.
            </p>

            <p className="text-xs text-gray-400">
              ⚠️ This tool is intended for personal use only.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
