"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Download,
  Copy,
  Check,
  Youtube,
  ImageOff,
  Sparkles,
} from "lucide-react";

const QUALITIES = [
  {
    key: "maxresdefault",
    label: "Max Resolution",
    res: "1280 × 720",
    badge: "HD",
  },
  { key: "sddefault", label: "Standard Definition", res: "640 × 480", badge: "SD" },
  { key: "hqdefault", label: "High Quality", res: "480 × 360", badge: "HQ" },
  { key: "mqdefault", label: "Medium Quality", res: "320 × 180", badge: "MQ" },
];

export default function YoutubeThumbnailClient() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [failed, setFailed] = useState({});

  const extractVideoId = (value) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = value.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleGenerate = () => {
    setError("");
    setFailed({});
    const id = extractVideoId(url);
    if (!id) {
      setVideoId(null);
      setError("Please enter a valid YouTube video or Shorts URL.");
      return;
    }
    setLoading(true);
    setVideoId(id);
    setTimeout(() => setLoading(false), 250);
  };

  const copyUrl = async (key, src) => {
    try {
      await navigator.clipboard.writeText(src);
      setCopied(key);
      setTimeout(() => setCopied(""), 1800);
    } catch {}
  };

  const thumbnails = videoId
    ? QUALITIES.map((q) => ({
        ...q,
        url: `https://img.youtube.com/vi/${videoId}/${q.key}.jpg`,
        download: `/api/youtube-thumbnail?id=${videoId}&quality=${q.key}`,
      }))
    : [];

  return (
    <div className="space-y-8">
      {/* Input card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-7">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
            <input
              type="text"
              placeholder="Paste YouTube video or Shorts URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              className="w-full h-14 pl-12 pr-4 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={loading}
            className="h-14 px-8 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            Get Thumbnails
          </motion.button>
        </div>
        {error && <p className="text-sm text-red-500 mt-3">{error}</p>}
        {!error && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
            Works with normal videos and Shorts. Example:
            https://www.youtube.com/watch?v=dQw4w9WgXcQ
          </p>
        )}
      </div>

      {/* Results */}
      <AnimatePresence>
        {videoId && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {thumbnails.map((thumb) => (
              <div
                key={thumb.key}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative aspect-video bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                  {failed[thumb.key] ? (
                    <div className="flex flex-col items-center text-slate-400 gap-2">
                      <ImageOff className="w-8 h-8" />
                      <span className="text-xs">Not available for this video</span>
                    </div>
                  ) : (
                    <img
                      src={thumb.url}
                      alt={`${thumb.label} YouTube thumbnail`}
                      loading="lazy"
                      onError={() =>
                        setFailed((f) => ({ ...f, [thumb.key]: true }))
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs font-bold bg-black/70 text-white backdrop-blur">
                    {thumb.badge}
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-sm">{thumb.label}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {thumb.res}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyUrl(thumb.key, thumb.url)}
                      className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                      aria-label="Copy image URL"
                    >
                      {copied === thumb.key ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href={thumb.download}
                      className={`h-10 px-4 flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-sm font-medium transition ${
                        failed[thumb.key] ? "pointer-events-none opacity-40" : ""
                      }`}
                    >
                      <Download className="w-4 h-4" /> Save
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state hint */}
      {!videoId && (
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 dark:text-slate-500">
          <Sparkles className="w-4 h-4" />
          Paste a link above to grab all thumbnail sizes at once.
        </div>
      )}
    </div>
  );
}
