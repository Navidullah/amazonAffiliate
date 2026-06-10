// publish-bmi-blog.js
// One-off script to publish the "How to Calculate Your BMI" article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-bmi-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-bmi-blog.js` again.",
  );
  process.exit(1);
}

// Informational long-tail primary keyword: "how to calculate bmi manually".
// Chosen to COMPLEMENT (not cannibalize) the transactional /tools/bmi page,
// and to funnel readers into the calculator.
const SLUG = "how-to-calculate-bmi-manually";
const TITLE =
  "How to Calculate Your BMI Manually (and What Your BMI Means) — 2026 Guide";
const EXCERPT =
  "Learn how to calculate BMI manually in kg & cm or lb & ft, read the BMI chart by age and gender, and understand what your BMI number really means. Free BMI calculator inside.";
const CATEGORY = "Health & Fitness";
const TAGS = [
  "how to calculate bmi manually",
  "bmi formula example",
  "is my bmi healthy",
  "what does my bmi mean",
  "bmi chart by age and height",
  "healthy weight for my height",
  "normal bmi range for adults",
  "how to lower my bmi",
];

// FAQ + Breadcrumb JSON-LD embedded in the body so Google can surface rich
// results (BlogPosting schema is already added by the page component).
// IMPORTANT: every `text` below is reproduced verbatim in the visible FAQ
// section of CONTENT — schema and UI must stay in sync.
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I calculate BMI manually?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In metric units, BMI = weight (kg) ÷ height (m)². In imperial units, BMI = (weight (lb) ÷ height (in)²) × 703. For example, a person who is 1.75 m tall and weighs 70 kg has a BMI of 70 ÷ (1.75 × 1.75) = 22.9. To skip the math, paste your numbers into the free BMI calculator and it works it out instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Is my BMI healthy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most adults, a BMI of 18.5 to 24.9 is considered the healthy range. Below 18.5 is underweight, 25 to 29.9 is overweight, and 30 or above is in the obesity range. BMI is a screening tool, so read it alongside your waist size, activity level, and other health markers for the full picture.",
      },
    },
    {
      "@type": "Question",
      name: "What does my BMI number actually mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your BMI estimates whether your weight is under, healthy, over, or in the obesity range for your height. A higher BMI is statistically linked with greater risk of conditions like type 2 diabetes and high blood pressure, while a very low BMI may signal undernutrition. It is an indicator, not a diagnosis.",
      },
    },
    {
      "@type": "Question",
      name: "Is BMI calculated differently for men and women?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. For adults aged 20 and over, BMI uses the same formula and the same categories for men and women. Body composition differs between the sexes, so BMI is best read alongside other measures, but the calculation itself does not change by gender.",
      },
    },
    {
      "@type": "Question",
      name: "What is a healthy BMI by age?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For adults 20 and older, the healthy range of 18.5 to 24.9 applies across ages, though some guidance allows a slightly higher range for older adults. For anyone under 20, BMI must be plotted on age- and sex-specific percentile charts instead of the adult categories.",
      },
    },
    {
      "@type": "Question",
      name: "Why is BMI not always accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMI only uses height and weight, so it cannot tell muscle from fat. Very muscular people (like athletes) can score in the overweight range while carrying little fat, and some people with a normal BMI may still carry excess fat. Use BMI as a quick screen, then add waist measurement and body-fat context for a clearer view.",
      },
    },
  ],
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.shopyor.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.shopyor.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Calculate Your BMI Manually",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Your BMI is one of the fastest ways to check whether your weight sits in a healthy range for your height — and the good news is <strong>you can calculate BMI manually with a single short formula</strong>, no app or doctor's visit required. Whether you measure in kilograms and centimetres or pounds and feet, the math takes under a minute.</p>

<p>In this guide you'll learn exactly <strong>how to calculate your BMI manually</strong>, see worked examples in both metric and imperial units, read the BMI chart by category, and — most importantly — understand what your BMI number actually <em>means</em> for your health. Prefer to skip the arithmetic? Our <a href="/tools/bmi">free BMI calculator</a> does it instantly.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-is-bmi">What Is BMI and Why It Matters</a></li>
  <li><a href="#formula">How to Calculate BMI Manually (Metric &amp; Imperial)</a></li>
  <li><a href="#examples">Worked BMI Formula Examples</a></li>
  <li><a href="#chart">The BMI Chart: Categories and Ranges</a></li>
  <li><a href="#is-it-healthy">Is My BMI Healthy? How to Read Your Number</a></li>
  <li><a href="#age-gender">BMI by Age and Gender</a></li>
  <li><a href="#limitations">Why BMI Isn't Always Accurate</a></li>
  <li><a href="#change-bmi">How to Lower (or Raise) Your BMI Safely</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-is-bmi">What Is BMI and Why It Matters</h2>
