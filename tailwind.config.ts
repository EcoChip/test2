import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        porcelain: {
          DEFAULT: "rgb(var(--color-porcelain) / <alpha-value>)",
          light: "rgb(var(--color-porcelain-light) / <alpha-value>)",
          dark: "rgb(var(--color-porcelain-dark) / <alpha-value>)",
        },
        sage: {
          DEFAULT: "rgb(var(--color-sage) / <alpha-value>)",
          dark: "rgb(var(--color-sage-dark) / <alpha-value>)",
          deep: "rgb(var(--color-sage-deep) / <alpha-value>)",
          light: "rgb(var(--color-sage-light) / <alpha-value>)",
          muted: "rgb(var(--color-sage) / 0.08)",
        },
        coral: {
          DEFAULT: "rgb(var(--color-coral) / <alpha-value>)",
          hover: "rgb(var(--color-coral-hover) / <alpha-value>)",
          active: "rgb(var(--color-coral-active) / <alpha-value>)",
          surface: "rgb(var(--color-coral) / 0.10)",
        },
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          light: "rgb(var(--color-ink-light) / <alpha-value>)",
          muted: "rgb(var(--color-ink-muted) / <alpha-value>)",
          subtle: "rgb(var(--color-ink-subtle) / <alpha-value>)",
          border: "rgb(var(--color-ink) / 0.12)",
        },
        obsidian: {
          DEFAULT: "rgb(var(--color-obsidian) / <alpha-value>)",
          surface: "rgb(var(--color-obsidian-surface) / <alpha-value>)",
          border: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(29, 36, 32, 0.04), 0 1px 3px rgba(29, 36, 32, 0.02)",
        editorial: "0 20px 40px -15px rgba(29, 36, 32, 0.08), 0 2px 6px -1px rgba(29, 36, 32, 0.04)",
        cta: "0 6px 20px -4px rgb(var(--color-coral) / 0.40)",
      },
    },
  },
  plugins: [],
};
export default config;
