/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f2f7f5',
          100: '#e3ede9',
          200: '#c4d9d1',
          300: '#9bbfb3',
          400: '#6ea094',
          500: '#4d8378',
          600: '#3a6b60',
          700: '#2c5249',
          800: '#1e3d34',
          900: '#142b24',
        },
        cream: {
          50: '#fafaf8',
          100: '#f5f0e8',
          200: '#ece4d4',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
