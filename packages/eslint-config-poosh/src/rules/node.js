export default {
  rules : {

    // Restrict usage of specified node modules
    "no-restricted-modules" : ["error",
      "prompt",     // in favor of inquirer
      "underscore", // in favor of lodash
      "q"           // in favor of bluebird
    ]
  }
};
