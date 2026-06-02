"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  RefreshCw,
  Mail,
  Briefcase,
  Shuffle,
  Trash2,
  Hash,
  AtSign,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data used to build random usernames + domains                      */
/* ------------------------------------------------------------------ */
const FIRST_NAMES = [
  "alex", "jordan", "taylor", "morgan", "casey", "riley", "jamie", "sam",
  "chris", "drew", "sky", "noah", "mia", "liam", "emma", "ava", "ethan",
  "olivia", "lucas", "sophia", "leo", "nina", "max", "ruby", "ivy", "finn",
];
const LAST_NAMES = [
  "carter", "reed", "blake", "hayes", "lane", "brooks", "nash", "wells",
  "fox", "stone", "frost", "kerr", "vale", "dale", "snow", "rivers", "shaw",
  "quinn", "ford", "gray", "wolfe", "knox", "page", "york", "cole",
];
const ADJECTIVES = [
  "swift", "brave", "calm", "lucky", "cosmic", "quiet", "neon", "amber",
  "silver", "bold", "mellow", "vivid", "crisp", "lunar", "solar", "rapid",
  "happy", "stellar", "frosty", "golden", "royal", "epic", "zen", "noble",
];
const NOUNS = [
  "tiger", "falcon", "river", "comet", "ember", "harbor", "pixel", "summit",
  "maple", "raven", "delta", "orbit", "cedar", "willow", "atlas", "echo",
  "vertex", "nimbus", "cobalt", "quartz", "ranger", "phoenix", "drift", "horizon",
];

const POPULAR_DOMAINS = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com",
  "proton.me", "live.com", "aol.com", "mail.com", "zoho.com",
];
/* Safe, RFC-reserved domains that are guaranteed never to be real inboxes */
const TEST_DOMAINS = ["example.com", "example.org", "example.net", "test.dev"];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const num = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const slug = (s) => (s || "").trim().toLowerCase().replace(/[^a-z0-9]/g, "");

/* ------------------------------------------------------------------ */
/*  Reusable copy button                                               */
/* ------------------------------------------------------------------ */
function CopyButton({ value, className = "" }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={`Copy ${value}`}
      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
        copied
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
      } ${className}`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm";

const Tab = ({ active, onClick, icon: Icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
      active
        ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/20"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700/50"
    }`}
  >
    <Icon className="h-4 w-4" /> {label}
  </button>
);

