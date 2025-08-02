module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#2C3E50",  // Пример темного синего
        "gradient-start": "#3E4A61",  // Начало градиента
        "gradient-end": "#2C3E50",   // Конец градиента
      },
    },
  },
  plugins: [],
};
