// app/api/pins/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  const API = "https://api.pinterest.com/v5";

  try {
    // 1) Read Pinterest token from the logged-in session
    const session = await getServerSession(authOptions);
    const accessToken =
      session?.pinterestAccessToken || process.env.PINTEREST_ACCESS_TOKEN; // optional fallback

    if (!accessToken) {
      return new Response(
        JSON.stringify({
          error:
            "Not authenticated with Pinterest. Please Connect Pinterest and try again.",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2) Read payload
    const { title, description, link, imageUrl, boardId } = await req.json();
    const targetBoardId = boardId || process.env.PINTEREST_BOARD_ID;

    if (!targetBoardId) {
      return new Response(
        JSON.stringify({
          error:
            "Missing board ID. Pass `boardId` in body or set PINTEREST_BOARD_ID in env.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "imageUrl is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3) Create Pin (image_url flow)
    const r = await fetch(`${API}/pins`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_id: targetBoardId,
        title,
        description,
        link, // optional
        media_source: { source_type: "image_url", url: imageUrl },
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      return new Response(JSON.stringify({ error: data }), {
        status: r.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, pin: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
