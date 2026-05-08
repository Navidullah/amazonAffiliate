// app/portfolio/page.jsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Mail,
  MessageCircle,
  Facebook,
  Linkedin,
  GraduationCap,
  FlaskConical,
  FileText,
  PenTool,
  ArrowRight,
  Star,
} from "lucide-react";

const services = [
  {
    title: "Thesis Writing",
    icon: GraduationCap,
    desc: "Professional thesis, dissertation, and chemistry research documentation.",
  },
  {
    title: "Scientific Writing",
    icon: FlaskConical,
    desc: "Research papers, journal formatting, scientific reports, and analysis.",
  },
  {
    title: "Technical Documentation",
    icon: FileText,
    desc: "Technical reports, SOPs, scientific manuals, and lab documentation.",
  },
  {
    title: "Research Assistance",
    icon: PenTool,
    desc: "Literature review, methodology writing, formatting, and references.",
  },
];

const projects = [
  {
    title: "Nanocomposite Research",
    category: "Chemistry Research",
    desc: "Scientific research documentation and analysis related to nanocomposite materials.",
  },
  {
    title: "Scientific Thesis Writing",
    category: "Academic Writing",
    desc: "Professional formatting, research writing, and chemistry thesis assistance.",
  },
  {
    title: "Technical Chemistry Reports",
    category: "Technical Documentation",
    desc: "Professional scientific reports and technical chemistry documentation.",
  },
  {
    title: "Research Paper Assistance",
    category: "Scientific Writing",
    desc: "Helping students and researchers with scientific article preparation.",
  },
];

export default function PortfolioPage() {
  return (
    <main className="bg-black text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-3xl rounded-full" />
      </div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-sm mb-8">
              <Star size={14} />
              Scientific Research & Academic Writing Expert
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Komal Fareed
            </h1>

            <h2 className="text-2xl lg:text-3xl mt-6 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              MPhil Chemistry | Scientific & Technical Writer
            </h2>

            <p className="text-gray-400 text-lg mt-8 leading-relaxed max-w-2xl">
              MPhil Chemistry graduate from the University of Peshawar,
              Pakistan, helping students, researchers, and professionals with
              thesis writing, scientific documentation, technical reports,
              chemistry research, and academic assistance.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href="https://wa.me/923340964864"
                target="_blank"
                className="px-6 py-4 rounded-2xl bg-green-500 hover:bg-green-600 transition-all flex items-center gap-2 font-semibold"
              >
                <MessageCircle size={20} />
                WhatsApp
              </a>

              <a
                href="mailto:chemist833@gmail.com"
                className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Mail size={20} />
                Email Me
              </a>

              <Link
                href="#projects"
                className="px-6 py-4 rounded-2xl border border-cyan-500/20 hover:bg-cyan-500/10 transition-all flex items-center gap-2"
              >
                View Portfolio
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14">
              {[
                ["50+", "Projects"],
                ["20+", "Research Reports"],
                ["5+", "Research Fields"],
                ["100%", "Professional Work"],
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center"
                >
                  <h3 className="text-2xl font-bold text-cyan-400">
                    {item[0]}
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">{item[1]}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-3xl opacity-30 scale-110" />

              {/* IMAGE */}
              <div className="relative w-[320px] h-[320px] lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-cyan-500/20 shadow-2xl">
                <Image
                  src="/komal.jpeg"
                  alt="Komal Fareed"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              What <span className="text-cyan-400">I Offer</span>
            </h2>

            <p className="text-gray-400 mt-4">
              Professional chemistry research and scientific writing services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:border-cyan-500/20 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                    <Icon className="text-cyan-400" size={28} />
                  </div>

                  <h3 className="text-xl font-semibold mb-4">
                    {service.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              Featured <span className="text-cyan-400">Projects</span>
            </h2>

            <p className="text-gray-400 mt-4">
              Scientific research and academic writing portfolio showcase.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-black border border-white/10 rounded-3xl p-8 hover:border-cyan-500/20 transition-all"
              >
                <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm mb-5">
                  {project.category}
                </div>

                <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>

                <p className="text-gray-400 leading-relaxed">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            About <span className="text-cyan-400">Me</span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mt-8">
            I am Komal Fareed, an MPhil Chemistry graduate from the University
            of Peshawar, Pakistan, with expertise in chemistry research,
            scientific documentation, thesis writing, and academic assistance.
            My goal is to help students and professionals create high-quality,
            research-based, and professionally formatted scientific content.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold">
            Let’s Work <span className="text-cyan-400">Together</span>
          </h2>

          <p className="text-gray-400 text-lg mt-6">
            Need help with chemistry thesis writing, scientific reports,
            research papers, technical documentation, or academic assistance?
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-14">
            <a
              href="https://wa.me/923340964864"
              className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-green-500 hover:bg-green-600 transition-all font-semibold"
            >
              <MessageCircle />
              WhatsApp
            </a>

            <a
              href="mailto:chemist833@gmail.com"
              className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <Mail />
              Gmail
            </a>

            <a
              href="https://www.facebook.com/share/1EbXHqfin4/"
              className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 transition-all"
            >
              <Facebook />
              Facebook
            </a>

            <a
              href="#"
              className="flex items-center gap-3 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <Linkedin />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-gray-500">
        © {new Date().getFullYear()} Komal Fareed — Scientific Research &
        Academic Writing Portfolio
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/923340964864"
        target="_blank"
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50"
      >
        <MessageCircle size={32} />
      </a>
    </main>
  );
}
