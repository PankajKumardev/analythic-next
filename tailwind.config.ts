import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
      borderRadius: {
        lg: "0px",
        md: "0px",
        sm: "0px",
        full: "9999px",
      },
      colors: {
        background: "#ffffff",
        foreground: "#0a0a0a",
        
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0a0a0a",
        },
        
        primary: {
          DEFAULT: "#ff003d",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f4f4f5",
          foreground: "#0a0a0a",
        },
        muted: {
          DEFAULT: "#f4f4f5",
          foreground: "#737373",
        },
        border: "#e5e5e5",
        
        brand: {
          start: "#ff003d",
          end: "#ff4d8d",
        },
      },
      backgroundImage: {
        'red-glow': 'radial-gradient(circle at center, #ff003d 0%, #ff4d8d 40%, transparent 70%)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
