import url from "url";
import should from "should";
import looseParse from "../../lib/url/looseParse";

describe("looseParse", function () {

  it("Should works with protocol", () => {
    looseParse("http://foo.com/bar").should.eql(
      url.parse("http://foo.com/bar")
    );
  });

  it("Should works without protocol", () => {
    looseParse("foo.com/bar").should.eql(
      url.parse("http://foo.com/bar")
    );
  });

  it("Should works without protocol but with an explicit default protocol", () => {
    looseParse("foo.com/bar", "https://").should.eql(
      url.parse("https://foo.com/bar")
    );
  });

  it("Should return undefined with no values", () => {
    should(looseParse()).be.undefined();
  });

});
