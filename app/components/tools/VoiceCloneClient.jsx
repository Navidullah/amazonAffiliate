"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  UploadCloud,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
  AudioLines,
  FileAudio2,
  ShieldCheck,
} from "lucide-react";

/**
 * Voice-clone tool UI.
 * Talks ONLY to same-origin proxy routes (/api/voice/*); the backend API key
 * is injected server-side and never reaches this browser code.
 */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function VoiceCloneClient() {
  const [file, setFile] = useState(null);
  const [voiceId, setVoiceId] = useState(null);
  const [text, setText] = useState("Hello! This is my cloned voice, generated on shopyor.");
  const [consent, setConsent] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [status, setStatus] = useState(null); // { kind: "info"|"error"|"success", msg }
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  function pickFile(f) {
    if (!f) return;
    if (!f.type.startsWith("audio/")) {
      setStatus({ kind: "error", msg: "Please choose an audio file." });
      return;
    }
    setFile(f);
    setVoiceId(null);
    setAudioUrl(null);
    setStatus(null);
  }

  async function handleUpload() {
    if (!file) return setStatus({ kind: "error", msg: "Pick an audio file first." });
    if (!consent)
      return setStatus({
        kind: "error",
        msg: "Please confirm you have permission to clone this voice.",
      });

    setBusy(true);
    setStatus({ kind: "info", msg: "Uploading & analysing your sample…" });
    try {
      const fd = new FormData();
      fd.append("sample", file);
      fd.append("consent", "true");
      const res = await fetch("/api/voice/clone", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.error || "Upload failed");
      setVoiceId(data.voice_id);
      const warn = data.warnings?.length ? ` ${data.warnings.join(" ")}` : "";
      setStatus({
        kind: "success",
        msg: `Voice ready — ${data.duration_sec}s sample.${warn}`,
      });
    } catch (err) {
      setStatus({ kind: "error", msg: err.message });
    } finally {
      setBusy(false);
    }
  }

  async function handleGenerate() {
    if (!voiceId) return setStatus({ kind: "error", msg: "Upload a voice sample first." });
    if (!text.trim()) return setStatus({ kind: "error", msg: "Enter some text to speak." });
    setBusy(true);
    setStatus({ kind: "info", msg: "Generating speech on the GPU…" });
    try {
      const fd = new FormData();
      fd.append("voice_id", voiceId);
      fd.append("text", text);
      const res = await fetch("/api/voice/generate", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || data.error || "Generation failed");
      }
      const blob = await res.blob();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(URL.createObjectURL(blob));
      setStatus({ kind: "success", msg: "Done — your audio is ready below." });
    } catch (err) {
      setStatus({ kind: "error", msg: err.message });
    } finally {
      setBusy(false);
    }
  }

  const stepDone = voiceId ? 2 : file ? 1 : 0;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-2xl px-4"
    >
      {/* Step rail */}
      <motion.div variants={item} className="mb-8 flex items-center justify-center gap-3">
        <StepDot active={stepDone >= 0} done={stepDone >= 1} label="Sample" />
        <span className="h-px w-10 bg-gradient-to-r from-violet-500/40 to-fuchsia-500/40" />
        <StepDot active={stepDone >= 1} done={stepDone >= 2} label="Generate" />
      </motion.div>

      {/* Step 1 — Voice sample */}
      <motion.div variants={item}>
        <GlassCard glow={stepDone === 0}>
          <CardHeader
            icon={<Mic className="h-5 w-5" />}
            title="Upload a voice sample"
            subtitle="A clean 10–30s clip clones best. WAV, MP3, FLAC…"
          />

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              pickFile(e.dataTransfer.files?.[0]);
            }}
            className={`group relative mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-9 text-center transition-all duration-300 ${
              dragOver
                ? "border-violet-500 bg-violet-500/10 scale-[1.01]"
                : "border-black/10 bg-black/[0.02] hover:border-violet-400/60 hover:bg-violet-500/5 dark:border-white/10 dark:bg-white/[0.02]"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="audio/*"
              className="sr-only"
              onChange={(e) => pickFile(e.target.files?.[0])}
            />
            <motion.span
              animate={{ y: dragOver ? -4 : 0 }}
              className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 dark:text-violet-300"
            >
              <UploadCloud className="h-7 w-7" />
            </motion.span>
            {file ? (
              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                <FileAudio2 className="h-4 w-4 text-violet-500" />
                {file.name}
                <span className="text-muted-foreground">
                  ({(file.size / 1024 / 1024).toFixed(1)} MB)
                </span>
              </span>
            ) : (
              <>
                <span className="text-sm font-semibold text-foreground">
                  Drag & drop, or{" "}
                  <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                    browse
                  </span>
                </span>
                <span className="mt-1 text-xs text-muted-foreground">Max 25 MB</span>
              </>
            )}
          </label>

          {/* Consent */}
          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-black/5 bg-black/[0.02] p-3 dark:border-white/5 dark:bg-white/[0.02]">
            <span className="relative mt-0.5 flex h-5 w-5 shrink-0">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-black/20 transition-colors checked:border-violet-500 checked:bg-gradient-to-br checked:from-violet-500 checked:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 dark:border-white/20"
              />
              <CheckCircle2 className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" />
            </span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck className="mr-1 inline h-3.5 w-3.5 text-violet-500" />
              I confirm this is my own voice, or I have explicit permission from the speaker
              to clone it.
            </span>
          </label>

          <GradientButton onClick={handleUpload} disabled={busy || !file} busy={busy && !voiceId}>
            {voiceId ? "Re-upload sample" : "Upload sample"}
          </GradientButton>
        </GlassCard>
      </motion.div>

      {/* Step 2 — Generate */}
      <motion.div variants={item} className="mt-5">
        <GlassCard glow={stepDone >= 1} dim={!voiceId}>
          <CardHeader
            icon={<Sparkles className="h-5 w-5" />}
            title="Generate speech"
            subtitle="Type what the cloned voice should say."
          />
          <div className="relative mt-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={1000}
              rows={4}
              disabled={!voiceId}
              placeholder="Type your script here…"
              className="w-full resize-none rounded-xl border border-black/10 bg-black/[0.02] p-4 text-sm text-foreground outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03]"
            />
            <span className="pointer-events-none absolute bottom-3 right-3 text-[11px] tabular-nums text-muted-foreground">
              {text.length}/1000
            </span>
          </div>

          <GradientButton onClick={handleGenerate} disabled={busy || !voiceId} busy={busy && !!voiceId}>
            <AudioLines className="h-4 w-4" />
            Generate speech
          </GradientButton>

          <AnimatePresence>
            {audioUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: 8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 overflow-hidden"
              >
                <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                      <AudioLines className="h-4 w-4" />
                    </span>
                    Your cloned audio
                  </div>
                  <audio src={audioUrl} controls className="w-full" />
                  <a
                    href={audioUrl}
                    download="voice-clone.wav"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-violet-600 transition hover:text-fuchsia-600 dark:text-violet-300"
                  >
                    <Download className="h-4 w-4" />
                    Download WAV
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </motion.div>

      {/* Status toast */}
      <AnimatePresence mode="wait">
        {status && (
          <motion.div
            key={status.msg}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className={`mt-5 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm ${
              status.kind === "error"
                ? "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300"
                : status.kind === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                : "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300"
            }`}
          >
            {status.kind === "error" ? (
              <AlertCircle className="h-4 w-4 shrink-0" />
            ) : status.kind === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
            )}
            <span>{status.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- small presentational helpers ---------- */

function GlassCard({ children, glow, dim }) {
  return (
    <div
      className={`relative rounded-3xl border border-black/5 bg-white/70 p-6 shadow-sm backdrop-blur-xl transition-all duration-500 dark:border-white/10 dark:bg-white/[0.04] ${
        dim ? "opacity-70" : ""
      } ${glow ? "shadow-[0_0_50px_-12px_rgba(139,92,246,0.35)]" : ""}`}
    >
      {children}
    </div>
  );
}

function CardHeader({ icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-500 dark:text-violet-300">
        {icon}
      </span>
      <div>
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function GradientButton({ children, onClick, disabled, busy }) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
      disabled={disabled}
      className="group relative mt-4 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-shadow hover:shadow-violet-500/40 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {busy ? "Working…" : children}
    </motion.button>
  );
}

function StepDot({ active, done, label }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
          done
            ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white"
            : active
            ? "border border-violet-500/50 text-violet-500 dark:text-violet-300"
            : "border border-black/15 text-muted-foreground dark:border-white/15"
        }`}
      >
        {done ? <CheckCircle2 className="h-4 w-4" /> : label[0]}
      </span>
      <span
        className={`text-xs font-medium ${
          active ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
