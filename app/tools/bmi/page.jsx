// app/tools/bmi/page.jsx

import BmiCalculator from "@/app/components/tools/BmiCalculator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";

/** --- SEO (keyword-optimized) --- */
export const metadata = {
  title:
    "Free BMI Calculator Online | Body Mass Index (BMI) Chart, Healthy Ranges & Formula",
  description:
    "Use our free BMI calculator online to check your body mass index. View BMI chart categories, healthy BMI ranges, and learn how to manage weight safely.",
  alternates: { canonical: "/tools/bmi" },
  openGraph: {
    type: "article",
    url: `${BASE_URL}/tools/bmi`,
    title:
      "Free BMI Calculator Online | Body Mass Index (BMI) Chart, Healthy Ranges & Formula",
    description:
      "Instant BMI calculator with chart categories and healthy weight ranges. Understand BMI meaning, formulas, and safe weight management tips.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator Online – Body Mass Index Guide & Chart",
    description:
      "Free BMI calculator with BMI formula, chart, categories, and health tips. Understand BMI ranges for adults and how to use BMI wisely.",
  },
};

/** --- Keyword list (from your Excel) for a user-facing “Related searches” section --- */
const KEYWORDS = [
  "bmi",
  "body mass index",
  "bmi calculator",
  "bmi calculator women",
  "bmi chart",
  "bmi calculator female",
  "bmi scale",
  "body mass index calculator",
  "bmi calculator men",
  "bmi chart women",
  "bmi test",
  "bmi index",
  "ideal weight calculator",
  "my bmi",
  "bmi calculator male",
  "best scale for body fat",
  "bmi calculator kg",
  "bmi calculator by age",
  "obese bmi",
  "imc calculator",
  "calculate my bmi",
  "obesity chart",
  "overweight bmi",
  "bmi clinic",
  "overweight calculator",
  "healthy weight calculator",
  "bmi for women",
  "bmi checker",
  "body mass index chart",
  "scale with body fat",
];

const faq = [
  {
    q: "How do I calculate BMI?",
    a: (
      <>
        In metric units: <strong>BMI = weight (kg) ÷ [height (m)]²</strong>. In
        imperial units:
        <strong> BMI = (weight (lb) ÷ [height (in)]²) × 703</strong>. Use the
        calculator above to compute it instantly.
      </>
    ),
  },
  {
    q: "What is BMI (Body Mass Index) and what does it tell me?",
    a: (
      <>
        BMI is a quick screening tool that estimates whether your weight is
        under, healthy, over, or in the obesity range for your height. It helps
        flag potential risk, but it is not a diagnosis on its own.
      </>
    ),
  },
  {
    q: "Is BMI accurate for everyone?",
    a: (
      <>
        Not always. BMI does not distinguish muscle from fat or reflect fat
        distribution. Athletes, older adults, pregnant people, and some ethnic
        groups may be misclassified. Pair BMI with other measures like waist
        size, blood pressure, lipids, and blood sugar.
      </>
    ),
  },
  {
    q: "What’s a healthy BMI range for adults?",
    a: (
      <>
        For most adults: <strong>18.5–24.9</strong>. Overweight:{" "}
        <strong>25–29.9</strong>. Obesity: <strong>30+</strong>. Underweight is{" "}
        <strong>&lt; 18.5</strong>.
      </>
    ),
  },
  {
    q: "How to improve BMI safely?",
    a: (
      <>
        Focus on sustainable habits: balanced meals rich in whole foods, regular
        physical activity, sleep, stress management, and support from health
        professionals when needed. Rapid, extreme diets are rarely sustainable.
      </>
    ),
  },
  {
    q: "Is there a BMI chart for adults?",
    a: (
      <>
        Yes—see the BMI chart below: underweight (&lt;18.5), healthy weight
        (18.5–24.9), overweight (25–29.9), and obesity (30+). It applies to most
        adults 20+.
      </>
    ),
  },
  {
    q: "Which other metrics should I use besides BMI?",
    a: (
      <>
        Combine BMI with <strong>waist circumference</strong>,{" "}
        <strong>body composition</strong> estimates, and clinical markers (blood
        pressure, A1C, lipids) for a more complete picture.
      </>
    ),
  },
];

