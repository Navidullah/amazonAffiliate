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

export async function POST(request) {
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
  const watermarkedBuffer = await watermarkPdf(originalBuffer);
  const pageCount = await getPdfPageCount(originalBuffer);

  const pdfBlob = await put(`books/${slug}/book.pdf`, watermarkedBuffer, {
    access: "private",
    addRandomSuffix: true,
    contentType: "application/pdf",
  });

  let coverImageUrl;
  if (coverImage instanceof File) {
    const coverBuffer = Buffer.from(await coverImage.arrayBuffer());
    const coverBlob = await put(`books/${slug}/cover-${coverImage.name}`, coverBuffer, {
      access: "public",
      addRandomSuffix: true,
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
    fileBlobPath: pdfBlob.url,
    pageCount,
  });

  return NextResponse.json({ book: { ...book.toObject(), fileBlobPath: undefined } }, { status: 201 });
}
