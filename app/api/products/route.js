import { NextResponse } from "next/server";
import { ConnectToProductDB } from "@/lib/db";
import getProductModel from "@/lib/models/ProductModel";

export async function POST(request) {
  try {
    const data = await request.json();
    // Validate required fields
    if (!data.title || !data.slug || !data.type) {
      return NextResponse.json(
        { error: "Title, slug, and type are required." },
        { status: 400 }
      );
    }

    // Connect to product DB and get the model
    const conn = await ConnectToProductDB();
    const Product = getProductModel(conn);

    // Check if slug exists
    const exists = await Product.findOne({ slug: data.slug });
    if (exists) {
      return NextResponse.json(
        { error: "A product with this slug already exists." },
        { status: 409 }
      );
    }

    // Create new product
    const product = await Product.create(data);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Failed to create product." },
      { status: 500 }
    );
  }
}

// (optional: add GET for fetching all products)
export async function GET() {
  try {
    const conn = await ConnectToProductDB();
    const Product = getProductModel(conn);
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
