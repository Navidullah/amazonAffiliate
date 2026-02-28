"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function YoutubeThumbnailClient() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleGenerate = async () => {
    setError("");
    const id = extractVideoId(url);

    if (!id) {
      setVideoId(null);
      setError("Enter a valid YouTube URL.");
      return;
    }

    setLoading(true);
    setVideoId(id);
    setLoading(false);
  };

  const thumbnails = videoId
    ? [
        {
          label: "Max Resolution",
          url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        },
        {
          label: "HD Quality",
          url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        },
        {
          label: "Medium",
          url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        },
        {
          label: "Standard",
          url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Gradient Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-blue-600/30 blur-3xl opacity-40"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 space-y-20">
        {/* HERO */}
        <div className="text-center space-y-6">
          <Badge className="bg-white/10 backdrop-blur-md border border-white/20">
            Free Tool
          </Badge>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Download YouTube Thumbnails <br />
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Instantly in HD
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Grab high-quality YouTube thumbnails in seconds. Fast. Free. No
            login required.
          </p>
        </div>

        {/* INPUT SECTION */}
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          <CardContent className="p-10 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Paste YouTube URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-14 text-base bg-black/40 border-white/20"
              />

              <Button
                onClick={handleGenerate}
                size="lg"
                className="h-14 px-10 text-base bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Thumbnail
              </Button>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
          </CardContent>
        </Card>

        {/* RESULTS */}
        {videoId && (
          <div className="grid md:grid-cols-2 gap-10">
            {thumbnails.map((thumb, index) => (
              <Card
                key={index}
                className="bg-white/5 border border-white/10 hover:border-purple-500 transition-all duration-300 hover:scale-[1.02]"
              >
                <CardContent className="p-0">
                  <img src={thumb.url} alt={thumb.label} className="w-full" />

                  <div className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold">{thumb.label}</h3>

                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                    >
                      <a
                        href={thumb.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        Download
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* SEO CONTENT */}
        <div className="max-w-3xl mx-auto text-gray-400 space-y-6 text-center">
          <h2 className="text-3xl font-bold text-white">
            How to Download YouTube Thumbnails?
          </h2>
          <p>
            Paste your YouTube video link above and click “Get Thumbnail”.
            Download thumbnails in Full HD, HD, and standard quality instantly.
          </p>
        </div>
      </div>
    </div>
  );
}
