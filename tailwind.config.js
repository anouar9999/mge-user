
module.exports = {
  
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      'primary': '#d65032',
        'orange-mge':'#ff3d08',
        'secondary':'#181818',
        'dark':'#1f2020',
        'dark-gray':'#5E656D',
      },
      fontFamily: {
        custom: ['nightWarrior', 'sans-serif'],
        pilot: ['pilot', 'sans-serif'],
        juvanze: ['juvanze', 'sans-serif'],
        valorant: ['valorant', 'sans-serif']


      },
    },
  },
  plugins: [],
}