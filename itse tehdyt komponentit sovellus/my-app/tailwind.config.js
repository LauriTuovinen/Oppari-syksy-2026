/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
   presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        heading: ["PlayfairDisplay_400Regular"],
        "heading-bold": ["PlayfairDisplay_700Bold"],

        body: ["Inter_400Regular"],
        "body-medium": ["Inter_500Medium"],
        "body-semibold": ["Inter_600SemiBold"],
      },
    },
  },
  plugins: [],
};

