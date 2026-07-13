/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ceylon: {
          teal: '#0f5c56',
          sand: '#f4ede1',
          gold: '#c99a3f'
        }
      }
    }
  },
  plugins: []
};