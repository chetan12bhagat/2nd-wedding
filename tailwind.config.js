/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f9',
          100: '#d9e0f0',
          200: '#b3c1e0',
          300: '#8da2d1',
          400: '#6683c1',
          500: '#4064b2',
          600: '#2d4a8a',
          700: '#1e3366',
          800: '#0f1b3d',
          900: '#0a1128',
          950: '#060b1a',
        },
        gold: {
          50: '#fdf9ef',
          100: '#faf0d5',
          200: '#f4dfaa',
          300: '#edc974',
          400: '#e5b04b',
          500: '#d4982e',
          600: '#c08225',
          700: '#a06420',
          800: '#825020',
          900: '#6b431e',
          DEFAULT: '#d4a547',
        },
        ivory: {
          50: '#fefdfb',
          100: '#fdf8f0',
          200: '#faf3e5',
          300: '#f5ead6',
          400: '#efe0c7',
          DEFAULT: '#faf3e5',
        },
        champagne: {
          DEFAULT: '#f7e7ce',
          dark: '#d4a547',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        script: ['Great Vibes', 'Dancing Script', 'cursive'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 20s linear infinite',
        'stamp': 'stamp 0.5s cubic-bezier(0.17, 0.67, 0.35, 1.2) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(212, 165, 71, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(212, 165, 71, 0.6)' },
        },
        stamp: {
          '0%': { transform: 'scale(3) rotate(-15deg)', opacity: '0' },
          '60%': { transform: 'scale(0.9) rotate(2deg)', opacity: '1' },
          '80%': { transform: 'scale(1.05) rotate(-1deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

