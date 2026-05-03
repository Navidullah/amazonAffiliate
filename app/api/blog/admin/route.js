// app/api/blog/admin/route.js (Make sure it returns an array)
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/lib/models/User";
import Blog from "@/lib/models/Blog";
import { ConnectToDB } from "@/lib/db";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ConnectToDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    // Get all blogs sorted by newest first
    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    // Return the array directly (not wrapped in an object)
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Admin blogs error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
