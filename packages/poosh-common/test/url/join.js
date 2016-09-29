import should from "should";
import join from "../../lib/url/join";

describe("join", function() {

  it("Should works", () => {
    join("/foo/", "/bar/", "a", "b", "c/")
      .should.eql("foo/bar/a/b/c");
  });

  it("Should works with falsey parts", () => {
    join("foo", "", null, "bar", undefined)
      .should.eql("foo/bar");
  });

  it("Should works with spaces", () => {
    join(" foo   ", " / bar")
      .should.eql("foo/bar");
  });

  it("Should works with no arguments", () => {
    should(join()).be.undefined();
  });

});
