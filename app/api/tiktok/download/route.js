// app/api/tiktok/download/route.js - Original Working Version
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { url, quality } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "video/mp4,video/webm,video/*",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.status}`);
      }

      const videoBuffer = await response.arrayBuffer();
      const filename = `tiktok_video_${Date.now()}.mp4`;

      return new NextResponse(videoBuffer, {
        status: 200,
        headers: {
          "Content-Type": response.headers.get("content-type") || "video/mp4",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Length": videoBuffer.byteLength.toString(),
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download video. Please try again." },
      { status: 500 },
    );
  }
}
