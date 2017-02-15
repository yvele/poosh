import parseSeconds from "../../lib/options/parseSeconds";

describe("parseSeconds", () => {

  it("Should work with a number", () => {
    parseSeconds(10).should.eql(10);
  });

  it("Should floor a real", () => {
    parseSeconds(10.99).should.eql(10);
  });

  it("Should work with a string", () => {
    parseSeconds("10").should.eql(10);
  });

  it("Should work with a string with units", () => {
    parseSeconds("1 minute").should.eql(60);
  });

  it("Should floor parsed value if < 1 second", () => {
    parseSeconds("10 ms").should.eql(0);
  });

});
