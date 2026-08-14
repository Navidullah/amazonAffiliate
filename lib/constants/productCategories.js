// Maintained list of valid region/category combos for the worksheet store.
// `category` is a free-text field on DigitalProduct (not a Mongoose enum) so
// new curricula can be added here without a schema migration.

export const REGIONS = [
  { value: "uk", label: "United Kingdom" },
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

export const CATEGORIES = [
  { value: "ks2-maths", region: "uk", label: "KS2 Maths" },
  { value: "sats", region: "uk", label: "SATs Practice" },
  { value: "us-common-core-math", region: "us", label: "Common Core Math" },
  { value: "ca-provincial-math", region: "ca", label: "Provincial Math" },
];

export const getCategoriesForRegion = (region) =>
  CATEGORIES.filter((c) => c.region === region);

export const getCategoryLabel = (value) =>
  CATEGORIES.find((c) => c.value === value)?.label || value;

export const getRegionLabel = (value) =>
  REGIONS.find((r) => r.value === value)?.label || value;
