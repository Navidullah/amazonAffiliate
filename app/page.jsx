// app/page.jsx
import HomeBlogHero from "./components/bloghero/HomeBlogHero";
import BlogList from "./components/bloglist/BlogList";
import Link from "next/link";

export default async function HomePage({ searchParams }) {
  const page = Number(searchParams?.page) > 0 ? Number(searchParams.page) : 1;
  const limit = 5;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs?page=${page}&limit=${limit}`,
    { cache: "no-store" }
  );

  // API returns: { items, total, page, limit, hasPrev, hasNext }
  const {
    items = [],
    total = 0,
    hasPrev = false,
    hasNext = false,
  } = await res.json();

  return (
    <main className="wrapper py-10 space-y-10">
      <HomeBlogHero postsCount={total} />

      <section>
        <h2 className="text-2xl font-bold mb-6">Latest Blogs</h2>
        <BlogList blogs={items} /> {/* <-- pass the array only */}
        <div className="mt-8 flex items-center justify-between">
          {hasPrev ? (
            <Link
              href={`/?page=${page - 1}`}
              rel="prev"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
            >
              ← Previous
            </Link>
          ) : (
            <span className="px-4 py-2 text-sm text-white/40 select-none">
              ← Previous
            </span>
          )}

          <div className="text-xs text-white/60">
            Page <span className="font-semibold">{page}</span> of{" "}
            <span className="font-semibold">
              {Math.max(1, Math.ceil(total / limit))}
            </span>
          </div>

          {hasNext ? (
            <Link
              href={`/?page=${page + 1}`}
              rel="next"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-400"
            >
              Next →
            </Link>
          ) : (
            <span className="px-4 py-2 text-sm text-white/40 select-none">
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
