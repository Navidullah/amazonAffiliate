"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const gradientVariants = {
  animate: {
    background: [
      "linear-gradient(120deg, #1e293b 0%, #232135 100%)",
      "linear-gradient(120deg, #232135 0%, #1e293b 100%)",
      "linear-gradient(120deg, #1e293b 0%, #232135 100%)",
    ],
  },
};

export default function HomeHero() {
  return (
    <motion.section
      variants={gradientVariants}
      animate="animate"
      transition={{
        duration: 12,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      }}
      className="w-full py-16 flex flex-col items-center text-center min-h-[38vh] md:min-h-[48vh] relative overflow-hidden bg-white dark:bg-zinc-900/30 border border-white/40 dark:border-zinc-800/40 backdrop-blur-md shadow-lg px-4"
      initial={false}
    >
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-extrabold mb-4
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
      >
        Shop the Best Fitness Equipment, Home Workout Gear & Essentials
      </motion.h1>

      {/* SEO-Friendly Intro */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl text-lg md:text-2xl text-zinc-600 dark:text-zinc-300 mb-8"
      >
        Discover top-rated <strong>fitness equipment</strong>,{" "}
        <strong>adjustable dumbbells</strong>, <strong>resistance bands</strong>
        , and <strong>home workout gear</strong> alongside exclusive Amazon
        affiliate deals – all in one place. From <strong>electronics</strong>,{" "}
        <strong>fashion</strong>, and <strong>home essentials</strong> to{" "}
        <strong>health & fitness gear</strong> and{" "}
        <strong>lifestyle accessories</strong>, Shopyor helps you shop smarter,
        stay fit, and save more.
      </motion.p>

      {/* Call to Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.32, duration: 0.45, ease: "easeOut" }}
      >
        <Link href="/products">
          <motion.button
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 22px #a78bfa, 0 0 32px #60a5fa",
              background:
                "linear-gradient(90deg,#a78bfa,#60a5fa,#f472b6,#a78bfa)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="px-8 py-4 rounded-2xl font-extrabold text-xl
              bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500
              text-white shadow-lg border-none outline-none flex items-center gap-2
              transition-all duration-300"
          >
            <span className="text-2xl cursor-pointer">🛒 Browse Products</span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
}
