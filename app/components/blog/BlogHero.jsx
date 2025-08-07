"use client";

import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      className="w-full mb-8 py-16 flex flex-col items-center text-center min-h-[38vh] md:min-h-[48vh] relative overflow-hidden bg-white/30 dark:bg-zinc-900/30 border border-white/40 dark:border-zinc-800/40 backdrop-blur-md shadow-lg"
    >
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold mb-4
          bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
      >
        Health & Fitness Blogs – Tips, Reviews & Workout Guides
      </motion.h1>
      <motion.p className="max-w-3xl text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-8">
        Welcome to <strong>Shopyor’s Health & Fitness Blog</strong> – your go-to
        source for
        <strong> fitness equipment reviews</strong>,{" "}
        <strong>workout routines</strong>, and
        <strong> nutrition tips</strong>. We cover adjustable dumbbells,
        resistance bands, whey protein, and home gym essentials.
      </motion.p>
    </motion.section>
  );
}
