import Link from "next/link";
import { Search, FileX, Wrench, ArrowRight } from "lucide-react";
import { searchEverything } from "@/lib/actions/search";
import BlogCard from "@/components/blog/BlogCard";
import ProductCard from "@/app/components/store/ProductCard";
import BookCard from "@/app/components/store/BookCard";

export const dynamic = "force-dynamic";

function ToolCard({ tool }) {
  return (
    <Link
      href={tool.href}
      className="group flex h-full flex-col justify-between rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-[0_24px_64px_-30px_rgba(56,89,255,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
    >
      <div>
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
          <Wrench className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {tool.title}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {tool.desc}
        </p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-gray-700 group-hover:text-primary dark:text-gray-300">
        Open tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function Section({ title, count, children }) {
  if (!count) return null;
  return (
    <section className="mb-14">
      <h2 className="mb-5 flex items-center gap-2 text-xl font-bold tracking-tight">
        {title}
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {count}
        </span>
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

export default async function SearchPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const q = sp.q || "";

  const results = q
    ? await searchEverything(q)
    : { blogs: [], products: [], books: [], tools: [], total: 0 };

  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
              <Search className="h-4 w-4" />
              Search
            </span>
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            {q ? (
              <>
                Results for &ldquo;<span className="text-primary">{q}</span>&rdquo;
              </>
            ) : (
              "Search Shopyor"
            )}
          </h1>
          {!q && (
            <p className="mx-auto max-w-xl text-muted-foreground">
              Search worksheets, books, blog posts, and tools all at once.
            </p>
          )}
          {q && results.total > 0 && (
            <p className="text-sm text-muted-foreground">
              {results.total} result{results.total === 1 ? "" : "s"} found
            </p>
          )}
        </div>

        {q && results.total === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/40 py-16 text-center">
            <FileX className="mb-4 h-10 w-10 text-muted-foreground" />
            <p className="text-lg font-semibold">Nothing found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different keyword, or browse the store instead.
            </p>
            <Link
              href="/"
              className="mt-5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
            >
              Go to store
            </Link>
          </div>
        )}

        <Section title="Worksheets & products" count={results.products.length}>
          {results.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Section>

        <Section title="Books" count={results.books.length}>
          {results.books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </Section>

        <Section title="Blog posts" count={results.blogs.length}>
          {results.blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </Section>

        <Section title="Tools" count={results.tools.length}>
          {results.tools.map((tool) => (
            <ToolCard key={tool.href} tool={tool} />
          ))}
        </Section>
      </div>
    </main>
  );
}
