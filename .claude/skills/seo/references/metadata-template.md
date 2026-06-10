# Metadata templates (Next.js 15 App Router)

This project uses the **Metadata API** (`export const metadata` / `generateMetadata`),
never manual `<head>` tags. Site-wide defaults live in `app/layout.jsx`
(`metadataBase`, title `template: "%s | Shopyor"`, default OG, etc.). A page only
needs to override what's page-specific.

## Static page — `export const metadata`

Use for tool pages and fixed landing pages. Copy this shape:

```jsx
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/your-tool`;

export const metadata = {
  // `absolute` opts out of the "%s | Shopyor" template when you want full control.
  title: {
    absolute: "Primary Long-Tail Keyword — Free Online | Shopyor",
  },
  // <= 160 chars, contains the primary keyword, reads like a benefit not a list.
  description:
    "One sentence that contains the keyword and tells the user exactly what they get. No signup.",
  keywords: [
    "primary long tail keyword",
    "variant two",
    "variant three",
    // 10-20 related long-tails
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "tools", // or "health", "marketing", etc.
  alternates: {
    canonical: PAGE_URL, // ALWAYS set — prevents duplicate-content dilution.
    // Only add `languages` when localized URLs actually exist (see below).
  },
  openGraph: {
    type: "website", // "article" for blog-like pages
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_US",
    title: "Shareable title (can differ from <title>)",
    description: "Compelling 1-2 sentence social description.",
    images: [
      {
        url: `${BASE_URL}/images/your-tool-og.png`, // 1200x630 PNG/JPG
        width: 1200,
        height: 630,
        alt: "Descriptive alt for the OG image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Twitter title | Shopyor",
    description: "Short Twitter description.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/your-tool-og.png`],
  },
};
```

### Field rules
- **`title`**: 50–60 chars ideal; front-load the keyword. Use `title.absolute`
  for tools (full control) or a plain string to inherit the `| Shopyor` template.
- **`description`**: 140–160 chars, keyword in the first half, active voice.
- **`canonical`**: every page. Self-referential is correct for the canonical
  version. Use it to collapse query-string / trailing-slash duplicates.
- **`keywords`**: low ranking weight today, but harmless and used by the on-page
  "Related searches" block — keep them aligned.

## Dynamic route — `generateMetadata` (e.g. `app/blog/[slug]/page.jsx`)

Use for any `[slug]`/`[id]` route so each item gets unique metadata:

```jsx
export async function generateMetadata({ params }) {
  const { slug } = await params; // params is async in Next 15
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };

  const url = `https://www.shopyor.com/blog/${slug}`;
  return {
    title: { absolute: `${post.title} | Shopyor` },
    description: post.excerpt?.slice(0, 160),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}
```

## hreflang / localization (only when localized URLs exist)

If you build a Traditional-Chinese (Taiwan/HK) or other localized version,
declare the relationship so Google serves the right page per region. Each
localized URL must list **all** alternates including itself and `x-default`:

```jsx
alternates: {
  canonical: PAGE_URL,
  languages: {
    "x-default": `${BASE_URL}/tools/your-tool`,
    "en": `${BASE_URL}/tools/your-tool`,
    "zh-TW": `${BASE_URL}/zh-tw/tools/your-tool`,
    "zh-HK": `${BASE_URL}/zh-tw/tools/your-tool`,
  },
},
```

Rules:
- Only point hreflang at pages that **actually exist and are localized** — never
  at machine-translated stubs (Google demotes them).
- The localized page's `openGraph.locale` should change too (e.g. `zh_TW`).
- The existing BMI page lists many `en-XX` variants all pointing at the same URL;
  that's a way to claim English regions but adds little. Reserve real hreflang
  for genuinely different-language pages.

## viewport / themeColor

These are set globally in `app/layout.jsx` (`export const viewport`). Don't
redefine per page unless the page truly needs a different theme color.
