"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, X } from "lucide-react";

export default function NewClassroomExperience() {
  const { status } = useSession();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [emails, setEmails] = useState([""]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/classroom")
        .then((res) => res.json())
        .then((data) => {
          if (!data.isAdmin) router.replace("/classroom");
        });
    } else if (status === "unauthenticated") {
      router.replace("/classroom");
    }
  }, [status, router]);

  const updateEmail = (i, value) => {
    setEmails((prev) => prev.map((e, idx) => (idx === i ? value : e)));
  };

  const removeEmail = (i) => {
    setEmails((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/classroom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        meetLink,
        studentEmails: emails.map((e) => e.trim()).filter(Boolean),
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Something went wrong.");
      setSaving(false);
      return;
    }

    const data = await res.json();
    router.push(`/classroom/${data.room._id}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />

      <div className="mx-auto max-w-xl">
        <Link
          href="/classroom"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Classroom
        </Link>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-gray-200/70 bg-white/80 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:p-8"
        >
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">New Class</h1>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Year 8 Algebra — Tuesdays"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Meet link
            </label>
            <input
              type="url"
              required
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              placeholder="https://meet.google.com/xxx-xxxx-xxx"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Student emails
            </label>
            <div className="space-y-2">
              {emails.map((email, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => updateEmail(i, e.target.value)}
                    placeholder="student@example.com"
                    className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-violet-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  {emails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmail(i)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-white/10"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setEmails((prev) => [...prev, ""])}
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-300"
            >
              <Plus className="h-3.5 w-3.5" /> Add another student
            </button>
          </div>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 text-base font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700 disabled:opacity-60"
          >
            {saving ? "Creating..." : "Create Class"}
          </button>
        </motion.form>
      </div>
    </main>
  );
}
