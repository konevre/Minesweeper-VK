/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            gridTemplateColumns: {
                16: "repeat(16, 24px)",
            },
            gridTemplateRows: {
                16: "repeat(16, 24px)",
            },
            backgroundImage: {
                opened: "url('/src/assets/cell/opened.svg')",
                closed: "url('/src/assets/cell/closed.svg')",
                mine: "url('/src/assets/cell/mine.svg')",
                mine_red: "url('/src/assets/cell/mine_red.svg')",
                mine_wrong: "url('/src/assets/cell/mine_wrong.svg')",
                flag: "url('/src/assets/cell/flag.svg')",
                question: "url('/src/assets/cell/question.svg')",
                1: "url('/src/assets/cell/1.svg')",
                2: "url('/src/assets/cell/2.svg')",
                3: "url('/src/assets/cell/3.svg')",
                4: "url('/src/assets/cell/4.svg')",
                5: "url('/src/assets/cell/5.svg')",
                6: "url('/src/assets/cell/6.svg')",
                7: "url('/src/assets/cell/7.svg')",
                // 8: "url('/src/assets/cell/8.svg')",
            },
        },
    },
    plugins: [],
};
