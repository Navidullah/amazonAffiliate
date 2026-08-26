import mongoose from "mongoose";

// One document per (identity, day) — used as a persistent daily rate-limit
// counter AND day-pass paid flag for the math solver. `ip` historically
// held a raw IP address; it now holds either "ip:<address>" (anonymous) or
// "user:<id>" (signed in) — kept as `ip` (not renamed to `key`) so the
// existing unique index below doesn't need migrating.
const MathSolverUsageSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD (UTC)
    count: { type: Number, required: true, default: 0 },
    paid: { type: Boolean, default: false }, // day pass purchased for this date
  },
  { timestamps: true, collection: "mathSolverUsage" },
);

MathSolverUsageSchema.index({ ip: 1, date: 1 }, { unique: true });

export default mongoose.models.MathSolverUsage ||
  mongoose.model("MathSolverUsage", MathSolverUsageSchema);
