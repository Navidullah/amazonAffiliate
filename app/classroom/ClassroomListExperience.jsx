"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { LogIn, Plus, Users, Video } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function SignInPrompt() {
  return (
    <div className="rounded-3xl border border-gray-200/70 bg-white/80 p-10 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
        <LogIn className="h-7 w-7" aria-hidden="true" />
      </span>
      <h1 className="mt-4 text-2xl font-extrabold text-gray-900 dark:text-white">Classroom</h1>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-600 dark:text-gray-400">
        Sign in to see your class meet link, assignments, and quizzes.
      </p>
      <button
        type="button"
        onClick={() => signIn()}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-8 text-base font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"
      >
        Sign In
      </button>
    </div>
  );
}

function RoomCard({ room }) {
  return (
    <Link
      href={`/classroom/${room._id}`}
      className="flex items-center gap-4 rounded-2xl border border-gray-200/70 bg-white/70 px-4 py-4 transition-colors hover:border-violet-300 hover:bg-violet-50/60 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-violet-500/40 dark:hover:bg-violet-500/10"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
        <Video className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-900 dark:text-white">{room.title}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Users className="h-3.5 w-3.5" aria-hidden="true" />
          {room.studentEmails.length} student{room.studentEmails.length === 1 ? "" : "s"} ·{" "}
          {room.materials.length} file{room.materials.length === 1 ? "" : "s"}
        </p>
      </div>
    </Link>
  );
}

export default function ClassroomListExperience() {
  const { status } = useSession();
  const [rooms, setRooms] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/classroom")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data.rooms || []);
        setIsAdmin(!!data.isAdmin);
      });
  }, [status]);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-50/60 via-white to-fuchsia-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-400/20 blur-[120px] dark:bg-violet-600/20" />

      <div className="mx-auto max-w-3xl">
        {status !== "authenticated" ? (
          <SignInPrompt />
        ) : rooms === null ? (
          <div className="rounded-3xl border border-gray-200/70 bg-white/70 p-10 text-center text-sm text-gray-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400">
            Loading your classes...
          </div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
            <motion.div variants={fadeUp} className="flex items-center justify-between gap-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {isAdmin ? "Your Classes" : "My Classes"}
              </h1>
              {isAdmin && (
                <Link
                  href="/classroom/new"
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"
                >
                  <Plus className="h-4 w-4" /> New Class
                </Link>
              )}
            </motion.div>

            {rooms.length === 0 ? (
              <motion.div
                variants={fadeUp}
                className="rounded-3xl border border-gray-200/70 bg-white/70 p-10 text-center text-sm text-gray-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400"
              >
                {isAdmin
                  ? "No classes yet — create one to share your meet link and materials."
                  : "No classes yet. Your tutor will add you once your class is set up."}
              </motion.div>
            ) : (
              <motion.div variants={fadeUp} className="space-y-2">
                {rooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}
