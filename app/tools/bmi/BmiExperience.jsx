"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Activity,
  HeartPulse,
  Ruler,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Gauge,
  Salad,
  Dumbbell,
  LayoutGrid,
  ScanLine,
  FileArchive,
  ImageDown,
} from "lucide-react";
import BmiCalculator from "@/app/components/tools/BmiCalculator";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const features = [
  {
    icon: Gauge,
    title: "Instant BMI & category",
    desc: "Enter your height and weight and see your BMI, category, and gauge update instantly.",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    icon: Ruler,
    title: "Metric or imperial",
    desc: "Works in kg & cm or lb & ft/in, plus your healthy weight range for your exact height.",
    accent: "from-teal-500 to-cyan-500",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    desc: "The calculation runs fully in your browser — your data never leaves your device.",
    accent: "from-rose-500 to-emerald-500",
  },
];

const steps = [
  {
    icon: Ruler,
    title: "Enter your details",
    desc: "Add your height, weight, and optionally age and gender for context.",
  },
  {
    icon: Activity,
    title: "See your BMI instantly",
    desc: "Watch your BMI and category update live on the colour-coded gauge.",
  },
  {
    icon: HeartPulse,
    title: "Get your healthy range",
    desc: "View the healthy weight range for your height in both kg and lb.",
  },
];

const relatedTools = [
  {
    icon: FileArchive,
    label: "Compress a PDF file",
    href: "/tools/compress-your-pdf-file",
  },
  {
    icon: ImageDown,
    label: "Compress an image",
    href: "/tools/image-compressor",
  },
  {
    icon: ScanLine,
    label: "Convert PDF to Word",
    href: "/tools/convert-your-pdf-file-to-word",
  },
  {
    icon: UploadCloud,
    label: "Remove image background",
    href: "/tools/background-remover-image",
  },
  {
    icon: LayoutGrid,
    label: "Browse all free tools",
    href: "/tools",
  },
];

