"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AnimatedHero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 bg-background">
      {/* Subtle Layered Background Gradient (Token Based) */}
      <div
        className="absolute inset-0 -z-30 bg-gradient-to-br 
        from-background 
        via-muted 
        to-background 
        animate-gradient"
      />

      {/* Particle Layer */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 -z-20"
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 30 },
            size: { value: 2 },
            move: { enable: true, speed: 0.8 },
            opacity: { value: 0.3 },
            color: { value: "#888888" },
          },
        }}
      />

      {/* Primary Glow (Theme Aware) */}

      {/* Glass Card */}
      <motion.div
        style={{ y }}
        className="relative z-10 text-center max-w-4xl 
        backdrop-blur-xl 
        bg-card/70 dark:bg-muted/40
        border border-border
         shadow-xl
        p-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
          Powerful Free Online Tools
        </h1>

        <p className="mt-6 text-lg text-muted-foreground">
          Background remover, image compressor, EXIF cleaner, BMI calculator and
          affiliate generator — fast & secure.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link href="/tools/background-remover-image">
            <Button size="lg" className="cursor-pointer">
              Try Background Remover
            </Button>
          </Link>

          <Link href="/tools">
            <Button variant="outline" size="lg" className="cursor-pointer">
              Explore Tools
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
