/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
      },
      keyframes: {
        blink: {
          '0%, 80%, 100%': { opacity: '0' },
          '40%': { opacity: '1' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.4)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1.4s infinite ease-in-out',
        twinkle: 'twinkle 3s infinite ease-in-out',
        fadeInUp: 'fadeInUp 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
