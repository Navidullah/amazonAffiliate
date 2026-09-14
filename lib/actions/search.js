import { ConnectToDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import Book from "@/lib/models/Book";
import DigitalProduct from "@/lib/models/DigitalProduct";
import { TOOLS } from "@/lib/constants/tools";

const normalize = (doc) => JSON.parse(JSON.stringify(doc));

const PER_TYPE_LIMIT = 8;

/**
 * Site-wide search across blogs, worksheet/product listings, books, and the
 * static tools directory. Each type is queried independently so one slow or
 * empty collection never blocks the others.
 */
export const searchEverything = async (query) => {
  const q = query?.trim();
  if (!q) {
    return { blogs: [], products: [], books: [], tools: [], total: 0 };
  }

  await ConnectToDB();

  const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  const [blogs, products, books] = await Promise.all([
    Blog.find({
      isPublished: true,
      $or: [
        { title: regex },
        { content: regex },
        { tags: { $in: [regex] } },
      ],
    })
      .sort({ publishedAt: -1 })
      .limit(PER_TYPE_LIMIT)
      .lean(),

    DigitalProduct.find({
      active: true,
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { subject: regex },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(PER_TYPE_LIMIT)
      .lean(),

    Book.find({
      active: true,
      $or: [
        { title: regex },
        { author: regex },
        { tags: { $in: [regex] } },
      ],
    })
      .sort({ views: -1 })
      .limit(PER_TYPE_LIMIT)
      .lean(),
  ]);

  const tools = TOOLS.filter(
    (tool) => regex.test(tool.title) || regex.test(tool.desc),
  ).slice(0, PER_TYPE_LIMIT);

  const result = {
    blogs: normalize(blogs),
    products: normalize(products),
    books: normalize(books),
    tools,
  };

  return {
    ...result,
    total:
      result.blogs.length +
      result.products.length +
      result.books.length +
      result.tools.length,
  };
};
