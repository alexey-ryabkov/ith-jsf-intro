const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addComponents, matchComponents, theme }) {
  addComponents({
    '.link': {
      '@apply text-sm-b': '',
      textDecoration: 'underline',
    },
    '.navigation-link': {
      '@apply text-sm-b text-quiet padded-1-2 rounded-small bordered': '',
      '@apply hover:bg-subtle active:text-black': '',
      '&:hover:active': {
        background: 'transparent',
      },
    },
    '.paragraph': {
      '@apply text-sm': '',
    },
    '.paragraph + .paragraph': {
      '@apply pt-step-2': '',
    },
    '.divider': {
      '@apply my-step-2': '',
      background: theme('colors.outline'),
      border: 'none',
      width: '100%',
      height: '1px',
    },
    '.descriptions dt': {
      '@apply mb-step-2 text-quiet': '',
    },
    '.descriptions dd': {
      '@apply text-lg-b': '',
    },
  });
  matchComponents(
    {
      btn: ([utilsNormal, utilsFulfilled]) => ({
        '@apply text-base-b padded-2-4 rounded-small': '',
        '&:not(.fulfilled)': {
          [`@apply ${utilsNormal}`]: '',
        },
        '&.fulfilled': {
          [`@apply ${utilsFulfilled}`]: '',
        },
        '@apply hover:bg-black hover:text-white disabled:disabled-control': '',
        display: 'inline-block',
      }),
    },
    {
      values: {
        DEFAULT: [
          'bg-primary text-white',
          'bg-white border border-black text-black',
        ],
        alternative: ['bg-white text-black', 'bg-subtle text-primary'],
      },
    },
  );
  matchComponents(
    {
      card: (utils) => ({
        [`@apply padded-4 rounded ${utils}`]: '',
      }),
    },
    {
      values: {
        DEFAULT: 'bg-white',
        info: 'bg-subtle',
        accent: 'bg-primary text-white',
        danger: 'bg-red text-white',
      },
    },
  );
  matchComponents(
    {
      badge: (css) => ({
        '@apply bg-primary text-white': '',
        ...css,
      }),
    },
    {
      values: {
        DEFAULT: {
          '@apply text-base-b rounded-small padded-half-1': '',
        },
        rounded: {
          '@apply text-xs rounded-full padded-1 text-center': '',
          height: '1.6875rem',
          aspectRatio: '1 / 1',
          textAlign: 'center',
        },
      },
    },
  );
});
