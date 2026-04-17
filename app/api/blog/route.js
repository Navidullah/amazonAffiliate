// app/api/blog/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ConnectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import Blog from "@/lib/models/Blog";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Please log in first" },
        { status: 401 },
      );
    }

    // Connect to database (users and blogs are in same DB)
    await ConnectToDB();

    // Check if user is admin
    const user = await User.findOne({ email: session.user.email });

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Only admin can write blogs. Your role: " + user?.role },
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

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Calculate reading time
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

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
      readingTime,
    });

    return NextResponse.json({
      success: true,
      blog,
      message: "Blog published successfully!",
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create blog" },
      { status: 500 },
    );
  }
}

// GET all published blogs
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
      .limit(limit);

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
