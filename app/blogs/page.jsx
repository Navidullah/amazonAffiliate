// app/blogs/page.jsx
import Link from "next/link";
import BlogHero from "../components/blog/BlogHero";
import BlogList from "../components/bloglist/BlogList";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

// ---------- Per-page SEO (canonical changes with ?page) ----------
export async function generateMetadata({ searchParams }) {
  const page = Number(searchParams?.page || 1);
  return {
    title: page > 1 ? `Blogs – Page ${page}` : "Blogs",
    description:
      "Browse all health, fitness, and science blogs from Shopyor. Expert-backed tips, routines, and product breakdowns.",
    alternates: {
      canonical: page > 1 ? `/blogs?page=${page}` : "/blogs",
    },
    openGraph: {
      type: "website",
      url: page > 1 ? `${BASE_URL}/blogs?page=${page}` : `${BASE_URL}/blogs`,
      title: page > 1 ? `Blogs – Page ${page}` : "Blogs",
      description:
        "Browse all health, fitness, and science blogs from Shopyor.",
    },
    twitter: {
      card: "summary_large_image",
      title: page > 1 ? `Blogs – Page ${page}` : "Blogs",
      description:
        "Browse all health, fitness, and science blogs from Shopyor.",
    },
  };
}

export default async function BlogHomePage({ searchParams }) {
  const page = Number(searchParams?.page) > 0 ? Number(searchParams.page) : 1;
  const limit = 9; // change if you want 5/12/etc.

  // Fetch current page of blogs + global counts
  const [pagedRes, countsRes] = await Promise.all([
    fetch(`${BASE_URL}/api/blogs?page=${page}&limit=${limit}`, {
      cache: "no-store",
    }),
    fetch(`${BASE_URL}/api/blogs/comments-count`, { cache: "no-store" }),
  ]);

  const {
    items = [],
    total = 0,
    hasPrev = page > 1,
    hasNext = false,
  } = (await pagedRes.json()) || {};

  const countsArr = (await countsRes.json()) || [];

  // Create lookup for slug -> counts
  const counts = Object.fromEntries(
    countsArr.map((c) => [
      c.slug,
      { commentsCount: c.commentsCount, likesCount: c.likesCount },
    ])
  );

  // Merge counts into the paged items only
  const blogsWithCounts = items.map((blog) => ({
    ...blog,
    commentsCount: counts[blog.slug]?.commentsCount ?? 0,
    likesCount: counts[blog.slug]?.likesCount ?? 0,
  }));

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pageUrl =
    page > 1 ? `${BASE_URL}/blogs?page=${page}` : `${BASE_URL}/blogs`;

  // ---------- JSON-LD: CollectionPage + Breadcrumbs ----------
  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blogs",
    url: pageUrl,
    description: "Browse all health, fitness, and science blogs from Shopyor.",
    isPartOf: { "@type": "WebSite", name: "Shopyor", url: BASE_URL },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${BASE_URL}/blogs`,
      },
    ],
  };
  {
    /* JSON-LD: ItemList for current page */
  }
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: (items || []).map((post, i) => ({
          "@type": "ListItem",
          position: (page - 1) * limit + (i + 1),
          url: `${BASE_URL}/blogs/${post.slug}`,
          name: post.title,
        })),
      }),
    }}
  />;

  return (
    <main className="wrapper py-10 space-y-8">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: (items || []).map((post, i) => ({
              "@type": "ListItem",
              position: (page - 1) * limit + (i + 1),
              url: `${BASE_URL}/blogs/${post.slug}`,
              name: post.title,
            })),
          }),
        }}
      />

      {/* Hero / Heading */}
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">All Blogs</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {total} {total === 1 ? "post" : "posts"}
          </p>
        </div>
        <div className="text-xs text-gray-600 dark:text-white/60">
          Page <span className="font-semibold">{page}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </div>
      </header>

      {/* Optional intro hero for the blog index */}
      <BlogHero className="mb-4" />

      {/* List */}
      <section>
        <BlogList blogs={blogsWithCounts} />

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          {/* Prev */}
          {hasPrev ? (
            <Link
              href={`/blogs?page=${page - 1}`}
              prefetch
              rel="prev"
              className="rounded-lg border border-gray-200 dark:border-white/10 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-white/5"
            >
              ← Previous
            </Link>
          ) : (
            <span className="px-4 py-2 text-sm text-gray-400 dark:text-white/40 select-none">
              ← Previous
            </span>
          )}

          {/* Next */}
          {hasNext ? (
            <Link
              href={`/blogs?page=${page + 1}`}
              prefetch
              rel="next"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-400 active:scale-[0.99]"
            >
              Next →
            </Link>
          ) : (
            <span className="px-4 py-2 text-sm text-gray-400 dark:text-white/40 select-none">
              Next →
            </span>
          )}
        </div>
      </section>
    </main>
  );
}
