require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

// --- Use your ProductModel schema exactly as before ---
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

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

// --- Products to seed (own + affiliate) ---
const products = [
  {
    title: "Bedsure Comforter Duvet Insert",
    slug: "bedsure-comforter-duvet-insert",
    description:
      "Quilted Comforters Queen Size, All Season Duvet, Down Alternative Bedding, with 8 Tabs, Gifts for Women/Men, White, Queen 88 x 88 Inches",
    image:
      "https://m.media-amazon.com/images/I/71A5SvOD8lL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    category: "Home",
    type: "affiliate",
    price: 60,
    stock: 10,
    affiliate: {
      asin: "B09B8V8VK9",
      url: "https://www.amazon.com/dp/B07QK9C9KT?tag=hamraproduct-20",
      rating: 4.5,
      reviews: 1320,
    },
  },
  {
    title: "Amazon Fire 7 Kids tablet",
    slug: "Amazo-Fire-7-Kids-tablet",
    description:
      "kids tablet on Amazon. Includes ad-free and exclusive content, easy parental controls, 10-hr battery, 16 GB, Blue",
    image: "https://m.media-amazon.com/images/I/71+qN1ewY9L._AC_SY450_.jpg",
    category: "Fashion",
    type: "own",
    price: 60,
    stock: 10,
    affiliate: {
      asin: "B09B8V8VK9",
      url: "https://www.amazon.com/dp/B07QK9C9KT?tag=hamraproduct-20",
      rating: 4.5,
      reviews: 1320,
    },
  },
  {
    title: "Home decoration project",
    slug: "home-decoration-project",
    description:
      "kids tablet on Amazon. Includes ad-free and exclusive content, easy parental controls, 10-hr battery, 16 GB, Blue",
    image: "https://m.media-amazon.com/images/I/71+qN1ewY9L._AC_SY450_.jpg",
    category: "Fashion",
    type: "own",
    price: 60,
    stock: 10,
    affiliate: {
      asin: "B09B8V8VK9",
      url: "https://www.amazon.com/dp/B07QK9C9KT?tag=hamraproduct-20",
      rating: 4.5,
      reviews: 1320,
    },
  },
  // You can add more products here (no trailing comma!)
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded with products!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
