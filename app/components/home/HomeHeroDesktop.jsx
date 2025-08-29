"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeHeroDesktop() {
  return (
    <section className="relative hidden lg:block">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/health-fitness.png" // <-- put a crisp 2400x1200 (or larger) image here
          alt="Health & Fitness — practical guides, tools, and product breakdowns"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient + vignette overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 [mask-image:radial-gradient(60%_70%_at_40%_50%,black,transparent)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-8 pt-28 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl xl:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
        >
          Practical <span className="text-cyan-300">Health & Fitness</span>{" "}
          Guides for Real Life
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="mt-5 max-w-2xl text-lg/8 text-white/80"
        >
          Evidence-based tips, simple routines, and clear product breakdowns. No
          fluff—just what helps you feel better, think sharper, and move more.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/tools"
            className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-black hover:bg-cyan-300 active:scale-[0.99]"
          >
            Try Tools
          </Link>
          <Link
            href="/products"
            className="rounded-2xl bg-white/90 px-5 py-3 font-semibold text-gray-900 hover:bg-white active:scale-[0.99]"
          >
            Explore Products
          </Link>
          <Link
            href="/blogs"
            className="rounded-2xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur hover:bg-white/15 active:scale-[0.99]"
          >
            Browse Blogs
          </Link>
        </motion.div>

        {/* Optional tags / stats */}
        <div className="mt-6 flex flex-wrap gap-2 text-sm text-white/70">
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
            #Protein
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
            #Sleep
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
            #Jogging
          </span>
          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
            #Beginners
          </span>
        </div>
      </div>
    </section>
  );
}
