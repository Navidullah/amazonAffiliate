import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { ConnectToDB } from "@/lib/db";
import Book from "@/lib/models/Book";

export async function GET(_request, { params }) {
  const { slug } = await params;

  await ConnectToDB();
  const book = await Book.findOne({ slug, active: true }).select("+fileBlobPath");
  if (!book?.fileBlobPath) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  // fileBlobPath points at a private Blob object — fetch it server-side and
  // stream the bytes back inline. The raw blob URL is never sent to the
  // client, keeping the reader page as the only way to view the PDF.
  const result = await get(book.fileBlobPath, { access: "private" });
  if (result?.statusCode !== 200 || !result.stream) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  Book.updateOne({ _id: book._id }, { $inc: { views: 1 } }).catch(() => {});

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${book.slug}.pdf"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
}
