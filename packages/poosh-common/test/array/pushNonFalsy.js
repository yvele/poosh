import should from "should";
import pushNonFalsy from "../../lib/array/pushNonFalsy";

describe("pushNonFalsy", function() {

  it("Should works", () => {
    let array = [true];
    pushNonFalsy(true, array)
      .should.equal(array).and.eql([true, true]);
  });

  it("Should works with a falsy value", () => {
    let array = [true];
    pushNonFalsy(undefined, array)
      .should.equal(array).and.eql([true]);
  });

  it("Should works with no explicit array", () => {
    pushNonFalsy(true).should.eql([true]);
  });

  it("Should works with no explicit array and a falsy value", () => {
    should(pushNonFalsy(false)).be.undefined();
  });

});
