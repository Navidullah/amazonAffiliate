import { NextResponse } from "next/server";
import { getActiveDigitalProducts } from "@/lib/actions/products";

export const GET = async () => {
  const products = await getActiveDigitalProducts();
  return NextResponse.json({ products });
};
