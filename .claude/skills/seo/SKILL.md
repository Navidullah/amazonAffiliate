---
name: seo
description: >-
  Use when creating, optimizing, or auditing any page/route for search engine
  ranking — new tool pages, blog posts, landing pages, or fixing weak SEO.
  Covers keyword targeting, Next.js Metadata API (title/description/canonical/
  hreflang/OpenGraph/Twitter), JSON-LD structured data, semantic HTML headings,
  internal linking, Core Web Vitals/performance, sitemap & robots, and a final
  audit checklist. Tailored to this Next.js 15 App Router + Tailwind project
  (ShopYor). Trigger on: "SEO", "rank on Google", "meta tags", "structured
  data", "optimize this page", "why isn't this ranking", "add a blog post".
---

# SEO for ShopYor pages

This project already has a strong, consistent SEO pattern. **Match it — don't
reinvent it.** The reference implementation is `app/tools/bmi/page.jsx`: read it
when you need a concrete example. This skill makes every new page reach that bar.

## The mental model

A page ranks when it credibly answers a real search query *and* Google can parse
it effortlessly. That breaks into six layers — do them in order:

1. **Keyword intent** — what exact phrase is the user typing, and what do they
   want? Everything else serves this.
2. **On-page metadata** — title, description, canonical, hreflang, OG/Twitter.
3. **Semantic content** — one `<h1>`, logical `<h2>/<h3>`, the keyword in the
   first 100 words, real depth, an FAQ.
4. **Structured data** — JSON-LD so Google can show rich results.
5. **Internal linking & crawlability** — links in/out, breadcrumbs, sitemap, robots.
6. **Performance / Core Web Vitals** — fast LCP, no layout shift, mobile-first.

## Workflow for a NEW page

Follow these steps. Use the reference files (below) for copy-paste templates.

1. **Pick the target keyword + variants.** One primary long-tail phrase
   (e.g. "bmi calculator kg and cm"), plus 10–20 related long-tails for the
   metadata `keywords` array and an on-page "Related searches" block. Prefer
   **low-competition long-tail** over broad head terms — that's this site's
   whole strategy. See `references/keyword-research.md`.
2. **Write the `export const metadata` block.** Copy the shape from
   `references/metadata-template.md`. Mandatory fields: `title.absolute`,
   `description` (≤160 chars, contains the keyword), `alternates.canonical`,
   `openGraph`, `twitter`. Add `alternates.languages` hreflang only when you
   genuinely have localized URLs.
3. **Build the structured data.** Pick the schema types that fit the page
   (`WebApplication` for a tool, `FAQPage`, `HowTo`, `BreadcrumbList`,
   `Article` for blogs). Combine them under one `@graph`. Inject with
   `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html:
   JSON.stringify(data) }} />`. See `references/structured-data.md`.
4. **Write semantic content.** Exactly one `<h1>` matching the keyword. A
   breadcrumb nav. Real, useful body copy (aim 800+ words for a tool/landing
   page). An FAQ where **the plain-text answers are the same strings** used in
   the `FAQPage` JSON-LD — keep UI and schema in sync (see how `faq[]` feeds
   both in `bmi/page.jsx`).
5. **Add internal links.** Link to `/tools`, 2–3 sibling tools, and any related
   blog post. Link the blog post back to the tool. Orphan pages don't rank.
6. **Register it for crawling.** Confirm the route is reachable from a link and
   that `next-sitemap.config.cjs` will include it (it auto-crawls the build).
   Don't hand-edit `public/sitemap.xml` — it's generated.
7. **Run the audit.** Walk `references/audit-checklist.md` before declaring done.

## Workflow for AUDITING an existing page ("why isn't this ranking?")

Go straight to `references/audit-checklist.md` and check each item against the
page. The usual culprits, in order of frequency:

- Missing/duplicate `<h1>`, or `<h1>` doesn't contain the target keyword.
- `title`/`description` not unique per page, or description >160 chars / truncated.
- No `alternates.canonical` → duplicate-content dilution.
- Thin content (<300 words) or keyword absent from the first paragraph.
- No structured data, or invalid JSON-LD (validate at search.google.com/test/rich-results).
- Page is an orphan (nothing links to it) or blocked in `public/robots.txt`.
- Slow LCP from an unoptimized hero image (use `next/image`, not `<img>`).

## Workflow for a NEW BLOG POST

Blogs in this project are published to MongoDB via a one-off Node script (the
template is `publish-blog.js` at the repo root). To add one:

1. Copy `publish-blog.js`, change `SLUG`, `TITLE`, `EXCERPT`, `CATEGORY`,
   `TAGS`, and `CONTENT` (HTML string).
2. Keep the embedded `FAQ_SCHEMA` and `BREADCRUMB_SCHEMA` JSON-LD blocks —
   update them to match the new post. The `BlogPosting` schema is added by the
   page component (`app/blog/[slug]/page.jsx`), so don't duplicate it.
3. Content rules: keyword in `<h1>` and first paragraph, a Table of Contents
   with anchor links, `<h2>` sections, internal links to the relevant tool
   pages (this is the point of the blog — funnel readers to tools), one FAQ
   block whose answers mirror `FAQ_SCHEMA`.
4. Run `node publish-blog.js` (it's idempotent — upserts by slug).

## Hard rules (do not violate)

- **One `<h1>` per page.** Ever.
- **Every indexable page needs a unique `title`, `description`, and
  `canonical`.** No exceptions.
- **`description` ≤ 160 characters** and must contain the primary keyword.
- **Never `noindex` a page you want to rank**; never leave a real page only
  reachable via JS with no crawlable `<a href>`.
- **JSON-LD must be valid and reflect what's actually on the page** — fake
  `aggregateRating`/FAQ that isn't visible is a manual-action risk. The visible
  FAQ and the `FAQPage` schema must match.
- **Images via `next/image`** with explicit `width`/`height` or `fill` + a
  sized container, and a descriptive `alt`. Prevents CLS and helps image SEO.
- **Don't hand-edit `public/sitemap*.xml` or `public/robots.txt` logic** that
  `next-sitemap` owns; change `next-sitemap.config.cjs` instead.

## Reference files

- `references/metadata-template.md` — copy-paste `metadata` block + dynamic
  `generateMetadata` for `[slug]` routes, hreflang for localization.
- `references/structured-data.md` — ready JSON-LD for WebApplication, FAQPage,
  HowTo, BreadcrumbList, Article, Organization, plus the injection snippet.
- `references/keyword-research.md` — how to choose low-competition long-tails,
  intent mapping, and the on-page "Related searches" block.
- `references/performance.md` — Core Web Vitals: images, fonts, code-splitting,
  what hurts LCP/CLS/INP in this Next.js setup.
- `references/audit-checklist.md` — the full pre-ship / "why isn't it ranking"
  checklist.
