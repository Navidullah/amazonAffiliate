// app/api/boards/route.js
// Lists the current user's boards (id + name)
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Use env base (Sandbox while on Trial). Fallback to production host.
const API = process.env.PINTEREST_API_BASE || "https://api.pinterest.com/v5";

export async function GET() {
  const session = await getServerSession(authOptions);
  const token =
    session?.pinterestAccessToken || process.env.PINTEREST_ACCESS_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Not authenticated with Pinterest" }),
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
