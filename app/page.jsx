// app/page.jsx
import HomeBlogHero from "./components/bloghero/HomeBlogHero";
import BlogList from "./components/bloglist/BlogList";
import Link from "next/link";

// ✅ Per-page SEO (canonical changes with ?page)
export async function generateMetadata({ searchParams }) {
  const page = Number(searchParams?.page || 1);
  // With metadataBase in layout, this becomes absolute automatically
  return {
    alternates: {
      canonical: page > 1 ? `/?page=${page}` : "/",
    },
  };
}

export default async function HomePage({ searchParams }) {
  const page = Number(searchParams?.page) > 0 ? Number(searchParams.page) : 1;
  const limit = 5;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );

  // API shape: { items, total, page, limit, hasPrev, hasNext }
  const {
    items = [],
    total = 0,
    hasPrev = page > 1,
    hasNext = false,
  } = await res.json();

  const totalPages = Math.max(1, Math.ceil(total / limit));

  // ✅ WebPage JSON-LD for the home (pagination-aware)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url:
      page > 1
        ? `https://www.shopyor.com/?page=${page}`
        : "https://www.shopyor.com/",
    name: "Shopyor – Health, Fitness & Physics Blogs",
    description:
      "Readable, research-based articles on health, fitness, and physics.",
    isPartOf: {
      "@type": "WebSite",
      name: "Shopyor",
      url: "https://www.shopyor.com",
    },
  };

  return (
    <main className="wrapper py-10 space-y-10">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero (H1 lives inside) */}
      <HomeBlogHero postsCount={total} />

      {/* Latest */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Latest Blogs</h2>
        <BlogList blogs={items} />

        {/* Pagination UI */}
        <div className="mt-8 flex items-center justify-between">
          {/* Prev */}
          {hasPrev ? (
            <Link
              href={`/?page=${page - 1}`}
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

          {/* Page x of y */}
          <div className="text-xs text-gray-600 dark:text-white/60">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </div>

          {/* Next */}
          {hasNext ? (
            <Link
              href={`/?page=${page + 1}`}
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

// app/page.jsx
/*
import HomeHero from "./components/home/HomeHero";

import TopPicksWithFilter from "./components/home/TopPicksWithFilter";

// Fetch top picks (replace with real data from your API or database)
async function getTopProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const products = await res.json();
  return products;
}

export default async function HomePage() {
  const topPicks = await getTopProducts();
  console.log(topPicks);

  return (
    <div>
      <HomeHero />

      <TopPicksWithFilter products={topPicks} />
    </div>
  );
}
*/
