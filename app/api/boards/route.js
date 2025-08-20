import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const API = process.env.PINTEREST_API_BASE || "https://api.pinterest.com/v5";
const IS_SANDBOX = API.includes("api-sandbox");

export async function GET() {
  const session = await getServerSession(authOptions);

  // If calling Sandbox, use the sandbox env token; else use session token (prod)
  const token = IS_SANDBOX
    ? process.env.PINTEREST_ACCESS_TOKEN
    : session?.pinterestAccessToken || process.env.PINTEREST_ACCESS_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({
        error: IS_SANDBOX
          ? "Missing Sandbox token. Set PINTEREST_ACCESS_TOKEN in env."
          : "Not authenticated with Pinterest.",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const r = await fetch(`${API}/boards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await r.json();
  if (!r.ok) {
    return new Response(JSON.stringify({ error: data }), {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const boards = (data.items || []).map((b) => ({
    id: b.id,
    name: b.name,
    description: b.description || "",
    privacy: b.privacy || "PUBLIC",
  }));

  return new Response(JSON.stringify({ boards }), {
    headers: { "Content-Type": "application/json" },
  });
}
