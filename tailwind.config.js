/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './App.tsx', // Your main app entry file
    './screens/**/*.{js,jsx,ts,tsx}', // Screens folder
    './components/**/*.{js,jsx,ts,tsx}', // Components folder
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}