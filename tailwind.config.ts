import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        navy: "#093655",
        teal: "#1CC5A7",
        "off-white": "#F9F9F9",
        "text-primary": "#000000",
        "text-muted": "#6F6F6F",
        "border-muted": "#606060",
        divider: "#606060"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      fontSize: {
        h1: ["20px", { lineHeight: "1.4" }],
        body: ["12px", { lineHeight: "1.6" }]
      },
      borderRadius: {
        "2xl": "15px",
        "xl": "12px"
      },
      boxShadow: {
        card: "0 12px 30px -20px rgba(9, 54, 85, 0.35)",
        soft: "0 8px 20px -18px rgba(9, 54, 85, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