<p>BMI stands for <strong>Body Mass Index</strong>. It's a simple number calculated from your height and weight that estimates whether you're underweight, at a healthy weight, overweight, or in the obesity range. Health organisations like the <a href="https://www.cdc.gov/bmi/" target="_blank" rel="noopener noreferrer">CDC</a> and <a href="https://www.who.int/health-topics/obesity" target="_blank" rel="noopener noreferrer">World Health Organization</a> use it as a quick, low-cost screening tool across large populations.</p>
<p>BMI doesn't measure body fat directly, and it isn't a diagnosis. What it gives you is a fast, repeatable signal: a higher BMI is statistically linked with a greater risk of conditions like type 2 diabetes, high blood pressure, and heart disease, while a very low BMI can point to undernutrition. Think of it as the first checkpoint, not the final word.</p>

<hr />

<h2 id="formula">How to Calculate BMI Manually (Metric &amp; Imperial)</h2>
<p>There are two versions of the BMI formula depending on which units you use. Both give the same result — pick whichever matches the numbers you already know.</p>

<h3>Metric formula (kg and cm/m)</h3>
<p><strong>BMI = weight (kg) ÷ height (m)²</strong></p>
<ol>
  <li>Take your weight in kilograms.</li>
  <li>Convert your height to metres (divide centimetres by 100 — so 175 cm becomes 1.75 m).</li>
  <li>Multiply your height in metres by itself (height × height).</li>
  <li>Divide your weight by that result.</li>
</ol>

<h3>Imperial formula (lb and inches)</h3>
<p><strong>BMI = (weight (lb) ÷ height (in)²) × 703</strong></p>
<ol>
  <li>Take your weight in pounds.</li>
  <li>Convert your height to total inches (feet × 12, plus the extra inches — so 5 ft 9 in = 69 in).</li>
  <li>Multiply your height in inches by itself.</li>
  <li>Divide your weight by that result, then multiply by 703.</li>
</ol>
<blockquote><p><strong>Tip:</strong> The 703 factor simply converts the imperial result onto the same scale as the metric formula, so both methods land in the same BMI categories.</p></blockquote>

<hr />

<h2 id="examples">Worked BMI Formula Examples</h2>
<p>Seeing the numbers plugged in makes the formula click. Here are two examples, one in each unit system.</p>

<h3>Example 1 — Metric (70 kg, 175 cm)</h3>
<ul>
  <li>Height in metres: 175 ÷ 100 = <strong>1.75 m</strong></li>
  <li>Height squared: 1.75 × 1.75 = <strong>3.0625</strong></li>
  <li>BMI: 70 ÷ 3.0625 = <strong>22.9</strong></li>
</ul>
<p>A BMI of 22.9 sits comfortably inside the healthy range (18.5–24.9).</p>

<h3>Example 2 — Imperial (180 lb, 5 ft 9 in)</h3>
<ul>
  <li>Height in inches: (5 × 12) + 9 = <strong>69 in</strong></li>
  <li>Height squared: 69 × 69 = <strong>4761</strong></li>
  <li>BMI: (180 ÷ 4761) × 703 = <strong>26.6</strong></li>
</ul>
<p>A BMI of 26.6 falls just into the overweight range (25–29.9). To avoid rounding mistakes, you can <a href="/tools/bmi">run the same numbers through the BMI calculator</a> and compare.</p>

<hr />

