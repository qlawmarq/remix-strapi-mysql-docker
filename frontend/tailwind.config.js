const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Exo 2'", "sans-serif"],
        default: ['"Roboto"', "sans-serif"],
        ...defaultTheme.fontFamily,
      },
      // http://mcg.mbitson.com/#!?mcgpalette0=%238c52ff
      colors: {
        primary: {
          50: "#f8f5ff",
          100: "#f5deff",
          200: "#ecb5fd",
          300: "#c97fe1",
          400: "#b566ff",
          500: "#7618f0",
          600: "#7c009c",
          700: "#3b0ea6",
          800: "#35005a",
          900: "#2a0044",
        },
        ...defaultTheme.colors,
      },
      extendedSpacing: {
        // Bigger values
        100: "25rem",
        120: "30rem",
        128: "32rem",
        140: "35rem",
        160: "40rem",
        180: "45rem",
        192: "48rem",
        200: "50rem",
        240: "60rem",
        256: "64rem",
        280: "70rem",
        320: "80rem",
        360: "90rem",
        400: "100rem",
        480: "120rem",
      },
      height: (theme) => ({
        ...defaultTheme.spacing,
        ...theme("extendedSpacing"),
      }),
      minHeight: (theme) => ({
        ...defaultTheme.spacing,
        ...theme("extendedSpacing"),
      }),
      maxHeight: (theme) => ({
        ...defaultTheme.spacing,
        ...theme("extendedSpacing"),
      }),
      width: (theme) => ({
        ...defaultTheme.spacing,
        ...theme("extendedSpacing"),
      }),
      minWidth: (theme) => ({
        ...defaultTheme.spacing,
        ...theme("extendedSpacing"),
      }),
      maxWidth: (theme) => ({
        ...defaultTheme.spacing,
        ...theme("extendedSpacing"),
      }),
    },
  },
  plugins: [],
};
