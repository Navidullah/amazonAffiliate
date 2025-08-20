// app/api/pins/bulk-upload/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Use Sandbox in Trial (change to https://api.pinterest.com/v5 when approved)
const API = process.env.PINTEREST_API_BASE || "https://api.pinterest.com/v5";
const IS_SANDBOX = API.includes("api-sandbox");

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];
const MAX_ITEMS = 40; // keep this reasonable (base64 inflates ~33%)
const CONCURRENCY = 3; // parallel workers
const MAX_ATTEMPTS = 4; // 429/5xx retries

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function createPinOnce(
  token,
  { boardId, title, description, link, file }
) {
  if (!boardId) return { ok: false, status: 400, error: "Missing boardId" };
  if (!(file instanceof Blob))
    return { ok: false, status: 400, error: "Missing file" };

  const mime = file.type || "image/jpeg";
  if (!ALLOWED.includes(mime)) {
    return { ok: false, status: 415, error: `Unsupported type: ${mime}` };
  }

  const buf = Buffer.from(new Uint8Array(await file.arrayBuffer()));
  const b64 = buf.toString("base64");

  const r = await fetch(`${API}/pins`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      board_id: boardId,
      title: title || "",
      description: description || "",
      link: link || undefined,
      media_source: {
        source_type: "image_base64",
        content_type: mime,
        data: b64,
      },
    }),
  });

  const data = await r.json().catch(() => ({}));
  if (r.ok) return { ok: true, status: r.status, id: data?.id, data };
  return { ok: false, status: r.status, error: data };
}

async function createPinWithRetry(token, item) {
  let attempt = 1;
  while (attempt <= MAX_ATTEMPTS) {
    const res = await createPinOnce(token, item);
    if (res.ok) return res;

    // retry only on 429/5xx
    if ((res.status === 429 || res.status >= 500) && attempt < MAX_ATTEMPTS) {
      const base = Number(res?.error?.retry_after) || 1000;
      const backoff = Math.min(base * Math.pow(2, attempt - 1), 10_000);
      await sleep(backoff);
      attempt += 1;
      continue;
    }
    return res;
  }
  return { ok: false, status: 500, error: "Max attempts exceeded" };
}

export async function POST(req) {
  try {
    // Prefer Sandbox token on Sandbox
    const session = await getServerSession(authOptions);
    const accessToken = IS_SANDBOX
      ? process.env.PINTEREST_ACCESS_TOKEN
      : session?.pinterestAccessToken || process.env.PINTEREST_ACCESS_TOKEN;

    if (!accessToken) {
      return new Response(
        JSON.stringify({ error: "No Pinterest token available." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Expect multipart/form-data with:
    // - items: JSON string of [{ fileKey, title, description, link, boardId? }, ...]
    // - one Blob per fileKey (e.g., file_0, file_1, ...)
    const form = await req.formData();
    const manifestStr = form.get("items");
    if (!manifestStr) {
      return new Response(
        JSON.stringify({ error: "Missing 'items' manifest" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let manifest = [];
    try {
      manifest = JSON.parse(manifestStr);
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in 'items'" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (!Array.isArray(manifest) || manifest.length === 0) {
      return new Response(
        JSON.stringify({ error: "items must be a non-empty array" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (manifest.length > MAX_ITEMS) {
      return new Response(
        JSON.stringify({ error: `Too many items (>${MAX_ITEMS})` }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Resolve files and defaults
    const defaultBoard = process.env.PINTEREST_BOARD_ID || null;
    const items = manifest.map((m, i) => {
      const file = form.get(m.fileKey || `file_${i}`);
      return {
        boardId: m.boardId || defaultBoard,
        title: m.title || "",
        description: m.description || "",
        link: m.link || undefined,
        file,
      };
    });

    // Run with limited concurrency
    const results = new Array(items.length);
    let idx = 0;
    async function worker() {
      while (idx < items.length) {
        const myIndex = idx++;
        results[myIndex] = await createPinWithRetry(
          accessToken,
          items[myIndex]
        );
      }
    }
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));

    const okCount = results.filter((r) => r.ok).length;
    return new Response(
      JSON.stringify({ ok: okCount, total: items.length, results }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
