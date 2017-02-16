import GlobMatcher from "../../lib/helpers/GlobMatcher";

describe("GlobMatcher", () => {

  describe("matchEvery", () => {

    it("Should work with a single pattern", () => {
      new GlobMatcher()
        .matchEvery("foo.html", "*.html")
        .should.be.true();
    });

    it("Should work with an array of patterns", () => {
      new GlobMatcher()
        .matchEvery("foo.html", ["*.html", "!foo.html"])
        .should.be.false();
    });

  });

});
