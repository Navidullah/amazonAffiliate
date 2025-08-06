import BlogList from "../components/bloglist/BlogList";
import { motion } from "framer-motion";

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
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
      <motion.section
        variants={gradientVariants}
        animate="animate"
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
        }}
        className="w-full py-16 flex flex-col items-center text-center min-h-[38vh] md:min-h-[48vh] relative overflow-hidden bg-white/30 dark:bg-zinc-900/30 border border-white/40 dark:border-zinc-800/40 backdrop-blur-md shadow-lg px-4"
        initial={false}
      >
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold mb-4
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
        >
          Health & Fitness Blogs – Tips, Reviews & Workout Guides
        </motion.h1>

        {/* SEO-Friendly Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-8"
        >
          Welcome to <strong>Shopyor’s Health & Fitness Blog</strong> – your
          go-to source for <strong>fitness equipment reviews</strong>,{" "}
          <strong>workout routines</strong>, and <strong>nutrition tips</strong>
          . We cover everything from <strong>adjustable dumbbells</strong> and{" "}
          <strong>resistance bands</strong> to{" "}
          <strong>whey protein supplements</strong> and{" "}
          <strong>home gym essentials</strong>. Discover expert advice,
          actionable tips, and{" "}
          <strong>Amazon affiliate product recommendations</strong> to help you
          stay fit, healthy, and well-equipped.
        </motion.p>
      </motion.section>
      <BlogList blogs={blogsWithCounts} />
    </main>
  );
}
