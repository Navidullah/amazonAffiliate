// app/components/tools/ImageCompressorClient.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import imageCompression from "browser-image-compression";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  UploadCloud,
  Download,
  Sparkles,
  Loader2,
  ImageDown,
  ArrowRight,
} from "lucide-react";

// Code-split recharts out of the initial bundle; it only loads after a
// compression produces a result to chart.
const SizeComparisonChart = dynamic(
  () => import("./SizeComparisonChart"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-64 w-full items-center justify-center text-sm text-muted-foreground">
        Loading chart…
      </div>
    ),
  },
);

const easeOut = [0.22, 1, 0.36, 1];

export default function ImageCompressorClient() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [quality, setQuality] = useState(70);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [format, setFormat] = useState("jpeg");

  const handleImageChange = (file) => {
    setOriginalImage(file);
    setCompressedImage(null);
  };

  const convertBlobToFile = async (blob, fileName) => {
    const arrayBuffer = await blob.arrayBuffer();
    return new File([arrayBuffer], fileName, { type: blob.type });
  };

  const compressImage = async () => {
    if (!originalImage) return;
    setLoading(true);

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1024,
      initialQuality: quality / 100,
      fileType: `image/${format}`,
      useWebWorker: true,
    };

    try {
      const compressedBlob = await imageCompression(originalImage, options);
      const convertedFile = await convertBlobToFile(
        compressedBlob,
        `compressed.${format}`,
      );
      setCompressedImage(convertedFile);
    } catch (err) {
      console.error("Compression failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleImageChange(file);
  };

  // Stable blob URLs (each with its own cleanup)
  const originalUrl = useMemo(
    () => (originalImage ? URL.createObjectURL(originalImage) : null),
    [originalImage],
  );
  const compressedUrl = useMemo(
    () => (compressedImage ? URL.createObjectURL(compressedImage) : null),
    [compressedImage],
  );

  // Revoke ONLY when that URL changes/unmounts
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
    };
  }, [originalUrl]);

  useEffect(() => {
    return () => {
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, [compressedUrl]);

  const mb = (bytes) => +(bytes / 1024 / 1024).toFixed(2);
  const savings =
    originalImage && compressedImage
      ? Math.max(
          0,
          Math.round(
            (1 - compressedImage.size / originalImage.size) * 100,
          ),
        )
      : 0;

  const sizeChartData =
    compressedImage && originalImage
      ? [
          { name: "Original", size: mb(originalImage.size) },
          { name: "Compressed", size: mb(compressedImage.size) },
        ]
      : [];

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Dropzone */}
      <motion.label
        htmlFor="compressor-file"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        className={`group relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
          dragging
            ? "border-emerald-500 bg-emerald-500/10 scale-[1.01]"
            : "border-border bg-muted/40 hover:border-emerald-500/60 hover:bg-muted/70"
        }`}
      >
        {/* glow */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
        </div>

        <motion.div
          animate={dragging ? { y: -6, scale: 1.05 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/30"
        >
          <UploadCloud className="size-8" />
        </motion.div>

        <div className="relative space-y-1">
          <p className="text-base font-semibold sm:text-lg">
            {originalImage
              ? originalImage.name
              : "Drag & drop an image, or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Supports JPG, PNG &amp; WebP · Runs privately in your browser
          </p>
        </div>

        <input
          id="compressor-file"
          type="file"
          accept="image/*"
          className="sr-only"
          aria-label="Upload image to compress"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageChange(file);
          }}
        />
      </motion.label>

      {/* Controls */}
      <AnimatePresence>
        {originalImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mt-6 grid gap-6 rounded-2xl border bg-card p-6 sm:grid-cols-2"
          >
            <div>
              <div className="mb-2 flex items-center justify-between">
                <Label htmlFor="quality" className="text-sm font-medium">
                  Compression quality
                </Label>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {quality}%
                </span>
              </div>
              <Slider
                id="quality"
                min={10}
                max={100}
                step={5}
                defaultValue={[quality]}
                onValueChange={(value) => setQuality(value[0])}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Lower quality = smaller file. 60–80% is the sweet spot for photos.
              </p>
            </div>

            <div>
              <Label htmlFor="format" className="mb-2 block text-sm font-medium">
                Output format
              </Label>
              <Select defaultValue="jpeg" onValueChange={(v) => setFormat(v)}>
                <SelectTrigger id="format">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jpeg">JPEG — best for photos</SelectItem>
                  <SelectItem value="png">PNG — graphics & transparency</SelectItem>
                  <SelectItem value="webp">WebP — smallest, modern</SelectItem>
                </SelectContent>
              </Select>
              <p className="mt-2 text-xs text-muted-foreground">
                WebP usually gives the smallest file at the same quality.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action */}
      {originalImage && (
        <div className="mt-6 flex justify-center">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={compressImage}
              disabled={loading}
              size="lg"
              className="gap-2 bg-gradient-to-r from-emerald-600 to-sky-600 px-8 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-500 hover:to-sky-500"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Compressing…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> Compress image
                </>
              )}
            </Button>
          </motion.div>
        </div>
      )}

      {/* Before / After */}
      {originalImage && (
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Original */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="rounded-2xl border bg-card p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Original</h3>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                  {mb(originalImage.size)} MB
                </span>
              </div>
              {originalUrl && (
                <img
                  key={originalUrl}
                  src={originalUrl}
                  alt="Original uploaded image preview"
                  className="mx-auto max-h-80 w-auto rounded-lg object-contain"
                />
              )}
            </motion.div>

            {/* Compressed */}
            <AnimatePresence mode="wait">
              {compressedImage ? (
                <motion.div
                  key="compressed"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="relative rounded-2xl border border-emerald-500/40 bg-card p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-semibold">
                      Compressed · {format.toUpperCase()}
                    </h3>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {mb(compressedImage.size)} MB
                    </span>
                  </div>
                  {compressedUrl && (
                    <>
                      <img
                        key={compressedUrl}
                        src={compressedUrl}
                        alt="Compressed output image preview"
                        className="mx-auto max-h-80 w-auto rounded-lg object-contain"
                      />
                      {savings > 0 && (
                        <p className="mt-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          🎉 {savings}% smaller than the original
                        </p>
                      )}
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={compressedUrl}
                        download={`compressed.${format}`}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors"
                      >
                        <Download className="size-4" /> Download image
                      </motion.a>
                    </>
                  )}
                </motion.div>
              ) : (
                <div className="flex min-h-[16rem] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-muted/30 p-4 text-center text-muted-foreground">
                  <ImageDown className="size-8 opacity-50" />
                  <p className="text-sm">
                    Your compressed image will appear here
                  </p>
                  <ArrowRight className="size-4 rotate-90 opacity-40 md:rotate-180" />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Comparison chart */}
      {sizeChartData.length === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mt-10 rounded-2xl border bg-card p-6"
        >
          <h3 className="mb-4 text-lg font-semibold">Size comparison</h3>
          <SizeComparisonChart data={sizeChartData} />
        </motion.div>
      )}
    </div>
  );
}
