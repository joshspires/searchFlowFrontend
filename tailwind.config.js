/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bitter: ['"Bitter", sans-serif']
      },
      colors: {
        primary: "#162267",
        secondary: "#0b1134",
      }
    },
  },
  plugins: [],
}