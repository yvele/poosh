import normalizeFileOptions from "../../lib/options/normalizeFileOptions";

describe("normalizeFileOptions", () => {

  it("Should works with valid options", () => {
    normalizeFileOptions({
      acl : "private",
      storageClass : "STANDARD"
    }).should.eql({
      acl : "private",
      storageClass : "STANDARD"
    });
  });

  it("Should works with default values", () => {
    normalizeFileOptions({
      storageClass : "STANDARD"
    }).should.eql({
      acl : "public-read",
      storageClass : "STANDARD"
    });
  });

  it("Should throw with invalid options", () => {
    (() => normalizeFileOptions({ storageClass: "invalid" })).should.throw();
  });

});
