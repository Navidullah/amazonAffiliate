// app/api/download/route.js (Updated for better handling)
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { url, quality } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Fetch the video with proper headers and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout for larger videos

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "video/mp4,video/webm,video/*",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://www.facebook.com/",
          Origin: "https://www.facebook.com",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.status}`);
      }

      // Get the video data
      const videoBuffer = await response.arrayBuffer();

      // Generate filename with quality and timestamp
      const sanitizedQuality = quality.replace(/[^a-zA-Z0-9]/g, "_");
      const filename = `facebook_video_${sanitizedQuality}_${Date.now()}.mp4`;

      // Return the video as a downloadable file
      return new NextResponse(videoBuffer, {
        status: 200,
        headers: {
          "Content-Type": response.headers.get("content-type") || "video/mp4",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Content-Length": videoBuffer.byteLength.toString(),
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Access-Control-Allow-Origin": "*",
          "Accept-Ranges": "bytes",
        },
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    console.error("Download error:", error);

    let errorMessage = "Failed to download video. ";

    if (error.code === "UND_ERR_CONNECT_TIMEOUT") {
      errorMessage +=
        "The connection timed out. The video might be too large or the server is slow. Please try again.";
    } else if (error.message.includes("404")) {
      errorMessage +=
        "Video URL not found or expired. Please re-analyze the video.";
    } else if (error.message.includes("403")) {
      errorMessage +=
        "Access denied. The video might be private or from a restricted source.";
    } else if (error.name === "AbortError") {
      errorMessage +=
        "Download took too long. Please try again with a faster connection.";
    } else {
      errorMessage += error.message || "Please try again later.";
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