export default function BmiToolPage() {
  // FAQ JSON-LD
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: stripTags(item.q),
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainHtml(item.a),
      },
    })),
  };

  return (
    <main className="bg-background mx-auto max-w-3xl px-4 py-10 space-y-10">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Intro + Calculator */}
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Free BMI Calculator Online (Body Mass Index)
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Check your Body Mass Index instantly and learn how to interpret it —
          what it means, where it helps, where it falls short, and how to use it
          wisely for your health.
        </p>
      </header>

      <BmiCalculator />

      <Separator />

      {/* Article */}
      <article className="max-w-none">
        <h2>What Is BMI (Body Mass Index)?</h2>
        <p>
          Body Mass Index (BMI) is a simple weight-to-height ratio. Our free BMI
          calculator online helps you check your BMI instantly and compare it
          with standard BMI categories. While BMI is not a diagnosis, it can
          flag when a closer look is warranted—diet quality, activity level, and
          clinical markers like blood pressure and blood sugar.
        </p>

        <h2>How to Calculate BMI — Formula & Example</h2>
        <ul>
          <li>
            <strong>Metric:</strong> BMI = weight (kg) ÷ [height (m)]
            <sup>2</sup>
          </li>
          <li>
            <strong>Imperial:</strong> BMI = (weight (lb) ÷ [height (in)]
            <sup>2</sup>) × 703
          </li>
        </ul>

        <h2>Adult BMI Chart & Categories</h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">BMI Range</th>
                <th className="px-4 py-3 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-3">Underweight</td>
                <td className="px-4 py-3">&lt; 18.5</td>
                <td className="px-4 py-3">
                  May reflect inadequate intake or other conditions; consider
                  clinical review.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">Healthy weight</td>
                <td className="px-4 py-3">18.5–24.9</td>
                <td className="px-4 py-3">
                  Generally associated with lower cardiometabolic risk.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">Overweight</td>
                <td className="px-4 py-3">25–29.9</td>
                <td className="px-4 py-3">
                  Risk begins to rise; evaluate lifestyle and other health
                  markers.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">Obesity (Class I)</td>
                <td className="px-4 py-3">30–34.9</td>
                <td className="px-4 py-3">
                  Higher risk; professional guidance is often beneficial.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">Obesity (Class II)</td>
                <td className="px-4 py-3">35–39.9</td>
                <td className="px-4 py-3">
                  Significant risk; medical support strongly advised.
                </td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-3">Obesity (Class III)</td>
                <td className="px-4 py-3">40+</td>
                <td className="px-4 py-3">
                  Very high risk; consider multidisciplinary care plans.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Why BMI Matters</h2>
        <p>
          As BMI rises, the statistical risk of certain conditions—like type 2
          diabetes, high blood pressure, heart disease, sleep apnea, and fatty
          liver disease—tends to increase. Conversely, a very low BMI may be
          linked to nutrient deficiencies or other health issues.
        </p>

        <h2>Where BMI Falls Short</h2>
        <ul>
          <li>It does not distinguish between muscle, bone, and fat mass.</li>
          <li>
            It doesn’t reflect fat distribution (e.g., abdominal vs.
            peripheral).
          </li>
          <li>
            It may misclassify athletes, older adults with sarcopenia, and
            individuals from different ethnic groups who face risk at different
            BMIs.
          </li>
        </ul>
        <p className="mt-2">
          For a more complete assessment, consider{" "}
          <strong>waist circumference</strong>,{" "}
          <strong>body composition</strong> estimates, blood pressure, blood
          lipids, A1C/fasting glucose, and clinical history.
        </p>

        <h2>How to Improve or Maintain a Healthy BMI</h2>
        <ol>
          <li>
            <strong>Build balanced meals.</strong> Emphasize vegetables, fruits,
            legumes, whole grains, lean proteins, and healthy fats while
            limiting ultra-processed foods and added sugars.
          </li>
          <li>
            <strong>Move regularly.</strong> Aim for at least 150 minutes of
            moderate activity weekly, plus 2+ days of resistance training.
          </li>
          <li>
            <strong>Sleep &amp; stress.</strong> Prioritize 7–9 hours of sleep
            and stress-management habits.
          </li>
          <li>
            <strong>Track gently.</strong> Periodic check-ins with weight, waist
            size, and energy levels can guide adjustments.
          </li>
          <li>
            <strong>Seek support.</strong> Dietitians, physicians, and
            structured programs can help with plateaus, medications, or surgical
            options where appropriate.
          </li>
        </ol>

        <h2>Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faq.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx + 1}`}>
              <AccordionTrigger className="text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="[&_p]:mt-2 [&_strong]:font-semibold">
                <p>{item.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Related searches (keyword list) */}
        <section className="mt-10">
          <h2 className="mb-3">Related searches</h2>
          <p className="text-sm text-muted-foreground mb-3">
            People also look for these BMI and healthy-weight topics:
          </p>
          <ul className="flex flex-wrap gap-2">
            {KEYWORDS.map((kw, i) => (
              <li
                key={i}
                className="text-xs rounded-full border px-3 py-1 bg-muted/30"
              >
                {kw}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}

/** Helpers to serialize FAQ content into JSON-LD safely */
function stripTags(text) {
  return String(text).replace(/<[^>]*>/g, "");
}
function toPlainHtml(node) {
  // We only used simple text/strong tags in the answers; stringify safely.
  // If you later add React nodes, update this serializer accordingly.
  return stripTags(renderToText(node));
}
function renderToText(node) {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(renderToText).join("");
  if (!node || typeof node !== "object") return "";
  const children = node.props?.children ?? "";
  return renderToText(children);
}
