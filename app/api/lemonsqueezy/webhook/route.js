import { NextResponse } from "next/server";
import crypto from "crypto";
import { ConnectToDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export const POST = async (req) => {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("LEMONSQUEEZY_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") || "";

  const digest = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const valid =
    signature.length === digest.length &&
    crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload?.meta?.event_name;
  const orderId = payload?.meta?.custom_data?.order_id;

  if (eventName === "order_created" && orderId) {
    await ConnectToDB();
    await Order.updateOne(
      { orderId },
      {
        $set: {
          paid: true,
          lemonsqueezyOrderId: String(payload?.data?.id || ""),
        },
      },
    );
  }

  return NextResponse.json({ received: true });
};
