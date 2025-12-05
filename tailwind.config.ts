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
      colors: {
        // Use CSS variables for dark mode support
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        ink: "hsl(var(--ink))",
        subtle: "hsl(var(--subtle))",
        
        // Brand colors stay the same in both modes
        pulse: "#ff003d",
        glow: "#ff4d8d",
        'soft-red': 'rgba(255, 0, 61, 0.15)',
        
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        primary: {
          DEFAULT: "#ff003d",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        
        brand: {
          start: "#ff003d",
          end: "#ff4d8d",
        },
      },
      backgroundImage: {
        'red-glow': 'radial-gradient(circle at center, #ff003d 0%, #ff4d8d 40%, transparent 70%)',
        'red-gradient': 'linear-gradient(135deg, #ff003d 0%, #ff4d8d 100%)',
        'glow-radial': 'radial-gradient(circle, rgba(255,0,61,0.08) 0%, rgba(255,255,255,0) 70%)',
        'grid-pattern': 'linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)',
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
