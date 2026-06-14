"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export default function VideoToGifConverter() {
  const [file, setFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [status, setStatus] = useState({
    isConverting: false,
    progress: 0,
    error: null,
    outputGif: null,
  });
  const [settings, setSettings] = useState({
    fps: 15,
    width: 480,
    quality: 1,
    loop: true,
  });

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

    if (selectedFile.size > 500 * 1024 * 1024) {
      setStatus((prev) => ({
        ...prev,
        error: "File size must be less than 500MB",
      }));
      return;
    }

    setFile(selectedFile);
    setStatus((prev) => ({ ...prev, error: null, outputGif: null }));

    const previewUrl = URL.createObjectURL(selectedFile);
    setVideoPreview(previewUrl);
  }, []);

  const convertVideoToGif = async () => {
    if (!file || !videoRef.current || !canvasRef.current) return;

    setStatus({
      isConverting: true,
      progress: 0,
      error: null,
      outputGif: null,
    });

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Wait for video metadata to load
      await new Promise((resolve) => {
        if (video.readyState >= 1) {
          resolve();
        } else {
          video.addEventListener("loadedmetadata", resolve, { once: true });
        }
      });

      // Calculate dimensions - FIX: Ensure integers using Math.floor()
      const targetWidth = settings.width;
      const targetHeight = Math.floor(
        (video.videoHeight / video.videoWidth) * targetWidth,
      );

      // Ensure dimensions are integers (already are with Math.floor)
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const duration = video.duration;
      const frameInterval = 1 / settings.fps;
      const totalFrames = Math.min(Math.floor(duration / frameInterval), 150); // Limit to 150 frames for performance

      let frames = [];
      let currentFrame = 0;

      // Dynamically import GIF.js
      const GIF = (await import("gif.js")).default;

      const gif = new GIF({
        workers: 2,
        quality: Math.floor(settings.quality * 30),
        width: targetWidth,
        height: targetHeight,
        workerScript: "/gif.worker.js",
      });

      // Set up video event handlers
      video.muted = true;
      video.loop = false;

      return new Promise((resolve, reject) => {
        const captureFrame = () => {
          if (currentFrame >= totalFrames) {
            // Finished capturing all frames
            gif.on("finished", (blob) => {
              const url = URL.createObjectURL(blob);
              setStatus((prev) => ({
                ...prev,
                isConverting: false,
                progress: 100,
                outputGif: url,
              }));
              resolve(url);
            });

            gif.render();
            return;
          }

          // Draw current frame to canvas
          ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

          // Get frame data - FIX: Use integers (already integers from Math.floor)
          const frameData = ctx.getImageData(0, 0, targetWidth, targetHeight);
          gif.addFrame(frameData, { delay: 1000 / settings.fps });

          currentFrame++;
          const progress = (currentFrame / totalFrames) * 100;
          setStatus((prev) => ({ ...prev, progress: Math.min(progress, 95) }));

          // Seek to next frame
          const nextTime = currentFrame * frameInterval;
          if (nextTime < duration) {
            video.currentTime = nextTime;
          } else {
            // If we've reached the end, finish
            captureFrame();
          }
        };

        // Handle seeked event
        const onSeeked = () => {
          captureFrame();
        };

        video.addEventListener("seeked", onSeeked);

        // Start capturing from beginning
        video.currentTime = 0;

        // Cleanup
        const cleanup = () => {
          video.removeEventListener("seeked", onSeeked);
        };

        // Store cleanup for later
        gif.on("error", (error) => {
          cleanup();
          reject(error);
        });
      });
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus((prev) => ({
        ...prev,
        isConverting: false,
        error: "Failed to convert video: " + error.message,
      }));
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    await convertVideoToGif();
  };

  const handleDownload = () => {
    if (status.outputGif) {
      const a = document.createElement("a");
      a.href = status.outputGif;
      a.download = `converted_${Date.now()}.gif`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleReset = () => {
    if (videoPreview) URL.revokeObjectURL(videoPreview);
    if (status.outputGif) URL.revokeObjectURL(status.outputGif);
    setFile(null);
    setVideoPreview(null);
    setStatus({
      isConverting: false,
      progress: 0,
      error: null,
      outputGif: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      if (status.outputGif) URL.revokeObjectURL(status.outputGif);
    };
  }, [videoPreview, status.outputGif]);

  return (
    <div className="w-full">
      {/* Hidden canvas for frame capture */}
      <canvas ref={canvasRef} className="hidden" />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📤 Select Video
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
                    Click to select video file
                  </p>
                  <p className="text-sm text-gray-400">
                    MP4, WebM, MOV (Up to 500MB)
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
                  max="24"
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
                <p className="text-xs text-gray-400 mt-1">
                  Lower FPS = smaller file size
                </p>
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
                <p className="text-xs text-gray-400 mt-1">
                  Smaller width = smaller file size
                </p>
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
                      quality: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  disabled={status.isConverting}
                >
                  <option value="0.5">Low (Fast, smaller file)</option>
                  <option value="1">Medium (Balanced)</option>
                  <option value="2">High (Better quality)</option>
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
                  Processing video... {Math.round(status.progress)}%
                </span>
              ) : (
                "Convert to GIF 🎬→🖼️"
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
              🎯 Your GIF Result
            </h2>

            {status.outputGif ? (
              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={status.outputGif}
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
                <p className="text-xs text-center text-gray-500">
                  GIF created entirely in your browser - nothing was uploaded
                </p>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                <div className="text-5xl mb-3">🎬</div>
                <p>Your GIF will appear here</p>
                <p className="text-sm mt-2">Select a video and click convert</p>
              </div>
            )}
          </div>
        </div>

    </div>
  );
}
