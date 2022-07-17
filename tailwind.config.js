const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px'
      },
        extend: {
          fontFamily: {
            sans: ['Nunito', ...defaultTheme.fontFamily.sans],
          },
          letterSpacing: {
            widest: '.3em'
          }
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
