/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",

        secondary: "#c7d2fe",

        accent: "#3730a3",

        "accent-light": "#524bc9",

        neutral: "#d1d5db",

        "base-100": "#1f2937",

        info: "#ccfbf1",

        success: "#38bdf8",

        warning: "#f97316",

        error: "#ff0000",

        compliment: "#333333",

        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
