module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        "eol-last": ["error", "always"],
        "quotes": ["error", "single", "avoid-escape"],
        "object-curly-spacing": ["error", "always"],
        "semi": ["error", "always"],
    },
};
