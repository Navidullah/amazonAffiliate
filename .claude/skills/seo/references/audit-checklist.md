# SEO audit checklist

Walk this before shipping a page, or to diagnose "why isn't this ranking?".
Check each box against the actual page.

## 1. Keyword & intent
- [ ] One clear **primary keyword**, present in `<title>`, `<h1>`, `description`,
      and the **first 100 words**.
- [ ] Page genuinely satisfies that query's intent (transactional/informational).
- [ ] 10–20 secondary long-tails in `keywords` + a visible "Related searches" block.
- [ ] No cannibalization — no other page targets the same primary keyword.

## 2. Metadata (Next.js Metadata API)
- [ ] `title` unique, 50–60 chars, keyword front-loaded.
- [ ] `description` unique, ≤160 chars, contains the keyword, reads as a benefit.
- [ ] `alternates.canonical` set to the self-referential clean URL.
- [ ] `openGraph` (type, url, title, description, 1200×630 image with alt) present.
- [ ] `twitter` card = `summary_large_image` with image.
- [ ] `robots: "index, follow"` (and the page is NOT accidentally `noindex`).
- [ ] hreflang (`alternates.languages`) only if real localized URLs exist.

## 3. Semantic content
- [ ] Exactly **one `<h1>`**, containing the keyword.
- [ ] Logical `<h2>`/`<h3>` outline; no skipped levels; headings describe sections.
- [ ] Sufficient depth (tool/landing ≥ 800 words; blog ≥ 1,000).
- [ ] Visible **breadcrumb** nav (Home › Section › Page).
- [ ] An **FAQ** section with real, useful answers.
- [ ] Content is original and helpful (not thin or auto-translated boilerplate).

## 4. Structured data (JSON-LD)
- [ ] Correct types for the page (WebApplication / FAQPage / HowTo / BreadcrumbList / Article).
- [ ] Combined under one `@graph`, injected via `dangerouslySetInnerHTML`.
- [ ] **FAQ schema strings exactly match the visible FAQ.**
- [ ] No fake `aggregateRating` / reviews that aren't shown.
- [ ] Passes https://search.google.com/test/rich-results with no errors.

## 5. Links & crawlability
- [ ] Page is reachable via a real `<a href>` (not orphaned, not JS-only nav).
- [ ] Internal links out to `/tools`, 2–3 sibling pages, and related blog/tool.
- [ ] Related blog posts link **into** this page.
- [ ] Descriptive anchor text (not "click here").
- [ ] Route will be picked up by `next-sitemap` (check `next-sitemap.config.cjs`).
- [ ] Not blocked in `public/robots.txt`.
- [ ] No broken internal links.

## 6. Performance / Core Web Vitals
- [ ] Hero image: `next/image` + `priority` + explicit dimensions.
- [ ] No raw `<img>` for meaningful images; all have `alt`.
- [ ] No layout shift (CLS) — media/embeds have reserved space.
- [ ] Only interactive widgets are `"use client"`; page shell is a Server Component.
- [ ] Heavy client libs are `next/dynamic`-loaded.
- [ ] Lighthouse mobile ≥ 90 performance; LCP < 2.5s, CLS < 0.1, INP < 200ms.

## 7. Technical hygiene
- [ ] URL is clean, lowercase, hyphenated, keyword-bearing (`/tools/pdf-to-word`).
- [ ] HTTPS, no mixed content.
- [ ] Mobile-friendly / responsive (Tailwind — verify at small breakpoints).
- [ ] `lang` attribute correct on `<html>` (per locale).
- [ ] No duplicate content across trailing-slash / query-string variants
      (canonical handles this).

## Post-launch (within a few weeks)
- [ ] Submit/verify in **Google Search Console**; request indexing for the URL.
- [ ] Confirm it's indexed: `site:shopyor.com/tools/your-tool`.
- [ ] Watch impressions/clicks/position in Search Console; iterate the title/
      description if CTR is low, or add content if position is stuck on page 2.
