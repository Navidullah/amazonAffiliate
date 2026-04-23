// app/api/tiktok-info/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return Response.json({ error: "URL is required" }, { status: 400 });
  }

  // Validate TikTok URL
  const tiktokRegex = /^(https?:\/\/)?(www\.)?(tiktok\.com|vm\.tiktok\.com)/i;
  if (!tiktokRegex.test(url)) {
    return Response.json({ error: "Invalid TikTok URL" }, { status: 400 });
  }

  try {
    const API_URL = process.env.TIKTOK_API_URL || "http://localhost:8000";

    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(
      `${API_URL}/video-info?url=${encodeURIComponent(url)}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Return fallback data instead of error
      return Response.json({
        title: "TikTok Video",
        thumbnail: "",
        videoUrl: "",
        duration: "N/A",
        likes: 0,
        comments: 0,
        views: 0,
        uploader: "",
        uploader_id: "",
        success: false,
        note: "Preview unavailable, but download still works",
      });
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Video info error:", error);

    // Return fallback data so frontend doesn't break
    return Response.json({
      title: "TikTok Video",
      thumbnail: "",
      videoUrl: "",
      duration: "N/A",
      likes: 0,
      comments: 0,
      views: 0,
      uploader: "",
      uploader_id: "",
      success: false,
      note: "Preview temporarily unavailable",
    });
  }
}
