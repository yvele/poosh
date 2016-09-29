import { InvalidOptions } from "../../lib/errors";
import { PooshError } from "../../lib/errors";

describe("InvalidOptions", function () {

  it("Instance should be of type Error",
    () => new InvalidOptions().should.be.an.instanceOf(Error)
  );

  it("Instance should be of type PooshError",
    () => new InvalidOptions().should.be.an.instanceOf(PooshError)
  );

  it("Name should be InvalidOptions",
    () => new InvalidOptions().name.should.eql("InvalidOptions")
  );

  it("Message should be stored",
    () => new InvalidOptions("foo").message.should.equal("foo")
  );

  it("Stack should have error name in it's first line",
    () => new InvalidOptions().stack.should.match(/^InvalidOptions\n/)
  );

  it("Stack should have message in it's first line",
    () => new InvalidOptions("foo").stack.should.match(/^InvalidOptions: foo\n/)
  );

});
