import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ConnectToDB } from "@/lib/db";
import Order from "@/lib/models/OrderModel";

export const runtime = "nodejs";

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ConnectToDB();
    const { status } = await request.json();

    const updated = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    ).lean();

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (err) {
    return NextResponse.json(
      { error: err.message || "Failed to update order" },
      { status: 500 }
    );
  }
}
