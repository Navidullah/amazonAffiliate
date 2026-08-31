import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { ConnectToDB } from "@/lib/db";
import Book from "@/lib/models/Book";
import { getSessionUser } from "@/lib/classroom/access";
import { watermarkPdf, getPdfPageCount } from "@/lib/books/watermark";

// GET single book, admin only (edit form) — never returns fileBlobPath itself.
export async function GET(_request, { params }) {
  const { slug } = await params;
  const { session, isAdmin } = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdmin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  await ConnectToDB();
  const book = await Book.findOne({ slug }).lean();
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ book: JSON.parse(JSON.stringify(book)) });
}

// PUT update book (admin only). Accepts multipart/form-data so the PDF
// and/or cover image can optionally be replaced alongside metadata.
export async function PUT(request, { params }) {
  const { slug } = await params;
  const { session, isAdmin } = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdmin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  await ConnectToDB();
  const book = await Book.findOne({ slug }).select("+fileBlobPath");
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const title = formData.get("title");
  const author = formData.get("author");
  const description = formData.get("description");
  const category = formData.get("category");
  const tagsRaw = formData.get("tags");
  const source = formData.get("source");
  const attribution = formData.get("attribution");
  const active = formData.get("active");
  const file = formData.get("file");
  const coverImage = formData.get("coverImage");

  if (!title || !author || !description || !category || !source) {
    return NextResponse.json(
      { error: "title, author, description, category and source are required" },
      { status: 400 },
    );
  }
  if (!["public_domain", "original"].includes(source)) {
    return NextResponse.json({ error: "Invalid source" }, { status: 400 });
  }
  if (source === "public_domain" && !attribution) {
    return NextResponse.json(
      { error: "attribution is required for public domain books" },
      { status: 400 },
    );
  }

  book.title = title;
  book.author = author;
  book.description = description;
  book.category = category;
  book.source = source;
  book.attribution = attribution || undefined;
  book.tags = tagsRaw
    ? String(tagsRaw)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  if (active !== null) book.active = active === "true";

  if (file instanceof File) {
    const originalBuffer = Buffer.from(await file.arrayBuffer());
    const watermarkedBuffer = await watermarkPdf(originalBuffer);
    book.pageCount = await getPdfPageCount(originalBuffer);

    const pdfBlob = await put(`books/${slug}/book.pdf`, watermarkedBuffer, {
      access: "private",
      addRandomSuffix: true,
      contentType: "application/pdf",
    });
    await del(book.fileBlobPath).catch(() => {});
    book.fileBlobPath = pdfBlob.url;
  }

  if (coverImage instanceof File) {
    const coverBuffer = Buffer.from(await coverImage.arrayBuffer());
    const coverBlob = await put(`books/${slug}/cover-${coverImage.name}`, coverBuffer, {
      access: "public",
      addRandomSuffix: true,
    });
    if (book.coverImageUrl) await del(book.coverImageUrl).catch(() => {});
    book.coverImageUrl = coverBlob.url;
  }

  await book.save();

  return NextResponse.json({ book: { ...book.toObject(), fileBlobPath: undefined } });
}

// DELETE book (admin only) — removes the Mongo doc and its Blob objects.
export async function DELETE(_request, { params }) {
  const { slug } = await params;
  const { session, isAdmin } = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isAdmin) {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  await ConnectToDB();
  const book = await Book.findOne({ slug }).select("+fileBlobPath");
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  await del(book.fileBlobPath).catch(() => {});
  if (book.coverImageUrl) await del(book.coverImageUrl).catch(() => {});
  await book.deleteOne();

  return NextResponse.json({ message: "Book deleted" });
}
