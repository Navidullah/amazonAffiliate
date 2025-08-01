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
    title: "OnePlus Nord N30 5G",
    slug: "oneplus-nord-n30-5g",
    description:
      "QUnlocked Dual-SIM Android Smart Phone | 6.7 LCD Display | 8 +128GB | 5000 mAh Battery | 50W Fast Charging | 108MP Camera | Chromatic Gray",
    image: "https://m.media-amazon.com/images/I/610qFsdenLL._AC_SX679_.jpg",
    category: "Mobile",
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

  // You can add more products here (no trailing comma!)
];
async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const prod of products) {
      // Try to insert only if slug doesn't exist
      const existing = await Product.findOne({ slug: prod.slug });
      if (!existing) {
        await Product.create(prod);
        console.log(`Added: ${prod.title}`);
      } else {
        console.log(`Skipped (already exists): ${prod.title}`);
      }
    }
    console.log("Done adding new products!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
