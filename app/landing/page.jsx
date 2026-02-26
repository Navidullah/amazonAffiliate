"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Sparkles, ImageIcon, Scale, Link2, Shield } from "lucide-react";

const tools = [
  {
    title: "Background Remover",
    desc: "Remove image backgrounds instantly using AI.",
    icon: <ImageIcon className="w-6 h-6" />,
    href: "/background-remover",
  },
  {
    title: "Image Compressor",
    desc: "Reduce image size without losing quality.",
    icon: <Sparkles className="w-6 h-6" />,
    href: "/image-compressor",
  },
  {
    title: "EXIF Remover",
    desc: "Delete hidden metadata from your images.",
    icon: <Shield className="w-6 h-6" />,
    href: "/exif-remover",
  },
  {
    title: "BMI Calculator",
    desc: "Calculate your body mass index easily.",
    icon: <Scale className="w-6 h-6" />,
    href: "/bmi",
  },
  {
    title: "Affiliate Link Generator",
    desc: "Create clean, trackable affiliate links.",
    icon: <Link2 className="w-6 h-6" />,
    href: "/affiliate-generator",
  },
];

export default function LandingPage() {
  return (
    <main className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              All-in-One <span className="text-primary">Free Online Tools</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Remove backgrounds, compress images, calculate BMI, clean EXIF
              data, and generate affiliate links — instantly and securely.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href="/background-remover">
                <Button size="lg">Try Background Remover</Button>
              </Link>
              <Link href="#tools">
                <Button size="lg" variant="outline">
                  Explore Tools
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white shadow-2xl rounded-3xl p-10 backdrop-blur-xl border">
              <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Decorative Blur */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-400/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-indigo-400/30 blur-3xl rounded-full" />
      </section>

      {/* TOOLS SECTION */}
      <section id="tools" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Powerful Tools. Zero Complexity.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {tools.map((tool, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={tool.href}>
                  <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer rounded-2xl">
                    <CardContent className="p-6">
                      <div className="mb-4 text-primary">{tool.icon}</div>
                      <h3 className="text-xl font-semibold">{tool.title}</h3>
                      <p className="text-muted-foreground mt-2">{tool.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-muted/40 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-3">⚡ Fast Processing</h3>
            <p className="text-muted-foreground">
              All tools process instantly with optimized performance.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">🔒 Privacy First</h3>
            <p className="text-muted-foreground">
              Your files are not stored. Everything stays secure.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">💻 Works Everywhere</h3>
            <p className="text-muted-foreground">
              Mobile, tablet, desktop — fully responsive tools.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Start Using Our Free Tools Today
          </h2>

          <Link href="/background-remover">
            <Button size="lg" className="px-10 text-lg">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
