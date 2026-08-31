import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { ConnectToDB } from "@/lib/db";
import Book from "@/lib/models/Book";

// Public cover art proxy — the Blob store is private-only, so book covers
// (unlike book PDFs, meant to be freely visible) are fetched server-side and
// re-served here instead of linking the browser straight at the blob URL.
export async function GET(_request, { params }) {
  try {
    const { slug } = await params;

    await ConnectToDB();
    const book = await Book.findOne({ slug }).select("+coverImageUrl");
    if (!book?.coverImageUrl) {
      return NextResponse.json({ error: "No cover image" }, { status: 404 });
    }

    const result = await get(book.coverImageUrl, { access: "private" });
    if (result?.statusCode !== 200 || !result.stream) {
      return NextResponse.json({ error: "Cover image not found" }, { status: 404 });
    }

    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    console.error("Error streaming book cover:", error);
    return NextResponse.json({ error: "Failed to load cover" }, { status: 500 });
  }
}
