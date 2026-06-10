# Performance & Core Web Vitals

Google ranks on page experience. The three Core Web Vitals (2026):

- **LCP** (Largest Contentful Paint) — main content visible. Target **< 2.5s**.
- **CLS** (Cumulative Layout Shift) — visual stability. Target **< 0.1**.
- **INP** (Interaction to Next Paint) — responsiveness. Target **< 200ms**.

This project already ships `@vercel/speed-insights` and `@vercel/analytics`
(see `app/layout.jsx`) — use the Speed Insights dashboard to see real field data.

## Images — the #1 LCP/CLS lever

- **Always `next/image`**, never raw `<img>` for content/hero images. It does
  responsive sizing, lazy-loading, and modern formats (AVIF/WebP) automatically.
- **Give every image explicit `width`/`height`** (or `fill` + a sized parent).
  Missing dimensions → layout shift → CLS penalty.
- **The hero/LCP image gets `priority`** so Next preloads it; everything below
  the fold stays lazy (the default).
- **Descriptive `alt`** on every meaningful image (accessibility + image search).
- Keep OG images at exactly **1200×630**.

```jsx
import Image from "next/image";

<Image
  src="/images/hero.png"
  alt="Free background remover removing a portrait's background"
  width={1200}
  height={630}
  priority           // only on the above-the-fold LCP image
/>
```

## Fonts — already handled, keep it that way

`app/layout.jsx` loads fonts via `next/font/google` with `display: "swap"`.
That self-hosts the font and avoids render-blocking + FOIT. **Don't** add
`<link>` font tags or new font CDNs — extend the existing `next/font` setup.

## JavaScript / hydration

- **Keep tool pages as Server Components where possible.** Only the interactive
  widget needs `"use client"` (this project already isolates client logic into
  `app/components/...` and imports it into a server page — follow that split).
- **Lazy-load heavy client-only libraries** (PDF, canvas, video) with
  `next/dynamic` + `{ ssr: false }` so they don't bloat the initial bundle:
  ```jsx
  const Editor = dynamic(() => import("@/app/components/HeavyEditor"), { ssr: false });
  ```
- Avoid shipping large dependencies to the client just for a small feature.
- Heavy work (image/PDF processing) belongs in a Web Worker or client-only
  effect, never blocking the main thread during initial paint.

## Rendering & caching

- Static/marketing/tool pages should be **statically rendered** (the default for
  pages with no dynamic data). Don't add `export const dynamic = "force-dynamic"`
  unless the page truly needs per-request data — it kills caching and TTFB.
- Blog posts are DB-backed; prefer `revalidate` (ISR) over fully dynamic so they
  cache at the edge.

## Quick wins checklist

- [ ] Hero image uses `next/image` + `priority` + correct dimensions.
- [ ] No raw `<img>` for meaningful images; all have `alt`.
- [ ] No layout shift: media and ad/embed slots have reserved space.
- [ ] Only interactive parts are `"use client"`; the page shell is a Server Component.
- [ ] Heavy libs are `next/dynamic`-loaded.
- [ ] No render-blocking third-party scripts in `<head>`; use `next/script` with
      `strategy="afterInteractive"` or `"lazyOnload"`.
- [ ] Run Lighthouse (mobile) and check the Speed Insights dashboard after deploy.
