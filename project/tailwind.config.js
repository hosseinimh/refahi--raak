/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: ["./resources/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      
      fontFamily: {
        IRANSansWeb: ["IRANSansWeb"],
        IRANSansWeb_FaNum: ["IRANSansWeb_FaNum"],
      },
      backgroundImage: {
        "hero-lg": "url('./images/m1.svg')",
      },
      colors: {
        primaryOne: "#312E81",
      },
    },
  },
  plugins: [],
};
