// components/VideoPreview.js
"use client";

import { useState } from "react";

export default function VideoPreview({ videoInfo }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Check if we have valid video info
  if (!videoInfo || (!videoInfo.title && !videoInfo.thumbnail)) {
    return (
      <div className="rounded-lg p-6 bg-gray-50 dark:bg-gray-700/50 text-center">
        <div className="text-4xl mb-2">🎵</div>
        <p className="text-gray-600 dark:text-gray-400">
          Video preview unavailable, but you can still download it!
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          Click download button above to save the video
        </p>
      </div>
    );
  }

  // Format numbers
  const formatNumber = (num) => {
    if (!num || num === 0) return "N/A";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700/50">
      {/* Video/Thumbnail */}
      <div className="aspect-video relative bg-black">
        {!isPlaying ? (
          <div
            className="relative h-full cursor-pointer"
            onClick={() => videoInfo.videoUrl && setIsPlaying(true)}
          >
            {videoInfo.thumbnail && !imgError ? (
              <img
                src={videoInfo.thumbnail}
                alt={videoInfo.title || "TikTok video preview"}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <span className="text-4xl">🎵</span>
              </div>
            )}
            {videoInfo.videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <svg
                    className="w-8 h-8 text-gray-800 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ) : (
          <video
            src={videoInfo.videoUrl}
            controls
            autoPlay
            className="w-full h-full"
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {videoInfo.title || "TikTok Video"}
        </h3>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          {videoInfo.likes > 0 && (
            <span className="flex items-center gap-1">
              <span>❤️</span> {formatNumber(videoInfo.likes)}
            </span>
          )}
          {videoInfo.comments > 0 && (
            <span className="flex items-center gap-1">
              <span>💬</span> {formatNumber(videoInfo.comments)}
            </span>
          )}
          {videoInfo.views > 0 && (
            <span className="flex items-center gap-1">
              <span>👁️</span> {formatNumber(videoInfo.views)}
            </span>
          )}
          {videoInfo.duration && videoInfo.duration !== "N/A" && (
            <span className="flex items-center gap-1">
              <span>⏱️</span> {videoInfo.duration}
            </span>
          )}
        </div>

        {videoInfo.uploader && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-500">
            @{videoInfo.uploader}
          </div>
        )}

        {/* Download Suggestion */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
          <p className="text-xs text-blue-600 dark:text-blue-400">
            💡 Click the download button above to save this video
          </p>
        </div>
      </div>
    </div>
  );
}
