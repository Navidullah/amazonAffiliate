// /lib/actions/books.js
import { ConnectToDB } from "@/lib/db";
import Book from "@/lib/models/Book";

const normalize = (doc) => JSON.parse(JSON.stringify(doc));

/** Fetch all active books for the /books catalog. */
export const getActiveBooks = async () => {
  await ConnectToDB();
  const books = await Book.find({ active: true }).sort({ createdAt: -1 }).lean();
  return normalize(books);
};

/** Fetch a single active book by slug (never includes fileBlobPath). */
export const getBookBySlug = async (slug) => {
  await ConnectToDB();
  const book = await Book.findOne({ slug, active: true }).lean();
  return book ? normalize(book) : null;
};
