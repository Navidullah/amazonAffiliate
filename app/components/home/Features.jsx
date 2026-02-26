"use client";

import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      title: "⚡ Fast Processing",
      desc: "Optimized tools with instant results.",
      delay: 0,
    },
    {
      title: "🔒 Privacy First",
      desc: "Files are processed securely and not stored.",
      delay: 0.2,
    },
    {
      title: "🆓 100% Free",
      desc: "No sign-up required. Use tools freely.",
      delay: 0.4,
    },
  ];

  return (
    <section className="py-20 bg-muted/100 dark:bg-muted/40 text-center px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: f.delay }}
          >
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
