import compact from "../../lib/object/compact";

describe("compact", function() {

  it("Should work with an ignore function", () => {
    compact({
      a: null,
      b: undefined,
      c: {
        d: undefined,
        e: [null, undefined, {}]
      },
      d: [null, { e: "e" }]
    }, function(value) {
      return value === null;
    }).should.eql({
      d: [ { e: "e" } ]
    });
  });

  it("Should work with no ignore function", () => {
    compact({
      a: null,
      b: undefined,
      c: {
        d: undefined,
        e: [null, undefined, {}]
      },
      d: [null, { e: "e" }]
    }).should.eql({
      a: null,
      c: { e: [null] },
      d: [ null, { e: "e" } ]
    });
  });

});
