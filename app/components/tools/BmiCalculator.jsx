"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Copy,
  Check,
  RotateCcw,
  Ruler,
  Weight,
  Sparkles,
} from "lucide-react";

/* BMI scale used for the visual gauge (clamped to this window). */
const GAUGE_MIN = 12;
const GAUGE_MAX = 40;

export default function BmiCalculator() {
  const [units, setUnits] = useState("metric");
  const [gender, setGender] = useState("female");
  const [age, setAge] = useState("");

  // metric state
  const [cm, setCm] = useState("");
  const [kg, setKg] = useState("");

  // imperial state
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [lb, setLb] = useState("");

  const [copied, setCopied] = useState(false);

  // localStorage hydration
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bmi:last") || "null");
      if (saved) {
        setUnits(saved.units ?? "metric");
        setGender(saved.gender ?? "female");
        setAge(saved.age ?? "");
        setCm(saved.cm ?? "");
        setKg(saved.kg ?? "");
        setFt(saved.ft ?? "");
        setInch(saved.inch ?? "");
        setLb(saved.lb ?? "");
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const payload = { units, gender, age, cm, kg, ft, inch, lb };
    localStorage.setItem("bmi:last", JSON.stringify(payload));
  }, [units, gender, age, cm, kg, ft, inch, lb]);

  const { bmi, valid, heightMeters } = useMemo(() => {
    let bmi = NaN;
    let heightMeters = NaN;
    if (units === "metric") {
      const _cm = Number(cm);
      const _kg = Number(kg);
      if (_cm > 0 && _kg > 0) {
        heightMeters = _cm / 100;
        bmi = _kg / (heightMeters * heightMeters);
      }
    } else {
      const _ft = Number(ft);
      const _in = Number(inch);
      const _lb = Number(lb);
      const totalInches = _ft * 12 + _in;
      if (totalInches > 0 && _lb > 0) {
        bmi = (703 * _lb) / (totalInches * totalInches);
        heightMeters = totalInches * 0.0254;
      }
    }
    return { bmi, valid: Number.isFinite(bmi) && bmi > 0, heightMeters };
  }, [units, cm, kg, ft, inch, lb]);

  const category = useMemo(() => getBmiCategory(bmi), [bmi]);

  const healthyRangeKg = useMemo(() => {
    if (!Number.isFinite(heightMeters)) return null;
    const min = 18.5 * heightMeters * heightMeters;
    const max = 24.9 * heightMeters * heightMeters;
    return { min, max };
  }, [heightMeters]);

  // Animated BMI number (spring count-up)
  const bmiMotion = useMotionValue(0);
  const bmiSpring = useSpring(bmiMotion, { stiffness: 90, damping: 18 });
  const bmiText = useTransform(bmiSpring, (v) => (v > 0 ? v.toFixed(1) : "0.0"));
  useEffect(() => {
    bmiMotion.set(valid ? bmi : 0);
  }, [bmi, valid, bmiMotion]);

  // Needle position on the gauge (0–100%)
  const needlePct = useMemo(() => {
    const v = Math.min(Math.max(bmi, GAUGE_MIN), GAUGE_MAX);
    return ((v - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)) * 100;
  }, [bmi]);

  const reset = () => {
    setCm("");
    setKg("");
    setFt("");
    setInch("");
    setLb("");
    setAge("");
  };

  const copyTimer = useRef(null);
  const copyBmi = async () => {
    if (!valid) return;
    try {
      await navigator.clipboard.writeText(bmi.toFixed(1));
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };
  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const isMinor = Number(age) > 0 && Number(age) < 20;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="relative overflow-hidden border-border/70 shadow-lg">
        {/* Gradient glow header band */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-br from-sky-500/15 via-emerald-500/10 to-amber-500/10 blur-2xl"
        />

        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white shadow-md shadow-emerald-500/20">
              <Activity className="size-5" />
            </span>
            <div>
              <CardTitle className="text-2xl tracking-tight">
                BMI Calculator
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Body Mass Index in metric (kg, cm) or imperial (lb, ft/in). 100%
                free — no data leaves your browser.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6">
          {/* Units toggle */}
          <div>
            <Label className="mb-2 block text-sm font-semibold">Units</Label>
            <RadioGroup
              value={units}
              onValueChange={(v) => setUnits(v)}
              className="grid grid-cols-2 gap-3 sm:w-max"
              aria-label="Select units"
            >
              {[
                { id: "metric", label: "Metric (kg, cm)" },
                { id: "imperial", label: "Imperial (lb, ft/in)" },
              ].map((u) => (
                <label
                  key={u.id}
                  htmlFor={u.id}
                  className={
                    "flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition-colors " +
                    (units === u.id
                      ? "border-emerald-500/60 bg-emerald-500/5"
                      : "hover:bg-muted/50")
                  }
                >
                  <RadioGroupItem id={u.id} value={u.id} />
                  <span className="text-sm">{u.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Gender + Age (used for tailored interpretation) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Gender</Label>
              <RadioGroup
                value={gender}
                onValueChange={(v) => setGender(v)}
                className="grid grid-cols-2 gap-3"
                aria-label="Select gender"
              >
                {[
                  { id: "female", label: "Female" },
                  { id: "male", label: "Male" },
                ].map((g) => (
                  <label
                    key={g.id}
                    htmlFor={`g-${g.id}`}
                    className={
                      "flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition-colors " +
                      (gender === g.id
                        ? "border-sky-500/60 bg-sky-500/5"
                        : "hover:bg-muted/50")
                    }
                  >
                    <RadioGroupItem id={`g-${g.id}`} value={g.id} />
                    <span className="text-sm">{g.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-semibold">
                Age <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="age"
                inputMode="numeric"
                placeholder="e.g. 28"
                value={age}
                onChange={(e) => setAge(sanitizeNum(e.target.value, false))}
              />
            </div>
          </div>

          {/* Measurement inputs */}
          {units === "metric" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field
                id="cm"
                label="Height (cm)"
                icon={<Ruler className="size-4" />}
                placeholder="e.g. 175"
                value={cm}
                onChange={(v) => setCm(sanitizeNum(v))}
              />
              <Field
                id="kg"
                label="Weight (kg)"
                icon={<Weight className="size-4" />}
                placeholder="e.g. 70"
                value={kg}
                onChange={(v) => setKg(sanitizeNum(v))}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field
                id="ft"
                label="Height (ft)"
                icon={<Ruler className="size-4" />}
                placeholder="e.g. 5"
                value={ft}
                onChange={(v) => setFt(sanitizeNum(v, false))}
                inputMode="numeric"
              />
              <Field
                id="inch"
                label="Height (in)"
                placeholder="e.g. 10"
                value={inch}
                onChange={(v) => setInch(sanitizeNum(v))}
              />
              <Field
                id="lb"
                label="Weight (lb)"
                icon={<Weight className="size-4" />}
                placeholder="e.g. 154"
                value={lb}
                onChange={(v) => setLb(sanitizeNum(v))}
              />
            </div>
          )}

          {/* Result panel */}
          <div className="rounded-2xl border bg-gradient-to-b from-muted/40 to-transparent p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-muted-foreground">Your BMI</span>
                <motion.span
                  className="text-4xl font-bold tabular-nums tracking-tight"
                  aria-live="polite"
                >
                  {valid ? bmiText : "—"}
                </motion.span>
              </div>
              <AnimatePresence mode="popLayout">
                {valid && (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Badge className={`${category.color} text-sm`}>
                      {category.name}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Gauge */}
            <div className="mt-6">
              <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 via-60% to-red-500">
                <AnimatePresence>
                  {valid && (
                    <motion.div
                      className="absolute -top-1.5 z-10"
                      style={{ left: `${needlePct}%` }}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 22 }}
                    >
                      <div className="-translate-x-1/2 size-6 rounded-full border-4 border-white bg-foreground shadow-lg ring-1 ring-black/10" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-3 grid grid-cols-4 text-center text-[11px] sm:text-xs">
                {[
                  { label: "<18.5", name: "Underweight", dot: "bg-sky-500" },
                  { label: "18.5–24.9", name: "Healthy", dot: "bg-emerald-500" },
                  { label: "25–29.9", name: "Overweight", dot: "bg-amber-500" },
                  { label: "≥30", name: "Obesity", dot: "bg-red-500" },
                ].map((s, i) => (
                  <div key={i} className="space-y-1">
                    <span
                      className={`mx-auto block size-2 rounded-full ${s.dot}`}
                    />
                    <div className="text-muted-foreground">{s.name}</div>
                    <div className="font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advice + healthy range */}
            <AnimatePresence>
              {valid && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 space-y-3 border-t pt-4">
                    <p className="flex items-start gap-2 text-sm">
                      <Sparkles className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span>{category.advice}</span>
                    </p>
                    {healthyRangeKg && (
                      <p className="text-sm text-muted-foreground">
                        Healthy weight range for your height:{" "}
                        <span className="font-semibold text-foreground">
                          {healthyRangeKg.min.toFixed(1)}–
                          {healthyRangeKg.max.toFixed(1)} kg
                        </span>{" "}
                        (~{(healthyRangeKg.min * 2.20462).toFixed(0)}–
                        {(healthyRangeKg.max * 2.20462).toFixed(0)} lb)
                      </p>
                    )}
                    {isMinor && (
                      <p className="rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
                        You entered an age under 20. For children and teens, BMI
                        should be read from age- and sex-specific percentile
                        charts, not the adult categories above.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>

        <CardFooter className="relative flex flex-wrap gap-3">
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button variant="secondary" onClick={reset} className="gap-2">
              <RotateCcw className="size-4" /> Reset
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.97 }}>
            <Button onClick={copyBmi} disabled={!valid} className="gap-2">
              {copied ? (
                <>
                  <Check className="size-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" /> Copy BMI
                </>
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function Field({
  id,
  label,
  icon,
  placeholder,
  value,
  onChange,
  inputMode = "decimal",
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1.5 text-sm">
        {icon}
        {label}
      </Label>
      <Input
        id={id}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function getBmiCategory(bmi) {
  if (!Number.isFinite(bmi))
    return {
      name: "—",
      advice: "Enter height and weight.",
      color: "bg-muted text-foreground",
    };
  if (bmi < 18.5)
    return {
      name: "Underweight",
      advice:
        "Your BMI is below the healthy range. A nutrient-dense eating plan and a check-in with a clinician can help you reach a healthy weight.",
      color: "bg-sky-600",
    };
  if (bmi < 25)
    return {
      name: "Healthy weight",
      advice:
        "Nice — your BMI is in the healthy range. Keep up balanced meals, regular activity, and good sleep to maintain it.",
      color: "bg-emerald-600",
    };
  if (bmi < 30)
    return {
      name: "Overweight",
      advice:
        "Your BMI is slightly above the healthy range. Small, sustainable habit changes around food and movement make the biggest difference.",
      color: "bg-amber-600",
    };
  return {
    name: "Obesity",
    advice:
      "Your BMI is in the obesity range. Consider speaking with a clinician or dietitian for a tailored, supportive plan.",
    color: "bg-red-600",
  };
}

function sanitizeNum(v, allowDecimal = true) {
  let out = v.replace(/[^0-9.]/g, "");
  if (!allowDecimal) out = out.replace(/\./g, "");
  const firstDot = out.indexOf(".");
  if (firstDot !== -1) {
    out =
      out.slice(0, firstDot + 1) + out.slice(firstDot + 1).replace(/\./g, "");
  }
  return out;
}
