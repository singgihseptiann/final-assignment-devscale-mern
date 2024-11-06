/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        primary: {
          100: '#e7dbd7',
          200: '#cfb7b0',
          300: '#b89288',
          400: '#a06e61',
          500: '#884a39',
          600: '#6d3b2e',
          700: '#522c22',
          800: '#361e17',
          900: '#1b0f0b',
        },
        secondary: {
          100: '#f3e6dd',
          200: '#e7cdbb',
          300: '#dbb398',
          400: '#cf9a76',
          500: '#c38154',
          600: '#9c6743',
          700: '#754d32',
          800: '#4e3422',
          900: '#271a11',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
