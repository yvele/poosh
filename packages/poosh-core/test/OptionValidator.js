import should from "should";
import OptionValidator from "../lib/OptionValidator";

describe("OptionValidator", () => {

  describe("validateSync", () => {

    it("Should pass validation with a single remote string", () => {

      should(OptionValidator.validateSync({
        baseDir : "./deploy",
        each    : [{ match: "*.html" }],
        remote  : "foobar"
      }, { validation: [] })).be.undefined();
    });

    it("Should pass validation with a map of remote objects", () => {

      should(OptionValidator.validateSync({
        baseDir : "./deploy",
        each    : [{ match: "*.html" }],
        remote  : {
          "default": {
            type : "s3",
            foo  : "bar"
          }
        }
      }, { validation: [] })).be.undefined();
    });

    it("Should pass validation with a single remote object", () => {

      should(OptionValidator.validateSync({
        baseDir : "./deploy",
        each    : [{ match: "*.html" }],
        remote  : {
          type : "s3",
          foo  : "bar"
        }
      }, { validation: [] })).be.undefined();
    });

    it("Should not pass validation with a single remote object with no type", () => {

      OptionValidator.validateSync({
        baseDir : "./deploy",
        each    : [{ match: "*.html" }],
        remote  : { foo: "bar" }
      }, { validation: [] }).should.be.type("object");
    });

  });

});
