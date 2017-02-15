import should from "should";
import extractLocation from "../lib/extractLocation";

const html = new Buffer(`<!DOCTYPE html>
<html>
  <head>
    <link rel="canonical" href="http://foo.com/bar.html"/>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta http-equiv="refresh" content="0;url=http://foo.com/bar.html"/>
  </head>
</html>`, "utf-8");

const htmlNoCanonical = new Buffer(`<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta http-equiv="refresh" content="0;url=http://foo.com/bar.html"/>
  </head>
</html>`, "utf-8");

const htmlNoRefresh = new Buffer(`<!DOCTYPE html>
<html>
  <head>
    <link rel="canonical" href="http://foo.com/bar.html"/>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
  </head>
</html>`, "utf-8");

describe("extractLocation", () => {

  it("Should work", () => {
    extractLocation(html).should.eql("http://foo.com/bar.html");
  });

  it("Should return undefined with no canonical URL", () => {
    should(extractLocation(htmlNoCanonical)).be.undefined();
  });

  it("Should return undefined with no refresh meta tag", () => {
    should(extractLocation(htmlNoRefresh)).be.undefined();
  });

});
