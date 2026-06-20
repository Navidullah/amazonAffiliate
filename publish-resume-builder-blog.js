// publish-resume-builder-blog.js
// One-off script to publish the "How to Make an ATS-Friendly Resume" article into MongoDB.
// Idempotent: re-running updates the same post (matched by slug).
//   Run: node publish-resume-builder-blog.js
// Reads the SAME database the live site uses (DATABASE_URL from .env.local).
require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const uri = process.env.DATABASE_URL;
if (!uri) {
  console.error(
    "❌ DATABASE_URL is not set. Add it to .env.local (the same value your\n" +
      "   live site / Vercel uses), then run `node publish-resume-builder-blog.js` again.",
  );
  process.exit(1);
}

const SLUG = "how-to-make-an-ats-friendly-resume-for-free";
const TITLE =
  "How to Make an ATS-Friendly Resume for Free (No Signup) — 2026 Guide";
const EXCERPT =
  "Learn what actually makes a resume ATS-friendly, which template to pick for your field, and how to build one free — no signup, no watermark.";
const CATEGORY = "Career";
const TAGS = [
  "ats friendly resume free",
  "how to make a resume online free",
  "resume builder no signup",
  "best resume template for ats",
  "free resume builder pdf",
  "resume template for entry level",
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes a resume ATS-friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An ATS-friendly resume uses real, selectable text rather than text baked into an image, clean and standard section headings (Experience, Education, Skills), and a predictable top-to-bottom ordering. Applicant tracking systems scan resumes for these patterns, and anything too visually creative — heavy graphics, multi-column layouts with overlapping text, icons replacing words — risks being parsed incorrectly or skipped entirely.",
      },
    },
    {
      "@type": "Question",
      name: "Which resume template should I choose?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For corporate or technical roles, a clean, single-column template gives the most reliable ATS result. For design, marketing, or creative jobs, a template with more visual structure can add flair that recruiters notice once a human actually opens the file. For students and entry-level applicants, a balanced template that doesn't look intimidatingly sparse or overly busy tends to work best.",
      },
    },
    {
      "@type": "Question",
      name: "How do I create an ATS-friendly resume for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use a clean, single-column template, add a strong professional summary, include quantified bullet points in your experience section (for example, 'Increased sales by 30%' rather than just 'Responsible for sales'), list at least 5 relevant skills, and make sure your education section is complete. A built-in resume score or checklist feature, if the builder has one, will flag common gaps before you download.",
      },
    },
    {
      "@type": "Question",
      name: "Is my resume data saved or uploaded anywhere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A privacy-respecting resume builder saves your data only in your own browser's local storage, with nothing uploaded to a server. Look for an export-to-JSON option as well, so you have a permanent backup file you can re-import later or move to a different device.",
      },
    },
    {
      "@type": "Question",
      name: "How do I download my resume as a PDF for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most browser-based resume builders use your browser's native print dialog set to 'Save as PDF,' which produces a crisp file with real, selectable text rather than a flattened image — exactly what an ATS needs to parse the content correctly. No file conversion or upload step is required.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to quantify every bullet point on my resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not every single bullet, but as many as you reasonably can. A number gives a recruiter an instant sense of scale and impact — 'managed a team of 6' or 'reduced support tickets by 40%' communicates far more in five words than a vague description of responsibilities. If you genuinely don't have a number for a role, focus on a concrete outcome instead.",
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
      name: "How to Make an ATS-Friendly Resume for Free",
      item: `https://www.shopyor.com/blog/${SLUG}`,
    },
  ],
};

