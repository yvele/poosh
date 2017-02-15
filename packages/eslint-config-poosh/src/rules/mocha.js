/* eslint-disable no-magic-numbers */
export default {
  env : {
    mocha : true
  },
  rules : {
    // Allow to import "should" that is not in package.json
    // TODO: Create an issue and ask for something like ignore=["should"]
    "import/no-extraneous-dependencies" : "off",


    // Allow to import lib files that haven't already been transpilled
    "import/no-unresolved" : ["error", {
      commonjs  : true,
      ignore    : ["../lib/"]
    }],

    // Enforces handling of callbacks for async tests
    "mocha/handle-done-callback" : "error",

    // Disallow Exclusive Tests (describe.only, it.only, etc.)
    "mocha/no-exclusive-tests" : "error",

    // Disallow global tests
    "mocha/no-global-tests" : "error",

    // Disallow identical titles
    "mocha/no-identical-title" : "error",

    // Warning on Skipped Tests
    "mocha/no-skipped-tests" : 1,

    // Allow require to be used inside "describe" functions
    "global-require" : "off",

    // Increase max nested callbacks (describe/it)
    "max-nested-callbacks" : ["error", 5],

    // Increase max statements
    "max-statements" : ["error", 30],

    // Allow mocking functions like __set__
    "no-underscore-dangle" : "off",

    // Allow expressions like "expect(true).to.be.true;"
    "no-unused-expressions" : "off",

    // Allow block padding (more visibility for decribe/it functions)
    "padded-blocks" : "off",

    // Allow magic numbers
    "no-magic-numbers" : "off"
  }
};
