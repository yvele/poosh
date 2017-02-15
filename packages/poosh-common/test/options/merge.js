import merge from "../../lib/options/merge";

describe("merge", () => {

  it("Should mutate destination object", () => {
    const dest = {};
    merge(dest, { a: "A" });
    dest.should.eql({ a: "A" });
  });

  it("Should concatenate array values", () => {
    merge({ a: [1] }, { a: [2] }).should.eql({ a: [1, 2] });
  });

  it("Should not concatenate array duplicates values", () => {
    merge({ a: [1] }, { a: [1] }).should.eql({ a: [1] });
  });

  it("Should overwrite property", () => {
    merge({ a: "1" }, { a: "2" }).should.eql({ a: "2" });
  });

  it("Should overwrite property with null value", () => {
    merge({ a: "1" }, { a: null }).should.eql({ a: null });
  });

  it("Should work with 3+ arguments", () => {
    merge({ a: "a" }, { b: "b" }, { c: "c" }).should.eql({
      a : "a",
      b : "b",
      c : "c"
    });
  });

  /**
   * Relative to lodash issue: https://github.com/lodash/lodash/issues/2111
   */
  it("Should not mutate source with at least 3 levels deep", () => {
    const sources = [
      { foo: { bar: { a: "a" } } },
      { foo: { bar: { b: "b" } } }
    ];

    merge({}, ...sources).should.eql({
      foo : { bar: { a: "a", b: "b" } }
    });

    sources.should.eql([
      { foo: { bar: { a: "a" } } },
      { foo: { bar: { b: "b" } } }
    ]);
  });

});
