// app/api/books/exists/[slug]/route.js
// Lightweight existence check for an active book slug — used by
// middleware.js to work around a Next.js 15.2+ bug (vercel/next.js#77235,
// closed "not planned") where notFound() from a page's generateMetadata
// returns HTTP 200 instead of 404 for any streamed/App-Router response.
//
// Mirrors app/api/blog/exists/[slug]/route.js. Deliberately NOT reusing
// /api/books/[slug]: that route increments the view counter as a side
// effect, which doesn't belong in a cheap per-request existence check
// called from middleware on every /books/:slug request.
import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import Book from "@/lib/models/Book";

export async function GET(_request, context) {
  const { slug: rawSlug } = await context.params;
  const slug = decodeURIComponent(rawSlug);

  await ConnectToDB();
  const exists = await Book.exists({ slug, active: true });

  return exists
    ? new NextResponse(null, { status: 200 })
    : new NextResponse(null, { status: 404 });
}
