"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function PdfCompressor() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== "application/pdf") {
        alert("Please select a PDF file only.");
        return;
      }
      setFile(selected);
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setProgress(10);

      const response = await fetch("/api/pdf-compress", {
        method: "POST",
        body: formData,
      });

      setProgress(70);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Compression failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${file.name}`;
      a.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      alert("PDF compressed successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
      setProgress(0);
      setFile(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-xl shadow-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 space-y-6">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-4">
        PDF Compressor
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Upload your PDF and compress it instantly. Free, fast, and secure.
      </p>

      <Input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={loading}
        className="mb-4"
      />

      {progress > 0 && <Progress value={progress} className="h-2 rounded" />}

      <Button
        onClick={handleCompress}
        disabled={!file || loading}
        className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold"
      >
        {loading ? "Compressing..." : "Compress PDF"}
      </Button>
    </div>
  );
}
