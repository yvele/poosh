import compact from "../../lib/options/compact";

describe("compact", () => {

  it("Should work", () => {
    compact({
      a : null,
      b : undefined,
      c : {
        d : undefined,
        e : [null, undefined, {}]
      },
      d : [null, { e: "e" }]
    }).should.eql({
      d : [{ e: "e" }]
    });
  });

  it("Should return an empty object with null value", () => {
    compact(null).should.eql({});
  });

});
