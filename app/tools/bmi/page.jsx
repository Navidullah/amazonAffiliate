// app/tools/bmi/page.jsx

import Link from "next/link";
import BmiCalculator from "@/app/components/tools/BmiCalculator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Home } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/bmi`;

/** --- SEO (low-competition, long-tail keyword optimized) --- */
export const metadata = {
  title: {
    absolute:
      "BMI Calculator (kg & cm) by Age and Gender — Free Online | Shopyor",
  },
  description:
    "Free BMI calculator in kg & cm or lb & ft. Check if your BMI is healthy by age and gender, see your weight category on the BMI chart, and find the healthy weight for your height. No signup.",
  keywords: [
    "bmi calculator",
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
    "free bmi calculator no signup",
  ],
  authors: [{ name: "Shopyor" }],
  creator: "Shopyor",
  publisher: "Shopyor",
  robots: "index, follow",
  category: "health",
  classification: "BMI calculator and body mass index guide",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "x-default": PAGE_URL,
      en: PAGE_URL,
      "en-US": PAGE_URL,
      "en-GB": PAGE_URL,
      "en-IN": PAGE_URL,
      "en-PK": PAGE_URL,
      "en-NG": PAGE_URL,
      "en-PH": PAGE_URL,
      "en-CA": PAGE_URL,
      "en-AU": PAGE_URL,
      "en-ZA": PAGE_URL,
    },
  },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    siteName: "Shopyor",
    locale: "en_US",
    title: "Free BMI Calculator (kg & cm) by Age and Gender",
    description:
      "Check your Body Mass Index instantly. See your BMI category on the chart, the healthy weight range for your height, and what your BMI means by age and gender.",
    images: [
      {
        url: `${BASE_URL}/images/bmi-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor BMI Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator (kg & cm) by Age and Gender | Shopyor",
    description:
      "Free BMI calculator with chart, healthy weight ranges, and what your BMI means. No signup.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/bmi-og.png`],
  },
};

/** --- Low-competition / long-tail keywords for the “Related searches” block --- */
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

