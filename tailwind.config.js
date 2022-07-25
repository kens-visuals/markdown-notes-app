/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-1000': '#151619',
        'primary-900': '#1D1F22',
        'primary-800': '#2B2D31',
        'primary-700': '#35393F',
        'secondary-600': '#5A6069',
        'secondary-500': '#7C8187',
        'secondary-400': '#C1C4CB',
        'secondary-300': '#E4E4E4',
        'tertiary-200': '#F5F5F5',
        'orange-primary': '#E46643',
        'orange-secondary': '#F39765',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
        'roboto-slab': ['Roboto Slab', 'serif'],
      },
      fontSize: {
        'heading-1': ['2rem', '2.625rem'],
        'heading-2': ['1.75rem', '2.3125rem'],
        'heading-3': ['1.5rem', '2rem'],
        'heading-4': ['1.25rem', '1.625rem'],
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('@tailwindcss/typography')],
};
