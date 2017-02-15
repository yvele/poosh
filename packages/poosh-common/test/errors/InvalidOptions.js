import { PooshError, InvalidOptions } from "../../lib/errors";

describe("InvalidOptions", () => {

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

});
