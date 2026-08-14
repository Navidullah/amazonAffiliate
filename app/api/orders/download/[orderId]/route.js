import { NextResponse } from "next/server";
import { get } from "@vercel/blob";
import { ConnectToDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import DigitalProduct from "@/lib/models/DigitalProduct";

export const GET = async (_req, { params }) => {
  const { orderId } = await params;

  await ConnectToDB();
  const order = await Order.findOne({ orderId }).lean();
  if (!order || !order.paid) {
    return NextResponse.json({ error: "Order not paid" }, { status: 403 });
  }

  const product = await DigitalProduct.findOne({ slug: order.productSlug }).select(
    "+downloadUrl",
  );
  if (!product?.downloadUrl) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // downloadUrl points at a private Blob object — fetch it server-side with
  // get() and stream the bytes to the buyer. The raw blob URL is never sent
  // to the client, even after purchase.
  const result = await get(product.downloadUrl, { access: "private" });
  if (result?.statusCode !== 200 || !result.stream) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": result.blob.contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${product.slug}.zip"`,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, no-store",
    },
  });
};
