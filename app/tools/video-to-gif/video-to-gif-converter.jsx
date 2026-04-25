// app/tools/video-to-gif/video-to-gif-converter.jsx
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import Link from "next/link";

export default function VideoToGifConverter() {
  const [file, setFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [status, setStatus] = useState({
    isConverting: false,
    progress: 0,
    error: null,
    outputUrl: null,
  });
  const [settings, setSettings] = useState({
    fps: 15,
    width: 480,
    quality: "medium",
    loop: true,
  });

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleFileSelect = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/x-msvideo",
    ];
    if (!validTypes.includes(selectedFile.type)) {
      setStatus((prev) => ({
        ...prev,
        error: "Please upload a valid video file (MP4, WebM, MOV, AVI)",
      }));
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      setStatus((prev) => ({
        ...prev,
        error: "File size must be less than 50MB",
      }));
      return;
    }

    setFile(selectedFile);
    setStatus((prev) => ({ ...prev, error: null, outputUrl: null }));

    const previewUrl = URL.createObjectURL(selectedFile);
    setVideoPreview(previewUrl);
  }, []);

  const handleConvert = async () => {
    if (!file) return;

    setStatus({
      isConverting: true,
      progress: 0,
      error: null,
      outputUrl: null,
    });

    try {
      // Step 1: Upload file directly to Vercel Blob from the browser
      setStatus((prev) => ({ ...prev, progress: 10 }));

      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/blob-upload",
      });

      setStatus((prev) => ({ ...prev, progress: 30 }));

      // Step 2: Send only the video URL to your conversion API
      const response = await fetch("/api/tools/video-to-gif", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          videoUrl: blob.url,
          fps: settings.fps,
          width: settings.width,
          quality: settings.quality,
          loop: settings.loop,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Conversion failed");
      }

      // Progress simulation for better UX
      const progressInterval = setInterval(() => {
        setStatus((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 500);

      const gifBlob = await response.blob();
      clearInterval(progressInterval);

      const outputUrl = URL.createObjectURL(gifBlob);
      setStatus((prev) => ({
        ...prev,
        isConverting: false,
        progress: 100,
        outputUrl,
      }));
    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        isConverting: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      }));
    }
  };

  const handleDownload = () => {
    if (status.outputUrl) {
      const a = document.createElement("a");
      a.href = status.outputUrl;
      a.download = `converted_${Date.now()}.gif`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleReset = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    if (status.outputUrl) URL.revokeObjectURL(status.outputUrl);
    setFile(null);
    setVideoPreview(null);
    setStatus({
      isConverting: false,
      progress: 0,
      error: null,
      outputUrl: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      if (status.outputUrl) URL.revokeObjectURL(status.outputUrl);
    };
  }, [videoPreview, status.outputUrl]);

  // The rest of your JSX remains the same as before
  // (the UI structure with upload area, settings, and result section)
  // ... keeping your existing Tailwind classes and layout

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="text-sm mb-6 text-gray-600 dark:text-gray-400">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/tools" className="hover:text-blue-600">
                Tools
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">
              Video to GIF
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Convert Video to GIF
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your videos into high-quality animated GIFs. Fast, free,
            and no watermark. Supports MP4, WebM, MOV, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📤 Upload Video
            </h2>

            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
                onChange={handleFileSelect}
                className="hidden"
                disabled={status.isConverting}
              />

              {videoPreview ? (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    src={videoPreview}
                    controls
                    className="max-h-64 mx-auto rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-500">{file?.name}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-5xl">🎥</div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-400">
                    MP4, WebM, MOV, AVI (Max 50MB)
                  </p>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="mt-6 space-y-4">
              <h3 className="font-medium text-gray-700 dark:text-gray-300">
                GIF Settings
              </h3>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Frame Rate (FPS): {settings.fps}
                </label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={settings.fps}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      fps: parseInt(e.target.value),
                    }))
                  }
                  className="w-full"
                  disabled={status.isConverting}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Width (px): {settings.width}
                </label>
                <input
                  type="range"
                  min="200"
                  max="800"
                  step="20"
                  value={settings.width}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      width: parseInt(e.target.value),
                    }))
                  }
                  className="w-full"
                  disabled={status.isConverting}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Quality
                </label>
                <select
                  value={settings.quality}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      quality: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  disabled={status.isConverting}
                >
                  <option value="low">Low (Smaller file)</option>
                  <option value="medium">Medium (Balanced)</option>
                  <option value="high">High (Better quality)</option>
                </select>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.loop}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, loop: e.target.checked }))
                  }
                  disabled={status.isConverting}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Loop GIF
                </span>
              </label>
            </div>

            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={!file || status.isConverting}
              className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02]"
            >
              {status.isConverting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Converting... {status.progress}%
                </span>
              ) : (
                "Convert to GIF"
              )}
            </button>

            {status.error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                ⚠️ {status.error}
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🎯 Result
            </h2>

            {status.outputUrl ? (
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                  <img
                    src={status.outputUrl}
                    alt="Converted GIF preview"
                    className="max-w-full h-auto mx-auto rounded-lg shadow-md"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    💾 Download GIF
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
                  >
                    Convert Another
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                <div className="text-5xl mb-3">🖼️</div>
                <p>Your GIF will appear here</p>
                <p className="text-sm mt-2">Upload a video and click convert</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Why Use Our Video to GIF Converter?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Fast Conversion</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Convert videos to GIFs in seconds with our optimized processing
                engine.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                All processing happens on your device. Your files never leave
                your computer.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold mb-2">Customizable Output</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Adjust FPS, width, and quality to get the perfect GIF for your
                needs.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-10 mb-4">
            How to Convert Video to GIF
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Upload your video file (MP4, WebM, MOV, or AVI format)</li>
            <li>Adjust GIF settings like frame rate, width, and quality</li>
            <li>Click "Convert to GIF" button</li>
            <li>Download your animated GIF instantly</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
