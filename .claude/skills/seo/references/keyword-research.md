# Keyword research & intent

This site's whole strategy is **low-competition long-tail keywords** — phrases
specific enough that big sites haven't saturated them, but with real demand.
Recent commits ("SEO overhaul for low-competition keywords") confirm this.

## How to pick the target keyword

1. **Start from the tool's job.** A BMI tool's job = "calculate BMI". The head
   term ("bmi calculator") is too competitive to win quickly.
2. **Add qualifiers people actually type** until competition drops but intent
   stays high:
   - **Units/format**: "bmi calculator kg and cm", "pdf to word converter free"
   - **Audience**: "bmi calculator for women by age", "resume builder for students"
   - **Modifier**: "free", "online", "no signup", "without watermark", "hd"
   - **Question form**: "how to calculate bmi manually", "is my bmi healthy"
   - **Comparison/outcome**: "healthy weight for my height", "ideal weight calculator"
3. **One primary phrase** goes in `<title>`, `<h1>`, `description`, and the
   first paragraph. **10–20 secondary long-tails** go in the `keywords` array
   and the on-page "Related searches" block.

## Map keyword → intent → page section

| Intent type     | Example query                       | What the page must contain            |
|-----------------|-------------------------------------|---------------------------------------|
| Transactional   | "free pdf to word converter"        | The working tool, above the fold      |
| Informational   | "how to calculate bmi manually"     | A clear how-to / explanation section  |
| Navigational    | "shopyor bmi"                       | Brand + clear H1                       |
| Comparison      | "best tiktok downloader no watermark"| Why-this-tool + feature list          |

A single page can serve several intents: tool at top, how-to + FAQ below. That
depth is *why* it ranks — thin tool-only pages lose to content-rich competitors.

## The on-page "Related searches" block

Render the secondary long-tails as visible text/links near the bottom (see the
`KEYWORDS` array in `bmi/page.jsx`). This:
- Adds keyword coverage naturally.
- Captures long-tail variants without keyword-stuffing the body.
- Keep it honest — these should be genuine related queries, styled as a helpful
  "People also search for" list, not a hidden keyword dump.

## Finding demand without paid tools

- **Google autocomplete / "People also ask" / "Related searches"** at the bottom
  of the SERP — free, direct from Google.
- **`AnswerThePublic`, `Google Trends`** for question phrasing and seasonality.
- For non-Google markets (e.g. China/Taiwan) use **Baidu Index** for mainland,
  but target **Traditional-Chinese Google queries** for Taiwan/HK where Google
  works (e.g. 去背, PDF轉Word, 圖片壓縮).
- Look at what already ranks for the phrase: if page 1 is all huge brands, pick
  a longer-tail variant; if it's thin/old pages, you can win with depth.

## Don't

- Don't target a keyword the page can't genuinely satisfy (bounce → rank loss).
- Don't repeat the exact keyword unnaturally ("keyword stuffing"). Use synonyms
  and variants; write for humans first.
- Don't put different target keywords on two pages that then compete with each
  other (keyword cannibalization) — one primary keyword per URL.
