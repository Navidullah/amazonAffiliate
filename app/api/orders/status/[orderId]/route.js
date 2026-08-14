import { NextResponse } from "next/server";
import { ConnectToDB } from "@/lib/db";
import Order from "@/lib/models/Order";

export const GET = async (_req, { params }) => {
  const { orderId } = await params;

  await ConnectToDB();
  const order = await Order.findOne({ orderId }).lean();
  if (!order) {
    return NextResponse.json({ error: "Unknown order" }, { status: 404 });
  }

  return NextResponse.json({ paid: !!order.paid });
};
