// publish-calorie-calculator-blog.js
// One-off script to publish the calorie calculator / TDEE / diet plan article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-calorie-calculator-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-calorie-calculator-blog.js` again.",
  );
  process.exit(1);
}

// Informational long-tail primary keyword: "how many calories should i eat".
// Complements the transactional /tools/bmi page (which now also has a
// calorie + diet plan calculator) and funnels US/UK/CA/AU/EU readers into it.
const SLUG = "how-many-calories-should-i-eat-tdee-diet-plan-guide";
const TITLE =
  "How Many Calories Should You Eat? TDEE, BMR and a Simple Diet Plan Explained";
const EXCERPT =
  "A practical guide to working out how many calories you actually need — for weight loss, maintenance, or muscle gain — using the same BMR/TDEE method dietitians rely on. Includes a free calculator.";
const CATEGORY = "Health & Fitness";
const TAGS = [
  "how many calories should i eat",
  "tdee calculator",
  "bmr calculator",
  "calorie calculator",
  "diet plan calculator",
  "macro calculator",
  "calories to lose weight",
  "calories to gain weight",
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
      name: "How many calories should I eat a day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your height, weight, age, sex, activity level, and goal — there's no single number that fits everyone. As a rough anchor, national guidelines in the US, UK, Canada, and across the EU tend to cite averages of around 2,000 calories a day for women and 2,500 for men, but those are population averages, not personal targets. Working out your own BMR and TDEE gets you a far more accurate number.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between BMR and TDEE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BMR (Basal Metabolic Rate) is the energy your body burns just to stay alive at complete rest. TDEE (Total Daily Energy Expenditure) takes that number and adds everything else you do in a day — walking, working, exercising, even fidgeting. TDEE is almost always noticeably higher than BMR, and it's TDEE, not BMR, that you should use as your maintenance-calorie baseline.",
      },
    },
    {
      "@type": "Question",
      name: "How many calories do I need to lose weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A deficit of roughly 500 calories a day below your TDEE typically produces about 0.5 kg (1 lb) of fat loss per week, which most dietitians consider a sustainable pace. Going much lower than that risks muscle loss and makes the diet harder to stick to, which is why a sensible floor of around 1,200 calories a day is often recommended for most adults.",
      },
    },
    {
      "@type": "Question",
      name: "How many calories do I need to gain weight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For a lean gain rather than mostly fat, aim for roughly 300 to 500 calories a day above your TDEE, combined with resistance training a few times a week. Without the training stimulus, most of that surplus ends up stored as fat instead of muscle.",
      },
    },
    {
      "@type": "Question",
      name: "What macro split should I use for my diet plan?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A reasonable starting point for most adults is roughly 30% protein, 40% carbohydrates, and 30% fat. If you're cutting calories, nudging protein up to around 35% helps protect muscle. If you're bulking, a slightly higher carbohydrate share helps fuel training. These are starting points to adjust from, not fixed rules.",
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
      name: "How Many Calories Should You Eat?",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>"How many calories should I eat?" sounds like it should have a one-line answer. It doesn't. Ask five different sources — a food label in the US, an NHS leaflet in the UK, a nutrition app built for Australia, a package in Germany — and you'll get five slightly different numbers, all presented as if they're gospel. None of them are wrong exactly. They're just population averages, and you are not a population average.</p>

<p>The good news is that the actual method for working out <em>your</em> number isn't complicated. It's the same two-step process registered dietitians use, and once you understand it, those generic "2,000 calories a day" labels start to make a lot more sense — and matter a lot less. This guide walks through it, then shows you how to turn that number into an actual diet plan. If you'd rather skip straight to the numbers, our <a href="/tools/bmi">free BMI and calorie calculator</a> does the maths for you in a few seconds.</p>

<p><strong>In this guide:</strong></p>
<ol>
  <li><a href="#bmr-tdee">BMR and TDEE — the two numbers that actually matter</a></li>
  <li><a href="#formula">The formula, step by step</a></li>
  <li><a href="#example">A worked example</a></li>
  <li><a href="#activity">Picking an honest activity level</a></li>
  <li><a href="#goals">Calories for losing, maintaining, or gaining weight</a></li>
  <li><a href="#regions">How this compares to US, UK, Canadian, Australian, and EU guidelines</a></li>
  <li><a href="#macros">Turning calories into a diet plan (macros)</a></li>
  <li><a href="#mistakes">Common mistakes people make with calorie counting</a></li>
  <li><a href="#faq">Frequently asked questions</a></li>
  <li><a href="#conclusion">Where to go from here</a></li>
</ol>

<hr />

<h2 id="bmr-tdee">BMR and TDEE — the two numbers that actually matter</h2>
<p>Forget the label on your cereal box for a second. There are really only two numbers worth knowing.</p>
<p><strong>BMR (Basal Metabolic Rate)</strong> is what your body burns doing absolutely nothing — keeping your heart beating, your lungs breathing, your cells repairing themselves. If you stayed in bed all day and didn't move a muscle, this is roughly what you'd burn.</p>
<p><strong>TDEE (Total Daily Energy Expenditure)</strong> is BMR plus everything else: walking to the kitchen, your commute, your workout, even the energy your body spends digesting food. TDEE is your real maintenance number — eat exactly this many calories and your weight should stay roughly stable over time.</p>
<p>Almost every calorie decision — lose, maintain, gain — starts by finding your TDEE and adjusting from there. Everything after this section is really just explaining how to get to that number and what to do with it.</p>

<hr />

<h2 id="formula">The formula, step by step</h2>
<p>There are a few BMR formulas floating around (Harris-Benedict is the older one), but the one most dietitians and sports nutritionists lean on today is the <strong>Mifflin-St Jeor equation</strong>, published in 1990 and repeatedly shown in research to be more accurate for most adults than the older alternatives.</p>
<ul>
  <li><strong>Men:</strong> BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) + 5</li>
  <li><strong>Women:</strong> BMR = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) − 161</li>
