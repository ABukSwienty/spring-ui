/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{tsx,ts,js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        brand: colors.blue,
        success: colors.green,
        error: colors.red,
        warning: colors.yellow,
        accent: colors.indigo,
      },
    },
  },
  plugins: [],
};
