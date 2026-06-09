"use client";

/**
 * Resume Builder — modern, professional, production-ready CV maker.
 * --------------------------------------------------------------------------
 *  - Full set of resume sections (contact, summary, experience, education,
 *    skills, projects, certifications, languages).
 *  - Live WYSIWYG preview rendered at real page size (A4 / US Letter) and
 *    auto-scaled to fit the screen.
 *  - Four premium templates (Modern, Classic, Minimal, Sidebar) plus accent
 *    colour, font, density and page-size controls.
 *  - Autosaves to localStorage; JSON import/export; one-click PDF via the
 *    browser print dialog (true vector, selectable text, ATS-friendly).
 *  100% in-browser — nothing is uploaded.
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Download,
  Upload,
  FileJson,
  RotateCcw,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Languages as LangIcon,
  Palette,
  LayoutTemplate,
  FileText,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Gauge,
  ListChecks,
  Heart,
  ListPlus,
} from "lucide-react";

/* ----------------------------- configuration ---------------------------- */
const LS_KEY = "shopyor.resume.v1";
const PX_PER_MM = 96 / 25.4;

const PAGES = {
  a4: { label: "A4", w: 210, h: 297, css: "A4" }, // mm
  letter: { label: "US Letter", w: 215.9, h: 279.4, css: "Letter" },
};

const ACCENTS = [
  { name: "Violet", value: "#7c3aed" },
  { name: "Blue", value: "#2563eb" },
  { name: "Teal", value: "#0d9488" },
  { name: "Emerald", value: "#059669" },
  { name: "Rose", value: "#e11d48" },
  { name: "Amber", value: "#d97706" },
  { name: "Slate", value: "#334155" },
  { name: "Black", value: "#111827" },
];