<h2 id="chart">The BMI Chart: Categories and Ranges</h2>
<p>Once you have your number, this chart tells you which category it falls into. These adult ranges are the same for men and women aged 20 and over.</p>
<table>
  <thead>
    <tr><th>BMI range</th><th>Category</th><th>What it suggests</th></tr>
  </thead>
  <tbody>
    <tr><td>Below 18.5</td><td><strong>Underweight</strong></td><td>May indicate undernutrition; worth a check-up</td></tr>
    <tr><td>18.5 – 24.9</td><td><strong>Healthy weight</strong></td><td>Associated with the lowest health risk</td></tr>
    <tr><td>25.0 – 29.9</td><td><strong>Overweight</strong></td><td>Slightly raised risk; lifestyle review helps</td></tr>
    <tr><td>30.0 – 34.9</td><td><strong>Obesity (Class 1)</strong></td><td>Higher risk of related conditions</td></tr>
    <tr><td>35.0 – 39.9</td><td><strong>Obesity (Class 2)</strong></td><td>High risk; medical guidance recommended</td></tr>
    <tr><td>40.0 and above</td><td><strong>Obesity (Class 3)</strong></td><td>Very high risk; clinical support advised</td></tr>
  </tbody>
</table>

<hr />

<h2 id="is-it-healthy">Is My BMI Healthy? How to Read Your Number</h2>
<p>For most adults, a BMI of <strong>18.5 to 24.9</strong> is considered healthy. But the number alone doesn't tell the whole story. To interpret it well, pair your BMI with:</p>
<ul>
  <li><strong>Waist measurement</strong> — excess fat around the middle carries more risk than the same weight elsewhere.</li>
  <li><strong>Activity level and muscle mass</strong> — a strong, active body may weigh more without extra fat.</li>
  <li><strong>Trends over time</strong> — a steadily rising BMI is often more telling than a single reading.</li>
</ul>
<p>If your BMI lands outside the healthy band, treat it as a prompt to look closer rather than a verdict. Small, consistent changes move the number more reliably than crash diets.</p>

<hr />

<h2 id="age-gender">BMI by Age and Gender</h2>
<p>A common question is whether BMI changes with age or sex. For adults 20 and older, the formula and the categories are identical for men and women — there is no separate "male" or "female" BMI calculation. Body composition genuinely differs between the sexes, which is one reason BMI is best read alongside other measures, but the math itself doesn't change.</p>
<p><strong>Children and teens are the exception.</strong> For anyone under 20, a raw BMI number isn't enough — it must be plotted on age- and sex-specific percentile charts, because healthy ranges shift rapidly through growth. If you're checking a child's BMI, use a paediatric percentile chart rather than the adult table above.</p>

<hr />

<h2 id="limitations">Why BMI Isn't Always Accurate</h2>
<p>BMI is fast and useful, but it has real blind spots. Because it only uses height and weight, it can't distinguish muscle from fat. That leads to two well-known edge cases:</p>
<ul>
  <li><strong>Muscular athletes</strong> may score "overweight" or even "obese" on BMI while carrying very little body fat.</li>
  <li><strong>People with low muscle mass</strong> can sit in the "healthy" range yet still carry excess fat (sometimes called "normal-weight obesity").</li>
</ul>
<p>BMI also doesn't account for fat distribution, bone density, age-related muscle loss, or ethnicity-based risk differences. None of this makes BMI useless — it just means you should treat it as a screening number and add context like waist size, body-fat percentage, and how you feel day to day.</p>

<hr />

<h2 id="change-bmi">How to Lower (or Raise) Your BMI Safely</h2>
<p>Because BMI is driven by the relationship between your weight and height, moving it means changing your weight gradually and sustainably.</p>

<h3>To lower a high BMI</h3>
<ul>
  <li>Aim for a modest, steady calorie deficit rather than extreme cuts.</li>
  <li>Prioritise protein and fibre to stay full, and build in regular movement — a mix of cardio and strength training.</li>
  <li>Target slow, consistent loss (roughly 0.5–1 kg / 1–2 lb per week) so you keep muscle while losing fat.</li>
</ul>

<h3>To raise a low BMI</h3>
<ul>
  <li>Add nutrient-dense, calorie-rich foods (nuts, dairy, healthy oils) rather than empty calories.</li>
  <li>Include resistance training so the added weight is muscle, not just fat.</li>
  <li>If your BMI is well under 18.5, speak to a healthcare professional to rule out an underlying cause.</li>
</ul>
<p>Whichever direction you're heading, recalculate every few weeks to track progress. The quickest way is to <a href="/tools/bmi">re-check your BMI with the calculator</a> instead of redoing the math each time.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>How do I calculate BMI manually?</h3>
<p>In metric units, BMI = weight (kg) ÷ height (m)². In imperial units, BMI = (weight (lb) ÷ height (in)²) × 703. For example, a person who is 1.75 m tall and weighs 70 kg has a BMI of 70 ÷ (1.75 × 1.75) = 22.9. To skip the math, paste your numbers into the free BMI calculator and it works it out instantly.</p>

