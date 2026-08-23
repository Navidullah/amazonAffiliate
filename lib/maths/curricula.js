// Curriculum/year registry for the Maths Challenge feature.
// Only UK Year 6 is "active" for v1 — every other entry is a real,
// pre-registered placeholder so /maths/year-3, /maths/igcse, etc. can be
// added later purely as new topic+question data, without touching this
// registry's shape or any component.

export const CURRICULA = [
  {
    code: "UK",
    flag: "🇬🇧",
    label: "UK",
    status: "active",
    years: [
      { year: 6, slug: "year-6", label: "Year 6", subLabel: "KS2 Mathematics" },
    ],
  },
  {
    code: "US",
    flag: "🇺🇸",
    label: "USA",
    status: "coming-soon",
    years: [{ year: null, slug: "usa-grade-5-6", label: "Grade 5–6", subLabel: "Common Core" }],
  },
  {
    code: "AU",
    flag: "🇦🇺",
    label: "Australia",
    status: "coming-soon",
    years: [{ year: 6, slug: "au-year-6", label: "Year 6", subLabel: "Australian Curriculum" }],
  },
  {
    code: "SG",
    flag: "🇸🇬",
    label: "Singapore",
    status: "coming-soon",
    years: [{ year: null, slug: "sg-primary-6", label: "Primary 6", subLabel: "Singapore Maths" }],
  },
];

export const getCurriculum = (code) =>
  CURRICULA.find((c) => c.code === code) || null;

export const getActiveCurricula = () =>
  CURRICULA.filter((c) => c.status === "active");
