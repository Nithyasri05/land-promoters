/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        primary: "#412419",
        secondary: "#803D3B",
        lightbrown: "#AF8260",
        white:"#ffffff",
        black:"#000000",
        mid_brown:"#E4C59E"
      },
      fontFamily:{
        alike:"Alike,serif"
      },
    },
  },
  plugins: [],
}

