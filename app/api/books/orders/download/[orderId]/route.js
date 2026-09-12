import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { ConnectToDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Book from "@/lib/models/Book";

export const GET = async (_req, { params }) => {
  const { orderId } = await params;

  await ConnectToDB();
  const order = await Order.findOne({ orderId }).lean();
  if (!order || !order.paid || order.productType !== "book") {
    return NextResponse.json({ error: "Order not paid" }, { status: 403 });
  }

  const book = await Book.findOne({ slug: order.productSlug }).select("+fileBlobPath");
  if (!book?.fileBlobPath) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const result = await get(book.fileBlobPath, { access: "private" });
  if (result?.statusCode !== 200 || !result.stream) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${book.slug}.pdf"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
};