</ul>
<p>Once you have BMR, multiply it by an activity factor to get TDEE:</p>
<table>
  <thead>
    <tr><th>Activity level</th><th>Description</th><th>Multiplier</th></tr>
  </thead>
  <tbody>
    <tr><td>Sedentary</td><td>Desk job, little or no exercise</td><td>1.2</td></tr>
    <tr><td>Lightly active</td><td>Light exercise 1–3 days a week</td><td>1.375</td></tr>
    <tr><td>Moderately active</td><td>Moderate exercise 3–5 days a week</td><td>1.55</td></tr>
    <tr><td>Very active</td><td>Hard exercise 6–7 days a week</td><td>1.725</td></tr>
    <tr><td>Extremely active</td><td>Physical job, or training twice a day</td><td>1.9</td></tr>
  </tbody>
</table>

<hr />

<h2 id="example">A worked example</h2>
<p>Let's put a real person's numbers through it. Say you're a 30-year-old woman, 165 cm tall, weighing 65 kg, and you'd call yourself moderately active — a few gym sessions a week plus a decent amount of walking.</p>
<ul>
  <li>BMR = (10 × 65) + (6.25 × 165) − (5 × 30) − 161</li>
  <li>BMR = 650 + 1,031.25 − 150 − 161 = <strong>1,370 kcal</strong></li>
  <li>TDEE = 1,370 × 1.55 = <strong>≈ 2,124 kcal</strong></li>
</ul>
<p>So on an average day, this person burns roughly 2,124 calories doing exactly what she normally does. That's her maintenance number — not the "2,000 calories" printed on a nutrition label somewhere, but a figure calculated from her own body and her own routine. If you'd rather not do this by hand, the <a href="/tools/bmi">calorie calculator on Shopyor</a> runs the same formula instantly in both metric and imperial units.</p>

<hr />

<h2 id="activity">Picking an honest activity level</h2>
<p>This is where most calorie calculations quietly go wrong. People consistently overestimate how active they are — one gym session doesn't make a whole week "very active," and a desk job with a evening walk is still closer to "lightly active" than "moderate." If you're not sure which category fits, round down. It's much easier to add 100–150 calories back in after a couple of weeks if your weight is dropping faster than expected than it is to figure out why a diet "isn't working" when the activity level was inflated from day one.</p>

<hr />

<h2 id="goals">Calories for losing, maintaining, or gaining weight</h2>
<p>Once you have TDEE, the goal-specific number is just an adjustment on top of it.</p>
<h3>Losing weight</h3>
<p>A deficit of around 500 calories a day below TDEE is the number most commonly recommended, and it lines up with roughly 0.5 kg (about 1 lb) of fat loss per week for most people — slow enough to hold onto muscle, fast enough to see progress. Cutting much harder than that tends to backfire: more muscle loss, more fatigue, and a much higher chance of giving up. Most general guidance treats around 1,200 calories a day as a sensible floor for adults, and going below that without medical supervision isn't a good idea.</p>
<h3>Maintaining weight</h3>
<p>This one's simple — eat at your TDEE. Your weight should hold roughly steady, with the normal day-to-day fluctuation from water and food volume.</p>
<h3>Gaining weight</h3>
<p>Add roughly 300–500 calories a day on top of TDEE. If the goal is muscle rather than just "heavier," pair the surplus with resistance training — without that stimulus, a chunk of the extra calories will end up as fat rather than muscle.</p>

<hr />

<h2 id="regions">How this compares to US, UK, Canadian, Australian, and EU guidelines</h2>
<p>If you've seen the "2,000 calories a day" figure on a US nutrition label, the UK's NHS Eatwell guidance, Canada's Food Guide, Australia's NHMRC dietary guidelines, or the EFSA reference intakes used across the EU, you've probably noticed they all land in a similar ballpark — usually somewhere around 2,000 for women and 2,500 for men. That's not a coincidence; those figures are built from large-scale population averages for adults with "moderate" activity, and every one of those health bodies is upfront that they're a general reference point, not a personal target.</p>
<p>The BMR/TDEE method above gets you closer to an actual personal number because it factors in your specific height, weight, age, and activity level rather than a country-wide average. It's not a replacement for official dietary guidance on food groups, nutrients, or safe eating patterns — those are still worth following — it's simply a more precise way to answer "how many calories, specifically, for me."</p>

