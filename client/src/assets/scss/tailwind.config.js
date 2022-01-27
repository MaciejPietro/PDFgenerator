const path = require("path");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: {
        100: "#EEEEEE",
        200: "#E6E7EB",
        300: "#D6D6D6",
        400: "#b0b0b0",
        500: "#858585",
        600: "#737373",
        700: "#575757",
        800: "#4a4a4a",
        900: "#2e2e2e",
      },
      red: {
        300: "#FFCDCD",
        400: "#DE7380",
        500: "#DF5B5B",
        600: "#893241",
      },
      green: {
        300: "#E9FFF6",
        400: "#44BA88",
        500: "#40AC88",
        600: "#186838",
      },
      blue: {
        100: "#EBF1FF",
        200: "#E6EDF5",
        300: "#A4AFC6",
        400: "#478CCE",
        500: "#5590EA",
        600: "#2D60CA",
        700: "#16439F",
        800: "#324589",
        900: "#143F66",
      },
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      "2xl": "6rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    fontFamily: {
      sans: ["Rubik", "sans-serif"],
      hero: ["Montserrat", "sans-serif"],
    },
    extend: {},
  },
  variants: {
    extend: {
      cursor: ["disabled"],
      textOpacity: ["disabled"],
      textColor: ["disabled"],
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
};
