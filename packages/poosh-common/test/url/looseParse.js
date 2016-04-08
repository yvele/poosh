import should from "should";
import looseParse from "../../lib/url/looseParse";

describe("looseParse", function () {

  it("Should works with protocol", () => {
    looseParse("http://foo.com/bar").should.eql({
      auth: null,
      hash: null,
      host: "foo.com",
      hostname: "foo.com",
      href: "http://foo.com/bar",
      path: "/bar",
      pathname: "/bar",
      port: null,
      protocol: "http:",
      query: null,
      search: null,
      slashes: true
    });
  });

  it("Should works without protocol", () => {
    looseParse("foo.com/bar").should.eql({
      auth: null,
      hash: null,
      host: "foo.com",
      hostname: "foo.com",
      href: "http://foo.com/bar",
      path: "/bar",
      pathname: "/bar",
      port: null,
      protocol: "http:",
      query: null,
      search: null,
      slashes: true
    });
  });

  it("Should works without protocol but with an explicit default protocol", () => {
    looseParse("foo.com/bar", "https://").should.eql({
      auth: null,
      hash: null,
      host: "foo.com",
      hostname: "foo.com",
      href: "https://foo.com/bar",
      path: "/bar",
      pathname: "/bar",
      port: null,
      protocol: "https:",
      query: null,
      search: null,
      slashes: true
    });
  });

  it("Should return undefined with no values", () => {
    should(looseParse()).be.undefined();
  });

});