<hr />

<h2 id="macros">Turning calories into a diet plan (macros)</h2>
<p>A calorie target on its own isn't a diet plan — it's just a number. To make it useful day to day, split it into <strong>macronutrients</strong>: protein, carbohydrates, and fat.</p>
<ul>
  <li><strong>Protein</strong> — 4 calories per gram. Helps preserve muscle, especially important during a calorie deficit.</li>
  <li><strong>Carbohydrates</strong> — 4 calories per gram. Your body's preferred fuel, particularly for training.</li>
  <li><strong>Fat</strong> — 9 calories per gram. Needed for hormone production and absorbing certain vitamins.</li>
</ul>
<p>A workable starting split for most adults is <strong>30% protein / 40% carbs / 30% fat</strong>. On a 2,000-calorie maintenance diet, that works out to about 150 g protein, 200 g carbs, and 67 g fat. If you're cutting, shifting protein up toward 35% helps protect muscle while you're in a deficit; if you're bulking, a bit more carbohydrate (around 45%) supports training volume. These are sensible defaults, not laws — plenty of people do well with different ratios, and the calculator lets you see the numbers for your own goal instantly.</p>

<hr />

<h2 id="mistakes">Common mistakes people make with calorie counting</h2>
<ul>
  <li><strong>Copying someone else's calorie target.</strong> Your friend's 1,800-calorie plan is built for their body, not yours.</li>
  <li><strong>Recalculating too often.</strong> Your TDEE shifts as your weight changes, but weekly weight can bounce around from water retention alone — judge trends over 2–4 weeks, not day to day.</li>
  <li><strong>Ignoring liquid calories.</strong> Coffee add-ins, juice, and alcohol add up fast and are easy to forget when mentally tallying a day's intake.</li>
  <li><strong>Treating the number as permanent.</strong> As you lose or gain weight, your BMR changes with it, so your target should be recalculated every few weeks.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>How many calories should I eat a day?</h3>
<p>It depends on your height, weight, age, sex, activity level, and goal — there's no single number that fits everyone. As a rough anchor, national guidelines in the US, UK, Canada, and across the EU tend to cite averages of around 2,000 calories a day for women and 2,500 for men, but those are population averages, not personal targets. Working out your own BMR and TDEE gets you a far more accurate number.</p>

<h3>What is the difference between BMR and TDEE?</h3>
<p>BMR (Basal Metabolic Rate) is the energy your body burns just to stay alive at complete rest. TDEE (Total Daily Energy Expenditure) takes that number and adds everything else you do in a day — walking, working, exercising, even fidgeting. TDEE is almost always noticeably higher than BMR, and it's TDEE, not BMR, that you should use as your maintenance-calorie baseline.</p>

<h3>How many calories do I need to lose weight?</h3>
<p>A deficit of roughly 500 calories a day below your TDEE typically produces about 0.5 kg (1 lb) of fat loss per week, which most dietitians consider a sustainable pace. Going much lower than that risks muscle loss and makes the diet harder to stick to, which is why a sensible floor of around 1,200 calories a day is often recommended for most adults.</p>

<h3>How many calories do I need to gain weight?</h3>
<p>For a lean gain rather than mostly fat, aim for roughly 300 to 500 calories a day above your TDEE, combined with resistance training a few times a week. Without the training stimulus, most of that surplus ends up stored as fat instead of muscle.</p>

<h3>What macro split should I use for my diet plan?</h3>
<p>A reasonable starting point for most adults is roughly 30% protein, 40% carbohydrates, and 30% fat. If you're cutting calories, nudging protein up to around 35% helps protect muscle. If you're bulking, a slightly higher carbohydrate share helps fuel training. These are starting points to adjust from, not fixed rules.</p>

<hr />

<h2 id="conclusion">Where to go from here</h2>
<p>The whole process really comes down to two steps: work out your TDEE, then adjust it up or down depending on whether you want to lose, maintain, or gain weight. Everything else — macros, meal timing, food choices — is detail you layer on top once that baseline number is right.</p>
<p>If you'd rather not run the Mifflin-St Jeor formula by hand, the <a href="/tools/bmi">free BMI and calorie calculator on Shopyor</a> does it for you: enter your height, weight, age, activity level, and goal in metric or imperial units, and it returns your BMR, TDEE, a daily calorie target, and a suggested protein/carb/fat breakdown — all calculated in your browser, with nothing sent to a server. You can also check your <a href="/tools/bmi">BMI on the same page</a> while you're there.</p>
<p><em>This article is for general educational purposes and isn't a substitute for personalised medical or nutrition advice. If you have a health condition, are pregnant, or are unsure what's right for you, talk to a doctor or registered dietitian before changing your diet significantly.</em></p>

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
          publishedAt: now,
        },
        $setOnInsert: {
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
