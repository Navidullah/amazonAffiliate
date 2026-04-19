// app/api/tiktok/analyze/route.js - Final Working Version
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    console.log("📹 Processing TikTok URL:", url);

    // Extract video ID from URL for verification
    const videoIdMatch = url.match(/\/video\/(\d+)/);
    const requestedVideoId = videoIdMatch ? videoIdMatch[1] : null;
    console.log("Requested Video ID:", requestedVideoId);

    // Call the RapidAPI
    const apiUrl = `https://${process.env.TIKTOK_API_HOST_2}/rich_response/index?url=${encodeURIComponent(url)}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.TIKTOK_API_KEY_2,
        "x-rapidapi-host": process.env.TIKTOK_API_HOST_2,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API returned ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    console.log("API Response received");
    console.log("Video ID from API:", data.videoid);
    console.log("Video URL found:", !!data.video);

    // Check if the video ID matches
    if (requestedVideoId && data.videoid && requestedVideoId !== data.videoid) {
      console.warn(
        `⚠️ Video ID mismatch! Requested: ${requestedVideoId}, Got: ${data.videoid}`,
      );
      // Still continue, but log the warning
    }

    // Extract video URL - it's in the video array
    let videoUrl = null;
    if (data.video && Array.isArray(data.video) && data.video.length > 0) {
      videoUrl = data.video[0];
    }

    if (!videoUrl) {
      return NextResponse.json(
        { error: "No video URL found in response" },
        { status: 404 },
      );
    }

    // Extract music URL
    let musicUrl = null;
    if (data.music && Array.isArray(data.music) && data.music.length > 0) {
      musicUrl = data.music[0];
    }

    // Extract thumbnail
    let thumbnail = null;
    if (data.cover && Array.isArray(data.cover) && data.cover.length > 0) {
      thumbnail = data.cover[0];
    }

    // Build the response
    const videoInfo = {
      id: data.videoid || requestedVideoId,
      title: data.description || "TikTok Video",
      thumbnail: thumbnail || "https://picsum.photos/400/300",
      duration: data.duration || 30,
      author: data.author
        ? Array.isArray(data.author)
          ? data.author[0]
          : data.author
        : null,
      region: data.region
        ? Array.isArray(data.region)
          ? data.region[0]
          : data.region
        : null,
      qualities: [
        {
          label: "🎬 No Watermark (HD)",
          url: videoUrl,
          type: "hd",
        },
      ],
    };

    // Add audio quality if available
    if (musicUrl) {
      videoInfo.qualities.push({
        label: "🎵 Audio Only (MP3)",
        url: musicUrl,
        type: "audio",
      });
    }

    console.log("🎉 Success! Video ready to download");
    console.log("Video URL preview:", videoUrl.substring(0, 100) + "...");

    return NextResponse.json(videoInfo);
  } catch (error) {
    console.error("❌ TikTok API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process video. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "operational",
    message: "TikTok downloader is ready",
    timestamp: new Date().toISOString(),
  });
}
