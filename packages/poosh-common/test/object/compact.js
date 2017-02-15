import compact from "../../lib/object/compact";

describe("compact", () => {

  it("Should work with an ignore function", () => {
    compact({
      a : null,
      b : undefined,
      c : {
        d : undefined,
        e : [null, undefined, {}]
      },
      d : [null, { e: "e" }]
    }, value => value === null).should.eql({
      d : [{ e: "e" }]
    });
  });

  it("Should work with no ignore function", () => {
    compact({
      a : null,
      b : undefined,
      c : {
        d : undefined,
        e : [null, undefined, {}]
      },
      d : [null, { e: "e" }]
    }).should.eql({
      a : null,
      c : { e: [null] },
      d : [null, { e: "e" }]
    });
  });

});
