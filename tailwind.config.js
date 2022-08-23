/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,tsx,ts,js}"],
  theme: {
    extend: {},
    fontFamily: {
      hillingdon: ["Luminari", "fantasy"],
      jacobyLikes: ["Bradley Hand", "cursive"],
    },
    screens: {
      miniTablet: "160px",
      smallTablet: "450px",
      // => @media (min-width: 640px) { ... }
      tablet: "640px",
      // => @media (min-width: 640px) { ... }
      inbetween: "800px",

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
