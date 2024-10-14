/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        10: "10px",
        16: "16px",
        20: "20px",
        30: "30px",
        40: "40px",
      },
      fontWeight: {
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        700: 700,
        800: 800,
        900: 900,
        1000: 1000,
      },
      spacing: {
        5: "5px",
        10: "10px",
        20: "20px",
        30: "30px",
        40: "40px",
        50: "50px",
        100: "100px",
        150: "150px",
      },
    },
  },
  plugins: [],
};
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Đường dẫn tới các tệp React của bạn
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
