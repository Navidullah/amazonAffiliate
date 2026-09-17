import mongoose from "mongoose";

// Singleton document (_id: "main") holding the current Pinterest OAuth
// tokens. Populated by the NextAuth jwt callback whenever someone signs in
// via the Pinterest provider (see lib/authOptions.js). Read by
// scripts/post-pinterest-pin.js so the pin-posting CLI doesn't depend on a
// live browser session.
const PinterestAuthSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "main" },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    tokenType: { type: String, default: "Bearer" },
    scope: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.PinterestAuth ||
  mongoose.model("PinterestAuth", PinterestAuthSchema);
