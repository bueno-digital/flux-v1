import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Flux - tonos cálidos, naturales, wellness
        flux: {
          50: '#faf9f7',
          100: '#f5f3f0',
          200: '#e8e4de',
          300: '#d4cdc3',
          400: '#b8ada0',
          500: '#9d8f7f',
          600: '#887a6b',
          700: '#716458',
          800: '#5e534a',
          900: '#4e453e',
          950: '#2a2420',
        },
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c6cfc6',
          300: '#a1afa1',
          400: '#7a8d7a',
          500: '#5f7260',
          600: '#4a5b4b',
          700: '#3d4a3e',
          800: '#333d34',
          900: '#2c332d',
          950: '#161b17',
        },
        sand: {
          50: '#fdfcfa',
          100: '#f9f6f1',
          200: '#f2ebe0',
          300: '#e8dbc8',
          400: '#dcc7aa',
          500: '#cfb08c',
          600: '#c09a72',
          700: '#a9805d',
          800: '#8a694f',
          900: '#715742',
          950: '#3c2d22',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
