module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended", // Use Prettier plugin recommendations
  ],
  parserOptions: {
    parser: "@babel/eslint-parser", // Use Babel parser
    requireConfigFile: false,
  },
  rules: {
    "vue/multi-word-component-names": 0, // Disable multi-word name rule
    "prettier/prettier": "error", // Enforce Prettier formatting as ESLint errors
  },
};
