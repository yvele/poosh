export default {
  extends : [
    "./node",
    "./rules/mocha"
  ].map(require.resolve),
  plugins : [
    "mocha" // https://github.com/lo1tuma/eslint-plugin-mocha
  ],
  globals : {
    expect  : true, // https://github.com/Automattic/expect.js
    rewire  : true  // https://github.com/jhnns/rewire
  }
};
