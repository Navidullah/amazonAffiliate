"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";

export default function PdfToWordConverter() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Replace this with your deployed API URL
  const API_URL = "/api/convert-pdf-to-word";

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== "application/pdf") {
        Toaster({
          title: "Invalid file",
          description: "Please select a PDF file only.",
        });
        return;
      }
      setFile(selected);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      Toaster({
        title: "No file selected",
        description: "Please choose a PDF.",
      });
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
        throw new Error(error.detail || "Conversion failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(".pdf", ".docx");
      a.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      Toaster({ title: "Success", description: "File converted!" });
    } catch (err) {
      Toaster({ title: "Error", description: err.message });
    } finally {
      setLoading(false);
      setProgress(0);
      setFile(null);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-lg shadow-sm space-y-4 bg-white dark:bg-gray-800">
      <Label htmlFor="pdfFile">Upload PDF file</Label>
      <Input
        id="pdfFile"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={loading}
      />

      {progress > 0 && <Progress value={progress} className="h-2 rounded" />}

      <Button
        onClick={handleConvert}
        disabled={loading || !file}
        className="w-full"
      >
        {loading ? "Converting..." : "Convert to Word"}
      </Button>
    </div>
  );
}
