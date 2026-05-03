// app/api/blog/[slug]/route.js (GET single blog, PUT update, DELETE delete)
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ConnectToDB } from "@/lib/db";
import Blog from "@/lib/models/Blog";
import User from "@/lib/models/User";

async function resolveParams(params) {
  return params instanceof Promise ? await params : params;
}

// GET single blog by slug (public: published only; admin: any slug including drafts)
export async function GET(request, context) {
  try {
    await ConnectToDB();

    const { slug: rawSlug } = await resolveParams(context.params);
    const slug = decodeURIComponent(rawSlug);

    const session = await getServerSession(authOptions);
    let isAdmin = false;
    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email });
      isAdmin = user?.role === "admin";
    }

    const blog = isAdmin
      ? await Blog.findOne({ slug })
      : await Blog.findOne({ slug, isPublished: true });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Count views only for public visits (not admin loading the editor)
    if (!isAdmin && blog.isPublished) {
      blog.views += 1;
      await blog.save();
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 },
    );
  }
}

// PUT update blog (admin only)
export async function PUT(request, context) {
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

    const { slug: rawSlug } = await resolveParams(context.params);
    const slug = decodeURIComponent(rawSlug);
    const { title, content, excerpt, category, tags, isPublished } =
      await request.json();

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Update fields
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (excerpt) blog.excerpt = excerpt;
    if (category) blog.category = category;
    if (tags) blog.tags = tags;
    if (typeof isPublished === "boolean") blog.isPublished = isPublished;

    await blog.save();

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 },
    );
  }
}

// DELETE blog (admin only)
export async function DELETE(request, context) {
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

    const { slug: rawSlug } = await resolveParams(context.params);
    const slug = decodeURIComponent(rawSlug);

    const blog = await Blog.findOneAndDelete({ slug });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 },
    );
  }
}
