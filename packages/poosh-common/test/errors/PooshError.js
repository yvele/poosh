import { PooshError } from "../../lib/errors";

describe("PooshError", function() {

  it("Instance should be of type Error",
    () => new PooshError().should.be.an.instanceOf(Error)
  );

  it("Name should be PooshError",
    () => new PooshError().name.should.eql("PooshError")
  );

  it("Message should be stored",
    () => new PooshError("foo").message.should.equal("foo")
  );

});
