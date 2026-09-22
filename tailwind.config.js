/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1220",
          900: "#10192E",
          800: "#182342",
        },
        indigo: {
          DEFAULT: "#2E3A87",
          600: "#2E3A87",
          700: "#242C6B",
        },
        marigold: {
          DEFAULT: "#E8971D",
          500: "#E8971D",
          600: "#CC7E0E",
        },
        cloud: "#FAFAF7",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
