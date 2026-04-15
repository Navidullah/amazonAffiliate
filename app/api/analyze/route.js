// app/api/analyze/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate Facebook URL
    const isValidFacebookUrl = (url) => {
      const patterns = [
        /facebook\.com\/.*\/videos\/.*/i,
        /facebook\.com\/watch\?v=.*/i,
        /facebook\.com\/reel\/.*/i,
        /fb\.watch\/.*/i,
        /facebook\.com\/share\/.*/i,
        /facebook\.com\/reel\/[0-9]+/i,
      ];
      return patterns.some((pattern) => pattern.test(url));
    };

    if (!isValidFacebookUrl(url)) {
      return NextResponse.json(
        { error: "Invalid Facebook video URL. Please check and try again." },
        { status: 400 },
      );
    }

    const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
    const RAPIDAPI_HOST =
      process.env.RAPIDAPI_HOST || "facebook-video-downloader9.p.rapidapi.com";

    if (!RAPIDAPI_KEY) {
      console.error("RAPIDAPI_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "API configuration error. Please contact support." },
        { status: 500 },
      );
    }

    // Using the exact endpoint from your curl command
    const apiUrl = `https://${RAPIDAPI_HOST}/api/v1/videos/download?url=${encodeURIComponent(url)}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-host": RAPIDAPI_HOST,
        "x-rapidapi-key": RAPIDAPI_KEY,
      },
    };

    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("RapidAPI error:", response.status, errorText);
      throw new Error(`RapidAPI error: ${response.status}`);
    }

    const data = await response.json();

    // Check if API returned success
    if (data.status !== "success" || !data.data) {
      throw new Error(data.message || "Failed to fetch video information");
    }

    // Transform the API response to our frontend format
    const videoData = data.data;
    const video = videoData.video;
    const download = videoData.download;

    // Build qualities array based on available downloads
    const qualities = [];

    // Add SD quality if available
    if (download && download.sd && download.sd.url) {
      qualities.push({
        label: download.sd.quality || "SD (480p)",
        url: download.sd.url,
        size: calculateFileSize(download.sd.bitrate, video.duration_ms),
        type: "sd",
      });
    }

    // Add HD quality if available
    if (download && download.hd && download.hd.url) {
      qualities.push({
        label: download.hd.quality || "HD (1080p)",
        url: download.hd.url,
        size: calculateFileSize(download.hd.bitrate, video.duration_ms),
        type: "hd",
      });
    }

    // If no qualities found, try to extract from other fields
    if (qualities.length === 0) {
      // Check for direct download URLs
      const possibleUrls = [
        download?.sd?.url,
        download?.hd?.url,
        download?.url,
        video?.download_url,
      ].filter(Boolean);

      if (possibleUrls.length > 0) {
        qualities.push({
          label: "Download Video",
          url: possibleUrls[0],
          size: "~10 MB",
          type: "sd",
        });
      }
    }

    const videoInfo = {
      title: video.title || "Facebook Video",
      thumbnail:
        video.thumbnail_url ||
        "https://via.placeholder.com/400x300?text=Facebook+Video",
      duration: Math.ceil(video.duration_ms / 1000) || 60, // Convert ms to seconds
      qualities: qualities,
      videoId: video.id,
      rawData: videoData, // Keep for debugging if needed
    };

    return NextResponse.json(videoInfo);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze video. Please try again." },
      { status: 500 },
    );
  }
}

// Helper function to calculate approximate file size
function calculateFileSize(bitrate, durationMs) {
  if (!bitrate || !durationMs) return "~10 MB";

  // Size in bytes = bitrate (bps) * duration (seconds) / 8
  const durationSec = durationMs / 1000;
  const sizeBytes = (bitrate * durationSec) / 8;
  const sizeMB = sizeBytes / (1024 * 1024);

  if (sizeMB < 1) {
    return `${Math.round(sizeMB * 1024)} KB`;
  } else if (sizeMB < 10) {
    return `${sizeMB.toFixed(1)} MB`;
  } else {
    return `${Math.round(sizeMB)} MB`;
  }
}
