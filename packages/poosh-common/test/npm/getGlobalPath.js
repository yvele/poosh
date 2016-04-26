import getGlobalPath from "../../lib/npm/getGlobalPath";

describe("getGlobalPath", function () {

  it("Should work on Windows", () => {

    getGlobalPath.__set__("getPrefix", () => "prefix");
    getGlobalPath.__set__("getPlatform", () => "win32");
    getGlobalPath.__set__("path", {
      join: (...args) => args.join("\\")
    });

    getGlobalPath().should.eql("prefix\\node_modules");

    getGlobalPath.__ResetDependency__("getPrefix");
    getGlobalPath.__ResetDependency__("getPlatform");
    getGlobalPath.__ResetDependency__("path");
  });

  it("Should work on Linux", () => {

    getGlobalPath.__set__("getPrefix", () => "prefix");
    getGlobalPath.__set__("getPlatform", () => "linux");
    getGlobalPath.__set__("path", {
      join: (...args) => args.join("/")
    });

    getGlobalPath().should.eql("prefix/lib/node_modules");

    getGlobalPath.__ResetDependency__("getPrefix");
    getGlobalPath.__ResetDependency__("getPlatform");
    getGlobalPath.__ResetDependency__("path");
  });

});
