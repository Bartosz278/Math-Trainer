/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inconsolata: ["Inconsolata", "monospace"],
        Sriracha: ["Sriracha", "cursive"],
        Orbitron: ["Orbitron", "sans-serif"],
      },
      colors: {
        lightGreen: "#00CC00",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(143,172,215,1) 100%, rgba(38,38,189,1) 145%)",
      },
    },
  },
  plugins: [],
};
