const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addBase, theme }) {
  addBase({
    ':focus-visible:not(:disabled)': {
      '@apply focused': '',
    },
    ':where(input, select, textarea):disabled': {
      '@apply disabled-control': '',
    },
    ':where(input, select, textarea):placeholder': {
      color: theme('colors.subtle'),
    },
  });
});
