"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Loader2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const API_URL = "/api/convert-pdf-to-word";

export default function PdfToWordConverter() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const inputRef = useRef(null);

  const canConvert = !loading && !!file;

  const fileSizeLabel = useMemo(() => {
    if (!file) return "";
    const mb = file.size / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  }, [file]);

  const validateAndSet = (selected) => {
    setMessage({ type: "", text: "" });
    if (!selected) return;
    if (
      selected.type !== "application/pdf" &&
      !selected.name.toLowerCase().endsWith(".pdf")
    ) {
      setMessage({
        type: "error",
        text: "Invalid file type. Please select a PDF file only.",
      });
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setMessage({
        type: "error",
        text: "File is too large. Please upload a PDF up to 25 MB.",
      });
      return;
    }
    setFile(selected);
    setMessage({
      type: "success",
      text: "PDF ready. Click convert to generate an editable Word file.",
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSet(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (loading) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSet(e.dataTransfer.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setMessage({
        type: "error",
        text: "No file selected. Please choose a PDF to continue.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90000);
    let progressTimer;

    try {
      setLoading(true);
      setProgress(8);
      setMessage({ type: "", text: "" });

      progressTimer = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? prev : prev + 8));
      }, 500);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorMessage = "Conversion failed. Please try again.";
        try {
          const error = await response.json();
          errorMessage = error?.error || error?.detail || errorMessage;
        } catch {
          // keep fallback message
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "") + ".docx";
      a.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      setMessage({
        type: "success",
        text: "Conversion complete. Your Word file has been downloaded.",
      });
    } catch (err) {
      if (err.name === "AbortError") {
        setMessage({
          type: "error",
          text: "The conversion took too long. Please retry with a smaller or cleaner PDF.",
        });
      } else {
        setMessage({
          type: "error",
          text: err.message || "Something went wrong during conversion.",
        });
      }
    } finally {
      clearTimeout(timeout);
      clearInterval(progressTimer);
      setLoading(false);
      setTimeout(() => setProgress(0), 700);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-1 shadow-[0_20px_70px_-25px_rgba(56,89,255,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
    >
      {/* animated gradient border glow */}
      <div className="pointer-events-none absolute -inset-px rounded-[2rem] bg-gradient-to-br from-indigo-500/40 via-cyan-400/30 to-fuchsia-500/40 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative rounded-[1.85rem] bg-gradient-to-b from-white/90 to-white/60 p-6 dark:from-gray-950/80 dark:to-gray-950/40 sm:p-8">
        {/* soft background blobs */}
        <div className="pointer-events-none absolute -left-20 top-0 h-52 w-52 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:from-indigo-300 dark:via-blue-300 dark:to-cyan-200">
                Convert PDF to Word
              </h2>
              <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
                Drop a PDF and download a clean, editable DOCX in seconds —
                formatting preserved.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/80 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure Processing
            </span>
          </div>

          {/* Dropzone */}
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Upload PDF file"
            onClick={() => !loading && inputRef.current?.click()}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && !loading) {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (!loading) setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            animate={{ scale: isDragging ? 1.01 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-10 text-center outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${
              isDragging
                ? "border-indigo-500 bg-indigo-50/80 dark:border-indigo-400 dark:bg-indigo-500/10"
                : "border-gray-300/80 bg-gray-50/60 hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-white/15 dark:bg-white/[0.02] dark:hover:border-indigo-400/60"
            } ${loading ? "pointer-events-none opacity-70" : ""}`}
          >
            <motion.div
              animate={{ y: isDragging ? -4 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30"
            >
              <UploadCloud className="h-7 w-7" />
            </motion.div>
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {isDragging
                  ? "Drop your PDF here"
                  : "Drag & drop your PDF, or click to browse"}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                PDF only · up to 25 MB
              </p>
            </div>
            <input
              ref={inputRef}
              id="pdfFile"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              disabled={loading}
              className="hidden"
            />
          </motion.div>

          {/* Selected file */}
          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center justify-between gap-3 overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 ring-1 ring-indigo-500/20">
                    <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {fileSizeLabel}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setMessage({ type: "", text: "" });
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  disabled={loading}
                  className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/10 dark:hover:text-white"
                  aria-label="Remove selected file"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress */}
          <AnimatePresence>
            {progress > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    {loading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    {loading ? "Converting your file…" : "Finalizing…"}
                  </span>
                  <span className="tabular-nums">{progress}%</span>
                </div>
                <Progress
                  value={progress}
                  className="h-2 overflow-hidden rounded-full bg-gray-200/70 dark:bg-white/10 [&>*]:bg-gradient-to-r [&>*]:from-indigo-500 [&>*]:to-cyan-500"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Message */}
          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className={`flex items-start gap-2.5 rounded-2xl border px-4 py-3 text-sm ${
                  message.type === "error"
                    ? "border-red-200 bg-red-50/90 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                    : "border-emerald-200 bg-emerald-50/90 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                }`}
              >
                {message.type === "error" ? (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span>{message.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Convert button */}
          <motion.div whileHover={canConvert ? { scale: 1.01 } : {}} whileTap={canConvert ? { scale: 0.99 } : {}}>
            <Button
              onClick={handleConvert}
              disabled={!canConvert}
              className="group/btn relative h-12 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition-shadow hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-60 disabled:shadow-none"
            >
              {/* shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Converting to Word…
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Convert PDF to Word
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </span>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