const CONTENT = `
<p>Most resumes today are read by a piece of software before a human ever sees them. An <strong>Applicant Tracking System (ATS)</strong> scans, parses, and ranks resumes against the job description — and a resume that looks great to a human but confuses the ATS can get filtered out before anyone reads it.</p>

<p>The good news: building an ATS-friendly resume doesn't require design skill or paid software. It just requires understanding what the ATS is actually looking for, and avoiding a handful of common mistakes.</p>

<p><strong>Table of Contents</strong></p>
<ol>
  <li><a href="#what-is-ats">What an ATS Actually Does</a></li>
  <li><a href="#what-breaks">What Breaks ATS Parsing</a></li>
  <li><a href="#how-to">How to Build an ATS-Friendly Resume (Step by Step)</a></li>
  <li><a href="#which-template">Which Template Should You Pick?</a></li>
  <li><a href="#quantify">Why Quantified Bullet Points Matter</a></li>
  <li><a href="#download">How to Download as a Proper PDF</a></li>
  <li><a href="#faq">Frequently Asked Questions</a></li>
  <li><a href="#conclusion">Conclusion</a></li>
</ol>

<hr />

<h2 id="what-is-ats">What an ATS Actually Does</h2>
<p>An Applicant Tracking System extracts text from your resume file and organizes it into fields — name, contact info, work history, education, skills — then ranks or filters candidates based on keyword matches against the job posting. Most mid-size and large companies use one; if you're applying through an online portal rather than emailing a person directly, an ATS is almost certainly involved.</p>
<p>The ATS doesn't care how your resume looks. It cares whether it can correctly extract the text and structure.</p>

<hr />

<h2 id="what-breaks">What Breaks ATS Parsing</h2>
<ul>
  <li><strong>Text inside images.</strong> If your resume is a flattened image or a heavily designed PDF where text isn't selectable, the ATS sees nothing at all.</li>
  <li><strong>Multi-column layouts.</strong> Some ATS software reads left-to-right line by line, which can scramble a two-column layout into nonsense — merging your skills list with your job history mid-sentence.</li>
  <li><strong>Tables and text boxes.</strong> Content placed in a table or floating text box is sometimes skipped entirely by older parsing engines.</li>
  <li><strong>Unusual section headings.</strong> "My Journey" instead of "Experience," or icons instead of words, can fail to map to the field the ATS expects.</li>
  <li><strong>Headers and footers.</strong> Contact information placed in a document header is frequently not read by ATS software at all — keep it in the main body.</li>
</ul>

<hr />

<h2 id="how-to">How to Build an ATS-Friendly Resume (Step by Step)</h2>
<p><strong>Step 1: Open a resume builder.</strong><br />Go to the <a href="/tools/resume-builder">Shopyor Resume Builder</a>.</p>
<p><strong>Step 2: Pick a clean template.</strong><br />Choose a single-column, text-first template rather than a heavily graphic one (see the next section for how to choose).</p>
<p><strong>Step 3: Fill in standard sections.</strong><br />Use conventional headings — Summary, Experience, Education, Skills — in that order or close to it.</p>
<p><strong>Step 4: Write quantified bullet points.</strong><br />Under each role, describe outcomes with numbers where possible (see below).</p>
<p><strong>Step 5: Check for gaps.</strong><br />If the builder has a built-in resume score or checklist, use it — it will flag missing sections, weak bullet points, or a thin skills list before you download.</p>
<p><strong>Step 6: Download as PDF.</strong><br />Export using your browser's print-to-PDF, which preserves real selectable text rather than flattening it into an image.</p>

<hr />

<h2 id="which-template">Which Template Should You Pick?</h2>
<table>
  <thead>
    <tr><th>Field</th><th>Best template style</th><th>Why</th></tr>
  </thead>
  <tbody>
    <tr><td>Corporate, finance, technical</td><td>Clean, single-column, minimal color</td><td>Maximizes ATS parsing reliability</td></tr>
    <tr><td>Design, marketing, creative</td><td>More visual structure, accent color</td><td>Recruiters in these fields expect some visual judgment</td></tr>
    <tr><td>Student / entry-level</td><td>Balanced — not too sparse, not too busy</td><td>Limited experience needs a layout that doesn't look empty</td></tr>
  </tbody>
</table>
<p>If you're applying to multiple types of roles, it's worth keeping two versions: one minimal and ATS-safe for corporate applications, and one with more visual personality for roles where a human reviewer will see it first.</p>

<hr />

<h2 id="quantify">Why Quantified Bullet Points Matter</h2>
<p>Compare these two lines:</p>
<blockquote><p>"Responsible for managing the social media accounts."<br />vs.<br />"Grew Instagram following from 2,000 to 18,000 in 8 months, increasing engagement rate by 3.5x."</p></blockquote>
<p>The second tells a recruiter — and an ATS keyword match — far more in roughly the same number of words. Even an approximate number ("around 9x growth," "reduced response time by half") beats a vague description every time. If you genuinely can't quantify a responsibility, describe the concrete outcome instead of the task itself.</p>

<hr />

<h2 id="download">How to Download as a Proper PDF</h2>
<p>The single biggest technical mistake is exporting a resume as a flattened image or a PDF where the text isn't selectable — this is invisible to the ATS entirely. A browser's native print-to-PDF function preserves real text by default, which is why it's the safest export method: open the print dialog, choose "Save as PDF" instead of a physical printer, and the resulting file keeps every word selectable and machine-readable.</p>

<hr />

<h2 id="faq">Frequently Asked Questions</h2>

<h3>What makes a resume ATS-friendly?</h3>
<p>An ATS-friendly resume uses real, selectable text rather than text baked into an image, clean and standard section headings (Experience, Education, Skills), and a predictable top-to-bottom ordering. Applicant tracking systems scan resumes for these patterns, and anything too visually creative — heavy graphics, multi-column layouts with overlapping text, icons replacing words — risks being parsed incorrectly or skipped entirely.</p>

<h3>Which resume template should I choose?</h3>
<p>For corporate or technical roles, a clean, single-column template gives the most reliable ATS result. For design, marketing, or creative jobs, a template with more visual structure can add flair that recruiters notice once a human actually opens the file. For students and entry-level applicants, a balanced template that doesn't look intimidatingly sparse or overly busy tends to work best.</p>

<h3>How do I create an ATS-friendly resume for free?</h3>
<p>Use a clean, single-column template, add a strong professional summary, include quantified bullet points in your experience section (for example, "Increased sales by 30%" rather than just "Responsible for sales"), list at least 5 relevant skills, and make sure your education section is complete. A built-in resume score or checklist feature, if the builder has one, will flag common gaps before you download.</p>

<h3>Is my resume data saved or uploaded anywhere?</h3>
<p>A privacy-respecting resume builder saves your data only in your own browser's local storage, with nothing uploaded to a server. Look for an export-to-JSON option as well, so you have a permanent backup file you can re-import later or move to a different device.</p>

<h3>How do I download my resume as a PDF for free?</h3>
<p>Most browser-based resume builders use your browser's native print dialog set to "Save as PDF," which produces a crisp file with real, selectable text rather than a flattened image — exactly what an ATS needs to parse the content correctly. No file conversion or upload step is required.</p>

<h3>Do I need to quantify every bullet point on my resume?</h3>
<p>Not every single bullet, but as many as you reasonably can. A number gives a recruiter an instant sense of scale and impact — "managed a team of 6" or "reduced support tickets by 40%" communicates far more in five words than a vague description of responsibilities. If you genuinely don't have a number for a role, focus on a concrete outcome instead.</p>

<hr />

<h2 id="conclusion">Conclusion</h2>
<p>An ATS-friendly resume isn't about being plain or boring — it's about making sure the software reading it first can actually extract what you wrote, before a human ever gets the chance to be impressed by it. Clean structure, real text, quantified results, and the right template for your field will get you through that first filter reliably.</p>
<p><strong>Ready to build yours?</strong> Head to the <a href="/tools/resume-builder">Shopyor Resume Builder</a>, pick a template, and download an ATS-friendly PDF — free, no signup, no watermark.</p>

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

    let author =
      (await users.findOne({ role: "admin" })) ||
      (await users.findOne({}));
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
