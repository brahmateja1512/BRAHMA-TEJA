/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        os: {
          dark: '#1e1e2e',
          light: '#cdd6f4',
          accent: '#cba6f7',
          panel: 'rgba(30, 30, 46, 0.75)',
        }
      }
    },
  },
  plugins: [],
}
