export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return new Response("Missing URL", { status: 400 });
    }

    const response = await fetch(videoUrl);
    const buffer = await response.arrayBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": "attachment; filename=facebook-video.mp4",
      },
    });
  } catch (error) {
    return new Response("Download failed", { status: 500 });
  }
}
