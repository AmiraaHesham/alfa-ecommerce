/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     screens:{
      'xs':'320px',
   
     },
      fontFamily: {
        sans: ['var(--font-cairo)', 'sans-serif'],
        Cairo: ['var(--font-cairo)'],
      },
    },
  },
  plugins: [],
};
