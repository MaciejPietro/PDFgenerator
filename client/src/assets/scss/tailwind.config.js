const path = require("path");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        default: "#1F2E4D",
        dark: "#162139",
        darkest: "#000",
      },
      white: "#fff",
      gray: {
        100: "#FAFAFA",
        200: "#F5F5F5",
        300: "#EEEEEE",
        400: "#E6E7EB",
        500: "#DDDDDD",
        600: "#D6D6D6",
        700: "#BBBBBB",
        800: "#b0b0b0",
        900: "#858585",
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
        200: "#EAEEFF",
        300: "#A4AFC6",
        400: "#738ADE",
        500: "#5590EA",
        600: "#2D60CA",
        700: "#16439F",
        800: "#324589",
        900: "#6A7794",
      },
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      "2xl": "6rem",
      // "2xl": "1.5rem",
      // "3xl": "1.875rem",
      // "4xl": "2.25rem",
      // "5xl": "3rem",
      // "6xl": "4rem",
      // "7xl": "5rem",
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
  plugins: [],
};
