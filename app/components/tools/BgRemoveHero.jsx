"use client";

import { motion } from "framer-motion";
import { Wand2, Sparkles } from "lucide-react";

/**
 * Auto-playing before/after reveal for the background remover.
 * A scan line sweeps across; to its left the original background is replaced by
 * a transparent (checkerboard) cut-out — demonstrating AI background removal.
 * Demo assets: /demo/bg-before.jpg (original) and /demo/bg-after.png (transparent PNG).
 */

const DURATION = 4.5;
const TIMES = [0, 0.45, 0.8, 1]; // sweep in → hold → sweep back

const checker = {
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(45deg,#d4d4d8 25%,transparent 25%),linear-gradient(-45deg,#d4d4d8 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#d4d4d8 75%),linear-gradient(-45deg,transparent 75%,#d4d4d8 75%)",
  backgroundSize: "22px 22px",
  backgroundPosition: "0 0,0 11px,11px -11px,-11px 0",
};

export default function BgRemoveHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-sm"
    >
      <div className="relative aspect-[500/507] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl shadow-violet-500/10 dark:border-white/10">
        {/* BEFORE — original photo with background */}
        <img
          src="/demo/bg-before.jpg"
          alt="Photo before background removal"
          className="absolute inset-0 h-full w-full object-cover"
          width={500}
          height={507}
        />

        {/* AFTER — transparent subject over a checkerboard, revealed left→right */}
        <motion.div
          className="absolute inset-0"
          style={checker}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{
            clipPath: [
              "inset(0 100% 0 0)",
              "inset(0 0% 0 0)",
              "inset(0 0% 0 0)",
              "inset(0 100% 0 0)",
            ],
          }}
          transition={{ duration: DURATION, times: TIMES, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/demo/bg-after.png"
            alt="Subject after AI background removal — transparent PNG"
            className="absolute inset-0 h-full w-full object-cover"
            width={500}
            height={507}
          />
        </motion.div>

        {/* Scan line + magic-wand handle */}
        <motion.div
          className="absolute bottom-0 top-0 w-[3px] -ml-[1.5px]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #8b5cf6, #ec4899, #8b5cf6, transparent)",
            boxShadow: "0 0 18px 3px rgba(139,92,246,0.7)",
          }}
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: ["0%", "100%", "100%", "0%"], opacity: [1, 1, 0, 0] }}
          transition={{ duration: DURATION, times: TIMES, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/40">
            <Wand2 className="h-4 w-4" />
          </span>
        </motion.div>

        {/* Labels */}
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          Original
        </span>
        <motion.span
          className="absolute right-3 top-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 py-1 text-xs font-semibold text-white shadow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.9] }}
          transition={{ duration: DURATION, times: TIMES, repeat: Infinity, ease: "easeInOut" }}
        >
          Background removed ✨
        </motion.span>
      </div>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
        <Sparkles className="h-4 w-4 text-violet-500" />
        Watch the background vanish — do it with your own photo below.
      </p>
    </motion.div>
  );
}
