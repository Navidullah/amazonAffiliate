"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Faq() {
  const faqs = [
    {
      q: "Are these tools free to use?",
      a: "Yes, all tools are completely free and require no registration.",
      delay: 0,
    },
    {
      q: "Do you store uploaded files?",
      a: "No. Files are processed securely and never stored.",
      delay: 0.1,
    },
    {
      q: "Do these tools work on mobile?",
      a: "Yes, all tools are fully responsive and optimized for all devices.",
      delay: 0.2,
    },
    {
      q: "How can I convert a PDF to editable Word?",
      a: (
        <>
          Use our{" "}
          <Link href="/tools/pdf-to-word" className="text-primary hover:underline">
            PDF to Word Converter
          </Link>{" "}
          to upload your PDF and download an editable DOCX file in seconds.
        </>
      ),
      delay: 0.3,
    },
    {
      q: "Where can I find all available tools?",
      a: (
        <>
          Browse the complete collection on the{" "}
          <Link href="/tools" className="text-primary hover:underline">
            tools page
          </Link>{" "}
          including image, PDF, SEO, and video utilities.
        </>
      ),
      delay: 0.4,
    },
  ];

  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: f.delay }}
          >
            <h3 className="font-semibold text-lg">{f.q}</h3>
            <p className="text-muted-foreground">{f.a}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
