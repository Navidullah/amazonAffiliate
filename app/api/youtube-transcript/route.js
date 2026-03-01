// app/api/youtube-transcript/route.js
import { NextResponse } from "next/server";
import { getSubtitles } from "youtube-captions-scraper";
import ytdl from "ytdl-core";

export async function POST(req) {
  try {
    const { videoIdOrUrl } = await req.json();

    if (!videoIdOrUrl) {
      return NextResponse.json(
        { error: "Video ID or URL is required" },
        { status: 400 },
      );
    }

    // Extract video ID
    let videoId;

    // Handle different URL formats
    const urlPatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/shorts\/([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of urlPatterns) {
      const match = videoIdOrUrl.match(pattern);
      if (match) {
        videoId = match[1];
        break;
      }
    }

    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL or Video ID" },
        { status: 400 },
      );
    }

    // Get video title
    const info = await ytdl.getInfo(videoId);

    // Get subtitles
    let subtitles;
    try {
      // Try English first
      subtitles = await getSubtitles({
        videoID: videoId,
        lang: "en",
      });
    } catch (enError) {
      try {
        // Try any available language
        subtitles = await getSubtitles({
          videoID: videoId,
        });
      } catch (anyError) {
        return NextResponse.json(
          {
            error:
              "No captions available for this video. The video might not have captions or they might be disabled.",
          },
          { status: 404 },
        );
      }
    }

    // Format transcript
    const transcript = subtitles.map((item) => item.text).join("\n");

    return NextResponse.json({
      success: true,
      title: info.videoDetails.title,
      transcript,
    });
  } catch (error) {
    console.error("Transcript API Error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to fetch transcript" },
      { status: 500 },
    );
  }
}
