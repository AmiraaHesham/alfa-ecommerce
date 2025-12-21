/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      //     colors: {
      //   primary: '#4F46E5',
      //   sidebar: '#F9FAFB',
      //   'gray-900': '#111827',
      //   'gray-500': '#6B7280',
      //   'green-600': '#10B981',
      //   'yellow-600': '#F59E0B',
      //   'purple-600': '#A855F7',
      //   'pink-600': '#EC4899',
      // },
    },
  },
  plugins: [],
};
