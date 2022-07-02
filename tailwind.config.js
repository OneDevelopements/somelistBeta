module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    'node_modules/react-toastify/dist/ReactToastify.css',
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          '50': 'var(--prim50)',
          '100': 'rgba(var(--prim100), <alpha-value>)',
          '200': 'rgba(var(--prim200), <alpha-value>)',
          '300': 'rgba(var(--prim300), <alpha-value>)',
          '400': 'rgba(var(--prim400), <alpha-value>)',
          '500': 'rgba(var(--prim500), <alpha-value>)',
          '600': 'rgba(var(--prim600), <alpha-value>)',
          '700': 'rgba(var(--prim700), <alpha-value>)',
          '800': 'rgba(var(--prim800), <alpha-value>)',
          '900': 'rgba(var(--prim900), <alpha-value>)',
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}
