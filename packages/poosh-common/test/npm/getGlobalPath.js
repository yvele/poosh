import rewire from "rewire";

const getGlobalPathModule = rewire("../../lib/npm/getGlobalPath");
const getGlobalPath = getGlobalPathModule.default;

describe.skip("getGlobalPath", () => {

  it("Should work on Windows", () => {

    getGlobalPathModule.__set__("_getPrefix2", { default: () => "prefix" });
    getGlobalPathModule.__set__("getPlatform", () => "win32");
    getGlobalPathModule.__set__("pathJoin", (...args) => args.join("\\"));

    getGlobalPath().should.eql("prefix\\node_modules");
  });

  it("Should work on Linux", () => {

    getGlobalPathModule.__set__("_getPrefix2", { default: () => "prefix" });
    getGlobalPathModule.__set__("getPlatform", () => "linux");
    getGlobalPathModule.__set__("pathJoin", (...args) => args.join("/"));

    getGlobalPath().should.eql("prefix/lib/node_modules");
  });

});
