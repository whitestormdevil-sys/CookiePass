import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef0ff",
          100: "#e0e3ff",
          200: "#c7cbff",
          300: "#a5a7fc",
          400: "#8b82f8",
          500: "#6663f2",
          600: "#6348e5",
          700: "#553bca",
          800: "#4632a3",
          900: "#3b2f81",
          950: "#241b4b",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "count-up": "count-up 2s ease-out",
        blob: "blob 8s ease-in-out infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.8", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.05)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "count-up": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        blob: {
          "0%, 100%": {
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            transform: "translate(0, 0) scale(1)",
          },
          "33%": {
            borderRadius: "58% 42% 75% 25% / 76% 24% 76% 24%",
            transform: "translate(10px, -10px) scale(1.03)",
          },
          "66%": {
            borderRadius: "50% 50% 33% 67% / 55% 27% 73% 45%",
            transform: "translate(-5px, 5px) scale(0.98)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
