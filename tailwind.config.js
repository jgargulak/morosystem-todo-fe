/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#fdbf01",
      },
      fontSize: {
        "10px": "10px",
      },
    },
  },
  plugins: [],
};
