import Link from "next/link";
import {
  Calendar,
  Clock,
  Eye,
  Download,
  Youtube,
  Music2,
  TrendingUp,
  BookOpen,
  Newspaper,
  Facebook,
} from "lucide-react";

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

export default function BlogCard({ blog }) {
  const { gradient, Icon } = styleFor(blog.category);

  return (
    <Link href={`/blog/${blog.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl">
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
          <h2 className="mb-2 line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
            {blog.title}
          </h2>

          <p className="mb-4 line-clamp-3 flex-1 text-muted-foreground">
            {blog.excerpt}
          </p>

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
              Read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
