// app/api/blog/route.js (GET all blogs, POST new blog)
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import Blog from "@/lib/models/Blog";

import { ConnectToDB } from "@/lib/db";
import User from "@/lib/models/User";

// GET all published blogs (public)
export async function GET(request) {
  try {
    await ConnectToDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const skip = (page - 1) * limit;

    let query = { isPublished: true };

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const blogs = await Blog.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-content"); // Don't send full content in list view

    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

// POST create new blog (admin only)
export async function POST(request) {
  try {
    const session = await getServerSession();
    // Debug logging
    console.log("Session:", session);
    console.log("Session user:", session?.user);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ConnectToDB();

    // Check if user is admin
    const user = await User.findOne({ email: session.user.email });
    console.log("Found user:", user);
    console.log("User role:", user?.role);
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    const { title, content, excerpt, category, tags } = await request.json();

    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { error: "Title, content, and excerpt are required" },
        { status: 400 },
      );
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      category: category || "General",
      tags: tags || [],
      author: user.name || user.email,
      authorId: user._id,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}
