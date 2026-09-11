"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Flame,
  Copy,
  Check,
  RotateCcw,
  Ruler,
  Weight,
  Utensils,
  Beef,
  Wheat,
  Droplet,
} from "lucide-react";

const ACTIVITY_LEVELS = [
  {
    id: "sedentary",
    label: "Sedentary",
    hint: "Little or no exercise, desk job",
    multiplier: 1.2,
  },
  {
    id: "light",
    label: "Lightly active",
    hint: "Light exercise 1-3 days/week",
    multiplier: 1.375,
  },
  {
    id: "moderate",
    label: "Moderately active",
    hint: "Moderate exercise 3-5 days/week",
    multiplier: 1.55,
  },
  {
    id: "active",
    label: "Very active",
    hint: "Hard exercise 6-7 days/week",
    multiplier: 1.725,
  },
  {
    id: "extra",
    label: "Extremely active",
    hint: "Physical job or 2x/day training",
    multiplier: 1.9,
  },
];

const GOALS = [
  { id: "lose", label: "Lose weight", deltaKcal: -500 },
  { id: "maintain", label: "Maintain weight", deltaKcal: 0 },
  { id: "gain", label: "Gain weight", deltaKcal: 500 },
];

const MACRO_SPLIT = {
  lose: { protein: 0.35, carbs: 0.35, fat: 0.3 },
  maintain: { protein: 0.3, carbs: 0.4, fat: 0.3 },
  gain: { protein: 0.3, carbs: 0.45, fat: 0.25 },
};

