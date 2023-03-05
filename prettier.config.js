module.exports = {
    plugins: [require("prettier-plugin-tailwindcss")],
    tailwindConfig: "./tailwind.config.js",
    printWidth: 80,
    trailingComma: "none",
    tabWidth: 4,
    semi: true,
    singleQuote: false,
    jsxBracketSameLine: false,
    bracketSpacing: true,
    arrowParens: "always",
    endOfLine: "auto",
    jsxSingleQuote: false,
    proseWrap: "preserve",
    quoteProps: "as-needed",
    useTabs: false,
    htmlWhitespaceSensitivity: "css"
};
