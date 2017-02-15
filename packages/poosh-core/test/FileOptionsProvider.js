import FileOptionsProvider from "../lib/FileOptionsProvider";

describe("FileOptionsProvider", () => {

  it("Should work", () => {
    const fop = new FileOptionsProvider({
      each : [{
        match : "*.html",
        headers : { foo: "foo" }
      }, {
        match : "*.html",
        headers : { bar: "bar" }
      }]
    });

    fop.getOptions("foo.html").should.eql({
      headers : { foo: "foo", bar: "bar" }
    });
  });

  it("Should override with null values", () => {
    const fop = new FileOptionsProvider({
      each : [{
        match   : "*.html",
        headers : { foo: { bar: "bar" } }
      }, {
        match   : "*.html",
        headers : { foo: null }
      }]
    });

    fop.getOptions("foo.html").should.eql({
      headers : { foo: null }
    });
  });

  /**
   * Relative to lodash issue: https://github.com/lodash/lodash/issues/2111
   */
  it("Should not mutate source with at least 3 levels deep", () => {

    const options = {
      each : [{
        foo   : { bar: { a: "a" } }
      }, {
        match : "**/*.html",
        foo   : { bar: { b: "b-html" } }
      }, {
        match : "**/*.smc",
        foo   : { bar: { b: "b-smc" } }
      }]
    };

    const instance = new FileOptionsProvider(options);
    instance.getOptions("file.smc").should.eql({
      foo : { bar: { a: "a", b: "b-smc" } }
    });

    options.should.eql({
      each : [{
        foo   : { bar: { a: "a" } }
      }, {
        match : "**/*.html",
        foo   : { bar: { b: "b-html" } }
      }, {
        match : "**/*.smc",
        foo   : { bar: { b: "b-smc" } }
      }]
    });

  });

});
