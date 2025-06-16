/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // your old nx-blue can stay if you like, or replace it
        'nx-blue':     '#0066FF',
        // new Thirdy-blue
        'thirdy-blue': '#1B5AA4',
      },
      // …other extends…
    },
  },
  plugins: [],
}