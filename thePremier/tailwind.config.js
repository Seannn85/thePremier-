/** @type {import('tailwindcss').Config} */

const scrollbar = require("tailwind-scrollbar");


const aspect = require("@tailwindcss/aspect-ratio");


module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nav: "#CCCCCC",
        back: "#2F2B2B",
        title: "#a80201",
        subText: "#585757",
        message: "#bbbbbb",
        scroll: "#dddddd",
      },

      fontFamily: {
        roboto: ["Roboto", "sans-serif"],

        verdana: ["Verdana", "sans-serif"],
        body: ['"Dancing Script"', "cursive"],
      },

    },
  },
  plugins: [scrollbar, aspect],
};