const faqs = [
  {
    q: "How do I calculate BMI manually?",
    a: "In metric units, BMI = weight (kg) ÷ height (m)². In imperial units, BMI = (weight (lb) ÷ height (in)²) × 703. For example, a person who is 1.75 m and 70 kg has a BMI of 70 ÷ (1.75 × 1.75) = 22.9, which falls in the healthy range. In imperial units, someone who is 5 ft 9 in (69 in) and 154 lb works out to (154 ÷ 69²) × 703 = 22.7 — the same result, just rounded differently because of unit conversion. The two formulas always agree once you convert units consistently, so pick whichever matches the units on your bathroom scale and tape measure. The calculator above runs either formula instantly and also shows your category on a colour-coded chart, so you don't need to do the arithmetic by hand unless you want to double-check it.",
  },
  {
    q: "Is my BMI healthy?",
    a: "For most adults, the World Health Organization's classification puts 18.5 to 24.9 in the healthy range. Below 18.5 is underweight, 25 to 29.9 is overweight, 30 to 39.9 spans Obesity Class I and II, and 40 or above is Obesity Class III. For example, someone who is 1.70 m tall is in the healthy range between roughly 53 kg and 72 kg. BMI is a population-level screening tool, not a diagnosis, so a single number in or out of range doesn't tell the whole story — pair it with waist circumference (a marker for visceral fat), blood pressure, blood sugar, and activity level for a fuller picture, and treat a borderline result as a prompt to check in with a doctor rather than a verdict.",
  },
  {
    q: "What does my BMI number actually mean?",
    a: "Your BMI estimates whether your weight is under, healthy, over, or in the obesity range relative to your height, using the same weight-to-height-squared formula doctors and public health agencies have used for decades. A higher BMI is statistically linked with greater risk of conditions like type 2 diabetes, high blood pressure, and cardiovascular disease — for example, research consistently shows the risk of type 2 diabetes roughly doubles as BMI rises from the healthy range into the obese range. A very low BMI (under 18.5) can signal undernutrition or an underlying health issue instead. The key caveat: BMI is an indicator based on population averages, not an individual diagnosis, so it should always be read alongside other health markers rather than in isolation.",
  },
  {
    q: "Is BMI calculated differently for men and women?",
    a: "No — for adults aged 20 and over, BMI uses the exact same formula and the exact same category thresholds (18.5, 25, 30) for men and women. What differs is body composition: women typically carry a higher percentage of essential body fat (roughly 10-13%) than men (roughly 3-5%) at the same BMI, so two people with an identical BMI of, say, 24 can have noticeably different muscle-to-fat ratios depending on sex. Some national health bodies also apply lower BMI risk thresholds for certain ethnic groups (for example, parts of Asia use 23 instead of 25 as the overweight cutoff) because health risk at a given BMI can vary by population — but the calculation itself never changes by gender.",
  },
  {
    q: "What is a healthy BMI by age?",
    a: "For adults aged 20 and older, the standard healthy range of 18.5-24.9 applies fairly consistently across age groups, though some clinicians allow a slightly higher target (up to around 27) for adults over 65, since a small buffer above 'healthy' is linked to better resilience during illness and a lower risk of frailty in older age. For anyone under 20, adult BMI categories don't apply at all — children and teens must be plotted on age- and sex-specific growth percentile charts (like the CDC or WHO growth charts), because what counts as a healthy BMI for a 10-year-old is very different from a 17-year-old. Always use a pediatric growth chart, not this adult calculator, for anyone under 20.",
  },
  {
    q: "What is the healthy weight for my height?",
    a: "A healthy weight is whatever weight keeps your BMI between 18.5 and 24.9 for your specific height — there's no single 'ideal number' that applies to everyone the same height, since frame size and muscle mass vary. For example, at 1.65 m (5 ft 5 in), the healthy BMI range works out to roughly 50-68 kg (about 112-150 lb); at 1.80 m (5 ft 11 in), it's roughly 60-81 kg (about 132-178 lb). Enter your own height in the calculator above and it instantly shows your personal healthy weight range in both kilograms and pounds, plus where your current weight sits on the chart, so you don't have to do the range math yourself.",
  },
  {
    q: "How can I lower my BMI safely?",
    a: "The safest approach is a moderate, sustained calorie deficit rather than a crash diet: cutting roughly 500 calories a day from your maintenance level typically produces about 0.5 kg (1 lb) of fat loss per week, which is widely considered a sustainable pace that preserves muscle mass. Pair that with at least 150 minutes of moderate activity per week (brisk walking, cycling, swimming) plus two sessions of resistance training to protect muscle while you lose fat, 7-9 hours of sleep (poor sleep is linked to higher hunger hormones), and basic stress management, since chronic stress raises cortisol and can drive fat storage. Avoid very-low-calorie crash diets — they often cause muscle loss alongside fat loss and are hard to maintain, so the weight tends to return. If you have a medical condition or a large amount of weight to lose, loop in a doctor before changing your diet significantly.",
  },
  {
    q: "Is BMI accurate for everyone?",
    a: "Not always — BMI only looks at weight relative to height, so it cannot distinguish muscle from fat or show where fat is stored on the body, which means it can misclassify several groups. A bodybuilder who is 1.80 m and 95 kg with low body fat can score a BMI of 29.3 ('overweight') despite being lean and athletic, simply because muscle is denser than fat. Pregnant women, older adults who have lost muscle mass (sarcopenia), and some ethnic groups with different typical body compositions can also be misclassified in either direction. Use BMI as a quick starting point and pair it with waist circumference, blood pressure, blood sugar, and lipid panels for a much more reliable picture of metabolic health than BMI alone can provide.",
  },
  {
    q: "Is this BMI calculator free and private?",
    a: "Yes. It is completely free with no signup, and the calculation runs entirely in your browser — your height, weight, age, and gender are never sent to a server.",
  },
];

const CHART = [
  {
    cat: "Underweight",
    range: "< 18.5",
    note: "May reflect inadequate intake or other conditions; consider a clinical review.",
  },
  {
    cat: "Healthy weight",
    range: "18.5 – 24.9",
    note: "Generally associated with lower cardiometabolic risk.",
  },
  {
    cat: "Overweight",
    range: "25 – 29.9",
    note: "Risk begins to rise; evaluate lifestyle and other health markers.",
  },
  {
    cat: "Obesity (Class I)",
    range: "30 – 34.9",
    note: "Higher risk; professional guidance is often beneficial.",
  },
  {
    cat: "Obesity (Class II)",
    range: "35 – 39.9",
    note: "Significant risk; medical support strongly advised.",
  },
  {
    cat: "Obesity (Class III)",
    range: "40 +",
    note: "Very high risk; consider multidisciplinary care plans.",
  },
];