export default function EmailGeneratorClient() {
  const [mode, setMode] = useState("professional"); // professional | random

  /* ---------------- professional mode ---------------- */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [domain, setDomain] = useState("");

  const proResults = useMemo(() => {
    const f = slug(firstName) || "john";
    const l = slug(lastName) || "doe";
    const d = slug(domain.replace(/^@/, "")) ? domain.trim().replace(/^@/, "") : "company.com";
    const fi = f[0];
    const li = l[0];
    // Common professional / business address formats
    const formats = [
      `${f}.${l}`,
      `${f}${l}`,
      `${fi}${l}`,
      `${f}${li}`,
      `${f}_${l}`,
      `${fi}.${l}`,
      `${f}-${l}`,
      `${l}.${f}`,
      `${f}`,
      `${l}${fi}`,
    ];
    // de-dupe while preserving order
    const seen = new Set();
    return formats
      .filter((u) => u && !seen.has(u) && (seen.add(u), true))
      .map((u) => `${u}@${d}`);
  }, [firstName, lastName, domain]);

  /* ---------------- random mode ---------------- */
  const [count, setCount] = useState(8);
  const [style, setStyle] = useState("name"); // name | word | alphanumeric
  const [domainMode, setDomainMode] = useState("popular"); // popular | test | custom
  const [customDomain, setCustomDomain] = useState("");
  const [randomList, setRandomList] = useState([]);

  const buildUsername = useCallback(() => {
    if (style === "name") {
      return `${rand(FIRST_NAMES)}.${rand(LAST_NAMES)}${num(0, 1) ? num(1, 99) : ""}`;
    }
    if (style === "word") {
      return `${rand(ADJECTIVES)}${rand(NOUNS)}${num(1, 999)}`;
    }
    // alphanumeric
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let s = "";
    const len = num(8, 12);
    for (let i = 0; i < len; i++) s += chars[num(0, chars.length - 1)];
    return s;
  }, [style]);

  const pickDomain = useCallback(() => {
    if (domainMode === "test") return rand(TEST_DOMAINS);
    if (domainMode === "custom") {
      const d = slug(customDomain) ? customDomain.trim().replace(/^@/, "") : null;
      return d || "example.com";
    }
    return rand(POPULAR_DOMAINS);
  }, [domainMode, customDomain]);

  const generateRandom = useCallback(() => {
    const n = Math.min(Math.max(Number(count) || 1, 1), 50);
    const out = new Set();
    let guard = 0;
    while (out.size < n && guard < n * 20) {
      out.add(`${buildUsername()}@${pickDomain()}`);
      guard++;
    }
    setRandomList([...out]);
  }, [count, buildUsername, pickDomain]);

  const copyAll = async () => {
    const list = mode === "professional" ? proResults : randomList;
    try {
      await navigator.clipboard.writeText(list.join("\n"));
    } catch {
      /* ignore */
    }
  };

  const [allCopied, setAllCopied] = useState(false);
  const handleCopyAll = async () => {
    await copyAll();
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 1600);
  };

  const activeList = mode === "professional" ? proResults : randomList;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Mode switch */}
      <div className="mb-6 flex gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <Tab
          active={mode === "professional"}
          onClick={() => setMode("professional")}
          icon={Briefcase}
          label="Professional / Business"
        />
        <Tab
          active={mode === "random"}
          onClick={() => setMode("random")}
          icon={Shuffle}
          label="Random / Test"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* ------------------------------------------------ LEFT: controls */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-800 sm:p-6">
          <AnimatePresence mode="wait">
            {mode === "professional" ? (
              <motion.div
                key="pro"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  Build a professional email
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-100">
                      First name
                    </label>
                    <input
                      className={inputCls}
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-100">
                      Last name
                    </label>
                    <input
                      className={inputCls}
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Domain
                  </label>
                  <div className="relative">
                    <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      className={`${inputCls} pl-9`}
                      placeholder="company.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Use your business domain to get branded address ideas.
                  </p>
                </div>
                <p className="rounded-xl bg-blue-50 px-4 py-3 text-xs text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  We instantly suggest the 10 most common professional email
                  formats. Pick the one that fits your brand and check it&apos;s
                  available with your email provider.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="rand"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  <Shuffle className="h-4 w-4 text-blue-600" />
                  Generate random emails
                </div>

                {/* count */}
                <div>
                  <label className="mb-1.5 flex items-center justify-between text-sm font-semibold text-slate-800 dark:text-slate-100">
                    <span>How many?</span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-mono text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      {count}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                {/* username style */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Username style
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "name", label: "Name based" },
                      { id: "word", label: "Word + number" },
                      { id: "alphanumeric", label: "Alphanumeric" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStyle(s.id)}
                        className={`rounded-xl border px-2 py-2 text-xs font-medium transition ${
                          style === s.id
                            ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* domain mode */}
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Domain
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "popular", label: "Popular" },
                      { id: "test", label: "Safe / test" },
                      { id: "custom", label: "Custom" },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDomainMode(d.id)}
                        className={`rounded-xl border px-2 py-2 text-xs font-medium transition ${
                          domainMode === d.id
                            ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-600 dark:text-slate-300"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                  {domainMode === "custom" && (
                    <div className="relative mt-2">
                      <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        className={`${inputCls} pl-9`}
                        placeholder="yourdomain.com"
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={generateRandom}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-95"
                >
                  <RefreshCw className="h-4 w-4" /> Generate emails
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ------------------------------------------------ RIGHT: results */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-700 dark:bg-slate-800 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
              <Mail className="h-4 w-4 text-blue-600" />
              {mode === "professional" ? "Suggested addresses" : "Generated emails"}
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                {activeList.length}
              </span>
            </div>
            <div className="flex gap-2">
              {mode === "random" && randomList.length > 0 && (
                <button
                  type="button"
                  onClick={() => setRandomList([])}
                  aria-label="Clear results"
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Clear
                </button>
              )}
              {activeList.length > 0 && (
                <button
                  type="button"
                  onClick={handleCopyAll}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                    allCopied
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {allCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {allCopied ? "Copied all" : "Copy all"}
                </button>
              )}
            </div>
          </div>

          {activeList.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-14 text-center dark:border-slate-600">
              <Sparkles className="mb-3 h-8 w-8 text-slate-300 dark:text-slate-600" />
              <p className="text-sm text-slate-500">
                Click <span className="font-semibold">Generate emails</span> to
                create a fresh batch.
              </p>
            </div>
          ) : (
            <ul className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
              {activeList.map((email, i) => (
                <motion.li
                  key={email + i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: Math.min(i * 0.02, 0.3) }}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 dark:border-slate-700 dark:bg-slate-900/40"
                >
                  <span className="flex items-center gap-2 truncate font-mono text-sm text-slate-700 dark:text-slate-200">
                    {mode === "professional" && (
                      <Hash className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    )}
                    <span className="truncate">{email}</span>
                  </span>
                  <CopyButton value={email} />
                </motion.li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-[11px] leading-relaxed text-slate-400">
            🔒 Everything is generated locally in your browser — nothing is sent
            to a server or stored. Random addresses are for testing, mockups and
            placeholders, and may not correspond to real, deliverable inboxes.
          </p>
        </div>
      </div>
    </div>
  );
}
