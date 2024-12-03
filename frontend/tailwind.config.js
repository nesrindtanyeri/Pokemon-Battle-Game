/** @type {import('tailwindcss').Config} */
module.exports = {
  /*
   * Explanation of Configuration:
   * 
   * extend.colors: Adds the custom color palette to Tailwind.
   * - You can now use classes like bg-primary, text-secondary, border-accent, etc.
   * 
   * daisyui.themes: Defines a custom theme for DaisyUI with your colors.
   * - primary: Used for buttons, active states, etc.
   * - secondary: Used for secondary buttons, less prominent UI elements.
   * - accent: Used for highlights or call-to-action elements.
   * - neutral: Used for general background or text color.
   * - base-100: Sets the base background color for the theme.
   *   In this case, it's white for a clean contrast with dark primary and secondary colors.
   * 
   * Other Theme Keys:
   * - info, success, warning, and error are set to DaisyUI defaults.
   *   You can adjust them as needed.
   */
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#222831',  // A dark grayish black
        secondary: '#393E46', // A slightly lighter grayish black
        accent: '#00ADB5',    // A vibrant teal
        neutral: '#EEEEEE',   // A light gray
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        customtheme: {
          primary: "#222831",
          secondary: "#393E46",
          accent: "#00ADB5",
          neutral: "#EEEEEE",
          "base-100": "#F29F58", // Default background color for the theme
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
};