export default function CalorieCalculator() {
  const [units, setUnits] = useState("metric");
  const [gender, setGender] = useState("female");
  const [age, setAge] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("maintain");

  const [cm, setCm] = useState("");
  const [kg, setKg] = useState("");

  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [lb, setLb] = useState("");

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("calorie:last") || "null"
      );
      if (saved) {
        setUnits(saved.units ?? "metric");
        setGender(saved.gender ?? "female");
        setAge(saved.age ?? "");
        setActivity(saved.activity ?? "moderate");
        setGoal(saved.goal ?? "maintain");
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
    const payload = {
      units,
      gender,
      age,
      activity,
      goal,
      cm,
      kg,
      ft,
      inch,
      lb,
    };
    localStorage.setItem("calorie:last", JSON.stringify(payload));
  }, [units, gender, age, activity, goal, cm, kg, ft, inch, lb]);

  const { bmr, kgWeight, valid } = useMemo(() => {
    const _age = Number(age);
    let _kg = NaN;
    let heightCm = NaN;

    if (units === "metric") {
      _kg = Number(kg);
      heightCm = Number(cm);
    } else {
      const _lb = Number(lb);
      const totalInches = Number(ft) * 12 + Number(inch);
      _kg = _lb > 0 ? _lb * 0.453592 : NaN;
      heightCm = totalInches > 0 ? totalInches * 2.54 : NaN;
    }

    const isValid =
      _age > 0 && Number.isFinite(_kg) && _kg > 0 && Number.isFinite(heightCm) && heightCm > 0;

    if (!isValid) return { bmr: NaN, kgWeight: _kg, valid: false };

    // Mifflin-St Jeor equation
    const base = 10 * _kg + 6.25 * heightCm - 5 * _age;
    const _bmr = gender === "male" ? base + 5 : base - 161;

    return { bmr: _bmr, kgWeight: _kg, valid: true };
  }, [units, gender, age, cm, kg, ft, inch, lb]);

  const activityLevel = ACTIVITY_LEVELS.find((a) => a.id === activity);
  const tdee = valid ? bmr * activityLevel.multiplier : NaN;

  const activeGoal = GOALS.find((g) => g.id === goal);
  const targetCalories = valid
    ? Math.max(1200, Math.round(tdee + activeGoal.deltaKcal))
    : NaN;

  const macros = useMemo(() => {
    if (!Number.isFinite(targetCalories)) return null;
    const split = MACRO_SPLIT[goal];
    const proteinKcal = targetCalories * split.protein;
    const carbsKcal = targetCalories * split.carbs;
    const fatKcal = targetCalories * split.fat;
    return {
      protein: Math.round(proteinKcal / 4),
      carbs: Math.round(carbsKcal / 4),
      fat: Math.round(fatKcal / 9),
      proteinPct: Math.round(split.protein * 100),
      carbsPct: Math.round(split.carbs * 100),
      fatPct: Math.round(split.fat * 100),
    };
  }, [targetCalories, goal]);

  const reset = () => {
    setCm("");
    setKg("");
    setFt("");
    setInch("");
    setLb("");
    setAge("");
  };

  const copyResult = async () => {
    if (!Number.isFinite(targetCalories)) return;
    try {
      await navigator.clipboard.writeText(
        `${targetCalories} calories/day (BMR ${Math.round(
          bmr
        )}, TDEE ${Math.round(tdee)})`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="relative overflow-hidden border-border/70 shadow-lg">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-rose-500/10 blur-2xl"
        />

        <CardHeader className="relative">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20">
              <Flame className="size-5" />
            </span>
            <div>
              <CardTitle className="text-2xl tracking-tight">
                Calorie Calculator &amp; Diet Plan
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Daily calorie needs (TDEE), calories to lose or gain weight,
                and a suggested macro split — 100% free.
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
                { id: "cal-metric", value: "metric", label: "Metric (kg, cm)" },
                { id: "cal-imperial", value: "imperial", label: "Imperial (lb, ft/in)" },
              ].map((u) => (
                <label
                  key={u.id}
                  htmlFor={u.id}
                  className={
                    "flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition-colors " +
                    (units === u.value
                      ? "border-orange-500/60 bg-orange-500/5"
                      : "hover:bg-muted/50")
                  }
                >
                  <RadioGroupItem id={u.id} value={u.value} />
                  <span className="text-sm">{u.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Gender + Age */}
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
                    htmlFor={`cal-g-${g.id}`}
                    className={
                      "flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition-colors " +
                      (gender === g.id
                        ? "border-sky-500/60 bg-sky-500/5"
                        : "hover:bg-muted/50")
                    }
                  >
                    <RadioGroupItem id={`cal-g-${g.id}`} value={g.id} />
                    <span className="text-sm">{g.label}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cal-age" className="text-sm font-semibold">
                Age (years)
              </Label>
              <Input
                id="cal-age"
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
                id="cal-cm"
                label="Height (cm)"
                icon={<Ruler className="size-4" />}
                placeholder="e.g. 175"
                value={cm}
                onChange={(v) => setCm(sanitizeNum(v))}
              />
              <Field
                id="cal-kg"
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
                id="cal-ft"
                label="Height (ft)"
                icon={<Ruler className="size-4" />}
                placeholder="e.g. 5"
                value={ft}
                onChange={(v) => setFt(sanitizeNum(v, false))}
                inputMode="numeric"
              />
              <Field
                id="cal-inch"
                label="Height (in)"
                placeholder="e.g. 10"
                value={inch}
                onChange={(v) => setInch(sanitizeNum(v))}
              />
              <Field
                id="cal-lb"
                label="Weight (lb)"
                icon={<Weight className="size-4" />}
                placeholder="e.g. 154"
                value={lb}
                onChange={(v) => setLb(sanitizeNum(v))}
              />
            </div>
          )}

          {/* Activity level */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Activity level</Label>
            <RadioGroup
              value={activity}
              onValueChange={setActivity}
              className="grid grid-cols-1 gap-2 sm:grid-cols-2"
              aria-label="Select activity level"
            >
              {ACTIVITY_LEVELS.map((a) => (
                <label
                  key={a.id}
                  htmlFor={`act-${a.id}`}
                  className={
                    "flex cursor-pointer items-start gap-2 rounded-xl border p-3 transition-colors " +
                    (activity === a.id
                      ? "border-amber-500/60 bg-amber-500/5"
                      : "hover:bg-muted/50")
                  }
                >
                  <RadioGroupItem id={`act-${a.id}`} value={a.id} className="mt-0.5" />
                  <span>
                    <span className="block text-sm font-medium">{a.label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {a.hint}
                    </span>
                  </span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Goal */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Goal</Label>
            <RadioGroup
              value={goal}
              onValueChange={setGoal}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
              aria-label="Select goal"
            >
              {GOALS.map((g) => (
                <label
                  key={g.id}
                  htmlFor={`goal-${g.id}`}
                  className={
                    "flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition-colors " +
                    (goal === g.id
                      ? "border-rose-500/60 bg-rose-500/5"
                      : "hover:bg-muted/50")
                  }
                >
                  <RadioGroupItem id={`goal-${g.id}`} value={g.id} />
                  <span className="text-sm">{g.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Result panel */}
          <div className="rounded-2xl border bg-gradient-to-b from-muted/40 to-transparent p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="text-sm text-muted-foreground">
                  Daily calories for your goal
                </span>
                <span
                  className="text-4xl font-bold tabular-nums tracking-tight"
                  aria-live="polite"
                >
                  {Number.isFinite(targetCalories) ? targetCalories : "—"}
                </span>
              </div>
              {Number.isFinite(targetCalories) && (
                <Badge className="bg-orange-600 text-sm">
                  {activeGoal.label}
                </Badge>
              )}
            </div>

            <AnimatePresence>
              {valid && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-muted/40 p-3">
                      <p className="text-xs text-muted-foreground">
                        BMR (resting)
                      </p>
                      <p className="text-lg font-semibold">
                        {Math.round(bmr)} kcal
                      </p>
                    </div>
                    <div className="rounded-xl bg-muted/40 p-3">
                      <p className="text-xs text-muted-foreground">
                        TDEE (maintenance)
                      </p>
                      <p className="text-lg font-semibold">
                        {Math.round(tdee)} kcal
                      </p>
                    </div>
                  </div>

                  {macros && (
                    <div className="mt-4">
                      <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                        <Utensils className="size-4 text-orange-500" />
                        Suggested daily diet plan (macros)
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <MacroCard
                          icon={<Beef className="size-4" />}
                          label="Protein"
                          grams={macros.protein}
                          pct={macros.proteinPct}
                          color="text-rose-500"
                        />
                        <MacroCard
                          icon={<Wheat className="size-4" />}
                          label="Carbs"
                          grams={macros.carbs}
                          pct={macros.carbsPct}
                          color="text-amber-500"
                        />
                        <MacroCard
                          icon={<Droplet className="size-4" />}
                          label="Fat"
                          grams={macros.fat}
                          pct={macros.fatPct}
                          color="text-sky-500"
                        />
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        {goal === "lose" &&
                          "This is a moderate ~500 kcal/day deficit, roughly 0.5 kg (1 lb) of fat loss per week — a pace considered sustainable."}
                        {goal === "maintain" &&
                          "This matches your estimated maintenance calories (TDEE) to keep your current weight steady."}
                        {goal === "gain" &&
                          "This is a moderate ~500 kcal/day surplus, roughly 0.5 kg (1 lb) of weight gain per week, paired with resistance training for muscle gain."}
                      </p>
                    </div>
                  )}
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
            <Button
              onClick={copyResult}
              disabled={!Number.isFinite(targetCalories)}
              className="gap-2"
            >
              {copied ? (
                <>
                  <Check className="size-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-4" /> Copy result
                </>
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function MacroCard({ icon, label, grams, pct, color }) {
  return (
    <div className="rounded-xl border bg-background/60 p-3">
      <p className={`flex items-center gap-1.5 text-xs font-medium ${color}`}>
        {icon}
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold tabular-nums">{grams}g</p>
      <p className="text-xs text-muted-foreground">{pct}% of calories</p>
    </div>
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
