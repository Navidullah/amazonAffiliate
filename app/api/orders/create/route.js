import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { ConnectToDB } from "@/lib/db";
import DigitalProduct from "@/lib/models/DigitalProduct";
import Order from "@/lib/models/Order";
import { createCheckout } from "@/lib/lemonsqueezy";

const SITE = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

export const POST = async (req) => {
  try {
    const { productSlug } = await req.json();
    if (!productSlug) {
      return NextResponse.json({ error: "Missing productSlug" }, { status: 400 });
    }

    await ConnectToDB();
    const product = await DigitalProduct.findOne({ slug: productSlug, active: true }).select(
      "+downloadUrl",
    );
    if (!product) {
      return NextResponse.json({ error: "Unknown product" }, { status: 404 });
    }

    const orderId = randomUUID();
    await Order.create({
      orderId,
      productSlug: product.slug,
      price: product.price,
      paid: false,
    });

    const checkoutUrl = await createCheckout({
      orderId,
      variantId: product.variantId,
      redirectUrl: `${SITE}/order/${orderId}`,
    });

    return NextResponse.json({ orderId, checkoutUrl });
  } catch (err) {
    console.error("Order create error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create order" },
      { status: 500 },
    );
  }
};
