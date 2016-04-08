import Promise from "bluebird";
import Datastore from "nedb";

const METHODS = ["update", "findOne", "remove"];

Promise.promisifyAll(
  Reflect.getPrototypeOf(new Datastore()),
  method => METHODS.indexOf(method) !== -1);

export default Datastore;
