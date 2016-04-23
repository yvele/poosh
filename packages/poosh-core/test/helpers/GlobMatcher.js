import GlobMatcher from "../../lib/helpers/GlobMatcher";

describe("GlobMatcher", () => {

  describe("check", () => {

    it("Should work with a single pattern", () => {
      new GlobMatcher()
        .check("foo.html", "*.html")
        .should.be.true();
    });

    it("Should work with an array of patterns", () => {
      new GlobMatcher()
        .check("foo.html", ["*.html", "!foo.html"])
        .should.be.false();
    });

  });

});
