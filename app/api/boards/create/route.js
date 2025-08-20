// app/api/boards/create/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
const API = process.env.PINTEREST_API_BASE || "https://api.pinterest.com/v5";
const IS_SANDBOX = API.includes("api-sandbox");

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const token = IS_SANDBOX
    ? process.env.PINTEREST_ACCESS_TOKEN
    : session?.pinterestAccessToken || process.env.PINTEREST_ACCESS_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({ error: "No Pinterest token available." }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { name = "Sandbox Board", description = "" } = await req.json();
  const r = await fetch(`${API}/boards`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, privacy: "PUBLIC" }),
  });
  const data = await r.json();
  if (!r.ok)
    return new Response(JSON.stringify({ error: data }), { status: r.status });
  return new Response(JSON.stringify({ board: data }), {
    headers: { "Content-Type": "application/json" },
  });
}
