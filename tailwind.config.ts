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
        mono: ["var(--font-mono)", "monospace"],
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
        
        // Landing page colors (from landing-page)
        surface: "#FAFAFA",
        ink: "#050505",
        pulse: "#ff003d",
        glow: "#ff4d8d",
        subtle: "#737373",
        'soft-red': 'rgba(255, 0, 61, 0.15)',
        
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
        'red-gradient': 'linear-gradient(135deg, #ff003d 0%, #ff4d8d 100%)',
        'glow-radial': 'radial-gradient(circle, rgba(255,0,61,0.08) 0%, rgba(255,255,255,0) 70%)',
        'grid-pattern': 'linear-gradient(to right, #f5f5f5 1px, transparent 1px), linear-gradient(to bottom, #f5f5f5 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '24px 24px',
      },
      boxShadow: {
        'soft-red': '0 20px 40px -10px rgba(255, 0, 61, 0.15)',
        'sharp': '0 0 0 1px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.05)',
        'glow': '0 0 20px rgba(255, 0, 61, 0.3)',
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

