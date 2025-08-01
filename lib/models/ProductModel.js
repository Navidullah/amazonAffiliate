import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    image: String,
    price: Number,
    category: String,
    stock: { type: Number, default: 0 },
    type: {
      type: String,
      enum: ["own", "affiliate"],
      required: true,
    },
    affiliate: {
      asin: String,
      url: String,
      rating: Number,
      reviews: Number,
    },
  },
  { timestamps: true }
);

// Pass in the connection from your DB helper!
export default function getProductModel(conn) {
  return conn.models.Product || conn.model("Product", ProductSchema);
}
