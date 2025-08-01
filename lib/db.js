import mongoose from "mongoose";

// BLOGS connection (default, uses DATABASE_URL)
const BLOG_URI = process.env.DATABASE_URL;
if (!BLOG_URI) {
  throw new Error("Please define the DATABASE_URL environment variable");
}
let cachedBlog = global.mongooseBlog;
if (!cachedBlog) {
  cachedBlog = global.mongooseBlog = { conn: null, promise: null };
}
export async function ConnectToDB() {
  if (cachedBlog.conn) return cachedBlog.conn;
  if (!cachedBlog.promise) {
    cachedBlog.promise = mongoose.connect(BLOG_URI, {
      bufferCommands: false,
    });
  }
  cachedBlog.conn = await cachedBlog.promise;
  return cachedBlog.conn;
}

// PRODUCTS connection (uses MONGO_URI)
const PRODUCT_URI = process.env.MONGO_URI;
if (!PRODUCT_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}
let cachedProduct = global.mongooseProduct;
if (!cachedProduct) {
  cachedProduct = global.mongooseProduct = { conn: null, promise: null };
}
export async function ConnectToProductDB() {
  if (cachedProduct.conn) return cachedProduct.conn;
  if (!cachedProduct.promise) {
    cachedProduct.promise = mongoose
      .createConnection(PRODUCT_URI, {
        bufferCommands: false,
      })
      .asPromise();
  }
  cachedProduct.conn = await cachedProduct.promise;
  return cachedProduct.conn;
}
