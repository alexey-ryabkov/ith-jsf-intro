module.exports = {
  'step-half': 'calc(var(--space-step) / 2)',
  ...Array(10)
    .keys()
    .map((i) => ++i)
    .reduce((res, multi) => {
      res[`step-${multi}`] = `calc(var(--space-step) * ${multi})`;
      return res;
    }, {}),
  small: '1.625rem',
  middle: '2.25rem',
  large: '3.625rem',
};
