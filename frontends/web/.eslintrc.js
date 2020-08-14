module.exports = {
    env: {
        browser: true,
        es6: true
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        // "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "prettier/react"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        project: "./tsconfig.eslint.json",
    },
    ignorePatterns: [
        "**/*.css.d.ts"
    ],
    rules: {
        "@typescript-eslint/ban-ts-ignore": ["warn"],
        "@typescript-eslint/no-inferrable-types": ["warn"],
        "@typescript-eslint/no-use-before-define": ["warn", { "functions": false }],
        "react/no-deprecated": ["warn"],
        "react/no-unknown-property": ["error", { ignore: ["class"] }],
        "quotes": ["warn", "single", {
            "avoidEscape": true,
            "allowTemplateLiterals": true
        }],
    },
    settings: {
        react: {
            pragma: "h",
            version: "detect"
        },
    },
    overrides: [
        {
            files: ["*.js"],
            rules: {
                "@typescript-eslint/explicit-function-return-type": "off",
            }
        }
    ]
};
