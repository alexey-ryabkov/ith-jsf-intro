const fontSize = require('./src/tailwindcss/theme/fontSize');
const borderRadius = require('./src/tailwindcss/theme/borderRadius');
const colors = require('./src/tailwindcss/theme/colors');
const spacing = require('./src/tailwindcss/theme/spacing');
const customComponents = require('./src/tailwindcss/plugins/customComponents');
const customUtilities = require('./src/tailwindcss/plugins/customUtilities');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/styles/*.scss',
  ],
  theme: {
    fontSize,
    borderRadius,
    extend: {
      colors,
      spacing,
      gridTemplateColumns: {
        'left-bigger': '0.588fr 0.412fr',
      },
    },
  },
  plugins: [customComponents, customUtilities],
};
