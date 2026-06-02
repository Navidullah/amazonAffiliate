"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Copy,
  Check,
  Download,
  Youtube,
  Tag,
  AlertCircle,
  FileText,
  Sparkles,
} from "lucide-react";

export default function TagsClient() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTag, setCopiedTag] = useState(null);

  const extractVideoId = (value) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = value.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleFetch = async () => {
    setError("");
    setData(null);
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Please enter a valid YouTube video or Shorts URL.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/youtube-tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Failed to fetch tags.");
        setLoading(false);
        return;
      }
      setData({ ...result, videoId });
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const tags = data?.tags || [];
  const charCount = useMemo(() => tags.join(", ").length, [tags]);

  const copyAll = async () => {
    if (!tags.length) return;
    await navigator.clipboard.writeText(tags.join(", "));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1800);
  };

  const copyOne = async (tag, i) => {
    await navigator.clipboard.writeText(tag);
    setCopiedTag(i);
    setTimeout(() => setCopiedTag(null), 1200);
  };

  const exportFile = (type) => {
    if (!tags.length) return;
    const content = type === "csv" ? tags.join(",") : tags.join("\n");
    const blob = new Blob([content], {
      type: type === "csv" ? "text/csv" : "text/plain",
    });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `youtube-tags.${type === "csv" ? "csv" : "txt"}`;
    a.click();
    URL.revokeObjectURL(href);
  };

  return (
    <div className="space-y-8">
      {/* Input */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-7">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
            <input
              type="text"
              placeholder="Paste YouTube video or Shorts URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFetch()}
              className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleFetch}
            disabled={loading}
            className="h-14 px-8 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Tag className="w-5 h-5" />
            )}
            Extract Tags
          </motion.button>
        </div>
        {error && (
          <p className="flex items-center gap-1.5 text-sm text-red-500 mt-3">
            <AlertCircle className="w-4 h-4" /> {error}
          </p>
        )}
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {data && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Video meta */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg flex flex-col sm:flex-row">
              <img
                src={`https://img.youtube.com/vi/${data.videoId}/mqdefault.jpg`}
                alt={data.title}
                className="w-full sm:w-56 aspect-video object-cover"
              />
              <div className="p-5 flex flex-col justify-center">
                <h2 className="text-lg font-bold leading-snug line-clamp-2">
                  {data.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {data.channel}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">
                    {tags.length} {tags.length === 1 ? "Tag" : "Tags"}
                  </h3>
                  {tags.length > 0 && (
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-md ${
                        charCount > 500
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                      }`}
                    >
                      {charCount}/500 characters
                    </span>
                  )}
                </div>

                {tags.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={copyAll}
                      className="flex items-center gap-1.5 text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition"
                    >
                      {copiedAll ? (
                        <>
                          <Check className="w-4 h-4" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" /> Copy all
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => exportFile("csv")}
                      className="flex items-center gap-1.5 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-3 py-2 rounded-lg transition"
                      title="Export as CSV"
                    >
                      <Download className="w-4 h-4" /> CSV
                    </button>
                    <button
                      onClick={() => exportFile("txt")}
                      className="flex items-center gap-1.5 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 px-3 py-2 rounded-lg transition"
                      title="Export as TXT"
                    >
                      <FileText className="w-4 h-4" /> TXT
                    </button>
                  </div>
                )}
              </div>

              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => copyOne(tag, i)}
                      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition"
                      title="Click to copy"
                    >
                      {tag}
                      {copiedTag === i ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-10 text-slate-500 dark:text-slate-400">
                  <Tag className="w-8 h-8 mb-2 opacity-50" />
                  <p className="font-medium">This video has no public tags.</p>
                  <p className="text-sm mt-1">
                    Many creators leave tags empty — try another video, or use
                    the tag ideas below for inspiration.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!data && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 dark:text-slate-500">
          <Sparkles className="w-4 h-4" />
          Paste any YouTube link to reveal its tags, title and channel.
        </div>
      )}
    </div>
  );
}
