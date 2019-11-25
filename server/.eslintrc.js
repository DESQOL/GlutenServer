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
        "indent": ["error", 4, { "MemberExpression": 1 }],
        "object-curly-spacing": ["error", "always"],
        "prefer-arrow-callback": "error",
        "quotes": ["error", "single", "avoid-escape"],
        "semi": "off",
    },
};
