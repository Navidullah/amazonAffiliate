import { NextResponse } from "next/server";

// Works around a Next.js 15.2+ bug (vercel/next.js#77235, closed "not
// planned") where calling notFound() from a blog post's generateMetadata
// (or even the page body, with or without force-dynamic) still returns
// HTTP 200 instead of 404 — App Router's RSC streaming commits the 200
// status before the async notFound() check resolves, and the framework
// team doesn't consider it fixable at the page level.
//
// Fix: intercept /blog/:slug in middleware, which runs before any page
// rendering/streaming, and check existence via a cheap dedicated route
// (app/api/blog/exists/[slug]/route.js). Middleware's own Response status
// isn't subject to the streaming quirk, so this is the one place in the
// app where a real 404 can actually be set for this route.
export async function middleware(request) {
  const { pathname, origin } = request.nextUrl;
  const match = pathname.match(/^\/blog\/([^/]+)$/);
  if (!match) return NextResponse.next();

  const slug = match[1];

  let exists = true; // fail open: if the check itself fails, render normally
  try {
    const res = await fetch(`${origin}/api/blog/exists/${encodeURIComponent(slug)}`);
    exists = res.status !== 404;
  } catch {
    // network/DB hiccup — don't 404 a real post over a transient error
  }

  if (exists) return NextResponse.next();

  return new NextResponse(NOT_FOUND_HTML, {
    status: 404,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export const config = {
  matcher: "/blog/:slug",
};

const NOT_FOUND_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>Article not found | Shopyor Blog</title>
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:#0a0a0a; color:#f5f5f5; }
  .card { text-align:center; padding:2rem; max-width:32rem; }
  h1 { font-size:1.75rem; font-weight:800; margin:0 0 0.75rem; }
  p { color:#a3a3a3; line-height:1.6; margin:0 0 1.5rem; }
  a { display:inline-flex; align-items:center; gap:0.5rem; background:#10b981; color:#052e2b;
    font-weight:600; padding:0.75rem 1.5rem; border-radius:9999px; text-decoration:none; }
</style>
</head>
<body>
  <div class="card">
    <h1>Article not found</h1>
    <p>The blog post you're looking for doesn't exist or may have been moved.</p>
    <a href="/blog">Browse all articles</a>
  </div>
</body>
</html>`;