<h3>Is my BMI healthy?</h3>
<p>For most adults, a BMI of 18.5 to 24.9 is considered the healthy range. Below 18.5 is underweight, 25 to 29.9 is overweight, and 30 or above is in the obesity range. BMI is a screening tool, so read it alongside your waist size, activity level, and other health markers for the full picture.</p>

<h3>What does my BMI number actually mean?</h3>
<p>Your BMI estimates whether your weight is under, healthy, over, or in the obesity range for your height. A higher BMI is statistically linked with greater risk of conditions like type 2 diabetes and high blood pressure, while a very low BMI may signal undernutrition. It is an indicator, not a diagnosis.</p>

<h3>Is BMI calculated differently for men and women?</h3>
<p>No. For adults aged 20 and over, BMI uses the same formula and the same categories for men and women. Body composition differs between the sexes, so BMI is best read alongside other measures, but the calculation itself does not change by gender.</p>

<h3>What is a healthy BMI by age?</h3>
<p>For adults 20 and older, the healthy range of 18.5 to 24.9 applies across ages, though some guidance allows a slightly higher range for older adults. For anyone under 20, BMI must be plotted on age- and sex-specific percentile charts instead of the adult categories.</p>

<h3>Why is BMI not always accurate?</h3>
<p>BMI only uses height and weight, so it cannot tell muscle from fat. Very muscular people (like athletes) can score in the overweight range while carrying little fat, and some people with a normal BMI may still carry excess fat. Use BMI as a quick screen, then add waist measurement and body-fat context for a clearer view.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Calculating your BMI manually comes down to one short formula — weight divided by height squared (in metric), or the same idea times 703 in imperial. Once you have the number, the BMI chart tells you which category you're in, and a little context around age, muscle, and waist size tells you what it really means.</p>
<p><strong>Here's what you learned in this guide:</strong></p>
<ul>
  <li>The exact metric and imperial BMI formulas, with worked examples in each.</li>
  <li>How to read your number against the BMI chart, and how age and gender factor in.</li>
  <li>Where BMI falls short — and how to add waist size and body composition for a fuller picture.</li>
</ul>
<p><strong>Want your number in one second?</strong> Skip the arithmetic and use the <a href="/tools/bmi">free Shopyor BMI Calculator</a> — enter your height and weight in kg &amp; cm or lb &amp; ft and see your category instantly. Or explore <a href="/tools">all Shopyor tools</a> for more free, no-signup utilities.</p>

<script type="application/ld+json">${JSON.stringify(FAQ_SCHEMA)}</script>
<script type="application/ld+json">${JSON.stringify(BREADCRUMB_SCHEMA)}</script>
`.trim();

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("app");
    const blogs = db.collection("blogs");
    const users = db.collection("users");

    // Attribute to an admin user (fallback to any user, then a default).
    let author =
      (await users.findOne({ role: "admin" })) ||
      (await users.findOne({}));
    const authorName = author?.name || author?.email || "Shopyor Team";
    const authorId = author?._id || null;

    // Reading time from plain-text word count (~200 wpm).
    const plain = CONTENT.replace(/<[^>]+>/g, " ");
    const wordCount = plain.trim().split(/\s+/).filter(Boolean).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    const now = new Date();

    const result = await blogs.updateOne(
      { slug: SLUG },
      {
        $set: {
          title: TITLE,
          content: CONTENT,
          excerpt: EXCERPT,
          category: CATEGORY,
          tags: TAGS,
          author: authorName,
          authorId,
          readingTime,
          isPublished: true,
          updatedAt: now,
        },
        $setOnInsert: {
          publishedAt: now,
          createdAt: now,
          views: 0,
        },
      },
      { upsert: true },
    );

    console.log("Author:", authorName, authorId ? `(${authorId})` : "(no id)");
    console.log("Word count:", wordCount, "| Reading time:", readingTime, "min");
    if (result.upsertedId) {
      console.log("✅ Published NEW post:", result.upsertedId);
    } else {
      console.log("✅ Updated existing post (matched:", result.matchedCount + ")");
    }
    console.log("URL: https://www.shopyor.com/blog/" + SLUG);
  } finally {
    await client.close();
  }
}

run().catch((e) => {
  console.error("❌ Failed:", e);
  process.exit(1);
});
