/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridRow: {
        'span-18': 'span 18 / span 18',
      },
      gridTemplateColumns: {
        '1/2': '50% 50%',
        '1/3': '33.3% 33.3% 33.3%',
        '1/4': '25% 25% 25% 25%',
      },
      gridTemplateRows: {
        '18': 'repeat(18, minmax(0, 1fr))'
      },
      inset: {
        'y-1/5': '20%',
        'y-2/5': '40%',
        'y-3/5': '60%',
        'y-4/5': '80%',
        'y-1/6': '16.7%',
        'y-5/6': '83.3%',
      },
    },
  },
  plugins: [],
}

