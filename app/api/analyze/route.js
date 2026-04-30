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

    // Try RapidAPI first
    let videoInfo = null;
    let usedFallback = false;
    let errorDetails = null;

    try {
      console.log("Attempting RapidAPI...");
      videoInfo = await callRapidAPI(url);
      console.log("RapidAPI succeeded");
    } catch (rapidApiError) {
      console.error("RapidAPI failed:", rapidApiError.message);
      errorDetails = rapidApiError.message;

      // Try your Render API as fallback
      try {
        console.log("Attempting fallback API (Render)...");
        videoInfo = await callYourRenderAPI(url);
        usedFallback = true;
        console.log("Fallback API succeeded");
      } catch (fallbackError) {
        console.error("Fallback API also failed:", fallbackError.message);
        throw new Error(
          `Both APIs failed. RapidAPI: ${rapidApiError.message}, Fallback: ${fallbackError.message}`,
        );
      }
    }

    // Add source info for debugging (optional)
    if (usedFallback) {
      videoInfo._source = "fallback-api";
    } else {
      videoInfo._source = "rapidapi";
    }

    return NextResponse.json(videoInfo);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze video. Please try again." },
      { status: 500 },
    );
  }
}

// Function to call RapidAPI
async function callRapidAPI(url) {
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  const RAPIDAPI_HOST =
    process.env.RAPIDAPI_HOST || "facebook-video-downloader9.p.rapidapi.com";

  if (!RAPIDAPI_KEY) {
    throw new Error("RAPIDAPI_KEY is not configured");
  }

  const apiUrl = `https://${RAPIDAPI_HOST}/api/v1/videos/download?url=${encodeURIComponent(url)}`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-host": RAPIDAPI_HOST,
      "x-rapidapi-key": RAPIDAPI_KEY,
    },
  };

  // Add timeout to RapidAPI call (15 seconds)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(apiUrl, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`RapidAPI error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    if (data.status !== "success" || !data.data) {
      throw new Error(data.message || "RapidAPI returned no data");
    }

    // Transform the API response to our frontend format
    return transformRapidAPIResponse(data);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("RapidAPI timeout after 15 seconds");
    }
    throw error;
  }
}

// Function to call your Render API (fallback)
async function callYourRenderAPI(url) {
  const YOUR_API_URL =
    process.env.YOUR_API_URL ||
    "https://facebook-video-downloader-api.onrender.com";

  // Add timeout to fallback API call (20 seconds)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(
      `${YOUR_API_URL}/download?url=${encodeURIComponent(url)}`,
      {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error ||
          errorData.message ||
          `Fallback API error: ${response.status}`,
      );
    }

    const data = await response.json();

    if (!data.success || !data.data || !data.data.video_url) {
      throw new Error(data.message || "Fallback API returned no video URL");
    }

    // Transform your API response to match RapidAPI format
    return transformYourAPIResponse(data);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error("Fallback API timeout after 20 seconds");
    }
    throw error;
  }
}

// Transform RapidAPI response to frontend format
function transformRapidAPIResponse(data) {
  const videoData = data.data;
  const video = videoData.video;
  const download = videoData.download;

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

  return {
    title: video.title || "Facebook Video",
    thumbnail:
      video.thumbnail_url ||
      "https://via.placeholder.com/400x300?text=Facebook+Video",
    duration: Math.ceil(video.duration_ms / 1000) || 60,
    qualities: qualities,
    videoId: video.id,
    rawData: videoData,
  };
}

// Transform your Render API response to frontend format
function transformYourAPIResponse(data) {
  // Extract quality information from your API response
  const qualities = [];

  // Your API provides best quality video_url
  if (data.data.video_url) {
    // Try to determine quality from URL or add generic HD option
    const isHD =
      data.data.video_url.includes("hd") ||
      data.data.video_url.includes("high");

    qualities.push({
      label: isHD ? "HD (High Quality)" : "SD (Standard Quality)",
      url: data.data.video_url,
      size: data.data.file_size || "~10 MB",
      type: isHD ? "hd" : "sd",
    });

    // If there are multiple qualities available in your response
    if (
      data.data.available_qualities &&
      data.data.available_qualities.length > 0
    ) {
      data.data.available_qualities.forEach((quality, index) => {
        if (quality.url && quality.url !== data.data.video_url) {
          qualities.push({
            label: quality.quality || `Quality ${index + 1}`,
            url: quality.url,
            size: quality.file_size || "~10 MB",
            type: quality.quality?.toLowerCase().includes("hd") ? "hd" : "sd",
          });
        }
      });
    }
  }

  // Calculate duration from your response if available
  let duration = 60; // default
  if (data.data.duration) {
    duration = data.data.duration;
  }

  return {
    title: data.data.title || "Facebook Video",
    thumbnail:
      data.data.thumbnail ||
      "https://via.placeholder.com/400x300?text=Facebook+Video",
    duration: duration,
    qualities: qualities,
    videoId: null,
    rawData: data.data,
  };
}

// Helper function to calculate approximate file size
function calculateFileSize(bitrate, durationMs) {
  if (!bitrate || !durationMs) return "~10 MB";

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
