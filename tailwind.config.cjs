/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    // colors: {
    //   // --> Customize your custom colors here
    // },
    // screens: {
    //   // --> Customize the custom breakpoints here
    // },
    // fontFamily: {
    //   // --> Customize the custom font families here
    // },
    // extend: {
    //   spacing: {
    //     // --> Customize the custom spacing here
    //   },
    //   borderRadius: {
    //     // --> Customize the custom border radius here
    //   }
    // },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
