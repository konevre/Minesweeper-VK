/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    purge: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                16: "repeat(16, minmax(0, 1fr))",
            },
            gridTemplateRows: {
                16: "repeat(16, minmax(0, 1fr))",
            },
        },
    },
    plugins: [],
};
