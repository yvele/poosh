import should from "should";
import parseRemoteOptions from "../../lib/options/parseRemoteOptions";

describe("parseRemoteOptions", function() {

  it("Should works", function() {
    parseRemoteOptions("http://s3-us-west-2.amazonaws.com/bucket/bar/foo/").should.eql({
      type: "s3",
      region: "us-west-2",
      bucket: "bucket",
      basePath: "bar/foo"
    });
  });

  it("Should works with no base dir", function() {
    parseRemoteOptions("s3-us-west-2.amazonaws.com/bucket/").should.eql({
      type: "s3",
      region: "us-west-2",
      bucket: "bucket"
    });
  });

  it("Should return undefined with an invalid S3 URL", function() {
    should(parseRemoteOptions("invalid/url")).be.undefined();
  });

  it("Should return undefined with no argument", function() {
    should(parseRemoteOptions()).be.undefined();
  });

});
