/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'c-bg-primary': '#FAF8F4',
        'c-bg-secondary': '#F6F5F2',
        'c-text-primary': '#1E1E1E',
        'c-text-secondary': '#555555',
        'c-accent': '#C8A15A',
        'c-accent-border': '#E8E3DB',
        'c-accent-glow': 'rgba(199, 161, 90, 0.05)',
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-shadow': '0 10px 30px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
