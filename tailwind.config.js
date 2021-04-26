module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './pages/*.{js,ts,jsx,tsx}',
      './components/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
  },
  theme: {
    extend: {
      colors: {
        gray: {
          main: '#1e1e1e',
          light: '#2B272A',
        },
        black: {
          dark: '#19181A',
          light: '#231F22',
        },
        orange: {
          main: '#D97706',
        },
      },
    },
  },
};
