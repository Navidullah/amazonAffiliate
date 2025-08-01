// app/page.jsx
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeHero() {
  return (
    <motion.section
      className="py-16 flex flex-col items-center text-center bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-950"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Discover the Best Products
      </h1>
      <p className="max-w-xl text-lg md:text-2xl text-zinc-600 dark:text-zinc-300 mb-8">
        Handpicked deals and trending items from Amazon.
        <span className="font-semibold text-indigo-500"> Shop smarter!</span>
      </p>
      <Link href="/products">
        <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-bold px-8 py-3 rounded-2xl shadow-lg text-xl">
          Browse Products
        </button>
      </Link>
    </motion.section>
  );
}
