import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ["assignment", "quiz"], required: true },
  blobPath: { type: String, required: true },
  fileName: String,
  uploadedAt: { type: Date, default: Date.now },
});

const ClassRoomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    meetLink: { type: String, required: true },
    tutorEmail: { type: String, required: true },
    studentEmails: { type: [String], default: [] },
    materials: { type: [MaterialSchema], default: [] },
  },
  { timestamps: true, collection: "classRooms" },
);

export default mongoose.models.ClassRoom ||
  mongoose.model("ClassRoom", ClassRoomSchema);
