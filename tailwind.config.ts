/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    extend: {
      animation: {
        slideX: 'slideX 3s linear infinite'
      },
      keyframes: {
        slideX: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      }
    }
  }
};
