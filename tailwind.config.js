/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '7xl': '6rem',
        '8xl': '8rem',
        '9xl': '10rem',
        '10xl': '12rem',
      }
    },
  },
  plugins: [],
}
