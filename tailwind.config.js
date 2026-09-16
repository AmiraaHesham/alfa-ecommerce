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
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.4s ease-out',
      },
      // fontFamily: {
      //   sans: ['var(--font-cairo)', 'sans-serif'],
      //   Cairo: ['var(--font-cairo)'],
      // },
    },
  },
  plugins: [],
};
