// /lib/actions/blog.js
import { ConnectToDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";

export const getRelatedBlogs = async (category, currentSlug) => {
  if (!category || !currentSlug) return [];

  await ConnectToDB();

  const blogs = await Blog.find({
    category,
    slug: { $ne: currentSlug },
  })
    .sort({ date: -1 })
    .limit(3);

  return blogs;
};
