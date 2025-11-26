/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#22A958",
        secondary: "#575EFF",
        warning: "#EBA825",
        success: "#22A958",
        error: "#DF1D17",
        neutral: "#686C79",
      },
      fontFamily: {
        'iran-sans': ['IRANSansXFaNum'],
      },
    },
  },
  plugins: [],
};