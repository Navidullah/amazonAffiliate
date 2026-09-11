// app/api/blog/exists/[slug]/route.js
// Lightweight existence check for a published blog slug — used by
// middleware.js to work around a Next.js 15.2+ bug (vercel/next.js#77235,
// closed "not planned") where notFound() from a page's generateMetadata
// returns HTTP 200 instead of 404 for any streamed/App-Router response.
//
// Deliberately NOT reusing /api/blog/[slug] here: that route checks admin
// session state and increments the view counter as a side effect, neither
// of which belongs in a cheap per-request existence check called from
// middleware on every /blog/:slug request.
import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

export async function GET(_request, context) {
  const { slug: rawSlug } = await context.params;
  const slug = decodeURIComponent(rawSlug);

  await ConnectToDB();
  const exists = await Blog.exists({ slug, isPublished: true });

  return exists
    ? new NextResponse(null, { status: 200 })
    : new NextResponse(null, { status: 404 });
}
