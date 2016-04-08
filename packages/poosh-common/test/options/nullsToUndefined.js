import nullsToUndefined from "../../lib/options/nullsToUndefined";

describe("nullsToUndefined", function () {

  it("Should mutate object", () => {
    let obj = { a: null };
    nullsToUndefined(obj);
    obj.should.eql({ a: undefined });
  });

  it("Should replace null with undefined", () => {
    nullsToUndefined({ a: null }).should.eql({ a: undefined });
  });

  it("Should keep replace non null values", () => {
    nullsToUndefined({ a: "A" }).should.eql({ a: "A" });
  });

  it("Should deeply replace null with undefined", () => {
    nullsToUndefined({ a: { b: null } })
      .should.eql({ a: { b: undefined } });
  });

});
