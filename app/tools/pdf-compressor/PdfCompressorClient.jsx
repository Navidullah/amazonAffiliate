"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function PdfCompressorClient() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("idle");
  const [result, setResult] = useState(null);

  const API_URL = "https://pdf-compressor-xjed.onrender.com/compress-pdf/";
  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 B";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 2)} ${sizes[i]}`;
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== "application/pdf") {
        setStatusType("error");
        setStatusMessage("Please select a valid PDF file.");
        return;
      }
      setFile(selected);
      setResult(null);
      setStatusType("success");
      setStatusMessage("File ready. Click compress to continue.");
    }
  };

  const handleCompress = async () => {
    if (!file) {
      setStatusType("error");
      setStatusMessage("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setProgress(10);
      setStatusType("idle");
      setStatusMessage("Uploading and compressing your file...");

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Compression failed");
      }

      const blob = await response.blob();
      const compressedSize = blob.size;
      const originalSize = file.size;
      const saved = originalSize - compressedSize;
      const reduction = originalSize > 0 ? (saved / originalSize) * 100 : 0;
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(".pdf", "-compressed.pdf");
      a.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      setResult({
        originalSize,
        compressedSize,
        saved,
        reduction,
      });
      setStatusType("success");
      setStatusMessage("Compression completed. Download started.");
    } catch (err) {
      setStatusType("error");
      setStatusMessage(err.message || "Compression failed. Please try again.");
    } finally {
      setLoading(false);
      setProgress(0);
      setFile(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-900/65 p-6 shadow-2xl backdrop-blur-xl md:p-8">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Label htmlFor="pdfFile" className="text-sm font-semibold text-slate-100">
            Upload PDF
          </Label>
          <Input
            id="pdfFile"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={loading}
            className="mt-2 h-14 border-white/20 bg-black/30 text-white file:mr-4 file:rounded-md file:border-0 file:bg-cyan-500/20 file:px-3 file:py-1 file:text-cyan-200 hover:file:bg-cyan-500/30"
          />
          {file && (
            <p className="mt-3 text-sm text-slate-300">
              Selected: <span className="font-medium text-slate-100">{file.name}</span>{" "}
              ({formatBytes(file.size)})
            </p>
          )}
        </div>

        <Button
          onClick={handleCompress}
          disabled={loading || !file}
          className="h-14 min-w-44 bg-gradient-to-r from-cyan-500 to-blue-500 text-base font-bold text-white hover:from-cyan-400 hover:to-blue-400"
        >
          {loading ? "Compressing..." : "Compress PDF"}
        </Button>
      </div>

      {progress > 0 && (
        <div className="mt-5">
          <Progress value={progress} className="h-2.5 rounded-full" />
        </div>
      )}

      {statusMessage && (
        <div
          className={`mt-5 rounded-xl border px-4 py-3 text-sm ${
            statusType === "error"
              ? "border-red-400/40 bg-red-500/10 text-red-200"
              : statusType === "success"
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                : "border-slate-400/30 bg-slate-500/10 text-slate-200"
          }`}
        >
          {statusMessage}
        </div>
      )}

      {result && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Original Size
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              {formatBytes(result.originalSize)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Compressed Size
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              {formatBytes(result.compressedSize)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Size Reduced
            </p>
            <p className="mt-1 text-lg font-semibold text-emerald-300">
              {result.reduction.toFixed(1)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
