"use client";

import { useState, useRef, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  Download,
  Lock,
  Unlock,
  Zap,
  RefreshCw,
  X,
} from "lucide-react";

const SOCIAL_PRESETS = [
  { label: "Instagram Post", w: 1080, h: 1080 },
  { label: "Instagram Story", w: 1080, h: 1920 },
  { label: "YouTube Thumbnail", w: 1280, h: 720 },
  { label: "Facebook Cover", w: 820, h: 312 },
  { label: "Twitter/X Post", w: 1200, h: 675 },
  { label: "WhatsApp DP", w: 512, h: 512 },
  { label: "LinkedIn Post", w: 1200, h: 627 },
  { label: "LinkedIn Cover", w: 1584, h: 396 },
];

export default function ImageResizer() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState("jpeg");
  const [lockRatio, setLockRatio] = useState(true);
  const [ratio, setRatio] = useState(null);
  const [originalSize, setOriginalSize] = useState(null);
  const [newSize, setNewSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef();

  const handleImage = (file) => {
    if (!file) return;
    setImage(file);
    setResult(null);
    setNewSize(null);
    setPreview(URL.createObjectURL(file));
    setOriginalSize((file.size / 1024).toFixed(1));
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setWidth(img.width);
      setHeight(img.height);
      setRatio(img.width / img.height);
    };
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleImage(file);
  }, []);

  const handleResize = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("width", width);
      formData.append("height", height);
      formData.append("quality", quality);
      formData.append("format", format);
      const res = await axios.post("/api/resize", formData, {
        responseType: "blob",
      });
      const blob = res.data;
      setNewSize((blob.size / 1024).toFixed(1));
      setResult(URL.createObjectURL(blob));
    } finally {
      setLoading(false);
    }
  };

  const handleWidth = (val) => {
    setWidth(val);
    if (lockRatio && ratio) setHeight(Math.round(val / ratio));
  };

  const handleHeight = (val) => {
    setHeight(val);
    if (lockRatio && ratio) setWidth(Math.round(val * ratio));
  };

  const applyPreset = (w, h) => {
    setWidth(w);
    setHeight(h);
  };

  const savings =
    originalSize && newSize
      ? Math.max(
          0,
          (((originalSize - newSize) / originalSize) * 100).toFixed(1)
        )
      : null;

  return (
    <div className="p-6 space-y-6">
      {/* Upload Zone */}
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-violet-500 bg-violet-500/10"
            : preview
            ? "border-violet-500/40 bg-violet-500/5"
            : "border-muted-foreground/25 hover:border-violet-400/50 hover:bg-violet-500/5"
        }`}
        onClick={() => fileRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        whileHover={{ scale: 1.005 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          className="hidden"
          onChange={(e) => handleImage(e.target.files[0])}
        />
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-3"
            >
              <img
                src={preview}
                className="mx-auto max-h-52 rounded-lg shadow-md object-contain"
                alt="Preview"
              />
              <p className="text-sm text-muted-foreground">
                {image?.name} · {originalSize} KB
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                  setPreview(null);
                  setResult(null);
                  setOriginalSize(null);
                  setNewSize(null);
                }}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-3" /> Change image
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <div className="mx-auto inline-flex rounded-full bg-violet-500/15 p-4">
                <Upload className="size-7 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="font-medium">
                  Drop your image here or click to upload
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  JPG, PNG, WebP, HEIC · any size
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Social Media Presets */}
      <div>
        <p className="mb-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Social media presets
        </p>
        <div className="flex flex-wrap gap-2">
          {SOCIAL_PRESETS.map(({ label, w, h }) => (
            <button
              key={label}
              type="button"
              onClick={() => applyPreset(w, h)}
              className="inline-flex items-center gap-1.5 rounded-full border bg-muted/30 px-3 py-1.5 text-xs font-medium transition-colors hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-700 dark:hover:text-violet-300"
            >
              {label}
              <span className="text-muted-foreground/60">
                {w}×{h}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Resize Form */}
      <form onSubmit={handleResize} className="space-y-5">
        {/* Dimensions */}
        <div className="grid grid-cols-[1fr,auto,1fr] items-end gap-3">
          <div>
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Width (px)
            </Label>
            <Input
              type="number"
              value={width}
              onChange={(e) => handleWidth(e.target.value)}
              placeholder="e.g. 1920"
              className="text-center"
              min="1"
            />
          </div>
          <button
            type="button"
            onClick={() => setLockRatio(!lockRatio)}
            className={`mb-0.5 rounded-lg border p-2 transition-colors ${
              lockRatio
                ? "border-violet-500/50 bg-violet-500/10 text-violet-600 dark:text-violet-400"
                : "border-muted-foreground/25 text-muted-foreground hover:border-violet-500/30"
            }`}
            title={lockRatio ? "Aspect ratio locked" : "Aspect ratio unlocked"}
          >
            {lockRatio ? (
              <Lock className="size-4" />
            ) : (
              <Unlock className="size-4" />
            )}
          </button>
          <div>
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Height (px)
            </Label>
            <Input
              type="number"
              value={height}
              onChange={(e) => handleHeight(e.target.value)}
              placeholder="e.g. 1080"
              className="text-center"
              min="1"
            />
          </div>
        </div>

        {/* Quality + Format */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label className="text-xs font-medium text-muted-foreground">
                Quality
              </Label>
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                {quality}%
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="w-full accent-violet-600"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Smaller file</span>
              <span>Best quality</span>
            </div>
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
              Output Format
            </Label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            >
              <option value="jpeg">JPG — best for photos</option>
              <option value="png">PNG — lossless quality</option>
              <option value="webp">WebP — smallest file size</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white h-11 text-base"
          disabled={!image || loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="size-4 animate-spin" /> Resizing…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Zap className="size-4" /> Resize Image
            </span>
          )}
        </Button>
      </form>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-4"
          >
            {savings !== null && (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-violet-500/10 border border-violet-500/20 py-2.5 px-4 text-sm">
                <Zap className="size-4 text-violet-600 dark:text-violet-400" />
                <span>
                  {originalSize} KB →{" "}
                  <strong className="text-foreground">{newSize} KB</strong>
                  {savings > 0 && (
                    <span className="ml-2 text-green-600 dark:text-green-400 font-medium">
                      {savings}% smaller
                    </span>
                  )}
                </span>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border bg-muted/20 p-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Original
                </p>
                <img
                  src={preview}
                  className="w-full rounded-lg object-contain max-h-48"
                  alt="Original"
                />
              </div>
              <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-3">
                <p className="mb-2 text-xs font-medium text-violet-600 dark:text-violet-400">
                  Resized · {width}×{height}px
                </p>
                <img
                  src={result}
                  className="w-full rounded-lg object-contain max-h-48"
                  alt="Resized"
                />
              </div>
            </div>

            <a
              href={result}
              download={`resized-${width}x${height}.${format === "jpeg" ? "jpg" : format}`}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-violet-600 hover:bg-violet-700 text-white py-3 font-medium transition-colors"
            >
              <Download className="size-4" /> Download Resized Image
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
