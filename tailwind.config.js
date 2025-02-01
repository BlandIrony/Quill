/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '350px',
      'md': '700px'
    },
    extend: {
      colors: {
        black: 'var(--color-black)',
        white: 'var(--color-white)',
        gray: 'var(--color-gray)'
      },
      fontFamily: {
        'panchang-b': ['Panchang Bold', 'sans-serif'],
        'panchang-ex': ['Panchang Extrabold', 'sans-serif'],
        'satoshi': ['Satoshi Regular', 'sans-serif']
      }
    },
  },
  plugins: [],
}