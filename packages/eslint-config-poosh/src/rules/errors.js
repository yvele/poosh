export default {
  rules : {
    // Require trailing commas in multiline object literals
    "comma-dangle" : ["error", "only-multiline"],

    // Disallow use of console
    "no-console" : "error",

    // Disallow use of constant expressions in conditions
    "no-constant-condition" : "error",

    // Disallow function or variable declarations in nested blocks
    "no-inner-declarations" : ["error", "functions"],

    // Disallow negation of the left operand of an in expression
    "no-negated-in-lhs" : "error"
  }
};
