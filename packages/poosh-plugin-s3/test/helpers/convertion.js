import * as convertion from "../../lib/helpers/convertion";

describe("convertion", function() {

  describe("etagToMd5", function() {

    it("Should works", function() {
      convertion.etagToMd5('"test"').should.equal("test");
    });

  });

});
