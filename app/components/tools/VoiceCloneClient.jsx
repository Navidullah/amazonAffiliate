"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Square,
  RotateCcw,
  UploadCloud,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
  AudioLines,
  FileAudio2,
  ShieldCheck,
  Library,
  Trash2,
  Play,
  Pause,
  Plus,
  ChevronDown,
  SlidersHorizontal,
  Wand2,
} from "lucide-react";

/**
 * Voice-clone tool UI (premium build).
 * Talks ONLY to same-origin proxy routes (/api/voice/*); the backend API key
 * is injected server-side and never reaches this browser code.
 *
 * Features:
 *  - Per-browser voice library (localStorage) with name / preview / delete.
 *  - Generation controls: expressiveness, stability, variation, speed, tone.
 *  - Tone presets, WAV/MP3 output, and a canvas waveform player.
 *
 * Mic recordings are decoded and re-encoded to WAV in the browser so the
 * Python backend (torchaudio) always receives a format it can read.
 */

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const MAX_RECORD_SECONDS = 60;
const LS_KEY = "shopyor.voiceclone.voices";

// Default control values (mirror the backend defaults).
const DEFAULTS = {
  exaggeration: 0.5,
  cfg_weight: 0.5,
  temperature: 0.8,
  speed: 1.0,
  pitch: 0,
};

// Tone presets set the emotional/tone params in one tap (speed stays separate).
const PRESETS = [
  { key: "neutral", label: "Neutral", v: { exaggeration: 0.5, cfg_weight: 0.5, temperature: 0.8, pitch: 0 } },
  { key: "expressive", label: "Expressive", v: { exaggeration: 0.9, cfg_weight: 0.5, temperature: 0.9, pitch: 0 } },
  { key: "calm", label: "Calm", v: { exaggeration: 0.35, cfg_weight: 0.6, temperature: 0.6, pitch: -1 } },
  { key: "energetic", label: "Energetic", v: { exaggeration: 1.1, cfg_weight: 0.4, temperature: 1.0, pitch: 1 } },
  { key: "dramatic", label: "Dramatic", v: { exaggeration: 1.4, cfg_weight: 0.3, temperature: 1.0, pitch: -1 } },
  { key: "deep", label: "Deep", v: { exaggeration: 0.5, cfg_weight: 0.5, temperature: 0.8, pitch: -4 } },
  { key: "bright", label: "Bright", v: { exaggeration: 0.6, cfg_weight: 0.5, temperature: 0.85, pitch: 3 } },
];

