"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AnimatedBlogImage({ href, src, alt }) {
  return (
    <Link href={href}>
      <motion.div
        className="overflow-hidden rounded-md"
        whileHover={{
          scale: 1.04,
          boxShadow: "0 0 16px var(--primary)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Image
          src={src}
          alt={alt}
          width={400}
          height={250}
          className="object-fit w-full h-[200px]"
          loading="lazy" // default in next/image
        />
      </motion.div>
    </Link>
  );
}
