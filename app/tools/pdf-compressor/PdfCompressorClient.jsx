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

  // Replace with your deployed PDF compressor API
  const API_URL = "https://pdf-compressor-xjed.onrender.com/compress-pdf/";

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
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setProgress(10);

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
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(".pdf", "-compressed.pdf");
      a.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      alert("PDF compressed successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
      setProgress(0);
      setFile(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-xl shadow-2xl space-y-4 bg-white/5 backdrop-blur-md">
      <Label htmlFor="pdfFile" className="text-white font-semibold">
        Upload PDF
      </Label>
      <Input
        id="pdfFile"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={loading}
        className="h-14 bg-black/40 border-white/20 text-white placeholder-gray-300"
      />

      {progress > 0 && <Progress value={progress} className="h-3 rounded" />}

      <Button
        onClick={handleCompress}
        disabled={loading || !file}
        className="w-full h-14 text-white font-bold text-lg bg-gradient-to-r from-purple-500 to-pink-500"
      >
        {loading ? "Compressing..." : "Compress PDF"}
      </Button>
    </div>
  );
}
