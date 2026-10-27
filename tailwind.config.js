/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F7F4EA',
        surface: '#FFFDF7',
        ink: '#171717',
        'brand-orange': '#FF7A24',
        'acid-lime': '#C6F36A',
        'soft-coral': '#FF9278',
        'warm-gray': '#77736D',
      },
      boxShadow: {
        'brutalist': '4px 4px 0px #171717',
        'brutalist-sm': '2px 2px 0px #171717',
        'brutalist-lg': '6px 6px 0px #171717',
      },
      borderRadius: {
        'brutalist': '8px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1deg)' },
          '50%':      { transform: 'translateY(-8px) rotate(1deg)' },
        },
      },
      animation: {
        float:        'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
