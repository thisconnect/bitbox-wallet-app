module.exports = {
    preset: "jest-preset-preact",
    setupFiles: [
        "<rootDir>/test/__mocks__/setupTests.js",
        "<rootDir>/test/__mocks__/browserMocks.js"
    ],
    // The regexp pattern Jest uses to detect test files
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    // testURL: "http://localhost:8080",
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMocks.js",
    }
}
