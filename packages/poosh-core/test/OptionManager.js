import rewire from "rewire";
import PooshError from "poosh-common/lib/errors/PooshError";
const OptionManager = rewire("../lib/OptionManager");

describe("OptionManager", () => {

  describe("normalizeCacheRemote", () => {
    const normalizeCacheRemote = OptionManager.__get__("normalizeCacheRemote");

    it("Should work with true", () => {
      normalizeCacheRemote(true).should.eql({
        cache: true,
        remote: true
      });
    });

    it("Should work with falsy value", () => {
      normalizeCacheRemote().should.eql({
        cache: false,
        remote: false
      });
    });

    it("Should work with object", () => {
      const obj = {};
      normalizeCacheRemote(obj).should.equal(obj);
    });

  });

  describe("normalizeRemote", () => {
    const normalizeRemote = OptionManager.__get__("normalizeRemote");

    it("Should work with an object of remote objects", () => {
      normalizeRemote({
        foo: { type: "foo" },
        bar: { type: "bar" }
      }).should.eql({
        foo: { type: "foo" },
        bar: { type: "bar" }
      });
    });

    it("Should work with a remote object (set as default)", () => {
      normalizeRemote({ type: "foo" }).should.eql({
        "default": { type: "foo" }
      });
    });

    it("Should work with a string (set as default)", () => {
      const plugins = [{
        parse: (value) => {
          value.should.eql("foo");
          return { type: "foo" };
        }
      }];

      normalizeRemote("foo", plugins).should.eql({
        "default": { type: "foo" }
      });
    });

    it("Should throw a PooshError with an invalid string", () => {
      (function() {
        normalizeRemote("invalid", []);
      }).should.throw(PooshError);
    });

  });

});
