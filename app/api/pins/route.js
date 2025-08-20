// app/api/pins/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Use env base (set to https://api-sandbox.pinterest.com/v5 while on Trial)
const API = process.env.PINTEREST_API_BASE || "https://api.pinterest.com/v5";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const accessToken =
      session?.pinterestAccessToken || process.env.PINTEREST_ACCESS_TOKEN;

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "Not authenticated with Pinterest." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { title, description, link, imageUrl, boardId } = await req.json();
    const targetBoardId = boardId || process.env.PINTEREST_BOARD_ID;

    if (!targetBoardId) {
      return new Response(JSON.stringify({ error: "Missing board ID." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!imageUrl) {
      return new Response(JSON.stringify({ error: "imageUrl is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

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
        link,
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
