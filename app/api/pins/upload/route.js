// app/api/pins/upload/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  const API = "https://api.pinterest.com/v5";

  try {
    // 0) Read Pinterest token from session (fallback to env if you kept one)
    const session = await getServerSession(authOptions);
    const accessToken =
      session?.pinterestAccessToken || process.env.PINTEREST_ACCESS_TOKEN;

    if (!accessToken) {
      return new Response(
        JSON.stringify({
          error:
            "Not authenticated with Pinterest. Connect Pinterest and try again.",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1) Read form-data
    const form = await req.formData();
    const file = form.get("file"); // Blob (from <input type="file" />)
    const title = form.get("title") || "";
    const description = form.get("description") || "";
    const link = form.get("link") || undefined;
    const boardId = form.get("boardId") || process.env.PINTEREST_BOARD_ID;

    if (!boardId) {
      return new Response(
        JSON.stringify({
          error:
            "Missing board ID. Include 'boardId' in form-data or set PINTEREST_BOARD_ID in env.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!(file instanceof Blob)) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Optional: basic size/type guard (Pinterest supports common image MIME types)
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (file.type && !validTypes.includes(file.type)) {
      return new Response(
        JSON.stringify({ error: `Unsupported type: ${file.type}` }),
        { status: 415, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2) Register media upload
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

    // 3) PUT bytes to the pre-signed upload_url (usually S3)
    const buf = await file.arrayBuffer();
    const put = await fetch(regJson.upload_url, {
      method: "PUT",
      headers: { "Content-Type": "application/octet-stream" },
      body: buf,
    });
    if (!put.ok) {
      return new Response(
        JSON.stringify({ error: "Upload to storage failed" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4) Create the Pin using media_id
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
