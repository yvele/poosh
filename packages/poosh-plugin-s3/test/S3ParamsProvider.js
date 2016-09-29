import S3ParamsProvider from "../lib/S3ParamsProvider";

const FILE = {
  dest    : { relative: "relative" },
  content : { buffer: "buffer" },
  headers : { values: { location: "location" } },
  remote: { values: { acl: "public-read", storageClass: "STANDARD" } }
};

describe("S3ParamsProvider", function() {

  describe("getParamsWithKey", function() {
    it("Should work", () => {
      let instance = new S3ParamsProvider({});
      instance.getParamsWithKey(FILE).should.eql({
        Key: "relative"
      });
    });
  });

  describe("getConstructorOptions", function() {
    it("Should work", () => {
      let instance = new S3ParamsProvider({
        accessKeyId     : "accessKeyId",
        secretAccessKey : "secretAccessKey",
        region          : "region",
        maxRetries      : "maxRetries",
        bucket          : "bucket",
        proxy           : "proxy",
        timeout         : 1
      });

      instance.getConstructorOptions().should.eql({
        accessKeyId     : "accessKeyId",
        secretAccessKey : "secretAccessKey",
        region          : "region",
        maxRetries      : "maxRetries",
        params          : { Bucket: "bucket" },
        httpOptions     : { proxy: "proxy", timeout: 1 }
      });
    });
  });

  describe("getHeadObjectParams", function() {
    it("Should work", () => {
      let instance = new S3ParamsProvider({});
      instance.getHeadObjectParams(FILE).should.eql({
        Key: "relative"
      });
    });
  });

  describe("getPutObjectParams", function() {
    it("Should work", () => {
      let instance = new S3ParamsProvider({});
      instance.getPutObjectParams(FILE).should.eql({
        Body: "buffer",
        Key: "relative",
        WebsiteRedirectLocation: "location",
        ACL: "public-read",
        StorageClass: "STANDARD"
      });
    });
  });

  describe("getListObjectsParams", function() {
    it("Should work", () => {
      let instance = new S3ParamsProvider({});
      instance.getListObjectsParams(FILE).should.eql({});
    });
  });

  describe("getDeleteObjectsParams", function() {
    it("Should work", () => {
      let instance = new S3ParamsProvider({});
      instance.getDeleteObjectsParams([FILE, FILE]).should.eql({
        Delete: {
          Objects: [ { Key: "relative" }, { Key: "relative" } ]
        }
      });
    });
  });

});
