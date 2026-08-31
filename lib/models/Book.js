import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    coverImageUrl: { type: String },
    category: { type: String, required: true },
    tags: [String],
    // Provenance is required, not optional — public_domain uploads must record
    // where the text came from (e.g. "Project Gutenberg #1234").
    source: { type: String, enum: ["public_domain", "original"], required: true },
    attribution: {
      type: String,
      required: function () {
        return this.source === "public_domain";
      },
    },
    // Private Blob path to the watermarked PDF — hidden by default like
    // DigitalProduct.downloadUrl, only ever read server-side for streaming.
    fileBlobPath: { type: String, required: true, select: false },
    pageCount: { type: Number },
    views: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

BookSchema.index({ title: "text", author: "text", tags: "text" });

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
