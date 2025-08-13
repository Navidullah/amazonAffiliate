module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ["var(--font-jetbrainsMono)"],
        geist: ["var(--font-geist-sans)"],
        geistMono: ["var(--font-geist-mono)"],
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, #a78bfa, #8498fa, #60a5fa, #a38ef4, #f472b6, #c07dfa, #a78bfa)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
