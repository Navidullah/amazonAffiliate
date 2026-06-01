"use client";

import { motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function VoiceCloneHero() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative mb-10 text-center"
    >
      {/* glow orb */}
      <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px] dark:bg-violet-600/20" />

      <motion.span
        variants={item}
        className="relative inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-300"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
        AI Voice Cloning · Free
      </motion.span>

      <motion.h1
        variants={item}
        className="relative mx-auto mt-5 max-w-2xl text-4xl font-black leading-[1.1] tracking-tight md:text-5xl"
      >
        Clone any voice in{" "}
        <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
          seconds
        </span>
      </motion.h1>

      <motion.p
        variants={item}
        className="relative mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground"
      >
        Upload a short sample, type your script, and get natural-sounding speech in that
        voice. <span className="font-medium text-foreground">Only clone voices you have
        permission to use.</span>
      </motion.p>

      <motion.div
        variants={item}
        className="relative mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground"
      >
        <span className="inline-flex items-center gap-1.5">
          <Mic className="h-4 w-4 text-violet-500" /> 10–30s sample
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-fuchsia-500" /> Instant WAV download
        </span>
      </motion.div>
    </motion.div>
  );
}