/** --- FAQ (plain-text answers so JSON-LD and UI stay in sync) --- */
const faq = [
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

/** Adult BMI chart rows (shared by the table and structured data context) */
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

export default function BmiToolPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "BMI Calculator",
        url: PAGE_URL,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online BMI calculator in kg & cm or lb & ft that shows your body mass index, weight category, and the healthy weight range for your height.",
        featureList: [
          "Calculate BMI in metric (kg, cm) or imperial (lb, ft/in)",
          "Shows BMI category on a colour-coded chart",
          "Healthy weight range for your height in kg and lb",
          "Age and gender context for interpreting BMI",
          "Runs fully in your browser — private by design",
          "Free with no signup",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${BASE_URL}/tools`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "BMI Calculator",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <div className="bg-background mx-auto max-w-3xl px-4 pt-6 md:pt-8 pb-20">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-5 flex items-center gap-1.5 text-xs text-muted-foreground"
      >
        <Link href="/" className="flex items-center gap-1 hover:text-foreground">
          <Home className="size-3.5" /> Home
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href="/tools" className="hover:text-foreground">
          Tools
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">BMI Calculator</span>
      </nav>

      {/* Intro */}
      <header className="mb-6 space-y-3">
        <span className="inline-flex items-center rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
          Free • No signup • Private in your browser
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          BMI Calculator (kg &amp; cm) by Age and Gender
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Check your Body Mass Index in seconds. Find out whether your BMI is
          healthy, see your category on the BMI chart, and discover the healthy
          weight range for your height — for both women and men.
        </p>
      </header>

      <BmiCalculator />

      <Separator className="my-10" />

      {/* Article */}
      <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-3">
        <h2>What is BMI (Body Mass Index)?</h2>
        <p>
          Body Mass Index (BMI) is a simple weight-to-height ratio used to
          screen whether your weight sits in a healthy range. Our free BMI
          calculator works in <strong>kg and cm</strong> or{" "}
          <strong>lb and ft/in</strong>, and instantly compares your result with
          the standard BMI categories. BMI is not a diagnosis on its own, but it
          is a fast, useful flag for when a closer look at diet, activity, and
          clinical markers is worthwhile.
        </p>

        <h2>How to calculate BMI manually (formula &amp; example)</h2>
        <ul>
          <li>
            <strong>Metric:</strong> BMI = weight (kg) ÷ height (m)
            <sup>2</sup>
          </li>
          <li>
            <strong>Imperial:</strong> BMI = (weight (lb) ÷ height (in)
            <sup>2</sup>) × 703
          </li>
        </ul>
        <p>
          <strong>Example:</strong> someone who is 1.75 m tall and weighs 70 kg
          has a BMI of 70 ÷ (1.75 × 1.75) = <strong>22.9</strong>, which falls in
          the healthy range. For a full step-by-step walkthrough with more
          worked examples, see our guide on{" "}
          <Link
            href="/blog/how-to-calculate-bmi-manually"
            className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
          >
            how to calculate your BMI manually
          </Link>
          .
        </p>

        <h2>Adult BMI chart &amp; weight categories</h2>
        <div className="not-prose overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Category</th>
                <th className="px-4 py-3 text-left font-semibold">BMI range</th>
                <th className="px-4 py-3 text-left font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {CHART.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3 font-medium">{row.cat}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.range}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Is my BMI healthy by age and gender?</h2>
        <p>
          For adults aged 20 and over, the healthy BMI range of{" "}
          <strong>18.5–24.9</strong> applies to both women and men — the formula
          and categories do not change by gender. Body composition differs
          between sexes and shifts with age, so BMI is best read alongside other
          measures. For anyone <strong>under 20</strong>, BMI should be plotted
          on age- and sex-specific percentile charts rather than the adult bands
          above.
        </p>

        <h2>What is the healthy weight for my height?</h2>
        <p>
          A healthy weight is whatever puts your BMI between 18.5 and 24.9 for
          your height. The calculator above shows your personal healthy weight
          range in both kilograms and pounds as soon as you enter your height —
          a quick way to set a realistic target weight.
        </p>

        <h2>Why BMI matters</h2>
        <p>
          As BMI rises, the statistical risk of conditions such as type 2
          diabetes, high blood pressure, heart disease, sleep apnea, and fatty
          liver disease tends to increase. A very low BMI, on the other hand,
          can be linked with nutrient deficiencies or other health issues. That
          makes BMI a helpful early signal worth tracking over time.
        </p>

        <h2>Where BMI falls short</h2>
        <ul>
          <li>It does not distinguish between muscle, bone, and fat mass.</li>
          <li>
            It does not reflect where fat is stored (abdominal vs. peripheral).
          </li>
          <li>
            It can misclassify athletes, older adults with muscle loss, and
            people from ethnic groups whose risk rises at different BMIs.
          </li>
        </ul>
        <p>
          For a fuller assessment, combine BMI with{" "}
          <strong>waist circumference</strong>,{" "}
          <strong>body composition</strong>, blood pressure, blood lipids,
          A1C/fasting glucose, and your clinical history.
        </p>

        <h2>How to lower your BMI safely</h2>
        <ol>
          <li>
            <strong>Build balanced meals.</strong> Emphasize vegetables, fruits,
            legumes, whole grains, lean proteins, and healthy fats; limit
            ultra-processed foods and added sugars.
          </li>
          <li>
            <strong>Move regularly.</strong> Aim for at least 150 minutes of
            moderate activity per week, plus 2+ days of resistance training.
          </li>
          <li>
            <strong>Sleep &amp; stress.</strong> Prioritize 7–9 hours of sleep
            and steady stress-management habits.
          </li>
          <li>
            <strong>Track gently.</strong> Periodic check-ins on weight, waist
            size, and energy guide small adjustments.
          </li>
          <li>
            <strong>Seek support.</strong> Dietitians and physicians can help
            with plateaus, medications, or other options when appropriate.
          </li>
        </ol>

        <h2>Frequently asked questions</h2>
        <div className="not-prose">
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx + 1}`}>
                <AccordionTrigger className="text-left text-base">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </article>

      {/* Related searches */}
      <section className="mt-12">
        <h2 className="mb-2 text-lg font-semibold">Related searches</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          People also look for these BMI and healthy-weight topics:
        </p>
        <ul className="flex flex-wrap gap-2">
          {KEYWORDS.map((kw, i) => (
            <li
              key={i}
              className="rounded-full border bg-muted/30 px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/60"
            >
              {kw}
            </li>
          ))}
        </ul>
      </section>

      {/* Disclaimer */}
      <p className="mt-10 rounded-xl border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
        This BMI calculator is for general educational purposes only and is not
        a substitute for professional medical advice, diagnosis, or treatment.
        Always consult a qualified healthcare provider about your health.
      </p>
    </div>
  );
}
