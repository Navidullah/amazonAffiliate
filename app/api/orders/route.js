import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ConnectToDB } from "@/lib/db";
import Order from "@/lib/models/OrderModel";
// import { Resend } from "resend"; // optional email

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await ConnectToDB();
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(orders || []);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ConnectToDB();
    const body = await request.json();
    const order = await Order.create(body);

    // OPTIONAL: send email in background, don't block response
    // if (process.env.RESEND_API_KEY) {
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   resend.emails.send({...}).catch(() => {});
    // }

    return NextResponse.json({ success: true, order });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
