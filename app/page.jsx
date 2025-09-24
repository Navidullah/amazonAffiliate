// app/page.jsx
import HomeBlogHero from "./components/bloghero/HomeBlogHero";
import BlogList from "./components/bloglist/BlogList";
import Link from "next/link";
import HomeHeroDesktop from "./components/home/HomeHeroDesktop";

/** Use only generateMetadata (no export const metadata in this file) */
export async function generateMetadata({ searchParams }) {
  const page = Number(searchParams?.page || 1);
  const canonical = page > 1 ? `/?page=${page}` : "/";

  const title = "Shopyor – Health, Fitness, Sports & Current Affairs Blogs";
  const description =
    "Readable, research-based articles on health, fitness, sports, politics, and current affairs—plus practical routines and gear breakdowns.";

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: "https://www.shopyor.com/",
      title,
      description,
      siteName: "Shopyor",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
  const { items = [], total = 0 } = await res.json();

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  // JSON-LD (pagination-aware)
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
        description: "Wellness, nutrition, healthy living.",
      },
      {
        "@type": "Thing",
        name: "Fitness",
        description: "Workouts, routines, staying active.",
      },
      {
        "@type": "Thing",
        name: "Sports",
        description: "News, insights, performance tips.",
      },
      {
        "@type": "Thing",
        name: "Politics",
        description: "Analysis and opinion pieces.",
      },
      {
        "@type": "Thing",
        name: "Current Affairs",
        description: "Global events and issues.",
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
          <BlogList blogs={items} />

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-between">
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

            <div className="text-xs text-gray-600 dark:text-white/60">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </div>

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
