export default {
  extends : [
    "eslint-config-airbnb-base",
    "eslint-config-airbnb-base/rules/strict",
    "./rules/babel",
    "./rules/best-practices",
    "./rules/errors",
    "./rules/node",
    "./rules/style",
    "./rules/es6",
    // "./rules/jsdoc"
  ].map(require.resolve),

  // Rules of shame because I got not time for full refactoring :/
  // TODO: Remove those
  rules : {
    "no-underscore-dangle"          : ["error", { allowAfterThis: true }],
    "no-empty-function"             : "off",
    "import/prefer-default-export"  : "off",
    "no-param-reassign"             : "off",
    "no-await-in-loop"              : "off",
    "no-restricted-syntax"          : "off"
  }
};
