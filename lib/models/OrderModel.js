import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    country: { type: String, default: "Pakistan" },
    phone: { type: String, required: true },
    items: [
      {
        productId: String, // or mongoose.Schema.Types.ObjectId if you want
        title: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
    paymentMethod: { type: String, default: "cod" },
    status: { type: String, default: "pending" }, // pending, shipped, delivered, cancelled
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
