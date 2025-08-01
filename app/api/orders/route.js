import { Resend } from "resend";
import Order from "@/lib/models/OrderModel";
import { ConnectToDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await ConnectToDB();
    const body = await request.json();
    const order = await Order.create(body);

    // Send email (before returning)
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "orders@yourdomain.com",
      to: "addminyahya@gmail.com",
      subject: `New Order Received from ${body.name}`,
      html: `<h2>Order Details</h2>
        <p>Name: ${body.name}</p>
        <p>Email: ${body.email}</p>
        <p>Phone: ${body.phone}</p>
        <p>Address: ${body.address}</p>
        <p>Total: $${body.total}</p>
        <p>Items: ${body.items.map((item) => `${item.title} x ${item.quantity}`).join(", ")}</p>
      `,
    });

    // Now return success
    return NextResponse.json({ success: true, order });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
