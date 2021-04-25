module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "background-pattern": "url('assets/images/johnyhnery2.png')",
      }),
      fontSize: {
        xxs: "0.6rem",
      },
      colors: {
        gray: {
          light: "#A3ABB8",
          base: "#808b9d",
          dark: "#505768",
          darkest: "#353B46",
          deepestDark: "#2C313A",
        },
        blue: {
          bright: "#7F9EDC",
          base: "#6B8ED6",
        },
        backgroundColor: "#3D434F",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
