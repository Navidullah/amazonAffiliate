"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, FileText, Loader2, ShieldCheck, Upload, X } from "lucide-react";

export default function PdfToWordConverter() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });

  const MAX_FILE_SIZE = 25 * 1024 * 1024;
  const API_URL = "/api/convert-pdf-to-word";
  const canConvert = !loading && !!file;

  const fileSizeLabel = useMemo(() => {
    if (!file) return "";
    const mb = file.size / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  }, [file]);

  const handleFileChange = (e) => {
    setMessage({ type: "", text: "" });
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== "application/pdf" && !selected.name.toLowerCase().endsWith(".pdf")) {
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
      a.download = file.name.replace(".pdf", ".docx");
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
      setTimeout(() => {
        setProgress(0);
      }, 700);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/85 p-6 shadow-xl backdrop-blur dark:border-white/10 dark:bg-gray-900/70 sm:p-8">
      <div className="pointer-events-none absolute -left-16 top-8 h-44 w-44 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Convert PDF to Word</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Accurate DOCX conversion with formatting preserved as much as possible.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure Processing
          </span>
        </div>

        <div className="rounded-2xl border border-dashed border-gray-300/90 bg-gray-50/80 p-5 dark:border-white/15 dark:bg-gray-900/60">
          <Label htmlFor="pdfFile" className="mb-2 inline-flex items-center gap-2 text-sm font-medium">
            <Upload className="h-4 w-4" />
            Upload PDF file
          </Label>
          <Input
            id="pdfFile"
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            disabled={loading}
            className="cursor-pointer bg-white dark:bg-gray-950"
          />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Supported format: PDF only. Maximum file size: 25 MB.
          </p>
        </div>

        {file && (
          <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-gray-950/60">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                <FileText className="h-4 w-4 text-blue-700 dark:text-blue-300" />
              </div>
              <div>
                <p className="line-clamp-1 text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{fileSizeLabel}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              disabled={loading}
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Remove selected file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {progress > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{loading ? "Converting your file..." : "Finalizing..."}</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 rounded-full" />
          </div>
        )}

        {message.text && (
          <div
            className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-sm ${
              message.type === "error"
                ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-300"
                : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300"
            }`}
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        <Button onClick={handleConvert} disabled={!canConvert} className="h-11 w-full text-base font-semibold">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Converting to Word...
            </span>
          ) : (
            "Convert PDF to Word"
          )}
        </Button>
      </div>
    </section>
  );
}
