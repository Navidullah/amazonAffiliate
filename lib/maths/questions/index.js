import placeValue from "./uk-year6-place-value";
import fourOperations from "./uk-year6-four-operations";
import factorsMultiplesPrimes from "./uk-year6-factors-multiples-primes";
import fractions from "./uk-year6-fractions";
import decimals from "./uk-year6-decimals";
import percentages from "./uk-year6-percentages";
import ratioProportion from "./uk-year6-ratio-proportion";
import algebra from "./uk-year6-algebra";
import measurement from "./uk-year6-measurement";
import perimeterAreaVolume from "./uk-year6-perimeter-area-volume";
import propertiesOfShapes from "./uk-year6-properties-of-shapes";
import positionDirection from "./uk-year6-position-direction";
import statistics from "./uk-year6-statistics";
import wordProblems from "./uk-year6-word-problems";
import mathematicalReasoning from "./uk-year6-mathematical-reasoning";

// Keyed by "<CURRICULUM>-<year>-<topic-slug>" so bank.js can resolve any
// future curriculum/year the same way, without an if/else chain here.
export const QUESTION_BANK = {
  "UK-6-place-value": placeValue,
  "UK-6-four-operations": fourOperations,
  "UK-6-factors-multiples-primes": factorsMultiplesPrimes,
  "UK-6-fractions": fractions,
  "UK-6-decimals": decimals,
  "UK-6-percentages": percentages,
  "UK-6-ratio-proportion": ratioProportion,
  "UK-6-algebra": algebra,
  "UK-6-measurement": measurement,
  "UK-6-perimeter-area-volume": perimeterAreaVolume,
  "UK-6-properties-of-shapes": propertiesOfShapes,
  "UK-6-position-direction": positionDirection,
  "UK-6-statistics": statistics,
  "UK-6-word-problems": wordProblems,
  "UK-6-mathematical-reasoning": mathematicalReasoning,
};
