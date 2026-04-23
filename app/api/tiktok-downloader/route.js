// app/api/download/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const quality = searchParams.get("quality") || "best";

  // Validate URL
  if (!url) {
    return Response.json({ error: "TikTok URL is required" }, { status: 400 });
  }

  // Validate TikTok URL format
  const tiktokRegex =
    /^(https?:\/\/)?(www\.)?(tiktok\.com|vm\.tiktok\.com|tiktok\.com\/@)/i;
  if (!tiktokRegex.test(url)) {
    return Response.json({ error: "Invalid TikTok URL" }, { status: 400 });
  }

  try {
    // Your Python API URL (update this after deploying to Render)
    const API_URL = process.env.TIKTOK_API_URL || "http://localhost:8000";

    // Call your Python FastAPI backend
    const response = await fetch(
      `${API_URL}/download?url=${encodeURIComponent(url)}&format=${quality}`,
      {
        method: "GET",
        headers: {
          Accept: "video/mp4,*/*",
        },
      },
    );

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP ${response.status}: Download failed`,
      );
    }

    // Get the video data
    const videoBuffer = await response.arrayBuffer();

    // Extract filename from Content-Disposition header or create one
    let filename = "tiktok-video.mp4";
    const contentDisposition = response.headers.get("content-disposition");
    if (contentDisposition) {
      const match = contentDisposition.match(
        /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
      );
      if (match && match[1]) {
        filename = match[1].replace(/['"]/g, "");
      }
    }

    // Return the video file
    return new Response(videoBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": videoBuffer.byteLength.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Download error:", error);

    // Return appropriate error response
    return Response.json(
      {
        error:
          error.message ||
          "Failed to download video. Please check the URL and try again.",
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
