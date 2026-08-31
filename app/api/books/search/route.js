import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import Book from "@/lib/models/Book";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json([]);
  }

  await ConnectToDB();
  const books = await Book.find(
    { active: true, $text: { $search: q } },
    { score: { $meta: "textScore" } },
  )
    .sort({ score: { $meta: "textScore" } })
    .lean();

  return NextResponse.json(JSON.parse(JSON.stringify(books)));
}
