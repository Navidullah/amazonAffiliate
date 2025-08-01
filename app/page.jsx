/*import BlogList from "./components/bloglist/BlogList";

export default async function HomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs`,
    { cache: "no-store" }
  );
  const blogs = await res.json();

  return (
    <main className="wrapper py-10">
      <h1 className="text-2xl font-bold mb-6">Latest Blogs</h1>
      <BlogList blogs={blogs} />
    </main>
  );
}
*/
// app/page.jsx

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