const KEYWORDS = [
  "bmi calculator kg and cm",
  "bmi calculator with age and gender",
  "bmi calculator for women by age",
  "bmi calculator for men by age",
  "how to calculate bmi manually",
  "is my bmi healthy",
  "what does my bmi mean",
  "healthy weight for my height",
  "normal bmi range for adults",
  "bmi chart by age and height",
  "ideal weight for height calculator",
  "bmi calculator metric",
  "bmi formula example",
  "how to lower my bmi",
  "what is a good bmi for my age",
  "free bmi calculator no signup",
  "bmi calculator female",
  "bmi calculator male",
  "overweight bmi range",
  "obese bmi number",
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/[0.03]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      {/* Answer stays mounted (height-animated) so the text is always in the
          DOM and indexable by Google, even when visually collapsed. */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
        aria-hidden={!isOpen}
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {faq.a}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function BmiExperience() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50/60 via-white to-teal-50/40 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[120px] dark:bg-emerald-600/20" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[360px] w-[360px] rounded-full bg-teal-400/20 blur-[120px] dark:bg-teal-600/10" />

      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <motion.header
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mb-12 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-500/20 dark:bg-white/[0.04] dark:text-emerald-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Free • No signup • Private in your browser
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            BMI Calculator{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent dark:from-emerald-300 dark:via-teal-300 dark:to-cyan-200">
              (kg &amp; cm)
            </span>{" "}
            by Age and Gender
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg"
          >
            Check your Body Mass Index in seconds. Find out whether your BMI
            is healthy, see your category on the BMI chart, and discover the
            healthy weight range for your height — for both women and men.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400"
          >
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> No sign up
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Runs in your browser
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Metric &amp; imperial
            </span>
          </motion.div>
        </motion.header>

        {/* Calculator */}
        <section className="mb-20">
          <BmiCalculator />
        </section>

        {/* Features */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 grid gap-6 sm:grid-cols-3"
        >
          {features.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative overflow-hidden rounded-3xl border border-gray-200/70 bg-white/70 p-6 backdrop-blur-xl transition-shadow hover:shadow-[0_24px_64px_-30px_rgba(16,185,129,0.5)] dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.desc}
              </p>
            </motion.article>
          ))}
        </motion.section>

        {/* How to */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            How to check your BMI
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            Three simple steps. No signup, no app to install.
          </motion.p>

          <div className="relative mt-10 grid gap-6 sm:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent dark:via-emerald-500/30 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center rounded-3xl border border-gray-200/70 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
              >
                <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30">
                  <step.icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-xs font-bold text-white dark:border-gray-950">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SEO content */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20 rounded-3xl border border-gray-200/70 bg-white/70 p-7 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03] sm:p-10"
        >
          <motion.h2
            variants={fadeUp}
            className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            What is BMI (Body Mass Index)?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Body Mass Index (BMI) is a simple weight-to-height ratio used to
            screen whether your weight sits in a healthy range. Our free BMI
            calculator works in <strong>kg and cm</strong> or{" "}
            <strong>lb and ft/in</strong>, and instantly compares your result
            with the standard BMI categories. BMI is not a diagnosis on its
            own, but it is a fast, useful flag for when a closer look at
            diet, activity, and clinical markers is worthwhile.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            How to calculate BMI manually (formula &amp; example)
          </motion.h3>
          <motion.ul
            variants={fadeUp}
            className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>
              <strong>Metric:</strong> BMI = weight (kg) ÷ height (m)²
            </li>
            <li>
              <strong>Imperial:</strong> BMI = (weight (lb) ÷ height (in)²) ×
              703
            </li>
          </motion.ul>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <strong>Example:</strong> someone who is 1.75 m tall and weighs
            70 kg has a BMI of 70 ÷ (1.75 × 1.75) = <strong>22.9</strong>,
            which falls in the healthy range. For a full step-by-step
            walkthrough with more worked examples, see our guide on{" "}
            <Link
              href="/blog/how-to-calculate-bmi-manually"
              className="font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
            >
              how to calculate your BMI manually
            </Link>
            .
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Adult BMI chart &amp; weight categories
          </motion.h3>
          <motion.div
            variants={fadeUp}
            className="mt-3 overflow-x-auto rounded-xl border border-gray-200/70 dark:border-white/10"
          >
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-white/[0.04]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                    BMI range
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {CHART.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-200/70 dark:border-white/10"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                      {row.cat}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-700 dark:text-gray-300">
                      {row.range}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Is my BMI healthy by age and gender?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            For adults aged 20 and over, the healthy BMI range of{" "}
            <strong>18.5–24.9</strong> applies to both women and men — the
            formula and categories do not change by gender. Body composition
            differs between sexes and shifts with age, so BMI is best read
            alongside other measures. For anyone <strong>under 20</strong>,
            BMI should be plotted on age- and sex-specific percentile charts
            rather than the adult bands above.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            What is the healthy weight for my height?
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            A healthy weight is whatever puts your BMI between 18.5 and 24.9
            for your height. The calculator above shows your personal
            healthy weight range in both kilograms and pounds as soon as you
            enter your height — a quick way to set a realistic target
            weight.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Why BMI matters
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            As BMI rises, the statistical risk of conditions such as type 2
            diabetes, high blood pressure, heart disease, sleep apnea, and
            fatty liver disease tends to increase. A very low BMI, on the
            other hand, can be linked with nutrient deficiencies or other
            health issues. That makes BMI a helpful early signal worth
            tracking over time.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 text-lg font-semibold text-gray-900 dark:text-white"
          >
            Where BMI falls short
          </motion.h3>
          <motion.ul
            variants={fadeUp}
            className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>It does not distinguish between muscle, bone, and fat mass.</li>
            <li>
              It does not reflect where fat is stored (abdominal vs.
              peripheral).
            </li>
            <li>
              It can misclassify athletes, older adults with muscle loss, and
              people from ethnic groups whose risk rises at different BMIs.
            </li>
          </motion.ul>
          <motion.p
            variants={fadeUp}
            className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            For a fuller assessment, combine BMI with{" "}
            <strong>waist circumference</strong>,{" "}
            <strong>body composition</strong>, blood pressure, blood lipids,
            A1C/fasting glucose, and your clinical history.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="mt-8 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white"
          >
            <Salad className="h-5 w-5 text-emerald-500" />
            How to lower your BMI safely
          </motion.h3>
          <motion.ol
            variants={fadeUp}
            className="mt-2 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
          >
            <li>
              <strong>Build balanced meals.</strong> Emphasize vegetables,
              fruits, legumes, whole grains, lean proteins, and healthy fats;
              limit ultra-processed foods and added sugars.
            </li>
            <li>
              <strong>Move regularly.</strong> Aim for at least 150 minutes
              of moderate activity per week, plus 2+ days of resistance
              training.
            </li>
            <li>
              <strong>Sleep &amp; stress.</strong> Prioritize 7–9 hours of
              sleep and steady stress-management habits.
            </li>
            <li>
              <strong>Track gently.</strong> Periodic check-ins on weight,
              waist size, and energy guide small adjustments.
            </li>
            <li>
              <strong>Seek support.</strong> Dietitians and physicians can
              help with plateaus, medications, or other options when
              appropriate.
            </li>
          </motion.ol>

          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
          >
            <Dumbbell className="h-3.5 w-3.5" />
            This BMI calculator is for general educational purposes only and
            is not a substitute for professional medical advice, diagnosis,
            or treatment. Always consult a qualified healthcare provider
            about your health.
          </motion.div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            Frequently asked questions
          </motion.h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </motion.section>

        {/* Related tools (internal links) */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl"
          >
            Related free tools
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-center text-sm text-gray-600 dark:text-gray-400"
          >
            More handy document and image utilities — all free, no signup.
          </motion.p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200/70 bg-white/70 p-4 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-emerald-400/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-300">
                    <tool.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {tool.label}
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-500" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Related searches (long-tail keywords) */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            Related searches
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-1 text-sm text-gray-600 dark:text-gray-400"
          >
            People also look for these BMI and healthy-weight topics:
          </motion.p>
          <motion.ul variants={fadeUp} className="mt-4 flex flex-wrap gap-2">
            {KEYWORDS.map((kw, i) => (
              <li
                key={i}
                className="rounded-full border border-gray-200/70 bg-white/70 px-3 py-1 text-xs text-gray-600 backdrop-blur transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400"
              >
                {kw}
              </li>
            ))}
          </motion.ul>
        </motion.section>

        {/* CTA footer */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-emerald-200/50 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-500 p-8 text-center shadow-xl sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="text-2xl font-bold text-white">
            Need more handy tools?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-emerald-50/90">
            Explore the full collection of free, fast, and privacy-friendly
            utilities.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg transition-transform hover:scale-105"
          >
            Browse all tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </main>
  );
}
