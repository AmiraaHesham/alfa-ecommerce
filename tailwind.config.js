/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components_admin/**/*.{js,ts,jsx,tsx,mdx}",
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
