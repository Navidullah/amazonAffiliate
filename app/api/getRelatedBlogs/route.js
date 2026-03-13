// /app/api/related-blogs/route.js
import { getRelatedBlogs } from "@/lib/actions/blog";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const currentSlug = url.searchParams.get("slug");

    if (!category || !currentSlug) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const blogs = await getRelatedBlogs(category, currentSlug);

    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching related blogs:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
