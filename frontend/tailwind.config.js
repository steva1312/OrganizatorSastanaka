/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#100F0F',
        secondary: '#FF5757',
        teriary: '#E7AC74',
        dark: '#1D1D25',
        warm: '#dd9149'
      },
      dropShadow: {
        'card': '0 0 25px 25px rgba(1, 1, 1, 0.15)',
      }
    },
    fontFamily: {
      'inter': ['"Inter"', 'sans-serif'],
      'roboto': ['"Roboto"', 'sans-serif'],
    },
    maxWidth: {
      '4/5': '80%',
    }
  },
  plugins: [],
}

