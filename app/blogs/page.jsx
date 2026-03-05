// app/blogs/page.jsx
import Link from "next/link";
import BlogList from "../components/bloglist/BlogList";

export async function generateMetadata({ searchParams }) {
  const page = Number(searchParams?.page || 1);
  const canonical = page > 1 ? `/blogs?page=${page}` : "/blogs";
  return {
    title: "Blogs",
    description:
      "Shopyor offers free online tools like background remover, image compressor, EXIF cleaner, BMI calculator & productivity tools. Fast, secure, no downloads.",
    alternates: { canonical },
  };
}

async function getBlogs(page, limit, q) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (q) params.set("q", q);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs?` + params.toString(),
    { cache: "no-store" },
  );

  if (!res.ok) {
    return { items: [], total: 0 };
  }
  return res.json();
}

export default async function BlogsPage({ searchParams }) {
  const page = Number(searchParams?.page) > 0 ? Number(searchParams.page) : 1;
  const limit = 9;
  const q = typeof searchParams?.search === "string" ? searchParams.search : "";

  const { items = [], total = 0 } = await getBlogs(page, limit, q);
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blogs | Shopyor",
    url:
      page > 1
        ? `https://www.shopyor.com/blogs?page=${page}`
        : "https://www.shopyor.com/blogs",
    description:
      "Shopyor offers free online tools like background remover, image compressor, EXIF cleaner, BMI calculator & productivity tools. Fast, secure, no downloads.",
    isPartOf: {
      "@type": "WebSite",
      name: "Shopyor",
      url: "https://www.shopyor.com",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1 + (page - 1) * limit,
        url: `https://www.shopyor.com/blogs/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      {/* JSON-LD (single, correctly placed) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-3 sm:px-4 pt-28 md:pt-32 lg:pt-32 ">
        <header className="py-6 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Latest Articles
          </h1>
          {q ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Showing results for: <span className="font-semibold">“{q}”</span>
            </p>
          ) : null}
        </header>

        <section>
          <BlogList blogs={items} />
        </section>

        {/* Pagination */}
        <nav
          className="mt-8 mb-10 flex items-center justify-between"
          aria-label="Pagination"
        >
          {/* Prev */}
          {canPrev ? (
            <Link
              href={`/blogs?page=${page - 1}${q ? `&search=${encodeURIComponent(q)}` : ""}`}
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
              href={`/blogs?page=${page + 1}${q ? `&search=${encodeURIComponent(q)}` : ""}`}
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
        </nav>
      </main>
    </>
  );
}
