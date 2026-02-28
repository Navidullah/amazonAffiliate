import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { videoId } = await req.json();

    if (!videoId) {
      return NextResponse.json({ error: "Video ID required" }, { status: 400 });
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`,
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const snippet = data.items[0].snippet;

    return NextResponse.json({
      title: snippet.title,
      channel: snippet.channelTitle,
      tags: snippet.tags || [],
      description: snippet.description,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
