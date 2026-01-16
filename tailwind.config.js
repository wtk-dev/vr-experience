/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'vr-dark': '#2a2d3a',
        'vr-gray': '#6b7280',
        'vr-cta': '#FF6B35',
        'vr-cta-hover': '#FF8555',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.15)',
        'elegant-lg': '0 8px 40px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 40px rgba(255, 107, 53, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

