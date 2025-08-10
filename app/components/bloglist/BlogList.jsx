import Link from "next/link";
import { MessageCircle, Heart, Eye } from "lucide-react";

import AnimatedBlogImage from "./AnimatedBlogImage";
import Image from "next/image";

export default function BlogList({ blogs }) {
  //console.log("blogs in BlogList:", blogs);
  if (!blogs?.length) return <div>No blogs yet.</div>;
  console.log(
    blogs.map((b) => ({
      title: b.title,
      slug: b.slug,
      commentsCount: b.commentsCount,
      likesCount: b.likesCount,
    }))
  );

  return (
    <div className="space-y-8 w-full">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="flex flex-col md:flex-row items-start justify-between border-b pb-8 gap-6 group"
        >
          {/* Left: Text/Meta */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-600 text-white">
                {blog.category}
              </span>
              <span className="text-xs text-gray-400 ml-2">
                by
                <span className="ml-1 font-medium text-black dark:text-white">
                  {blog.author}
                </span>
              </span>
              {blog.authorImage && (
                <Image
                  src={blog.authorImage}
                  alt={blog.author}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full object-cover ml-2 border"
                />
              )}
            </div>
            <Link
              href={`/blogs/${blog.slug}`}
              className="block group-hover:underline"
            >
              <h2 className="text-lg sm:text-xl md:text-xl font-semibold mb-1 break-words max-w-full leading-snug whitespace-normal">
                {blog.title}
              </h2>
            </Link>
            <p
              className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-3"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
            <div className="flex items-center gap-6 text-xs text-gray-400 mt-2">
              <span>
                {blog.date
                  ? new Date(blog.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : ""}
              </span>
              {/* seen */}
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> {blog.views || 0}
              </span>
              {/* Likes */}
              <span className="flex items-center gap-1">
                <span className="font-semibold">{blog.likesCount ?? 0}</span>
                <Heart className="w-4 h-4" />
              </span>
              {/* Comments */}
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span className="font-semibold">{blog.commentsCount ?? 0}</span>
              </span>
            </div>
          </div>

          {/* Right: Image */}
          {/* Right: Animated Image */}
          <div className="w-full md:w-[200px] flex-shrink-0 overflow-hidden">
            <AnimatedBlogImage
              href={`/blogs/${blog.slug}`}
              src={blog.image}
              alt={blog.title}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
