/* eslint-disable no-magic-numbers */
export default {
  rules : {

    // Require function expressions to have a name
    "func-names" : "error",

    // Enforces spacing between keys and values in object literal properties
    "key-spacing" : ["error", {
      singleLine : {
        beforeColon : false,
        afterColon  : true
      },
      multiLine : {
        beforeColon : true,
        afterColon  : true,
        mode        : "minimum"
      }
    }],

    // Allow use of unary operators, ++ and --
    // http://eslint.org/docs/rules/no-plusplus
    "no-plusplus" : "off",

    // Specify the maximum length of a line in your program
    // http://eslint.org/docs/rules/max-len
    "max-len" : ["error", 110, 2, {
      ignoreUrls              : true,
      ignoreComments          : false,
      ignoreRegExpLiterals    : true,
      ignoreStrings           : true,
      ignoreTemplateLiterals  : true
    }],

    // Specify the maximum depth callbacks can be nested
    "max-nested-callbacks" : ["error", 4],

    // Limits the number of parameters that can be used in the function declaration.
    "max-params" : ["error", 10],

    // Enforce padding within blocks
    "padded-blocks" : ["error", {
      classes   : "always",
      switches  : "never"
    }],

    // Specify that double quotes should be used
    // see http://stackoverflow.com/a/18041188/1480391
    quotes : ["error", "double", { avoidEscape: true }]
  }
};
