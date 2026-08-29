/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          light: '#3b82f6',
          DEFAULT: '#2563eb', // Basic functional blue accent
          dark: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
