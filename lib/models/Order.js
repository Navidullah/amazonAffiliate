import mongoose from "mongoose";

// Named/collection distinctly from the unrelated legacy `Order` model
// (lib/models/OrderModel.js, collection "orders" — old COD shop checkout,
// has real customer data) so the two never collide.
const DigitalProductOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    productSlug: { type: String, required: true },
    // Which collection productSlug refers to, so the download route knows
    // whether to look up DigitalProduct or Book.
    productType: { type: String, enum: ["digital_product", "book"], default: "digital_product" },
    price: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    lemonsqueezyOrderId: { type: String },
  },
  { timestamps: true, collection: "digitalProductOrders" },
);

export default mongoose.models.DigitalProductOrder ||
  mongoose.model("DigitalProductOrder", DigitalProductOrderSchema);
