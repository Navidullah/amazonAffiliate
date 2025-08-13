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
  const { items = [], total = 0, hasNext = false } = await res.json();

  return (
    <main className="wrapper py-10 space-y-10">
      {/* Hero */}
      <HomeBlogHero postsCount={total} />

      {/* Latest */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">Latest Blogs</h2>
        <BlogList blogs={items} />

        {/* Next-only pagination */}
        <div className="mt-8 flex justify-end">
          {hasNext && (
            <Link
              href={`/?page=${page + 1}`}
              prefetch
              rel="next"
              className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black hover:bg-cyan-400 active:scale-[0.99]"
            >
              Next →
            </Link>
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
