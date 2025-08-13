/*import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import path from "path";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export async function POST(req) {
  await ConnectToDB();
  const formData = await req.formData();

  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const image = formData.get("image"); // File
  const author = formData.get("author");
  const authorImage = formData.get("authorImage");
  const authorEmail = formData.get("authorEmail");

  // Generate slug from title
  let slug = slugify(title);

  // If slug exists, append a random 4-digit code
  let exists = await BlogModel.findOne({ slug });
  if (exists) {
    slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  // Save image to public/uploads
  let imageUrl = "";
  if (image && image.name) {
    const ext = image.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
    const savePath = path.join(process.cwd(), "public/uploads", fileName);
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(savePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  // Save blog to DB with slug
  const blog = new BlogModel({
    title,
    slug,
    description,
    category,
    image: imageUrl,
    author,
    authorImage,
    authorEmail,
  });

  await blog.save();

  return new Response(JSON.stringify({ message: "Blog created", blog }), {
    status: 201,
  });
}

// /api/blogs/route.js (GET)
export async function GET() {
  await ConnectToDB();
  const blogs = await BlogModel.find().sort({ date: -1 });
  return Response.json(blogs, { status: 200 });
}
*/
import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function POST(req) {
  try {
    await ConnectToDB();
    const data = await req.json(); // Expect JSON body now!

    const {
      title,
      description,
      metaDescription, // ✅ New field
      category,
      image,
      author,
      authorImage,
      authorEmail,
    } = data;

    // Generate slug from title
    let slug = slugify(title);

    // If slug exists, append a random 4-digit code
    let exists = await BlogModel.findOne({ slug });
    if (exists) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Save blog to DB with slug and image URL from Firebase
    const blog = new BlogModel({
      title,
      slug,
      description,
      metaDescription, // ✅ New field
      category,
      image, // <-- This is now a URL string
      author,
      authorImage,
      authorEmail,
    });

    await blog.save();

    return new Response(JSON.stringify({ message: "Blog created", blog }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating blog:", error); // ✅ Log the actual error
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong" }),
      { status: 500 }
    );
  }
}

// /api/blogs/route.js (GET)
// /api/blogs/route.js (GET with pagination)
export async function GET(req) {
  try {
    await ConnectToDB();

    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") || 1)); // default 1
    const limit = Math.max(1, Number(searchParams.get("limit") || 5)); // default 5
    const skip = (page - 1) * limit;

    const total = await BlogModel.countDocuments();
    const blogs = await BlogModel.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    return new Response(
      JSON.stringify({
        items: blogs,
        total,
        page,
        limit,
        hasPrev: page > 1,
        hasNext: page * limit < total,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Something went wrong" }),
      { status: 500 }
    );
  }
}
