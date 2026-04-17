// lib/db.js - Simplified version (single database for everything)
import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL; // Use your DATABASE_URL

if (!MONGODB_URI) {
  throw new Error("Please define the DATABASE_URL environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function ConnectToDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        dbName: "app", // Your database name
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ Connected to MongoDB");
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