const FONTS = {
  sans: {
    label: "Sans (modern)",
    stack:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  serif: {
    label: "Serif (classic)",
    stack: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  },
  georgia: {
    label: "Georgia (elegant)",
    stack: 'Georgia, "Times New Roman", serif',
  },
};

const DENSITY = {
  compact: { label: "Compact", fs: 9.5, gap: 0.78 },
  normal: { label: "Normal", fs: 10.5, gap: 1 },
  relaxed: { label: "Relaxed", fs: 11.5, gap: 1.2 },
};

const TEMPLATES = [
  { key: "modern", label: "Modern" },
  { key: "classic", label: "Classic" },
  { key: "minimal", label: "Minimal" },
  { key: "sidebar", label: "Sidebar" },
];

/* ------------------------------- helpers -------------------------------- */
const uid = () => Math.random().toString(36).slice(2, 9);
const lines = (s) =>
  (s || "")
    .split("\n")
    .map((l) => l.replace(/^[-•\s]+/, "").trim())
    .filter(Boolean);
const tags = (s) =>
  (s || "")
    .split(/[,\n]/)
    .map((t) => t.trim())
    .filter(Boolean);

function fmtMonth(v) {
  if (!v) return "";
  // accepts "YYYY-MM" (month input) or free text
  const m = /^(\d{4})-(\d{2})$/.exec(v);
  if (!m) return v;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(m[2], 10) - 1]} ${m[1]}`;
}
const dateRange = (start, end, current) =>
  [fmtMonth(start), current ? "Present" : fmtMonth(end)].filter(Boolean).join(" — ");

/* ------------------------------ sample data ----------------------------- */
const SAMPLE = {
  basics: {
    fullName: "Alex Morgan",
    title: "Senior Product Designer",
    email: "alex.morgan@email.com",
    phone: "+1 (555) 240-1188",
    location: "San Francisco, CA",
    website: "alexmorgan.design",
    linkedin: "linkedin.com/in/alexmorgan",
    summary:
      "Product designer with 8+ years crafting intuitive, accessible interfaces for B2B and consumer apps. I turn complex workflows into clean, high-converting experiences and lead design systems used across cross-functional teams.",
    photo: null,
  },
  experience: [
    {
      id: uid(),
      role: "Senior Product Designer",
      company: "Northwind Labs",
      location: "San Francisco, CA",
      start: "2021-03",
      end: "",
      current: true,
      description:
        "Led the redesign of the core analytics dashboard, lifting weekly active use by 34%.\nBuilt and maintained a 60+ component design system adopted by 4 product teams.\nMentored 3 junior designers and ran the team's weekly design critique.",
    },
    {
      id: uid(),
      role: "Product Designer",
      company: "Brightwave",
      location: "Remote",
      start: "2018-06",
      end: "2021-02",
      current: false,
      description:
        "Shipped onboarding flows that cut time-to-first-value from 9 to 3 minutes.\nPartnered with engineering to deliver an accessible (WCAG AA) component library.",
    },
  ],
  education: [
    {
      id: uid(),
      degree: "B.A. in Interaction Design",
      school: "California College of the Arts",
      location: "San Francisco, CA",
      start: "2012-09",
      end: "2016-05",
      details: "Graduated with honors. President of the UX Society.",
    },
  ],
  skills:
    "Product Design, Figma, Design Systems, User Research, Prototyping, Accessibility, Usability Testing, HTML/CSS, Design Tokens, Data Visualization",
  projects: [
    {
      id: uid(),
      name: "Atlas Design System",
      link: "atlas.design",
      description:
        "Open-source design system with 120+ tokens and full dark-mode support; 2k+ GitHub stars.",
    },
  ],
  certifications: [
    { id: uid(), name: "Nielsen Norman UX Certification", issuer: "NN/g", date: "2022" },
  ],
  languages: [
    { id: uid(), name: "English", level: "Native" },
    { id: uid(), name: "Spanish", level: "Professional" },
  ],
  interests: "Typography, Open-source, Photography, Trail running",
  custom: [
    {
      id: uid(),
      title: "Awards",
      items: [
        {
          id: uid(),
          heading: "Designer of the Year",
          subheading: "Northwind Labs",
          date: "2023",
          text: "",
        },
      ],
    },
  ],
};

const EMPTY = {
  basics: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",
    photo: null,
  },
  experience: [],
  education: [],
  skills: "",
  projects: [],
  certifications: [],
  languages: [],
  interests: "",
  custom: [],
};

const DEFAULT_SETTINGS = {
  template: "modern",
  accent: "#7c3aed",
  font: "sans",
  density: "normal",
  pageSize: "a4",
  zoom: "fit",
  hidden: {},
};

/* sections that can be toggled on/off from the editor */
const TOGGLEABLE = [
  ["summary", "Summary"],
  ["experience", "Experience"],
  ["education", "Education"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["certifications", "Certifications"],
  ["languages", "Languages"],
  ["interests", "Interests"],
  ["custom", "Custom sections"],
];

/* Return a copy of the resume with hidden sections emptied, so the templates
   (which already skip empty sections) simply don't render them. */
function applyHidden(resume, hidden = {}) {
  const r = { ...resume, basics: { ...resume.basics } };
  if (hidden.summary) r.basics.summary = "";
  if (hidden.experience) r.experience = [];
  if (hidden.education) r.education = [];
  if (hidden.skills) r.skills = "";
  if (hidden.projects) r.projects = [];
  if (hidden.certifications) r.certifications = [];
  if (hidden.languages) r.languages = [];
  if (hidden.interests) r.interests = "";
  if (hidden.custom) r.custom = [];
  return r;
}

/* Lightweight, offline ATS / resume-quality score (0–100) + tips. */
const ACTION_VERBS = ["led","built","shipped","designed","launched","increased","reduced","improved","created","managed","drove","delivered","grew","optimized","developed","implemented","mentored","owned","scaled","automated","streamlined","negotiated","achieved","produced","spearheaded"];
function computeATS(resume) {
  const b = resume.basics || {};
  const checks = [];
  const add = (ok, points, label, hint) => checks.push({ ok, points, label, hint });

  const allBullets = [...resume.experience, ...(resume.custom || []).flatMap((c) => c.items || [])]
    .map((x) => x.description || x.text || "")
    .join("\n");
  const bulletLines = lines(allBullets);
  const words = [b.summary, allBullets, resume.education.map((e) => e.details).join(" ")].join(" ").trim().split(/\s+/).filter(Boolean).length;

  add(!!b.email && !!b.phone, 12, "Email & phone", "Add both an email and phone number.");
  add(!!b.location, 5, "Location", "Add your city / region.");
  add(!!b.linkedin || !!b.website, 6, "Online presence", "Add a LinkedIn or portfolio link.");
  add((b.summary || "").trim().length >= 40 && (b.summary || "").length <= 700, 12, "Strong summary", "Write a 1–3 sentence professional summary.");
  add(resume.experience.length >= 1, 16, "Work experience", "Add at least one role.");
  add(bulletLines.length >= 3, 12, "Detailed bullets", "Add 3+ accomplishment bullet points.");
  add(/\d/.test(allBullets), 10, "Quantified impact", "Use numbers (%, $, counts) to show impact.");
  add(ACTION_VERBS.some((v) => new RegExp(`\\b${v}`, "i").test(allBullets)), 8, "Action verbs", "Start bullets with strong verbs (Led, Built, Increased…).");
  add(resume.education.length >= 1, 8, "Education", "Add your education.");
  add(tags(resume.skills).length >= 5, 8, "Skills (5+)", "List at least 5 relevant skills.");
  add(words >= 150 && words <= 950, 3, "Good length", words < 150 ? "Resume looks thin — add more detail." : "Resume is long — tighten it.");

  const score = Math.round(checks.filter((c) => c.ok).reduce((s, c) => s + c.points, 0));
  return { score, checks };
}

/* ============================ main component ============================= */
export default function ResumeBuilder() {
  const [resume, setResume] = useState(SAMPLE);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);
  const fileRef = useRef(null);

  /* ---- load saved state ---- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.resume) setResume({ ...EMPTY, ...saved.resume });
        if (saved.settings) setSettings({ ...DEFAULT_SETTINGS, ...saved.settings });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  /* ---- autosave (debounced) ---- */
  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify({ resume, settings }));
      } catch {
        /* storage full / blocked */
      }
    }, 400);
    return () => clearTimeout(t);
  }, [resume, settings, hydrated]);

  /* ---- update helpers ---- */
  const setBasics = (k, v) =>
    setResume((r) => ({ ...r, basics: { ...r.basics, [k]: v } }));
  const setField = (k, v) => setResume((r) => ({ ...r, [k]: v }));
  const addItem = (key, blank) =>
    setResume((r) => ({ ...r, [key]: [...r[key], { ...blank, id: uid() }] }));
  const updItem = (key, id, k, v) =>
    setResume((r) => ({
      ...r,
      [key]: r[key].map((it) => (it.id === id ? { ...it, [k]: v } : it)),
    }));
  const delItem = (key, id) =>
    setResume((r) => ({ ...r, [key]: r[key].filter((it) => it.id !== id) }));
  const moveItem = (key, id, dir) =>
    setResume((r) => {
      const arr = [...r[key]];
      const i = arr.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= arr.length) return r;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...r, [key]: arr };
    });
  const setSetting = (k, v) => setSettings((s) => ({ ...s, [k]: v }));
  const toggleHidden = (id) =>
    setSettings((s) => ({ ...s, hidden: { ...s.hidden, [id]: !s.hidden?.[id] } }));

  /* ---- custom sections (nested items) ---- */
  const addCustomItem = (cid) =>
    setResume((r) => ({
      ...r,
      custom: r.custom.map((c) =>
        c.id === cid ? { ...c, items: [...c.items, { id: uid(), heading: "", subheading: "", date: "", text: "" }] } : c,
      ),
    }));
  const updCustomItem = (cid, iid, k, v) =>
    setResume((r) => ({
      ...r,
      custom: r.custom.map((c) =>
        c.id === cid ? { ...c, items: c.items.map((it) => (it.id === iid ? { ...it, [k]: v } : it)) } : c,
      ),
    }));
  const delCustomItem = (cid, iid) =>
    setResume((r) => ({
      ...r,
      custom: r.custom.map((c) => (c.id === cid ? { ...c, items: c.items.filter((it) => it.id !== iid) } : c)),
    }));

  /* ---- ATS score ---- */
  const ats = useMemo(() => computeATS(resume), [resume]);

  /* ---- zoom ---- */
  const ZOOMS = [0.5, 0.75, 1, 1.25, 1.5];
  const stepZoom = (dir) => {
    const cur = settings.zoom === "fit" ? box.scale : Number(settings.zoom);
    let idx = ZOOMS.reduce((best, z, i) => (Math.abs(z - cur) < Math.abs(ZOOMS[best] - cur) ? i : best), 0);
    idx = Math.min(ZOOMS.length - 1, Math.max(0, idx + dir));
    setSetting("zoom", String(ZOOMS[idx]));
  };

  /* ---- photo upload (sidebar template) ---- */
  const onPhoto = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setBasics("photo", reader.result);
    reader.readAsDataURL(file);
  };

  /* ---- JSON import / export ---- */
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify({ resume, settings }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `resume-${(resume.basics.fullName || "data").toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const importJSON = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.resume) setResume({ ...EMPTY, ...data.resume });
        if (data.settings) setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
      } catch {
        alert("That file isn't a valid resume export.");
      }
    };
    reader.readAsText(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  const loadSample = () => setResume(SAMPLE);
  const clearAll = () => {
    if (confirm("Clear all resume content? This can't be undone.")) setResume(EMPTY);
  };

  const downloadPDF = () => window.print();

  /* ---- live preview scaling ---- */
  const wrapRef = useRef(null);
  const sheetRef = useRef(null);
  const [box, setBox] = useState({ scale: 1, w: 0, h: 0 });

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const sheet = sheetRef.current;
    if (!wrap || !sheet) return;
    const compute = () => {
      const natW = sheet.offsetWidth; // ignores transform
      const natH = sheet.offsetHeight;
      const avail = wrap.clientWidth - 1;
      const fit = Math.min(1, avail / natW);
      const scale = settings.zoom === "fit" ? fit : Number(settings.zoom) || fit;
      setBox({ scale, w: natW * scale, h: natH * scale });
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrap);
    ro.observe(sheet);
    return () => ro.disconnect();
  }, [resume, settings, hydrated]);

  const page = PAGES[settings.pageSize] || PAGES.a4;
  const sheetW = page.w * PX_PER_MM;
  const sheetMinH = page.h * PX_PER_MM;
  const densityCfg = DENSITY[settings.density];
  const sheetStyle = {
    width: sheetW,
    minHeight: sheetMinH,
    fontFamily: FONTS[settings.font].stack,
    fontSize: `${densityCfg.fs}pt`,
    lineHeight: 1.4,
    "--accent": settings.accent,
    "--gap": `${densityCfg.gap}em`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* print rules — a natural-size copy of the sheet is portalled to <body>
          (#rb-print-portal). On screen it's hidden; in print everything else
          is hidden so only the resume prints, flowing into as many pages as
          its content needs (no repeats, no blank trailing pages). */}
      <style>{`
        #rb-print-portal { display: none; }
        @media print {
          @page { size: ${page.css}; margin: 0; }
          html, body { background: #fff !important; }
          body > *:not(#rb-print-portal) { display: none !important; }
          #rb-print-portal { display: block !important; }
          #rb-print-portal .rb-sheet { box-shadow: none !important; }
        }
      `}</style>

      <div className="rb-no-print mx-auto max-w-[1500px] px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-5 text-sm text-gray-500 dark:text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-violet-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/tools" className="hover:text-violet-600">Tools</Link></li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">Resume Builder</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-700 dark:text-violet-300">
            <Sparkles className="h-4 w-4" />
            100% Browser-Based — your data never leaves this device
          </div>
          <h1 className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
            Free Resume Builder
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Fill in your details, pick a premium template, and export a print-perfect,
            ATS-friendly PDF — free, instant, no sign-up.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
          {/* ============== LEFT: editor ============== */}
          <div className="space-y-5">
            {/* Toolbar */}
            <Card>
              <div className="flex flex-wrap items-center gap-2">
                <PrimaryButton onClick={downloadPDF}>
                  <Download className="h-4 w-4" /> Download PDF
                </PrimaryButton>
                <GhostButton onClick={exportJSON}>
                  <FileJson className="h-4 w-4" /> Save JSON
                </GhostButton>
                <GhostButton onClick={() => fileRef.current?.click()}>
                  <Upload className="h-4 w-4" /> Import
                </GhostButton>
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={(e) => importJSON(e.target.files?.[0])}
                />
                <div className="ml-auto flex items-center gap-2">
                  <GhostButton onClick={loadSample}>
                    <RotateCcw className="h-4 w-4" /> Sample
                  </GhostButton>
                  <GhostButton onClick={clearAll} danger>
                    <Trash2 className="h-4 w-4" /> Clear
                  </GhostButton>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Your progress saves automatically in this browser.
              </p>
            </Card>

            {/* ATS score */}
            <ATSPanel ats={ats} />

            {/* Design controls */}
            <Section icon={<Palette className="h-5 w-5" />} title="Design">
              <div className="space-y-4">
                <div>
                  <Label>Template</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {TEMPLATES.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setSetting("template", t.key)}
                        className={`rounded-lg border px-2 py-2 text-xs font-medium transition ${
                          settings.template === t.key
                            ? "border-violet-500 bg-violet-500/10 text-violet-700 dark:text-violet-300"
                            : "border-gray-200 text-gray-600 hover:border-violet-300 dark:border-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Accent color</Label>
                  <div className="flex flex-wrap items-center gap-2">
                    {ACCENTS.map((a) => (
                      <button
                        key={a.value}
                        title={a.name}
                        onClick={() => setSetting("accent", a.value)}
                        className={`h-7 w-7 rounded-full ring-2 ring-offset-2 ring-offset-white transition dark:ring-offset-gray-900 ${
                          settings.accent === a.value ? "ring-violet-500" : "ring-transparent"
                        }`}
                        style={{ backgroundColor: a.value }}
                      />
                    ))}
                    <label className="relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border border-dashed border-gray-300 dark:border-gray-600">
                      <input
                        type="color"
                        value={settings.accent}
                        onChange={(e) => setSetting("accent", e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <Plus className="absolute inset-0 m-auto h-4 w-4 text-gray-400" />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Font</Label>
                    <Select value={settings.font} onChange={(v) => setSetting("font", v)}>
                      {Object.entries(FONTS).map(([k, f]) => (
                        <option key={k} value={k}>{f.label}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label>Density</Label>
                    <Select value={settings.density} onChange={(v) => setSetting("density", v)}>
                      {Object.entries(DENSITY).map(([k, d]) => (
                        <option key={k} value={k}>{d.label}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Label>Page</Label>
                    <Select value={settings.pageSize} onChange={(v) => setSetting("pageSize", v)}>
                      {Object.entries(PAGES).map(([k, p]) => (
                        <option key={k} value={k}>{p.label}</option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Sections (tap to show / hide)</Label>
                  <div className="flex flex-wrap gap-2">
                    {TOGGLEABLE.map(([id, label]) => {
                      const on = !settings.hidden?.[id];
                      return (
                        <button
                          key={id}
                          onClick={() => toggleHidden(id)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition ${
                            on
                              ? "border-violet-500/40 bg-violet-500/10 text-violet-700 dark:text-violet-300"
                              : "border-gray-200 text-gray-400 line-through dark:border-gray-700"
                          }`}
                        >
                          {on ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Section>

            {/* Contact / basics */}
            <Section icon={<User className="h-5 w-5" />} title="Personal details">
              <div className="grid grid-cols-2 gap-3">
                <Input className="col-span-2" label="Full name" value={resume.basics.fullName} onChange={(v) => setBasics("fullName", v)} placeholder="Jane Doe" />
                <Input className="col-span-2" label="Professional title" value={resume.basics.title} onChange={(v) => setBasics("title", v)} placeholder="Marketing Manager" />
                <Input label="Email" value={resume.basics.email} onChange={(v) => setBasics("email", v)} placeholder="jane@email.com" />
                <Input label="Phone" value={resume.basics.phone} onChange={(v) => setBasics("phone", v)} placeholder="+1 555 123 4567" />
                <Input label="Location" value={resume.basics.location} onChange={(v) => setBasics("location", v)} placeholder="City, Country" />
                <Input label="Website" value={resume.basics.website} onChange={(v) => setBasics("website", v)} placeholder="yoursite.com" />
                <Input className="col-span-2" label="LinkedIn" value={resume.basics.linkedin} onChange={(v) => setBasics("linkedin", v)} placeholder="linkedin.com/in/you" />
              </div>
              {settings.template === "sidebar" && (
                <div className="mt-3">
                  <Label>Photo (sidebar template)</Label>
                  <div className="flex items-center gap-3">
                    {resume.basics.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={resume.basics.photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                    )}
                    <GhostButton onClick={() => document.getElementById("rb-photo")?.click()}>
                      <Upload className="h-4 w-4" /> {resume.basics.photo ? "Change" : "Upload"}
                    </GhostButton>
                    {resume.basics.photo && (
                      <GhostButton onClick={() => setBasics("photo", null)} danger>Remove</GhostButton>
                    )}
                    <input id="rb-photo" type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
                  </div>
                </div>
              )}
            </Section>

            {/* Summary */}
            <Section icon={<FileText className="h-5 w-5" />} title="Professional summary">
              <TextArea
                rows={4}
                value={resume.basics.summary}
                onChange={(v) => setBasics("summary", v)}
                placeholder="2–3 sentences highlighting who you are, your strengths and what you're looking for."
              />
            </Section>

            {/* Experience */}
            <Section
              icon={<Briefcase className="h-5 w-5" />}
              title="Work experience"
              action={<AddButton onClick={() => addItem("experience", { role: "", company: "", location: "", start: "", end: "", current: false, description: "" })} />}
            >
              <Repeatable
                items={resume.experience}
                empty="No experience yet — add your most recent role first."
                onMove={(id, d) => moveItem("experience", id, d)}
                onDelete={(id) => delItem("experience", id)}
                heading={(it) => it.role || it.company || "New role"}
                sub={(it) => [it.company, dateRange(it.start, it.end, it.current)].filter(Boolean).join(" · ")}
                render={(it) => (
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Job title" value={it.role} onChange={(v) => updItem("experience", it.id, "role", v)} />
                    <Input label="Company" value={it.company} onChange={(v) => updItem("experience", it.id, "company", v)} />
                    <Input label="Location" value={it.location} onChange={(v) => updItem("experience", it.id, "location", v)} />
                    <div />
                    <MonthInput label="Start" value={it.start} onChange={(v) => updItem("experience", it.id, "start", v)} />
                    <MonthInput label="End" value={it.end} disabled={it.current} onChange={(v) => updItem("experience", it.id, "end", v)} />
                    <label className="col-span-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <input type="checkbox" checked={it.current} onChange={(e) => updItem("experience", it.id, "current", e.target.checked)} className="h-4 w-4 accent-violet-600" />
                      I currently work here
                    </label>
                    <div className="col-span-2">
                      <Label>Highlights <span className="font-normal text-gray-400">(one per line)</span></Label>
                      <TextArea rows={4} value={it.description} onChange={(v) => updItem("experience", it.id, "description", v)} placeholder={"Increased X by Y%\nLed a team of N to ship…"} />
                    </div>
                  </div>
                )}
              />
            </Section>

            {/* Education */}
            <Section
              icon={<GraduationCap className="h-5 w-5" />}
              title="Education"
              action={<AddButton onClick={() => addItem("education", { degree: "", school: "", location: "", start: "", end: "", details: "" })} />}
            >
              <Repeatable
                items={resume.education}
                empty="Add your degrees, diplomas or courses."
                onMove={(id, d) => moveItem("education", id, d)}
                onDelete={(id) => delItem("education", id)}
                heading={(it) => it.degree || it.school || "New entry"}
                sub={(it) => [it.school, dateRange(it.start, it.end, false)].filter(Boolean).join(" · ")}
                render={(it) => (
                  <div className="grid grid-cols-2 gap-3">
                    <Input className="col-span-2" label="Degree / certificate" value={it.degree} onChange={(v) => updItem("education", it.id, "degree", v)} />
                    <Input label="School" value={it.school} onChange={(v) => updItem("education", it.id, "school", v)} />
                    <Input label="Location" value={it.location} onChange={(v) => updItem("education", it.id, "location", v)} />
                    <MonthInput label="Start" value={it.start} onChange={(v) => updItem("education", it.id, "start", v)} />
                    <MonthInput label="End" value={it.end} onChange={(v) => updItem("education", it.id, "end", v)} />
                    <div className="col-span-2">
                      <Label>Details <span className="font-normal text-gray-400">(optional)</span></Label>
                      <TextArea rows={2} value={it.details} onChange={(v) => updItem("education", it.id, "details", v)} placeholder="GPA, honors, relevant coursework…" />
                    </div>
                  </div>
                )}
              />
            </Section>

            {/* Skills */}
            <Section icon={<Wrench className="h-5 w-5" />} title="Skills">
              <Label>Separate with commas or new lines</Label>
              <TextArea rows={3} value={resume.skills} onChange={(v) => setField("skills", v)} placeholder="Project Management, Figma, SQL, Public Speaking" />
            </Section>

            {/* Interests */}
            <Section icon={<Heart className="h-5 w-5" />} title="Interests">
              <Label>Separate with commas or new lines</Label>
              <TextArea rows={2} value={resume.interests} onChange={(v) => setField("interests", v)} placeholder="Photography, Chess, Hiking" />
            </Section>

            {/* Projects */}
            <Section
              icon={<FolderGit2 className="h-5 w-5" />}
              title="Projects"
              action={<AddButton onClick={() => addItem("projects", { name: "", link: "", description: "" })} />}
            >
              <Repeatable
                items={resume.projects}
                empty="Showcase side projects, portfolios or notable work (optional)."
                onMove={(id, d) => moveItem("projects", id, d)}
                onDelete={(id) => delItem("projects", id)}
                heading={(it) => it.name || "New project"}
                sub={(it) => it.link}
                render={(it) => (
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Name" value={it.name} onChange={(v) => updItem("projects", it.id, "name", v)} />
                    <Input label="Link" value={it.link} onChange={(v) => updItem("projects", it.id, "link", v)} />
                    <div className="col-span-2">
                      <Label>Description</Label>
                      <TextArea rows={2} value={it.description} onChange={(v) => updItem("projects", it.id, "description", v)} />
                    </div>
                  </div>
                )}
              />
            </Section>

            {/* Certifications */}
            <Section
              icon={<Award className="h-5 w-5" />}
              title="Certifications"
              action={<AddButton onClick={() => addItem("certifications", { name: "", issuer: "", date: "" })} />}
            >
              <Repeatable
                items={resume.certifications}
                empty="List licenses or certifications (optional)."
                onMove={(id, d) => moveItem("certifications", id, d)}
                onDelete={(id) => delItem("certifications", id)}
                heading={(it) => it.name || "New certification"}
                sub={(it) => [it.issuer, it.date].filter(Boolean).join(" · ")}
                render={(it) => (
                  <div className="grid grid-cols-2 gap-3">
                    <Input className="col-span-2" label="Name" value={it.name} onChange={(v) => updItem("certifications", it.id, "name", v)} />
                    <Input label="Issuer" value={it.issuer} onChange={(v) => updItem("certifications", it.id, "issuer", v)} />
                    <Input label="Year" value={it.date} onChange={(v) => updItem("certifications", it.id, "date", v)} />
                  </div>
                )}
              />
            </Section>

            {/* Languages */}
            <Section
              icon={<LangIcon className="h-5 w-5" />}
              title="Languages"
              action={<AddButton onClick={() => addItem("languages", { name: "", level: "" })} />}
            >
              <Repeatable
                items={resume.languages}
                empty="Add languages you speak (optional)."
                onMove={(id, d) => moveItem("languages", id, d)}
                onDelete={(id) => delItem("languages", id)}
                heading={(it) => it.name || "New language"}
                sub={(it) => it.level}
                render={(it) => (
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Language" value={it.name} onChange={(v) => updItem("languages", it.id, "name", v)} />
                    <Input label="Proficiency" value={it.level} onChange={(v) => updItem("languages", it.id, "level", v)} placeholder="Native / Fluent / B2" />
                  </div>
                )}
              />
            </Section>

            {/* Custom sections */}
            <Section
              icon={<ListPlus className="h-5 w-5" />}
              title="Custom sections"
              action={<AddButton onClick={() => addItem("custom", { title: "New Section", items: [{ id: uid(), heading: "", subheading: "", date: "", text: "" }] })} />}
            >
              {resume.custom.length === 0 ? (
                <p className="rounded-lg border border-dashed border-gray-200 px-3 py-4 text-center text-sm text-gray-400 dark:border-gray-700">
                  Add any extra section — Awards, Publications, Volunteering, References…
                </p>
              ) : (
                <div className="space-y-3">
                  {resume.custom.map((c) => (
                    <div key={c.id} className="rounded-xl border border-gray-200 p-3 dark:border-gray-700">
                      <div className="mb-2 flex items-center gap-2">
                        <input
                          value={c.title}
                          onChange={(e) => updItem("custom", c.id, "title", e.target.value)}
                          placeholder="Section title (e.g. Awards)"
                          className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800"
                        />
                        <IconBtn title="Delete section" danger onClick={() => delItem("custom", c.id)}><Trash2 className="h-4 w-4" /></IconBtn>
                      </div>
                      <div className="space-y-3">
                        {c.items.map((it) => (
                          <div key={it.id} className="rounded-lg bg-gray-50 p-2.5 dark:bg-gray-800/50">
                            <div className="grid grid-cols-2 gap-2">
                              <Input label="Heading" value={it.heading} onChange={(v) => updCustomItem(c.id, it.id, "heading", v)} />
                              <Input label="Date" value={it.date} onChange={(v) => updCustomItem(c.id, it.id, "date", v)} />
                              <Input className="col-span-2" label="Subheading" value={it.subheading} onChange={(v) => updCustomItem(c.id, it.id, "subheading", v)} />
                              <div className="col-span-2">
                                <Label>Details <span className="font-normal text-gray-400">(one per line, optional)</span></Label>
                                <TextArea rows={2} value={it.text} onChange={(v) => updCustomItem(c.id, it.id, "text", v)} />
                              </div>
                            </div>
                            <div className="mt-1 text-right">
                              <button onClick={() => delCustomItem(c.id, it.id)} className="text-xs text-red-500 hover:text-red-600">Remove item</button>
                            </div>
                          </div>
                        ))}
                        <button onClick={() => addCustomItem(c.id)} className="inline-flex items-center gap-1 rounded-lg bg-violet-600/10 px-2.5 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-600/20 dark:text-violet-300">
                          <Plus className="h-3.5 w-3.5" /> Add item
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          </div>

          {/* ============== RIGHT: live preview ============== */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <Eye className="h-4 w-4" /> Live preview
              </span>
              <div className="flex items-center gap-1">
                <IconBtn title="Zoom out" onClick={() => stepZoom(-1)}><ZoomOut className="h-4 w-4" /></IconBtn>
                <button
                  onClick={() => setSetting("zoom", "fit")}
                  title="Fit to width"
                  className={`min-w-[3.2rem] rounded-lg px-2 py-1 text-xs font-medium transition ${
                    settings.zoom === "fit"
                      ? "bg-violet-600/10 text-violet-700 dark:text-violet-300"
                      : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {settings.zoom === "fit" ? "Fit" : `${Math.round(box.scale * 100)}%`}
                </button>
                <IconBtn title="Zoom in" onClick={() => stepZoom(1)}><ZoomIn className="h-4 w-4" /></IconBtn>
              </div>
            </div>
            <div
              ref={wrapRef}
              className="max-h-[82vh] overflow-auto rounded-2xl border border-gray-200 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)] [background-size:18px_18px] p-4 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="rb-spacer relative mx-auto" style={{ width: box.w || sheetW, height: box.h || sheetMinH }}>
                <div className="absolute left-0 top-0">
                  <div
                    ref={sheetRef}
                    className="rb-sheet origin-top-left bg-white text-gray-900 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)]"
                    style={{ ...sheetStyle, transform: `scale(${box.scale})` }}
                  >
                    <ResumeSheet resume={resume} settings={settings} />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-gray-400">
              The preview is exactly what prints. Use <strong>Download PDF</strong> →
              “Save as PDF”.
            </p>
          </div>
        </div>

        {/* SEO content */}
        <div className="rb-no-print mt-16 grid gap-6 rounded-2xl bg-gradient-to-r from-violet-50 to-blue-50 p-8 dark:from-violet-900/20 dark:to-blue-900/20 md:grid-cols-3">
          <Feature icon="🎨" title="Premium templates">
            Four recruiter-ready designs — Modern, Classic, Minimal and Sidebar — with full
            color and font control.
          </Feature>
          <Feature icon="🔒" title="Private & instant">
            Everything runs in your browser and autosaves locally. No account, no uploads, no
            watermark.
          </Feature>
          <Feature icon="📄" title="ATS-friendly PDF">
            Export crisp, selectable-text PDFs that applicant tracking systems can actually
            read.
          </Feature>
        </div>
      </div>

      {/* print-only copy, portalled to <body> at natural page size */}
      {hydrated &&
        createPortal(
          <div id="rb-print-portal">
            <div className="rb-sheet bg-white text-gray-900" style={sheetStyle}>
              <ResumeSheet resume={resume} settings={settings} />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

/* ============================ resume templates =========================== */
function ResumeSheet({ resume, settings }) {
  const view = applyHidden(resume, settings.hidden);
  switch (settings.template) {
    case "classic":
      return <TemplateClassic resume={view} />;
    case "minimal":
      return <TemplateMinimal resume={view} />;
    case "sidebar":
      return <TemplateSidebar resume={view} />;
    default:
      return <TemplateModern resume={view} />;
  }
}

/* custom sections + interests, rendered with the active template's heading */
function Extras({ resume, H }) {
  const customs = (resume.custom || []).filter(
    (c) => (c.items || []).some((i) => i.heading || i.text) || (c.title && (c.items || []).length),
  );
  const hasInterests = tags(resume.interests).length > 0;
  if (!customs.length && !hasInterests) return null;
  return (
    <>
      {customs.map((c) => (
        <section key={c.id}>
          <H>{c.title || "Section"}</H>
          {(c.items || []).map((it) => (
            <div key={it.id} style={{ marginBottom: "0.4em", breakInside: "avoid" }}>
              {(it.heading || it.subheading || it.date) && (
                <EntryHead left={it.heading} right={it.date} sub={it.subheading} />
              )}
              {it.text && <Bullets text={it.text} />}
            </div>
          ))}
        </section>
      ))}
      {hasInterests && (
        <section>
          <H>Interests</H>
          <div>{tags(resume.interests).join("  ·  ")}</div>
        </section>
      )}
    </>
  );
}

/* shared bits ----------------------------------------------------------- */
const PAD = "13mm";

function ContactRow({ b, sep = "•", className = "", style }) {
  const items = [
    b.email && { icon: Mail, text: b.email },
    b.phone && { icon: Phone, text: b.phone },
    b.location && { icon: MapPin, text: b.location },
    b.website && { icon: Globe, text: b.website },
    b.linkedin && { icon: Linkedin, text: b.linkedin },
  ].filter(Boolean);
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`} style={style}>
      {items.map((it, i) => {
        const Icon = it.icon;
        return (
          <span key={i} className="inline-flex items-center gap-1">
            <Icon style={{ width: "1em", height: "1em", opacity: 0.7 }} />
            <span>{it.text}</span>
            {sep && i < items.length - 1 && <span style={{ opacity: 0.35, marginLeft: "0.4em" }}>{sep}</span>}
          </span>
        );
      })}
    </div>
  );
}

const Bullets = ({ text, style }) => {
  const items = lines(text);
  if (!items.length) return null;
  return (
    <ul style={{ margin: "0.35em 0 0", paddingLeft: "1.1em", listStyle: "disc", ...style }}>
      {items.map((l, i) => (
        <li key={i} style={{ marginBottom: "0.2em" }}>{l}</li>
      ))}
    </ul>
  );
};

function EntryHead({ left, right, sub, subRight }) {
  return (
    <div style={{ marginBottom: "0.15em" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1em", alignItems: "baseline" }}>
        <span style={{ fontWeight: 700 }}>{left}</span>
        {right && <span style={{ fontSize: "0.85em", opacity: 0.7, whiteSpace: "nowrap" }}>{right}</span>}
      </div>
      {(sub || subRight) && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1em", fontSize: "0.92em", color: "var(--accent)" }}>
          <span style={{ fontWeight: 600 }}>{sub}</span>
          {subRight && <span style={{ opacity: 0.7, color: "#555", whiteSpace: "nowrap" }}>{subRight}</span>}
        </div>
      )}
    </div>
  );
}

/* ---- Modern -------------------------------------------------------------- */
function TemplateModern({ resume }) {
  const b = resume.basics;
  const H = ({ children }) => (
    <h3 style={{ display: "flex", alignItems: "center", gap: "0.5em", margin: "var(--gap) 0 0.4em", fontSize: "0.82em", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
      <span style={{ width: "1.4em", height: "0.18em", background: "var(--accent)", borderRadius: "2px" }} />
      {children}
    </h3>
  );
  return (
    <div style={{ padding: PAD }}>
      <header style={{ borderBottom: "2px solid var(--accent)", paddingBottom: "0.6em", marginBottom: "0.3em" }}>
        <h1 style={{ fontSize: "2.1em", fontWeight: 800, lineHeight: 1.05 }}>{b.fullName || "Your Name"}</h1>
        {b.title && <div style={{ fontSize: "1.05em", fontWeight: 600, color: "var(--accent)", marginTop: "0.1em" }}>{b.title}</div>}
        <ContactRow b={b} className="" style={{ marginTop: "0.5em", fontSize: "0.84em", color: "#444" }} />
      </header>

      {b.summary && <p style={{ marginTop: "0.6em" }}>{b.summary}</p>}

      {resume.experience.length > 0 && (
        <section>
          <H>Experience</H>
          {resume.experience.map((it) => (
            <div key={it.id} style={{ marginBottom: "0.6em", breakInside: "avoid" }}>
              <EntryHead left={it.role} right={dateRange(it.start, it.end, it.current)} sub={it.company} subRight={it.location} />
              <Bullets text={it.description} />
            </div>
          ))}
        </section>
      )}

      {resume.education.length > 0 && (
        <section>
          <H>Education</H>
          {resume.education.map((it) => (
            <div key={it.id} style={{ marginBottom: "0.45em", breakInside: "avoid" }}>
              <EntryHead left={it.degree} right={dateRange(it.start, it.end, false)} sub={it.school} subRight={it.location} />
              {it.details && <div style={{ fontSize: "0.92em", color: "#444" }}>{it.details}</div>}
            </div>
          ))}
        </section>
      )}

      {tags(resume.skills).length > 0 && (
        <section>
          <H>Skills</H>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4em" }}>
            {tags(resume.skills).map((s, i) => (
              <span key={i} style={{ background: "color-mix(in srgb, var(--accent) 12%, white)", color: "var(--accent)", padding: "0.18em 0.6em", borderRadius: "999px", fontSize: "0.85em", fontWeight: 600 }}>{s}</span>
            ))}
          </div>
        </section>
      )}

      {resume.projects.length > 0 && (
        <section>
          <H>Projects</H>
          {resume.projects.map((it) => (
            <div key={it.id} style={{ marginBottom: "0.4em", breakInside: "avoid" }}>
              <EntryHead left={it.name} right={it.link} />
              {it.description && <div style={{ fontSize: "0.95em" }}>{it.description}</div>}
            </div>
          ))}
        </section>
      )}

      <TwoUp resume={resume} />
      <Extras resume={resume} H={H} />
    </div>
  );
}

function TwoUp({ resume }) {
  const hasCerts = resume.certifications.length > 0;
  const hasLangs = resume.languages.length > 0;
  if (!hasCerts && !hasLangs) return null;
  const H = ({ children }) => (
    <h3 style={{ margin: "var(--gap) 0 0.3em", fontSize: "0.82em", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>{children}</h3>
  );
  return (
    <div style={{ display: "flex", gap: "1.5em" }}>
      {hasCerts && (
        <section style={{ flex: 1 }}>
          <H>Certifications</H>
          {resume.certifications.map((c) => (
            <div key={c.id} style={{ marginBottom: "0.25em" }}>
              <span style={{ fontWeight: 600 }}>{c.name}</span>
              {(c.issuer || c.date) && <span style={{ fontSize: "0.9em", color: "#555" }}> — {[c.issuer, c.date].filter(Boolean).join(", ")}</span>}
            </div>
          ))}
        </section>
      )}
      {hasLangs && (
        <section style={{ flex: 1 }}>
          <H>Languages</H>
          {resume.languages.map((l) => (
            <div key={l.id} style={{ marginBottom: "0.25em" }}>
              <span style={{ fontWeight: 600 }}>{l.name}</span>
              {l.level && <span style={{ fontSize: "0.9em", color: "#555" }}> — {l.level}</span>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

/* ---- Classic (ATS-safe, centered serif) --------------------------------- */
function TemplateClassic({ resume }) {
  const b = resume.basics;
  const H = ({ children }) => (
    <h3 style={{ margin: "var(--gap) 0 0.35em", fontSize: "0.9em", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid #cbd5e1", paddingBottom: "0.15em" }}>{children}</h3>
  );
  return (
    <div style={{ padding: PAD }}>
      <header style={{ textAlign: "center", marginBottom: "0.4em" }}>
        <h1 style={{ fontSize: "2em", fontWeight: 700, letterSpacing: "0.02em" }}>{b.fullName || "Your Name"}</h1>
        {b.title && <div style={{ fontSize: "1em", fontWeight: 600, marginTop: "0.1em" }}>{b.title}</div>}
        <div style={{ marginTop: "0.4em", fontSize: "0.85em", color: "#333", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.6em" }}>
          {[b.email, b.phone, b.location, b.website, b.linkedin].filter(Boolean).map((t, i, a) => (
            <span key={i}>{t}{i < a.length - 1 ? "  |" : ""}</span>
          ))}
        </div>
      </header>

      {b.summary && (<><H>Summary</H><p>{b.summary}</p></>)}

      {resume.experience.length > 0 && (
        <><H>Experience</H>
          {resume.experience.map((it) => (
            <div key={it.id} style={{ marginBottom: "0.55em", breakInside: "avoid" }}>
              <EntryHead left={it.role} right={dateRange(it.start, it.end, it.current)} sub={it.company} subRight={it.location} />
              <Bullets text={it.description} />
            </div>
          ))}
        </>
      )}

      {resume.education.length > 0 && (
        <><H>Education</H>
          {resume.education.map((it) => (
            <div key={it.id} style={{ marginBottom: "0.4em", breakInside: "avoid" }}>
              <EntryHead left={it.degree} right={dateRange(it.start, it.end, false)} sub={it.school} subRight={it.location} />
              {it.details && <div style={{ fontSize: "0.92em", color: "#444" }}>{it.details}</div>}
            </div>
          ))}
        </>
      )}

      {tags(resume.skills).length > 0 && (
        <><H>Skills</H><p>{tags(resume.skills).join(" · ")}</p></>
      )}

      {resume.projects.length > 0 && (
        <><H>Projects</H>
          {resume.projects.map((it) => (
            <div key={it.id} style={{ marginBottom: "0.3em" }}>
              <span style={{ fontWeight: 700 }}>{it.name}</span>
              {it.link && <span style={{ fontSize: "0.9em", color: "#555" }}> ({it.link})</span>}
              {it.description && <div style={{ fontSize: "0.95em" }}>{it.description}</div>}
            </div>
          ))}
        </>
      )}

      {resume.certifications.length > 0 && (
        <><H>Certifications</H>
          {resume.certifications.map((c) => (
            <div key={c.id}>{c.name}{(c.issuer || c.date) && ` — ${[c.issuer, c.date].filter(Boolean).join(", ")}`}</div>
          ))}
        </>
      )}

      {resume.languages.length > 0 && (
        <><H>Languages</H><p>{resume.languages.map((l) => [l.name, l.level].filter(Boolean).join(" (") + (l.level ? ")" : "")).join(" · ")}</p></>
      )}

      <Extras resume={resume} H={H} />
    </div>
  );
}

/* ---- Minimal ------------------------------------------------------------- */
function TemplateMinimal({ resume }) {
  const b = resume.basics;
  const H = ({ children }) => (
    <h3 style={{ margin: "var(--gap) 0 0.3em", fontSize: "0.78em", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9ca3af" }}>{children}</h3>
  );
  return (
    <div style={{ padding: PAD }}>
      <header style={{ marginBottom: "0.5em" }}>
        <h1 style={{ fontSize: "1.9em", fontWeight: 700 }}>{b.fullName || "Your Name"}</h1>
        {b.title && <div style={{ fontSize: "1em", color: "#555", marginTop: "0.05em" }}>{b.title}</div>}
        <ContactRow b={b} sep="" style={{ marginTop: "0.45em", fontSize: "0.82em", color: "#555", gap: "1.1em" }} />
        <div style={{ height: "1px", background: "#e5e7eb", marginTop: "0.7em" }} />
      </header>

      {b.summary && <p style={{ color: "#374151" }}>{b.summary}</p>}

      {resume.experience.length > 0 && (
        <section><H>Experience</H>
          {resume.experience.map((it) => (
            <div key={it.id} style={{ marginBottom: "0.55em", breakInside: "avoid" }}>
              <EntryHead left={it.role} right={dateRange(it.start, it.end, it.current)} sub={it.company} subRight={it.location} />
              <Bullets text={it.description} style={{ color: "#374151" }} />
            </div>
          ))}
        </section>
      )}

      {resume.education.length > 0 && (
        <section><H>Education</H>
          {resume.education.map((it) => (
            <div key={it.id} style={{ marginBottom: "0.4em", breakInside: "avoid" }}>
              <EntryHead left={it.degree} right={dateRange(it.start, it.end, false)} sub={it.school} subRight={it.location} />
              {it.details && <div style={{ fontSize: "0.92em", color: "#555" }}>{it.details}</div>}
            </div>
          ))}
        </section>
      )}

      {tags(resume.skills).length > 0 && (
        <section><H>Skills</H><div style={{ color: "#374151" }}>{tags(resume.skills).join("   ·   ")}</div></section>
      )}

      {resume.projects.length > 0 && (
        <section><H>Projects</H>
          {resume.projects.map((it) => (
            <div key={it.id} style={{ marginBottom: "0.3em" }}>
              <EntryHead left={it.name} right={it.link} />
              {it.description && <div style={{ fontSize: "0.95em", color: "#374151" }}>{it.description}</div>}
            </div>
          ))}
        </section>
      )}

      <TwoUpPlain resume={resume} />
      <Extras resume={resume} H={H} />
    </div>
  );
}

function TwoUpPlain({ resume }) {
  const hasCerts = resume.certifications.length > 0;
  const hasLangs = resume.languages.length > 0;
  if (!hasCerts && !hasLangs) return null;
  const H = ({ children }) => (
    <h3 style={{ margin: "var(--gap) 0 0.3em", fontSize: "0.78em", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9ca3af" }}>{children}</h3>
  );
  return (
    <div style={{ display: "flex", gap: "1.5em" }}>
      {hasCerts && (
        <section style={{ flex: 1 }}><H>Certifications</H>
          {resume.certifications.map((c) => (<div key={c.id} style={{ marginBottom: "0.2em", color: "#374151" }}>{c.name}{(c.issuer || c.date) && <span style={{ color: "#777" }}> — {[c.issuer, c.date].filter(Boolean).join(", ")}</span>}</div>))}
        </section>
      )}
      {hasLangs && (
        <section style={{ flex: 1 }}><H>Languages</H>
          {resume.languages.map((l) => (<div key={l.id} style={{ marginBottom: "0.2em", color: "#374151" }}>{l.name}{l.level && <span style={{ color: "#777" }}> — {l.level}</span>}</div>))}
        </section>
      )}
    </div>
  );
}

/* ---- Sidebar ------------------------------------------------------------- */
function TemplateSidebar({ resume }) {
  const b = resume.basics;
  const SideH = ({ children }) => (
    <h3 style={{ margin: "1.1em 0 0.4em", fontSize: "0.78em", fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>{children}</h3>
  );
  const MainH = ({ children }) => (
    <h3 style={{ margin: "var(--gap) 0 0.4em", fontSize: "0.82em", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>{children}</h3>
  );
  return (
    <div style={{ display: "flex", minHeight: "inherit" }}>
      {/* sidebar */}
      <aside style={{ width: "34%", background: "var(--accent)", color: "#fff", padding: "11mm 8mm", display: "flex", flexDirection: "column" }}>
        {b.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={b.photo} alt="" style={{ width: "5.2em", height: "5.2em", borderRadius: "999px", objectFit: "cover", border: "3px solid rgba(255,255,255,0.5)", marginBottom: "0.8em" }} />
        )}
        <h1 style={{ fontSize: "1.55em", fontWeight: 800, lineHeight: 1.1 }}>{b.fullName || "Your Name"}</h1>
        {b.title && <div style={{ fontSize: "0.95em", opacity: 0.9, marginTop: "0.15em" }}>{b.title}</div>}

        <SideH>Contact</SideH>
        <div style={{ fontSize: "0.82em", display: "flex", flexDirection: "column", gap: "0.35em" }}>
          {b.email && <span style={{ wordBreak: "break-word" }}>✉ {b.email}</span>}
          {b.phone && <span>☎ {b.phone}</span>}
          {b.location && <span>📍 {b.location}</span>}
          {b.website && <span style={{ wordBreak: "break-word" }}>🌐 {b.website}</span>}
          {b.linkedin && <span style={{ wordBreak: "break-word" }}>in {b.linkedin}</span>}
        </div>

        {tags(resume.skills).length > 0 && (
          <>
            <SideH>Skills</SideH>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35em" }}>
              {tags(resume.skills).map((s, i) => (
                <span key={i} style={{ background: "rgba(255,255,255,0.18)", padding: "0.15em 0.55em", borderRadius: "999px", fontSize: "0.8em" }}>{s}</span>
              ))}
            </div>
          </>
        )}

        {resume.languages.length > 0 && (
          <>
            <SideH>Languages</SideH>
            <div style={{ fontSize: "0.82em", display: "flex", flexDirection: "column", gap: "0.25em" }}>
              {resume.languages.map((l) => (<span key={l.id}>{l.name}{l.level && ` · ${l.level}`}</span>))}
            </div>
          </>
        )}

        {resume.certifications.length > 0 && (
          <>
            <SideH>Certifications</SideH>
            <div style={{ fontSize: "0.82em", display: "flex", flexDirection: "column", gap: "0.3em" }}>
              {resume.certifications.map((c) => (<span key={c.id}>{c.name}{c.date && ` (${c.date})`}</span>))}
            </div>
          </>
        )}
      </aside>

      {/* main */}
      <main style={{ width: "66%", padding: "11mm 9mm" }}>
        {b.summary && (<section><MainH>Profile</MainH><p>{b.summary}</p></section>)}

        {resume.experience.length > 0 && (
          <section><MainH>Experience</MainH>
            {resume.experience.map((it) => (
              <div key={it.id} style={{ marginBottom: "0.6em", breakInside: "avoid" }}>
                <EntryHead left={it.role} right={dateRange(it.start, it.end, it.current)} sub={it.company} subRight={it.location} />
                <Bullets text={it.description} />
              </div>
            ))}
          </section>
        )}

        {resume.education.length > 0 && (
          <section><MainH>Education</MainH>
            {resume.education.map((it) => (
              <div key={it.id} style={{ marginBottom: "0.45em", breakInside: "avoid" }}>
                <EntryHead left={it.degree} right={dateRange(it.start, it.end, false)} sub={it.school} subRight={it.location} />
                {it.details && <div style={{ fontSize: "0.92em", color: "#444" }}>{it.details}</div>}
              </div>
            ))}
          </section>
        )}

        {resume.projects.length > 0 && (
          <section><MainH>Projects</MainH>
            {resume.projects.map((it) => (
              <div key={it.id} style={{ marginBottom: "0.4em" }}>
                <EntryHead left={it.name} right={it.link} />
                {it.description && <div style={{ fontSize: "0.95em" }}>{it.description}</div>}
              </div>
            ))}
          </section>
        )}

        <Extras resume={resume} H={MainH} />
      </main>
    </div>
  );
}

/* ============================ form primitives ============================ */
function Card({ children }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
      {children}
    </div>
  );
}

function Section({ icon, title, action, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card>
        <div className="mb-4 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 text-violet-600 dark:text-violet-300">
            {icon}
          </span>
          <h2 className="flex-1 text-base font-bold text-gray-900 dark:text-white">{title}</h2>
          {action}
        </div>
        {children}
      </Card>
    </motion.div>
  );
}

function Repeatable({ items, empty, render, heading, sub, onMove, onDelete }) {
  const [open, setOpen] = useState(null);
  if (!items.length) {
    return <p className="rounded-lg border border-dashed border-gray-200 px-3 py-4 text-center text-sm text-gray-400 dark:border-gray-700">{empty}</p>;
  }
  return (
    <div className="space-y-2">
      {items.map((it, idx) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className="rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 px-3 py-2.5">
              <button onClick={() => setOpen(isOpen ? null : it.id)} className="min-w-0 flex-1 text-left">
                <div className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">{heading(it)}</div>
                {sub(it) && <div className="truncate text-xs text-gray-400">{sub(it)}</div>}
              </button>
              <IconBtn title="Move up" disabled={idx === 0} onClick={() => onMove(it.id, -1)}><ChevronUp className="h-4 w-4" /></IconBtn>
              <IconBtn title="Move down" disabled={idx === items.length - 1} onClick={() => onMove(it.id, 1)}><ChevronDown className="h-4 w-4" /></IconBtn>
              <IconBtn title="Delete" danger onClick={() => onDelete(it.id)}><Trash2 className="h-4 w-4" /></IconBtn>
              <button onClick={() => setOpen(isOpen ? null : it.id)} aria-label="Toggle">
                <ChevronDown className={`h-4 w-4 text-gray-400 transition ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                  <div className="border-t border-gray-100 p-3 dark:border-gray-800">{render(it)}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Label({ children }) {
  return <label className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">{children}</label>;
}

function Input({ label, value, onChange, placeholder, className = "" }) {
  return (
    <div className={className}>
      {label && <Label>{label}</Label>}
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
    </div>
  );
}

function MonthInput({ label, value, onChange, disabled }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <input
        type="month"
        value={/^\d{4}-\d{2}$/.test(value || "") ? value : ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
      />
    </div>
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      rows={rows}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
    >
      {children}
    </select>
  );
}

function PrimaryButton({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40"
    >
      {children}
    </motion.button>
  );
}

function GhostButton({ children, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
        danger
          ? "border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-900/20"
          : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </button>
  );
}

function IconBtn({ children, onClick, title, disabled, danger }) {
  return (
    <button
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-7 w-7 items-center justify-center rounded-lg transition disabled:opacity-30 ${
        danger ? "text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
      }`}
    >
      {children}
    </button>
  );
}

function AddButton({ onClick }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1 rounded-lg bg-violet-600/10 px-2.5 py-1.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-600/20 dark:text-violet-300">
      <Plus className="h-3.5 w-3.5" /> Add
    </button>
  );
}

function ATSPanel({ ats }) {
  const color = ats.score >= 80 ? "#059669" : ats.score >= 55 ? "#d97706" : "#e11d48";
  const tips = ats.checks.filter((c) => !c.ok);
  const C = 2 * Math.PI * 15.5;
  return (
    <Card>
      <div className="flex items-center gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-200 dark:text-gray-700" />
            <circle cx="18" cy="18" r="15.5" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={`${(ats.score / 100) * C} ${C}`} />
          </svg>
          <span className="absolute text-lg font-extrabold" style={{ color }}>{ats.score}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
            <Gauge className="h-4 w-4 text-violet-600" /> Resume score
          </div>
          <p className="mt-0.5 text-xs text-gray-500">
            {ats.score >= 80
              ? "Great — recruiter & ATS ready."
              : ats.score >= 55
                ? "Good start — a few quick wins below."
                : "Add more detail to strengthen it."}
          </p>
        </div>
      </div>
      {tips.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {tips.slice(0, 5).map((t, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
              <ListChecks className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
              <span><strong className="font-semibold">{t.label}:</strong> {t.hint}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function Feature({ icon, title, children }) {
  return (
    <div className="text-center">
      <div className="mb-2 text-3xl">{icon}</div>
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{children}</p>
    </div>
  );
}
