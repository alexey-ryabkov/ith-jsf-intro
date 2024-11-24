/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xs: [
        "0.75rem",
        {
          lineHeight: "0.675rem",
          fontWeight: "600",
        },
      ],
      sm: [
        "1rem",
        {
          lineHeight: "1.3rem",
          fontWeight: "400",
        },
      ],
      smb: [
        "1rem",
        {
          lineHeight: "1.26rem",
          fontWeight: "500",
        },
      ],
      base: [
        "1.25rem",
        {
          lineHeight: "1.625rem",
          fontWeight: "500",
        },
      ],
      baseb: [
        "1.25rem",
        {
          lineHeight: "1.625rem",
          fontWeight: "600",
        },
      ],
      lg: [
        "2.5rem",
        {
          lineHeight: "3.25rem",
          fontWeight: "500",
        },
      ],
      lgb: [
        "2.5rem",
        {
          lineHeight: "2.75rem",
          fontWeight: "600",
        },
      ],
      xl: [
        "4rem",
        {
          lineHeight: "4.4rem",
          fontWeight: "700",
        },
      ],
      "2xl": [
        "6rem",
        {
          lineHeight: "6.6rem",
          fontWeight: "700",
        },
      ],
    },
    extend: {
      colors: {
        primary: "var(--color-primary)",
        black: "var(--color-black)",
        white: "var(--color-white)",
        red: "var(--color-red)",
        green: "var(--color-green)",
        // veil: "var(--color-veil)",
        // subtle: "var(--color-subbtle)",
      },
      spacing: {
        ...Array(10)
          .keys()
          .map((i) => ++i)
          .reduce((res, multi) => {
            res[`step-${multi}`] = `calc(var(--space-step) * ${multi})`;
            return res;
          }, {}),
        small: "1.625rem",
        middle: "2.25rem",
        large: "3.625rem",
      },
    },
    borderRadius: {
      DEFAULT: "0.75rem",
      sm: "0.4375rem",
    },
  },
  plugins: [],
};
