# Structured data (JSON-LD)

Google reads JSON-LD to show rich results (FAQ accordions, How-to steps, star
ratings, breadcrumbs, article cards). This project injects it **inline in the
page component**, combining multiple types under one `@graph`.

## Injection snippet (the project's pattern)

```jsx
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [ /* one or more objects, see below */ ],
};

// ...inside the component's returned JSX, near the top:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

> The blog post page (`app/blog/[slug]/page.jsx`) already emits a `BlogPosting`
> object — don't duplicate it there. The `publish-blog.js` script embeds
> `FAQPage` + `BreadcrumbList` inside the post body HTML.

## Golden rule

**Schema must describe what's actually on the page.** A `FAQPage` whose
questions aren't visible, or an `aggregateRating` with no real reviews, risks a
Google manual action. Keep the visible FAQ array and the JSON-LD built from the
*same source strings* (see `faq[]` driving both in `bmi/page.jsx`).

Validate every page at https://search.google.com/test/rich-results before shipping.

---

## WebApplication — for any interactive tool

```jsonc
{
  "@type": "WebApplication",
  "name": "Tool Name",
  "url": "https://www.shopyor.com/tools/your-tool",
  "applicationCategory": "UtilitiesApplication", // or HealthApplication, MultimediaApplication
  "operatingSystem": "Web",
  "browserRequirements": "Requires JavaScript",
  "inLanguage": "en",
  "description": "What the tool does, with the keyword.",
  "featureList": ["Feature one", "Feature two", "Runs in your browser", "Free, no signup"],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "865" }
  // Only include aggregateRating if you genuinely surface ratings/reviews.
}
```

## FAQPage — for any page with a Q&A section

```jsonc
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "The exact question as shown on the page",
      "acceptedAnswer": { "@type": "Answer", "text": "The exact plain-text answer shown on the page." }
    }
  ]
}
```
Build `mainEntity` by mapping over the same `faq` array the UI renders:
```jsx
mainEntity: faq.map((f) => ({
  "@type": "Question",
  name: f.q,
  acceptedAnswer: { "@type": "Answer", text: f.a },
})),
```

## HowTo — for step-by-step tools/guides

```jsonc
{
  "@type": "HowTo",
  "name": "How to do the thing",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "Step 1 title", "text": "Step 1 detail." },
    { "@type": "HowToStep", "position": 2, "name": "Step 2 title", "text": "Step 2 detail." }
  ]
}
```

## BreadcrumbList — pair with the visible breadcrumb nav

```jsonc
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shopyor.com" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.shopyor.com/tools" },
    { "@type": "ListItem", "position": 3, "name": "Your Tool", "item": "https://www.shopyor.com/tools/your-tool" }
  ]
}
```

## Article / BlogPosting — for blog content

```jsonc
{
  "@type": "BlogPosting",
  "headline": "Post title (<= 110 chars)",
  "description": "Excerpt.",
  "image": "https://www.shopyor.com/images/post-cover.png",
  "datePublished": "2026-06-10T00:00:00Z",
  "dateModified": "2026-06-10T00:00:00Z",
  "author": { "@type": "Person", "name": "Author Name" },
  "publisher": {
    "@type": "Organization",
    "name": "Shopyor",
    "logo": { "@type": "ImageObject", "url": "https://www.shopyor.com/images/logo.png" }
  },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.shopyor.com/blog/your-slug" }
}
```

## Organization / WebSite — site-wide (belongs in `app/layout.jsx`)

Emit once globally, not per page. `WebSite` with `potentialAction` enables the
sitelinks search box:

```jsonc
{
  "@type": "WebSite",
  "name": "Shopyor",
  "url": "https://www.shopyor.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.shopyor.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

## Which types to use per page

| Page type        | Combine these in `@graph`                          |
|------------------|----------------------------------------------------|
| Interactive tool | `WebApplication` + `HowTo` + `FAQPage` + `BreadcrumbList` |
| Calculator       | `WebApplication` + `FAQPage` + `BreadcrumbList`     |
| Blog post        | `BlogPosting` + `FAQPage` + `BreadcrumbList`        |
| Landing/info     | `WebPage` + `FAQPage` + `BreadcrumbList`            |
| Homepage/layout  | `Organization` + `WebSite` (global, once)          |
