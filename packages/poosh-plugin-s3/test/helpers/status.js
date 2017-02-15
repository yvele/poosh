import * as status from "../../lib/helpers/status";

describe("status", () => {

  describe("areSameHeaders", () => {
    it("Should return true with equivalent objects", () => {
      status.areSameHeaders({
        headers : { values : {
          "cache-control"       : "cache-control",
          "content-disposition" : "content-disposition",
          "content-encoding"    : "content-encoding",
          "content-language"    : "content-language",
          "content-length"      : "content-length",
          "content-md5"         : "content-md5",
          "content-type"        : "content-type",
          expires             : "expires",
          location            : "location"
        } }
      }, {
        CacheControl            : "cache-control",
        ContentDisposition      : "content-disposition",
        ContentEncoding         : "content-encoding",
        ContentLanguage         : "content-language",
        ContentLength           : "content-length",
        ContentMD5              : "content-md5",
        ContentType             : "content-type",
        Expires                 : "expires",
        WebsiteRedirectLocation : "location",
        SomethingElse           : "X"
      }).should.be.true();
    });

    it("Should return true with real world fixtures", () => {
      status.areSameHeaders({
        headers : { values : {
          "cache-control" : "max-age=18000",
          "content-encoding" : "gzip",
          "content-type" : "text/html; charset=utf-8",
          "content-length" : "49"
        } }
      }, {
        AcceptRanges : "bytes",
        LastModified : "Thu, 03 Mar 2016 17:33:30 GMT",
        ContentLength : "49",
        ETag : '"5908f29936cbf69763595a9ee33484d1"',
        CacheControl : "max-age=18000",
        ContentEncoding : "gzip",
        ContentType : "text/html; charset=utf-8",
        Metadata : {}
      }).should.be.true();
    });

    it("Should return true with no headers", () => {
      status.areSameHeaders(
        { headers: { values: { "cache-control": null } } },
        { Expires: undefined, SomethingElse: "X" }
      ).should.be.true();
    });

    it("Should return false with different properties", () => {
      status.areSameHeaders(
        { headers: { values: { "cache-control": "X" } } },
        { WebsiteRedirectLocation: "X" }
      ).should.be.false();
    });

    it("Should return false with same properties but different values", () => {
      status.areSameHeaders(
        { headers: { values: { "content-type": "A" } } },
        { ContentType: "B" }
      ).should.be.false();
    });

  });

  describe("isSameRemote", () => {

    it("Should return true with equivalent objects", () => {
      status.isSameRemote(
        { remote: { values: { storageClass: "STANDARD", acl: "public-read" } } },
        { StorageClass: "STANDARD", SomethingElse: "X" }
      ).should.be.true();
    });

    it("Should return true with empty objects", () => {
      status.isSameRemote(
        { remote: { values: { storageClass: null, acl: "public-read" } } },
        { StorageClass: undefined, SomethingElse: "X" }
      ).should.be.true();
    });

    it("Should return false with different objects", () => {
      status.isSameRemote(
        { remote: { values: { storageClass: "STANDARD", acl: "public-read" } } },
        { StorageClass: "REDUCED_REDUNDANCY", SomethingElse: "X" }
      ).should.be.false();
    });

  });

  describe("getStatusDetails", () => {

    it("Should work", () => {
      status.getStatusDetails({
        content : { md5: "1c50a6f91da9456ba3bce349209114c8" },
        remote : { values: {} },
        headers : { values: {} }
      }, {
        ETag : '"1c50a6f91da9456ba3bce349209114c8"',
        StorageClass : "STANDARD"
      }).should.eql({
        content : "same",
        headers : "same",
        remote : "different"
      });
    });

  });

});
