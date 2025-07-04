/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          lightgray: '#D9D9D9',
        },
        fontFamily: {
            inter: ['Inter', 'sans-serif'],
            roboto: ['Roboto', 'sans-serif'],
            Lobster: ['Libertinus Mono', 'monospace'],
          },
      },
    },
    plugins: [],
  }
  