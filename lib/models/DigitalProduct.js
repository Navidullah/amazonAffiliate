import mongoose from "mongoose";

const DigitalProductSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    previewImage: { type: String },
    previewImages: [String],
    relatedBlogSlug: { type: String },
    relatedBlogTitle: { type: String },
    price: { type: Number, required: true },
    region: { type: String, enum: ["uk", "us", "ca"], required: true },
    category: { type: String, required: true },
    gradeLevel: { type: String, required: true },
    subject: { type: String, required: true },
    variantId: { type: String, required: true },
    downloadUrl: { type: String, required: true, select: false },
    href: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.models.DigitalProduct ||
  mongoose.model("DigitalProduct", DigitalProductSchema);
