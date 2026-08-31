import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { ConnectToDB } from "@/lib/db";
import Book from "@/lib/models/Book";
import { getSessionUser } from "@/lib/classroom/access";
import { watermarkPdf, getPdfPageCount } from "@/lib/books/watermark";

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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

export async function POST(request) {
  try {
    const { session, isAdmin } = await getSessionUser();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!isAdmin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const formData = await request.formData();
    const title = formData.get("title");
    const author = formData.get("author");
    const description = formData.get("description");
    const category = formData.get("category");
    const tagsRaw = formData.get("tags");
    const source = formData.get("source");
    const attribution = formData.get("attribution");
    const file = formData.get("file");
    const coverImage = formData.get("coverImage");

    if (!title || !author || !description || !category || !source || !(file instanceof File)) {
      return NextResponse.json(
        { error: "title, author, description, category, source and file are required" },
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

    await ConnectToDB();

    const baseSlug = slugify(title);
    let slug = baseSlug;
    let suffix = 1;
    while (await Book.exists({ slug })) {
      slug = `${baseSlug}-${++suffix}`;
    }

    const originalBuffer = Buffer.from(await file.arrayBuffer());
    let watermarkedBuffer, pageCount;
    try {
      watermarkedBuffer = await watermarkPdf(originalBuffer);
      pageCount = await getPdfPageCount(originalBuffer);
    } catch (e) {
      console.error("Book PDF watermarking failed:", e);
      return NextResponse.json(
        { error: "Couldn't process that PDF — it may be encrypted, corrupted, or password-protected." },
        { status: 400 },
      );
    }

    const pdfBlob = await put(`books/${slug}/book.pdf`, watermarkedBuffer, {
      access: "private",
      addRandomSuffix: true,
      contentType: "application/pdf",
    });

    let coverImageUrl;
    if (coverImage instanceof File) {
      const coverBuffer = Buffer.from(await coverImage.arrayBuffer());
      // The Blob store is private-only — cover art is served through
      // /api/books/[slug]/cover, not fetched directly by the browser.
      const coverBlob = await put(`books/${slug}/cover-${coverImage.name}`, coverBuffer, {
        access: "private",
        addRandomSuffix: true,
        contentType: coverImage.type || undefined,
      });
      coverImageUrl = coverBlob.url;
    }

    const tags = tagsRaw
      ? String(tagsRaw)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const book = await Book.create({
      slug,
      title,
      author,
      description,
      category,
      tags,
      source,
      attribution: attribution || undefined,
      coverImageUrl,
      hasCoverImage: Boolean(coverImageUrl),
      fileBlobPath: pdfBlob.url,
      pageCount,
    });

    return NextResponse.json({ book: { ...book.toObject(), fileBlobPath: undefined } }, { status: 201 });
  } catch (error) {
    console.error("Error uploading book:", error);
    return NextResponse.json({ error: error.message || "Failed to upload book" }, { status: 500 });
  }
}
