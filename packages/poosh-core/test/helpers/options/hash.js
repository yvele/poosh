import hash from "../../../lib/helpers/options/hash";

describe("hash", () => {

  it("Should not return the same hash for different objects", () => {
    hash({ a: "A" })
      .should.not.eql(hash({ b: "B" }));
  });

  it("Should return the same hash over the time", () => {
    hash({ a: "A" })
      .should.eql("5049ae29");
  });

  it("Should hash regarless of properties order", () => {
    hash({ a: "A", b: "B" })
      .should.eql(hash({ b: "B", a: "A" }));
  });

  it("Should hash regarless of undefined values", () => {
    hash({ a: "A" })
      .should.eql(hash({ a: "A", b: undefined }));
  });

  it("Should hash regarless of null values", () => {
    hash({ a: "A" })
      .should.eql(hash({ a: "A", b: null }));
  });

  it("Should return the same hash for empty and undefined", () => {
    hash({})
      .should.eql(hash(null));
  });

  it("Should return the same hash for null and undefined", () => {
    hash(null)
      .should.eql(hash(undefined));
  });

  it("Should return the same empty hash over the time", () => {
    hash()
      .should.eql("0000000");
  });

});
