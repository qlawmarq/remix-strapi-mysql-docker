/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "eslint:recommended",
    "prettier",
  ],
  ignorePatterns: [
    "**/build/**/*.js",
    "**/api/**/*.js",
    "*.config.*",
    "**/public/**",
    "**/generated.*",
  ],
  root: true,
};
