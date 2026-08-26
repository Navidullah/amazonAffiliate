// publish-polynomial-inequality-solver-blog.js
// One-off script to publish a blog post about using the AI Math Solver
// (/maths/solver) for polynomials, factoring, and inequalities — a large,
// distinct keyword-planner cluster not covered by the general or
// university-level Math Solver posts. Idempotent: re-running updates the
// same post (matched by slug).
//   Run: node publish-polynomial-inequality-solver-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-polynomial-inequality-solver-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "polynomial-factoring-inequality-solver-with-steps";
const TITLE =
  "Polynomial Factoring and Inequality Solver: Step-by-Step, Free";
const EXCERPT =
  "A free AI math solver for polynomials — factoring, division, multiplication — and inequalities, including compound inequalities. Every step explained in plain English, not just a boxed answer.";
const CATEGORY = "AI Study Tools";
const TAGS = [
  "polynomial calculator",
  "polynomial factoring calculator",
  "inequality solver",
  "compound inequality solver",
  "algebra 2 calculator",
  "fraction solver",
  "step by step math solver",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Can it factor a polynomial, or just simplify one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It fully factors polynomials — testing for rational roots, applying the rational root theorem where needed, and breaking the expression down into its factors — showing the reasoning for each root tested, not just the final factored form.",
      },
    },
    {
      "@type": "Question",
      name: "Does it handle compound inequalities, not just simple ones?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — simple inequalities, compound inequalities (like -3 < 2x + 1 ≤ 7), and inequality word problems, with the same rule applied to every part of the inequality shown at each step, including a note on flipping the inequality sign when multiplying or dividing by a negative number.",
      },
    },
    {
      "@type": "Question",
      name: "Can it solve algebraic fractions and partial fractions too?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — algebraic fraction simplification, solving equations that contain fractions, and partial fraction decomposition, with the working shown at each step rather than just the simplified result.",
      },
    },
    {
      "@type": "Question",
      name: "Is this suitable for Algebra 2 or Pre-Calculus level?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — polynomial factoring, division, and inequality problems are core Algebra 2 and Pre-Calculus topics, and selecting School or College level gives an explanation matched to that stage, with the notation and depth appropriate to what's typically taught at that level.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free, and do I need an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — free, with no signup or account required, and a daily question limit that resets every day.",
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
      name: "Polynomial & Inequality Solver",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Factoring a cubic polynomial or solving a compound inequality sits in an awkward spot in most math-help tools: too advanced for a basic algebra calculator, but common enough in Algebra 2 and Pre-Calculus that "I don't know how to start" is one of the most common places students get stuck. A single boxed answer doesn't help much when the actual problem is not knowing which method to reach for first.</p>

<p>The <a href="/maths/solver">AI Math Solver</a> handles both — polynomial factoring, division and multiplication, algebraic fractions, and simple through compound inequalities — with the full method explained at every step.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#polynomials">Factoring, Dividing and Multiplying Polynomials</a></li>
  <li><a href="#inequalities">Solving Inequalities, Including Compound Inequalities</a></li>
  <li><a href="#fractions">Algebraic and Partial Fractions</a></li>
  <li><a href="#example-poly">Worked Example: Factoring a Cubic Polynomial</a></li>
  <li><a href="#example-ineq">Worked Example: A Compound Inequality</a></li>
  <li><a href="#tips">Tips for Polynomial and Inequality Questions</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="polynomials">Factoring, Dividing and Multiplying Polynomials</h2>
<p>Ask a <strong>polynomial calculator</strong> to factor <code>x&sup3; - 6x&sup2; + 11x - 6</code> and a lot of tools return the factored form with no indication of how it got there. The AI Math Solver instead works through the method — testing possible rational roots using the rational root theorem, confirming which ones actually work by substitution, and building the factored form from there — the same systematic approach taught in an Algebra 2 or Pre-Calculus class. The same step-by-step treatment applies to polynomial long division, polynomial multiplication, and simplifying polynomial expressions.</p>

<hr />

<h2 id="inequalities">Solving Inequalities, Including Compound Inequalities</h2>
<p>A simple <strong>inequality solver</strong> handling <code>2x + 5 &gt; 11</code> is one thing; a <strong>compound inequality solver</strong> handling something like <code>-3 &lt; 2x + 1 ≤ 7</code> is where a lot of students actually get stuck, because the same operation has to be applied to every part of the inequality at once, and the inequality sign has to flip if you multiply or divide by a negative number — a rule that's easy to forget under pressure. Every solution walks through that explicitly, part by part, rather than assuming it's obvious.</p>

<hr />

<h2 id="fractions">Algebraic and Partial Fractions</h2>
<p>Fractions with variables in them — solving an equation that contains a fraction, simplifying an algebraic fraction, or breaking a rational expression into partial fractions ahead of an integration problem — get the same step-by-step treatment as the rest: the reasoning behind clearing denominators, combining terms, or splitting the expression, not just the simplified result on its own.</p>

<hr />

<h2 id="example-poly">Worked Example: Factoring a Cubic Polynomial</h2>
<p>Asking "Factor the polynomial: x&sup3; - 6x&sup2; + 11x - 6" returns a structure close to this:</p>
<ol>
  <li><strong>Test for rational roots</strong> — using the rational root theorem, possible roots are &plusmn;1, &plusmn;2, &plusmn;3, &plusmn;6</li>
  <li><strong>Substitute and confirm</strong> — testing each candidate shows x = 1, x = 2, and x = 3 are all roots</li>
  <li><strong>Write the factored form</strong> — giving <code>(x - 1)(x - 2)(x - 3)</code></li>
</ol>
<p>Each step shows why a particular value was tested, not just that it happened to work.</p>

<hr />

<h2 id="example-ineq">Worked Example: A Compound Inequality</h2>
<p>Asking "Solve the compound inequality: -3 &lt; 2x + 1 ≤ 7" walks through subtracting 1 from every part, then dividing every part by 2, arriving at the solution range for x — with a note at the division step confirming the inequality signs don't need to flip here, since 2 is positive (a check worth making explicit, since it's the exact step where mistakes happen most often).</p>

