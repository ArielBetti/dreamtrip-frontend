/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Urbanist", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        blurIn: {
          "0%, 100%": { backdropFilter: "blur(1px)" },
          "100%": { backdropFilter: "blur(5px)" },
        },
        fadeIn: {
          "0%, 100%": {
            transform: "translateY(50px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
        downSlide: {
          "0%, 100%": {
            transform: "translateY(-20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
				leaveDown: {
          "0%, 100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(20px)",
            opacity: 0,
          },
        },
        upSlide: {
          "0%, 100%": {
            transform: "translateY(20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: 1,
          },
        },
        leftSlide: {
          "0%, 100%": {
            transform: "translateX(20px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateX(0px)",
            opacity: 1,
          },
        },
        rightSlide: {
          "0%": {
            transform: "translateX(0px)",
            opacity: 1,
          },
          "100%": {
            transform: "translateX(20px)",
            opacity: 0,
          },
        },
        hide: {
          "0%, 100%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blurIn: "blurIn 0.45s ease-in-out forwards",
        fadeIn: "fadeIn 0.4s  ease forwards",
        leaveDown: "leaveDown 0.25s  ease forwards",
        downSlide: "downSlide 0.25s  ease forwards",
        slowDownSlide: "downSlide 0.5s  ease forwards",
        leftSlide: "leftSlide 0.25s  ease forwards",
        rightSlide: "rightSlide 0.25s  ease forwards",
        upSlide: "upSlide 0.25s ease forwards",
        hide: "hide 0.25s  ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
