import { NextResponse } from "next/server";
import crypto from "crypto";
import { ConnectToDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import MathSolverUsage from "@/lib/models/MathSolverUsage";

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
  const customData = payload?.meta?.custom_data || {};
  const orderId = customData.order_id;

  if (eventName === "order_created" && customData.type === "math_solver_daypass") {
    if (customData.key && customData.date) {
      await ConnectToDB();
      await MathSolverUsage.updateOne(
        { ip: customData.key, date: customData.date },
        { $set: { paid: true } },
        { upsert: true },
      );
    }
  } else if (eventName === "order_created" && orderId) {
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
