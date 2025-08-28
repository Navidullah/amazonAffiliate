"use client";

import { useEffect, useMemo, useState } from "react";
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

export default function BmiCalculator() {
  const [units, setUnits] = useState("metric");

  // metric state
  const [cm, setCm] = useState("");
  const [kg, setKg] = useState("");

  // imperial state
  const [ft, setFt] = useState("");
  const [inch, setInch] = useState("");
  const [lb, setLb] = useState("");

  // derived + localStorage hydration
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bmi:last") || "null");
      if (saved) {
        setUnits(saved.units);
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
    const payload = { units, cm, kg, ft, inch, lb };
    localStorage.setItem("bmi:last", JSON.stringify(payload));
  }, [units, cm, kg, ft, inch, lb]);

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

  const reset = () => {
    setCm("");
    setKg("");
    setFt("");
    setInch("");
    setLb("");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">BMI Calculator</CardTitle>
        <p className="text-sm text-muted-foreground">
          Body Mass Index using metric or imperial units. No data leaves your
          browser.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Units toggle */}
        <div>
          <Label className="mb-2 block">Units</Label>
          <RadioGroup
            value={units}
            onValueChange={(v) => setUnits(v)}
            className="grid grid-cols-2 gap-3 sm:w-max"
            aria-label="Select units"
          >
            <div className="flex items-center gap-2 rounded-xl border p-3">
              <RadioGroupItem id="metric" value="metric" />
              <Label htmlFor="metric" className="cursor-pointer">
                Metric (kg, cm)
              </Label>
            </div>
            <div className="flex items-center gap-2 rounded-xl border p-3">
              <RadioGroupItem id="imperial" value="imperial" />
              <Label htmlFor="imperial" className="cursor-pointer">
                Imperial (lb, ft/in)
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Inputs */}
        {units === "metric" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cm">Height (cm)</Label>
              <Input
                id="cm"
                inputMode="decimal"
                placeholder="e.g. 175"
                value={cm}
                onChange={(e) => setCm(sanitizeNum(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kg">Weight (kg)</Label>
              <Input
                id="kg"
                inputMode="decimal"
                placeholder="e.g. 70"
                value={kg}
                onChange={(e) => setKg(sanitizeNum(e.target.value))}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ft">Height (ft)</Label>
              <Input
                id="ft"
                inputMode="numeric"
                placeholder="e.g. 5"
                value={ft}
                onChange={(e) => setFt(sanitizeNum(e.target.value, false))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inch">Height (in)</Label>
              <Input
                id="inch"
                inputMode="decimal"
                placeholder="e.g. 10"
                value={inch}
                onChange={(e) => setInch(sanitizeNum(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lb">Weight (lb)</Label>
              <Input
                id="lb"
                inputMode="decimal"
                placeholder="e.g. 154"
                value={lb}
                onChange={(e) => setLb(sanitizeNum(e.target.value))}
              />
            </div>
          </div>
        )}

        {/* Result */}
        <div className="rounded-xl border p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Your BMI</span>
            <Badge variant="secondary" className="text-lg">
              {valid ? bmi.toFixed(1) : "—"}
            </Badge>
            {valid && (
              <Badge
                className={
                  category.name === "Underweight"
                    ? "bg-sky-600"
                    : category.name === "Healthy weight"
                      ? "bg-green-600"
                      : category.name === "Overweight"
                        ? "bg-amber-600"
                        : "bg-red-600"
                }
              >
                {category.name}
              </Badge>
            )}
          </div>

          {/* Category scale */}
          <div className="mt-4 grid grid-cols-4 text-center text-xs sm:text-sm">
            {[
              { label: "<18.5", name: "Underweight" },
              { label: "18.5–24.9", name: "Healthy" },
              { label: "25–29.9", name: "Overweight" },
              { label: "≥30", name: "Obesity" },
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <div
                  className={
                    "mx-auto h-2 w-20 rounded-full " +
                    (i === 0
                      ? "bg-sky-500"
                      : i === 1
                        ? "bg-green-500"
                        : i === 2
                          ? "bg-amber-500"
                          : "bg-red-500")
                  }
                />
                <div className="text-muted-foreground">{s.name}</div>
                <div className="font-medium">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Healthy range */}
          {valid && healthyRangeKg && (
            <p className="mt-4 text-sm text-muted-foreground">
              Healthy weight range at your height:{" "}
              <span className="font-medium">
                {healthyRangeKg.min.toFixed(1)}–{healthyRangeKg.max.toFixed(1)}{" "}
                kg
              </span>
              {units === "imperial" && (
                <>
                  {" "}
                  (~{(healthyRangeKg.min * 2.20462).toFixed(0)}–
                  {(healthyRangeKg.max * 2.20462).toFixed(0)} lb)
                </>
              )}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={reset}>
          Reset
        </Button>
        <Button
          onClick={() =>
            navigator.clipboard.writeText(valid ? bmi.toFixed(1) : "")
          }
          disabled={!valid}
        >
          Copy BMI
        </Button>
      </CardFooter>
    </Card>
  );
}

function getBmiCategory(bmi) {
  if (!Number.isFinite(bmi))
    return { name: "—", advice: "Enter height and weight." };
  if (bmi < 18.5)
    return {
      name: "Underweight",
      advice: "Consider a nutrition plan to reach a healthy range.",
    };
  if (bmi < 25)
    return {
      name: "Healthy weight",
      advice: "Great! Keep up balanced diet and activity.",
    };
  if (bmi < 30)
    return {
      name: "Overweight",
      advice: "Small lifestyle tweaks can help—focus on habits.",
    };
  return {
    name: "Obesity",
    advice: "Consider speaking with a clinician for tailored guidance.",
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
