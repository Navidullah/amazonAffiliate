import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  const API = "https://api.pinterest.com/v5";

  try {
    const session = await getServerSession(authOptions);
    const accessToken =
      session?.pinterestAccessToken || process.env.PINTEREST_ACCESS_TOKEN;

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "Not authenticated with Pinterest." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const form = await req.formData();
    const file = form.get("file");
    const title = form.get("title") || "";
    const description = form.get("description") || "";
    const link = form.get("link") || undefined;
    const boardId = form.get("boardId") || process.env.PINTEREST_BOARD_ID;

    if (!boardId) {
      return new Response(JSON.stringify({ error: "Missing board ID." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!(file instanceof Blob)) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // (optional) basic type check
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (file.type && !validTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: `Unsupported type: ${file.type}` }),
        {
          status: 415,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 1) Register media
    const reg = await fetch(`${API}/media`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ media_type: "IMAGE" }),
    });
    const regJson = await reg.json();
    if (!reg.ok) {
      return new Response(JSON.stringify({ error: regJson }), {
        status: reg.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2) Upload bytes
    const buf = await file.arrayBuffer();
    const put = await fetch(regJson.upload_url, {
      method: "PUT",
      headers: { "Content-Type": "application/octet-stream" },
      body: buf,
    });
    if (!put.ok) {
      return new Response(
        JSON.stringify({ error: "Upload to storage failed" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 3) Create pin
    const pinRes = await fetch(`${API}/pins`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_id: boardId,
        title,
        description,
        link,
        media_source: { source_type: "media_id", media_id: regJson.media_id },
      }),
    });
    const pin = await pinRes.json();
    if (!pinRes.ok) {
      return new Response(JSON.stringify({ error: pin }), {
        status: pinRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, pin }), {
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
