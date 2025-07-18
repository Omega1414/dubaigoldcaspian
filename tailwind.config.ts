import type { Config } from "tailwindcss";

const config: Config = {
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
      boxShadow: {
        'gray-500/30': '0 10px 15px -3px rgba(107, 114, 128, 0.3), 0 4px 6px -2px rgba(107, 114, 128, 0.3)',
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
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
        'work-sans': ['var(--font-work-sans)', 'sans-serif'],
        cinzel: ['var(--font-cinzel)', 'sans-serif'],
    
      },
    },
  },
  plugins: [],
};
export default config;
