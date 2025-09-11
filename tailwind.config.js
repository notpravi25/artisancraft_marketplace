/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* warm-gold-20 */
        input: "var(--color-input)", /* elevated-dark-gray */
        ring: "var(--color-ring)", /* warm-gold */
        background: "var(--color-background)", /* deep-charcoal */
        foreground: "var(--color-foreground)", /* off-white */
        primary: {
          DEFAULT: "var(--color-primary)", /* warm-gold */
          foreground: "var(--color-primary-foreground)", /* deep-charcoal */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* earthy-brown */
          foreground: "var(--color-secondary-foreground)", /* off-white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* muted-red */
          foreground: "var(--color-destructive-foreground)", /* off-white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* elevated-dark-gray */
          foreground: "var(--color-muted-foreground)", /* muted-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* soft-terracotta */
          foreground: "var(--color-accent-foreground)", /* deep-charcoal */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* elevated-dark-gray */
          foreground: "var(--color-popover-foreground)", /* off-white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* elevated-dark-gray */
          foreground: "var(--color-card-foreground)", /* off-white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* natural-green */
          foreground: "var(--color-success-foreground)", /* deep-charcoal */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* warm-amber */
          foreground: "var(--color-warning-foreground)", /* deep-charcoal */
        },
        error: {
          DEFAULT: "var(--color-error)", /* muted-red */
          foreground: "var(--color-error-foreground)", /* off-white */
        },
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        caption: ['Source Sans Pro', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'warm': '0 4px 12px rgba(212, 165, 116, 0.15)',
        'warm-sm': '0 2px 8px rgba(212, 165, 116, 0.1)',
        'warm-lg': '0 8px 24px rgba(212, 165, 116, 0.2)',
      },
      animation: {
        'voice-pulse': 'voice-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        'voice-pulse': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.8',
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}