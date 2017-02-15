import * as convertion from "../../lib/helpers/convertion";

describe("convertion", () => {

  describe("etagToMd5", () => {

    it("Should works", () => {
      convertion.etagToMd5('"test"').should.equal("test");
    });

  });

});
