/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        brand: {
          50: "#fef2f3",
          100: "#fde3e5",
          200: "#fbcbd0",
          300: "#f7a3ab",
          400: "#f06d7b",
          500: "#e43f53",
          600: "#c8102e",
          700: "#a90d27",
          800: "#8d0f26",
          900: "#771126",
          950: "#42040f",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgb(24 24 27 / 0.04), 0 4px 16px -4px rgb(24 24 27 / 0.08)",
        lift: "0 2px 4px rgb(24 24 27 / 0.04), 0 16px 32px -12px rgb(24 24 27 / 0.18)",
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
