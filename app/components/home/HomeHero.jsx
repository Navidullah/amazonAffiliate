/*"use client";
// components/home/HomeHero.jsx
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedButton from "./AnimatedButton";

export default function HomeHero() {
  return (
    <motion.section
      className="w-full py-16 flex flex-col items-center text-center bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-950"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Discover the Best Products
      </h1>
      <p className="max-w-xl text-lg md:text-2xl text-zinc-600 dark:text-zinc-300 mb-8">
        Handpicked deals and trending items from Amazon.&nbsp;
        <span className="font-semibold text-indigo-500">Shop smarter!</span>
      </p>

      <AnimatedButton
        href="/products"
        className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-bold px-8 py-3 rounded-2xl shadow-lg text-xl"
      >
        Browse Products
      </AnimatedButton>
    </motion.section>
  );
}
*/
"use client";
// components/home/HomeHero.jsx
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
      className="w-full py-16 flex flex-col items-center text-center min-h-[38vh] md:min-h-[48vh] relative overflow-hidden bg-white/30 dark:bg-zinc-900/30 border border-white/40 dark:border-zinc-800/40 backdrop-blur-md shadow-lg"
      initial={false}
    >
      {/* Headline Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-extrabold mb-4
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
      >
        Discover the Best Products
      </motion.h1>
      {/* Subtext Animation */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
        className="max-w-xl text-lg md:text-2xl text-zinc-600 dark:text-zinc-300 mb-8"
      >
        Handpicked deals and trending items from Amazon.&nbsp;
        <span className="font-semibold text-indigo-500">Shop smarter!</span>
      </motion.p>
      {/* Animated Button with Emoji */}
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
            className="
              px-8 py-4 rounded-2xl font-extrabold text-xl
              bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500
              text-white shadow-lg border-none outline-none flex items-center gap-2
              transition-all duration-300
            "
          >
            <span className="text-2xl cursor-pointer">🛒 Browse Products</span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
}
