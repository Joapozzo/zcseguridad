/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      keyframes: {
        'success-video-border-spin': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'success-video-border-spin': 'success-video-border-spin 14s linear infinite',
      },
    },
  },
  plugins: [],
}
