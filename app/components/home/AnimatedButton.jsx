"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AnimatedButton({ children, href }) {
  return (
    <Link href={href}>
      <motion.button
        whileHover={{
          scale: 1.06,
          boxShadow: "0 0 20px #a78bfa, 0 0 40px #60a5fa",
          background: "linear-gradient(90deg,#a78bfa,#60a5fa,#f472b6)",
        }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
        className="
          relative px-12 py-4 rounded-2xl font-bold text-xl
          bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500
          text-white shadow-lg outline-none border-none
          transition-all duration-300 cursor-pointer
        "
      >
        {children}
      </motion.button>
    </Link>
  );
}
