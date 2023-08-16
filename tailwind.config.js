/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        "one-day-block": "1px 1px 10px rgba(0, 0, 0, 0.1)",
      }
    },
  },
  plugins: [],
}

