/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        gradient: 'radial-gradient(circle, #0B0B2C 0%, #0B0B2C 52%, transparent 100%)',
        primary: "#04041A"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        
      },
      screens: {
        
  
        md: "944px",
        // => @media (min-width: 768px) { ... }
  
       
        
      },
    
      
    },
  },
  plugins: [],
}

