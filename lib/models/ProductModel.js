import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    /**
     * Main product image used as a fallback or thumbnail.  For richer product
     * pages we also support an array of images under the `images` property.  If
     * multiple images are provided the client can render a gallery and allow
     * users to cycle through different angles or lifestyle shots.  The single
     * `image` property remains for backwards compatibility.
     */
    image: String,
    /**
     * Optional array of additional product images.  Each entry should be a
     * publicly accessible URL.  These images are surfaced on the product detail
     * page in a gallery with zoom functionality, giving shoppers a better
     * understanding of the product from multiple angles【435000769489995†L132-L141】.
     */
    images: [String],
    /**
     * Highlights are short bullet points that summarise the key features or
     * benefits of a product.  They are displayed on the product detail page as
     * a list to improve scannability, as recommended in modern e‑commerce
     * patterns【988626756661385†L648-L660】.  For affiliate products, these can be
     * extracted from the description or the Amazon product listing.
     */
    highlights: [String],
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
      /**
       * Average rating out of five stars.  When provided the client can render
       * visual star icons as social proof.  Defaults to 0 when unknown.
       */
      rating: { type: Number, default: 0 },
      /**
       * Total number of reviews for this affiliate product.  Defaults to 0 to
       * avoid undefined values on the client.
       */
      reviews: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// Pass in the connection from your DB helper!
export default function getProductModel(conn) {
  return conn.models.Product || conn.model("Product", ProductSchema);
}
