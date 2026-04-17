// app/api/blog/admin/route.js (Get all blogs for admin)
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ConnectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import Blog from "@/lib/models/Blog";

export async function GET(request) {
  try {
    const session = await getServerSession();

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

    const blogs = await Blog.find().sort({ createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching admin blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
