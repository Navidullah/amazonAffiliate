import mongoose from "mongoose";

// One document per (ip, day) — used as a persistent daily rate-limit
// counter for the free math solver so a burst of requests can't run up
// the Anthropic bill unbounded across serverless instances.
const MathSolverUsageSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD (UTC)
    count: { type: Number, required: true, default: 0 },
  },
  { timestamps: true, collection: "mathSolverUsage" },
);

MathSolverUsageSchema.index({ ip: 1, date: 1 }, { unique: true });

export default mongoose.models.MathSolverUsage ||
  mongoose.model("MathSolverUsage", MathSolverUsageSchema);
