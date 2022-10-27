/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6379F4",
        dark: "#3A3D42",
        error: "#FF5B37",
        secondary: "rgba(99, 121, 244, 0.2)",
      },
    },
  },
  plugins: [],
};
