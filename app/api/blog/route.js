// app/api/blog/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Import your authOptions
import ConnectToDB from "@/lib/db";
import User from "@/lib/models/User";
import Blog from "@/lib/models/Blog";

export async function POST(request) {
  try {
    // 🔥 IMPORTANT: Pass authOptions to getServerSession
    const session = await getServerSession(authOptions);

    // Check if user is logged in
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Please log in first" },
        { status: 401 },
      );
    }

    await ConnectToDB();

    // Check if user is admin
    const user = await User.findOne({ email: session.user.email });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Only admin can write blogs" },
        { status: 403 },
      );
    }

    // Get blog data from request
    const { title, content, excerpt, category, tags } = await request.json();

    // Validate required fields
    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { error: "Title, content, and excerpt are required" },
        { status: 400 },
      );
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Create blog
    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      category: category || "General",
      tags: tags || [],
      author: user.name || user.email,
      authorId: user._id,
      isPublished: true,
      publishedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      blog,
      message: "Blog published successfully!",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create blog" },
      { status: 500 },
    );
  }
}
