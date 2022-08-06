/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './src/components/**/*.jsx',
    // './src/routes/**/*.jsx',
    './**/*.jsx',
    './public/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
