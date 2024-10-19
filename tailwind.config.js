/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#32CD32", // Lime Green
        secondary: "#3EE62A", // Un verde ligeramente más claro que el primario
        background: "#F0FFF0", // Honeydew
        backgroundLight: "#F0FFF0",
        accent: "#FFD700", // Gold
        textPrimary: "#000000", // Black
        textSecondary: "#FFFFFF", // White
        border: "#2E8B57", // Sea Green
        neutral: {
          light: "#D3D3D3", // Light Gray
          DEFAULT: "#808080", // Gray
        },
      },
    },
  },
  plugins: [],
};
