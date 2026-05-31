// /lib/actions/blog.js
import { cache } from "react";
import { ConnectToDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

/** Normalize a Mongoose lean doc (ObjectId/Date) into a plain JSON object. */
const normalize = (doc) => JSON.parse(JSON.stringify(doc));

/**
 * Fetch a paginated list of published blogs (server-side).
 * Mirrors the GET /api/blog query logic.
 */
export const getBlogs = async ({
  page = 1,
  limit = 9,
  category,
  search,
} = {}) => {
  await ConnectToDB();

  const skip = (page - 1) * limit;
  const query = { isPublished: true };

  if (category && category !== "All" && category !== "all") {
    query.category = category;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];
  }

  const [blogs, total] = await Promise.all([
    Blog.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit).lean(),
    Blog.countDocuments(query),
  ]);

  return {
    blogs: normalize(blogs),
    currentPage: page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    total,
  };
};

/**
 * Fetch a single published blog by slug (server-side) and increment its view
 * count. Returns null if not found.
 */
// Wrapped in React cache() so generateMetadata + the page share a single
// query and a single view increment per request.
export const getBlogBySlug = cache(async (slug) => {
  if (!slug) return null;

  await ConnectToDB();
  const decoded = decodeURIComponent(slug);

  const blog = await Blog.findOne({ slug: decoded, isPublished: true }).lean();
  if (!blog) return null;

  // Fire-and-forget view increment (don't block rendering on it).
  Blog.updateOne({ _id: blog._id }, { $inc: { views: 1 } }).catch(() => {});

  return normalize(blog);
});

/** Related published blogs in the same category (excludes the current slug). */
export const getRelatedBlogs = async (category, currentSlug) => {
  if (!category || !currentSlug) return [];

  await ConnectToDB();

  const blogs = await Blog.find({
    category,
    slug: { $ne: currentSlug },
    isPublished: true,
  })
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  return normalize(blogs);
};
