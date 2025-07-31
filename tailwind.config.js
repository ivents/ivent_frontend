/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "#bdbdbd",
        accent: "#884dff",
      },
      backgroundColor: {
        dark: '#121212',
      },
    },
  },
  plugins: [],
};
