import { PooshError } from "../../lib/errors";

describe("PooshError", function () {

  it("Instance should be of type Error",
    () => new PooshError().should.be.an.instanceOf(Error)
  );

  it("Name should be PooshError",
    () => new PooshError().name.should.eql("PooshError")
  );

  it("Message should be stored",
    () => new PooshError("foo").message.should.equal("foo")
  );

  it("Stack should have error name in it's first line",
    () => new PooshError().stack.should.match(/^PooshError\n/)
  );

  it("Stack should have message in it's first line",
    () => new PooshError("foo").stack.should.match(/^PooshError: foo\n/)
  );

});
