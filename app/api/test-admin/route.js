// app/api/test-admin/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ConnectToDB from "@/lib/db";
import User from "@/lib/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({
        message: "Not logged in",
        isAdmin: false,
      });
    }

    await ConnectToDB();
    const user = await User.findOne({ email: session.user.email });

    return NextResponse.json({
      loggedInAs: session.user.email,
      roleInSession: session.user.role,
      roleInDatabase: user?.role,
      isAdmin: user?.role === "admin",
      message:
        user?.role === "admin"
          ? "✅ You are admin! You can write blogs."
          : "❌ You are not admin",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
