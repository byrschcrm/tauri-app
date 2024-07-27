/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '1/2': '50% 50%',
        '1/3': '34% 33% 33%',
        '1/4': '25% 25% 25% 25%',
      }
    },
  },
  plugins: [],
}

