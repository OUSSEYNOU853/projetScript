/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./public/**/*.html", "./public/**/*.php"],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('daisyui'),
//   ],
// }
module.exports = {
  content: [
    './public/**/*.{php, html}',
    './templates/**/*.{php, html}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
