import { NextResponse } from "next/server";

// Streams a YouTube thumbnail back to the browser with a Content-Disposition
// attachment header so the "Download" button saves a real file instead of
// just opening the image (cross-origin <a download> is ignored by browsers).
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const quality = searchParams.get("quality") || "maxresdefault";

    if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) {
      return NextResponse.json({ error: "Invalid video ID" }, { status: 400 });
    }

    const allowed = [
      "maxresdefault",
      "sddefault",
      "hqdefault",
      "mqdefault",
      "default",
    ];
    const q = allowed.includes(quality) ? quality : "maxresdefault";

    const upstream = await fetch(`https://img.youtube.com/vi/${id}/${q}.jpg`, {
      cache: "no-store",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "Thumbnail not available" },
        { status: 404 },
      );
    }

    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Disposition": `attachment; filename="youtube-thumbnail-${id}-${q}.jpg"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch thumbnail" },
      { status: 500 },
    );
  }
}
