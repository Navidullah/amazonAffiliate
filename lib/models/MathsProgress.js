import mongoose from "mongoose";

// One document per signed-in user, mirroring the exact shape
// lib/maths/progress.js already produces in localStorage (topics/badges/
// dailyChallenge). Mixed on purpose — that shape can evolve (new badge
// ids, new topics) without a schema migration here, same flexible-data
// pattern already used for product categories.
const MathsProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    progress: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true, collection: "mathsProgress" },
);

export default mongoose.models.MathsProgress ||
  mongoose.model("MathsProgress", MathsProgressSchema);
