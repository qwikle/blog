/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],

  daisyui: {
    themes: ['retro', 'luxury'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: 'luxury',
  },
}
