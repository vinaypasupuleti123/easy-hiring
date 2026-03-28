/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        gfg: {
          green: '#2f8D46',
          dark: '#1a5629',
          light: '#e9f5ed',
          text: '#333333'
        }
      }
    },
  },
  plugins: [],
}
