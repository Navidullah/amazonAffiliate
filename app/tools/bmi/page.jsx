// app/tools/bmi/page.jsx

import BmiExperience from "./BmiExperience";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.shopyor.com";
const PAGE_URL = `${BASE_URL}/tools/bmi`;

/** --- SEO (low-competition, long-tail keyword optimized) --- */
export const metadata = {
  title: {
    absolute:
      "BMI & Calorie Calculator with Diet Plan — Free Online | Shopyor",
  },
  description:
    "Free BMI calculator and calorie calculator (TDEE) in one tool. Check your BMI by age and gender, get your daily calorie needs to lose, maintain, or gain weight, and a free diet plan with macros. Metric & imperial. No signup.",
  keywords: [
    "bmi calculator",
    "calorie calculator",
    "bmi and calorie calculator",
    "tdee calculator",
    "bmr calculator",
    "diet plan calculator",
    "macro calculator",
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
    "how many calories should i eat to lose weight",
    "how many calories should i eat to gain weight",
    "daily calorie intake calculator",
    "calories to maintain weight",
    "free diet plan calculator",
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
    title: "Free BMI & Calorie Calculator with Diet Plan",
    description:
      "Check your Body Mass Index and daily calorie needs (TDEE) instantly. Get calories to lose, maintain, or gain weight, a free diet plan with macros, and your BMI category by age and gender.",
    images: [
      {
        url: `${BASE_URL}/images/bmi-og.png`,
        width: 1200,
        height: 630,
        alt: "Shopyor BMI & Calorie Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI & Calorie Calculator with Diet Plan | Shopyor",
    description:
      "Free BMI and calorie (TDEE) calculator with a diet plan and macros. No signup.",
    creator: "@shopyor",
    site: "@shopyor",
    images: [`${BASE_URL}/images/bmi-og.png`],
  },
};

/** --- FAQ (plain-text answers, kept in sync with the UI accordion) --- */
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
  {
    q: "How does the calorie calculator work?",
    a: "It uses the Mifflin-St Jeor equation, widely considered the most accurate BMR formula for most adults. It first estimates your Basal Metabolic Rate (BMR) — the calories you burn at rest — from your height, weight, age, and gender, then multiplies that by an activity multiplier (1.2 for sedentary up to 1.9 for extremely active) to get your Total Daily Energy Expenditure (TDEE), the calories you burn in an average day including movement and exercise. For example, a moderately active 30-year-old woman who is 165 cm and 65 kg has a BMR of about 1,370 kcal and a TDEE of about 2,124 kcal. Everything runs locally in your browser, just like the BMI calculator.",
  },
  {
    q: "How many calories should I eat to lose weight?",
    a: "A common, sustainable approach is to eat roughly 500 calories per day below your TDEE (maintenance calories), which produces about 0.5 kg (1 lb) of fat loss per week for most adults. Cutting much more than that risks muscle loss, fatigue, and rebound weight gain, so the calculator caps its minimum suggestion at 1,200 calories per day, which is a widely cited safety floor for adults. Combine the calorie deficit with adequate protein (around 30-35% of calories) and resistance training to protect muscle mass while losing fat, and reassess every 2-4 weeks since your maintenance calories drop as your weight drops.",
  },
  {
    q: "How many calories should I eat to gain weight?",
    a: "For a lean, muscle-focused weight gain, aim for roughly 300-500 calories per day above your TDEE (maintenance calories), which supports about 0.25-0.5 kg (0.5-1 lb) of gain per week without excessive fat gain. The calculator's default 'Gain weight' option applies a 500 kcal/day surplus with a higher carbohydrate share to fuel training. Pair the surplus with progressive resistance training at least 3 times a week — without training stimulus, most of a calorie surplus is stored as fat rather than muscle.",
  },
  {
    q: "What is a good macro split for my diet plan?",
    a: "There is no single 'correct' split, but a reasonable default for most adults is 30% protein, 40% carbohydrates, and 30% fat of total daily calories. This calculator adjusts that automatically by goal: 35% protein when losing weight (to protect muscle during a deficit), a balanced 30/40/30 split when maintaining, and 30% protein with 45% carbs when gaining (to fuel training and recovery). For example, a 2,000-calorie maintenance diet works out to about 150g protein, 200g carbs, and 67g fat. These are starting points — adjust based on how your body responds and any specific training or medical guidance.",
  },
  {
    q: "Does this calorie calculator work for the US, UK, Canada, Australia, and Europe?",
    a: "Yes. Switch to imperial units (pounds and feet/inches) for the US, UK, Canada, and Australia, or metric units (kilograms and centimetres) for most of Europe and the rest of the world — both use the same underlying Mifflin-St Jeor formula, just converted, so results are identical either way. The tool doesn't ask for your location and doesn't apply any country-specific calorie guidelines (some national health bodies publish slightly different general adult averages), so treat the result as a personalised scientific estimate based on your own measurements rather than a government dietary reference value.",
  },
  {
    q: "Is BMR the same as TDEE?",
    a: "No. BMR (Basal Metabolic Rate) is the energy your body needs just to stay alive at complete rest — breathing, circulation, cell repair — with zero movement. TDEE (Total Daily Energy Expenditure) adds your activity level on top of BMR, covering daily movement, exercise, and digestion, and is almost always meaningfully higher than BMR — for example, a BMR of 1,370 kcal can become a TDEE of over 2,100 kcal for someone who is moderately active. TDEE, not BMR, is the number to use as your 'maintenance calories' baseline when planning a diet.",
  },
];

export default function BmiToolPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "BMI & Calorie Calculator with Diet Plan",
        url: PAGE_URL,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        inLanguage: "en",
        description:
          "Free online BMI calculator and calorie (TDEE) calculator in kg & cm or lb & ft that shows your body mass index, weight category, daily calorie needs, and a diet plan with macros.",
        featureList: [
          "Calculate BMI in metric (kg, cm) or imperial (lb, ft/in)",
          "Shows BMI category on a colour-coded chart",
          "Healthy weight range for your height in kg and lb",
          "Calorie calculator (BMR & TDEE) using the Mifflin-St Jeor equation",
          "Daily calorie target to lose, maintain, or gain weight",
          "Free diet plan with protein, carb, and fat macros",
          "Age, gender, and activity level context",
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
            name: "BMI & Calorie Calculator",
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
    <>
      <BmiExperience />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
