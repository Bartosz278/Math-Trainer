/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      fontFamily: {
        Inconsolata: ["Inconsolata", "monospace"],
        Sriracha: ["Sriracha", "cursive"]
      },
      colors: {
        lightGreen: '#00CC00'
      },
    },
  },
  plugins: [],
};
