// app/page.jsx
import HomeBlogHero from "./components/bloghero/HomeBlogHero";
import BlogList from "./components/bloglist/BlogList";
import Link from "next/link";
import HomeHeroDesktop from "./components/home/HomeHeroDesktop";

// ✅ Per-page SEO (canonical changes with ?page)
export async function generateMetadata({ searchParams }) {
  const page = Number(searchParams?.page || 1);
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

  // API shape (we’ll compute prev/next locally to be safe)
  const { items = [], total = 0 } = await res.json();

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  // ✅ WebPage JSON-LD (pagination-aware)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url:
      page > 1
        ? `https://www.shopyor.com/?page=${page}`
        : "https://www.shopyor.com/",
    name: "Shopyor – Health, Sports, Politics & Current Affairs Blogs",
    description:
      "Readable, research-based articles on health, fitness, sports, politics, and current affairs.",
    isPartOf: {
      "@type": "WebSite",
      name: "Shopyor",
      url: "https://www.shopyor.com",
    },
    about: [
      {
        "@type": "Thing",
        name: "Health",
        description: "Blogs on wellness, nutrition, and healthy living.",
      },
      {
        "@type": "Thing",
        name: "Fitness",
        description:
          "Guides on workouts, exercise routines, and staying active.",
      },
      {
        "@type": "Thing",
        name: "Sports",
        description: "Sports news, insights, and performance tips.",
      },
      {
        "@type": "Thing",
        name: "Politics",
        description: "Political analysis, insights, and opinion pieces.",
      },
      {
        "@type": "Thing",
        name: "Current Affairs",
        description: "Coverage of global events, issues, and breaking news.",
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Heroes */}
      <div className="lg:hidden">
        <HomeBlogHero postsCount={total} />
      </div>
      <div className="hidden lg:block -mt-6">
        <HomeHeroDesktop />
      </div>

      <main className="mx-auto max-w-6xl px-3 sm:px-4">
        <section className="py-6 sm:py-8">
          {/* Blog list */}
          <BlogList blogs={items} />

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
            {/* Prev */}
            {canPrev ? (
              <Link
                href={`/?page=${page - 1}`}
                prefetch
                rel="prev"
                className="rounded-lg bg-muted px-4 py-2 text-sm hover:bg-muted/80 active:scale-[0.99]"
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
            {canNext ? (
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
    </>
  );
}
