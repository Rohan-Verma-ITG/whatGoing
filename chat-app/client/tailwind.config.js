/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255, 255, 255, 0.08)",
        glassBorder: "rgba(255, 255, 255, 0.16)"
      },
      boxShadow: {
        ios: "0 8px 32px rgba(31, 38, 135, 0.35)"
      },
      borderRadius: {
        ios: "26px"
      }
    }
  },
  plugins: []
};