<hr />

<h2 id="tips">Tips for Polynomial and Inequality Questions</h2>
<ul>
  <li><strong>Write the full expression exactly.</strong> Include every term and its sign — a missing minus sign changes the entire factoring problem.</li>
  <li><strong>Specify what you need.</strong> "Factor," "solve," "simplify," and "divide" are different operations on the same polynomial — say which one you want.</li>
  <li><strong>For inequalities, include the exact symbols.</strong> Whether it's &lt;, &le;, &gt;, or &ge; changes whether the boundary value is included in the answer.</li>
  <li><strong>Ask for the check step to be shown</strong> if you want to verify a root or solution range yourself before trusting it.</li>
</ul>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>Can it factor a polynomial, or just simplify one?</h3>
<p>It fully factors polynomials, testing for rational roots and showing the reasoning for each one tested.</p>

<h3>Does it handle compound inequalities, not just simple ones?</h3>
<p>Yes — simple, compound, and inequality word problems, with every part of the inequality shown at each step.</p>

<h3>Can it solve algebraic fractions and partial fractions too?</h3>
<p>Yes — algebraic fraction simplification, equations with fractions, and partial fraction decomposition.</p>

<h3>Is this suitable for Algebra 2 or Pre-Calculus level?</h3>
<p>Yes — select School or College level for an explanation matched to that stage.</p>

<h3>Is it free, and do I need an account?</h3>
<p>Yes — free, no signup, with a daily question limit that resets every day.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>Polynomials and inequalities are exactly the kind of problem where knowing the method matters more than knowing the answer — the next question on a test won't be identical, but it'll use the same method. The AI Math Solver explains that method every time, for free.</p>
<p><strong>Ready to try it?</strong> Head to the <a href="/maths/solver">AI Math Solver</a> and type in your next polynomial or inequality question, or read the <a href="/blog/free-ai-math-solver-algebra-equations-calculus-step-by-step">general AI Math Solver guide</a> for the full range of what it covers.</p>

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

    let author = (await users.findOne({ role: "admin" })) || (await users.findOne({}));
    const authorName = author?.name || author?.email || "Shopyor Team";
    const authorId = author?._id || null;

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
