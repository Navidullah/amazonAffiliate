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
    teach: {
      method: [
        "Line up the digits by place-value column (millions, hundred thousands, ten thousands, thousands, hundreds, tens, ones).",
        "To round, find the digit in the place you're rounding to, then look at the digit immediately to its right: 5 or more rounds up, 4 or less rounds down.",
        "For negative numbers, remember that on a number line, numbers get smaller the further left you go, so -8 is smaller than -3.",
      ],
      example: {
        question: "Round 6,482,715 to the nearest 100,000.",
        steps: [
          "The hundred-thousands digit is 4 (6,4__,___), so we're deciding between 6,400,000 and 6,500,000.",
          "The digit to its right is the ten-thousands digit: 8.",
          "8 is 5 or more, so we round up.",
        ],
        answer: "6,500,000",
      },
    },
  },
  {
    slug: "four-operations",
    title: "Four Operations",
    shortDescription:
      "Add, subtract, multiply and divide multi-digit numbers using efficient written methods.",
    category: "Number",
    icon: "Calculator",
    teach: {
      method: [
        "For column multiplication, multiply the top number by each digit of the bottom number separately, then add the results, remembering to shift left one place for each new digit.",
        "For short division, divide into the digits one at a time from left to right, carrying any remainder to the next digit.",
        "Always estimate first (round both numbers) so you can spot an answer that's clearly wrong.",
      ],
      example: {
        question: "Calculate 347 × 26.",
        steps: [
          "347 × 6 = 2,082",
          "347 × 20 = 6,940",
          "2,082 + 6,940 = 9,022",
        ],
        answer: "9,022",
      },
    },
  },
  {
    slug: "factors-multiples-primes",
    title: "Factors, Multiples and Primes",
    shortDescription:
      "Identify factors, multiples, prime numbers, prime factors, square and cube numbers.",
    category: "Number",
    icon: "Grid3x3",
    teach: {
      method: [
        "A factor divides exactly into a number with no remainder — find factors in pairs, working up from 1.",
        "A prime number has exactly two factors: 1 and itself. 1 is not prime, and 2 is the only even prime.",
        "To find prime factors, keep dividing by the smallest prime number that fits until you reach 1 — this is a 'factor tree'.",
      ],
      example: {
        question: "Find all the factor pairs of 36.",
        steps: [
          "1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6",
          "Once the pairs start repeating (6 × 6), you've found them all.",
        ],
        answer: "1, 2, 3, 4, 6, 9, 12, 18, 36",
      },
    },
  },
  {
    slug: "fractions",
    title: "Fractions",
    shortDescription:
      "Master equivalent fractions, adding and subtracting fractions, multiplying fractions and fraction problems.",
    category: "Number",
    icon: "PieChart",
    teach: {
      method: [
        "To add or subtract fractions with different denominators, first convert them to equivalent fractions with the same (common) denominator.",
        "To multiply fractions, multiply the numerators together and the denominators together, then simplify.",
        "To find a common denominator, look for a number both denominators divide into exactly — often their product, or their lowest common multiple.",
      ],
      example: {
        question: "Work out 2/3 + 1/4.",
        steps: [
          "The common denominator of 3 and 4 is 12.",
          "2/3 = 8/12 and 1/4 = 3/12",
          "8/12 + 3/12 = 11/12",
        ],
        answer: "11/12",
      },
    },
  },
  {
    slug: "decimals",
    title: "Decimals",
    shortDescription:
      "Multiply and divide decimals, round decimals and convert between fractions and decimals.",
    category: "Number",
    icon: "Dot",
    teach: {
      method: [
        "Line up the decimal points when adding or subtracting decimals, just like place-value columns for whole numbers.",
        "To multiply a decimal by 10, 100 or 1,000, move the digits left by 1, 2 or 3 places (the decimal point stays put, conceptually the digits shift).",
        "To convert a fraction to a decimal, divide the numerator by the denominator.",
      ],
      example: {
        question: "Convert 3/8 to a decimal.",
        steps: [
          "3 ÷ 8 = 0.375",
          "Check: 0.375 × 8 = 3.0 ✓",
        ],
        answer: "0.375",
      },
    },
  },
  {
    slug: "percentages",
    title: "Percentages",
    shortDescription:
      "Find percentages of amounts, and convert fluently between fractions, decimals and percentages.",
    category: "Number",
    icon: "Percent",
    teach: {
      method: [
        "'Per cent' means 'out of 100', so 25% is the same as 25/100 or 0.25.",
        "To find a percentage of an amount, find 1% (divide by 100) or 10% (divide by 10) first, then multiply or add to build up the percentage you need.",
        "To find 50%, halve the amount; to find 25%, halve it twice.",
      ],
      example: {
        question: "Find 35% of £240.",
        steps: [
          "10% of £240 = £24",
          "30% of £240 = £24 × 3 = £72",
          "5% of £240 = £12 (half of 10%)",
          "35% = £72 + £12 = £84",
        ],
        answer: "£84",
      },
    },
  },
  {
    slug: "ratio-proportion",
    title: "Ratio and Proportion",
    shortDescription:
      "Solve problems involving ratio, proportion and scale using real-life examples.",
    category: "Number",
    icon: "Scale",
    teach: {
      method: [
        "A ratio compares two or more quantities — add the parts of the ratio together to find the total number of shares.",
        "Divide the total amount by the total number of shares to find the value of one share, then multiply by each part of the ratio.",
        "Ratios can be simplified the same way fractions are, by dividing both sides by their highest common factor.",
      ],
      example: {
        question: "Share £60 in the ratio 2:3.",
        steps: [
          "Total shares = 2 + 3 = 5",
          "One share = £60 ÷ 5 = £12",
          "2 shares = £24, 3 shares = £36",
        ],
        answer: "£24 and £36",
      },
    },
  },
  {
    slug: "algebra",
    title: "Algebra",
    shortDescription:
      "Use simple formulae, generate sequences and find missing values in equations.",
    category: "Algebra",
    icon: "Sigma",
    teach: {
      method: [
        "A letter in algebra stands for an unknown number — treat it like a normal number when you calculate.",
        "To find a missing number in an equation, use the inverse (opposite) operation to undo what's been done to the letter.",
        "For sequences, find the term-to-term rule first (what's added, subtracted, multiplied or divided each time).",
      ],
      example: {
        question: "Solve 3n + 5 = 26.",
        steps: [
          "Subtract 5 from both sides: 3n = 21",
          "Divide both sides by 3: n = 7",
        ],
        answer: "n = 7",
      },
    },
  },
  {
    slug: "measurement",
    title: "Measurement",
    shortDescription:
      "Convert between metric units, solve problems with time, money and imperial measures.",
    category: "Measurement",
    icon: "Ruler",
    teach: {
      method: [
        "Metric units go up or down in multiples of 10, 100 or 1,000 (e.g. 1,000 g = 1 kg, 100 cm = 1 m), so converting is a matter of moving digits, not recalculating.",
        "For time problems, remember there are 60 minutes in an hour and 24 hours in a day — you can't just add/subtract like decimals.",
        "For imperial-to-metric conversions, learn the key approximate facts (e.g. 1 kg ≈ 2.2 lb, 1 mile ≈ 1.6 km) since they're given rather than derived.",
      ],
      example: {
        question: "Convert 2.35 kg to grams.",
        steps: [
          "1 kg = 1,000 g",
          "2.35 × 1,000 = 2,350",
        ],
        answer: "2,350 g",
      },
    },
  },
  {
    slug: "perimeter-area-volume",
    title: "Perimeter, Area and Volume",
    shortDescription:
      "Calculate the perimeter and area of shapes, and the volume of cuboids.",
    category: "Measurement",
    icon: "Box",
    teach: {
      method: [
        "Perimeter is the total distance around the outside of a shape — add up every side length.",
        "Area of a rectangle = length × width. Area of a triangle = (base × height) ÷ 2.",
        "Volume of a cuboid = length × width × height, always measured in cubic units (e.g. cm³).",
      ],
      example: {
        question: "Find the volume of a cuboid 8 cm long, 5 cm wide and 3 cm high.",
        steps: [
          "8 × 5 = 40",
          "40 × 3 = 120",
        ],
        answer: "120 cm³",
      },
    },
  },
  {
    slug: "properties-of-shapes",
    title: "Properties of Shapes",
    shortDescription:
      "Classify 2D and 3D shapes, calculate angles, and identify their properties.",
    category: "Geometry",
    icon: "Shapes",
    teach: {
      method: [
        "Angles on a straight line always add up to 180°; angles around a point always add up to 360°; angles in a triangle always add up to 180°.",
        "Regular shapes have all sides and all angles equal — a regular polygon's name tells you how many sides it has (e.g. hexagon = 6 sides).",
        "3D shapes are described by their faces (flat surfaces), edges (where two faces meet) and vertices (corners).",
      ],
      example: {
        question: "A triangle has angles of 55° and 72°. Find the third angle.",
        steps: [
          "Angles in a triangle sum to 180°.",
          "55 + 72 = 127",
          "180 − 127 = 53",
        ],
        answer: "53°",
      },
    },
  },
  {
    slug: "position-direction",
    title: "Position and Direction",
    shortDescription:
      "Describe positions on a coordinate grid and translate or reflect shapes.",
    category: "Geometry",
    icon: "Compass",
    teach: {
      method: [
        "Coordinates are written (x, y) — the x value tells you how far along (horizontally), the y value tells you how far up (vertically) from the origin (0, 0).",
        "A translation moves a shape a given number of squares left/right and up/down without rotating or resizing it.",
        "A reflection flips a shape over a mirror line — every point ends up the same distance from the line on the opposite side.",
      ],
      example: {
        question: "Point A is at (3, 2). Translate it 4 right and 1 down.",
        steps: [
          "x: 3 + 4 = 7",
          "y: 2 − 1 = 1",
        ],
        answer: "(7, 1)",
      },
    },
  },
  {
    slug: "statistics",
    title: "Statistics",
    shortDescription:
      "Interpret and construct line graphs, pie charts, and calculate the mean of a data set.",
    category: "Statistics",
    icon: "BarChart3",
    teach: {
      method: [
        "The mean (average) is found by adding all the values together, then dividing by how many values there are.",
        "On a pie chart, the whole circle represents the total (360° or 100%), and each slice represents its share of that total.",
        "On a line graph, read the value where your chosen point on one axis meets the plotted line, then trace across to the other axis.",
      ],
      example: {
        question: "Find the mean of 4, 7, 9, 12, 8.",
        steps: [
          "Sum: 4 + 7 + 9 + 12 + 8 = 40",
          "Number of values: 5",
          "40 ÷ 5 = 8",
        ],
        answer: "8",
      },
    },
  },
  {
    slug: "word-problems",
    title: "Word Problems",
    shortDescription:
      "Solve multi-step word problems using all four operations in real-life contexts.",
    category: "Problem Solving",
    icon: "FileQuestion",
    teach: {
      method: [
        "Underline the numbers and the question being asked, then decide which operation(s) the situation needs before calculating.",
        "Break multi-step problems into smaller steps, and write down what each step's answer represents so you don't lose track.",
        "Check your final answer makes sense in context (e.g. you can't have 2.5 buses or a negative amount of sweets).",
      ],
      example: {
        question:
          "A shop sells pencils in packs of 12 for £3. How much would it cost to buy 150 pencils?",
        steps: [
          "150 ÷ 12 = 12.5, so 13 packs are needed (you can't buy half a pack).",
          "13 × £3 = £39",
        ],
        answer: "£39",
      },
    },
  },
  {
    slug: "mathematical-reasoning",
    title: "Mathematical Reasoning",
    shortDescription:
      "Explain your thinking, spot patterns, and reason about numbers and shapes.",
    category: "Problem Solving",
    icon: "Brain",
    teach: {
      method: [
        "To prove a statement is true, show your reasoning step by step using facts you already know, not just a single example.",
        "To prove a statement is false, one clear counter-example is enough.",
        "Look for patterns by testing a few cases first, then describe the rule you notice in words before checking it works for another case.",
      ],
      example: {
        question: "Is it true that 'the sum of two odd numbers is always odd'?",
        steps: [
          "Test with 3 + 5 = 8 (even) — already one counter-example.",
          "Reasoning: an odd number is 'even + 1'. Two odds added together give (even + 1) + (even + 1) = even + even + 2 = even.",
        ],
        answer: "False — the sum of two odd numbers is always even.",
      },
    },
  },
];

export const getTopic = (slug) =>
  UK_YEAR_6_TOPICS.find((t) => t.slug === slug) || null;

export const getTopicsByCategory = () =>
  CATEGORIES.map((category) => ({
    category,
    topics: UK_YEAR_6_TOPICS.filter((t) => t.category === category),
  })).filter((group) => group.topics.length > 0);
