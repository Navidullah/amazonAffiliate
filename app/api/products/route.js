import { NextResponse } from "next/server";

//import Product from "@/lib/models/ProductModel";
import { ConnectToProductDB } from "@/lib/db";
import getProductModel from "@/lib/models/ProductModel";

// GET /api/products
export async function GET() {
  try {
    const conn = await ConnectToProductDB();
    const Product = getProductModel(conn); // <-- attach to connection!
    const products = await Product.find({}).lean();
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
