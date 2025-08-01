import { NextResponse } from "next/server";
import Order from "@/lib/models/OrderModel";
import { ConnectToDB } from "@/lib/db";

export async function PATCH(request, { params }) {
  await ConnectToDB();
  const { status } = await request.json();
  await Order.findByIdAndUpdate(params.id, { status });
  return NextResponse.json({ success: true });
}
