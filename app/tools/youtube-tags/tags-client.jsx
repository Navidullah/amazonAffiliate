"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Copy, Download } from "lucide-react";

export default function TagsClient() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const extractVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleFetch = async () => {
    setError("");
    const videoId = extractVideoId(url);

    if (!videoId) {
      setError("Enter a valid YouTube URL.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/youtube-tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoId }),
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Failed to fetch tags.");
      setLoading(false);
      return;
    }

    setData(result);
    setLoading(false);
  };

  const copyTags = () => {
    if (!data?.tags) return;
    navigator.clipboard.writeText(data.tags.join(", "));
  };

  const exportCSV = () => {
    if (!data?.tags) return;

    const csvContent = data.tags.join(",");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "youtube-tags.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-pink-600/30 blur-3xl opacity-40"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 space-y-16">
        <div className="text-center space-y-6">
          <Badge className="bg-white/10 border border-white/20">
            Creator Tool
          </Badge>

          <h1 className="text-5xl font-extrabold">
            Extract YouTube Tags <br />
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Get video tags, title, and description in seconds. Perfect for
            YouTube SEO optimization.
          </p>
        </div>

        <Card className="bg-white/5 border border-white/10 backdrop-blur-xl">
          <CardContent className="p-10 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Paste YouTube URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="h-14 bg-black/40 border-white/20"
              />

              <Button
                onClick={handleFetch}
                size="lg"
                className="h-14 px-10 bg-gradient-to-r from-purple-500 to-pink-500"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Extract
              </Button>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
          </CardContent>
        </Card>

        {data && (
          <div className="space-y-10">
            <Card className="bg-white/5 border border-white/10">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">{data.title}</h2>
                <p className="text-gray-400">{data.channel}</p>
                <p className="text-gray-500 whitespace-pre-line">
                  {data.description}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border border-white/10">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">
                    Tags ({data.tags.length})
                  </h3>

                  <div className="flex gap-3">
                    <Button variant="outline" size="icon" onClick={copyTags}>
                      <Copy className="h-4 w-4" />
                    </Button>

                    <Button variant="outline" size="icon" onClick={exportCSV}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {data.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-purple-600/20 border border-purple-500/30 text-purple-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
