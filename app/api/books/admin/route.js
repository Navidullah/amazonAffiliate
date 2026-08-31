import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import Book from "@/lib/models/Book";
import { getSessionUser } from "@/lib/classroom/access";

// Admin listing (includes inactive books) for the /admin/books manager.
export async function GET() {
  try {
    const { session, isAdmin } = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    await ConnectToDB();
    const books = await Book.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ books: JSON.parse(JSON.stringify(books)) });
  } catch (error) {
    console.error("Error listing books:", error);
    return NextResponse.json({ error: error.message || "Failed to list books" }, { status: 500 });
  }
}
