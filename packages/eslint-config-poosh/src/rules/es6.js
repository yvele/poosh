export default {
  rules : {
    // Disallow specific imports
    // http://eslint.org/docs/rules/no-restricted-imports
    "no-restricted-imports" : ["error",
      "underscore", // prefer using lodash
      "q",          // prefer using bluebird
      "minimatch"   // prefer using micromatch
    ]
  }
};
