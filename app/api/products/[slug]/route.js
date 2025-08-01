import { ConnectToProductDB } from "@/lib/db";
import getProductModel from "@/lib/models/ProductModel";

import { NextResponse } from "next/server";

// GET /api/products/[slug]
export async function GET(request, { params }) {
  try {
    const conn = await ConnectToProductDB();
    const Product = getProductModel(conn);
    console.log(Product);
    const product = await Product.findOne({ slug: params.slug }).lean();
    if (!product)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
