import mongoose from "mongoose";

const ClassSubmissionSchema = new mongoose.Schema(
  {
    classroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassRoom",
      required: true,
    },
    studentEmail: { type: String, required: true },
    materialId: { type: mongoose.Schema.Types.ObjectId, default: null },
    fileName: String,
    blobPath: { type: String, required: true },
    note: String,
  },
  { timestamps: true, collection: "classSubmissions" },
);

export default mongoose.models.ClassSubmission ||
  mongoose.model("ClassSubmission", ClassSubmissionSchema);
