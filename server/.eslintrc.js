module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "@typescript-eslint/semi": ["error"],
        "eol-last": ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "quotes": ["error", "single", "avoid-escape"],
        "semi": "off",
    },
};
