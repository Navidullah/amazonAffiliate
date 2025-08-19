import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
  const API = "https://api.pinterest.com/v5";

  try {
    // 0) Auth
    const session = await getServerSession(authOptions);
    const accessToken =
      session?.pinterestAccessToken || process.env.PINTEREST_ACCESS_TOKEN;

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "Not authenticated with Pinterest." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 1) Read form fields
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

    // 2) Validate type, convert to base64
    const mime = file.type || "image/jpeg";
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(mime)) {
      return new Response(
        JSON.stringify({ error: `Unsupported type: ${mime}` }),
        {
          status: 415,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const buf = Buffer.from(new Uint8Array(await file.arrayBuffer()));
    const b64 = buf.toString("base64");

    // 3) Create the Pin with image_base64
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
        media_source: {
          source_type: "image_base64",
          content_type: mime, // e.g., "image/jpeg"
          data: b64, // base64 of the image file (no data URI prefix)
        },
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
