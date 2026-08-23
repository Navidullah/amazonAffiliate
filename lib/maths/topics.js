// Topic registry for UK KS2 Year 6 Mathematics.
// Each topic is resolved at runtime against { curriculum: "UK", year: 6 }
// so the same shape can be reused for any future curriculum/year without
// changing any component that reads it.

export const CATEGORIES = [
  "Number",
  "Algebra",
  "Measurement",
  "Geometry",
  "Statistics",
  "Problem Solving",
];

// icon is a lucide-react component name (string) resolved via the ICON_MAP
// in TopicCard.jsx — keeps this file free of JSX/component imports so it
// stays a plain, portable data module.
export const UK_YEAR_6_TOPICS = [
  {
    slug: "place-value",
    title: "Place Value",
    shortDescription:
      "Read, write, order and round whole numbers up to 10,000,000, including negative numbers.",
    category: "Number",
    icon: "Hash",
  },
  {
    slug: "four-operations",
    title: "Four Operations",
    shortDescription:
      "Add, subtract, multiply and divide multi-digit numbers using efficient written methods.",
    category: "Number",
    icon: "Calculator",
  },
  {
    slug: "factors-multiples-primes",
    title: "Factors, Multiples and Primes",
    shortDescription:
      "Identify factors, multiples, prime numbers, prime factors, square and cube numbers.",
    category: "Number",
    icon: "Grid3x3",
  },
  {
    slug: "fractions",
    title: "Fractions",
    shortDescription:
      "Master equivalent fractions, adding and subtracting fractions, multiplying fractions and fraction problems.",
    category: "Number",
    icon: "PieChart",
  },
  {
    slug: "decimals",
    title: "Decimals",
    shortDescription:
      "Multiply and divide decimals, round decimals and convert between fractions and decimals.",
    category: "Number",
    icon: "Dot",
  },
  {
    slug: "percentages",
    title: "Percentages",
    shortDescription:
      "Find percentages of amounts, and convert fluently between fractions, decimals and percentages.",
    category: "Number",
    icon: "Percent",
  },
  {
    slug: "ratio-proportion",
    title: "Ratio and Proportion",
    shortDescription:
      "Solve problems involving ratio, proportion and scale using real-life examples.",
    category: "Number",
    icon: "Scale",
  },
  {
    slug: "algebra",
    title: "Algebra",
    shortDescription:
      "Use simple formulae, generate sequences and find missing values in equations.",
    category: "Algebra",
    icon: "Sigma",
  },
  {
    slug: "measurement",
    title: "Measurement",
    shortDescription:
      "Convert between metric units, solve problems with time, money and imperial measures.",
    category: "Measurement",
    icon: "Ruler",
  },
  {
    slug: "perimeter-area-volume",
    title: "Perimeter, Area and Volume",
    shortDescription:
      "Calculate the perimeter and area of shapes, and the volume of cuboids.",
    category: "Measurement",
    icon: "Box",
  },
  {
    slug: "properties-of-shapes",
    title: "Properties of Shapes",
    shortDescription:
      "Classify 2D and 3D shapes, calculate angles, and identify their properties.",
    category: "Geometry",
    icon: "Shapes",
  },
  {
    slug: "position-direction",
    title: "Position and Direction",
    shortDescription:
      "Describe positions on a coordinate grid and translate or reflect shapes.",
    category: "Geometry",
    icon: "Compass",
  },
  {
    slug: "statistics",
    title: "Statistics",
    shortDescription:
      "Interpret and construct line graphs, pie charts, and calculate the mean of a data set.",
    category: "Statistics",
    icon: "BarChart3",
  },
  {
    slug: "word-problems",
    title: "Word Problems",
    shortDescription:
      "Solve multi-step word problems using all four operations in real-life contexts.",
    category: "Problem Solving",
    icon: "FileQuestion",
  },
  {
    slug: "mathematical-reasoning",
    title: "Mathematical Reasoning",
    shortDescription:
      "Explain your thinking, spot patterns, and reason about numbers and shapes.",
    category: "Problem Solving",
    icon: "Brain",
  },
];

export const getTopic = (slug) =>
  UK_YEAR_6_TOPICS.find((t) => t.slug === slug) || null;

export const getTopicsByCategory = () =>
  CATEGORIES.map((category) => ({
    category,
    topics: UK_YEAR_6_TOPICS.filter((t) => t.category === category),
  })).filter((group) => group.topics.length > 0);
