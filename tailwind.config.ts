import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        '3xl': '1700px',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)'],
        josefin: ['var(--font-josefin)'],
        dmserif: ['var(--font-dmserif)'],
        raleway: ['var(--font-raleway)'],
        playfair: ['var(--font-playfair)'],
    
      },
    },
  },
  plugins: [],
};
export default config;
