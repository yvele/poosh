import parseMs from "../../lib/options/parseMs";

describe("parseMs", function() {

  it("Should parse string", () => {
    parseMs("1 min").should.eql(60000);
  });

  it("Should floor number", () => {
    parseMs(42.5).should.eql(42);
  });

  it("Should throw an error with an invalid value", () => {
    (function() {
      parseMs("(ツ)", "path");
    }).should.throw(/^Failed to parse "path" option./);
  });

});
