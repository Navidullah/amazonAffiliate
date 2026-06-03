// app/blog/page.jsx  (Server Component)
import Link from "next/link";
import {
  Calendar,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Download,
  Youtube,
  Music2,
  TrendingUp,
  BookOpen,
  Newspaper,
  Facebook,
  FileX,
} from "lucide-react";
import { getBlogs } from "@/lib/actions/blog";
import BlogFilters from "./BlogFilters";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const metadata = {
  title: "Shopyor Blog — Video Downloading Tips, Tutorials & Guides",
  description:
    "Tips, tutorials, and guides for downloading videos from Facebook, Instagram, TikTok and YouTube — plus SEO and creator advice from the Shopyor blog.",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/blog`,
    siteName: "Shopyor",
    title: "Shopyor Blog — Video Downloading Tips, Tutorials & Guides",
    description:
      "Tips, tutorials, and guides for downloading videos from social media — plus SEO and creator advice.",
  },
};

const categories = [
  "All",
  "Video Downloading",
  "Facebook Tips",
  "YouTube Tips",
  "TikTok Tips",
  "SEO",
  "Tutorials",
  "General",
];

/* Visual identity per category (no cover images in the model) */
const CATEGORY_STYLE = {
  "Video Downloading": { gradient: "from-blue-600 to-purple-600", Icon: Download },
  "Facebook Tips": { gradient: "from-blue-600 to-blue-400", Icon: Facebook },
  "YouTube Tips": { gradient: "from-red-600 to-orange-500", Icon: Youtube },
  "TikTok Tips": { gradient: "from-gray-900 to-gray-600", Icon: Music2 },
  SEO: { gradient: "from-violet-500 to-indigo-600", Icon: TrendingUp },
  Tutorials: { gradient: "from-emerald-500 to-teal-600", Icon: BookOpen },
  General: { gradient: "from-cyan-500 to-blue-600", Icon: Newspaper },
};

const styleFor = (category) =>
  CATEGORY_STYLE[category] || {
    gradient: "from-cyan-500 to-blue-600",
    Icon: Newspaper,
  };

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/** Build a /blog href preserving category & search while changing the page. */
const pageHref = ({ page, category, search }) => {
  const params = new URLSearchParams();
  if (category && category !== "All") params.set("category", category);
  if (search) params.set("search", search);
  if (page && page > 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : "/blog";
};

export default async function BlogPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const currentPage = Math.max(1, parseInt(sp.page, 10) || 1);
  const category = sp.category || "All";
  const search = sp.search || "";

  const { blogs, totalPages } = await getBlogs({
    page: currentPage,
    limit: 9,
    category,
    search,
  });

  /* Page-specific structured data so search engines snippet the blog itself
     instead of falling back to site-wide footer boilerplate. */
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Shopyor Blog",
    description: metadata.description,
    url: `${BASE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Shopyor",
      url: BASE_URL,
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      url: `${BASE_URL}/blog/${blog.slug}`,
      datePublished: blog.publishedAt,
      author: { "@type": "Person", name: blog.author || "Shopyor" },
      articleSection: blog.category,
    })),
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {/* Decorative gradient blobs (CSS-only) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Shopyor Blog
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            Tips, Tutorials &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Guides
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Tips, tutorials, and step-by-step guides for downloading videos from
            Facebook, Instagram, TikTok and YouTube — plus SEO advice and creator
            tips from the Shopyor blog. New how-tos added regularly.
          </p>
        </div>

        {/* Search + Categories (client island, updates the URL) */}
        <BlogFilters
          categories={categories}
          currentCategory={category}
          currentSearch={search}
        />

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/40 py-16 text-center">
            <FileX className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-semibold">No blog posts found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
            {(category !== "All" || search) && (
              <Link
                href="/blog"
                className="mt-5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Reset filters
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => {
                const { gradient, Icon } = styleFor(blog.category);
                return (
                  <Link
                    key={blog._id}
                    href={`/blog/${blog.slug}`}
                    className="group block h-full"
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl">
                      {/* Gradient banner */}
                      <div
                        className={`relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br ${gradient}`}
                      >
                        <Icon className="h-12 w-12 text-white/90 transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-xl" />
                        <span className="absolute bottom-3 left-4 rounded-full bg-black/25 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                          {blog.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        {/* Title */}
                        <h2 className="mb-2 line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
                          {blog.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="mb-4 line-clamp-3 flex-1 text-muted-foreground">
                          {blog.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(blog.publishedAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {blog.readingTime} min read
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {blog.views} views
                          </span>
                        </div>

                        {/* Footer: author + read more */}
                        <div className="mt-4 flex items-center justify-between border-t pt-4">
                          <div className="flex items-center gap-2">
                            <span
                              className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-[11px] font-bold text-white`}
                            >
                              {(blog.author || "A").charAt(0).toUpperCase()}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground">
                              {blog.author || "Admin"}
                            </span>
                          </div>
                          <span className="flex items-center gap-1 text-xs font-semibold text-primary transition-all group-hover:gap-2">
                            Read <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>

            {/* Pagination (link-based, works without JS) */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {currentPage > 1 ? (
                  <Link
                    href={pageHref({ page: currentPage - 1, category, search })}
                    aria-label="Previous page"
                    className="rounded-lg border p-2 transition-colors hover:bg-muted"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Link>
                ) : (
                  <span className="cursor-not-allowed rounded-lg border p-2 opacity-50">
                    <ChevronLeft className="h-5 w-5" />
                  </span>
                )}

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Link
                        key={page}
                        href={pageHref({ page, category, search })}
                        className={`min-w-9 rounded-lg px-3 py-1 text-center text-sm font-medium transition-all ${
                          currentPage === page
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md"
                            : "hover:bg-muted"
                        }`}
                      >
                        {page}
                      </Link>
                    ),
                  )}
                </div>

                {currentPage < totalPages ? (
                  <Link
                    href={pageHref({ page: currentPage + 1, category, search })}
                    aria-label="Next page"
                    className="rounded-lg border p-2 transition-colors hover:bg-muted"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <span className="cursor-not-allowed rounded-lg border p-2 opacity-50">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
