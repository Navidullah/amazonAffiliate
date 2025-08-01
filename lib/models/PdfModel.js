import mongoose from "mongoose";

const PdfSchema = new mongoose.Schema({
  title: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Pdf || mongoose.model("Pdf", PdfSchema);
