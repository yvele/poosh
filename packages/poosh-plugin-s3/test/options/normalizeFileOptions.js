import normalizeFileOptions from "../../lib/options/normalizeFileOptions";

describe("normalizeFileOptions", function () {

  it("Should works with valid options", function () {
    normalizeFileOptions({
      acl: "private",
      storageClass: "STANDARD"
    }).should.eql({
      acl: "private",
      storageClass: "STANDARD"
    });
  });

  it("Should works with default values", function () {
    normalizeFileOptions({
      storageClass: "STANDARD"
    }).should.eql({
      acl: "public-read",
      storageClass: "STANDARD"
    });
  });

  it("Should throw with invalid options", function () {
    (() => normalizeFileOptions({ storageClass: "invalid" })).should.throw();
  });

});
