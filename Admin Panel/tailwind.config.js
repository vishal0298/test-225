/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false,
  corePlugins: {
    container: true,
  },
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        "black-900": "#000000",
        "black-800": "#1C1C1C",
        "black-700": "#1F1E48",
        "black-600": "#222222",
        "black-500": "#D4D4D4",
        "black-300": "#F3F3F3",
        "stone-700": "#FE8664",
        "cyan-800": "#FE8664",
        "cyan-300": "#FFF0EC",
        "pink-800": "#FF689F",
        "pink-300": "#FFDEEA",
        "red-800": "#FF0000",
      },
      boxShadow: {
        DEFAULT: "0px 20px 50px 0px rgba(15, 24, 44, 0.15);",
      },
    },
  },
  plugins: [],
};
