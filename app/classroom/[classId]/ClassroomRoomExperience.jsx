"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  FileText,
  ListChecks,
  LogIn,
  MessageCircle,
  UploadCloud,
  Users,
  Video,
} from "lucide-react";

// wa.me needs digits only (country code + number, no +/spaces/dashes).
function toWhatsAppLink(number, text) {
  const digits = String(number || "").replace(/[^0-9]/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
import { toast } from "react-toastify";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardClass =
  "rounded-3xl border border-gray-200/70 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-8";

function MaterialRow({ classId, material }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
        {material.type === "quiz" ? (
          <ListChecks className="h-4 w-4" aria-hidden="true" />
        ) : (
          <FileText className="h-4 w-4" aria-hidden="true" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{material.title}</p>
        <p className="text-xs capitalize text-gray-500 dark:text-gray-400">{material.type}</p>
      </div>
      <a
        href={`/api/classroom/${classId}/materials/${material._id}/download`}
        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-violet-100 hover:text-violet-700 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-violet-500/20 dark:hover:text-violet-200"
      >
        <Download className="h-3.5 w-3.5" /> Download
      </a>
    </div>
  );
}

function UploadMaterialForm({ classId, onUploaded }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("assignment");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("type", type);

    const res = await fetch(`/api/classroom/${classId}/materials`, {
      method: "POST",
      body: formData,
    });

    setUploading(false);
    if (!res.ok) {
      toast.error("Failed to upload file.");
      return;
    }

    setTitle("");
    setFile(null);
    e.target.reset();
    toast.success("Uploaded.");
    onUploaded();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <div className="min-w-[160px] flex-1">
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Homework 3"
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <option value="assignment">Assignment</option>
          <option value="quiz">Quiz</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">File</label>
        <input
          type="file"
          required
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm text-gray-700 dark:text-gray-300"
        />
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-60"
      >
        <UploadCloud className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}

function UploadSubmissionForm({ classId, materials, onUploaded }) {
  const [materialId, setMaterialId] = useState("");
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    if (materialId) formData.append("materialId", materialId);
    if (note) formData.append("note", note);

    const res = await fetch(`/api/classroom/${classId}/submissions`, {
      method: "POST",
      body: formData,
    });

    setUploading(false);
    if (!res.ok) {
      toast.error("Failed to upload your work.");
      return;
    }

    setNote("");
    setFile(null);
    e.target.reset();
    toast.success("Submitted.");
    onUploaded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {materials.length > 0 && (
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
            Which assignment/quiz? (optional)
          </label>
          <select
            value={materialId}
            onChange={(e) => setMaterialId(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
          >
            <option value="">General submission</option>
            {materials.map((m) => (
              <option key={m._id} value={m._id}>
                {m.title}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
          Your file
        </label>
        <input
          type="file"
          required
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm text-gray-700 dark:text-gray-300"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-600 dark:text-gray-400">
          Note (optional)
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Anything your tutor should know"
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>
      <button
        type="submit"
        disabled={uploading}
        className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-violet-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-violet-700 disabled:opacity-60"
      >
        <UploadCloud className="h-4 w-4" /> {uploading ? "Uploading..." : "Submit"}
      </button>
    </form>
  );
}

function SubmissionRow({ classId, submission, materials }) {
  const material = materials.find((m) => m._id === submission.materialId);
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
        <FileText className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{submission.fileName}</p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
          {submission.studentEmail} {material ? `· for ${material.title}` : ""}
          {submission.note ? ` · "${submission.note}"` : ""}
        </p>
      </div>
      <a
        href={`/api/classroom/${classId}/submissions/${submission._id}/download`}
        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-violet-100 hover:text-violet-700 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-violet-500/20 dark:hover:text-violet-200"
      >
        <Download className="h-3.5 w-3.5" /> Download
      </a>
    </div>
  );
}

export default function ClassroomRoomExperience({ classId }) {
  const { status } = useSession();
  const [room, setRoom] = useState(null);
  const [isTutor, setIsTutor] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const loadRoom = useCallback(async () => {
    const res = await fetch(`/api/classroom/${classId}`);
    if (!res.ok) {
      setNotFound(true);
      return;
    }
    const data = await res.json();
    setRoom(data.room);
    setIsTutor(data.isTutor);
  }, [classId]);

  const loadSubmissions = useCallback(async () => {
    const res = await fetch(`/api/classroom/${classId}/submissions`);
    if (res.ok) {
      const data = await res.json();
      setSubmissions(data.submissions || []);
    }
  }, [classId]);

  useEffect(() => {
    if (status !== "authenticated") return;
    loadRoom();
    loadSubmissions();
  }, [status, loadRoom, loadSubmissions]);

  if (status !== "authenticated") {
    return (
      <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className={`${cardClass} text-center`}>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
              <LogIn className="h-7 w-7" aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white">Classroom</h1>
            <button
              type="button"
              onClick={() => signIn()}
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"
            >
              Sign In
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />

      <div className="mx-auto max-w-3xl">
        <Link
          href="/classroom"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Classroom
        </Link>

        {notFound ? (
          <div className={`${cardClass} text-center text-sm text-gray-500 dark:text-gray-400`}>
            This class doesn&apos;t exist, or you don&apos;t have access to it.
          </div>
        ) : !room ? (
          <div className={`${cardClass} text-center text-sm text-gray-500 dark:text-gray-400`}>
            Loading class...
          </div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
            <motion.div variants={fadeUp} className={cardClass}>
              <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{room.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <Users className="h-3.5 w-3.5" />
                {room.students.length} student{room.students.length === 1 ? "" : "s"}
              </p>
              <a
                href={room.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex h-11 items-center gap-2 rounded-2xl bg-violet-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"
              >
                <Video className="h-4 w-4" /> Join Class
              </a>

              {isTutor && room.students.length > 0 && (
                <div className="mt-5 space-y-2 border-t border-gray-200/70 pt-4 dark:border-white/10">
                  {room.students.map((student) => {
                    const link = toWhatsAppLink(
                      student.whatsappNumber,
                      `You've been added to "${room.title}". Meet link: ${room.meetLink}. Sign in at shopyor.com/classroom to see materials and submit your work.`,
                    );
                    return (
                      <div
                        key={student.email}
                        className="flex items-center justify-between gap-2 text-sm"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{student.email}</span>
                        {link && (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300"
                          >
                            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className={cardClass}>
              <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Assignments &amp; Quizzes
              </h2>
              {isTutor && (
                <div className="mb-5 rounded-2xl border border-dashed border-gray-300 p-4 dark:border-white/15">
                  <UploadMaterialForm classId={classId} onUploaded={loadRoom} />
                </div>
              )}
              {room.materials.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">Nothing uploaded yet.</p>
              ) : (
                <div className="space-y-2">
                  {room.materials.map((m) => (
                    <MaterialRow key={m._id} classId={classId} material={m} />
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className={cardClass}>
              <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                {isTutor ? "Student Submissions" : "Submit Your Work"}
              </h2>
              {!isTutor && (
                <div className="mb-5 rounded-2xl border border-dashed border-gray-300 p-4 dark:border-white/15">
                  <UploadSubmissionForm
                    classId={classId}
                    materials={room.materials}
                    onUploaded={loadSubmissions}
                  />
                </div>
              )}
              {submissions.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isTutor ? "No submissions yet." : "You haven't submitted anything yet."}
                </p>
              ) : (
                <div className="space-y-2">
                  {submissions.map((s) => (
                    <SubmissionRow
                      key={s._id}
                      classId={classId}
                      submission={s}
                      materials={room.materials}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
