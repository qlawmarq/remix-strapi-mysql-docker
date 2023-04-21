/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "prettier"],
  ignorePatterns: ["**/build/**/*.js", "**/api/**/*.js", "*.config.*"],
};
