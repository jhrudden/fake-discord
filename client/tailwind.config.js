module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        width: "width",
        height: "height",
        backgroundColor: "backgroundColor",
        borderRadius: "borderRadius",
        opacity: "opacity",
      },
      backgroundImage: (theme) => ({
        "background-pattern": "url('assets/images/johnyhnery2.png')",
      }),
      height: (theme) => ({
        "100-px": "100px",
        "supa-small": "2px",
      }),
      width: (theme) => ({
        88: "22rem",
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
          "deepestDark-transparent": "rgba(44,49,58,0.75)",
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
    extend: {
      borderRadius: ["group-hover"],
      height: ["group-hover"],
      width: ["group-hover"],
      inset: ["group-hover"],
    },
  },
  plugins: [],
};
