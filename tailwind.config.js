/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{tsx,ts,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: colors.blue,
        secondary: colors.indigo,
        success: colors.green,
        error: colors.red,
        warning: colors.yellow,
        accent: colors.purple,
      },
    },
  },
  plugins: [],
};
