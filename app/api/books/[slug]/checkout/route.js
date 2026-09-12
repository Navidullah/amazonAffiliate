import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { ConnectToDB } from "@/lib/db";
import Book from "@/lib/models/Book";
import Order from "@/lib/models/Order";
import { createCheckout } from "@/lib/lemonsqueezy";

const SITE = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

// Starts a paid checkout for downloading a book's PDF. Reading online stays
// free (see BookReader) — this is only hit from the Download button.
export async function POST(_request, { params }) {
  try {
    const { slug } = await params;

    await ConnectToDB();
    const book = await Book.findOne({ slug, active: true }).select("+variantId");
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    if (!book.price || !book.variantId) {
      return NextResponse.json({ error: "This book isn't available for download" }, { status: 400 });
    }

    const orderId = randomUUID();
    await Order.create({
      orderId,
      productSlug: book.slug,
      productType: "book",
      price: book.price,
      paid: false,
    });

    const checkoutUrl = await createCheckout({
      orderId,
      variantId: book.variantId,
      redirectUrl: `${SITE}/order/${orderId}`,
    });

    return NextResponse.json({ orderId, checkoutUrl });
  } catch (err) {
    console.error("Book checkout error:", err);
    return NextResponse.json({ error: err.message || "Failed to start checkout" }, { status: 500 });
  }
}
