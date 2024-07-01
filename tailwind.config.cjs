/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      primary: '#F1AF09',
      'sec-gray': '#CCCCCC',
      white: '#fff',
      transparent: 'transparent',
      'light-success': '#C9F9D1',
      'text-gray': '#828181',
      danger: '#9a2626',
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
