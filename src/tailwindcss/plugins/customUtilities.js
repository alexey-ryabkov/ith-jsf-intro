const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities, matchUtilities, theme }) {
  addUtilities({
    '.bordered': {
      border: `1px solid ${theme('colors.outline')}`,
    },
    '.grid-left-bigger': {
      '@apply grid-cols-left-bigger gap-step-4': '',
      display: 'grid',
    },
    '.veil': {
      '@apply size-full': '',
      background: theme('colors.veil'),
    },
    '.fulfilled': {
      pointerEvents: 'none',
    },
  });
  matchUtilities(
    {
      padded: (steps) => {
        const [paddingBlock, paddingInline = paddingBlock] = steps
          .split('-')
          .map((s) => theme(`spacing.step-${s}`));
        return {
          paddingBlock,
          paddingInline,
        };
      },
    },
    {
      values: {
        half: 'half',
        'half-1': 'half-1',
        1: '1',
        '1-2': '1-2',
        2: '2',
        '2-4': '2-4',
        4: '4',
      },
    },
  );
});
