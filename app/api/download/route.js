export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return new Response("Missing URL", { status: 400 });
    }

    // ✅ Redirect instead of fetching
    return Response.redirect(videoUrl);
  } catch (error) {
    return new Response("Download failed", { status: 500 });
  }
}
