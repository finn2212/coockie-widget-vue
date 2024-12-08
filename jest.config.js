module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testMatch: [
    "**/tests/unit/**/*.spec.[jt]s?(x)", // Matches files in tests/unit with .spec.js or .spec.ts
    "**/__tests__/*.[jt]s?(x)", // Matches files in __tests__ folder
  ],
};
