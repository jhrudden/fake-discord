module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "background-pattern": "url('images/johnyhnery2.png')",
      }),
      fontSize: {
        xxs: "0.6rem",
      },
      colors: {
        gray: {
          light: "#A3ABB8",
          dark: "#505768",
          darker: "#3D434F",
        },
        blue: {
          bright: "#738CBF",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
