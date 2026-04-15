"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Download, Copy, Share2 } from "lucide-react";

export default function FacebookDownloaderClient() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!url) return;

    setLoading(true);
    setError("");
    setVideo(null);

    try {
      const res = await fetch("/api/facebook-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
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
    } catch {
      setError("Network error");
    }

    setLoading(false);
  };

  const copyLink = (link) => navigator.clipboard.writeText(link);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white px-4 py-10">
      {/* HERO */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Facebook Video Downloader HD</h1>
        <p className="text-gray-400 mt-2">
          Download Facebook videos & reels instantly in HD
        </p>
        <p className="text-xs text-gray-500 mt-2">
          We do not store or host any Facebook videos on our servers.
        </p>

        <Button
          className="mt-4"
          onClick={() =>
            navigator.share?.({
              title: "Facebook Downloader",
              url: window.location.href,
            })
          }
        >
          <Share2 size={16} /> Share
        </Button>
      </div>

      {/* INPUT */}
      <Card className="max-w-2xl mx-auto bg-white/5 border border-white/10">
        <CardContent className="p-5">
          <div className="flex gap-2">
            <Input
              placeholder="Paste Facebook URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleDownload()}
            />
            <Button onClick={handleDownload}>
              {loading ? <Loader2 className="animate-spin" /> : "Download"}
            </Button>
          </div>

          {error && <p className="text-red-400 mt-2">{error}</p>}
        </CardContent>
      </Card>

      {/* RESULT */}
      {video && (
        <div className="max-w-3xl mx-auto mt-10 space-y-4">
          <Card className="bg-white/5 border border-white/10">
            <CardContent className="p-5 space-y-4">
              <h2 className="text-xl font-semibold">Download Video</h2>

              {video.links?.[0]?.url && (
                <video controls className="w-full rounded">
                  <source src={video.links[0].url} />
                </video>
              )}

              {video.links.map((link, i) => (
                <div key={i} className="flex gap-2">
                  {/* ✅ MOBILE SAFE DOWNLOAD */}
                  <a
                    href={`/api/download?url=${encodeURIComponent(link.url)}`}
                    className="flex-1"
                  >
                    <Button className="w-full justify-between">
                      {link.quality || "Download"}
                      <Download size={16} />
                    </Button>
                  </a>

                  <Button onClick={() => copyLink(link.url)}>
                    <Copy size={16} />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* ADS */}
          <Card className="bg-yellow-500/10 border border-yellow-500/30">
            <CardContent className="p-4 text-center text-sm">
              AdSense Ad Placement
            </CardContent>
          </Card>
        </div>
      )}

      {/* SEO CONTENT */}
      <div className="max-w-3xl mx-auto mt-16 space-y-6 text-gray-400 text-sm">
        <h2 className="text-white text-xl font-semibold">
          How to Download Facebook Videos
        </h2>

        <p>1. Copy Facebook video link</p>
        <p>2. Paste into the tool</p>
        <p>3. Click download and save video</p>

        <h3 className="text-white text-lg font-semibold">FAQs</h3>

        <p>
          <b>Is it free?</b> Yes, completely free.
        </p>
        <p>
          <b>Does it support reels?</b> Yes.
        </p>
        <p>
          <b>Is it safe?</b> Yes, no data stored.
        </p>
      </div>

      {/* POLICY */}
      <div className="max-w-3xl mx-auto mt-10 text-gray-400 text-xs">
        This tool does not host any content. Users are responsible for usage.
      </div>
      {/* ================= LEGAL / COPYRIGHT / ADSENSE SAFE ================= */}
      <div className="max-w-4xl mx-auto mt-20 px-4 space-y-8 text-gray-400 text-sm">
        {/* COPYRIGHT POLICY */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-2">
            Copyright Disclaimer
          </h3>

          <p>
            This website is a general-purpose tool designed to help users
            process publicly accessible content. We do not host, store, or
            upload any videos on our servers. All media content is provided by
            third-party platforms and is accessed only through user-provided
            URLs.
          </p>

          <p className="mt-2">
            We respect the intellectual property rights of others and comply
            with applicable copyright laws. This tool is not intended for
            downloading or distributing copyrighted content without proper
            authorization.
          </p>
        </div>

        {/* USER RESPONSIBILITY */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-2">
            User Responsibility
          </h3>

          <p>
            By using this tool, you agree that you are solely responsible for
            how you use the content downloaded through this service. You must
            ensure that you have the legal right to access and use the media
            content in accordance with applicable laws and the terms of the
            original platform.
          </p>
        </div>

        {/* NO STORAGE POLICY */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-2">
            No Content Storage
          </h3>

          <p>
            We do not store, cache, or keep copies of any videos or media files.
            All processing is performed in real-time based on user requests, and
            no data is retained on our servers.
          </p>
        </div>

        {/* ADSENSE SAFE LINE */}
        <div className="border-t border-white/10 pt-4 text-xs text-gray-500">
          This website complies with Google AdSense policies and does not
          promote copyright infringement or unauthorized content distribution.
        </div>
      </div>
    </div>
  );
}
