/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a365d',
        secondary: '#2d5a9e',
        accent: '#60a5fa'
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(to right bottom, rgba(26, 54, 93, 0.9), rgba(45, 90, 158, 0.9)), url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
      }
    }
  },
  plugins: [],
}