export default function VoiceCloneClient() {
  const [mode, setMode] = useState("upload"); // "upload" | "record"
  const [file, setFile] = useState(null);
  const [voiceName, setVoiceName] = useState("");
  const [consent, setConsent] = useState(false);

  // Library (per-browser).
  const [voices, setVoices] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [previewId, setPreviewId] = useState(null);

  // Generation.
  const [text, setText] = useState("Hello! This is my cloned voice, generated on shopyor.");
  const [controls, setControls] = useState({ ...DEFAULTS });
  const [activePreset, setActivePreset] = useState("neutral");
  const [format, setFormat] = useState("wav"); // "wav" | "mp3"
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [audioUrl, setAudioUrl] = useState(null);
  const [audioFmt, setAudioFmt] = useState("wav");
  const [status, setStatus] = useState(null); // { kind, msg }
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // recording state
  const [canRecord, setCanRecord] = useState(true);
  const [recording, setRecording] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const elapsedRef = useRef(0);
  const previewAudioRef = useRef(null);

  /* ---------- mount ---------- */
  useEffect(() => {
    if (typeof window !== "undefined" && (!navigator.mediaDevices || !window.MediaRecorder)) {
      setCanRecord(false);
    }
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      if (Array.isArray(saved)) {
        setVoices(saved);
        if (saved[0]) setSelectedId(saved[0].voice_id);
      }
    } catch {
      /* ignore corrupt storage */
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopStream();
      if (previewAudioRef.current) previewAudioRef.current.pause();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function persistVoices(next) {
    setVoices(next);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {
      /* storage full / blocked — library is best-effort */
    }
  }

  function setSample(f) {
    setFile(f);
    setAudioUrl(null);
  }

  function pickFile(f) {
    if (!f) return;
    if (!f.type.startsWith("audio/")) {
      setStatus({ kind: "error", msg: "Please choose an audio file." });
      return;
    }
    setSample(f);
    setStatus(null);
  }

  /* ---------- mic recording ---------- */
  function stopStream() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }

  async function startRecording() {
    setStatus(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
        stopStream();
        setProcessing(true);
        setStatus({ kind: "info", msg: "Processing your recording…" });
        try {
          const wav = await blobToWavFile(blob);
          setSample(wav);
          setStatus({
            kind: "success",
            msg: `Recorded ${formatTime(elapsedRef.current)} — name it and clone.`,
          });
        } catch {
          setStatus({ kind: "error", msg: "Couldn't process the recording. Please try again." });
        } finally {
          setProcessing(false);
        }
      };
      mr.start();
      mediaRecorderRef.current = mr;
      setSample(null);
      setRecording(true);
      setElapsed(0);
      elapsedRef.current = 0;
      timerRef.current = setInterval(() => {
        setElapsed((prev) => {
          const next = prev + 1;
          elapsedRef.current = next;
          if (next >= MAX_RECORD_SECONDS) stopRecording();
          return next;
        });
      }, 1000);
    } catch {
      setStatus({ kind: "error", msg: "Microphone access was denied or is unavailable." });
    }
  }

  function stopRecording() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRecording(false);
    const mr = mediaRecorderRef.current;
    if (mr && mr.state !== "inactive") mr.stop();
  }

  /* ---------- library ---------- */
  function togglePreview(id) {
    const el = previewAudioRef.current;
    if (previewId === id && el && !el.paused) {
      el.pause();
      setPreviewId(null);
      return;
    }
    if (el) {
      el.pause();
      el.src = `/api/voice/voices/${id}`;
      el.play().then(() => setPreviewId(id)).catch(() => {
        setStatus({ kind: "error", msg: "Couldn't play that sample." });
      });
      el.onended = () => setPreviewId(null);
    }
  }

  async function deleteVoice(id) {
    // Optimistically remove from the local library, then tell the backend.
    const next = voices.filter((v) => v.voice_id !== id);
    persistVoices(next);
    if (selectedId === id) setSelectedId(next[0]?.voice_id ?? null);
    if (previewId === id && previewAudioRef.current) {
      previewAudioRef.current.pause();
      setPreviewId(null);
    }
    try {
      await fetch(`/api/voice/voices/${id}`, { method: "DELETE" });
    } catch {
      /* sample may linger server-side; it's gone from the user's list regardless */
    }
  }

  /* ---------- network ---------- */
  async function handleClone() {
    if (!file) return setStatus({ kind: "error", msg: "Add a voice sample first." });
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
      if (voiceName.trim()) fd.append("name", voiceName.trim());
      const res = await fetch("/api/voice/clone", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || data.error || "Upload failed");

      const entry = {
        voice_id: data.voice_id,
        name: data.name || voiceName.trim() || "My voice",
        created_at: Date.now(),
        duration_sec: data.duration_sec,
      };
      persistVoices([entry, ...voices.filter((v) => v.voice_id !== entry.voice_id)]);
      setSelectedId(entry.voice_id);
      setFile(null);
      setVoiceName("");
      setConsent(false);
      const warn = data.warnings?.length ? ` ${data.warnings.join(" ")}` : "";
      setStatus({ kind: "success", msg: `“${entry.name}” added to your library.${warn}` });
    } catch (err) {
      setStatus({ kind: "error", msg: err.message });
    } finally {
      setBusy(false);
    }
  }

  async function handleGenerate() {
    if (!selectedId) return setStatus({ kind: "error", msg: "Select or clone a voice first." });
    if (!text.trim()) return setStatus({ kind: "error", msg: "Enter some text to speak." });
    setBusy(true);
    setStatus({ kind: "info", msg: "Generating speech on the GPU…" });
    try {
      const fd = new FormData();
      fd.append("voice_id", selectedId);
      fd.append("text", text);
      fd.append("exaggeration", String(controls.exaggeration));
      fd.append("cfg_weight", String(controls.cfg_weight));
      fd.append("temperature", String(controls.temperature));
      fd.append("speed", String(controls.speed));
      fd.append("pitch", String(controls.pitch));
      fd.append("format", format);

      const res = await fetch("/api/voice/generate", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || data.error || "Generation failed");
      }
      const blob = await res.blob();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      setAudioUrl(URL.createObjectURL(blob));
      setAudioFmt(format);
      setStatus({ kind: "success", msg: "Done — your audio is ready below." });
    } catch (err) {
      setStatus({ kind: "error", msg: err.message });
    } finally {
      setBusy(false);
    }
  }

  /* ---------- controls ---------- */
  function setControl(key, value) {
    setControls((c) => ({ ...c, [key]: value }));
    setActivePreset(null); // manual tweak clears the active preset highlight
  }

  function applyPreset(p) {
    setControls((c) => ({ ...c, ...p.v }));
    setActivePreset(p.key);
  }

  const selectedVoice = voices.find((v) => v.voice_id === selectedId) || null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full max-w-2xl px-4"
    >
      {/* hidden element used for library previews */}
      <audio ref={previewAudioRef} className="hidden" />

      {/* ============ Voice library ============ */}
      <motion.div variants={item}>
        <GlassCard glow={voices.length === 0}>
          <CardHeader
            icon={<Library className="h-5 w-5" />}
            title="Your voices"
            subtitle={
              voices.length
                ? "Pick a voice to speak with, preview it, or remove it."
                : "Clone a voice below — it’ll be saved here on this device."
            }
          />

          {voices.length === 0 ? (
            <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-black/[0.02] px-6 py-8 text-center dark:border-white/10 dark:bg-white/[0.02]">
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-500 dark:text-violet-300">
                <Plus className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-foreground">No voices yet</span>
              <span className="mt-1 text-xs text-muted-foreground">
                Your cloned voices stay private to this browser.
              </span>
            </div>
          ) : (
            <ul className="mt-4 space-y-2">
              <AnimatePresence initial={false}>
                {voices.map((v) => (
                  <motion.li
                    key={v.voice_id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div
                      onClick={() => setSelectedId(v.voice_id)}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-all ${
                        selectedId === v.voice_id
                          ? "border-violet-500/50 bg-violet-500/10 shadow-[0_0_24px_-12px_rgba(139,92,246,0.5)]"
                          : "border-black/5 bg-black/[0.02] hover:border-violet-400/40 hover:bg-violet-500/5 dark:border-white/10 dark:bg-white/[0.02]"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${
                          selectedId === v.voice_id
                            ? "bg-gradient-to-br from-violet-500 to-fuchsia-500"
                            : "bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40"
                        }`}
                      >
                        <FileAudio2 className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-foreground">{v.name}</div>
                        <div className="text-[11px] text-muted-foreground">
                          {v.duration_sec ? `${v.duration_sec}s · ` : ""}
                          {relativeTime(v.created_at)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePreview(v.voice_id);
                        }}
                        aria-label="Preview voice"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-violet-600 transition hover:bg-violet-500/10 dark:text-violet-300"
                      >
                        {previewId === v.voice_id ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteVoice(v.voice_id);
                        }}
                        aria-label="Delete voice"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </GlassCard>
      </motion.div>

      {/* ============ Add a voice ============ */}
      <motion.div variants={item} className="mt-5">
        <GlassCard>
          <CardHeader
            icon={<Mic className="h-5 w-5" />}
            title="Add a voice"
            subtitle="Upload a file or record from your mic — a clean 10–30s clip works best."
          />

          {/* Mode toggle */}
          <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl border border-black/10 bg-black/[0.03] p-1 dark:border-white/10 dark:bg-white/[0.03]">
            <ToggleTab
              active={mode === "upload"}
              disabled={recording || processing}
              onClick={() => setMode("upload")}
              icon={<UploadCloud className="h-4 w-4" />}
              label="Upload"
            />
            <ToggleTab
              active={mode === "record"}
              disabled={recording || processing || !canRecord}
              onClick={() => setMode("record")}
              icon={<Mic className="h-4 w-4" />}
              label="Record"
            />
          </div>

          {/* Upload mode */}
          {mode === "upload" && (
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
                  ? "scale-[1.01] border-violet-500 bg-violet-500/10"
                  : "border-black/10 bg-black/[0.02] hover:border-violet-400/60 hover:bg-violet-500/5 dark:border-white/10 dark:bg-white/[0.02]"
              }`}
            >
              <input
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
                <SampleChip file={file} />
              ) : (
                <>
                  <span className="text-sm font-semibold text-foreground">
                    Drag & drop, or{" "}
                    <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                      browse
                    </span>
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">WAV, MP3, FLAC · Max 25 MB</span>
                </>
              )}
            </label>
          )}

          {/* Record mode */}
          {mode === "record" && (
            <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-black/[0.02] px-6 py-8 text-center dark:border-white/10 dark:bg-white/[0.02]">
              <button
                type="button"
                onClick={recording ? stopRecording : startRecording}
                disabled={processing}
                aria-label={recording ? "Stop recording" : "Start recording"}
                className="relative flex h-20 w-20 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-60"
              >
                {recording && (
                  <>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/40" />
                    <span className="absolute inline-flex h-[120%] w-[120%] animate-pulse rounded-full bg-red-500/10" />
                  </>
                )}
                <span
                  className={`relative flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 ${
                    recording
                      ? "bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/40"
                      : "bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-violet-500/30 hover:scale-105"
                  }`}
                >
                  {processing ? (
                    <Loader2 className="h-7 w-7 animate-spin" />
                  ) : recording ? (
                    <Square className="h-6 w-6 fill-current" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </span>
              </button>

              <div className="mt-4">
                {recording ? (
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-lg font-bold tabular-nums text-red-500">
                      {formatTime(elapsed)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Recording… tap to stop (auto-stops at 1:00)
                    </span>
                  </div>
                ) : processing ? (
                  <span className="text-sm text-muted-foreground">Processing…</span>
                ) : file ? (
                  <div className="flex flex-col items-center gap-1.5">
                    <SampleChip file={file} />
                    <button
                      type="button"
                      onClick={startRecording}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-fuchsia-600 dark:text-violet-300"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Record again
                    </button>
                  </div>
                ) : (
                  <span className="text-sm font-semibold text-foreground">
                    Tap the mic to start recording
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Name */}
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Voice name (optional)
            </label>
            <input
              type="text"
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
              maxLength={60}
              placeholder="e.g. My narration voice"
              className="w-full rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30 dark:border-white/10 dark:bg-white/[0.03]"
            />
          </div>

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

          <GradientButton onClick={handleClone} disabled={busy || !file || recording || processing} busy={busy && !!file}>
            <Plus className="h-4 w-4" />
            Clone &amp; save voice
          </GradientButton>
        </GlassCard>
      </motion.div>

      {/* ============ Generate ============ */}
      <motion.div variants={item} className="mt-5">
        <GlassCard glow={!!selectedId} dim={!selectedId}>
          <CardHeader
            icon={<Sparkles className="h-5 w-5" />}
            title="Generate speech"
            subtitle={
              selectedVoice
                ? `Speaking as “${selectedVoice.name}”.`
                : "Select a voice above to start."
            }
          />

          <div className="relative mt-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={1000}
              rows={4}
              disabled={!selectedId}
              placeholder="Type your script here…"
              className="w-full resize-none rounded-xl border border-black/10 bg-black/[0.02] p-4 text-sm text-foreground outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.03]"
            />
            <span className="pointer-events-none absolute bottom-3 right-3 text-[11px] tabular-nums text-muted-foreground">
              {text.length}/1000
            </span>
          </div>

          {/* Tone presets */}
          <div className="mt-4">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Wand2 className="h-3.5 w-3.5 text-violet-500" /> Tone
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  disabled={!selectedId}
                  onClick={() => applyPreset(p)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all disabled:opacity-40 ${
                    activePreset === p.key
                      ? "border-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-sm"
                      : "border-black/10 text-muted-foreground hover:border-violet-400/50 hover:text-foreground dark:border-white/10"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Speed + Format (always visible) */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Slider
              label="Speed"
              value={controls.speed}
              min={0.5}
              max={2}
              step={0.05}
              disabled={!selectedId}
              onChange={(v) => setControl("speed", v)}
              fmt={(v) => `${v.toFixed(2)}×`}
            />
            <div>
              <div className="mb-1.5 text-xs font-medium text-muted-foreground">Format</div>
              <div className="grid grid-cols-2 gap-1 rounded-xl border border-black/10 bg-black/[0.03] p-1 dark:border-white/10 dark:bg-white/[0.03]">
                <ToggleTab active={format === "wav"} disabled={!selectedId} onClick={() => setFormat("wav")} label="WAV" />
                <ToggleTab active={format === "mp3"} disabled={!selectedId} onClick={() => setFormat("mp3")} label="MP3" />
              </div>
            </div>
          </div>

          {/* Advanced disclosure */}
          <button
            type="button"
            onClick={() => setShowAdvanced((s) => !s)}
            disabled={!selectedId}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 transition hover:text-fuchsia-600 disabled:opacity-40 dark:text-violet-300"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Advanced controls
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {showAdvanced && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid gap-5 rounded-2xl border border-black/5 bg-black/[0.02] p-4 sm:grid-cols-2 dark:border-white/5 dark:bg-white/[0.02]">
                  <Slider
                    label="Expressiveness"
                    hint="emotional intensity"
                    value={controls.exaggeration}
                    min={0.25}
                    max={2}
                    step={0.05}
                    disabled={!selectedId}
                    onChange={(v) => setControl("exaggeration", v)}
                    fmt={(v) => v.toFixed(2)}
                  />
                  <Slider
                    label="Stability"
                    hint="lower = more dynamic"
                    value={controls.cfg_weight}
                    min={0}
                    max={1}
                    step={0.05}
                    disabled={!selectedId}
                    onChange={(v) => setControl("cfg_weight", v)}
                    fmt={(v) => v.toFixed(2)}
                  />
                  <Slider
                    label="Variation"
                    hint="sampling randomness"
                    value={controls.temperature}
                    min={0.1}
                    max={1.5}
                    step={0.05}
                    disabled={!selectedId}
                    onChange={(v) => setControl("temperature", v)}
                    fmt={(v) => v.toFixed(2)}
                  />
                  <Slider
                    label="Tone"
                    hint="deeper ↔ higher"
                    value={controls.pitch}
                    min={-6}
                    max={6}
                    step={1}
                    disabled={!selectedId}
                    onChange={(v) => setControl("pitch", v)}
                    fmt={(v) => (v > 0 ? `+${v}` : `${v}`)}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setControls({ ...DEFAULTS });
                    setActivePreset("neutral");
                    setFormat("wav");
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset to defaults
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <GradientButton onClick={handleGenerate} disabled={busy || !selectedId} busy={busy && !file}>
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
                  <WaveformPlayer src={audioUrl} />
                  <a
                    href={audioUrl}
                    download={`voice-clone.${audioFmt}`}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-violet-600 transition hover:text-fuchsia-600 dark:text-violet-300"
                  >
                    <Download className="h-4 w-4" />
                    Download {audioFmt.toUpperCase()}
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

/* ---------- waveform player (no external deps) ---------- */

function WaveformPlayer({ src }) {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const peaksRef = useRef(null);
  const rafRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [decoded, setDecoded] = useState(false);

  // Decode the blob once to extract waveform peaks.
  useEffect(() => {
    let cancelled = false;
    setDecoded(false);
    peaksRef.current = null;
    (async () => {
      try {
        const buf = await (await fetch(src)).arrayBuffer();
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        const audioBuffer = await ctx.decodeAudioData(buf);
        ctx.close();
        if (cancelled) return;
        peaksRef.current = computePeaks(audioBuffer, 160);
        setDecoded(true);
        draw();
      } catch {
        if (!cancelled) setDecoded(false); // falls back to native <audio>
      }
    })();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Redraw when progress changes.
  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, decoded]);

  function draw() {
    const canvas = canvasRef.current;
    const peaks = peaksRef.current;
    if (!canvas || !peaks) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 480;
    const cssH = 56;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssW, cssH);

    const n = peaks.length;
    const gap = 2;
    const barW = Math.max(1, (cssW - gap * (n - 1)) / n);
    const mid = cssH / 2;
    const playedX = progress * cssW;

    const grad = ctx.createLinearGradient(0, 0, cssW, 0);
    grad.addColorStop(0, "#8b5cf6");
    grad.addColorStop(1, "#d946ef");

    for (let i = 0; i < n; i++) {
      const x = i * (barW + gap);
      const h = Math.max(2, peaks[i] * (cssH - 6));
      ctx.fillStyle = x < playedX ? grad : "rgba(139,92,246,0.25)";
      roundRect(ctx, x, mid - h / 2, barW, h, Math.min(barW / 2, 2));
      ctx.fill();
    }
  }

  function onAudioTime() {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    setProgress(a.currentTime / a.duration);
    setCurrent(a.currentTime);
  }

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      setPlaying(true);
    } else {
      a.pause();
      setPlaying(false);
    }
  }

  function seek(e) {
    const a = audioRef.current;
    const canvas = canvasRef.current;
    if (!a || !canvas || !a.duration) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    a.currentTime = ratio * a.duration;
    setProgress(ratio);
  }

  return (
    <div className="flex items-center gap-3">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onAudioTime}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        className={decoded ? "hidden" : "w-full"}
        controls={!decoded}
      />
      {decoded && (
        <>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-md shadow-violet-500/30 transition hover:scale-105"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
          </button>
          <div className="min-w-0 flex-1">
            <canvas
              ref={canvasRef}
              onClick={seek}
              className="h-[56px] w-full cursor-pointer"
            />
          </div>
          <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
            {fmtClock(current)}/{fmtClock(duration)}
          </span>
        </>
      )}
    </div>
  );
}

function computePeaks(audioBuffer, bars) {
  const data = audioBuffer.getChannelData(0);
  const block = Math.floor(data.length / bars) || 1;
  const peaks = new Array(bars).fill(0);
  let max = 0;
  for (let i = 0; i < bars; i++) {
    let m = 0;
    const start = i * block;
    for (let j = 0; j < block; j++) {
      const v = Math.abs(data[start + j] || 0);
      if (v > m) m = v;
    }
    peaks[i] = m;
    if (m > max) max = m;
  }
  if (max > 0) for (let i = 0; i < bars; i++) peaks[i] /= max;
  return peaks;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function fmtClock(s) {
  if (!s || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}

/* ---------- audio helpers (browser WAV encoding) ---------- */

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

function relativeTime(ts) {
  if (!ts) return "just now";
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  return `${d}d ago`;
}

/** Decode any recorded blob and re-encode to a mono 16-bit PCM WAV File. */
async function blobToWavFile(blob) {
  const arrayBuf = await blob.arrayBuffer();
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioCtx();
  try {
    const audioBuffer = await ctx.decodeAudioData(arrayBuf);
    const wavBlob = encodeWav(audioBuffer);
    return new File([wavBlob], `recording-${Date.now()}.wav`, { type: "audio/wav" });
  } finally {
    ctx.close();
  }
}

function encodeWav(audioBuffer) {
  const numCh = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const length = audioBuffer.length;

  // Down-mix to mono.
  const mono = new Float32Array(length);
  for (let ch = 0; ch < numCh; ch++) {
    const data = audioBuffer.getChannelData(ch);
    for (let i = 0; i < length; i++) mono[i] += data[i] / numCh;
  }

  const buffer = new ArrayBuffer(44 + length * 2);
  const view = new DataView(buffer);
  const writeStr = (off, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i));
  };

  writeStr(0, "RIFF");
  view.setUint32(4, 36 + length * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true); // subchunk size
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // byte rate
  view.setUint16(32, 2, true); // block align
  view.setUint16(34, 16, true); // bits per sample
  writeStr(36, "data");
  view.setUint32(40, length * 2, true);

  let off = 44;
  for (let i = 0; i < length; i++) {
    const s = Math.max(-1, Math.min(1, mono[i]));
    view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    off += 2;
  }
  return new Blob([view], { type: "audio/wav" });
}

/* ---------- small presentational helpers ---------- */

function Slider({ label, hint, value, min, max, step, onChange, disabled, fmt }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-foreground">
          {label}
          {hint ? <span className="ml-1.5 font-normal text-muted-foreground">· {hint}</span> : null}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-violet-600 dark:text-violet-300">
          {fmt ? fmt(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-black/10 accent-violet-600 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white/10"
      />
    </div>
  );
}

function SampleChip({ file }) {
  return (
    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
      <FileAudio2 className="h-4 w-4 text-violet-500" />
      {file.name}
      <span className="text-muted-foreground">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
    </span>
  );
}

function ToggleTab({ active, disabled, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

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
