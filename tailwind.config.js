/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // We set custom semantic colors that map to light/dark themes
        darkBg: "#0A0A0A",
        darkSec: "#111111",
        lightBg: "#FFFFFF",
        lightSec: "#F5F5F5",
        accent: {
          DEFAULT: "#3B82F6", // soft blue accent
          hover: "#2563EB",
          dark: "#60A5FA",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
