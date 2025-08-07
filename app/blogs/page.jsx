import BlogHero from "../components/blog/BlogHero";
import BlogList from "../components/bloglist/BlogList";

export default async function BlogHomePage() {
  // Fetch all blogs and their comments count in parallel
  const [blogsRes, countsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs`, {
      cache: "no-store",
    }),
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/comments-count`,
      { cache: "no-store" }
    ),
  ]);
  const blogs = await blogsRes.json();
  const countsArr = await countsRes.json();

  // Create a lookup for slug -> commentsCount, likesCount
  const counts = {};
  countsArr.forEach((c) => {
    counts[c.slug] = {
      commentsCount: c.commentsCount,
      likesCount: c.likesCount,
    };
  });

  // Merge counts into blogs - FIXED!
  const blogsWithCounts = blogs.map((blog) => ({
    ...blog,
    commentsCount: counts[blog.slug]?.commentsCount || 0,
    likesCount: counts[blog.slug]?.likesCount || 0,
  }));

  return (
    <main className="pt-24 px-4 sm:px-6 max-w-2xl mx-auto overflow-x-hidden">
      <BlogHero className="mb-8" />

      <BlogList blogs={blogsWithCounts} />
    </main>
  );
}
