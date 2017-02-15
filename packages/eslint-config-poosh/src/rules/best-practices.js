/* eslint-disable no-magic-numbers */
export default {
  rules : {
    // Enforces getter/setter pairs in objects
    "accessor-pairs" : "error",

    // Specify the maximum cyclomatic complexity allowed in a program
    complexity : ["error", 12],

    // Specify curly brace conventions for all control statements
    curly : ["error", "all"],

    // Enforce that class methods use "this"
    // http://eslint.org/docs/rules/class-methods-use-this
    "class-methods-use-this" : ["off", {
      exceptMethods : [],
    }],

    // Require the use of === and !==
    // http://eslint.org/docs/rules/eqeqeq
    eqeqeq : ["error", "allow-null"],

    // Disallow the use of alert, confirm, and prompt
    "no-alert" : "error",

    // Disallow comparisons to null without a type-checking operator
    "no-eq-null" : "error",

    // Disallow var and named functions in global scope
    // http://eslint.org/docs/rules/no-implicit-globals
    "no-implicit-globals" : "off",

    // Disallow magic numbers
    // http://eslint.org/docs/rules/no-magic-numbers
    "no-magic-numbers" : ["error", {
      ignore              : [-1, 1, 0, 2, 100, 1000],
      ignoreArrayIndexes  : true,
      enforceConst        : true,
      detectObjects       : false
    }],

    // Disallow reassignment of function parameters
    // Allow parameter object manipulation
    // rule: http://eslint.org/docs/rules/no-param-reassign.html
    "no-param-reassign" : ["error", {
      props : false
    }],

    // Disallow use of assignment in return statement
    "no-return-assign" : "error",

    // Disallow usage of expressions in statement position
    "no-unused-expressions" : "error",

    // Disallow useless string concatenation
    // http://eslint.org/docs/rules/no-useless-concat
    "no-useless-concat" : "error",

    // Disallow usage of configurable warning terms in comments: e.g. todo
    "no-warning-comments" : ["off", {
      terms     : ["todo", "fixme"],
      location  : "anywhere"
    }]
  }
};
